// PSYBERHERD™ APEX Sniper - API Utilities
import { io, Socket } from 'socket.io-client';

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://psyberherd-apex-sniper.up.railway.app';
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://psyberherd-apex-sniper.up.railway.app';

// Types
export interface QuantumMetrics {
  fidelity: number;
  coherence: number;
  entanglement: number;
  qubits: number;
  errorRate: number;
}

export interface AIConsensus {
  consensus: number;
  predictions: {
    grok: { signal: string; confidence: number };
    claude: { signal: string; confidence: number };
    gpt4: { signal: string; confidence: number };
    gemini: { signal: string; confidence: number };
    llama: { signal: string; confidence: number };
    mistral: { signal: string; confidence: number };
  };
}

export interface TradingMetrics {
  winRate: number;
  sharpeRatio: number;
  totalTrades: number;
  profitableTrades: number;
  averageReturn: number;
  maxDrawdown: number;
}

export interface BackupStatus {
  tier1_github: { status: string; lastBackup: string };
  tier2_railway_s3: { status: string; lastBackup: string };
  tier3_platform: { status: string; lastBackup: string };
}

export interface SystemHealth {
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  activeConnections: number;
}

// API Client
export class APEXApiClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = parseInt(process.env.NEXT_PUBLIC_MAX_RECONNECT_ATTEMPTS || '10');
  
  // REST API Methods
  async getQuantumMetrics(): Promise<QuantumMetrics> {
    const response = await fetch(`${API_URL}/api/quantum/metrics`);
    if (!response.ok) throw new Error('Failed to fetch quantum metrics');
    return response.json();
  }
  
  async getAIConsensus(): Promise<AIConsensus> {
    const response = await fetch(`${API_URL}/api/ai/consensus`);
    if (!response.ok) throw new Error('Failed to fetch AI consensus');
    return response.json();
  }
  
  async getTradingMetrics(): Promise<TradingMetrics> {
    const response = await fetch(`${API_URL}/api/trading/metrics`);
    if (!response.ok) throw new Error('Failed to fetch trading metrics');
    return response.json();
  }
  
  async getBackupStatus(): Promise<BackupStatus> {
    const response = await fetch(`${API_URL}/api/backup/status`);
    if (!response.ok) throw new Error('Failed to fetch backup status');
    return response.json();
  }
  
  async getSystemHealth(): Promise<SystemHealth> {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) throw new Error('Failed to fetch system health');
    return response.json();
  }
  
  async executeTrade(params: {
    symbol: string;
    side: 'buy' | 'sell';
    amount: number;
    leverage?: number;
  }) {
    const response = await fetch(`${API_URL}/api/trading/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error('Trade execution failed');
    return response.json();
  }
  
  // WebSocket Methods
  connectWebSocket(callbacks: {
    onQuantumUpdate?: (data: QuantumMetrics) => void;
    onAIUpdate?: (data: AIConsensus) => void;
    onTradingUpdate?: (data: TradingMetrics) => void;
    onSystemUpdate?: (data: SystemHealth) => void;
    onError?: (error: Error) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
  }) {
    if (this.socket?.connected) return;
    
    this.socket = io(WS_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: parseInt(process.env.NEXT_PUBLIC_RECONNECT_INTERVAL_MS || '5000'),
      reconnectionAttempts: this.maxReconnectAttempts,
    });
    
    this.socket.on('connect', () => {
      this.reconnectAttempts = 0;
      callbacks.onConnect?.();
      console.log('WebSocket connected to APEX backend');
    });
    
    this.socket.on('disconnect', () => {
      callbacks.onDisconnect?.();
      console.log('WebSocket disconnected from APEX backend');
    });
    
    this.socket.on('quantum:update', callbacks.onQuantumUpdate || (() => {}));
    this.socket.on('ai:update', callbacks.onAIUpdate || (() => {}));
    this.socket.on('trading:update', callbacks.onTradingUpdate || (() => {}));
    this.socket.on('system:update', callbacks.onSystemUpdate || (() => {}));
    
    this.socket.on('error', (error) => {
      callbacks.onError?.(new Error(error));
      console.error('WebSocket error:', error);
    });
    
    this.socket.on('reconnect_attempt', (attempt) => {
      this.reconnectAttempts = attempt;
      console.log(`Reconnection attempt ${attempt}/${this.maxReconnectAttempts}`);
    });
    
    this.socket.on('reconnect_failed', () => {
      callbacks.onError?.(new Error('Failed to reconnect after maximum attempts'));
    });
  }
  
  disconnectWebSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  
  // Utility Methods
  isConnected(): boolean {
    return this.socket?.connected || false;
  }
  
  getReconnectAttempts(): number {
    return this.reconnectAttempts;
  }
}

// Singleton instance
let apiClient: APEXApiClient | null = null;

export function getApiClient(): APEXApiClient {
  if (!apiClient) {
    apiClient = new APEXApiClient();
  }
  return apiClient;
}

// Helper functions
export async function fetchWithRetry<T>(
  url: string,
  options?: RequestInit,
  maxRetries = 3
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError || new Error('Failed after maximum retries');
}

export function formatMetricValue(value: number, type: 'percentage' | 'decimal' | 'integer' = 'decimal'): string {
  switch (type) {
    case 'percentage':
      return `${(value * 100).toFixed(1)}%`;
    case 'integer':
      return Math.round(value).toLocaleString();
    case 'decimal':
    default:
      return value.toFixed(4);
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'operational':
    case 'active':
    case 'connected':
      return 'text-green-400';
    case 'degraded':
    case 'warning':
      return 'text-yellow-400';
    case 'down':
    case 'error':
    case 'disconnected':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
}
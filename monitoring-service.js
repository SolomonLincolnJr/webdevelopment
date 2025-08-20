/**
 * PSYBERHERD™ Monitoring Service
 * Real-time performance and health monitoring
 */

const http = require('http');
const EventEmitter = require('events');

class MonitoringService extends EventEmitter {
    constructor() {
        super();
        this.metrics = {
            uptime: 0,
            requestCount: 0,
            errorCount: 0,
            avgResponseTime: 0,
            quantumFidelity: 0.8677,
            aiAccuracy: 0.959,
            consensusRate: 0.987,
            lastCheck: null
        };
        this.alerts = [];
        this.interval = process.env.MONITOR_INTERVAL || 5000;
        this.alertThreshold = process.env.ALERT_THRESHOLD || 0.95;
    }

    async checkHealth() {
        const startTime = Date.now();
        
        return new Promise((resolve) => {
            const options = {
                hostname: 'localhost',
                port: process.env.PORT || 3002,
                path: '/health',
                method: 'GET',
                timeout: 5000
            };

            const req = http.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    const responseTime = Date.now() - startTime;
                    this.metrics.avgResponseTime = 
                        (this.metrics.avgResponseTime * this.metrics.requestCount + responseTime) / 
                        (this.metrics.requestCount + 1);
                    this.metrics.requestCount++;
                    
                    try {
                        const health = JSON.parse(data);
                        this.updateMetrics(health.metrics);
                        resolve({ success: true, responseTime, health });
                    } catch (error) {
                        this.metrics.errorCount++;
                        resolve({ success: false, error: error.message });
                    }
                });
            });

            req.on('error', (error) => {
                this.metrics.errorCount++;
                resolve({ success: false, error: error.message });
            });

            req.on('timeout', () => {
                req.destroy();
                this.metrics.errorCount++;
                resolve({ success: false, error: 'Request timeout' });
            });

            req.end();
        });
    }

    updateMetrics(healthMetrics) {
        if (healthMetrics) {
            this.metrics.quantumFidelity = healthMetrics.quantumFidelity || this.metrics.quantumFidelity;
            this.metrics.aiAccuracy = healthMetrics.aiAccuracy || this.metrics.aiAccuracy;
            this.metrics.consensusRate = healthMetrics.consensusRate || this.metrics.consensusRate;
            this.metrics.uptime = healthMetrics.uptime || process.uptime();
        }
        this.metrics.lastCheck = new Date().toISOString();
        
        // Check for alerts
        this.checkAlerts();
    }

    checkAlerts() {
        const alerts = [];
        
        if (this.metrics.quantumFidelity < 0.85) {
            alerts.push({
                level: 'WARNING',
                metric: 'quantumFidelity',
                value: this.metrics.quantumFidelity,
                threshold: 0.85,
                message: 'Quantum fidelity below optimal threshold'
            });
        }
        
        if (this.metrics.aiAccuracy < this.alertThreshold) {
            alerts.push({
                level: 'CRITICAL',
                metric: 'aiAccuracy',
                value: this.metrics.aiAccuracy,
                threshold: this.alertThreshold,
                message: 'AI accuracy below critical threshold'
            });
        }
        
        if (this.metrics.consensusRate < 0.95) {
            alerts.push({
                level: 'WARNING',
                metric: 'consensusRate',
                value: this.metrics.consensusRate,
                threshold: 0.95,
                message: 'Consensus rate below warning threshold'
            });
        }
        
        if (this.metrics.errorCount > 10) {
            alerts.push({
                level: 'CRITICAL',
                metric: 'errorCount',
                value: this.metrics.errorCount,
                threshold: 10,
                message: 'High error count detected'
            });
        }
        
        if (alerts.length > 0) {
            this.alerts = alerts;
            this.emit('alerts', alerts);
            this.logAlerts(alerts);
        }
    }

    logAlerts(alerts) {
        console.log('\n[MONITOR] ⚠️  ALERTS DETECTED:');
        alerts.forEach(alert => {
            const icon = alert.level === 'CRITICAL' ? '🔴' : '🟡';
            console.log(`${icon} [${alert.level}] ${alert.metric}: ${alert.value.toFixed(4)} (threshold: ${alert.threshold})`);
            console.log(`   ${alert.message}`);
        });
        console.log();
    }

    async start() {
        console.log('[PSYBERHERD™ Monitor] Starting monitoring service...');
        console.log(`[Configuration] Interval: ${this.interval}ms | Alert Threshold: ${this.alertThreshold}`);
        
        // Initial health check
        await this.checkHealth();
        
        // Set up periodic monitoring
        setInterval(async () => {
            const result = await this.checkHealth();
            
            if (result.success) {
                console.log(`[MONITOR] ✅ Health check passed | Response: ${result.responseTime}ms | Quantum: ${this.metrics.quantumFidelity.toFixed(4)} | AI: ${this.metrics.aiAccuracy.toFixed(4)} | Consensus: ${this.metrics.consensusRate.toFixed(4)}`);
            } else {
                console.log(`[MONITOR] ❌ Health check failed: ${result.error}`);
            }
        }, this.interval);
        
        // Log metrics summary every minute
        setInterval(() => {
            console.log('\n[MONITOR] 📊 METRICS SUMMARY:');
            console.log(`├─ Uptime: ${Math.floor(this.metrics.uptime)}s`);
            console.log(`├─ Requests: ${this.metrics.requestCount}`);
            console.log(`├─ Errors: ${this.metrics.errorCount}`);
            console.log(`├─ Avg Response: ${this.metrics.avgResponseTime.toFixed(2)}ms`);
            console.log(`├─ Quantum Fidelity: ${this.metrics.quantumFidelity.toFixed(4)}`);
            console.log(`├─ AI Accuracy: ${this.metrics.aiAccuracy.toFixed(4)}`);
            console.log(`├─ Consensus Rate: ${this.metrics.consensusRate.toFixed(4)}`);
            console.log(`└─ Active Alerts: ${this.alerts.length}\n`);
        }, 60000);
    }
}

// Start monitoring if run directly
if (require.main === module) {
    const monitor = new MonitoringService();
    
    monitor.on('alerts', (alerts) => {
        // In production, this would send notifications
        console.log(`[MONITOR] Sending ${alerts.length} alert(s) to notification system...`);
    });
    
    monitor.start();
    
    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n[MONITOR] Shutting down monitoring service...');
        process.exit(0);
    });
    
    process.on('SIGTERM', () => {
        console.log('\n[MONITOR] Received termination signal...');
        process.exit(0);
    });
}

module.exports = MonitoringService;
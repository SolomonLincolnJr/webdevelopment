/**
 * LLM Load Balancer Service for APEX SNIPER Family Office
 * Real-time cost optimization and intelligent routing
 * Minimizes Manus.ai usage while preserving it for elite tasks
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { LLMRouter } = require('./llm-routing-config');

const app = express();
const PORT = process.env.PORT || 3005;

// Initialize LLM Router
const llmRouter = new LLMRouter();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 15552000, // 180 days
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Global variables for tracking
let serviceStats = {
  startup_time: new Date().toISOString(),
  total_requests: 0,
  total_cost_today: 0,
  last_reset: new Date().toDateString()
};

// Middleware to track requests
app.use((req, res, next) => {
  serviceStats.total_requests++;
  
  // Reset daily stats if new day
  const today = new Date().toDateString();
  if (serviceStats.last_reset !== today) {
    serviceStats.total_cost_today = 0;
    serviceStats.last_reset = today;
    llmRouter.init(); // Reset router daily stats
  }
  
  next();
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'LLM Load Balancer',
    version: '1.0.0',
    port: PORT,
    uptime: process.uptime(),
    memory_usage: process.memoryUsage(),
    daily_stats: llmRouter.getLoadBalancingStats()
  };
  
  res.json(health);
});

/**
 * Main LLM routing endpoint
 */
app.post('/api/llm/route', async (req, res) => {
  try {
    const { task_type, content, priority = 'medium', consultant_role = null } = req.body;
    
    if (!task_type || !content) {
      return res.status(400).json({
        error: 'Missing required fields: task_type and content'
      });
    }
    
    console.log(`🧠 LLM Request: ${task_type} (${priority}) - ${content.substring(0, 50)}...`);
    
    // Route the request
    const result = await llmRouter.routeRequest(task_type, content, priority, consultant_role);
    
    // Update service stats
    serviceStats.total_cost_today += result.cost;
    
    console.log(`✅ Routed to ${result.provider} - Cost: $${result.cost}`);
    
    res.json({
      success: true,
      result: result,
      service_stats: {
        total_requests_today: serviceStats.total_requests,
        total_cost_today: serviceStats.total_cost_today,
        load_balancing_stats: llmRouter.getLoadBalancingStats()
      }
    });
    
  } catch (error) {
    console.error('LLM Routing Error:', error);
    res.status(500).json({
      error: 'LLM routing failed',
      message: error.message
    });
  }
});

/**
 * Get current load balancing statistics
 */
app.get('/api/llm/stats', (req, res) => {
  try {
    const stats = llmRouter.getLoadBalancingStats();
    const optimization_report = llmRouter.generateOptimizationReport();
    
    res.json({
      service_info: {
        startup_time: serviceStats.startup_time,
        total_requests: serviceStats.total_requests,
        uptime_hours: (process.uptime() / 3600).toFixed(2)
      },
      load_balancing: stats,
      optimization_report: optimization_report,
      budget_status: {
        daily_budget: process.env.DAILY_BUDGET_LIMIT || 10.00,
        spent_today: stats.total_cost_today,
        remaining_today: stats.budget_remaining,
        utilization_percentage: ((stats.total_cost_today / (process.env.DAILY_BUDGET_LIMIT || 10.00)) * 100).toFixed(1)
      }
    });
    
  } catch (error) {
    console.error('Stats retrieval error:', error);
    res.status(500).json({
      error: 'Failed to retrieve statistics',
      message: error.message
    });
  }
});

/**
 * Get LLM provider status and availability
 */
app.get('/api/llm/providers', (req, res) => {
  try {
    const providers = {};
    
    Object.keys(llmRouter.config.providers).forEach(provider => {
      const provider_config = llmRouter.config.providers[provider];
      const usage_stats = llmRouter.usage_stats[provider];
      const circuit_breaker = llmRouter.circuit_breakers[provider];
      
      providers[provider] = {
        priority: provider_config.priority,
        cost_per_token: provider_config.cost_per_token,
        specializations: provider_config.specializations,
        availability: provider_config.availability,
        latency_ms: provider_config.latency_ms,
        usage_today: {
          requests: usage_stats.requests_today,
          cost: usage_stats.cost_today,
          success_rate: usage_stats.success_rate,
          avg_response_time: usage_stats.avg_response_time
        },
        circuit_breaker: {
          state: circuit_breaker.state,
          failures: circuit_breaker.failures
        },
        is_available: llmRouter.isProviderAvailable(provider)
      };
    });
    
    res.json({ providers });
    
  } catch (error) {
    console.error('Provider status error:', error);
    res.status(500).json({
      error: 'Failed to retrieve provider status',
      message: error.message
    });
  }
});

/**
 * Get consultant role configurations
 */
app.get('/api/llm/consultants', (req, res) => {
  try {
    const consultants = {};
    
    Object.keys(llmRouter.config.consultant_roles).forEach(role => {
      const role_config = llmRouter.config.consultant_roles[role];
      consultants[role] = {
        primary_llm: role_config.primary_llm,
        fallback_llm: role_config.fallback_llm,
        tasks: role_config.tasks,
        cost_limit_per_day: role_config.cost_limit_per_day,
        requires_authorization: role_config.requires_authorization || false
      };
    });
    
    res.json({ consultant_roles: consultants });
    
  } catch (error) {
    console.error('Consultant roles error:', error);
    res.status(500).json({
      error: 'Failed to retrieve consultant roles',
      message: error.message
    });
  }
});

/**
 * Emergency cost control endpoint
 */
app.post('/api/llm/emergency-throttle', (req, res) => {
  try {
    const { throttle_level = 'medium' } = req.body;
    
    // Implement emergency throttling based on level
    switch (throttle_level) {
      case 'low':
        // Reduce Manus.ai requests by 50%
        llmRouter.config.providers['manus-ai'].max_requests_per_hour = 25;
        break;
      case 'medium':
        // Reduce Manus.ai requests by 75%
        llmRouter.config.providers['manus-ai'].max_requests_per_hour = 12;
        break;
      case 'high':
        // Emergency: Block all Manus.ai except critical
        llmRouter.config.providers['manus-ai'].max_requests_per_hour = 3;
        break;
    }
    
    console.log(`🚨 Emergency throttling activated: ${throttle_level}`);
    
    res.json({
      success: true,
      throttle_level: throttle_level,
      message: `Emergency throttling activated at ${throttle_level} level`,
      new_limits: {
        'manus-ai': llmRouter.config.providers['manus-ai'].max_requests_per_hour
      }
    });
    
  } catch (error) {
    console.error('Emergency throttle error:', error);
    res.status(500).json({
      error: 'Failed to activate emergency throttling',
      message: error.message
    });
  }
});

/**
 * LLM Load Balancer Dashboard
 */
app.get('/', (req, res) => {
  try {
    const stats = llmRouter.getLoadBalancingStats();
    const dashboard_html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>APEX SNIPER - LLM Load Balancer</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0a0a0a; color: #fff; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #00ffff; font-size: 2.5rem; margin-bottom: 10px; }
        .header p { color: #ccc; font-size: 1.1rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: linear-gradient(135deg, #1a1a2e, #16213e); border: 1px solid #333; border-radius: 10px; padding: 20px; }
        .stat-card h3 { color: #00ffff; margin-bottom: 15px; font-size: 1.2rem; }
        .stat-item { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .stat-label { color: #ccc; }
        .stat-value { color: #fff; font-weight: bold; }
        .cost-warning { color: #ff6b6b; }
        .cost-good { color: #51cf66; }
        .distribution-chart { margin: 20px 0; }
        .bar { height: 30px; background: linear-gradient(90deg, #00ffff, #0099cc); margin: 10px 0; border-radius: 5px; position: relative; }
        .bar-label { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-weight: bold; }
        .refresh-btn { background: #00ffff; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; }
        .refresh-btn:hover { background: #0099cc; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧠 APEX SNIPER LLM Load Balancer</h1>
            <p>Real-time cost optimization and intelligent routing</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3>💰 Budget Status</h3>
                <div class="stat-item">
                    <span class="stat-label">Daily Budget:</span>
                    <span class="stat-value">$${process.env.DAILY_BUDGET_LIMIT || '10.00'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Spent Today:</span>
                    <span class="stat-value ${stats.total_cost_today > (process.env.DAILY_BUDGET_LIMIT || 10) * 0.8 ? 'cost-warning' : 'cost-good'}">$${stats.total_cost_today.toFixed(2)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Remaining:</span>
                    <span class="stat-value">$${stats.budget_remaining.toFixed(2)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Utilization:</span>
                    <span class="stat-value">${((stats.total_cost_today / (process.env.DAILY_BUDGET_LIMIT || 10)) * 100).toFixed(1)}%</span>
                </div>
            </div>
            
            <div class="stat-card">
                <h3>📊 Request Statistics</h3>
                <div class="stat-item">
                    <span class="stat-label">Total Requests:</span>
                    <span class="stat-value">${stats.total_requests}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Service Uptime:</span>
                    <span class="stat-value">${(process.uptime() / 3600).toFixed(1)} hours</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Avg Cost/Request:</span>
                    <span class="stat-value">$${stats.total_requests > 0 ? (stats.total_cost_today / stats.total_requests).toFixed(4) : '0.0000'}</span>
                </div>
            </div>
            
            <div class="stat-card">
                <h3>🎯 LLM Distribution</h3>
                <div class="distribution-chart">
                    ${Object.entries(stats.distribution).map(([provider, percentage]) => `
                        <div class="bar" style="width: ${percentage}%;">
                            <span class="bar-label">${provider}: ${percentage}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div style="text-align: center;">
            <button class="refresh-btn" onclick="location.reload()">🔄 Refresh Dashboard</button>
        </div>
    </div>
    
    <script>
        // Auto-refresh every 30 seconds
        setTimeout(() => location.reload(), 30000);
    </script>
</body>
</html>
    `;
    
    res.send(dashboard_html);
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Dashboard error: ' + error.message);
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('LLM Load Balancer Error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🧠 LLM Load Balancer Service running on port ${PORT}`);
  console.log(`🎯 Cost optimization mode: ACTIVE`);
  console.log(`💰 Daily budget limit: $${process.env.DAILY_BUDGET_LIMIT || '10.00'}`);
  console.log(`🚨 Manus.ai max requests: ${process.env.MANUS_AI_MAX_REQUESTS || '3'}`);
  console.log(`🔗 Dashboard: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 LLM Load Balancer shutting down gracefully...');
  server.close(() => {
    console.log('✅ LLM Load Balancer stopped');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 LLM Load Balancer shutting down gracefully...');
  server.close(() => {
    console.log('✅ LLM Load Balancer stopped');
    process.exit(0);
  });
});

module.exports = app;
/**
 * PM2 Ecosystem Configuration for PSYBERHERD™ APEX Sniper
 * GenSpark.ai Enhanced Deployment
 */

module.exports = {
  apps: [
    {
      name: 'psyberherd-apex-sniper',
      script: './psyberherd-apex-implementation.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        QUANTUM_FIDELITY: 0.8677,
        AI_ACCURACY: 0.959,
        CONSENSUS_RATE: 0.987,
        MAX_RISK_PER_TRADE: 0.02,
        MAX_PORTFOLIO_RISK: 0.10
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3002,
        DEBUG: 'psyberherd:*'
      },
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      log_file: './logs/combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Advanced PM2 settings
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 5000,
      
      // GenSparkAI Integration Monitoring
      events: true,
      automation: true,
      
      // Performance optimization
      node_args: '--max-old-space-size=2048 --optimize-for-size',
      
      // Cluster mode settings (for future scaling)
      exec_mode: 'fork',
      
      // Monitoring configuration
      monitoring: {
        http: true,
        https: false,
        transactions: true
      }
    },
    {
      name: 'lean-family-office',
      script: './lean-apex-sniper-main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
        LEAN_MODE: true,
        MONTHLY_BUDGET: 100,
        PRIMARY_INSTRUMENT: 'NADEX_BINARY_OPTIONS',
        COST_OPTIMIZATION: true
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3003,
        DEBUG: 'lean:*'
      },
      error_file: './logs/lean-error.log',
      out_file: './logs/lean-output.log',
      log_file: './logs/lean-combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Lean optimization settings
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 5000,
      exec_mode: 'fork',
      
      // Cost-optimized monitoring
      node_args: '--max-old-space-size=1024 --optimize-for-size'
    },
    {
      name: 'premium-family-office',
      script: './premium-family-office-server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3004,
        PREMIUM_MODE: true,
        NINJATRADER_INTEGRATION: true,
        APEX_PLATINUM: true,
        SCHWAB_API: true,
        ANNUAL_VALUE_LEVERAGED: 5000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3004,
        DEBUG: 'premium:*'
      },
      error_file: './logs/premium-error.log',
      out_file: './logs/premium-output.log',
      log_file: './logs/premium-combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Premium integration settings
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 5000,
      exec_mode: 'fork',
      
      // Multi-platform optimization
      node_args: '--max-old-space-size=1024 --optimize-for-size'
    },
    {
      name: 'llm-load-balancer',
      script: './llm-load-balancer-service.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
        LLM_ROUTING_MODE: 'cost-optimized',
        DAILY_BUDGET_LIMIT: 10.00,
        MANUS_AI_MAX_REQUESTS: 3,
        LOCAL_LLAMA_PRIORITY: true
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3005,
        DEBUG: 'llm-router:*'
      },
      error_file: './logs/llm-router-error.log',
      out_file: './logs/llm-router-output.log',
      log_file: './logs/llm-router-combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // LLM optimization settings
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 5000,
      exec_mode: 'fork',
      
      // Cost-optimized monitoring
      node_args: '--max-old-space-size=512 --optimize-for-size'
    },
    {
      name: 'psyberherd-monitor',
      script: './monitoring-service.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        MONITOR_INTERVAL: 5000,
        ALERT_THRESHOLD: 0.95,
        LLM_COST_MONITORING: true
      }
    }
  ],

  // Deploy configuration for different environments
  deploy: {
    production: {
      user: 'deploy',
      host: ['psyberherd.com'],
      ref: 'origin/main',
      repo: 'git@github.com:psyberherd/apex-sniper.git',
      path: '/var/www/psyberherd',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-deploy-local': 'echo "Deploying PSYBERHERD™ APEX Sniper to production"',
      env: {
        NODE_ENV: 'production'
      }
    },
    staging: {
      user: 'deploy',
      host: ['staging.psyberherd.com'],
      ref: 'origin/develop',
      repo: 'git@github.com:psyberherd/apex-sniper.git',
      path: '/var/www/psyberherd-staging',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env staging',
      env: {
        NODE_ENV: 'staging'
      }
    }
  }
};
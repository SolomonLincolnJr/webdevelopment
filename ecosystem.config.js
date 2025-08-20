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
      name: 'psyberherd-monitor',
      script: './monitoring-service.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        MONITOR_INTERVAL: 5000,
        ALERT_THRESHOLD: 0.95
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
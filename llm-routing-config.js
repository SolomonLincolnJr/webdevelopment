/**
 * LLM Routing Configuration for APEX SNIPER Family Office
 * Cost Optimization and Consultant Role Specialization
 * 
 * This module implements intelligent routing to minimize Manus.ai usage
 * while preserving it for elite autonomous trading algorithm tasks
 */

const LLM_ROUTING_CONFIG = {
  // LLM Provider Hierarchy and Cost Structure
  providers: {
    'local-llama': {
      priority: 1,
      cost_per_token: 0.0000,
      max_requests_per_hour: 1000,
      specializations: ['basic-queries', 'text-processing', 'simple-analysis'],
      availability: 'always',
      latency_ms: 50
    },
    'genspark-ai': {
      priority: 2,
      cost_per_token: 0.0001,
      max_requests_per_hour: 500,
      specializations: ['ui-ux', 'validation', 'documentation', 'compliance'],
      availability: 'high',
      latency_ms: 200
    },
    'claude-sonnet': {
      priority: 3,
      cost_per_token: 0.0003,
      max_requests_per_hour: 200,
      specializations: ['code-review', 'architecture', 'complex-analysis'],
      availability: 'high',
      latency_ms: 300
    },
    'abacus-ai': {
      priority: 4,
      cost_per_token: 0.0005,
      max_requests_per_hour: 100,
      specializations: ['financial-modeling', 'risk-assessment', 'quantitative-analysis'],
      availability: 'medium',
      latency_ms: 400
    },
    'manus-ai': {
      priority: 5,
      cost_per_token: 0.002,
      max_requests_per_hour: 50,
      specializations: ['elite-trading', 'autonomous-algorithms', 'quantum-processing'],
      availability: 'limited',
      latency_ms: 500,
      reserved_for: ['autonomous-trading', 'algorithm-optimization', 'quantum-fidelity']
    }
  },

  // Consultant Role Specializations
  consultant_roles: {
    'ui-ux-specialist': {
      primary_llm: 'genspark-ai',
      fallback_llm: 'claude-sonnet',
      tasks: ['dashboard-design', 'user-experience', 'interface-optimization'],
      cost_limit_per_day: 5.00
    },
    'compliance-officer': {
      primary_llm: 'genspark-ai',
      fallback_llm: 'abacus-ai',
      tasks: ['regulatory-compliance', 'risk-assessment', 'audit-preparation'],
      cost_limit_per_day: 10.00
    },
    'validation-engineer': {
      primary_llm: 'genspark-ai',
      fallback_llm: 'claude-sonnet',
      tasks: ['testing', 'validation', 'quality-assurance', 'debugging'],
      cost_limit_per_day: 7.50
    },
    'trading-analyst': {
      primary_llm: 'abacus-ai',
      fallback_llm: 'claude-sonnet',
      tasks: ['market-analysis', 'signal-generation', 'performance-metrics'],
      cost_limit_per_day: 15.00
    },
    'elite-trading-engine': {
      primary_llm: 'manus-ai',
      fallback_llm: 'abacus-ai',
      tasks: ['autonomous-trading', 'algorithm-optimization', 'quantum-processing'],
      cost_limit_per_day: 25.00,
      requires_authorization: true
    }
  },

  // Three-Tier Routing System
  routing_tiers: {
    'low': {
      default_provider: 'local-llama',
      fallback_providers: ['genspark-ai'],
      use_cases: ['simple-queries', 'basic-validation', 'text-processing'],
      max_cost_per_request: 0.01
    },
    'medium': {
      default_provider: 'genspark-ai',
      fallback_providers: ['claude-sonnet', 'abacus-ai'],
      use_cases: ['ui-ux', 'compliance', 'complex-validation', 'documentation'],
      max_cost_per_request: 0.10
    },
    'high': {
      default_provider: 'manus-ai',
      fallback_providers: ['abacus-ai', 'claude-sonnet'],
      use_cases: ['elite-trading', 'autonomous-algorithms', 'quantum-optimization'],
      max_cost_per_request: 1.00,
      requires_approval: true
    }
  },

  // Load Balancing Configuration
  load_balancing: {
    distribution_percentages: {
      'local-llama': 40,
      'genspark-ai': 35,
      'claude-sonnet': 15,
      'abacus-ai': 8,
      'manus-ai': 2
    },
    circuit_breaker: {
      failure_threshold: 5,
      recovery_timeout_ms: 60000,
      half_open_retry_timeout_ms: 30000
    },
    health_check_interval_ms: 10000
  },

  // Budget Controls
  budget_controls: {
    daily_limits: {
      'local-llama': 0.00,
      'genspark-ai': 10.00,
      'claude-sonnet': 15.00,
      'abacus-ai': 20.00,
      'manus-ai': 25.00
    },
    monthly_budget: 74.95,
    alert_thresholds: {
      warning: 0.80, // 80% of budget
      critical: 0.95  // 95% of budget
    },
    auto_throttle_at: 0.90 // 90% of budget
  },

  // Performance Metrics
  metrics: {
    track_response_times: true,
    track_costs: true,
    track_success_rates: true,
    track_fallback_usage: true,
    report_interval_minutes: 5
  }
};

/**
 * LLM Router Class
 * Implements intelligent routing based on cost, capability, and availability
 */
class LLMRouter {
  constructor(config = LLM_ROUTING_CONFIG) {
    this.config = config;
    this.usage_stats = {};
    this.circuit_breakers = {};
    this.daily_costs = {};
    this.init();
  }

  init() {
    // Initialize usage tracking
    Object.keys(this.config.providers).forEach(provider => {
      this.usage_stats[provider] = {
        requests_today: 0,
        cost_today: 0,
        success_rate: 1.0,
        avg_response_time: 0
      };
      this.circuit_breakers[provider] = {
        failures: 0,
        state: 'closed', // closed, open, half-open
        last_failure: null
      };
    });
  }

  /**
   * Route request to optimal LLM provider based on task type and constraints
   */
  async routeRequest(task_type, content, priority = 'medium', consultant_role = null) {
    try {
      // Determine routing tier
      const tier = this.determineRoutingTier(task_type, priority);
      
      // Get available providers for this tier
      const available_providers = this.getAvailableProviders(tier);
      
      // Apply consultant role routing if specified
      if (consultant_role && this.config.consultant_roles[consultant_role]) {
        const role_config = this.config.consultant_roles[consultant_role];
        if (available_providers.includes(role_config.primary_llm)) {
          return await this.executeRequest(role_config.primary_llm, content, task_type);
        }
      }

      // Try providers in order of preference
      for (const provider of available_providers) {
        if (this.isProviderAvailable(provider)) {
          try {
            const result = await this.executeRequest(provider, content, task_type);
            this.recordSuccess(provider, result.cost, result.response_time);
            return result;
          } catch (error) {
            this.recordFailure(provider, error);
            continue;
          }
        }
      }

      throw new Error('No available LLM providers for request');
    } catch (error) {
      console.error('LLM Routing Error:', error);
      throw error;
    }
  }

  /**
   * Determine appropriate routing tier based on task complexity
   */
  determineRoutingTier(task_type, priority) {
    // Elite trading tasks always go to high tier (Manus.ai)
    if (task_type.includes('autonomous-trading') || 
        task_type.includes('quantum-') || 
        task_type.includes('elite-')) {
      return 'high';
    }

    // UI/UX, compliance, validation go to medium tier
    if (task_type.includes('ui-') || 
        task_type.includes('compliance') || 
        task_type.includes('validation') ||
        task_type.includes('documentation')) {
      return 'medium';
    }

    // Simple queries and basic processing go to low tier
    return 'low';
  }

  /**
   * Get available providers for routing tier, ordered by preference
   */
  getAvailableProviders(tier) {
    const tier_config = this.config.routing_tiers[tier];
    const providers = [tier_config.default_provider, ...tier_config.fallback_providers];
    
    return providers.filter(provider => this.isProviderAvailable(provider));
  }

  /**
   * Check if provider is available based on budget, rate limits, and circuit breaker
   */
  isProviderAvailable(provider) {
    const stats = this.usage_stats[provider];
    const provider_config = this.config.providers[provider];
    const circuit_breaker = this.circuit_breakers[provider];

    // Check circuit breaker
    if (circuit_breaker.state === 'open') {
      const time_since_failure = Date.now() - circuit_breaker.last_failure;
      if (time_since_failure < this.config.load_balancing.circuit_breaker.recovery_timeout_ms) {
        return false;
      } else {
        circuit_breaker.state = 'half-open';
      }
    }

    // Check daily budget limits
    const daily_limit = this.config.budget_controls.daily_limits[provider];
    if (stats.cost_today >= daily_limit) {
      return false;
    }

    // Check hourly rate limits
    if (stats.requests_today >= provider_config.max_requests_per_hour) {
      return false;
    }

    return true;
  }

  /**
   * Execute request with specified provider (mocked for demonstration)
   */
  async executeRequest(provider, content, task_type) {
    const start_time = Date.now();
    const provider_config = this.config.providers[provider];

    // Simulate API call (in real implementation, would call actual LLM API)
    await new Promise(resolve => setTimeout(resolve, provider_config.latency_ms));

    const response_time = Date.now() - start_time;
    const estimated_tokens = content.length / 4; // Rough estimation
    const cost = estimated_tokens * provider_config.cost_per_token;

    return {
      provider: provider,
      response: `Response from ${provider} for task: ${task_type}`,
      cost: cost,
      response_time: response_time,
      tokens_used: estimated_tokens
    };
  }

  /**
   * Record successful request for metrics and load balancing
   */
  recordSuccess(provider, cost, response_time) {
    const stats = this.usage_stats[provider];
    stats.requests_today++;
    stats.cost_today += cost;
    stats.avg_response_time = (stats.avg_response_time + response_time) / 2;
    
    // Reset circuit breaker on success
    this.circuit_breakers[provider].failures = 0;
    this.circuit_breakers[provider].state = 'closed';
  }

  /**
   * Record failed request for circuit breaker logic
   */
  recordFailure(provider, error) {
    const circuit_breaker = this.circuit_breakers[provider];
    circuit_breaker.failures++;
    circuit_breaker.last_failure = Date.now();

    if (circuit_breaker.failures >= this.config.load_balancing.circuit_breaker.failure_threshold) {
      circuit_breaker.state = 'open';
    }

    console.warn(`LLM Provider ${provider} failure:`, error.message);
  }

  /**
   * Get current load balancing statistics
   */
  getLoadBalancingStats() {
    const total_requests = Object.values(this.usage_stats)
      .reduce((sum, stats) => sum + stats.requests_today, 0);

    const distribution = {};
    Object.keys(this.usage_stats).forEach(provider => {
      const requests = this.usage_stats[provider].requests_today;
      distribution[provider] = total_requests > 0 ? (requests / total_requests * 100).toFixed(1) : 0;
    });

    return {
      total_requests,
      distribution,
      total_cost_today: Object.values(this.usage_stats)
        .reduce((sum, stats) => sum + stats.cost_today, 0),
      budget_remaining: this.config.budget_controls.monthly_budget * (1/30) - 
        Object.values(this.usage_stats).reduce((sum, stats) => sum + stats.cost_today, 0)
    };
  }

  /**
   * Generate optimization report
   */
  generateOptimizationReport() {
    const stats = this.getLoadBalancingStats();
    
    return {
      timestamp: new Date().toISOString(),
      daily_costs: this.usage_stats,
      load_distribution: stats.distribution,
      budget_utilization: {
        used_today: stats.total_cost_today,
        remaining_today: stats.budget_remaining,
        monthly_projection: stats.total_cost_today * 30
      },
      recommendations: this.generateRecommendations(stats)
    };
  }

  /**
   * Generate cost optimization recommendations
   */
  generateRecommendations(stats) {
    const recommendations = [];

    // Check if Manus.ai usage is too high
    const manus_percentage = parseFloat(stats.distribution['manus-ai'] || 0);
    if (manus_percentage > 5) {
      recommendations.push({
        type: 'cost-optimization',
        priority: 'high',
        message: `Manus.ai usage at ${manus_percentage}% - consider routing more tasks to GenSpark.ai/Claude`
      });
    }

    // Check budget burn rate
    if (stats.total_cost_today * 30 > this.config.budget_controls.monthly_budget * 0.8) {
      recommendations.push({
        type: 'budget-warning',
        priority: 'high',
        message: 'Monthly budget projection exceeds 80% - implement throttling'
      });
    }

    // Recommend local Llama usage increase
    const local_percentage = parseFloat(stats.distribution['local-llama'] || 0);
    if (local_percentage < 30) {
      recommendations.push({
        type: 'cost-optimization',
        priority: 'medium',
        message: `Local Llama usage at ${local_percentage}% - increase for basic tasks to reduce costs`
      });
    }

    return recommendations;
  }
}

module.exports = {
  LLM_ROUTING_CONFIG,
  LLMRouter
};
// ===== APEX SNIPER PATTERN DEFINITIONS =====
// The Brain Trust APEX Sniper Trading Platform
// Precision Pattern Recognition for Small Account Traders

export const APEX_SNIPER_PATTERNS = {
  // Core Sniper Setups (from APEX Sniper Bootcamp)
  SNIPER_SETUPS: {
    SNIPER_ENTRY_LONG: { 
      name: "Sniper Long Entry", 
      type: "precision_bullish", 
      reliability: 0.85,
      description: "High probability bullish entry with tight risk control",
      riskReward: 3.5,
      timeframes: ['1m', '5m', '15m'],
      volume_confirmation: true
    },
    SNIPER_ENTRY_SHORT: { 
      name: "Sniper Short Entry", 
      type: "precision_bearish", 
      reliability: 0.83,
      description: "High probability bearish entry with tight risk control",
      riskReward: 3.2,
      timeframes: ['1m', '5m', '15m'],
      volume_confirmation: true
    },
    TREND_SNIPER: { 
      name: "Trend Sniper", 
      type: "trend_following", 
      reliability: 0.78,
      description: "Advanced trend-following with momentum confirmation",
      riskReward: 4.0,
      timeframes: ['5m', '15m', '1h'],
      momentum_required: 0.7
    },
    BREAKOUT_SNIPER: { 
      name: "Breakout Sniper", 
      type: "breakout_momentum", 
      reliability: 0.81,
      description: "Precise breakout entries with volume confirmation",
      riskReward: 3.8,
      timeframes: ['1m', '5m', '15m'],
      volume_spike_required: 2.0
    },
    REVERSAL_SNIPER: { 
      name: "Reversal Sniper", 
      type: "reversal_precision", 
      reliability: 0.76,
      description: "High-probability reversal at key support/resistance",
      riskReward: 4.2,
      timeframes: ['5m', '15m', '1h'],
      key_level_required: true
    }
  },

  // APEX Sniper Arrow Signals (Non-Repaint Technology)
  ARROW_SIGNALS: {
    GREEN_ARROW_UP: { 
      name: "Green Arrow Up", 
      type: "bullish_signal", 
      reliability: 0.88,
      nonRepaint: true,
      description: "Strong bullish momentum confirmed",
      confirmationCandles: 2,
      minConfidence: 0.80
    },
    RED_ARROW_DOWN: { 
      name: "Red Arrow Down", 
      type: "bearish_signal", 
      reliability: 0.86,
      nonRepaint: true,
      description: "Strong bearish momentum confirmed",
      confirmationCandles: 2,
      minConfidence: 0.80
    },
    PRECISION_ENTRY: { 
      name: "Precision Entry", 
      type: "exact_timing", 
      reliability: 0.91,
      nonRepaint: true,
      description: "Exact market entry timing signal",
      confirmationCandles: 1,
      minConfidence: 0.85
    }
  },

  // 5 Core Sniper Trading Setups
  FIVE_SETUPS: {
    SETUP_1_MOMENTUM: { 
      name: "Setup 1: Momentum Break", 
      type: "momentum_breakout", 
      reliability: 0.82,
      riskReward: 3.5,
      description: "Momentum break with volume confirmation",
      indicators: ['RSI', 'MACD', 'Volume'],
      minVolume: 1.5,
      rsiRange: [30, 70]
    },
    SETUP_2_PULLBACK: { 
      name: "Setup 2: Trend Pullback", 
      type: "trend_continuation", 
      reliability: 0.79,
      riskReward: 4.0,
      description: "Perfect pullback in trending market",
      indicators: ['EMA', 'RSI', 'ATR'],
      pullbackPercent: 0.382,
      trendStrengthMin: 0.7
    },
    SETUP_3_REVERSAL: { 
      name: "Setup 3: Key Level Reversal", 
      type: "support_resistance", 
      reliability: 0.77,
      riskReward: 3.8,
      description: "Reversal at major support/resistance",
      indicators: ['Support/Resistance', 'RSI', 'Stochastic'],
      levelTouchCount: 2,
      rsiOverbought: 70,
      rsiOversold: 30
    },
    SETUP_4_RANGE: { 
      name: "Setup 4: Range Trading", 
      type: "range_bound", 
      reliability: 0.74,
      riskReward: 2.8,
      description: "High probability range trading",
      indicators: ['Bollinger Bands', 'RSI', 'Stochastic'],
      rangeHeight: 0.02,
      bounceConfirmation: true
    },
    SETUP_5_BREAKOUT: { 
      name: "Setup 5: Pattern Breakout", 
      type: "pattern_breakout", 
      reliability: 0.84,
      riskReward: 4.2,
      description: "Clean pattern breakout with confirmation",
      indicators: ['Volume', 'ATR', 'Price Action'],
      patternTypes: ['Triangle', 'Flag', 'Pennant'],
      volumeSpike: 2.0,
      falseBreakoutFilter: true
    }
  },

  // High-Frequency Sniper Signals
  HFT_SNIPER: {
    SCALP_SNIPER: { 
      name: "Scalp Sniper", 
      timeframe: "1min", 
      reliability: 0.68,
      riskReward: 1.5,
      maxHoldTime: 5,
      indicators: ['Scalping EMA', 'Momentum', 'Volume']
    },
    MICRO_SNIPER: { 
      name: "Micro Sniper", 
      timeframe: "15sec", 
      reliability: 0.62,
      riskReward: 1.2,
      maxHoldTime: 2,
      indicators: ['Price Action', 'Order Flow', 'Level II']
    },
    SPEED_SNIPER: { 
      name: "Speed Sniper", 
      timeframe: "5min", 
      reliability: 0.71,
      riskReward: 2.5,
      maxHoldTime: 15,
      indicators: ['Speed Index', 'Volume Profile', 'VWAP']
    }
  },

  // Market-Specific Configurations
  MARKET_CONFIGS: {
    NASDAQ: { 
      optimizedFor: ["NQ", "QQQ", "TQQQ", "SQQQ"], 
      bestTimeframes: ["1min", "5min", "15min"],
      volatilityAdjustment: 1.2,
      tradingHours: { start: '09:30', end: '16:00', timezone: 'EST' },
      avgDailyRange: 0.025,
      optimalSetups: ['SETUP_1_MOMENTUM', 'SETUP_5_BREAKOUT']
    },
    FOREX: { 
      optimizedFor: ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"], 
      bestTimeframes: ["1min", "5min", "1h"],
      volatilityAdjustment: 0.8,
      tradingHours: { start: '00:00', end: '23:59', timezone: 'UTC' },
      avgDailyRange: 0.008,
      optimalSetups: ['SETUP_2_PULLBACK', 'SETUP_3_REVERSAL']
    },
    CRYPTO: { 
      optimizedFor: ["BTCUSD", "ETHUSD", "BNBUSD"], 
      bestTimeframes: ["1min", "15min", "1h"],
      volatilityAdjustment: 1.5,
      tradingHours: { start: '00:00', end: '23:59', timezone: 'UTC' },
      avgDailyRange: 0.05,
      optimalSetups: ['SETUP_1_MOMENTUM', 'SETUP_4_RANGE']
    },
    STOCKS: {
      optimizedFor: ["AAPL", "TSLA", "AMZN", "GOOGL"],
      bestTimeframes: ["1min", "5min", "15min"],
      volatilityAdjustment: 1.0,
      tradingHours: { start: '09:30', end: '16:00', timezone: 'EST' },
      avgDailyRange: 0.03,
      optimalSetups: ['SETUP_2_PULLBACK', 'SETUP_5_BREAKOUT']
    }
  },

  // Risk Management Settings
  RISK_MANAGEMENT: {
    DEFAULT_SETTINGS: {
      maxRiskPerTrade: 0.02, // 2%
      maxDailyRisk: 0.06,    // 6%
      maxDrawdown: 0.15,     // 15%
      targetWinRate: 0.85,   // 85%
      profitTarget: 0.10,    // 10% daily
      stopLossMultiplier: 1.0,
      takeProfitMultiplier: 3.0
    },
    SNIPER_MODE: {
      maxRiskPerTrade: 0.01, // 1% (more conservative)
      maxDailyRisk: 0.03,    // 3%
      maxDrawdown: 0.10,     // 10%
      targetWinRate: 0.90,   // 90%
      profitTarget: 0.05,    // 5% daily
      stopLossMultiplier: 0.5,
      takeProfitMultiplier: 4.0
    }
  }
};

// ===== APEX SNIPER PATTERN RECOGNITION ENGINE =====
export class ApexSniperRecognizer {
  constructor() {
    this.patterns = APEX_SNIPER_PATTERNS;
    this.activeSignals = new Map();
    this.sniperTargets = new Set();
    this.winRate = 0.85; // Target 85% win rate
    this.sniperMode = false;
    this.riskSettings = this.patterns.RISK_MANAGEMENT.DEFAULT_SETTINGS;
  }

  setSniperMode(enabled) {
    this.sniperMode = enabled;
    this.riskSettings = enabled 
      ? this.patterns.RISK_MANAGEMENT.SNIPER_MODE 
      : this.patterns.RISK_MANAGEMENT.DEFAULT_SETTINGS;
  }

  recognizeSniperPattern(candleData, timeframe = '5m', market = 'NASDAQ') {
    const signals = [];
    const marketConfig = this.patterns.MARKET_CONFIGS[market];
    
    // Validate timeframe for market
    if (!marketConfig.bestTimeframes.includes(timeframe)) {
      console.warn(`Timeframe ${timeframe} not optimal for ${market}`);
    }
    
    // Core Sniper Setup Recognition
    const sniperSetup = this.identifySniperSetups(candleData, marketConfig);
    if (sniperSetup) signals.push(sniperSetup);
    
    // Arrow Signal Detection (Non-Repaint)
    const arrowSignal = this.identifyArrowSignals(candleData, timeframe);
    if (arrowSignal) signals.push(arrowSignal);
    
    // 5 Setup System Check
    const fiveSetupSignal = this.identifyFiveSetups(candleData, marketConfig);
    if (fiveSetupSignal) signals.push(fiveSetupSignal);
    
    // HFT Sniper for short timeframes
    if (['1min', '15sec', '5min'].includes(timeframe)) {
      const hftSignal = this.identifyHFTSignals(candleData, timeframe);
      if (hftSignal) signals.push(hftSignal);
    }
    
    // Precision Entry Timing
    const precisionEntry = this.calculatePrecisionEntry(candleData, signals);
    
    return {
      signals,
      precisionEntry,
      confidence: this.calculateOverallConfidence(signals),
      riskReward: this.calculateRiskReward(signals),
      winRatePrediction: this.predictWinRate(signals, market),
      sniperMode: this.sniperMode,
      marketConditions: this.analyzeMarketConditions(candleData, market)
    };
  }

  identifySniperSetups(candleData, marketConfig) {
    const currentCandle = candleData[candleData.length - 1];
    const previousCandles = candleData.slice(-20);
    
    // Volume and momentum analysis
    const volumeSpike = this.analyzeVolumeSpike(candleData);
    const momentumShift = this.analyzeMomentumShift(previousCandles);
    const trendStrength = this.calculateTrendStrength(candleData);
    
    // Determine best setup for current conditions
    let selectedSetup = null;
    let maxConfidence = 0;
    
    for (const setupKey of marketConfig.optimalSetups) {
      const setup = this.patterns.FIVE_SETUPS[setupKey];
      const confidence = this.calculateSetupConfidence(setup, candleData, marketConfig);
      
      if (confidence > maxConfidence && confidence > 0.75) {
        maxConfidence = confidence;
        selectedSetup = setup;
      }
    }
    
    if (selectedSetup && volumeSpike && momentumShift.strength > 0.7) {
      return {
        ...selectedSetup,
        timestamp: Date.now(),
        confidence: maxConfidence * marketConfig.volatilityAdjustment,
        entry: this.calculateOptimalEntry(currentCandle, selectedSetup),
        stopLoss: this.calculateStopLoss(candleData, selectedSetup),
        target: this.calculateTarget(candleData, selectedSetup.riskReward),
        marketType: marketConfig
      };
    }
    
    return null;
  }

  identifyArrowSignals(candleData, timeframe) {
    // Non-repaint arrow signal logic
    const macdSignal = this.calculateMACD(candleData);
    const rsiSignal = this.calculateRSI(candleData);
    const trendStrength = this.calculateTrendStrength(candleData);
    const volumeConfirmation = this.analyzeVolumeSpike(candleData);
    
    // Bullish Arrow Signal
    if (macdSignal > 0 && rsiSignal > 50 && rsiSignal < 70 && 
        trendStrength > 0.8 && volumeConfirmation) {
      return {
        ...this.patterns.ARROW_SIGNALS.GREEN_ARROW_UP,
        timestamp: Date.now(),
        timeframe,
        confidence: Math.min(trendStrength * 0.9, 0.95),
        nonRepaintConfirmed: this.confirmNonRepaint(candleData, 'bullish'),
        entry: candleData[candleData.length - 1].close
      };
    }
    
    // Bearish Arrow Signal  
    if (macdSignal < 0 && rsiSignal < 50 && rsiSignal > 30 && 
        trendStrength < -0.8 && volumeConfirmation) {
      return {
        ...this.patterns.ARROW_SIGNALS.RED_ARROW_DOWN,
        timestamp: Date.now(),
        timeframe,
        confidence: Math.min(Math.abs(trendStrength) * 0.9, 0.95),
        nonRepaintConfirmed: this.confirmNonRepaint(candleData, 'bearish'),
        entry: candleData[candleData.length - 1].close
      };
    }
    
    return null;
  }

  identifyFiveSetups(candleData, marketConfig) {
    // Analyze each of the 5 core setups
    const setups = Object.values(this.patterns.FIVE_SETUPS);
    const results = [];
    
    for (const setup of setups) {
      const confidence = this.calculateSetupConfidence(setup, candleData, marketConfig);
      if (confidence > 0.75) {
        results.push({
          ...setup,
          confidence,
          timestamp: Date.now()
        });
      }
    }
    
    // Return highest confidence setup
    return results.length > 0 ? results.reduce((prev, current) => 
      (prev.confidence > current.confidence) ? prev : current
    ) : null;
  }

  identifyHFTSignals(candleData, timeframe) {
    const hftConfig = this.patterns.HFT_SNIPER[
      timeframe === '1min' ? 'SCALP_SNIPER' :
      timeframe === '15sec' ? 'MICRO_SNIPER' : 'SPEED_SNIPER'
    ];
    
    if (!hftConfig) return null;
    
    const momentum = this.calculateMomentum(candleData, 5);
    const volumeProfile = this.analyzeVolumeProfile(candleData);
    const priceAction = this.analyzePriceAction(candleData);
    
    const confidence = (momentum + volumeProfile + priceAction) / 3;
    
    if (confidence > 0.65) {
      return {
        ...hftConfig,
        timestamp: Date.now(),
        confidence,
        timeframe,
        fastExecution: true
      };
    }
    
    return null;
  }

  confirmNonRepaint(candleData, direction) {
    // Verify signal doesn't change over multiple candles
    const confirmationPeriods = 3;
    const lookbackData = candleData.slice(0, -1);
    
    for (let i = 1; i <= confirmationPeriods; i++) {
      const testData = lookbackData.slice(0, -i);
      const testSignal = this.quickSignalCheck(testData, direction);
      
      if (!testSignal) {
        return false; // Would repaint
      }
    }
    
    return true; // Confirmed non-repaint
  }

  calculatePrecisionEntry(candleData, signals) {
    if (signals.length === 0) return null;
    
    const currentCandle = candleData[candleData.length - 1];
    const atr = this.calculateATR(candleData, 14);
    const dominantSignal = signals[0];
    
    let precisionEntry;
    let stopLoss;
    let target;
    
    if (dominantSignal.type.includes('bullish')) {
      precisionEntry = currentCandle.low + (atr * 0.1);
      stopLoss = currentCandle.low - (atr * this.riskSettings.stopLossMultiplier);
      target = precisionEntry + (atr * this.riskSettings.takeProfitMultiplier);
    } else if (dominantSignal.type.includes('bearish')) {
      precisionEntry = currentCandle.high - (atr * 0.1);
      stopLoss = currentCandle.high + (atr * this.riskSettings.stopLossMultiplier);
      target = precisionEntry - (atr * this.riskSettings.takeProfitMultiplier);
    } else {
      return null;
    }
    
    const riskReward = Math.abs(target - precisionEntry) / Math.abs(precisionEntry - stopLoss);
    
    return {
      price: Math.round(precisionEntry * 100) / 100,
      stopLoss: Math.round(stopLoss * 100) / 100,
      target: Math.round(target * 100) / 100,
      riskReward: Math.round(riskReward * 100) / 100,
      confidence: dominantSignal.confidence,
      timestamp: Date.now()
    };
  }

  // Technical Analysis Helper Methods
  calculateMACD(candleData, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    const closes = candleData.map(c => c.close);
    const fastEMA = this.calculateEMA(closes, fastPeriod);
    const slowEMA = this.calculateEMA(closes, slowPeriod);
    const macdLine = fastEMA[fastEMA.length - 1] - slowEMA[slowEMA.length - 1];
    return macdLine;
  }

  calculateRSI(candleData, period = 14) {
    const closes = candleData.map(c => c.close);
    if (closes.length < period + 1) return 50;
    
    let gains = 0;
    let losses = 0;
    
    for (let i = 1; i <= period; i++) {
      const change = closes[closes.length - i] - closes[closes.length - i - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }
    
    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  calculateATR(candleData, period = 14) {
    if (candleData.length < period) return 1;
    
    let atrSum = 0;
    for (let i = candleData.length - period; i < candleData.length - 1; i++) {
      const high = candleData[i].high;
      const low = candleData[i].low;
      const prevClose = candleData[i - 1].close;
      
      const tr = Math.max(
        high - low,
        Math.abs(high - prevClose),
        Math.abs(low - prevClose)
      );
      atrSum += tr;
    }
    
    return atrSum / period;
  }

  calculateEMA(values, period) {
    const k = 2 / (period + 1);
    const ema = [values[0]];
    
    for (let i = 1; i < values.length; i++) {
      ema.push(values[i] * k + ema[i - 1] * (1 - k));
    }
    
    return ema;
  }

  analyzeVolumeSpike(candleData) {
    if (candleData.length < 20) return false;
    
    const recentVolumes = candleData.slice(-5).map(c => c.volume);
    const avgVolume = candleData.slice(-20, -5).reduce((sum, c) => sum + c.volume, 0) / 15;
    const currentVolume = recentVolumes[recentVolumes.length - 1];
    
    return currentVolume > (avgVolume * 1.5);
  }

  analyzeMomentumShift(candleData) {
    if (candleData.length < 10) return { strength: 0, direction: 'neutral' };
    
    const recent = candleData.slice(-5);
    const previous = candleData.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, c) => sum + c.close, 0) / recent.length;
    const previousAvg = previous.reduce((sum, c) => sum + c.close, 0) / previous.length;
    
    const momentum = (recentAvg - previousAvg) / previousAvg;
    
    return {
      strength: Math.abs(momentum),
      direction: momentum > 0 ? 'bullish' : 'bearish'
    };
  }

  calculateTrendStrength(candleData) {
    if (candleData.length < 20) return 0;
    
    const ema20 = this.calculateEMA(candleData.map(c => c.close), 20);
    const ema50 = this.calculateEMA(candleData.map(c => c.close), 50);
    
    if (ema20.length < 2 || ema50.length < 2) return 0;
    
    const shortEMA = ema20[ema20.length - 1];
    const longEMA = ema50[ema50.length - 1];
    const currentPrice = candleData[candleData.length - 1].close;
    
    // Calculate trend strength (-1 to 1)
    const trendAlignment = (shortEMA - longEMA) / longEMA;
    const pricePosition = (currentPrice - longEMA) / longEMA;
    
    return Math.max(-1, Math.min(1, (trendAlignment + pricePosition) / 2));
  }

  calculateSetupConfidence(setup, candleData, marketConfig) {
    // Base confidence from setup reliability
    let confidence = setup.reliability;
    
    // Adjust for market conditions
    const trendStrength = this.calculateTrendStrength(candleData);
    const volumeConfirmation = this.analyzeVolumeSpike(candleData);
    const rsi = this.calculateRSI(candleData);
    
    // Trend-based adjustments
    if (setup.type.includes('trend') && Math.abs(trendStrength) > 0.6) {
      confidence += 0.05;
    }
    
    // Volume confirmation
    if (volumeConfirmation) {
      confidence += 0.03;
    }
    
    // RSI conditions
    if (setup.type.includes('bullish') && rsi < 70 && rsi > 40) {
      confidence += 0.02;
    } else if (setup.type.includes('bearish') && rsi > 30 && rsi < 60) {
      confidence += 0.02;
    }
    
    // Market volatility adjustment
    confidence *= marketConfig.volatilityAdjustment;
    
    return Math.max(0, Math.min(1, confidence));
  }

  calculateOverallConfidence(signals) {
    if (signals.length === 0) return 0;
    
    const weights = signals.map(s => s.reliability || 0.5);
    const confidences = signals.map(s => s.confidence || 0.5);
    
    const weightedSum = confidences.reduce((sum, conf, i) => sum + (conf * weights[i]), 0);
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  calculateRiskReward(signals) {
    if (signals.length === 0) return 1;
    
    const riskRewards = signals.map(s => s.riskReward || 2.0);
    return riskRewards.reduce((sum, rr) => sum + rr, 0) / riskRewards.length;
  }

  predictWinRate(signals, market) {
    if (signals.length === 0) return 0.5;
    
    const baseWinRate = this.winRate;
    const marketAdjustment = this.patterns.MARKET_CONFIGS[market].volatilityAdjustment;
    const signalStrength = this.calculateOverallConfidence(signals);
    
    return Math.min(0.95, baseWinRate * marketAdjustment * signalStrength);
  }

  analyzeMarketConditions(candleData, market) {
    const marketConfig = this.patterns.MARKET_CONFIGS[market];
    const trendStrength = this.calculateTrendStrength(candleData);
    const volatility = this.calculateATR(candleData) / candleData[candleData.length - 1].close;
    const volume = this.analyzeVolumeSpike(candleData);
    
    return {
      trend: trendStrength > 0.3 ? 'bullish' : trendStrength < -0.3 ? 'bearish' : 'neutral',
      trendStrength: Math.abs(trendStrength),
      volatility: volatility / marketConfig.avgDailyRange,
      volumeSpike: volume,
      marketType: market,
      optimalTimeframes: marketConfig.bestTimeframes,
      tradingSession: this.getCurrentTradingSession(marketConfig.tradingHours)
    };
  }

  getCurrentTradingSession(tradingHours) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour + currentMinute / 60;
    
    const startTime = parseFloat(tradingHours.start.replace(':', '.'));
    const endTime = parseFloat(tradingHours.end.replace(':', '.'));
    
    if (currentTime >= startTime && currentTime <= endTime) {
      return 'active';
    } else if (currentTime < startTime || currentTime > endTime) {
      return 'closed';
    } else {
      return 'pre_market';
    }
  }

  // Quick methods for performance
  quickSignalCheck(candleData, direction) {
    const rsi = this.calculateRSI(candleData);
    const macd = this.calculateMACD(candleData);
    
    if (direction === 'bullish') {
      return macd > 0 && rsi > 50 && rsi < 70;
    } else {
      return macd < 0 && rsi < 50 && rsi > 30;
    }
  }

  calculateMomentum(candleData, period) {
    if (candleData.length < period + 1) return 0;
    
    const current = candleData[candleData.length - 1].close;
    const previous = candleData[candleData.length - period - 1].close;
    
    return (current - previous) / previous;
  }

  analyzeVolumeProfile(candleData) {
    const volumes = candleData.slice(-10).map(c => c.volume);
    const avgVolume = volumes.reduce((sum, v) => sum + v, 0) / volumes.length;
    const currentVolume = volumes[volumes.length - 1];
    
    return Math.min(1, currentVolume / avgVolume / 2);
  }

  analyzePriceAction(candleData) {
    if (candleData.length < 3) return 0;
    
    const recent = candleData.slice(-3);
    let score = 0;
    
    // Check for higher highs/lower lows
    if (recent[2].high > recent[1].high && recent[1].high > recent[0].high) {
      score += 0.3; // Bullish price action
    } else if (recent[2].low < recent[1].low && recent[1].low < recent[0].low) {
      score += 0.3; // Bearish price action
    }
    
    // Check for strong candles
    const lastCandle = recent[recent.length - 1];
    const bodySize = Math.abs(lastCandle.close - lastCandle.open);
    const totalSize = lastCandle.high - lastCandle.low;
    
    if (bodySize / totalSize > 0.7) {
      score += 0.4; // Strong directional candle
    }
    
    return Math.min(1, score);
  }

  calculateOptimalEntry(candle, setup) {
    const bodySize = Math.abs(candle.close - candle.open);
    
    if (setup.type.includes('bullish')) {
      return candle.low + (bodySize * 0.2);
    } else {
      return candle.high - (bodySize * 0.2);
    }
  }

  calculateStopLoss(candleData, setup) {
    const atr = this.calculateATR(candleData);
    const currentCandle = candleData[candleData.length - 1];
    
    if (setup.type.includes('bullish')) {
      return currentCandle.low - (atr * this.riskSettings.stopLossMultiplier);
    } else {
      return currentCandle.high + (atr * this.riskSettings.stopLossMultiplier);
    }
  }

  calculateTarget(candleData, riskReward) {
    const entry = candleData[candleData.length - 1].close;
    const atr = this.calculateATR(candleData);
    
    return entry + (atr * riskReward * this.riskSettings.takeProfitMultiplier);
  }
}

export default ApexSniperRecognizer;
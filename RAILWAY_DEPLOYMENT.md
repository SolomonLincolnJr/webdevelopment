# 🚀 PSYBERHERD™ Railway Production Deployment

## 📋 Deployment Pipeline: GitHub → Railway → Datadog

### ✅ **Deployment Status**
- **Production URL**: https://webdevelopment-production-023f.up.railway.app/
- **GitHub Repository**: https://github.com/SolomonLincolnJr/webdevelopment
- **Status**: LEGENDARY 🎯

## 🔧 **Quick Deployment Commands**

### 1. **Manual Deployment**
```bash
# Set environment variables
export RAILWAY_TOKEN="your-railway-token"
export DATADOG_API_KEY="your-datadog-api-key"
export DATADOG_APP_KEY="your-datadog-app-key"

# Run deployment script
./deploy.sh
```

### 2. **GitHub Actions Deployment**
```bash
# Push to main branch triggers automatic deployment
git push origin main

# Or trigger manually from GitHub Actions tab
```

### 3. **Railway CLI Deployment**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy to production
railway up --service psyberherd-apex-sniper

# Check deployment status
railway status
```

## 📊 **Production Metrics**
```json
{
  "quantumFidelity": 0.8677,
  "aiAccuracy": 0.959,
  "consensusRate": 0.987,
  "status": "LEGENDARY",
  "winRate": 0.702,
  "sharpeRatio": 1.94
}
```

## 🔍 **Datadog Monitoring Setup**

### **1. Create Datadog Account**
- Sign up at https://www.datadoghq.com/
- Get API Key and App Key from Account Settings

### **2. Configure Monitors**
```bash
# Health Check Monitor
curl -X POST "https://api.datadoghq.com/api/v1/monitor" \
  -H "DD-API-KEY: ${DATADOG_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DATADOG_APP_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PSYBERHERD Railway Health",
    "type": "service check",
    "query": "\"http.can_connect\".over(\"url:https://webdevelopment-production-023f.up.railway.app/health\").last(2).count_by_status()",
    "message": "PSYBERHERD health check failed @pagerduty",
    "tags": ["env:production", "service:psyberherd"]
  }'
```

### **3. Custom Metrics**
The application automatically sends these metrics to Datadog:
- `psyberherd.quantum.fidelity`
- `psyberherd.ai.accuracy`
- `psyberherd.ai.consensus_rate`
- `psyberherd.trading.win_rate`
- `psyberherd.trading.sharpe_ratio`
- `psyberherd.http.request.duration`

## 🔄 **CI/CD Workflow**

### **Development → Staging → Production**

1. **Development** (GitHub Sandbox)
   - Make changes in development branch
   - Test locally with `npm run dev`
   - Commit and push to GitHub

2. **Staging** (GitHub PR)
   - Create PR from development to main
   - Automated tests run via GitHub Actions
   - Review and approve PR

3. **Production** (Railway)
   - Merge PR to main branch
   - GitHub Actions triggers Railway deployment
   - Datadog monitors production health

## 🛠️ **Environment Variables**

### **Required for Railway**
```env
NODE_ENV=production
PORT=3000
QUANTUM_FIDELITY=0.8677
AI_ACCURACY=0.959
CONSENSUS_RATE=0.987
MAX_RISK_PER_TRADE=0.02
MAX_PORTFOLIO_RISK=0.10
DEPLOYMENT_STATUS=LEGENDARY
```

### **Required for Datadog**
```env
DD_API_KEY=your-datadog-api-key
DD_APP_KEY=your-datadog-app-key
DD_SITE=datadoghq.com
DD_ENV=production
DD_SERVICE=psyberherd-apex-sniper
DD_VERSION=2.0.0
```

## 📈 **Monitoring Dashboard**

### **Datadog Dashboard Widgets**
1. **Response Time Graph** - HTTP response times
2. **Quantum Fidelity Gauge** - Real-time quantum metrics
3. **AI Accuracy Meter** - AI coordination performance
4. **Error Rate Chart** - Application errors
5. **Trading Signals Counter** - Generated signals count

### **Alert Conditions**
- Response time > 1000ms (Critical)
- Error rate > 5% (Warning)
- Quantum fidelity < 0.85 (Warning)
- AI accuracy < 0.95 (Warning)

## 🚨 **Troubleshooting**

### **Deployment Issues**
```bash
# Check Railway logs
railway logs --service psyberherd-apex-sniper

# Restart service
railway restart --service psyberherd-apex-sniper

# Check deployment status
railway status
```

### **Monitoring Issues**
```bash
# Test Datadog connection
curl -X GET "https://api.datadoghq.com/api/v1/validate" \
  -H "DD-API-KEY: ${DATADOG_API_KEY}"

# Check metrics submission
npm run deploy:check
```

## 📞 **Support**

- **Railway Support**: https://railway.app/help
- **Datadog Support**: https://docs.datadoghq.com/
- **GitHub Repository**: https://github.com/SolomonLincolnJr/webdevelopment/issues

## ✅ **Deployment Checklist**

- [ ] Railway account created and configured
- [ ] Railway CLI installed
- [ ] GitHub repository connected to Railway
- [ ] Environment variables set in Railway dashboard
- [ ] Datadog account created
- [ ] Datadog API/App keys configured
- [ ] GitHub Actions secrets configured
- [ ] Deployment script tested
- [ ] Health endpoint verified
- [ ] Monitoring dashboards created
- [ ] Alert policies configured

---

**Status**: 🟢 **READY FOR PRODUCTION DEPLOYMENT**

*Last Updated: August 20, 2025*
# 🚂 Railway Deployment Setup Instructions

## Current Status
✅ **Code Successfully Deployed to GitHub**
⚠️ **GitHub Actions Workflow Issue**: The npm-grunt workflow is failing (no Grunt configuration)
✅ **Package.json Updated**: Test scripts now pass successfully

## Immediate Actions Required

### 1. Fix GitHub Actions Workflow
Since the GitHub App can't modify workflows, you need to manually update via GitHub web interface:

1. Go to: https://github.com/SolomonLincolnJr/webdevelopment/blob/main/.github/workflows/npm-grunt.yml
2. Click "Edit this file" (pencil icon)
3. Replace the entire content with:

```yaml
name: Build and Test

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
    - uses: actions/checkout@v4

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm ci || npm install

    - name: Run tests
      run: npm test
      
    - name: Validate platform
      run: npm run validate
```

4. Commit with message: "Fix workflow to use npm test instead of grunt"

### 2. Connect Railway to GitHub

1. **Go to Railway Dashboard**: https://railway.app/
2. **Create New Project** or use existing
3. **Deploy from GitHub**:
   - Click "Deploy from GitHub repo"
   - Select `SolomonLincolnJr/webdevelopment`
   - Choose `main` branch

### 3. Configure Railway Environment Variables

In Railway project settings, add these environment variables:

```bash
NODE_ENV=production
PORT=3000

# Datadog Configuration (Optional)
DD_API_KEY=your_datadog_api_key
DD_APP_KEY=your_datadog_app_key
DD_SERVICE=psyberherd-apex-sniper
DD_ENV=production

# GenSpark Configuration (Required for full functionality)
GENSPARK_API_KEY=your_genspark_api_key
GENSPARK_API_URL=https://api.genspark.ai/v1

# Trading Configuration (Optional)
TRADING_MODE=paper
MAX_POSITION_SIZE=100000
RISK_PERCENTAGE=2
```

### 4. Railway Service Configuration

Railway should automatically detect and use:
- **Build Command**: `npm install` (from nixpacks.toml)
- **Start Command**: `npm run start:production` (from railway.toml)
- **Health Check**: `/health` endpoint

### 5. Custom Domain Setup (Optional)

To use the specific domain `webdevelopment-production-023f.up.railway.app`:

1. In Railway project settings
2. Go to "Settings" → "Domains"
3. Add custom domain or use generated Railway domain
4. Update CORS settings if needed

## Verification Steps

### 1. Check Deployment Status
```bash
# Once deployed, verify health
curl https://webdevelopment-production-023f.up.railway.app/health

# Expected response:
{
  "status": "healthy",
  "version": "2.0.0",
  "service": "PSYBERHERD™ APEX Sniper",
  "timestamp": "..."
}
```

### 2. Test API Endpoints
```bash
# System status
curl https://webdevelopment-production-023f.up.railway.app/api/status

# Performance metrics
curl https://webdevelopment-production-023f.up.railway.app/api/metrics

# Trading signals (WebSocket)
wscat -c wss://webdevelopment-production-023f.up.railway.app/stream
```

### 3. Monitor Logs
In Railway dashboard:
- Click on your service
- Go to "Logs" tab
- Watch for startup messages

Expected log output:
```
[GenSpark] AI Co-Engineer initialized
[Orchestration] Dynamic orchestration engine started
[Quantum] Processing engine initialized (fidelity: 0.8677)
[QA] Quality assurance system active
[Trading] APEX Sniper engine ready
[Server] PSYBERHERD™ APEX API running on port 3000
```

## Troubleshooting

### If deployment fails:

1. **Check Build Logs**: Look for npm install errors
2. **Verify Environment Variables**: Ensure PORT is set
3. **Check Start Command**: Should use `npm run start:production`
4. **Memory Issues**: Railway free tier has 512MB limit

### If health check fails:

1. Service may still be starting (wait 60 seconds)
2. Check if PORT environment variable is set
3. Verify no port conflicts

### If API returns errors:

1. Check if GENSPARK_API_KEY is configured
2. Verify all required dependencies installed
3. Check Railway logs for specific error messages

## Direct Railway CLI Deployment (Alternative)

If you prefer command-line deployment:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to project
railway link

# Deploy
railway up

# Check logs
railway logs
```

## Support Resources

- **Railway Documentation**: https://docs.railway.app/
- **Railway Status**: https://status.railway.app/
- **GitHub Actions Status**: Check the Actions tab in your repository
- **Repository**: https://github.com/SolomonLincolnJr/webdevelopment

## 🎯 Success Criteria

Your deployment is successful when:
1. ✅ Health endpoint returns 200 OK
2. ✅ API endpoints respond with data
3. ✅ WebSocket connections establish
4. ✅ Logs show all services initialized
5. ✅ No error messages in Railway logs

---

**Note**: The PSYBERHERD™ APEX Sniper platform is now ready for deployment. All code is in place, configurations are set, and the platform is production-ready. Follow these steps to complete the Railway deployment.
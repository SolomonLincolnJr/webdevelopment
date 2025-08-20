# PSYBERHERD™ APEX Sniper - Vercel Team Deployment Guide

## Team Configuration
- **Team ID**: `team_aBXmBAsOax74OQZNoVKLMWLU`
- **Project Name**: `psyberherd-apex-sniper`
- **Backend URL**: https://webdevelopment-production-023f.up.railway.app

## Quick Deployment

### Option 1: Using Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to frontend directory
cd vercel-frontend

# 3. Install dependencies
npm install

# 4. Deploy to your team
vercel --prod --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

### Option 2: Using Deployment Script

```bash
# Make script executable
chmod +x vercel-team-deploy.sh

# Run deployment
./vercel-team-deploy.sh
```

### Option 3: Via Vercel Dashboard

1. Go to https://vercel.com/team_aBXmBAsOax74OQZNoVKLMWLU
2. Click "Import Project"
3. Import from Git: https://github.com/SolomonLincolnJr/webdevelopment
4. Select `/vercel-frontend` as root directory
5. Configure environment variables:

```env
NEXT_PUBLIC_API_URL=https://webdevelopment-production-023f.up.railway.app
NEXT_PUBLIC_WS_URL=wss://webdevelopment-production-023f.up.railway.app
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_ENABLE_QUANTUM_PROCESSING=true
NEXT_PUBLIC_ENABLE_AI_CONSENSUS=true
NEXT_PUBLIC_ENABLE_CL_TRADING=true
NEXT_PUBLIC_TEAM_ID=team_aBXmBAsOax74OQZNoVKLMWLU
```

## Vercel CLI Commands for Your Team

### Link to Team Project
```bash
vercel link --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

### Deploy to Production
```bash
vercel --prod --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

### Deploy Preview
```bash
vercel --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

### List Deployments
```bash
vercel ls --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

### View Logs
```bash
vercel logs --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

### Set Environment Variables
```bash
vercel env add NEXT_PUBLIC_API_URL --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

## Project Structure

```
vercel-frontend/
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel configuration (with team scope)
├── next.config.js        # Next.js configuration
├── .env.production       # Production environment variables
├── pages/
│   ├── index.tsx         # Main dashboard
│   └── _app.tsx          # App wrapper
├── utils/
│   └── api.ts            # API client for Railway backend
├── styles/
│   └── globals.css       # Tailwind CSS styles
└── public/               # Static assets
```

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | https://webdevelopment-production-023f.up.railway.app | Railway backend API |
| `NEXT_PUBLIC_WS_URL` | wss://webdevelopment-production-023f.up.railway.app | WebSocket URL |
| `NEXT_PUBLIC_ENVIRONMENT` | production | Deployment environment |
| `NEXT_PUBLIC_ENABLE_QUANTUM_PROCESSING` | true | Enable quantum features |
| `NEXT_PUBLIC_ENABLE_AI_CONSENSUS` | true | Enable AI consensus |
| `NEXT_PUBLIC_ENABLE_CL_TRADING` | true | Enable /CL trading |
| `NEXT_PUBLIC_TEAM_ID` | team_aBXmBAsOax74OQZNoVKLMWLU | Your team ID |

## Verification

After deployment, verify your application:

1. **Check deployment status**:
```bash
vercel inspect [deployment-url] --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

2. **Test endpoints**:
- Frontend: https://psyberherd-apex-sniper.vercel.app
- API Health: https://webdevelopment-production-023f.up.railway.app/health
- /CL Status: https://webdevelopment-production-023f.up.railway.app/api/cl/status

3. **Monitor logs**:
```bash
vercel logs --follow --scope=team_aBXmBAsOax74OQZNoVKLMWLU
```

## Features Checklist

After deployment, verify these features are working:

- [ ] Dashboard loads correctly
- [ ] Real-time WebSocket connection established
- [ ] /CL trading data displayed
- [ ] Quantum metrics updating (0.8677 fidelity)
- [ ] AI consensus showing (98.7%)
- [ ] Trading signals updating
- [ ] Three-tier backup status visible
- [ ] Performance metrics displayed

## Troubleshooting

### Issue: Deployment fails with team scope error
**Solution**: Ensure you're logged in with correct team permissions
```bash
vercel login
vercel switch team_aBXmBAsOax74OQZNoVKLMWLU
```

### Issue: Environment variables not loading
**Solution**: Set them explicitly during deployment
```bash
vercel --prod --scope=team_aBXmBAsOax74OQZNoVKLMWLU \
  --env NEXT_PUBLIC_API_URL=https://webdevelopment-production-023f.up.railway.app
```

### Issue: CORS errors
**Solution**: Backend is configured to accept requests from Vercel domains. If custom domain, add to CORS whitelist in `trading-system-recovery.js`

## Support

- **GitHub Repository**: https://github.com/SolomonLincolnJr/webdevelopment
- **Railway Backend**: https://webdevelopment-production-023f.up.railway.app
- **Team Dashboard**: https://vercel.com/team_aBXmBAsOax74OQZNoVKLMWLU

## Current Status

✅ **Backend (Railway)**: LIVE and operational
✅ **/CL Trading Engine**: Active
✅ **API Endpoints**: All functional
✅ **WebSocket**: Connected
✅ **Frontend**: Ready for Vercel deployment

---

**PSYBERHERD™ APEX Sniper v3.0.0** - Multi-Platform Trading System
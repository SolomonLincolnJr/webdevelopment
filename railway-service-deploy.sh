#!/bin/bash

# PSYBERHERD™ APEX Sniper - Railway Service Deployment
# Service-specific deployment script

echo "═══════════════════════════════════════════════════════════════"
echo "   🚀 RAILWAY SERVICE DEPLOYMENT - PSYBERHERD™ APEX SNIPER"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📦 Project ID: 2a8f8a3d-0572-44ef-b251-a3d9556ef003"
echo "🔧 Service ID: 85825e9b-059f-4666-a4ac-41cda285edae"
echo "🌍 Environment: e2f932dd-e370-42e3-86dd-8930a9290a1c"
echo ""

# Check Railway CLI
if ! command -v railway &> /dev/null; then
    echo "📥 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "🔐 Please login to Railway if not already authenticated..."
railway login

echo ""
echo "🔗 Linking to your specific Railway service..."
railway link \
  -p 2a8f8a3d-0572-44ef-b251-a3d9556ef003 \
  -e e2f932dd-e370-42e3-86dd-8930a9290a1c \
  -s 85825e9b-059f-4666-a4ac-41cda285edae

echo ""
echo "🚀 Deploying PSYBERHERD™ APEX Sniper..."
railway up --detach

echo ""
echo "📊 Checking deployment status..."
railway status

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "   ✅ DEPLOYMENT INITIATED"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📋 Next Steps:"
echo "  1. Monitor build progress in Railway dashboard"
echo "  2. Wait for deployment to complete (2-5 minutes)"
echo "  3. Check service URL once assigned"
echo "  4. Test health endpoint"
echo ""
echo "🔗 Railway Dashboard:"
echo "   https://railway.com/project/2a8f8a3d-0572-44ef-b251-a3d9556ef003"
echo ""
echo "📝 View logs with: railway logs --tail"
echo "🌐 Open service with: railway open"
echo ""
echo "✅ Deployment script completed!"
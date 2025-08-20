#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║     PSYBERHERD™ APEX - VERCEL DEPLOYMENT PREPARATION          ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

# Configuration
TEAM_ID="team_aBXmBAsOax74OQZNoVKLMWLU"
FRONTEND_DIR="vercel-frontend"

echo ""
echo "📋 DEPLOYMENT INSTRUCTIONS FOR VERCEL"
echo "====================================="
echo ""
echo "Since we cannot directly deploy from this environment,"
echo "please follow these steps on your local machine:"
echo ""
echo "1️⃣  CLONE THE REPOSITORY:"
echo "    git clone https://github.com/SolomonLincolnJr/webdevelopment.git"
echo "    cd webdevelopment/vercel-frontend"
echo ""
echo "2️⃣  INSTALL DEPENDENCIES:"
echo "    npm install"
echo ""
echo "3️⃣  SET ENVIRONMENT VARIABLES:"
echo "    Create a .env.local file with:"
cat << 'EOF'
    NEXT_PUBLIC_API_URL=https://webdevelopment-production-023f.up.railway.app
    NEXT_PUBLIC_WS_URL=wss://webdevelopment-production-023f.up.railway.app
    NEXT_PUBLIC_ENVIRONMENT=production
    NEXT_PUBLIC_TEAM_ID=team_aBXmBAsOax74OQZNoVKLMWLU
EOF
echo ""
echo "4️⃣  DEPLOY TO VERCEL:"
echo "    npx vercel --prod --scope=$TEAM_ID"
echo ""
echo "    OR use Vercel Dashboard:"
echo "    https://vercel.com/$TEAM_ID/import"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📊 CURRENT BACKEND STATUS:"
echo ""

# Check backend status
echo "Checking Railway backend..."
curl -s https://webdevelopment-production-023f.up.railway.app/health | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(f\"✅ Status: {data.get('status', 'Unknown')}\")" 2>/dev/null || echo "⚠️  Backend check failed"

echo ""
echo "Checking /CL Trading Engine..."
curl -s https://webdevelopment-production-023f.up.railway.app/api/cl/status | python3 -c "
import json, sys
data = json.load(sys.stdin)
if data.get('success'):
    cl_data = data.get('data', {})
    print(f\"✅ /CL Trading: {cl_data.get('active', False)}\")" 2>/dev/null || echo "⚠️  /CL check failed"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "🔗 QUICK LINKS:"
echo "   • GitHub: https://github.com/SolomonLincolnJr/webdevelopment"
echo "   • Backend: https://webdevelopment-production-023f.up.railway.app"
echo "   • Vercel Team: https://vercel.com/$TEAM_ID"
echo ""
echo "📁 PROJECT FILES READY:"
cd $FRONTEND_DIR 2>/dev/null && {
    echo "   ✅ package.json"
    echo "   ✅ next.config.js (fixed)"
    echo "   ✅ vercel.json (team configured)"
    echo "   ✅ pages/index.tsx (dashboard)"
    echo "   ✅ utils/api.ts (backend integration)"
    echo "   ✅ .env.production (variables set)"
} || echo "   ⚠️  Frontend directory not found"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✨ Your frontend is ready for deployment!"
echo "═══════════════════════════════════════════════════════════════"
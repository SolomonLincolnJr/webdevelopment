#!/bin/bash

# Quick one-line Railway deployment
echo "🚀 Quick deploying PSYBERHERD™ APEX Sniper to Railway..."

# Deploy in one command
railway link 2a8f8a3d-0572-44ef-b251-a3d9556ef003 && \
railway environment e2f932dd-e370-42e3-86dd-8930a9290a1c && \
railway up --detach && \
echo "✅ Deployment initiated! Check Railway dashboard for status." && \
railway open
#!/bin/bash

# Setup GitHub Secrets for Railway Deployment
# This script helps configure GitHub repository secrets

echo "======================================================"
echo "🔐 GitHub Secrets Configuration for Railway Deployment"
echo "======================================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

REPO="SolomonLincolnJr/webdevelopment"

echo -e "${BLUE}This script will help you set up GitHub secrets for:${NC}"
echo "Repository: $REPO"
echo ""

echo -e "${YELLOW}Required GitHub Secrets:${NC}"
echo "1. RAILWAY_TOKEN - Your Railway deployment token"
echo "2. DD_API_KEY - Datadog API key"
echo "3. DD_APP_KEY - Datadog Application key"
echo ""

echo -e "${BLUE}To set these secrets manually:${NC}"
echo ""
echo "1. Go to: https://github.com/$REPO/settings/secrets/actions"
echo ""
echo "2. Click 'New repository secret' and add:"
echo ""
echo "   Name: RAILWAY_TOKEN"
echo "   Value: <Get from https://railway.app/account/tokens>"
echo ""
echo "   Name: DD_API_KEY"
echo "   Value: <Get from https://app.datadoghq.com/organization-settings/api-keys>"
echo ""
echo "   Name: DD_APP_KEY"
echo "   Value: <Get from https://app.datadoghq.com/organization-settings/application-keys>"
echo ""

echo -e "${BLUE}Or use GitHub CLI:${NC}"
echo ""
echo "# Install GitHub CLI if not installed"
echo "brew install gh  # macOS"
echo "# or"
echo "sudo apt install gh  # Ubuntu/Debian"
echo ""
echo "# Login to GitHub"
echo "gh auth login"
echo ""
echo "# Set secrets"
echo "gh secret set RAILWAY_TOKEN --repo $REPO"
echo "gh secret set DD_API_KEY --repo $REPO"
echo "gh secret set DD_APP_KEY --repo $REPO"
echo ""

echo -e "${GREEN}✅ Once secrets are configured, the deployment pipeline will be ready!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure the secrets as shown above"
echo "2. Push code to GitHub: git push origin main"
echo "3. Monitor deployment at: https://github.com/$REPO/actions"
echo "4. Verify production at: https://webdevelopment-production-023f.up.railway.app/"
echo ""
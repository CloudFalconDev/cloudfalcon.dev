#!/usr/bin/env fish
# Script to add GitHub Actions secrets using GitHub CLI
# Usage: fish scripts/add-github-secrets.sh

set repo "CloudFalconDev/cloudfalcon.dev"

echo "🔐 Adding GitHub Actions Secrets"
echo "Repository: $repo"
echo ""

# Check if gh CLI is authenticated
if not gh auth status > /dev/null 2>&1
    echo "❌ GitHub CLI is not authenticated. Please run: gh auth login"
    exit 1
end

echo "✅ GitHub CLI is authenticated"
echo ""

# Check if .env.local exists and read values
set sanity_project_id ""
set sanity_dataset ""
set codecov_token ""

if test -f .env.local
    echo "📄 Found .env.local file, reading values..."
    set sanity_project_id (grep "^NEXT_PUBLIC_SANITY_PROJECT_ID=" .env.local | cut -d'=' -f2- | tr -d ' ' | tr -d '"' | tr -d "'")
    set sanity_dataset (grep "^NEXT_PUBLIC_SANITY_DATASET=" .env.local | cut -d'=' -f2- | tr -d ' ' | tr -d '"' | tr -d "'")
    set codecov_token (grep "^CODECOV_TOKEN=" .env.local | cut -d'=' -f2- | tr -d ' ' | tr -d '"' | tr -d "'")
end

# Add NEXT_PUBLIC_SANITY_PROJECT_ID
if test -n "$sanity_project_id"
    echo "🔑 Adding NEXT_PUBLIC_SANITY_PROJECT_ID..."
    echo "$sanity_project_id" | gh secret set NEXT_PUBLIC_SANITY_PROJECT_ID --repo $repo
    echo "✅ Added NEXT_PUBLIC_SANITY_PROJECT_ID"
else
    echo "⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local"
    echo "   Run: gh secret set NEXT_PUBLIC_SANITY_PROJECT_ID --repo $repo"
end
echo ""

# Add NEXT_PUBLIC_SANITY_DATASET
if test -n "$sanity_dataset"
    echo "🔑 Adding NEXT_PUBLIC_SANITY_DATASET..."
    echo "$sanity_dataset" | gh secret set NEXT_PUBLIC_SANITY_DATASET --repo $repo
    echo "✅ Added NEXT_PUBLIC_SANITY_DATASET"
else
    echo "⚠️  NEXT_PUBLIC_SANITY_DATASET not found in .env.local"
    echo "   Run: gh secret set NEXT_PUBLIC_SANITY_DATASET --repo $repo"
end
echo ""

# Add CODECOV_TOKEN (optional)
if test -n "$codecov_token"
    echo "🔑 Adding CODECOV_TOKEN..."
    echo "$codecov_token" | gh secret set CODECOV_TOKEN --repo $repo
    echo "✅ Added CODECOV_TOKEN"
else
    echo "ℹ️  CODECOV_TOKEN not found (optional, skipping)"
end
echo ""

echo "✅ Done! Listing current secrets:"
gh secret list --repo $repo

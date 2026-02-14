#!/bin/bash

# Configuration
# This script assumes it is run from a location that can access both paths
PERSONAL_REPO="/Users/Vinicius_Fagundes/Documents/coding/vinipx/taflex-js"
EPAM_REPO="/Users/Vinicius_Fagundes/Documents/coding/epam/taflex-js"

echo "🚀 Starting sync from Personal to EPAM..."

# 1. Navigate to EPAM repository
cd "$EPAM_REPO" || { echo "❌ Could not find EPAM repo at $EPAM_REPO"; exit 1; }

# 2. Ensure personal remote is added (local file path remote)
if ! git remote | grep -q "^personal$"; then
    echo "➕ Adding local remote for personal repository..."
    git remote add personal "$PERSONAL_REPO"
fi

# 3. Fetch changes from personal repo (local operation, no credentials needed)
echo "📥 Fetching latest changes from personal/main..."
git fetch personal main

# 4. Merge changes into EPAM main
echo "🔄 Merging personal/main into EPAM main..."
if git merge personal/main --allow-unrelated-histories --no-edit; then
    echo "✅ Merge successful!"
else
    echo "⚠️  Merge conflicts detected. Please resolve them in $EPAM_REPO and then commit/push manually."
    exit 1
fi

# 5. Push to EPAM GitLab (uses your existing EPAM credentials)
echo "📤 Pushing unified changes to EPAM GitLab..."
if git push origin main; then
    echo "✨ Sync complete and pushed to GitLab!"
else
    echo "❌ Failed to push to GitLab. Check your EPAM credentials."
    exit 1
fi

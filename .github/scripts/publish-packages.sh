#!/bin/bash
set -e

# Verify required environment variables
if [ -z "$GITHUB_OUTPUT" ]; then
  echo "❌ Error: GITHUB_OUTPUT is empty. This script is meant to be run inside a GitHub Action."
  exit 1
fi

RELEASE_TYPE=$1
PACKAGE_INPUT=$2

echo "Release type: $RELEASE_TYPE"
echo "Package input: $PACKAGE_INPUT"

if [ "$RELEASE_TYPE" = "stable" ]; then
  echo "Detecting version changes for stable release..."
  PACKAGES_TO_PUBLISH=""
  
  while IFS= read -r workspace; do
    PACKAGE_NAME=$(echo "$workspace" | jq -r '.name')
    PKG_LOCATION=$(echo "$workspace" | jq -r '.location')
    PKG_FILE="$PKG_LOCATION/package.json"
    LOCAL_VERSION=$(jq -r '.version' "$PKG_FILE")
    
    # Determine the dist-tag based on version (same logic as ci-cd.yml)
    if [[ "$LOCAL_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+-([a-zA-Z]+) ]]; then
      NPM_TAG="${BASH_REMATCH[1]}"
    else
      NPM_TAG="latest"
    fi
    
    echo "Checking $PACKAGE_NAME (local: v$LOCAL_VERSION, dist-tag: $NPM_TAG)..."
    REGISTRY_VERSION=$(npm view "$PACKAGE_NAME@$NPM_TAG" version 2>/dev/null || echo "not-published")
    
    if [ "$REGISTRY_VERSION" = "not-published" ]; then
      echo "  → Not yet published on $NPM_TAG tag, will publish v$LOCAL_VERSION"
      PACKAGES_TO_PUBLISH="$PACKAGES_TO_PUBLISH $PACKAGE_NAME"
    elif [ "$LOCAL_VERSION" != "$REGISTRY_VERSION" ]; then
      echo "  → Registry ($NPM_TAG): v$REGISTRY_VERSION, Local: v$LOCAL_VERSION"
      echo "  → Versions differ, will publish"
      PACKAGES_TO_PUBLISH="$PACKAGES_TO_PUBLISH $PACKAGE_NAME"
    else
      echo "  → Already published at v$LOCAL_VERSION on $NPM_TAG tag, skipping"
    fi
  done < <(yarn workspaces list --no-private --json)
  
  if [ -n "$PACKAGES_TO_PUBLISH" ]; then
    PACKAGES_TO_PUBLISH=$(echo "$PACKAGES_TO_PUBLISH" | xargs)
    echo "has_version_changes=true" >> "$GITHUB_OUTPUT"
    echo "packages_to_publish=$PACKAGES_TO_PUBLISH" >> "$GITHUB_OUTPUT"
    echo "✅ Packages to publish: $PACKAGES_TO_PUBLISH"
  else
    echo "has_version_changes=false" >> "$GITHUB_OUTPUT"
    echo "ℹ️  No packages need publishing"
  fi
fi

#!/bin/bash
set -e

RELEASE_TYPE=$1
PACKAGE_INPUT=$2

echo "Release type: $RELEASE_TYPE"
echo "Package input: $PACKAGE_INPUT"

# Function to compare semantic versions
compare_versions() {
  local v1=$1
  local v2=$2
  v1=${v1#v}
  v2=${v2#v}
  IFS='-' read -r v1_core v1_pre <<< "$v1"
  IFS='-' read -r v2_core v2_pre <<< "$v2"
  IFS='.' read -r v1_major v1_minor v1_patch <<< "$v1_core"
  IFS='.' read -r v2_major v2_minor v2_patch <<< "$v2_core"
  
  if [ "$v1_major" -gt "$v2_major" ]; then echo "greater"; return
  elif [ "$v1_major" -lt "$v2_major" ]; then echo "less"; return; fi
  if [ "$v1_minor" -gt "$v2_minor" ]; then echo "greater"; return
  elif [ "$v1_minor" -lt "$v2_minor" ]; then echo "less"; return; fi
  if [ "$v1_patch" -gt "$v2_patch" ]; then echo "greater"; return
  elif [ "$v1_patch" -lt "$v2_patch" ]; then echo "less"; return; fi
  
  if [ -z "$v1_pre" ] && [ -z "$v2_pre" ]; then echo "equal"
  elif [ -z "$v1_pre" ]; then echo "greater"
  elif [ -z "$v2_pre" ]; then echo "less"
  else
    if [[ "$v1_pre" > "$v2_pre" ]]; then echo "greater"
    elif [[ "$v1_pre" < "$v2_pre" ]]; then echo "less"
    else echo "equal"; fi
  fi
}

if [ "$RELEASE_TYPE" = "stable" ]; then
  echo "Detecting version changes for stable release..."
  PACKAGES_TO_PUBLISH=""
  
  while IFS= read -r workspace; do
    PACKAGE_NAME=$(echo "$workspace" | jq -r '.name')
    PKG_LOCATION=$(echo "$workspace" | jq -r '.location')
    PKG_FILE="$PKG_LOCATION/package.json"
    LOCAL_VERSION=$(jq -r '.version' "$PKG_FILE")
    
    echo "Checking $PACKAGE_NAME (local: v$LOCAL_VERSION)..."
    REGISTRY_VERSION=$(npm view "$PACKAGE_NAME" version 2>/dev/null || echo "not-published")
    
    if [ "$REGISTRY_VERSION" = "not-published" ]; then
      echo "  → Not yet published, will publish v$LOCAL_VERSION"
      PACKAGES_TO_PUBLISH="$PACKAGES_TO_PUBLISH $PACKAGE_NAME"
    elif [ "$LOCAL_VERSION" != "$REGISTRY_VERSION" ]; then
      echo "  → Registry: v$REGISTRY_VERSION, Local: v$LOCAL_VERSION"
      COMPARISON=$(compare_versions "$LOCAL_VERSION" "$REGISTRY_VERSION")
      if [ "$COMPARISON" = "greater" ]; then
        echo "  → Local version is newer, will publish"
        PACKAGES_TO_PUBLISH="$PACKAGES_TO_PUBLISH $PACKAGE_NAME"
      else
        echo "  → Local version is not newer, skipping"
      fi
    else
      echo "  → Already published at v$LOCAL_VERSION, skipping"
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

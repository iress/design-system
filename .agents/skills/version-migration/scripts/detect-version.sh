#!/usr/bin/env bash
# Detects current IDS/OUI version and recommends migration path

set -euo pipefail

echo "🔍 Detecting IDS/OUI version..."
echo

# Check for package.json
if [[ ! -f "package.json" ]]; then
  echo "❌ No package.json found in current directory"
  exit 1
fi

# Detect versions
OUI_VERSION=$(grep -o '"@iress/oui": "[^"]*"' package.json | grep -o '[0-9][^"]*' || echo "")
V4_VERSION=$(grep -o '"@iress/components-react": "[^"]*"' package.json | grep -o '[0-9][^"]*' || echo "")
V5_VERSION=$(grep -o '"@iress-oss/ids-components": "5\.[^"]*"' package.json | grep -o '[0-9][^"]*' || echo "")
V6_VERSION=$(grep -o '"@iress-oss/ids-components": "6\.[^"]*"' package.json | grep -o '[0-9][^"]*' || echo "")

# Report findings
echo "📦 Detected packages:"
[[ -n "$OUI_VERSION" ]] && echo "  • @iress/oui: $OUI_VERSION"
[[ -n "$V4_VERSION" ]] && echo "  • @iress/components-react: $V4_VERSION (IDS v4)"
[[ -n "$V5_VERSION" ]] && echo "  • @iress-oss/ids-components: $V5_VERSION (IDS v5)"
[[ -n "$V6_VERSION" ]] && echo "  • @iress-oss/ids-components: $V6_VERSION (IDS v6)"

if [[ -z "$OUI_VERSION" && -z "$V4_VERSION" && -z "$V5_VERSION" && -z "$V6_VERSION" ]]; then
  echo "  ℹ️  No IDS/OUI packages detected"
  exit 0
fi

echo
echo "🗺️  Migration path:"

# Determine migration path
if [[ -n "$V6_VERSION" ]]; then
  echo "  ✅ Already on IDS v6"
elif [[ -n "$V5_VERSION" ]]; then
  echo "  📍 IDS v5 → v6"
  echo "  📖 Reference: references/v5-to-v6-migration.md"
  echo "  🔧 Complexity: Low–Medium"
elif [[ -n "$V4_VERSION" && -n "$OUI_VERSION" ]]; then
  echo "  📍 OUI + IDS v4 → v6"
  echo "  📖 Reference: references/prop-renames.md (both OUI and v4 sections)"
  echo "  🔧 Complexity: High (form architecture change)"
elif [[ -n "$V4_VERSION" ]]; then
  echo "  📍 IDS v4 → v6"
  echo "  📖 Reference: references/prop-renames.md (IDS v4 section)"
  echo "  🔧 Complexity: Medium (form architecture change)"
elif [[ -n "$OUI_VERSION" ]]; then
  echo "  📍 OUI → v6"
  echo "  📖 Reference: references/prop-renames.md (OUI section)"
  echo "  🔧 Complexity: High (form architecture change)"
fi

echo
echo "📚 Full guide: .agents/skills/version-migration/SKILL.md"

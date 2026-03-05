#!/usr/bin/env bash
# Audits IDS/OUI component usage across codebase

set -euo pipefail

echo "🔍 Auditing IDS/OUI component usage..."
echo

# Find all imports
echo "📦 Scanning imports..."
IMPORTS=$(grep -rh "from '@iress/oui'\|from \"@iress/oui\"\|from '@iress/components-react'\|from \"@iress/components-react\"\|from '@iress-oss/ids-components'\|from \"@iress-oss/ids-components\"" src/ 2>/dev/null | sort | uniq || true)

if [[ -z "$IMPORTS" ]]; then
  echo "ℹ️  No IDS/OUI imports found"
  exit 0
fi

# Extract component names
echo "📊 Component usage summary:"
echo

declare -A COMPONENTS

while IFS= read -r line; do
  # Extract components from import statements
  COMPS=$(echo "$line" | sed -n 's/.*{\s*\([^}]*\)\s*}.*/\1/p' | tr ',' '\n')
  
  while IFS= read -r comp; do
    comp=$(echo "$comp" | xargs) # trim whitespace
    [[ -z "$comp" ]] && continue
    
    # Count occurrences in source files
    COUNT=$(grep -r "\<$comp\>" src/ 2>/dev/null | grep -v "import" | wc -l || echo "0")
    COMPONENTS["$comp"]=$COUNT
  done <<< "$COMPS"
done <<< "$IMPORTS"

# Sort by usage count
for comp in "${!COMPONENTS[@]}"; do
  echo "${COMPONENTS[$comp]} $comp"
done | sort -rn | while read -r count name; do
  echo "  $name: $count usage(s)"
done

# Summary
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
TOTAL=${#COMPONENTS[@]}
echo "📈 Total unique components: $TOTAL"

# Check for high-effort components
echo
echo "⚠️  High-effort migrations:"
FORMIK=$(grep -r "from 'formik'\|from \"formik\"" src/ 2>/dev/null | wc -l || echo "0")
[[ $FORMIK -gt 0 ]] && echo "  • Forms with Formik: $FORMIK file(s) - requires React Hook Form migration"

TEST_UTILS=$(grep -r "idsFireEvent\|mockLazyLoadedComponents" src/ 2>/dev/null | wc -l || echo "0")
[[ $TEST_UTILS -gt 0 ]] && echo "  • Test files with old utils: $TEST_UTILS file(s)"

CUSTOM_CSS=$(grep -r "\.oui-\|\.ids-\|iress-" src/ 2>/dev/null | grep -E "\.(css|scss|sass|less)" | wc -l || echo "0")
[[ $CUSTOM_CSS -gt 0 ]] && echo "  • Files with custom CSS: $CUSTOM_CSS file(s) - may need styling prop migration"

echo
echo "💡 Next steps:"
echo "  1. Run: scripts/find-deprecated-props.sh"
echo "  2. Review: references/component-renames.md"
echo "  3. Plan: Start with high-usage components"

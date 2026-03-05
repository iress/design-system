#!/usr/bin/env bash
# Finds deprecated/renamed props that will break in IDS v6

set -euo pipefail

echo "🔍 Scanning for deprecated props..."
echo

FOUND=0

# Define prop patterns to search for
declare -A DEPRECATED_PROPS=(
  ["variant="]="Renamed to 'mode' (Button) or 'status' (Alert)"
  ["isOpen="]="Renamed to 'show' (Modal)"
  ["onClose="]="Renamed to 'onShowChange' (Modal)"
  ["gutter="]="Renamed to 'gap' (Stack/Inline)"
  ["mode=\"link\""]="Removed - use mode=\"tertiary\" or IressLink"
  ["mode='link'"]="Removed - use mode=\"tertiary\" or IressLink"
  ["mode=\"danger\""]="Removed - use status=\"danger\""
  ["mode='danger'"]="Removed - use status=\"danger\""
  ["mode=\"positive\""]="Removed - use status=\"success\""
  ["mode='positive'"]="Removed - use status=\"success\""
  ["optional="]="Renamed to 'required' (inverted logic)"
  ["legend="]="Renamed to 'label' (FieldGroup/RadioGroup)"
  ["context="]="Renamed to 'status' (Alert - OUI)"
  ["onHide="]="Renamed to 'onShowChange' (Modal - OUI)"
  ["labelText="]="Use children instead (Label)"
  ["headingText="]="Renamed to 'heading' (Alert)"
  ["background="]="Renamed to 'bg' (Panel)"
  ["targetId="]="Renamed to 'href' (SkipLink)"
  ["textVariant="]="Renamed to 'textStyle' (Skeleton)"
  ["align="]="Renamed to 'textAlign' (Text)"
)

# Search for each pattern
for PATTERN in "${!DEPRECATED_PROPS[@]}"; do
  RESULTS=$(grep -rn "$PATTERN" src/ 2>/dev/null | grep -v "node_modules" | grep -v ".test." | grep -v ".spec." || true)
  
  if [[ -n "$RESULTS" ]]; then
    echo "❌ Found: $PATTERN"
    echo "   ${DEPRECATED_PROPS[$PATTERN]}"
    echo "$RESULTS" | head -3 | sed 's/^/   /'
    COUNT=$(echo "$RESULTS" | wc -l)
    [[ $COUNT -gt 3 ]] && echo "   ... and $((COUNT - 3)) more occurrences"
    echo
    ((FOUND++))
  fi
done

# Check for slot usage (v4 React pattern)
echo "🔍 Checking for slot usage (v4 pattern)..."
SLOTS=$(grep -rn "slot=" src/ 2>/dev/null | grep -v "node_modules" | grep -v ".test." | grep -v ".spec." || true)
if [[ -n "$SLOTS" ]]; then
  echo "❌ Found slot usage (v4 uses slots, v6 uses props):"
  echo "$SLOTS" | head -3 | sed 's/^/   /'
  COUNT=$(echo "$SLOTS" | wc -l)
  [[ $COUNT -gt 3 ]] && echo "   ... and $((COUNT - 3)) more occurrences"
  echo "   Convert: <div slot=\"footer\"> → footer={<div>} prop"
  echo
  ((FOUND++))
fi

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ $FOUND -eq 0 ]]; then
  echo "✅ No deprecated props found!"
else
  echo "⚠️  Found $FOUND deprecated prop pattern(s)"
  echo
  echo "📖 See references/prop-renames.md for complete mapping"
  echo "🔧 Fix these before testing to avoid runtime issues"
fi

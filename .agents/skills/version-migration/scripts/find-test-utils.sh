#!/usr/bin/env bash
# Finds old IDS v4 test utilities that need migration

set -euo pipefail

echo "🔍 Scanning for old test utilities..."
echo

FOUND=0

# Check for idsFireEvent
echo "1️⃣  Checking for idsFireEvent..."
IDS_FIRE_EVENT=$(grep -rn "idsFireEvent" src/ 2>/dev/null || true)
if [[ -n "$IDS_FIRE_EVENT" ]]; then
  echo "  ❌ Found idsFireEvent usage:"
  echo "$IDS_FIRE_EVENT" | head -5 | sed 's/^/     /'
  COUNT=$(echo "$IDS_FIRE_EVENT" | wc -l)
  [[ $COUNT -gt 5 ]] && echo "     ... and $((COUNT - 5)) more occurrences"
  echo "  ✅ Replace with: fireEvent or userEvent from @testing-library/react"
  echo
  ((FOUND++))
else
  echo "  ✅ No idsFireEvent usage found"
fi

# Check for mockLazyLoadedComponents
echo
echo "2️⃣  Checking for mockLazyLoadedComponents..."
MOCK_LAZY=$(grep -rn "mockLazyLoadedComponents" src/ 2>/dev/null || true)
if [[ -n "$MOCK_LAZY" ]]; then
  echo "  ❌ Found mockLazyLoadedComponents usage:"
  echo "$MOCK_LAZY" | sed 's/^/     /'
  echo "  ✅ Remove: v6 components load synchronously"
  echo
  ((FOUND++))
else
  echo "  ✅ No mockLazyLoadedComponents usage found"
fi

# Check for old test utils import
echo
echo "3️⃣  Checking for old test utils imports..."
TEST_UTILS_IMPORT=$(grep -rn "@iress/ids-react-test-utils\|@iress/components-react/test" src/ 2>/dev/null || true)
if [[ -n "$TEST_UTILS_IMPORT" ]]; then
  echo "  ❌ Found old test utils imports:"
  echo "$TEST_UTILS_IMPORT" | sed 's/^/     /'
  echo "  ✅ Replace with: @testing-library/react"
  echo
  ((FOUND++))
else
  echo "  ✅ No old test utils imports found"
fi

# Check for componentLoad
echo
echo "4️⃣  Checking for componentLoad..."
COMPONENT_LOAD=$(grep -rn "componentLoad" src/ 2>/dev/null || true)
if [[ -n "$COMPONENT_LOAD" ]]; then
  echo "  ❌ Found componentLoad usage:"
  echo "$COMPONENT_LOAD" | sed 's/^/     /'
  echo "  ✅ Remove: Not needed in v6"
  echo
  ((FOUND++))
else
  echo "  ✅ No componentLoad usage found"
fi

# Check for old helper functions
echo
echo "5️⃣  Checking for old helper functions..."
HELPERS=$(grep -rn "mapRadioGroupOptions\|mapCheckboxGroupOptions\|mapTabs\|mapMenuItems\|showModal\|showSlideout" src/ 2>/dev/null | grep -v "node_modules" || true)
if [[ -n "$HELPERS" ]]; then
  echo "  ❌ Found old helper functions:"
  echo "$HELPERS" | head -3 | sed 's/^/     /'
  COUNT=$(echo "$HELPERS" | wc -l)
  [[ $COUNT -gt 3 ]] && echo "     ... and $((COUNT - 3)) more occurrences"
  echo "  ✅ Replace with: Direct children or hooks (useModal, useSlideout)"
  echo
  ((FOUND++))
else
  echo "  ✅ No old helper functions found"
fi

# Summary
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ $FOUND -eq 0 ]]; then
  echo "✅ No old test utilities found!"
else
  echo "⚠️  Found $FOUND test pattern(s) needing migration"
  echo
  echo "📖 Migration guide: references/testing-migration.md"
  echo
  echo "🔧 Key changes:"
  echo "  • idsFireEvent → fireEvent / userEvent"
  echo "  • Remove mockLazyLoadedComponents"
  echo "  • Use standard @testing-library/react"
  echo "  • Prefer getByRole over getByTestId"
fi

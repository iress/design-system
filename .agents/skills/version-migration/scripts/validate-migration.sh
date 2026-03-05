#!/usr/bin/env bash
# Post-migration validation checks

set -euo pipefail

ERRORS=0
WARNINGS=0

echo "🔍 Running post-migration validation..."
echo

# 1. Check for old imports
echo "1️⃣  Checking for old imports..."
OLD_IMPORTS=$(grep -r "@iress/oui\|@iress/components-react" src/ 2>/dev/null || true)
if [[ -n "$OLD_IMPORTS" ]]; then
  echo "  ❌ Found old imports:"
  echo "$OLD_IMPORTS" | head -5
  [[ $(echo "$OLD_IMPORTS" | wc -l) -gt 5 ]] && echo "  ... and $(($(echo "$OLD_IMPORTS" | wc -l) - 5)) more"
  ((ERRORS++))
else
  echo "  ✅ No old imports found"
fi

# 2. Check for old test utils
echo
echo "2️⃣  Checking for old test utilities..."
OLD_TEST_UTILS=$(grep -r "idsFireEvent\|mockLazyLoadedComponents\|@iress/ids-react-test-utils" src/ 2>/dev/null || true)
if [[ -n "$OLD_TEST_UTILS" ]]; then
  echo "  ❌ Found old test utils:"
  echo "$OLD_TEST_UTILS" | head -5
  [[ $(echo "$OLD_TEST_UTILS" | wc -l) -gt 5 ]] && echo "  ... and $(($(echo "$OLD_TEST_UTILS" | wc -l) - 5)) more"
  ((ERRORS++))
else
  echo "  ✅ No old test utils found"
fi

# 3. Check for deprecated props
echo
echo "3️⃣  Checking for deprecated props..."
DEPRECATED_PROPS=$(grep -rE "variant=|isOpen=|gutter=|mode=\"link\"|mode='link'|optional=|legend=" src/ 2>/dev/null | grep -v "node_modules" || true)
if [[ -n "$DEPRECATED_PROPS" ]]; then
  echo "  ⚠️  Found potentially deprecated props:"
  echo "$DEPRECATED_PROPS" | head -5
  [[ $(echo "$DEPRECATED_PROPS" | wc -l) -gt 5 ]] && echo "  ... and $(($(echo "$DEPRECATED_PROPS" | wc -l) - 5)) more"
  echo "  ℹ️  Review these manually - some may be false positives"
  ((WARNINGS++))
else
  echo "  ✅ No obvious deprecated props found"
fi

# 4. Check for required CSS import
echo
echo "4️⃣  Checking for IDS v6 CSS import..."
CSS_IMPORT=$(grep -r "@iress-oss/ids-components/dist/style.css\|@iress-oss/ids-components/styled-system/styles.css" src/ 2>/dev/null || true)
if [[ -z "$CSS_IMPORT" ]]; then
  echo "  ❌ Missing CSS import"
  echo "  Add to app entry: import '@iress-oss/ids-components/dist/style.css';"
  ((ERRORS++))
else
  echo "  ✅ CSS import found"
fi

# 5. Check for Formik remnants
echo
echo "5️⃣  Checking for Formik usage..."
FORMIK=$(grep -r "from 'formik'\|from \"formik\"" src/ 2>/dev/null || true)
if [[ -n "$FORMIK" ]]; then
  echo "  ⚠️  Formik still in use:"
  echo "$FORMIK" | head -3
  [[ $(echo "$FORMIK" | wc -l) -gt 3 ]] && echo "  ... and $(($(echo "$FORMIK" | wc -l) - 3)) more"
  echo "  ℹ️  Consider migrating to IressForm + IressFormField"
  ((WARNINGS++))
else
  echo "  ✅ No Formik usage found"
fi

# 6. Check package.json
echo
echo "6️⃣  Checking package.json..."
if grep -q "@iress-oss/ids-components" package.json; then
  VERSION=$(grep "@iress-oss/ids-components" package.json | grep -o '[0-9][^"]*')
  echo "  ✅ IDS v6 in package.json: $VERSION"
else
  echo "  ❌ @iress-oss/ids-components not in package.json"
  ((ERRORS++))
fi

# Summary
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ $ERRORS -eq 0 && $WARNINGS -eq 0 ]]; then
  echo "✅ All validation checks passed!"
elif [[ $ERRORS -eq 0 ]]; then
  echo "⚠️  Validation complete with $WARNINGS warning(s)"
  echo "Review warnings above - they may need attention"
else
  echo "❌ Validation failed with $ERRORS error(s) and $WARNINGS warning(s)"
  echo "Fix errors above before proceeding"
  exit 1
fi

echo
echo "📋 Manual checks still needed:"
echo "  • Visual inspection of all pages"
echo "  • Form submission and validation"
echo "  • Test suite passes"
echo "  • Accessibility (keyboard nav, screen readers)"
echo "  • Production build succeeds"

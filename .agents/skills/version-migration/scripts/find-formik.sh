#!/usr/bin/env bash
# Identifies Formik forms that need migration to React Hook Form

set -euo pipefail

echo "🔍 Scanning for Formik usage..."
echo

# Find Formik imports
FORMIK_FILES=$(grep -rl "from 'formik'\|from \"formik\"" src/ 2>/dev/null || true)

if [[ -z "$FORMIK_FILES" ]]; then
  echo "✅ No Formik usage found"
  exit 0
fi

FILE_COUNT=$(echo "$FORMIK_FILES" | wc -l)
echo "📊 Found Formik in $FILE_COUNT file(s)"
echo

# Analyze each file
while IFS= read -r file; do
  echo "📄 $file"
  
  # Check for Formik component
  grep -q "<Formik" "$file" && echo "  • Uses <Formik> component"
  
  # Check for Field component
  FIELD_COUNT=$(grep -c "<Field" "$file" 2>/dev/null || echo "0")
  [[ $FIELD_COUNT -gt 0 ]] && echo "  • $FIELD_COUNT <Field> component(s)"
  
  # Check for Yup schema
  grep -q "Yup\." "$file" && echo "  • Uses Yup validation schema"
  
  # Check for useFormik hook
  grep -q "useFormik" "$file" && echo "  • Uses useFormik hook"
  
  # Check for Form component
  grep -q "<Form" "$file" && echo "  • Uses <Form> component"
  
  echo
done <<< "$FORMIK_FILES"

# Check for Yup schemas
echo "🔍 Checking for Yup validation schemas..."
YUP_FILES=$(grep -rl "from 'yup'\|from \"yup\"\|import \* as Yup" src/ 2>/dev/null || true)

if [[ -n "$YUP_FILES" ]]; then
  YUP_COUNT=$(echo "$YUP_FILES" | wc -l)
  echo "📊 Found Yup in $YUP_COUNT file(s)"
  echo "$YUP_FILES" | sed 's/^/  • /'
else
  echo "✅ No Yup schemas found"
fi

# Summary
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📈 Migration scope:"
echo "  • Formik files: $FILE_COUNT"
[[ -n "$YUP_FILES" ]] && echo "  • Yup schema files: $YUP_COUNT"

echo
echo "📖 Migration guide: references/form-migration.md"
echo
echo "🔧 Key changes:"
echo "  • Formik → IressForm + IressFormField"
echo "  • <Field as={Input}> → render={(props) => <IressInput {...props} />}"
echo "  • Yup schema → rules prop per field"
echo "  • validationSchema → rules={{ required: 'msg', ... }}"
echo
echo "⚠️  Form migration is the highest-effort part of v6 upgrade"

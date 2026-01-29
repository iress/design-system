# Bug Fix: RichSelect Double Scrollbar Issue

## Problem Summary

When using `IressRichSelect` with `initialOptions` (non-async mode), two scrollbars appeared - one nested inside the other. This created a confusing user experience where users could scroll both the popover content and the menu independently.

**Expected Behavior:**
- Single scrollbar controlling the entire menu content

**Actual Behavior:**
- Two scrollbars (one from popover content, one from menu)
- Nested scrolling containers

**Affected Branch:** main

## Root Cause

The async path (when `options` is a function) renders `IressSelectMenu` wrapped in `IressSelectSearch`, which applies `overflow: hidden` via its CSS module (`SelectSearch.module.scss`). This prevents the double scrollbar issue.

However, the non-async path (when `options` is an array with `initialOptions`) renders `IressSelectMenu` directly without any wrapper, causing both the popover content and the menu to have independent scrollbars.

**File:** `packages/components/src/components/RichSelect/components/SelectOptions.tsx`

**Code Path:**
```tsx
// Non-async path (lines 341-352) - BEFORE FIX
return (
  <>
    <IressSelectMenu
      items={menuItems}
      multiSelect={multiSelect}
      onChange={handleMenuChange}
      selected={value}
      selectedFirst
    />
    {renderOptionsFooter?.(renderProps)}
  </>
);
```

## Technical Fix

### 1. Added Wrapper Div (SelectOptions.tsx)
Wrapped the non-async `IressSelectMenu` in a div with `className={styles.menuWrapper}` to match the overflow behavior of the async path.

**File:** `packages/components/src/components/RichSelect/components/SelectOptions.tsx` (lines 341-352)

```tsx
// AFTER FIX
return (
  <>
    <div className={styles.menuWrapper}>
      <IressSelectMenu
        items={menuItems}
        multiSelect={multiSelect}
        onChange={handleMenuChange}
        selected={value}
        selectedFirst
      />
    </div>
    {renderOptionsFooter?.(renderProps)}
  </>
);
```

### 2. Added CSS Module Style (RichSelect.module.scss)
Added `.menuWrapper` class with `overflow: hidden` to hide the inner scrollbar.

**File:** `packages/components/src/components/RichSelect/RichSelect.module.scss` (lines 57-59)

```scss
.menuWrapper {
  overflow: hidden;
}
```

### 3. Added Regression Tests (RichSelect.test.tsx)
Added two tests in a new `overflow behavior` test suite:

**File:** `packages/components/src/components/RichSelect/RichSelect.test.tsx` (lines 1298-1353)

1. **Non-async wrapper test**: Verifies the `.menuWrapper` div exists and contains the menu
2. **Async path test**: Confirms async selects don't use the wrapper (they use `IressSelectSearch`)

### 4. Updated Bug Reproduction Story
Fixed TypeScript errors in the bug reproduction story:

**File:** `packages/components/src/components/RichSelect/RichSelect.stories.tsx` (lines 217-223)
- Added required `options` prop (empty array)
- Changed `width` from invalid `'md'` to valid `'50perc'`

## Verification

✅ **Tests Pass:** All RichSelect tests pass (48 passed)
✅ **Linting Pass:** ESLint checks pass with no errors
✅ **Typechecking Pass:** TypeScript compilation successful
✅ **Version Bumped:** `@iress-oss/ids-components` 5.20.6 → 5.20.7

## Usage Example

```tsx
import { IressRichSelect } from '@iress-oss/ids-components';

// Non-async select with initialOptions - now has single scrollbar
export const FixedExample = () => {
  const manyOptions = Array.from({ length: 50 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: i + 1,
  }));

  return (
    <IressRichSelect
      placeholder="Select an option"
      options={[]}
      initialOptions={manyOptions}
      width="50perc"
    />
  );
};

// Test steps:
// 1. Click to open the dropdown
// 2. Observe ONLY ONE scrollbar in the menu
// 3. Scrolling works smoothly without nested scrolling
```

## PR Information

**Title:** `Fix: RichSelect double scrollbar with initialOptions (main)`

**Description:**
Fixes double scrollbar issue in RichSelect when using `initialOptions`. The non-async path now wraps the menu in an overflow container matching the async path behavior.

**Changes:**
- Added `.menuWrapper` div with `overflow: hidden` around non-async menu
- Added CSS module style for the wrapper
- Added regression tests
- Fixed bug reproduction story TypeScript errors
- Bumped version to 5.20.7

**Testing:**
- ✅ All existing tests pass (48 tests)
- ✅ New regression tests added and passing
- ✅ Linting passes
- ✅ Typechecking passes
- ✅ Bug reproduction story works correctly

**Related:** Fixes #[issue-number]

**Git Squash Command:**
```bash
# To squash 5 commits before merging
git reset --soft HEAD~5 && git commit && git push -f
```

**Labels to Add:**
- `affects-main`

## Related Files Modified

1. `packages/components/src/components/RichSelect/components/SelectOptions.tsx`
2. `packages/components/src/components/RichSelect/RichSelect.module.scss`
3. `packages/components/src/components/RichSelect/RichSelect.test.tsx`
4. `packages/components/src/components/RichSelect/RichSelect.stories.tsx`
5. `packages/components/package.json` (version bump)

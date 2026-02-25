# Bug Fix Documentation: IressSelect MultiSelect Height Inconsistency

## Problem Summary

When tags in an IressSelect multiselect component are collapsed after reaching the limit (showing "X selected"), the height of the input changes and no longer matches inputs with visible tags displayed.

## Expected Behavior

The height of the input should remain consistent regardless of whether tags are displayed individually or collapsed into an "X selected" summary.

## Actual Behavior

The input with collapsed tags (e.g., "12 selected") appears shorter than the input with visible individual tags (e.g., "High", "Medium", "Low").

## How to Test

1. Open Storybook and navigate to: `Components/Select/Bug: Height Inconsistency with Collapsed Tags`
2. Compare the two multiselect inputs shown side by side:
   - First input: Shows 3 visible tags ("High", "Medium", "Low")
   - Second input: Shows "12 selected" (collapsed state)
3. Observe that both inputs now have the same height ✅

**Before the fix:** The "12 selected" input was shorter than the input with visible tags
**After the fix:** Both inputs maintain consistent height

## What We Fixed

### Technical Changes

**Files Modified:**
1. `packages/components/src/components/Select/SelectTags/SelectTags.tsx` - Added vertical alignment
2. `packages/components/src/components/Select/SelectTags/SelectTags.styles.ts` - Updated tagsList styles

### Root Cause

The `IressInline` component (which wraps the tags) had default `verticalAlign="top"` alignment. When tags collapsed into a single "X selected" tag, the content aligned to the top, making the container appear shorter than when multiple tags were displayed.

### The Fix

**1. SelectTags.tsx** - Added `verticalAlign="middle"` to IressInline:

```diff
- <IressInline gap="sm" className={classes.tagsList}>
+ <IressInline gap="sm" verticalAlign="middle" className={classes.tagsList}>
```

**2. SelectTags.styles.ts** - Added flex grow to tagsList:

```diff
tagsList: {
  overflow: 'hidden',
+ flex: '1',
},
```

### Why This Works

1. `verticalAlign="middle"` centers the tag content vertically within the container
2. Both collapsed tags ("X selected") and multiple visible tags now align to the center
3. The parent `root` container's `minHeight: 'input.height'` provides consistent baseline height
4. Tags maintain consistent vertical positioning regardless of quantity or display state

## Testing

### New Tests Added

**File**: `packages/components/src/components/Select/SelectTags/SelectTags.test.tsx`

```typescript
describe('height consistency', () => {
  it('applies vertical centering to maintain consistent height with collapsed tags', () => {
    // Verifies IressInline has middle vertical alignment (ai_center class)
    // This ensures collapsed tags maintain same height as visible tags
  });

  it('renders collapsed tag text when limit is exceeded', () => {
    // Confirms "X selected" text appears when limit is reached
  });
});
```

### Test Results

All SelectTags tests pass, including the new height consistency regression tests. Run tests with:

```bash
yarn workspace @iress-oss/ids-components run test:coverage -- --testFile SelectTags.test.tsx
```

## Files Modified

1. `packages/components/src/components/Select/SelectTags/SelectTags.tsx` - Added verticalAlign="middle" to IressInline
2. `packages/components/src/components/Select/SelectTags/SelectTags.styles.ts` - Updated tagsList to use flex: '1'
3. `packages/components/src/components/Select/Select.stories.tsx` - Added bug reproduction story (uses correct defaultValue prop)
4. `packages/components/src/components/Select/SelectTags/SelectTags.test.tsx` - Added height consistency regression tests

## Risk Assessment

- **Change Impact**: Low - minimal changes to component props and CSS
- **Scope**: SelectTags component only
- **Breaking Changes**: None
- **Backward Compatibility**: Fully maintained - only adds vertical alignment prop
- **Backward Compatibility**: Maintained - no API changes, only visual fix
- **Scope**: Limited to SelectTags component in multiselect mode with collapsed tags

## Related Issues

- GitHub Issue: [BUG] IressSelect (multiSelect) - height changes when tags collapse
- Branch: `copilot/fix-multiselect-input-height`
- Version: 6.x (v6.0.0-alpha.28)

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

- **File**: `packages/components/src/components/Select/SelectTags/SelectTags.styles.ts`
- **Change**: Removed `height: '[100%]'` from the `tagsList` slot
- **Reason**: The percentage-based height caused the wrapper to stretch to fill the parent, resulting in inconsistent heights when switching between display states
- **Solution**: Added `alignItems: 'center'` for proper vertical centering and let the content size naturally

### Code Change

```diff
tagsList: {
  overflow: 'hidden',
- height: '[100%]',
+ alignItems: 'center',
},
```

### Why This Works

1. The parent `root` container already has `minHeight: 'input.height'` which provides a consistent baseline height
2. Removing `height: 100%` from `tagsList` allows it to size based on its content rather than stretching to fill
3. Adding `alignItems: 'center'` ensures proper vertical alignment of tags
4. Both visible tags and collapsed "X selected" tag now respect the same height constraints

## Testing

### New Test Added

**File**: `packages/components/src/components/Select/SelectTags/SelectTags.test.tsx`

```typescript
describe('height consistency', () => {
  it('applies consistent minHeight regardless of tag display state', () => {
    // Test renders component with 3 visible tags
    // Then rerenders with 5+ tags (triggering collapse)
    // Verifies both states maintain the same root CSS structure
  });
});
```

### Test Results

All tests passing:
```
Test Files  165 passed (165)
     Tests  1521 passed | 6 skipped (1527)
  Duration  146.57s
```

## Files Modified

1. `packages/components/src/components/Select/SelectTags/SelectTags.styles.ts` - Fixed height constraint
2. `packages/components/src/components/Select/Select.stories.tsx` - Added bug reproduction story
3. `packages/components/src/components/Select/SelectTags/SelectTags.test.tsx` - Added regression test

## Risk Assessment

- **Change Impact**: Low - minimal CSS change affecting only tag container height
- **Backward Compatibility**: Maintained - no API changes, only visual fix
- **Scope**: Limited to SelectTags component in multiselect mode with collapsed tags

## Related Issues

- GitHub Issue: [BUG] IressSelect (multiSelect) - height changes when tags collapse
- Branch: `copilot/fix-multiselect-input-height`
- Version: 6.x (v6.0.0-alpha.28)

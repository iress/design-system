# Bug Fix Summary: RichSelect onChange Handler

## Problem Statement

The `onChange` handler was not being invoked when IressRichSelect used custom `renderOptions`.

## Root Cause Analysis

The issue was in the **SelectCustomOptions.tsx** example file, which demonstrated the wrong pattern for implementing custom `renderOptions`. The example was calling:

```tsx
<IressSelectMenu
  onChange={setValue}  // ❌ WRONG: Bypasses parent onChange
  ...
/>
```

This bypassed the `handleMenuChange` wrapper, which is responsible for:
1. Calling `setValue()` to update internal state
2. **Calling the parent `onChange` prop** with a properly formatted event
3. Closing the popover for single-select mode

## Solution Implemented

### Changes Made

**File: `packages/components/src/components/RichSelect/mocks/SelectCustomOptions.tsx`**

1. Changed parameter from `setValue` to `handleMenuChange`
2. Updated both `IressSelectMenu` instances to use `onChange={handleMenuChange}`
3. Added comprehensive inline comments explaining why `handleMenuChange` is required

**Before:**
```tsx
const CustomOptions: IressRichSelectProps<true>['renderOptions'] = ({
  setValue,  // ❌ Wrong parameter
  // ...
}) => {
  return (
    <IressSelectMenu
      onChange={setValue}  // ❌ Bypasses parent onChange
      // ...
    />
  );
};
```

**After:**
```tsx
const CustomOptions: IressRichSelectProps<true>['renderOptions'] = ({
  handleMenuChange,  // ✅ Correct parameter
  // ...
}) => {
  return (
    <IressSelectMenu
      // CRITICAL: Use handleMenuChange (not setValue) to ensure onChange callback is triggered.
      // handleMenuChange wraps setValue and calls the parent onChange prop, while setValue only
      // updates internal state without notifying parent components of selection changes.
      onChange={handleMenuChange}  // ✅ Triggers parent onChange
      // ...
    />
  );
};
```

### Test Coverage

**File: `packages/components/src/components/RichSelect/RichSelect.test.tsx`**

Added 3 comprehensive regression tests:

1. **Single-select with handleMenuChange** - Verifies `onChange` IS called when using `handleMenuChange`
2. **Multi-select with handleMenuChange** - Verifies `onChange` IS called in multi-select mode
3. **Using setValue directly** - Demonstrates the bug - `onChange` is NOT called when using `setValue`

## Testing Results

✅ **All 55 tests pass**
- 52 existing tests continue to pass
- 3 new regression tests added

```
Test Files  1 passed (1)
     Tests  55 passed (55)
  Duration  18.84s
```

## Impact Assessment

### Risk Level: **Very Low**

- ✅ Minimal code change (only the example file)
- ✅ No breaking changes to APIs
- ✅ All existing tests pass
- ✅ Comprehensive inline documentation added
- ✅ Regression tests prevent future issues

### Affected Areas

- **SelectCustomOptions.tsx** - Example/mock file used in Storybook
- **RichSelect.test.tsx** - Added regression tests

### Backward Compatibility

✅ **Fully backward compatible**
- No API changes
- Existing implementations that correctly used `handleMenuChange` continue to work
- Only affects developers copying the buggy example pattern

## Files Modified

1. `packages/components/src/components/RichSelect/mocks/SelectCustomOptions.tsx` - Fixed implementation
2. `packages/components/src/components/RichSelect/RichSelect.test.tsx` - Added regression tests
3. `package.json` - Version bumps (handled by workspace automation)
4. `yarn.lock` - Dependency updates

## Verification Steps

1. ✅ Created bug reproduction story demonstrating the issue
2. ✅ Identified root cause in SelectCustomOptions.tsx
3. ✅ Implemented minimal fix using handleMenuChange
4. ✅ Added comprehensive inline documentation
5. ✅ Added 3 regression tests
6. ✅ Verified all 55 tests pass
7. ✅ Removed bug reproduction story after verification
8. ✅ Code committed and pushed to branch

## Next Steps for Developers

When implementing custom `renderOptions`, always use `handleMenuChange`:

```tsx
const customRenderOptions: IressRichSelectProps['renderOptions'] = ({
  handleMenuChange,  // ✅ Use this parameter
  // ... other props
}) => {
  return (
    <IressSelectMenu
      onChange={handleMenuChange}  // ✅ Use this for onChange
      // ... other props
    />
  );
};
```

**DO NOT** use `setValue` directly for the `onChange` handler, as it will bypass the parent component's `onChange` callback.

## Branch Information

- **Affects**: Both main and 5.x branches (main fixed, 5.x needs separate fix)
- **Label Required**: `affects-both-branches`
- **Working Branch**: `copilot/fix-onchange-handler-issue`
- **Base Branch**: `main`

## Commits

1. `a750024` - Fix: RichSelect custom renderOptions not triggering onChange callback
2. `3059537` - chore: remove bug reproduction story after verification
3. `f06e9f9` - Merge bug fix from main branch

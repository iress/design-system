# Component Fixes Implementation Plan

## Problem Summary

This plan addresses 4 separate issues found in the component library:

1. **IressButton** - does not respect stack alignment when used in IressStack
2. **IressText** - `<strong>` element with `typography.body.sm` does not bold text automatically (requires explicit `.strong` variant)
3. **Styling props** - missing `alignSelf` property
4. **IressLoading** - flickers when `timeout` is set to `0` (should display immediately)

---

## Issue 1: IressButton - Stack Alignment

### Problem

When `IressButton` is used inside `IressStack` with alignment settings (e.g., `align="center"`), the button does not respect the alignment because it has internal CSS that may be conflicting.

### Root Cause

The button component likely has CSS properties that override flexbox alignment from parent containers.

### Solution Approach

- Investigate the button's CSS/styles to identify conflicting properties
- Ensure button respects parent flex container alignment (specifically `align-items` from IressStack)
- May need to adjust button's `align-self` behavior or remove conflicting CSS

### Implementation Steps

- [ ] Read `Button.tsx` implementation and styling
- [ ] Read `Button.styles.ts` (or equivalent Panda recipe)
- [ ] Identify CSS properties that interfere with flex alignment
- [ ] Create test case demonstrating the issue
- [ ] Fix the conflicting CSS
- [ ] Verify button respects IressStack alignment
- [ ] Run existing tests

### Files to Modify

- `packages/components/src/components/Button/Button.tsx` (potentially)
- `packages/components/src/styled-system/recipes/button.ts` (or wherever button styles are defined)
- `packages/components/src/components/Button/Button.test.tsx` (add test)
- `packages/components/src/components/Button/Button.stories.tsx` (add story demonstrating fix)

---

## Issue 2: IressText - Strong Element Not Bolding with Typography Styles

### Problem

When applying a typography text style directly to a `<strong>` element (or using `IressText element="strong"`), the text does not automatically bold. It applies the regular variant instead of the strong variant.

**Expected:**

```tsx
<strong className="typography.body.sm">Should be bold</strong>
// OR
<IressText element="strong" textStyle="typography.body.sm">Should be bold</IressText>
```

**Current (broken):**
The `<strong>` element gets styled with `typography.body.sm.regular` instead of `typography.body.sm.strong`, so the text doesn't appear bold.

**Workaround (not ideal):**

```tsx
<strong className="typography.body.sm.strong">
  Forced to use .strong explicitly
</strong>
```

### Root Cause

When a text style like `typography.body.sm` is applied to an element, it always uses the `.regular` variant regardless of the semantic HTML element type:

```typescript
// From theme-preset/tokens/textStyles.ts
'typography.body.sm': {
  value: {
    font: cssVars.typography.body.sm.regular,  // Always uses .regular
    '& strong': {
      font: cssVars.typography.body.sm.strong, // Only for nested <strong> elements
    },
  },
},
```

The text style doesn't detect that it's being applied to a `<strong>` element and adjust accordingly. It only handles nested `<strong>` elements via the `& strong` selector.

### Solution Approach

**Selected: Option 1 - Element-aware text style application**

Modify the Panda CSS text style recipe to detect the element type and choose the appropriate variant automatically:

- When `typography.body.sm` is applied to `<strong>` → use `.strong` variant
- When `typography.body.md` is applied to `<strong>` → use `.strong` variant
- When `typography.body.lg` is applied to `<strong>` → use `.strong` variant
- When any typography style is applied to `<em>` → use `.em` variant
- When applied to other elements → use `.regular` variant

This will be implemented in the Panda CSS configuration by adding element-specific variants or using CSS attribute selectors that detect the element type.

**Implementation Strategy:**

Use Panda CSS recipes or patterns to create element-aware text styles. This could be done by:

1. Adding conditional logic in the text style recipe based on the element type
2. Using CSS attribute selectors like `strong[class*="typography"]` to target specific elements
3. Modifying the text style generation to create element-specific class variants

### Implementation Steps

- [ ] Decide on solution approach (likely Option 3 - component-level detection)
- [ ] Read `packages/components/src/components/Text/Text.tsx` implementation
- [ ] Read `packages/components/src/components/Text/Text.styles.ts` or Panda recipe
- [ ] Implement element-aware text style selection in IressText
- [ ] Create mapping: `element="strong"` → append `.strong` to textStyle
- [ ] Create mapping: `element="em"` → append `.em` to textStyle
- [ ] Handle all typography variants (body.sm, body.md, body.lg)
- [ ] Create test case demonstrating the fix
- [ ] Create story showing strong/em elements with typography styles
- [ ] Run existing tests
- [ ] Update documentation

### Files to Modify

- `pacInvestigate Pandatheme-preset/tokens/textStyles.ts` - Modify text style generation for element awareness
- `packages/components/panda.config.ts` - Add CSS patterns or recipes (if needed)
- `packages/components/src/components/Text/Text.test.tsx` - Add tests for strong/em elements
- `packages/components/src/components/Text/Text.stories.tsx` - Add story demonstrating fix

### Technical Implementation Options

**Option A: CSS Attribute Selectors (Preferred for broad compatibility)**

Add global CSS rules that target elements by type:

```css
/* In generated CSS or global styles */
strong[class*='typography.body.sm'] {
  font: var(--typography-body-sm-strong);
}
em[class*='typography.body.sm'] {
  font: var(--typography-body-sm-em);
}
/* Repeat for .md and .lg */
```

**Option B: Extend Text Style Definitions**

Create additional text style entries that Panda CSS can apply:

```typescript
// Add to textStyles.ts
'typography.body.sm': {
  value: {
    font: cssVars.typography.body.sm.regular,
    '& strong': { font: cssVars.typography.body.sm.strong },
    '& em': { font: cssVars.typography.body.sm.em },
  },
},
// Plus add element-specific overrides
```

**Option C: Data Attribute Pattern**

Update `IressText` to add a data attribute and use that in CSS:

```typescript
// In Text.tsx
<Component data-element={element} ... />
```

```css
[data-element='strong'][class*='typography'] {
  /* apply strong styles */
}
```

- [ ] Explore Panda CSS recipe/pattern options for element-aware styling
- [ ] Implement element-aware text styles (CSS attribute selectors or recipe variants)
- [ ] Ensure `strong` elements with `typography.body.sm/md/lg` get `.strong` variant
- [ ] Ensure `em` elements with typography styles get `.em` variant
- [ ] Test with direct class application: `<strong className="typography.body.sm" />`
- [ ] Test with IressText component: `<IressText element="strong" textStyle="typography.body.sm" />`
- [ ] Create test cases for all combinations
- [ ] Create Storybook story demonstrating the fix
- [ ] Run existing tests to ensure no regressionlogic needed
      const computedTextStyle = useMemo(() => {
      if (!textStyle) return undefined;

  // If using strong element with a base typography style, use .strong variant
  if (
  element === 'strong' &&
  textStyle.match(/^typography\.body\.(sm|md|lg)$/)
  ) {
    return `${textStyle}.strong`;
  }

  // If using em element with a base typography style, use .em variant
  if (element === 'em' && textStyle.match(/^typography\.body\.(sm|md|lg)$/)) {
    return `${textStyle}.em`;
  }

  return textStyle;
  }, [element, textStyle]);

````

---

## Issue 3: Styling Props - Add `alignSelf`

### Problem

The `alignSelf` property is missing from the styling props interface (`IressCSSProps`), but it exists in some components like `IressCol`. This property should be available globally across all components that support styling props.

**Reference:** `IressCol` already has `alignSelf` in its own interface:

```typescript
// From Col.tsx
export interface IressColProps extends IressStyledProps {
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
}
````

### Solution Approach

Add `alignSelf` to the `IressCSSProps` interface to make it available globally. This follows the same pattern as other flexbox-related props like `textAlign`, `stretch`, etc.

### Implementation Steps

- [ ] Read `packages/components/src/interfaces.ts`
- [ ] Add `alignSelf` property to `IressCSSProps` interface
- [ ] Document the property with JSDoc comment
- [ ] Make it responsive using `ResponsiveProp<>`
- [ ] Add to Panda CSS configuration if needed
- [ ] Update `packages/components/theme-preset/storybookHelpers.ts` PROPS array
- [ ] Add to styling props reference documentation
- [ ] Create test case
- [ ] Create story demonstrating the prop
- [ ] Run existing tests

### Files to Modify

- `packages/components/src/interfaces.ts` - Add `alignSelf` to `IressCSSProps`
- `packages/components/theme-preset/storybookHelpers.ts` - Add to PROPS array
- `packages/components/docs/StylingProps/010-Reference.stories.tsx` - Add to reference table
- Create new story file: `packages/components/docs/StylingProps/090-Layout.stories.tsx` (if doesn't exist)
- `packages/components/src/components/Col/Col.tsx` - Remove local `alignSelf`, use from `IressCSSProps`

### Property Definition

```typescript
/**
 * The **`align-self`** CSS property overrides a flex item's alignment set by its flex container's `align-items` property.
 *
 * This is useful when you want a single flex item to have a different alignment than the others.
 *
 * @see https://developer.mozilla.org/docs/Web/CSS/align-self
 */
alignSelf?: ResponsiveProp<'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'auto'>;
```

---

## Issue 4: IressLoading - Flicker at timeout=0

### Problem

When `IressLoading` has `timeout={0}`, it should display immediately without any delay. Currently, there's a slight flicker suggesting the loading indicator briefly hides before showing.

### Root Cause

Looking at `useShouldRenderLoading` hook:

```typescript
const [renderLoading, setRenderLoading] = useState<boolean>(startFrom === 0);
```

The hook initializes `renderLoading` to `true` only when `startFrom === 0`. However, the various loading patterns may have different default `startFrom` values, and there may be timing issues between state initialization and timeout effects.

The flicker is likely caused by:

1. Initial state not being set correctly for `timeout=0`
2. useEffect delays even with `setTimeout(..., 0)`
3. Animation CSS that causes a brief fade-in even when content should show immediately

### Solution Approach

**For timeout=0 specifically:**

- When timeout is explicitly set to 0, skip all delay logic entirely
- Show the loading indicator immediately without any useEffect timing
- Bypass animation delays for immediate display

**Check each loading pattern:**

- `DefaultLoading` - uses `timeout` prop
- `ComponentLoading` - uses `timeout` object
- `StartUpLoading` - uses `timeout` object
- `PageLoading` - uses `timeout` number
- `LongLoading` - uses `timeout` object
- `ValidateLoading` - uses `timeout` number

### Implementation Steps

- [ ] Read all loading pattern components
- [ ] Identify which patterns accept `timeout=0`
- [ ] Update `useShouldRenderLoading` to handle `startFrom=0` case correctly
- [ ] Ensure CSS animations are skipped when timeout=0
- [ ] Update each pattern component to handle timeout=0
- [ ] Create test cases for timeout=0 behavior
- [ ] Create stories demonstrating immediate display
- [ ] Run existing tests

### Files to Modify

- `packages/components/src/patterns/Loading/hooks/useShouldRenderLoading.tsx` - Fix initialization logic
- `packages/components/src/patterns/Loading/components/DefaultLoading.tsx` - Handle timeout=0
- `packages/components/src/patterns/Loading/components/ComponentLoading.tsx` - Handle timeout=0
- `packages/components/src/patterns/Loading/components/StartUpLoading.tsx` - Handle timeout=0
- `packages/components/src/patterns/Loading/components/PageLoading.tsx` - Handle timeout=0
- `packages/components/src/patterns/Loading/components/LongLoading.tsx` - Handle timeout=0
- `packages/components/src/patterns/Loading/Loading.styles.ts` - Ensure no animation when immediate
- Test files for each pattern - Add timeout=0 tests

### Specific Fix for `useShouldRenderLoading`

The issue is in the initialization:

```typescript
// Current (problematic)
const [renderLoading, setRenderLoading] = useState<boolean>(startFrom === 0);

// Should be:
const [renderLoading, setRenderLoading] = useState<boolean>(() => {
  // If startFrom is 0, show immediately
  if (startFrom === 0) return true;
  // Otherwise wait for the timeout
  return false;
});

// Also need to handle timeout=0 in the effects:
useEffect(() => {
  // Skip timeout entirely if startFrom is 0
  if (startFrom === 0) {
    setRenderLoading(true);
    startShowing.current = performance.now();
    return;
  }

  const timeout = setTimeout(() => {
    if (!isLoaded) {
      setRenderLoading(true);
      startShowing.current = performance.now();
    }
  }, startFrom);
  return () => clearTimeout(timeout);
}, [startFrom, isLoaded]);
```

---

## Testing Strategy

### For Each Fix

1. **Write failing test first** - Demonstrates the bug
2. **Implement the fix**
3. **Verify test passes** - Confirms fix works
4. **Run all existing tests** - Ensure no regressions
5. **Add Storybook story** - Visual demonstration of the fix

### Test Coverage

- Unit tests for each component/function modified
- Integration tests for component interactions (e.g., Button in Stack)
- Visual regression tests via Storybook stories

---

## Implementation Order

**Recommended order (easiest to hardest):**

1. **Issue 3: Add `alignSelf` to styling props** - Straightforward interface addition
2. **Issue 2: IressText strong auto-bolding** - Simple token configuration change
3. **Issue 1: IressButton stack alignment** - May require CSS investigation
4. **Issue 4: IressLoading timeout=0 flicker** - Requires careful timing/state logic

---

## Risk Assessment

### Issue 1: IressButton alignment

- **Risk:** Low-Medium - CSS changes could affect existing layouts
- **Mitigation:** Comprehensive visual testing, check all button variants

### Issue 2: IressText element-aware typography

- **Risk:** Low-Medium - Changes component behavior but in an expected way
- **Mitigation:** Test with all element types and typography variants, ensure backward compatibility

### Issue 3: alignSelf styling prop

- **Risk:** Low - New property, no breaking changes
- **Mitigation:** Document property thoroughly, add examples

### Issue 4: IressLoading timeout=0

- **Risk:** Medium - Timing logic is complex, affects multiple patterns
- **Mitigation:** Test all loading patterns, verify fade animations still work correctly for timeout>0

---

## Success Criteria

### Issue 1 - IressButton alignment

- ✅ Button respects IressStack alignment props
- ✅ All button modes/variants work correctly
- ✅ No regression in existing button layouts
- ✅ Test and story added

### Issue 2 - IressText element-aware typography

- ✅ `<strong>` elements (or `element="strong"`) automatically use `.strong` variant
- ✅ `<em>` elements (or `element="em"`) automatically use `.em` variant
- ✅ Works for all typography variants (body.sm, body.md, body.lg)
- ✅ Backward compatible - existing explicit `.strong`/`.em` usage still works
- ✅ Direct class application (`<strong className="typography.body.sm" />`) works correctly
- ✅ Test and story added

### Issue 3 - alignSelf prop

- ✅ `alignSelf` available on all components with `IressCSSProps`
- ✅ Responsive variants work correctly
- ✅ Documentation updated
- ✅ Test and story added
- ✅ IressCol can remove its local alignSelf definition

### Issue 4 - IressLoading timeout=0

- ✅ Loading indicator displays immediately when timeout=0
- ✅ No flicker or animation delay
- ✅ Works for all loading patterns
- ✅ Normal timeout behavior (>0) still works correctly
- ✅ Tests added for timeout=0 case

---

## Notes

- All changes should follow existing code patterns in the design system
- Maintain backward compatibility where possible
- Update documentation as needed
- Add comprehensive test coverage
- Create visual examples in Storybook

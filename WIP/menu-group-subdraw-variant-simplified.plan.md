# MenuGroup Subdraw Variant - Simplified Implementation Plan

## Review Summary

After reviewing the existing codebase, the original plan can be **significantly simplified** by reusing existing components instead of creating new ones.

### Original Plan Issues

The original plan proposed creating:

- `MenuGroupTrigger.tsx` - New trigger component
- `MenuGroupSubmenu.tsx` - New floating submenu component
- `MenuGroupSubmenu.styles.ts` - New styles
- `hooks/useMenuGroupSubmenu.ts` - New custom hook
- `MenuGroupSubdraw.tsx` - Combined component

**Total: 5 new files with ~500+ lines of code**

### Simplified Approach

We can reuse existing, well-tested components:

- **`IressPopover`** - Already handles floating UI, positioning, dismiss, nested popovers
- **`IressMenuItem`** - Already handles styling, ARIA, keyboard events, `append` prop for chevron
- **`IressMenu`** - Already handles menu context and navigation

**Total: ~50 lines of code added to existing MenuGroup.tsx**

---

## Problem Summary

The `IressMenuGroup` component needs a "fly-over" or "subdraw" variant where:

- The group label acts as a trigger item (similar to a MenuItem)
- Clicking the trigger opens a submenu panel that "flies over" to the side
- The submenu contains the group's children

## What Existing Components Provide

### IressPopover (Already Has)

- ✅ Floating UI positioning with `align="right-start"`
- ✅ `FloatingTree`/`FloatingNode` for nested popover hierarchies
- ✅ Dismiss on Escape and click outside
- ✅ Portal rendering
- ✅ `type="menu"` for proper ARIA roles
- ✅ Keyboard navigation within content
- ✅ `onActivated`/`onDeactivated` callbacks for state tracking

### IressMenuItem (Already Has)

- ✅ `role="menuitem"` ARIA attribute
- ✅ Hover, focus, active styling
- ✅ `append` prop for adding chevron icon
- ✅ Keyboard event handling
- ✅ Integration with Menu context

### IressMenu (Already Has)

- ✅ Menu context for children
- ✅ `role="menu"` ARIA support
- ✅ Arrow key navigation

---

## Simplified Implementation

### Core Implementation (~50 lines)

Update `MenuGroup.tsx` to use composition:

```tsx
import { useState } from 'react';
import { IressPopover } from '@/components/Popover';
import { IressMenuItem } from '../MenuItem/MenuItem';
import { IressMenu } from '../Menu';
import { IressIcon } from '@/components/Icon';
import { IressMenuDivider } from '../MenuDivider/MenuDivider';
import { IressMenuHeading } from '../MenuText/MenuText';
import { propagateTestid } from '@/helpers/utility/propagateTestid';

export type IressMenuGroupVariant = 'subdraw';

export type IressMenuGroupProps<TLabel extends TextElements = 'h2'> = Omit<
  IressMenuTextProps<TLabel>,
  'children'
> & {
  label: ReactNode;
  children?: ReactNode;
  divider?: boolean;
  /**
   * Variant of the menu group.
   * - `undefined` (default): Renders inline with label as heading and children below.
   * - `'subdraw'`: Renders as a trigger that opens a fly-over submenu containing children.
   */
  variant?: IressMenuGroupVariant;
};

export const IressMenuGroup = <E extends TextElements = 'div'>({
  label,
  children,
  divider,
  variant,
  'data-testid': dataTestId,
  ...restProps
}: IressMenuGroupProps<E>) => {
  const [isOpen, setIsOpen] = useState(false);

  // Subdraw variant - compose existing components
  if (variant === 'subdraw') {
    return (
      <>
        <IressPopover
          align="right-start"
          type="menu"
          offset={{ mainAxis: 0, crossAxis: 0 }}
          onActivated={() => setIsOpen(true)}
          onDeactivated={() => setIsOpen(false)}
          data-testid={propagateTestid(dataTestId, 'subdraw')}
          activator={
            <IressMenuItem
              aria-haspopup="menu"
              aria-expanded={isOpen}
              append={<IressIcon name="keyboard_arrow_right" />}
              data-testid={propagateTestid(dataTestId, 'trigger')}
            >
              {label}
            </IressMenuItem>
          }
        >
          <IressMenu role="menu">{children}</IressMenu>
        </IressPopover>
        {divider && <IressMenuDivider />}
      </>
    );
  }

  // Default variant - inline rendering (unchanged)
  return (
    <>
      <IressMenuHeading {...restProps}>{label}</IressMenuHeading>
      {children}
      {divider && <IressMenuDivider />}
    </>
  );
};
```

---

## Implementation Phases

### Phase 1: Update MenuGroup Component

**File:** `packages/components/src/components/Menu/MenuGroup/MenuGroup.tsx`

Changes:

- [ ] Add `variant` prop to types
- [ ] Add `useState` for tracking open state
- [ ] Add conditional rendering for subdraw variant using IressPopover + IressMenuItem
- [ ] Add ARIA attributes (`aria-haspopup`, `aria-expanded`)

**Estimated effort:** 30 minutes

### Phase 2: Tests

**File:** `packages/components/src/components/Menu/MenuGroup/MenuGroup.test.tsx`

Test cases:

- [ ] Renders MenuItem trigger with chevron when variant="subdraw"
- [ ] Opens popover on trigger click
- [ ] Closes popover on Escape
- [ ] Has aria-haspopup="menu" on trigger
- [ ] Has aria-expanded reflecting open state
- [ ] Passes accessibility tests
- [ ] Works with nested subdraw groups

**Estimated effort:** 1 hour

### Phase 3: Stories

**File:** `packages/components/src/components/Menu/MenuGroup/MenuGroup.stories.tsx`

Stories:

- [ ] SubdrawVariant - Basic fly-over menu
- [ ] SubdrawWithDividers - With divider after group
- [ ] NestedSubdraw - Multiple levels of nesting

**Estimated effort:** 30 minutes

### Phase 4: Documentation

**File:** `packages/components/src/components/Menu/Menu.docs.mdx`

- [ ] Add section on subdraw variant
- [ ] Include usage example
- [ ] Document keyboard behavior

**Estimated effort:** 15 minutes

---

## What We Get For Free (No Additional Code)

By reusing `IressPopover`:

- ✅ Floating positioning with flip/shift
- ✅ Nested popover support (FloatingTree)
- ✅ Escape to dismiss
- ✅ Click outside to dismiss
- ✅ Portal rendering
- ✅ Proper z-index handling

By reusing `IressMenuItem`:

- ✅ Consistent styling (hover, focus, active)
- ✅ Chevron icon via `append` prop
- ✅ Participates in parent menu navigation
- ✅ Keyboard event handling

---

## Optional Enhancements

### Enhancement A: Hover-to-Open (If Needed Later)

Current: Opens on click (same as other popovers)
Enhancement: Add `trigger="hover"` to IressPopover

This would require updating IressPopover:

```tsx
// In useFloatingPopover.tsx
const hover = useHover(context, {
  enabled: trigger === 'hover',
  handleClose: safePolygon(),
  delay: { open: 75, close: 150 },
});
```

**Recommendation:** Ship with click-to-open first. Hover can be added in a follow-up if needed.

### Enhancement B: ArrowRight/ArrowLeft Keyboard Shortcuts

Current: Enter/Space opens, Escape closes
Enhancement: ArrowRight opens, ArrowLeft closes

Add to MenuGroup:

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    popoverRef.current?.show();
  }
};
```

**Recommendation:** Can be added as a follow-up enhancement.

---

## Comparison: Original vs Simplified

| Aspect                     | Original Plan       | Simplified Plan       |
| -------------------------- | ------------------- | --------------------- |
| New files                  | 5                   | 0                     |
| Lines of code              | ~500+               | ~50                   |
| New components             | 3                   | 0                     |
| New hooks                  | 1                   | 0                     |
| New styles                 | 1 file              | 0                     |
| Test complexity            | High                | Low                   |
| Maintenance burden         | High                | Low                   |
| Reuses existing components | Partial             | Full                  |
| Floating UI handling       | Custom              | IressPopover          |
| Styling                    | Custom              | IressMenuItem         |
| Nested menus               | Custom FloatingNode | IressPopover built-in |

---

## Implementation Checklist

### Required (MVP)

- [ ] Add `variant` prop to `IressMenuGroupProps`
- [ ] Add subdraw rendering using IressPopover + IressMenuItem
- [ ] Add `aria-haspopup` and `aria-expanded` to trigger
- [ ] Add tests for subdraw variant
- [ ] Add stories for subdraw variant
- [ ] Update documentation

### Optional (Future)

- [ ] Hover-to-open behavior (requires Popover enhancement)
- [ ] ArrowRight/ArrowLeft keyboard shortcuts
- [ ] Animation for submenu open/close

---

## Success Criteria

- ✅ MenuGroup renders inline by default (unchanged)
- ✅ MenuGroup with `variant="subdraw"` renders as clickable trigger
- ✅ Clicking trigger opens fly-over submenu
- ✅ Submenu closes on Escape or click outside
- ✅ Proper ARIA attributes present
- ✅ Works inside existing Popover contexts
- ✅ Supports nested subdraw groups
- ✅ All existing MenuGroup tests pass
- ✅ Accessibility tests pass

---

## Conclusion

The simplified approach reduces implementation complexity by **~90%** while delivering the same functionality. By composing existing, well-tested components (`IressPopover`, `IressMenuItem`, `IressMenu`), we:

1. **Eliminate code duplication** - No need to re-implement floating UI logic
2. **Reduce maintenance burden** - Fewer files to maintain
3. **Ensure consistency** - Uses same styling and behavior as other components
4. **Faster delivery** - Can be implemented in ~2 hours vs ~1-2 days
5. **Lower risk** - Leverages battle-tested code paths

# SelectMenu Groups Support Implementation Plan

## Problem Summary

The `LabelValueMeta` interface already includes a `children` property for grouping options, and `NativeSelect` already implements this feature. However, the rich `IressSelectMenu` component (used by `IressSelect` and `IressDropdownMenu`) does not yet support rendering grouped options.

## Current State

### ✅ Already Implemented

- **Interface Support**: `LabelValueMeta` and `FormattedLabelValueMeta` have `children?: Omit<LabelValueMeta<T>, 'children'>[]` property (one level deep)
- **Native Select**: Fully supports optgroups via the `children` property
- **Documentation**: Interface JSDoc clearly explains that items with `children` become non-selectable group labels

### ❌ Not Yet Implemented

- **Rich SelectMenu**: Does not render grouped items
- **Menu Components**: No `IressMenuGroup` or equivalent component exists
- **Helper Functions**: Functions like `findNewValueInItemsOrSelected`, `orderSelectedFirst`, etc. don't handle nested children
- **Keyboard Navigation**: Group headers need proper keyboard navigation (should be skippable)
- **Accessibility**: Proper ARIA structure for grouped options
- **Search/Filter**: How groups should behave when filtered/searched
- **Visual Styling**: Group header styling distinct from regular items

## Goals

1. Implement group rendering in `IressSelectMenu` to match native select functionality
2. Create reusable group component(s) for Menu system
3. Maintain backward compatibility with flat (non-grouped) option lists
4. Ensure proper accessibility and keyboard navigation
5. Handle edge cases in search, filtering, and selection

## Implementation Strategy

### Phase 1: Create Menu Group Component

Create a new `IressMenuGroup` component to render group headers.

**Files to Create:**

- `packages/components/src/components/Menu/MenuGroup/MenuGroup.tsx`
- `packages/components/src/components/Menu/MenuGroup/MenuGroup.test.tsx`
- `packages/components/src/components/Menu/MenuGroup/MenuGroup.stories.tsx`

**Component Requirements:**

- Extends `IressMenuTextProps` (similar to `IressMenuHeading`)
- Uses `typography.body.md.medium` for styling (consistent with `IressMenuHeading`)
- Non-focusable/non-selectable (groups are labels only)
- Distinct visual styling from menu items
- Support for divider after group (optional)
- Proper ARIA role (`role="group"` with `aria-label`)

**Example API:**

```tsx
<IressMenuGroup label="Group 1">
  <IressMenuItem>Option 1</IressMenuItem>
  <IressMenuItem>Option 2</IressMenuItem>
</IressMenuGroup>
```

### Phase 2: Update SelectMenu to Render Groups

Modify `SelectMenu.tsx` to detect and render grouped items.

**Changes Required:**

1. **Update rendering logic** in `IressSelectMenu`:
   - Detect items with `children` property
   - Render `IressMenuGroup` for parent items
   - Render child items within the group
   - Handle dividers between groups

2. **Example implementation pattern**:

```tsx
{
  menuItems.map((menuItem, index) => {
    if (menuItem.children && menuItem.children.length > 0) {
      return (
        <IressMenuGroup
          label={menuItem.label}
          key={`group-${menuItem.label}-${index}`}
          data-testid={propagateTestid(dataTestId, 'menu-group')}
        >
          {menuItem.children.map((childItem, childIndex) => (
            <IressSelectMenuItem
              {...childItem}
              data-testid={propagateTestid(dataTestId, 'menu-item')}
              key={`${getFormControlValueAsString(
                childItem.value ?? childItem.label,
              )}-${childIndex}`}
            />
          ))}
        </IressMenuGroup>
      );
    }

    return (
      <IressSelectMenuItem
        {...menuItem}
        data-testid={propagateTestid(dataTestId, 'menu-item')}
        key={`${getFormControlValueAsString(
          menuItem.value ?? menuItem.label,
        )}-${index}`}
      />
    );
  });
}
```

### Phase 3: Update Helper Functions

Update utility functions to handle nested children correctly.

**Files to Modify:**

- `SelectMenu.tsx` (internal helper functions)

**Functions to Update:**

1. **`orderSelectedFirst`**:
   - When ordering selected items first, flatten groups or maintain group structure
   - Decision needed: Should groups stay intact or break apart?
   - **Recommended**: Keep groups intact, move entire group if any child is selected

2. **`addLimitsToItems`**:
   - Apply limits considering groups (count children individually)
   - Mark children as `hiddenOnMobile` when group exceeds limit
   - Example: If limit is 5 and Group 1 has 3 items, Group 2 can show 2 items

3. **`getLabelValueMetaFromMenuSelected`**:
   - Search within children when finding selected values
   - Flatten children for selection matching

4. **`findNewValueInItemsOrSelected`**:
   - Search both top-level items and children
   - Return child item when found in nested structure

**Example Updated `findNewValueInItemsOrSelected`**:

```tsx
const findNewValueInItemsOrSelected = (
  items: LabelValueMeta[],
  selected: LabelValueMeta[],
  newValue?: FormControlValue,
) => {
  // Search top-level items
  let found = items.find(
    (item) =>
      item.value === newValue ||
      (item.value === undefined && item.label === newValue),
  );

  // If not found, search within children
  if (!found) {
    for (const item of items) {
      if (item.children) {
        found = item.children.find(
          (child) =>
            child.value === newValue ||
            (child.value === undefined && child.label === newValue),
        );
        if (found) break;
      }
    }
  }

  // Fallback to selected items
  return found ?? selected.find(/* ... */);
};
```

### Phase 4: Keyboard Navigation & Accessibility

Ensure proper keyboard navigation and ARIA structure.

**Requirements:**

1. **Keyboard Navigation**:
   - Arrow keys should skip group headers (navigate only between selectable items)
   - Group headers should not be focusable with Tab
   - Navigation should work seamlessly across groups

2. **ARIA Structure**:
   - Group headers: `role="group"` with `aria-label` set to group label
   - Or use `role="presentation"` for group header with semantic HTML
   - Maintain proper `aria-activedescendant` for virtual focus
   - Ensure screen readers announce group context

3. **Menu Context Updates**:
   - Update `useMenu` hook if needed to handle grouped items
   - Ensure proper focus management skips non-selectable group headers

**Implementation Notes:**

- Leverage existing `usePopoverItem` and menu navigation hooks
- Group headers should not be added to the focusable items list
- May need to update `Menu.tsx` to filter out group headers from navigation

### Phase 5: Search & Filter Behavior

Define and implement how groups behave when options are filtered/searched.

**Scenarios to Handle:**

1. **When all children of a group are filtered out**:
   - **Option A**: Hide the entire group (recommended)
   - **Option B**: Show group header with "No results" message
   - **Decision**: Hide the group entirely for cleaner UX

2. **When some children match the search**:
   - Show group header
   - Show only matching children
   - Maintain group structure for context

3. **Empty groups after filtering**:
   - Don't render empty group headers
   - Update helper functions to remove groups with no visible children

**Example Filter Logic**:

```tsx
const filterGroupedItems = (
  items: FormattedLabelValueMeta[],
  searchResults: FormattedLabelValueMeta[],
) => {
  return items
    .map((item) => {
      if (item.children) {
        // Filter children based on search results
        const matchingChildren = item.children.filter((child) =>
          searchResults.some(
            (result) =>
              (result.value ?? result.label) === (child.value ?? child.label),
          ),
        );

        // Only include group if it has matching children
        if (matchingChildren.length > 0) {
          return { ...item, children: matchingChildren };
        }
        return null; // Omit group
      }

      // Keep top-level items that match
      return searchResults.some(
        (result) =>
          (result.value ?? result.label) === (item.value ?? item.label),
      )
        ? item
        : null;
    })
    .filter((item) => item !== null);
};
```

4. **Integration with `useAutocompleteSearch`**:
   - Update search logic to flatten grouped items for searching
   - Re-group results after filtering
   - Maintain group structure in filtered results

### Phase 6: Visual Styling

Define distinct styling for group headers.

**Styling Requirements:**

1. **Group Header Styles** (`MenuGroup.styles.ts` or leverage existing `IressMenuHeading`):
   - Use `typography.body.md.medium` styling (consistent with `IressMenuHeading`)
   - Padding/margin to visually separate from items
   - Muted color to distinguish from selectable items
   - Non-interactive appearance (no hover effect)
   - Consider reusing or extending `IressMenuHeading` component/styles

2. **Group Item Indentation** (optional):
   - Slight indentation for child items to show hierarchy
   - Or maintain same indentation with visual separator

**Example CVA Recipe** (if creating custom styles):

```tsx
export const menuGroup = sva({
  slots: ['root', 'label', 'items'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      paddingBlock: 'spacing.200',
      paddingInline: 'spacing.300',
      textStyle: 'typography.body.md.medium', // As specified
      color: 'colour.neutral.70',
      pointerEvents: 'none', // Non-interactive
    },
    items: {
      // Optional indentation
      paddingInlineStart: 'spacing.400',
    },
  },
});
```

**Note:** Since `IressMenuHeading` already uses `typography.body.md.medium`, consider extending or composing with it rather than duplicating styles.

### Phase 7: Update Tests

Add comprehensive test coverage for grouped options.

**Test Files to Update:**

- `SelectMenu.test.tsx`
- `Select.test.tsx`
- `DropdownMenu.test.tsx`

**Test Scenarios:**

1. **Rendering**:

   ```tsx
   it('renders grouped options correctly', () => {
     const items = [
       {
         label: 'Group 1',
         children: [
           { label: 'Option 1-1', value: '1-1' },
           { label: 'Option 1-2', value: '1-2' },
         ],
       },
       {
         label: 'Group 2',
         children: [{ label: 'Option 2-1', value: '2-1' }],
       },
     ];

     const { getByTestId, getAllByTestId } = render(
       <IressSelectMenu items={items} data-testid="select-menu" />,
     );

     expect(getAllByTestId('select-menu__menu-group')).toHaveLength(2);
     expect(getAllByTestId('select-menu__menu-item')).toHaveLength(3);
   });
   ```

2. **Selection**:
   - Test selecting items from different groups
   - Test multi-select with grouped items
   - Test that group headers are not selectable

3. **Keyboard Navigation**:
   - Test arrow keys skip group headers
   - Test navigation within and across groups
   - Test that group headers are not focusable

4. **Filtering/Search**:
   - Test that groups with no matching children are hidden
   - Test that partial matches show group with matching children only
   - Test empty state when no groups have matches

5. **Accessibility**:

   ```tsx
   it('has proper ARIA structure for grouped options', async () => {
     const items = [
       /* grouped items */
     ];
     const { container } = render(<IressSelectMenu items={items} />);

     const results = await axe(container);
     expect(results).toHaveNoViolations();

     // Check for proper group roles
     expect(container.querySelector('[role="group"]')).toBeInTheDocument();
   });
   ```

6. **Helper Functions**:
   - Test `findNewValueInItemsOrSelected` with nested children
   - Test `addLimitsToItems` respects group boundaries
   - Test `orderSelectedFirst` maintains group structure

### Phase 8: Update Stories & Documentation

Add stories demonstrating grouped options.

**Stories to Add:**

1. **Select.stories.tsx**:

   ```tsx
   export const GroupedOptions: Story = {
     args: {
       placeholder: 'Select an option',
       options: [
         {
           label: 'Fruits',
           children: [
             { label: 'Apple', value: 'apple' },
             { label: 'Banana', value: 'banana' },
             { label: 'Orange', value: 'orange' },
           ],
         },
         {
           label: 'Vegetables',
           children: [
             { label: 'Carrot', value: 'carrot' },
             { label: 'Broccoli', value: 'broccoli' },
           ],
         },
       ],
     },
   };

   export const GroupedWithSearch: Story = {
     args: {
       ...GroupedOptions.args,
       options: async (query: string) => {
         // Mock async search with grouped results
         return groupedOptionsData;
       },
     },
   };
   ```

2. **DropdownMenu.stories.tsx**:

   ```tsx
   export const GroupedFilters: Story = {
     args: {
       value: { label: 'Apple', value: 'apple' },
       options: [
         /* grouped options */
       ],
     },
   };
   ```

3. **SelectMenu.stories.tsx**:
   - Standalone examples of grouped menu rendering
   - Multi-select with groups
   - Groups with dividers

**Documentation Updates:**

1. **Select.mdx**:
   - Add section explaining grouped options
   - Show when to use groups (organizing many related options)
   - Include best practices (max 2-5 groups, 3-10 items per group)

2. **SelectMenu.mdx** (if exists):
   - Document `children` property behavior
   - Explain non-selectable group headers

## Edge Cases & Considerations

### 1. Empty Groups

- **Scenario**: Group has `children: []`
- **Handling**: Don't render the group at all

### 2. Mixed Flat and Grouped Items

- **Scenario**: Some items have children, others don't
- **Handling**: Render normally, flat items appear alongside groups

### 3. Limits with Groups

- **Scenario**: `limitDesktop={5}` but first group has 10 items
- **Handling**:
  - **Option A**: Show entire group or none (recommended)
  - **Option B**: Truncate within group
  - **Decision**: Truncate within group for consistency with limitMobile

### 4. Selected First with Groups

- **Scenario**: `selectedFirst={true}` with grouped items
- **Handling**:
  - Keep groups intact
  - Move entire group if any child is selected
  - Or extract selected items into "Selected" group at top

### 5. Hide Selected Items with Groups

- **Scenario**: `hideSelectedItems={true}` removes all children from a group
- **Handling**: Hide the entire group when all children are hidden

### 6. Async Options with Groups

- **Scenario**: Options are fetched async and returned as groups
- **Handling**: Should work seamlessly if API returns grouped structure

### 7. Dividers in Groups

- **Scenario**: LabelValueMeta has `divider: true` and `children`
- **Handling**: Render divider after the entire group

### 8. Native Select Compatibility

- **Scenario**: Ensure API consistency between native and rich select
- **Handling**: Already compatible since both use same LabelValueMeta interface

## Implementation Checklist

### Phase 1: Menu Group Component

- [ ] Create `MenuGroup.tsx` component
- [ ] Create `MenuGroup.styles.ts` with CVA recipe
- [ ] Create `MenuGroup.test.tsx` with full coverage
- [ ] Create `MenuGroup.stories.tsx` with examples
- [ ] Export from `Menu/index.ts`

### Phase 2: SelectMenu Updates

- [ ] Update `SelectMenu.tsx` rendering logic to handle groups
- [ ] Add conditional rendering for items with children
- [ ] Ensure proper testid propagation for groups
- [ ] Update TypeScript interfaces if needed

### Phase 3: Helper Functions

- [ ] Update `orderSelectedFirst` to handle groups
- [ ] Update `addLimitsToItems` to count children correctly
- [ ] Update `getLabelValueMetaFromMenuSelected` to search children
- [ ] Update `findNewValueInItemsOrSelected` to search children
- [ ] Add helper to flatten grouped items when needed

### Phase 4: Keyboard Navigation & Accessibility

- [ ] Ensure group headers are not focusable
- [ ] Update menu navigation to skip group headers
- [ ] Add proper ARIA roles (`role="group"`, `aria-label`)
- [ ] Test with screen readers (VoiceOver, NVDA)
- [ ] Verify keyboard navigation works across groups

### Phase 5: Search & Filter

- [ ] Update search/filter logic to handle grouped items
- [ ] Implement group hiding when all children filtered out
- [ ] Test async options with grouped results
- [ ] Ensure `useAutocompleteSearch` works with groups

### Phase 6: Styling

- [ ] Design group header visual style
- [ ] Implement group styling in `MenuGroup.styles.ts`
- [ ] Decide on child item indentation (if any)
- [ ] Ensure styling works in both light and dark themes

### Phase 7: Tests

- [ ] Add tests for MenuGroup component
- [ ] Add tests for SelectMenu with grouped items
- [ ] Add tests for Select with grouped options
- [ ] Add tests for DropdownMenu with grouped options
- [ ] Test keyboard navigation with groups
- [ ] Test search/filter with groups
- [ ] Test edge cases (empty groups, limits, etc.)
- [ ] Run accessibility tests with axe

### Phase 8: Documentation

- [ ] Add grouped options story to Select
- [ ] Add grouped options story to DropdownMenu
- [ ] Add grouped options story to SelectMenu
- [ ] Update Select.mdx with groups section
- [ ] Add code examples and best practices
- [ ] Document accessibility considerations

### Phase 9: Integration & QA

- [ ] Test with real-world data and use cases
- [ ] Verify backward compatibility (flat lists still work)
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (responsive behavior)
- [ ] Verify performance with large grouped datasets
- [ ] Get design review and approval

## Success Criteria

- ✅ `IressSelectMenu` renders grouped options correctly
- ✅ Group headers are visually distinct and non-selectable
- ✅ Keyboard navigation skips group headers appropriately
- ✅ Accessibility tests pass (axe, screen reader compatible)
- ✅ Search/filter correctly handles grouped items
- ✅ All existing tests still pass (backward compatibility)
- ✅ New tests provide comprehensive coverage (>90%)
- ✅ Stories demonstrate all grouped option scenarios
- ✅ Documentation is clear and includes examples
- ✅ Feature parity with native select's optgroup functionality

## Future Enhancements (Out of Scope)

- **Multi-level nesting**: Support more than one level of children (currently limited to one level by interface)
- **Fly-over/subdraw menu for groups**: Allow groups to open in a secondary menu panel (fly-over or subdrawer style) when hovered or selected, keeping the main menu clean
- **Group selection**: Ability to select/deselect entire group
- **Custom group renderers**: Allow `renderGroup` prop for custom group headers
- **Async group loading**: Lazy-load groups on demand

## References

- NativeSelect implementation: `packages/components/src/components/Select/components/NativeSelect.tsx` (lines 107-118)
- LabelValueMeta interface: `packages/components/src/interfaces.ts` (lines 124-151)
- SelectMenu current implementation: `packages/components/src/components/Select/SelectMenu/SelectMenu.tsx`
- Menu component structure: `packages/components/src/components/Menu/`

## Notes

- The interface already supports groups, so this is purely an implementation task
- Native select already works with groups, so we have a reference implementation
- Focus on maintaining simplicity and accessibility throughout
- Consider performance implications with large numbers of groups/items

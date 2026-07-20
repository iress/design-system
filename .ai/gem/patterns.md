# IDS Patterns

> 10 docs

---

# Breadcrumbs

> Shows the current location within a navigational hierarchy.

## Import

```tsx
import { IressBreadcrumbs } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-breadcrumbs--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-29259)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Breadcrumbs)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=breadcrumbs&title=[Breadcrumbs]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=breadcrumbs,enhancement&title=[Breadcrumbs]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **items** | `BreadcrumbItem<C, THref>[]` | — | Array of breadcrumb items defining the navigation path, in hierarchical order. The last item is automatically treated as the current page. |
| limit | `number` | `5` | Maximum number of items to show before collapsing with overflow. Set to 0 to show all items without overflow. |
| overflowProps | `Omit<[IressPopoverProps](../../dist/components/Popover/Popover.d.ts), 'activator'>` | — | Additional props to pass to the overflow popover, such as `aria-label` for accessibility. This is only applicable when `limit` is set to a value less than the number of items. |

📄 [Full type definition](../../dist/patterns/Breadcrumbs/Breadcrumbs.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Breadcrumbs are a secondary navigation aid that helps users understand their current location within the site hierarchy and provides a simple way to navigate back to higher-level pages.

```tsx
<IressBreadcrumbs
  items={[{ label: 'Home', href: '/' }, { label: 'Current Page' }]}
/>;
```

## Design

### When to use

- **Site hierarchy navigation**: Help users understand where they are in a multi-level site structure
- **Secondary navigation**: Provide an alternative way to navigate back to parent pages
- **Context awareness**: Show the current page's relationship to parent sections

### When not to use

- **Single-level sites**: If your site has no hierarchy, breadcrumbs aren't necessary
- **Primary navigation**: Breadcrumbs are supplementary; don't rely on them as the only navigation

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep labels concise and descriptive | Use breadcrumbs as primary navigation |
| Make the current page the last item and not clickable | Make the current page item a clickable link |
| Position breadcrumbs near the top of the page, below primary navigation | Place breadcrumbs at the bottom of the page |
| On mobile, consider showing only the parent page link | Show the full breadcrumb trail on small screens |

### Content guidelines

- Use the actual page title as the breadcrumb label for consistency
- The last item should represent the current page and not be a link

### Related patterns

- [SideNav](../patterns/side-nav.md) — for persistent hierarchical navigation
- [Menu](../components/menu.md) — for navigation link lists
- [Link](../components/link.md) — for inline navigation to other pages

## Develop

### Quick Start

```tsx
import { IressBreadcrumbs } from '@iress-oss/ids-components';

<IressBreadcrumbs
  items={[{ label: 'Home', href: '/' }, { label: 'Current Page' }]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-breadcrumbs--docs#api-props)

### Usage

#### Items

This is the only required prop for the `IressBreadcrumbs` component, which defines the breadcrumb items to be displayed.

- **label**: The text displayed for the breadcrumb item
- **href**: The URL to navigate to when the item is clicked (optional for the current page)

This example demonstrates all supported breadcrumb configurations side by side.

```tsx
import {
  IressBreadcrumbs,
  IressPanel,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function BreadcrumbsAllConfigurations() {
  return (
    <IressPanel>
      <IressStack gap="xl">
        <IressStack>
          <IressText element="h3">2 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[{ label: 'Home', href: '/' }, { label: 'Current' }]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">3 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Details' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">4 Breadcrumbs</IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Category', href: '/category' },
              { label: 'Subcategory', href: '/subcategory' },
              { label: 'Details' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">
            5+ Breadcrumbs (with default overflow)
          </IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Level 1', href: '/l1' },
              { label: 'Level 2', href: '/l2' },
              { label: 'Level 3', href: '/l3' },
              { label: 'Level 4', href: '/l4' },
              { label: 'Current' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">
            5+ Breadcrumbs (with overflow disabled)
          </IressText>
          <IressBreadcrumbs
            overflowProps={{ container: document.body }}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Level 1', href: '/l1' },
              { label: 'Level 2', href: '/l2' },
              { label: 'Level 3', href: '/l3' },
              { label: 'Level 4', href: '/l4' },
              { label: 'Current' },
            ]}
            limit={0}
          />
        </IressStack>
      </IressStack>
    </IressPanel>
  );
}
```

#### Integration with routing libraries

##### React Router

```tsx
import { Link } from 'react-router-dom';

<IressBreadcrumbs
  items={[
    { label: 'Home', href: '/', element: Link },
    { label: 'Products', href: '/products', element: Link },
    { label: 'Details' },
  ]}
/>;
```

##### Next.js

```tsx
import Link from 'next/link';

<IressBreadcrumbs
  items={[
    { label: 'Home', href: '/', element: Link },
    { label: 'Products', href: '/products', element: Link },
    { label: 'Details' },
  ]}
/>;
```

## Specifications

### Accessibility

- **Semantic HTML**: Uses `<nav>`, `<ol>`, and `<li>` elements for proper structure
- **ARIA labels**: `aria-label` identifies the navigation as breadcrumbs
- **Current page**: `aria-current="page"` marks the current page item
- **Keyboard navigation**: All links are keyboard accessible via Tab key
- **Screen readers**: Separators are hidden from screen readers with `aria-hidden="true"`
- **Focus indicators**: Visible focus rings for keyboard navigation

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the next breadcrumb link |
| `Shift+Tab` | Moves focus to the previous breadcrumb link |
| `Enter` | Activates the focused breadcrumb link |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-breadcrumbs--docs)

---

# ContextualMenu

> Displays a context-sensitive menu of actions triggered by user interaction.

## Import

```tsx
import { IressContextualMenu } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-contextual-menu--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=7305-26780)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/ContextualMenu)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=contextual-menu&title=[Contextual Menu]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=contextual-menu,enhancement&title=[Contextual Menu]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `[IressContextualMenuItem](../../dist/patterns/ContextualMenu/ContextualMenu.d.ts)[]` | — | The items rendered in the contextual menu. |
| size | `medium` , `small` | `small` | Size for the menu trigger. |
| bordered | `boolean` | `false` | Adds a border around the trigger. |
| theme | `dark`, `light`  | `light` | Visual theme for the trigger treatment. |
| ariaLabel | `string` | `More options` | Accessible label for the menu trigger button. |
| onAction | `((item: [IressContextualMenuItem](../../dist/patterns/ContextualMenu/ContextualMenu.d.ts)) => void)` | — | Emitted when a menu item is clicked. Receives the clicked item as an argument. |
| children | `ReactNode` | — | The content to render within the popover. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| fluid | `boolean` | — | Popovers can be fluid, meaning they will take up the full width of their container. |
| show | `boolean` | — | When set to `true` the modal will be visible. Use for controlled popovers. |
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `bottom-end` | Sets the alignment of the popover relative to the activator element. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the popover into. By default, the popover will render where its parent is rendered.  **Note:** If the `container` doesn’t exist when the popover is mounted, ensure you pass an element directly (not a ref) and specify null as the default value before it is set. This lets it wait for the root to be available. For example, if you reference the parent element of a popover. |
| contentClassName | `string` | — | Class name of the popover content. @deprecated Use `contentStyle` instead. |
| contentStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | This allows you to customise the content styling specifically, which is the floating element. It accepts an object with any of the styling properties available on `IressCSSProps`, as well as `className` and `style`. |
| displayMode | `inline` , `overlay` | `overlay` | Sets the display mode of popover. |
| offset | `OffsetOptions` | `{ mainAxis: -6, crossAxis: 0 }` | The offset of the popover from its default position. This can be a number or an object with `mainAxis` and `crossAxis` properties, which specify the offset in pixels along the main axis (the axis along which the popover is aligned) and the cross axis (the perpendicular axis). |
| matchActivatorWidth | `boolean` | — | Sets the popover to match the width of the activator. Note: This only works when `displayMode="overlay"`. |
| virtualFocus | `boolean` | `false` | Whether the focus is virtual (using `aria-activedescendant`). Use this if you need focus to remain on the reference element (such as an input), but allow arrow keys to navigate items. Note: This is only applicable when type is set to: `listbox` or `menu`, and only works out of the box with `IressMenu` and its subcomponents. |
| defaultShow | `boolean` | — | When set to `true` the popover will be visible by default. Use for uncontrolled popovers. |
| focusStartIndex | `number` | — | Which index to start the focus on when the popover is opened. Only works with `type` listbox and menu. Note: The index must exist in the list of items, otherwise it will not work. |
| onActivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is activated. |
| onDeactivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is deactivated. |
| onNavigate | `((activeIndex: number , null) => void)` | — | Is called when registered popover items are navigated using arrow keys. Only works with `type` listbox and menu. |
| nested | `boolean` | — | Whether this popover uses nested navigation (ArrowRight to open, ArrowLeft to close). When not set, this is auto-detected based on whether the popover is inside another popover. |

📄 [Full type definition](../../dist/patterns/ContextualMenu/ContextualMenu.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A compact overflow action pattern that surfaces contextual actions in a popover menu. Use this pattern for row-level or card-level secondary actions where space is constrained.

```tsx
<IressContextualMenu
  items={[
    { key: 'edit', label: 'Edit', icon: 'edit' },
    { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
    { key: 'delete', label: 'Delete', icon: 'delete' },
  ]}
/>;
```

## Design

### When to use

- Actions are related to a specific item (such as a row, card or panel) and should not dominate the layout.
- Keep menus short and action-focused.
- Prefer verbs for labels (`Edit`, `Lock`, `Delete`).
- Place destructive actions at the end of the list.

### When not to use

- **Navigation menus**: Use `IressSideNav` or `IressMenu` for persistent navigation
- **Filter dropdowns**: Use `IressDropdownMenu` for filtering content based on selections

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep action labels short and verb-based | Use more than 7 items in a single menu |
| Group related actions together | Nest menus more than one level deep |
| Place destructive actions at the end | Use for primary navigation |
| Provide a clear trigger (e.g. "more" icon) | Hide critical actions only in a contextual menu |

### Content guidelines

- Use verb labels for menu items (e.g. `Edit`, `Delete`, `Duplicate`)
- Use sentence case for all labels
- Keep labels concise — aim for 1–3 words

### Related patterns

- [DropdownMenu](../patterns/dropdown-menu.md) — for filtering content based on selections
- [Menu](../components/menu.md) — for persistent navigation menus
- [Popover](../components/popover.md) — for custom overlay content

## Develop

### Quick Start

```tsx
import { IressContextualMenu } from '@iress-oss/ids-components';

<IressContextualMenu
  items={[
    { key: 'edit', label: 'Edit', icon: 'edit' },
    { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
    { key: 'delete', label: 'Delete', icon: 'delete' },
  ]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-contextual-menu--docs#api-props)

### Usage

Pass an array of items with `key`, `label`, optional `icon` and `onClick` handler.

```tsx
<IressContextualMenu
  items={[
    { key: 'edit', label: 'Edit', icon: 'edit' },
    { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
    { key: 'delete', label: 'Delete', icon: 'delete' },
  ]}
/>;
```

#### Size

Use `size="small"` or `size="medium"` to match surrounding density.

```tsx
<IressStack gap="sm">
  <IressContextualMenu
    items={[
      { key: 'edit', label: 'Edit', icon: 'edit' },
      { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
      { key: 'delete', label: 'Delete', icon: 'delete' },
    ]}
    size="small"
  />
  <IressContextualMenu
    items={[
      { key: 'edit', label: 'Edit', icon: 'edit' },
      { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
      { key: 'delete', label: 'Delete', icon: 'delete' },
    ]}
    size="medium"
  />
</IressStack>;
```

#### Align

Use `align` to align the menu relative to the trigger. If there is not enough space in the preferred direction, it will flip to the opposite side.

```tsx
<IressStyled p="spacing.10">
  <IressStack gap="md">
    <IressInline horizontalAlign="center" gap="sm">
      <IressContextualMenu
        items={[
          { key: 'edit', label: 'Edit', icon: 'edit' },
          { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
          { key: 'delete', label: 'Delete', icon: 'delete' },
        ]}
        align="top-start"
      />
      <IressContextualMenu
        items={[
          { key: 'edit', label: 'Edit', icon: 'edit' },
          { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
          { key: 'delete', label: 'Delete', icon: 'delete' },
        ]}
        align="top"
      />
      <IressContextualMenu
        items={[
          { key: 'edit', label: 'Edit', icon: 'edit' },
          { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
          { key: 'delete', label: 'Delete', icon: 'delete' },
        ]}
        align="top-end"
      />
    </IressInline>
    <IressInline horizontalAlign="between">
      <IressStack gap="sm">
        <IressInline horizontalAlign="left">
          <IressContextualMenu
            items={[
              { key: 'edit', label: 'Edit', icon: 'edit' },
              { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
              { key: 'delete', label: 'Delete', icon: 'delete' },
            ]}
            align="left-start"
          />
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressContextualMenu
            items={[
              { key: 'edit', label: 'Edit', icon: 'edit' },
              { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
              { key: 'delete', label: 'Delete', icon: 'delete' },
            ]}
            align="left"
          />
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressContextualMenu
            items={[
              { key: 'edit', label: 'Edit', icon: 'edit' },
              { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
              { key: 'delete', label: 'Delete', icon: 'delete' },
            ]}
            align="left-end"
          />
        </IressInline>
      </IressStack>
      <IressStack gap="sm">
        <IressInline horizontalAlign="right">
          <IressContextualMenu
            items={[
              { key: 'edit', label: 'Edit', icon: 'edit' },
              { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
              { key: 'delete', label: 'Delete', icon: 'delete' },
            ]}
            align="right-start"
          />
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressContextualMenu
            items={[
              { key: 'edit', label: 'Edit', icon: 'edit' },
              { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
              { key: 'delete', label: 'Delete', icon: 'delete' },
            ]}
            align="right"
          />
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressContextualMenu
            items={[
              { key: 'edit', label: 'Edit', icon: 'edit' },
              { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
              { key: 'delete', label: 'Delete', icon: 'delete' },
            ]}
            align="right-end"
          />
        </IressInline>
      </IressStack>
    </IressInline>
    <IressInline horizontalAlign="center" gap="sm">
      <IressContextualMenu
        items={[
          { key: 'edit', label: 'Edit', icon: 'edit' },
          { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
          { key: 'delete', label: 'Delete', icon: 'delete' },
        ]}
        align="bottom-start"
      />
      <IressContextualMenu
        items={[
          { key: 'edit', label: 'Edit', icon: 'edit' },
          { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
          { key: 'delete', label: 'Delete', icon: 'delete' },
        ]}
        align="bottom"
      />
      <IressContextualMenu
        items={[
          { key: 'edit', label: 'Edit', icon: 'edit' },
          { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
          { key: 'delete', label: 'Delete', icon: 'delete' },
        ]}
        align="bottom-end"
      />
    </IressInline>
  </IressStack>
</IressStyled>;
```

#### Bordered trigger

Use `bordered` when the trigger needs stronger visual affordance.

```tsx
<IressInline gap="sm">
  <IressContextualMenu
    items={[
      { key: 'edit', label: 'Edit', icon: 'edit' },
      { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
      { key: 'delete', label: 'Delete', icon: 'delete' },
    ]}
  />
  <IressContextualMenu
    items={[
      { key: 'edit', label: 'Edit', icon: 'edit' },
      { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
      { key: 'delete', label: 'Delete', icon: 'delete' },
    ]}
    bordered
  />
</IressInline>;
```

#### Themes

Use `theme="dark"` on panels using `colour.neutral.20` or darker backgrounds.

```tsx
<IressInline gap="sm" bg="alt" borderRadius="radius.system.layout" p="lg">
  <IressContextualMenu
    items={[
      { key: 'edit', label: 'Edit', icon: 'edit' },
      { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
      { key: 'delete', label: 'Delete', icon: 'delete' },
    ]}
    theme="dark"
  />
  <IressContextualMenu
    items={[
      { key: 'edit', label: 'Edit', icon: 'edit' },
      { key: 'lock', label: 'Lock', icon: 'lock', divider: true },
      { key: 'delete', label: 'Delete', icon: 'delete' },
    ]}
    theme="dark"
    bordered
  />
</IressInline>;
```

## Specifications

### Accessibility

- Provide a meaningful `ariaLabel` that describes the menu purpose in context. By default it is `More options...`.
- Ensure destructive labels are explicit (for example, `Delete account`).
- Keep item labels concise and unique within the menu.

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens the menu or activates the focused item |
| `Escape` | Closes the menu and returns focus to the trigger |
| `ArrowDown` | Moves focus to the next menu item |
| `ArrowUp` | Moves focus to the previous menu item |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-contextual-menu--docs)

---

# DropdownMenu

> Presents a list of actions or options revealed by a trigger button.

## Import

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-dropdown-menu--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/DropdownMenu)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=dropdown-menu&title=[Filter]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=dropdown-menu,enhancement&title=[Filter]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activatorStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | `{}` | Customisation options for the dropdown menu activator button.  Accepts any styling properties available on `IressCSSProps`, as well as `className`, `style`, and `data-testid`. @example ```tsx <IressDropdownMenu   activatorStyle={{ 'data-testid': 'my-activator', p: 'spacing.2' }} /> ``` |
| defaultSelected | `FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)> , FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)>[]` | — | The current value of the dropdown menu. Use this in uncontrolled mode when you want to set an initial value that can be changed internally by the component. For a controlled dropdown menu, use the `selected` prop instead. |
| footer | `ReactNode` | — | Footer showed in option panel when expanded. |
| header | `ReactNode` | — | Header showed in option panel when expanded. |
| inputProps | `Pick<[IressInputProps](../../dist/components/Input/Input.d.ts), "placeholder" | "append" | "prepend" | "clearable">` | `{ clearable: true, prepend: <IressIcon name="search" />, }` | Customise the searchable `IressInput` props for your needs. |
| **label** | `ReactNode` | — | The label is a description of the dropdown menu's purpose. |
| multiSelect | `boolean` | — | Multi-select mode. When `true`, multiple options can be selected. |
| onChange | `((selected: [ControlledValue](../../dist/hooks/useControlledState.d.ts)<[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>, TMultiple>) => void)` | — | Emitted when the value changes. |
| onReset | `(() => void)` | — | Emitted when the value is reset. |
| searchable | `boolean` | — | When `true` a search field is shown to search for specific filter option(s). |
| searchNoResultsText | `ReactNode` | — | Text to be displayed when no results are found from search. Ignored when `searchable` is `false` |
| selected | `FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)> , FormattedLabelValueMeta<[FormControlValue](../../dist/types.d.ts)>[]` | — | The current value of the dropdown menu. Use this in controlled mode when you want to manage the selected value from a parent component. For an uncontrolled dropdown menu, use the `defaultSelected` prop instead. |
| selectedOptionsText | `string` | `({{numOptions}})` | Text displayed next to label when two or more options are selected. It supports `{{numOptions}}` as a placeholder for the number of options selected. |
| visibleResetButton | `boolean, string ` | — | When `true`, a reset button will be shown above the options. If provided a string, it will be used as the reset button label. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| fluid | `boolean` | — | Popovers can be fluid, meaning they will take up the full width of their container. |
| type | `dialog` , `grid` , `listbox`, `menu` , `tree`  | — | Describes the type of content contained in the popover. |
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `bottom-start` | Sets the alignment of the popover relative to the activator element. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the popover into. By default, the popover will render where its parent is rendered.  **Note:** If the `container` doesn’t exist when the popover is mounted, ensure you pass an element directly (not a ref) and specify null as the default value before it is set. This lets it wait for the root to be available. For example, if you reference the parent element of a popover. |
| contentStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | This allows you to customise the content styling specifically, which is the floating element. It accepts an object with any of the styling properties available on `IressCSSProps`, as well as `className` and `style`. |
| displayMode | `inline` , `overlay` | `overlay` | Sets the display mode of popover. |
| offset | `OffsetOptions` | `5` | The offset of the popover from its default position. This can be a number or an object with `mainAxis` and `crossAxis` properties, which specify the offset in pixels along the main axis (the axis along which the popover is aligned) and the cross axis (the perpendicular axis). |
| matchActivatorWidth | `boolean` | — | Sets the popover to match the width of the activator. Note: This only works when `displayMode="overlay"`. |
| virtualFocus | `boolean` | `false` | Whether the focus is virtual (using `aria-activedescendant`). Use this if you need focus to remain on the reference element (such as an input), but allow arrow keys to navigate items. Note: This is only applicable when type is set to: `listbox` or `menu`, and only works out of the box with `IressMenu` and its subcomponents. |
| focusStartIndex | `number` | — | Which index to start the focus on when the popover is opened. Only works with `type` listbox and menu. Note: The index must exist in the list of items, otherwise it will not work. |
| onActivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is activated. |
| onDeactivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is deactivated. |
| onNavigate | `((activeIndex: number , null) => void)` | — | Is called when registered popover items are navigated using arrow keys. Only works with `type` listbox and menu. |
| nested | `boolean` | — | Whether this popover uses nested navigation (ArrowRight to open, ArrowLeft to close). When not set, this is auto-detected based on whether the popover is inside another popover. |
| disabled | `boolean` | `false` | Disables the hook from running any effects or search operations. When disabled, the hook returns empty results and default state. |
| debounceThreshold | `number` | `500` | Time in milliseconds to wait for before performing result search. Only applies to searchable options (function). |
| initialOptions | `[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[]` | — | Initial options data set, shown when the input is empty. |
| minSearchLength | `number` | `1` | Minimum number of characters required before triggering async search. Only applies to searchable options (function). Below this threshold, no search will be triggered and no loading state will be shown. |
| **options** | `[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[] , ((query: string) => Promise<[LabelValueMeta](../../dist/interfaces.d.ts)<[FormControlValue](../../dist/types.d.ts)>[]>)` | — | Options data set, shown when the input is not empty. |
| limitMobile | `number` | `6` | Maximum number of results displayed on mobile screen sizes (< 768). |
| limitDesktop | `number` | `12` | Maximum number of results displayed on larger screen sizes (>= 768). |

📄 [Full type definition](../../dist/patterns/DropdownMenu/DropdownMenu.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A component designed to filter a section based on a list of options and quickly navigate to relevant content.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
/>;
```

## Design

### When to use

- Filtering a table based on a list of options
- Navigating to a different section based on a list of options
- Updating a chart based on a list of options

### When not to use

This component is **not** designed to be used within forms and should be used to provide instant updates to rendered data. Instead, in forms, you should use components like `IressSelect`, `IressRadioGroup` or `IressCheckboxGroup`.

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Enable search for lists with 10+ options | Use for fewer than 5 options — use `IressRadioGroup` instead |
| Show a reset button for clearable filters | Use within forms — use `IressSelect` instead |
| Keep option labels short and scannable | Rely solely on colour to differentiate options |

### Content guidelines

- Keep option labels short and descriptive (1–3 words where possible)
- Use meaningful placeholder text that describes the expected selection (e.g. "Select a region")
- Use sentence case for labels and options

### Related patterns

- [Select](../components/select.md) — for form-based single selection
- [ContextualMenu](../patterns/contextual-menu.md) — for action menus on specific items
- [Popover](../components/popover.md) — for custom overlay content

## Develop

### Quick Start

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';

<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-dropdown-menu--docs#api-props)

### Usage

The `IressDropdownMenu` component is a fully controlled component. It is designed to be used in situations where the selection of an option(s) should trigger an immediate update to the rendered data.

Here is an example using multiple `IressDropdownMenu`s to filter an `IressTable`.

```tsx
import {
  IressInline,
  IressStack,
  IressTable,
  type LabelValueMeta,
  IressButton,
  IressDivider,
  IressDropdownMenu,
} from '@iress-oss/ids-components';
import { useMemo, useState } from 'react';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

const USERS = [
  {
    user: 'farmboy',
    name: 'Luke Skywalker',
    location: 'Temple Island',
    gender: 'male',
    status: 'Inactive',
  },
  {
    user: 'nevertellmetheodds',
    name: 'Han Solo',
    location: 'unknown',
    gender: 'male',
    status: 'Inactive',
  },
  {
    user: 'goldenrod',
    name: 'C-3PO',
    location: 'Space',
    gender: 'n/a',
    status: 'Active',
  },
  {
    user: 'whistles',
    name: 'R2-D2',
    location: 'Space',
    gender: 'n/a',
    status: 'Active',
  },
  {
    user: 'princess',
    name: 'Leia Organa',
    location: 'unknown',
    gender: 'female',
    status: 'Inactive',
  },
];

const getUniqueValues = (key: string): LabelValueMeta[] => {
  const unique: string[] = [];

  USERS.forEach((user) => {
    const propVal = user[key as never];
    if (!unique.includes(propVal)) unique.push(propVal);
  });

  return unique.map((item: string) => ({
    label: item,
    value: item,
  }));
};

async function searchStarWarsCharacters(query: string) {
  const data = await fetch(
    `https://swapi.py4e.com/api/people/?search=${query}`,
  ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

  return data.results.map((character: StarWarsCharacter) => ({
    label: character.name,
    value: character.name,
    meta: character.gender,
  }));
}

export const TableWithFilters = () => {
  const [name, setName] = useState<LabelValueMeta | undefined>();
  const [status, setStatus] = useState<LabelValueMeta | undefined>();
  const [location, setLocation] = useState<LabelValueMeta | undefined>();
  const [gender, setGender] = useState<LabelValueMeta | undefined>();

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Location' },
    { key: 'gender', label: 'Gender' },
  ];

  const rows = useMemo(() => {
    const match = (filterItem?: LabelValueMeta, detail?: string): boolean => {
      if (!filterItem?.value) return true;

      return (filterItem?.value ?? filterItem?.label) == detail;
    };

    return USERS.filter(
      (user) =>
        match(name, user.name) &&
        match(status, user.status) &&
        match(location, user.location) &&
        match(gender, user.gender),
    );
  }, [name, status, location, gender]);

  const handleReset = () => {
    setName(undefined);
    setStatus(undefined);
    setLocation(undefined);
    setGender(undefined);
  };

  return (
    <IressStack gap="md">
      <IressInline gap="md">
        <IressDropdownMenu
          label="Name"
          options={searchStarWarsCharacters}
          selected={name}
          onChange={setName}
          onReset={() => setName(undefined)}
          visibleResetButton
        />
        <IressDropdownMenu
          label="Status"
          options={getUniqueValues('status')}
          selected={status}
          onChange={setStatus}
          onReset={() => setStatus(undefined)}
        />
        <IressDropdownMenu
          label="Location"
          options={getUniqueValues('location')}
          selected={location}
          onChange={setLocation}
          onReset={() => setLocation(undefined)}
        />
        <IressDropdownMenu
          label="Gender"
          options={getUniqueValues('gender')}
          selected={gender}
          onChange={setGender}
          onReset={() => setGender(undefined)}
        />
        <IressButton onClick={handleReset} mode="quaternary">
          Reset filters
        </IressButton>
      </IressInline>
      <IressDivider />
      <IressTable
        caption="System users"
        columns={columns}
        rows={rows}
        empty={'No results found'}
      />
    </IressStack>
  );
};
```

#### Controlled

The `value` prop can be used to completely control the state of the component. Use the `onChange` and `onReset` props to sync your state with the component.

**Note:** The `value` prop is not checked against the options provided, allowing it to work with asynchronous options.

```tsx
import {
  IressDropdownMenu,
  type IressDropdownMenuProps,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const ALL_OPTIONS = [
  {
    label: 'This financial year',
    value: 'this_financial_year',
  },
  {
    label: 'Last financial year',
    value: 'last_financial_year',
  },
];

export const ControlledDropdownMenu = () => {
  const [selected, setSelected] =
    useState<IressDropdownMenuProps<false>['selected']>();

  return (
    <IressDropdownMenu
      container={document.body}
      label="Portfolio performance"
      options={ALL_OPTIONS}
      onChange={(newValue) => setSelected(newValue)}
      onReset={() => setSelected(ALL_OPTIONS[0])}
      selected={selected}
    />
  );
};
```

#### Multiple selection

Using the `multiSelect` prop, the `IressDropdownMenu` will allow the user to make multiple selections.

```tsx
import {
  IressDropdownMenu,
  type IressDropdownMenuProps,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const ALL_OPTIONS = [
  {
    label: 'Awesome',
  },
  {
    label: 'Great',
  },
];

export const ControlledDropdownMenuMultiselect = () => {
  const [selected, setSelected] = useState<
    IressDropdownMenuProps<true>['selected']
  >([ALL_OPTIONS[0]]);

  return (
    <IressDropdownMenu
      label="Descriptors"
      options={ALL_OPTIONS}
      multiSelect
      onChange={(newValue) => setSelected(newValue)}
      onReset={() => setSelected([ALL_OPTIONS[0]])}
      selected={selected}
      container={document.body}
    />
  );
};
```

#### Providing options

##### `options`

The `options` prop is required for the select dropdown. You can provide an array of `LabelValueMeta[]` objects to the `options` prop. Filtering is done based on the `label` property. Unique selected value(s) will be determined by the `value` property, falling back to `label` if `value` is not provided.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
/>;
```

##### Asynchronous `options`

If you would like to render suggestions from the server, you can pass a function to the `options` prop. It accepts a string parameter and returns a promise that resolves to an array of `LabelValueMeta[]` objects. No filtering is done for asynchronous options, you must filter the options yourself using the query.

**Note:** Asynchronous `options` will automatically set the `searchable` prop to true.

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';

interface StarWarsCharacter {
  name: string;
  gender: string;
}

interface StarWarsCharacterApi {
  results: StarWarsCharacter[];
}

export const ControlledDropdownMenuAsync = () => (
  <IressDropdownMenu
    label="Character"
    options={async (query: string) => {
      if (!query) return [];

      const data = await fetch(
        `https://swapi.py4e.com/api/people/?search=${query}`,
      ).then((response) => response.json() as Promise<StarWarsCharacterApi>);

      return data.results.map((character: StarWarsCharacter) => ({
        label: character.name,
        value: character.name,
        meta: character.gender,
      }));
    }}
    container={document.body}
  />
);
```

##### `initialOptions`

If you want to provide initial options to the user, you can use the `initialOptions` prop. This is useful when you want to provide a list of options to the user before they start typing (eg. recommended search terms).

**Note:** `initialOptions` only works if `searchable` is true.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  initialOptions={[
    { label: 'Favourite option 1', value: 'fav-1' },
    { label: 'Favourite option 2', value: 'fav-2' },
    { label: 'Favourite option 3', value: 'fav-3' },
  ]}
  searchable
/>;
```

#### Complex options

The options prop also accepts further properties for each option. This is useful for displaying other data that compliments the main label.

- append: accepts a ReactNode to append to the end of the option, usually a badge.
- meta: accepts a ReactNode to display additional information about the option.
- prepend: accepts a ReactNode to add to the start of the option, usually an icon.

All `IressDropdownMenu`s accept meta as an attribute in the option array.

```tsx
<IressDropdownMenu
  label="Contact"
  options={[
    {
      value: 'opt1',
      label: 'John Smith',
      meta: [
        <IressText key="opt1-type" color="colour.neutral.70" element="small">
          Individual
        </IressText>,
        <IressText key="opt1-email" color="colour.neutral.70" element="small">
          test@iress.com
        </IressText>,
      ],
    },
    {
      value: 'opt2',
      label: 'Tom Wilson',
      meta: [
        <IressText key="opt2-type" color="colour.neutral.70" element="small">
          Individual
        </IressText>,
      ],
    },
    {
      value: 'opt3',
      label: 'Alice Kay',
      meta: [
        <IressText key="opt3-type" color="colour.neutral.70" element="small">
          Individual
        </IressText>,
      ],
      append: <IressPill mode="70">Active</IressPill>,
    },
    {
      value: 'opt4',
      label: 'John Smith',
      meta: [
        <IressText key="opt4-type" color="colour.neutral.70" element="small">
          Business
        </IressText>,
        <IressText key="opt4-phone" color="colour.neutral.70" element="small">
          0432325675
        </IressText>,
      ],
    },
    {
      value: 'opt5',
      label: 'Eelin Team',
      meta: [
        <IressText key="opt5-contact" color="colour.neutral.70" element="small">
          test2@iress.com, 0432325675
        </IressText>,
      ],
    },
    {
      value: 'opt6',
      label: 'Eelin Team',
      meta: [
        <IressText key="opt6-contact" color="colour.neutral.70" element="small">
          test3@iress.com, 0439873244
        </IressText>,
      ],
    },
  ]}
  container={document.body}
/>;
```

#### Input props

You can customise some settings of the query input by setting the `inputProps`.

It does have some defaults to help with user experience. `prepend` automatically has a search icon, and `clearable` is set to true by default.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  inputProps={{
    placeholder: 'Search some stuff...',
  }}
  searchable
/>;
```

#### Searchable

When an `IressDropdownMenu` has 10 or more options, it is recommended that you enable the search functionality. This can be done by adding the `searchable` prop.

**Note:** When using asynchronous options, the `searchable` prop is automatically set to true.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  searchable
/>;
```

#### Reset filters

Adding the `visibleResetButton` prop adds a way for the user a way to easily reset their choices. This works for single and multiple selection filters.

Below are examples of both single selects and multi selects with `visibleResetButton` enabled.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  visibleResetButton
/>;
```

#### No results

If you would like to show a message when there are no results, you can use the `searchNoResultsText` prop. It accepts any React node.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  inputProps={{
    placeholder: 'Type "no" to see the no results text',
  }}
  searchable
  searchNoResultsText={
    <IressAlert variant="full-width" mb="none">
      No results found
    </IressAlert>
  }
/>;
```

#### Popover props

Under the hood, filter uses `IressPopover` to display the filter options. You can customise this with `popoverProps`. It accepts `align`, `className`, `container` and `displayMode`.

There are two additional props that filter accepts to customise the popover: `header` and `footer`. You can place additional content above or below the results using these props.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  footer={
    <>
      <IressMenuDivider />
      <IressSelectCreate label="Add an option" />
    </>
  }
/>;
```

#### Selected options text

In `multiSelect` mode, the selections options are displayed using the `selectedOptionsText` prop. You can customise this text to suit your needs. It will replace `{{numOptions}}` with the number of selected options.

```tsx
<IressDropdownMenu
  label="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  container={document.body}
  multiSelect
  selectedOptionsText=" - {{numOptions}}"
/>;
```

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Closed | Activator button displays the current selection or label |
| Open | Popover appears with options list; focus moves to first item or search input |
| Selection (single) | Option is selected, popover closes, activator updates |
| Selection (multi) | Option is toggled, popover remains open, activator updates count |
| Search | Options are filtered as user types; "no results" shown if empty |
| Reset | All selections are cleared, activator returns to default label |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens the menu or selects the focused option |
| `Escape` | Closes the menu and returns focus to the activator |
| `ArrowDown` | Moves focus to the next option |
| `ArrowUp` | Moves focus to the previous option |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-dropdown-menu--docs)

---

# Feedback

> Displays transient feedback messages to communicate the result of an action.

- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Feedback)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=feedback&title=[Feedback]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=feedback,enhancement&title=[Feedback]+Feature:+)

Feedback components communicate information to users about actions, states, and processes. Choosing the right feedback component ensures users receive the right level of information at the right time without unnecessary disruption.

**Choose the right feedback component:**

| Scenario | Component | Example |
|----------|-----------|---------|
| Brief confirmation (auto-dismisses) | Toast | `success({ content: 'Record saved' })` |
| Persistent page-level info | Alert | `<IressAlert status="info">Session info</IressAlert>` |
| Blocking decision required | Modal | `<IressModal heading="Confirm">Are you sure?</IressModal>` |
| Inline field-level error | ValidationMessage | `<IressValidationMessage status="danger">Required</IressValidationMessage>` |

```tsx
// Toast — transient confirmation
const { success } = useToaster();
success({ content: 'Record saved' });

// Alert — persistent inline message
<IressAlert status="warning">Session expires in 5 minutes</IressAlert>

// Modal — blocking decision
<IressModal heading="Delete record?" show={showModal}>
  Are you sure you want to delete this?
</IressModal>
```

## Design

### Decision guide

| Criteria             | Alert                  | Toast                         | Modal                          |
| -------------------- | ---------------------- | ----------------------------- | ------------------------------ |
| Interrupts the user  | No                     | No                            | Yes                            |
| Requires user action | Optional (dismissable) | No                            | Sometimes (confirmation, form) |
| Persists on screen   | Yes (inline)           | No (auto-dismisses after ~6s) | Yes (until dismissed)          |
| Placement            | Inline with content    | Overlay, corner of screen     | Overlay, centre of screen      |
| Blocks interaction   | No                     | No                            | Yes (backdrop)                 |

### When to use each component

#### Alert (`IressAlert`)

Use an alert for contextual, non-blocking messages that relate to the content around them.

- **Form validation**: Display errors or warnings near the relevant form section
- **Page-level status**: Inform users about the state of the current page (e.g. "This record is read-only")
- **Informational banners**: Provide tips, guidance, or announcements inline with content
- **Persistent warnings**: Messages that should remain visible until the condition changes

Alerts stay in the page flow and do not steal focus, making them ideal for information the user can act on at their own pace.

[Alert documentation →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-alert--docs)

#### Toaster (`IressToasterProvider` + `useToaster`)

Use a toast for brief, transient confirmations of background processes or completed actions.

- **Action confirmations**: "Record saved", "Email sent", "Item deleted"
- **Background process updates**: "File uploaded successfully", "Data synced"
- **Non-critical status changes**: Information the user should see but does not need to act on

Toasts auto-dismiss and should not contain critical information or actions the user must take. If the user needs to act on the message, use an Alert or Modal instead.

[Toaster documentation →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-toaster--docs)

#### Modal (`IressModal`)

Use a modal for tasks that require the user's full attention or an explicit decision before continuing.

- **Confirmations**: "Are you sure you want to delete this?" or "Discard unsaved changes?"
- **Subtasks**: Completing a short form or workflow without leaving the current page
- **Critical information**: Content that must be acknowledged before proceeding
- **Focused input**: Gathering information that requires concentration without distraction

Modals block interaction with the underlying page. Avoid using them for simple messages that could be an Alert or Toast.

[Modal documentation →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-modal--docs)

### Quick reference

- **Something happened in the background?** → Toast
- **The user needs to know something about this page?** → Alert
- **The user must decide or complete a task before continuing?** → Modal
- **The message should persist until a condition changes?** → Alert
- **The message is a brief confirmation?** → Toast
- **The content requires full attention?** → Modal

---

# Form

> Manages form state, validation, and submission for a group of input fields.

## Import

```tsx
import { IressForm } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Form)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=form&title=[Form]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=form,enhancement&title=[Form]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| actions | `ReactNode` | — | The actions to be displayed at the top right of the form. The actions to be displayed at the bottom left of the form. |
| footer | `ReactNode` | — | Footer to be displayed at the bottom of the form. This can be used for additional information, links, or actions that are relevant to the form but not part of the main content. |
| heading | `ReactNode` | — | Title displayed at the top of the form, usually the purpose of the form. |
| mode | `all` , `onBlur` , `onChange` , `onSubmit` , `onTouched` | `'onBlur' 'onSubmit'` | Configure the validation strategy **before** a user submits the form the first time. For long forms, it is recommended to use `onBlur` to avoid overwhelming the user with validation errors. This means that validation will occur when the user leaves a field, rather than on every change. Configure the validation strategy **before** a user submits the form the first time. For short forms, it is recommended to use `onSubmit`, as the data is normally familiar to the user (eg. login). @see https://react-hook-form.com/docs/useform#mode @see https://react-hook-form.com/docs/useform#mode |
| panelStyle | `[IressPanelProps](../../dist/components/Panel/Panel.d.ts)` | `{ bg: "alt" }` | Style the panel that wraps the form fields. |
| pattern | `long` , `short` | — | Use `pattern="long"` for the following use cases: - Forms that are used for data entry, such as creating or updating large datasets. - Forms that are longer than the viewport (usually more than 8-9 fields). Use `pattern="short"` for the following use cases: - Login forms, or similar forms that requires data familiar to the users - Forms that fit the length of a single screen (less than 8-9 fields) |
| reValidateMode | `onBlur` , `onChange` , `onSubmit` | `'onChange' 'onChange'` | Configure the validation strategy **after** a user submits the form the first time. During this phase, it is recommended to use `onChange` to provide immediate feedback on field changes so users can correct errors as they go. @see https://react-hook-form.com/docs/useform#reValidateMode @see https://react-hook-form.com/docs/useform#reValidateMode |
| sticky | `boolean` | — | If set to `true`, the form will have a sticky header that remains at the top of the viewport when scrolling. This is useful for long forms where you want the header to always be visible. |
| children | `ReactNode` | — | The content of the form, usually multiple `IressFormField` or `IressFormFieldset` components. |
| onSubmit | `((data: T) => void)` | — | Handler for when the submit method on the form is called after validation is passed. @see https://react-hook-form.com/docs/useform/handlesubmit |
| onError | `SubmitErrorHandler<T>` | — | Emitted when any field has an error. Called after the first submit if any errors are recorded, and from then on when any value changes. @see https://react-hook-form.com/docs/useform/handlesubmit |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| alert | `ReactNode` | `<IressFormValidationSummary srOnly />` | The content of the alert section. |
| onValidChange | `((isValid: boolean) => void)` | — | Emitted when the form state is valid. @see https://react-hook-form.com/docs/useform/formstate |
| updateErrorSummaryOnSubmit | `boolean` | `false` | If set to `true`, the summary will only update when the form is submitted, not on every field change. This is useful for performance reasons, especially in large forms. |
| context | `object` | — | This context object is mutable and will be injected into the `resolver`'s second argument (eg. [Yup](https://github.com/jquense/yup) validation's context object). @see https://react-hook-form.com/docs/useform#context |
| criteriaMode | `CriteriaMode` | — | Display all validation errors or one at a time. @see https://react-hook-form.com/docs/useform#criteriaMode |
| defaultValues | `((BrowserNativeObject , { [x: string]: any; }, { [x: string]: any; } , NestedValue) & FieldValues) ` | — | Default values to be passed through when an input is unset. @see https://react-hook-form.com/docs/useform#defaultValues |
| delayError | `number` | — | Delay error from appearing instantly. @see https://react-hook-form.com/docs/useform#delayError |
| progressive | `boolean` | — | Progressive Enhancement only applicable for SSR framework. @see https://react-hook-form.com/docs/useform |
| resetOptions | `Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; keepFieldsRef: boolean; }> , undefi...` | — | This property is related to value update behaviors. @see https://react-hook-form.com/docs/useform#resetOptions |
| resolver | `Resolver<T, object, T>` | — | This function allows you to use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others. @see https://react-hook-form.com/docs/useform#resolver |
| shouldUseNativeValidation | `boolean` | — | This config will enable browser native validation. It will also enable CSS selectors :valid and:invalid making styling inputs easier. @see https://react-hook-form.com/docs/useform#shouldUseNativeValidation |
| shouldUnregister | `boolean` | — | By default, an input value will be retained when input is removed. However, you can set `shouldUnregister` to `true` to `unregister` input during unmount. @see https://react-hook-form.com/docs/useform#shouldUnregister |
| values | `FieldValues` | — | The values prop will react to changes and update the form values, which is useful when your form needs to be updated by external state or server data. @see https://react-hook-form.com/docs/useform#values |

📄 [Full type definition](../../dist/patterns/Form/Form.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

### IressFormField Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| control | `Control<T>` | — | React Hook Form control object. It is used to register the field with the form. It is automatically provided when used inside an `IressForm`, but it can be overridden if you are using a custom form control. @see https://react-hook-form.com/ts#Control |
| defaultValue | `any` | — | A default value for the field. Although this is provided here as it is part of the React Hook Form API, it is recommended to set the default value in the form's `defaultValues` prop, to ensure the form is correctly initialised. |
| **name** | `string` | — | Name of the field. It is used to identify the field in the form. It must be unique within the form. |
| **render** | `(field: FormFieldRenderProps<T>, state: FormFieldRenderState<T>) => ReactNode` | — | Render function to provide the control for the field. To ensure the field is correctly registered with the form, the control must be passed as props to the rendered component. (eg. `render={field => <IressInput {...field} />}`) |
| renderSupplementary | `((field: FormFieldRenderProps<T>, state: FormFieldRenderState<T>) => ReactNode)` | — | Render function to allow you to render supplementary content alongside the field, with access to the field props and state. This can be useful for rendering custom components that need to interact with the form state, such as character counters, password strength meters, or custom validation messages. (eg. `renderSupplementary={{ value } => <CharCount value={value} />}`) |
| rules | `CustomRules<T>` | — | Validation rules, including: required, min, max, minLength, maxLength, pattern, validate @see https://react-hook-form.com/api/useform/register) |
| shouldUnregister | `boolean` | — | Input will be unregistered after unmount and defaultValues will be removed as well (it will not be stored in the form state). @see https://react-hook-form.com/docs/usecontroller |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the field in a read-only state, replacing the input with a static display of the current value. Validation rules are skipped. Use `'locked'` when the field is read-only due to permissions. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| error | `ReactNode` | — | Validation error to be displayed above the field. |
| **label** | `ReactNode` | — | Text to be displayed in the label. |
| hint | `ReactNode` | — | Text to be displayed as supporting field description. |
| horizontal | `boolean` | — | Displays the label and input field inline instead of stacked vertically. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| errorMessages | `[ValidationMessageObj](../../dist/interfaces.d.ts)[]` | — | Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`. |
| labelWidth | `string` | — | Controls the width of the label container when in horizontal mode. Can be any valid CSS width value (e.g., '200px', '20%', 'auto'). Only applies when `horizontal` is true. |
| removeErrorMargin | `boolean` | — | Removes the reserved space for error messages, allowing fields to stack with narrower gaps. When true, no margin is reserved for potential error messages. |
| supplementary | `ReactNode` | — | Supplementary content to be displayed below the field. Is only shown when the field is not in an error state. |

📄 [Full type definition](../../dist/patterns/FormField/FormField.d.ts)

### IressFormFieldset Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| control | `Control<TFieldValues>` | — | React Hook Form control object. It is used to register the field with the form. It is automatically provided when used inside an `IressForm`, but it can be overridden if you are using a custom form control. @see https://react-hook-form.com/ts#Control |
| defaultValue | `any` | — | A default value for the field. Although this is provided here as it is part of the React Hook Form API, it is recommended to set the default value in the form's `defaultValues` prop, to ensure the form is correctly initialised. |
| **name** | `string` | — | Name of the field. It is used to identify the field in the form. It must be unique within the form. |
| **render** | `(field: FormFieldRenderProps<TFieldValues>) => ReactNode` | — | Render function to provide the control for the field. |
| rules | `CustomRules<TFieldValues>` | — | Validation rules, including: required, min, max, minLength, maxLength, pattern, validate @see https://react-hook-form.com/api/useform/register |
| shouldUnregister | `boolean` | — | Input will be unregistered after unmount and defaultValues will be removed as well (it will not be stored in the form state). @see https://react-hook-form.com/docs/usecontroller |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| error | `ReactNode` | — | Validation error to be displayed above the field. |
| **label** | `ReactNode` | — | Text to be displayed in the label. |
| hint | `ReactNode` | — | Text to be displayed as supporting field description. |
| horizontal | `boolean` | — | Displays the label and input field inline instead of stacked vertically. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the group in a read-only state (no asterisk symbol). Use `'locked'` when the control is read-only due to permissions. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| errorMessages | `[ValidationMessageObj](../../dist/interfaces.d.ts)[]` | — | Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`. |
| labelWidth | `string` | — | Controls the width of the label container when in horizontal mode. Can be any valid CSS width value (e.g., '200px', '20%', 'auto'). Only applies when `horizontal` is true. |
| removeErrorMargin | `boolean` | — | Removes the reserved space for error messages, allowing fields to stack with narrower gaps. When true, no margin is reserved for potential error messages. |
| supplementary | `ReactNode` | — | Supplementary content to be displayed below the field. Is only shown when the field is not in an error state. |

📄 [Full type definition](../../dist/patterns/FormFieldset/FormFieldset.d.ts)

### IressFormValidationSummary Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| status | `danger` , `info` , `success`, `warning`  | — | Status for all child ValidationMessage components |
| linkToTarget | `string` | — | Renders validation messages as links pointing at the field it relates to, specified as a string Only works when used with the `messages` prop. |
| visiblePrefix | `boolean` | — | If set to true, the prefix will be visually displayed (default is only available to screen readers) |
| itemStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | Add additional styles to each item in the list. |
| actions | `[IressAlertButtonProps](../../dist/patterns/FormValidationSummary/FormValidationSummary.d.ts)[]` | — | Actions to display in the alert. These will be rendered as buttons with opinionated styling. If you want to use custom buttons, use the `footer` prop instead. |
| defaultClosed | `boolean` | — | If true, the alert will be dismissed and unrendered from the DOM. Use for uncontrolled dismissal of the alert, where the component manages its own dismissed state internally. |
| closed | `boolean` | — | If true, the alert will be dismissed and unrendered from the DOM. Use for controlled dismissal of the alert, where the parent component manages the dismissed state and passes it down via this prop. |
| closeLabel | `string` | — | Optional override for the default close button label "Close". |
| footer | `ReactNode` | — | Buttons and controls for the alert. @deprecated Use `actions` instead for buttons with opinionated styling. If you need other footer content, use the `children` prop instead. |
| heading | `ReactNode` | `<h3>There was a problem submitting this form</h3>` | Text for alert heading. If a string, it will use a heading with level 2. |
| icon | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | Icon to display in the alert. If set to `false`, no icon will be displayed. If not provided, the icon will be determined by the `status` prop. |
| multiLine | `boolean` | — | If true, the alert will have a layout that supports longer content, with increased spacing and the icon aligned to the top of the alert instead of centered. Should be used when the content of the alert is more than a couple of sentences. |
| onClose | `((e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Emitted when the alert is dismissed by the user via the close button. |
| variant | `full-width`, `sidebar`  | — | Variants of the alert, allowing it to be styled differently based on where its used in the application. - Sidebar: The icon will be aligned to the heading, and the text will appear below the icon. - Full-width: The border will be removed, except for the bottom border. |

📄 [Full type definition](../../dist/patterns/FormValidationSummary/FormValidationSummary.d.ts)

Use the IressForm component when you want to request, validate and process data from the user.

```tsx
<IressForm pattern="short">
  <IressFormField
    name="name"
    label="Name"
    rules={{ required: 'Name is required' }}
    render={(controlledProps) => <IressInput {...controlledProps} />}
  />
  <IressFormField
    name="email"
    label="Email"
    rules={{ required: 'Email is required' }}
    render={(controlledProps) => (
      <IressInput {...controlledProps} type="email" />
    )}
  />
</IressForm>;
```

```tsx
import { IressForm } from '@iress-oss/ids-components';
```

## Design

### When to use

- Collecting user input that needs validation
- Multi-field data entry with structured layout
- Progressive disclosure of form sections

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Validate on submit for short forms (≤ 8 fields) | Disable the submit button to indicate errors |
| Use `IressFormField` for every input in the form | Use `useState` to manage form field values |
| Mark required fields with the `required` rule | Rely solely on colour to indicate errors |

### Content guidelines

- Write error messages that are actionable (e.g. "Enter a valid email address" not "Invalid input")
- Use sentence case for labels and placeholders
- Mark required fields — the form will display an asterisk automatically

### Related patterns

- [Field](../components/field.md) — for standalone field layout without form validation
- [FormField](../patterns/form.md) — for individual validated form fields
- [Input](../components/input.md) — for text input controls
- [Select](../components/select.md) — for single-value selection
- [Checkbox](../components/checkbox.md) — for boolean or multi-select options

### Patterns

The `IressForm` component supports different patterns to ensure consistency in how forms are displayed depending on the context of the form.

1. `long`: This pattern is used when a form has more than 8 fields. It has the following characteristics:
   - The `heading` and `actions` are displayed at the top of the form and can be `sticky`, ensuring they are always visible to the user.
   - The validation errors are displayed when the user blurs out of a field (ie. moves to the next field), ensuring that the user is informed of any errors before submitting the form.
2. `short`: This is the default pattern and should be used when a form has 8 or fewer fields, usually for familiar data such as the user's login details. It has the following characteristics:
   - The `heading` is displayed at the top of the for and the `actions` are displayed at the bottom of the form.
   - The validation errors are displayed when the user submits the form to ensure that the user is not overwhelmed with errors when filling out the form.

**Note:** It is recommended to use the patterns above for new applications, or those doing an overhaul, as they provide a consistent user experience across forms. For older products, please follow the existing patterns in your application to ensure consistency with the rest of the product.

## Develop

### Installation

As of version 6, `react-hook-form` has been moved to a peer dependency. You will need to install it alongside `@iress-oss/ids-components` in order to use the `IressForm` or `IressHookForm` component.

```bash
yarn add @iress-oss/ids-components react-hook-form
```

### Quick Start

```tsx
import { IressForm } from '@iress-oss/ids-components';

<IressForm
  actions={
    <IressButton mode="primary" type="submit">
      Submit
    </IressButton>
  }
>
  <IressFormField
    label="Name"
    name="name"
    render={(controlledProps) => <IressInput {...controlledProps} />}
    rules={{
      required: true,
    }}
  />
</IressForm>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs#api-props)

### Key concepts

#### State management

`IressForm` manages the state of the form, including the form data and validation. This is done using the `useForm` hook from React Hook Forms. This hook provides a way to manage the form state, and provides methods to interact with the form. This was done to simplify the form components, make them more predictable (as the form becomes the single source of truth for all form related data) and improve performance by reducing re-renders (very important for large forms).

Due to this change, there are a few things you should consider during development:

- Avoid using the `useState` hook to manage form state. Instead, use the `useFormContext()` hook from `react-hook-form` or the `ref` of the `IressForm` component to interact with the form state. The initial value of the form can be set using the `defaultValues` prop, but from then on you should be using either the hook or ref to interact with the form state.
- Avoid using `onChange` handlers on form fields to react to form values. Instead, use the `useWatch` hook from `react-hook-form` to watch the value of a field and conditionally render fields based on the value of another field.

See below an example comparing a version 4 and version 5 `IressForm` when managing form state.

```diff
-import { IressForm, IressField, IressInput, IressCheckboxGroup, IressCheckbox } from '@iress/components';
+import { IressForm, IressFormField, IressInput, IressCheckboxGroup, IressCheckbox } from '@iress-oss/ids-components';
+import { useWatch } from 'react-hook-form';

-export const App = () => {
-  const [show, setShow] = useState(['name']);
-
-  return (
-    <IressForm>
-      <IressField label="Show fields">
-        <IressCheckboxGroup value={show} onChange={(newValues) => setShow(newValues)}>
+const ConditionalFields = () => {
+  const show = useWatch({ name: 'show' });
+
+  return (
+    <>
+      <IressFormField
+        label="Show fields"
+        name="show"
+        render={(controlledProps) => (
+          <IressCheckboxGroup {...controlledProps}>
             <IressCheckbox value="name">Name</IressCheckbox>
             <IressCheckbox value="email">Email</IressCheckbox>
           </IressCheckboxGroup>
-        </IressField>
-        {show.includes('name') && (
-          <IressField label="Name">
-            <IressInput name="name" />
-          </IressField>
-        )}
-        {show.includes('email') && (
-          <IressField label="Email">
-            <IressInput name="email" type="email" />
-          </IressField>
-        )}
-    </IressForm>
-  );
-};
+        )}
+      />
+      {show?.includes('name') && (
+        <IressFormField label="Name" name="name"
+          render={(controlledProps) => <IressInput {...controlledProps} />}
+        />
+      )}
+      {show?.includes('email') && (
+        <IressFormField label="Email" name="email"
+          render={(controlledProps) => <IressInput {...controlledProps} type="email" />}
+        />
+      )}
+    </>
+  );
+};
+
+export const App = () => (
+  <IressForm defaultValues={{ show: ['name'] }}>
+    <ConditionalFields />
+  </IressForm>
+);
```

#### Validation
#### Validation

Validation is now done declaratively using the `rules` prop on the `IressFormField` component. This is based on the [rules available in React Hook Forms](https://www.react-hook-form.com/api/useform/register/#options). This change was made to allow for more complex validation rules to be implemented.

Due to this change, there are a few things you should consider during development:

- If you want validation messages to be shown on form controls, you need to use the `IressFormField` component to wrap around the form control and set the `rules` prop. This will allow the form to manage the validation state of the field.
- Although you can still use props such as `maxLength` on `IressInput`, these no longer propagate to the form validation. You need to use the `rules` prop to set these validation rules as well, and rely on `maxLength` for the input to stop the user from entering more characters than allowed (a user experience improvement that we definitely recommend).
- You can no longer override default error messages for the whole form. To override the default messages, you must specify them in the `rules` prop per `IressFormField`.

See below an example comparing a version 4 and version 5 `IressForm` when adding validation rules.

```diff
-import { IressForm, IressField, IressInput, IressButton } from '@iress/components';
+import { IressForm, IressFormField, IressInput, IressButton } from '@iress-oss/ids-components';

 export const App = () => (
-  <IressForm valueMissing="{{fieldName}} needs to be filled in!">
-    <IressField label="Name">
-      <IressInput name="name" required />
-    </IressField>
-    <IressField label="Email">
-      <IressInput name="email" maxLength={10} />
-    </IressField>
+  <IressForm>
+    <IressFormField
+      label="Name"
+      name="name"
+      render={(controlledProps) => <IressInput {...controlledProps} />}
+      rules={{ required: 'Name needs to be filled in!' }}
+    />
+    <IressFormField
+      label="Email"
+      name="email"
+      render={(controlledProps) => <IressInput {...controlledProps} type="email" maxLength={10} />}
+      rules={{ maxLength: 10 }}
+    />
     <IressButton type="submit" mode="primary">
       Sign up
     </IressButton>
   </IressForm>
 );
```

#### Syncing state

For most scenarios, you should use the `onSubmit` event to sync the form data with other state management systems (eg. server, browser storage or state management libraries such as Redux). This event is emitted when the form passes validation, and contains a map of the field names and the data entered by the user.

For more complex scenarios, you may need to sync a field value before the form is submitted. In this case, you can use the `useWatch` hook to watch the value of a field and sync it with your state.

Consider the following for your development:

- Only use other state management systems to fill out the form at the initial render using `defaultValues`. After that, use the `onSubmit` event to sync the form data with your state.
- If you need to set form with data coming from an external system, use the `ref` of the form to `reset` the form values.

```tsx
const ref = useRef<FormRef | null>(null);
const api = useApi();

const handleSubmit = async (data) => {
  // Sync the form data with your state
  const details = await api.updateUser(data);

  // Update the form with the new data
  ref.current?.reset(details);
};

return (
  <IressForm onSubmit={handleSubmit} ref={ref}>
    ...
  </IressForm>
);
```

### Usage

#### Fields

Use the `IressFormField` component to create form fields. This component is a layout component that wraps around form controls such as `IressInput`. It provides a consistent layout for form fields, and hooks into the `IressForm` component to provide validation and error handling.

It has three required props:

- `name`: The name of the field, which will be used to identify the field in the form data.
- `label`: The label for the field.
- `render`: A render prop that renders the form control. It is passed an object containing the props to be spread onto the form control to allow it to be controlled by the form.

```tsx
<IressFormField
  name="email"
  label="Email"
  render={(controlledProps) => <IressInput {...controlledProps} type="email" />}
/>;
```

#### Supported form controls

Here are some examples of how to use `IressFormField` with different form controls. If you are using a form control that has multiple inputs inside (for example, `IressCheckboxGroup`), you can use `IressFormFieldset`, which changes the HTML structure to use a `fieldset` and `legend` element to group the inputs.

| Control | Wrapper | `render` prop |
|---------|---------|--------------|
| `IressInput` | `IressFormField` | `render={(controlledProps) => <IressInput {...controlledProps} />}` |
| `IressInputDate` | `IressFormField` | `render={(controlledProps) => <IressInput {...controlledProps} type="date" />}` |
| `IressSelect` | `IressFormField` | `render={(controlledProps) => ( <IressSelect {...controlledProps} options={[ { label: 'Male', value: 'male', prepend: <IressIcon name="mars" />, }, { label: 'Female', value: 'female', prepend: <IressIcon name="venus" />, }, { label: 'Other', value: 'other', prepend: <IressIcon name="otter" />, }, ]} /> )}` |
| `IressCheckboxGroup` | `IressFormFieldset` | `render={(controlledProps) => ( <IressCheckboxGroup {...controlledProps}> <IressCheckbox value="reading">Reading</IressCheckbox> <IressCheckbox value="writing">Writing</IressCheckbox> </IressCheckboxGroup> )}` |
| `IressRadioGroup` | `IressFormFieldset` | `render={(controlledProps) => ( <IressRadioGroup {...controlledProps}> <IressRadio value="steak">Steak</IressRadio> <IressRadio value="fish">Fish</IressRadio> <IressRadio value="salad">Salad</IressRadio> </IressRadioGroup> )}` |
| `IressCheckbox` | `IressFormField` | `render={({ value, ...controlledProps }) => ( <IressCheckbox {...controlledProps}>I agree to the terms and conditions</IressCheckbox> )}` |
| `IressAutocomplete` | `IressFormField` | `render={(controlledProps) => ( <IressAutocomplete {...controlledProps} options={searchStarWarsCharacters} /> )}` |
| `IressSlider` | `IressFormField` | `render={(controlledProps) => <IressSlider {...controlledProps} />}` |
| `IressTagInput` | `IressFormField` | `render={(controlledProps) => <IressTagInput {...controlledProps} />}` |

#### Supplementary content

The `renderSupplementary` prop allows you to render additional content alongside the field that has access to the field props and state. This is useful for displaying dynamic information such as character counters, password strength meters, or custom help text that responds to user input.

The render function receives two arguments:

1. `field`: An object containing the field props (id, name, value, onChange, onBlur, ref)
2. `state`: An object containing the field state (fieldState, formState)

Common use cases include:

- **Character counters**: Display the current character count and maximum allowed
- **Password strength indicators**: Show password strength based on the current value
- **Dynamic hints**: Provide contextual help based on the field value
- **Custom validation feedback**: Display real-time validation feedback separate from error messages

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressText,
} from '@iress-oss/ids-components';

export function FormFieldSupplementary() {
  return (
    <IressForm>
      <IressFormField
        label="Comment"
        name="comment"
        hint="Enter your feedback (max 200 characters)"
        render={(controlledProps) => (
          <IressInput
            {...controlledProps}
            rows={3}
            maxLength={200}
            placeholder="Type your comment here..."
          />
        )}
        renderSupplementary={({ value }) => (
          <IressText textStyle="typography.body.sm" color="muted">
            {(value as string)?.length || 0} / 200 characters
          </IressText>
        )}
        rules={{
          maxLength: {
            value: 200,
            message: 'Comment must not exceed 200 characters',
          },
        }}
      />
    </IressForm>
  );
}
```

#### Rules

Use the `rules` prop on the `IressFormField` component to add validation rules. These are based on the [rules available in React Hook Forms](https://www.react-hook-form.com/api/useform/register/#options). The following rules are supported.

**Note:** In version 5, you can no longer override default error messages for the whole form. To override the default messages, you must specify them in the `rules` prop per `IressFormField`.

##### `required`

A boolean which, if `true`, indicates that the input must have a value before the form can be submitted. You can assign a string to return a custom error message.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `required` rule works with all form controls (Input, Select, Checkbox, etc.).
 * Pass `true` for the default message, or a string for a custom message.
 */
export function FormRuleRequired() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        rules={{ required: true }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        rules={{ required: 'Please check this field' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `maxLength`

The maximum character length of the value to accept for this input.

**Notes**

- For `IressInput`, you should also set the `maxLength` to stop the user from entering more characters than allowed.
- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `maxLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMaxLength() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a maximum of 5 characters"
        rules={{ maxLength: 5 }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a maximum of 5 characters"
        rules={{
          maxLength: {
            value: 5,
            message: 'Please enter a max of 5 characters!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `minLength`

The minimum character length of the value to accept for this input.

**Notes**

- For `IressInput`, you should also set the `minLength` to stop the user from entering more characters than allowed.
- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `minLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMinLength() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a minimum of 7 characters"
        rules={{ minLength: 7 }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a minimum of 7 characters"
        rules={{
          minLength: {
            value: 7,
            message: 'Please enter a min of 7 characters!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `max`

The maximum number to accept for this input.

**Notes**

- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `maxLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMaxLength() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a maximum of 5 characters"
        rules={{ maxLength: 5 }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a maximum of 5 characters"
        rules={{
          maxLength: {
            value: 5,
            message: 'Please enter a max of 5 characters!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `min`

The minimum number to accept for this input.

**Notes**

- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `minLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMinLength() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a minimum of 7 characters"
        rules={{ minLength: 7 }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a minimum of 7 characters"
        rules={{
          minLength: {
            value: 7,
            message: 'Please enter a min of 7 characters!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `pattern`

The accepted regex pattern for the input.

**Notes**

- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `pattern` rule works with text-based controls. Uses a regex to validate input.
 */
export function FormRulePattern() {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a valid email address"
        rules={{ pattern: emailRegex }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a valid email address"
        rules={{
          pattern: {
            value: emailRegex,
            message: 'Please enter a valid email address!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `minDate`

The minimum date to accept for this input.

**Note:** This is a custom rule created for `IressForm` and its sub-components. It will translate the rule into a `validate` rule for react-hook-forms. It will not work with a `validate` function, only if you set the `validate` prop to an `object` of functions.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `minDate` rule works with date inputs. Validates that the date is after the specified value.
 */
export function FormRuleMinDate() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a date after today"
        rules={{ minDate: new Date() }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} type="date" />
        )}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a date after today"
        rules={{
          minDate: {
            value: new Date(),
            message: 'Please enter a date after today!',
          },
        }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} type="date" />
        )}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `maxDate`

The maximum date to accept for this input.

**Note:** This is a custom rule created for `IressForm` and its sub-components. It will translate the rule into a `validate` rule for react-hook-forms. It will not work with a `validate` function, only if you set the `validate` prop to an `object` of functions.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `maxDate` rule works with date inputs. Validates that the date is before the specified value.
 */
export function FormRuleMaxDate() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a date before today"
        rules={{ maxDate: new Date() }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} type="date" />
        )}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a date before today"
        rules={{
          maxDate: {
            value: new Date(),
            message: 'Please enter a date before today!',
          },
        }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} type="date" />
        )}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `email`

Ensures the input is a valid email address.

**Note:** This is a custom rule created for `IressForm` and its sub-components. It will translate the rule into a `validate` rule for react-hook-forms. It will not work with a `validate` function, only if you set the `validate` prop to an `object` of functions.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `email` rule is a shorthand for email validation. Works with text-based controls.
 */
export function FormRuleEmail() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter an email address"
        rules={{ email: true }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter an email address"
        rules={{ email: 'Please enter a valid email address!' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `validate`

You can pass a callback function as the argument to validate, or you can pass an object of callback functions to validate against all of them. This function will be executed on its own without depending on other validation rules included.

**Notes**

- for `object` or `array` input data, it's recommended to use the validate function for validation as the other rules mostly apply to `string`, `string[]`, `number` and `boolean` data types.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `validate` rule allows custom validation functions. Works with all form controls.
 * Return `true` for valid, or a string message for invalid.
 */
export function FormRuleValidate() {
  return (
    <IressForm>
      <IressFormField
        label="Must contain 'hello'"
        name="default"
        hint="Type something containing 'hello'"
        rules={{
          validate: {
            containsHello: (value: string) =>
              value?.includes('hello') || 'Value must contain "hello"',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Must be Google"
        name="custom"
        hint="Type 'Google' to pass"
        rules={{
          validate: {
            isGoogle: (value: string) =>
              value === 'Google' || 'Only Google is accepted!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

#### Handling submission

When the form passes validation (if not disabled), the `onSubmit` event is emitted. Its event details contain a map of the field names and the data entered by the user.

```tsx
import {
  IressTable,
  IressForm,
  IressModal,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';
import { useState } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export function FormSubmission() {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState<FieldValues | undefined>(
    undefined,
  );

  return (
    <IressForm
      onSubmit={(data) => {
        setSubmitted(data);
        setShowModal(true);
      }}
    >
      <IressFormField
        label="Name"
        name="name"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          required: 'Name is required',
        }}
      />
      <IressFormField
        label="Email address"
        name="email"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          minLength: {
            message: 'Use a longer email address',
            value: 6,
          },
          required: 'Email is required',
        }}
      />
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
      <IressModal
        show={showModal}
        onShowChange={setShowModal}
        onExited={() => setSubmitted(undefined)}
      >
        <IressTable
          caption="Submitted details"
          rows={Object.entries(submitted ?? {}).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </IressForm>
  );
}
```

#### Pre-fill the form

You can set the `defaultValues` prop to pre-fill the form values.

```tsx
<IressForm
  pattern="short"
  defaultValues={{
    name: 'Luke Skywalker',
    email: 'luke.skywalker@iress.com',
  }}
/>;
```

#### Custom error handling

The `onError` prop allows you to listen to any field errors. It takes two arguments. The first is a map of the field name and an object containing the first error message and type. The second is a ref to the original element that caused the error (the ref of the underlying input).

One use case for this prop is to create your own visible error summary at the top of the form, or to log errors to an external service.

```tsx
import {
  IressTable,
  IressForm,
  IressModal,
  IressStack,
  IressFormField,
  IressInput,
  IressButton,
  IressText,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import { type FieldErrors } from 'react-hook-form';

interface FieldValues {
  name?: string;
  email?: string;
}

export function CustomErrorHandlingForm() {
  const [errors, setErrors] = useState<FieldErrors<FieldValues> | undefined>(
    undefined,
  );

  return (
    <IressForm onError={(data) => setErrors(data)}>
      <IressText mb="md">
        <h2>Custom error handling</h2>
        <p>
          Demonstrates usage of the <code>onError</code> prop to show a modal
          when there are issues with the form.
        </p>
      </IressText>
      <IressFormField
        label="Name"
        name="name"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          required: 'Name is required',
        }}
      />
      <IressFormField
        label="Email address"
        name="email"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          minLength: {
            message: 'Use a longer email address',
            value: 6,
          },
          required: 'Email is required',
        }}
      />
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
      <IressModal
        show={!!errors}
        onShowChange={(show) => !show && setErrors(undefined)}
      >
        <IressTable
          caption="Errors"
          rows={Object.entries(errors ?? {}).map(([name, errorDetails]) => ({
            name,
            errorDetails: (
              <IressStack gap="sm">
                <ul>
                  <li>Error type: {String(errorDetails?.type)}</li>
                  <li>Error message: {String(errorDetails?.message)}</li>
                </ul>
              </IressStack>
            ),
          }))}
        />
      </IressModal>
    </IressForm>
  );
}
```

#### `values`

If you would like more control over each value of the form, you should use the `values` prop. This will make the form controlled, meaning it will rely completely on the `values` state to render the value of each field. You will need to use the `onSubmit` prop to sync the form value with your state.

Use cases where you may need the `values` prop:

- Syncing with a server once the values have been processed
- Syncing the value with browser storage

**Note:** `values` takes precedence over `defaultValues`. To ensure your form state is predictable, it is best to only use one prop to manage form values.

```tsx
import {
  IressForm,
  IressModal,
  IressDivider,
  IressButton,
  IressTable,
  IressInline,
  IressFormField,
  IressInput,
} from '@iress-oss/ids-components';
import { useState } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export function ControlledForm() {
  const [values, setValues] = useState<FieldValues>({
    name: 'Leia Skywalker',
    email: 'leia.skywalker@iress.com',
  });
  const [preview, setPreview] = useState(false);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          setValues(data);
          setPreview(true);
        }}
        values={values}
        mode="onChange"
      >
        <IressFormField
          label="Name"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            required: 'Name is required',
          }}
        />
        <IressFormField
          label="Email address"
          name="email"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            minLength: {
              message: 'Use a longer email address',
              value: 6,
            },
            required: 'Email is required',
          }}
        />
      </IressForm>
      <IressDivider my="md" />
      <IressInline gap="sm">
        <IressButton onClick={() => setPreview(true)}>Last update</IressButton>
        <IressButton
          onClick={() =>
            setValues({
              name: '',
              email: '',
            })
          }
        >
          Clear
        </IressButton>
      </IressInline>
      <IressModal show={!!preview} onShowChange={(show) => setPreview(show)}>
        <IressTable
          caption="Last update"
          rows={Object.entries(values).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </>
  );
}
```

#### Disable validation

Disabling validation is not possible with the `IressForm` component. In cases where you do need to disable validation, please consider the following:

1. Use a non-submitting button to save a draft (eg. `<IressButton type="button">Save as draft</IressButton>`). Then you can use the `ref` of the form to get the form data.
2. Use a native `form` element, and customise the error handling.

Here we have an example showcasing option one.

```tsx
import {
  type FormRef,
  IressButton,
  IressDivider,
  IressForm,
  IressFormField,
  IressInput,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';
import { useRef } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

const Form = () => {
  const { success, error } = useToaster();
  const formRef = useRef<FormRef<FieldValues>>(null);

  return (
    <>
      <IressForm
        onSubmit={() =>
          success({
            heading: 'Passed validation',
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          })
        }
        onError={() =>
          error({
            heading: 'Failed validation',
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          })
        }
        ref={formRef}
      >
        <IressFormField
          label="Name"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            required: 'Name is required',
          }}
        />
        <IressFormField
          label="Email address"
          name="email"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            minLength: {
              message: 'Use a longer email address',
              value: 6,
            },
            required: 'Email is required',
          }}
        />
      </IressForm>
      <IressDivider my="md" />
      <IressButton
        onClick={() => {
          success({
            heading: 'Saved as draft (no validation)',
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          });
        }}
      >
        Save as draft
      </IressButton>
    </>
  );
};

export function DisableValidationForm() {
  return (
    <IressToasterProvider>
      <Form />
    </IressToasterProvider>
  );
}
```

#### Resetting the form

You can reset the form using the `ref` of the form. You must provide a `defaultValues` prop that contains all the fields in the form to ensure it resets properly.

**Note:** `<button type="reset" />` does not work with `IressForm`. You need to add an `onClick` prop to the button and use the `ref.reset` method to reset the form.

```tsx
import {
  IressForm,
  type FormRef,
  IressDivider,
  IressButton,
  IressFormField,
  IressInput,
} from '@iress-oss/ids-components';
import { useRef } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export function FormReset() {
  const ref = useRef<FormRef<FieldValues>>(null);

  return (
    <IressForm ref={ref}>
      <IressFormField
        label="Name"
        name="name"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          required: 'Name is required',
        }}
      />
      <IressFormField
        label="Email address"
        name="email"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          minLength: {
            message: 'Use a longer email address',
            value: 6,
          },
          required: 'Email is required',
        }}
      />
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
      <IressDivider my="md" />
      <IressButton type="reset" onClick={() => ref.current?.reset()}>
        Reset
      </IressButton>
    </IressForm>
  );
}
```

#### `IressHookForm`

`IressHookForm` is the underlying component that `IressForm` is built upon. It has a single required prop, `form`, which expects the return value of the `useForm` hook from React Hook Forms.

It has been exposed to consumers to allow you to have complete control of your React Hook Forms instance whilst still taking advantage of the IDS form components.

Some use cases:

1. You may need to use the `useForm` hook in a parent component to share the form state with multiple child components.
2. You would like to use the return value of the `useForm` hook without having to use a ref to access the `react-hook-form` api.

```tsx
import {
  IressButton,
  IressCheckbox,
  IressContainer,
  IressDivider,
  IressFormField,
  IressHookForm,
  IressInput,
  IressInputCurrency,
  IressPanel,
  IressText,
} from '@iress-oss/ids-components';
import { useForm } from 'react-hook-form';

interface FieldValues {
  firstName: string;
  lastName: string;
  insuredAtPolicyLevel?: boolean;
  sumInsured?: number;
  sumInsured_na?: string;
}

export const HookFormExample = () => {
  const initialInsuredAtPolicyLevel = false;
  const initialSumInsured = 5000;

  const form = useForm<FieldValues>();
  const { watch, control } = form;

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const insuredAtPolicyLevel = watch('insuredAtPolicyLevel');

  return (
    <IressContainer>
      <IressText>
        <h2>Hook Form Example</h2>
        <p>
          This example demonstrates how to use the <code>IressHookForm</code>{' '}
          component to create a form with controlled fields and conditional
          rendering based on form values.
        </p>
        <IressHookForm form={form}>
          {firstName && lastName && (
            <IressPanel mb="md" bg="alt">
              Name: {firstName} {lastName}
            </IressPanel>
          )}
          <IressFormField
            name="firstName"
            label="First Name"
            render={(controlledProps) => <IressInput {...controlledProps} />}
            rules={{ required: true }}
          />
          <IressFormField
            name="lastName"
            label="Last Name"
            render={(controlledProps) => (
              <IressInput {...controlledProps} type="email" />
            )}
            rules={{ required: true }}
          />
          <IressDivider mt="lg" mb="md" />
          <IressFormField
            name="insuredAtPolicyLevel"
            defaultChecked={initialInsuredAtPolicyLevel}
            label="Insurance options"
            control={control}
            render={(controlledProps) => (
              <IressCheckbox {...controlledProps}>
                Insured at policy level
              </IressCheckbox>
            )}
          />
          {insuredAtPolicyLevel && (
            <IressFormField
              name="sumInsured"
              defaultValue={initialSumInsured}
              label="Sum insured"
              control={control}
              render={(controlledProps) => (
                <IressInputCurrency {...controlledProps} currencyCode="GBP" />
              )}
            />
          )}
          {!insuredAtPolicyLevel && (
            <IressFormField
              name="sumInsured_na"
              defaultValue="N/A"
              label="Sum insured"
              control={control}
              render={(properties) => <IressInput {...properties} readOnly />}
            />
          )}
          <IressButton type="submit" mode="primary">
            Submit
          </IressButton>
        </IressHookForm>
      </IressText>
    </IressContainer>
  );
};
```

#### `IressFormValidationSummary`

`IressFormValidationSummary` is the error summary component that is added to the top of the form for screen readers to announce validation errors. It is automatically added to the form when there are validation errors, but you can also use it independently to create your own error summary, usually used if you want a visible error summary at the top of the form.

```tsx
<IressFormValidationSummary />;
```

#### With readonly data

You can use `IressForm` with readonly data by setting the `readOnly` prop to `true` on controlled elements. This will disable those form controls, but will include the values in the form submission.

Please take note of the following when displaying read only data.

- It is best to keep readonly data in a separate section of the form, to further avoid confusion with editable fields.

```tsx
import {
  IressButton,
  IressCol,
  IressContainer,
  IressDivider,
  IressForm,
  IressFormField,
  IressInput,
  IressModal,
  IressRow,
  IressTable,
  IressText,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import { type FieldValues } from 'react-hook-form';

export const WithReadonlyDataForm = () => {
  const [values, setValues] = useState<FieldValues>({
    firstName: 'Leia',
    lastName: 'Skywalker',
    email: 'leia.skywalker@iress.com',
  });
  const [preview, setPreview] = useState(false);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          setValues(data);
          setPreview(true);
        }}
        values={values}
      >
        <IressContainer>
          <IressText element="h2">User Details</IressText>
          <IressRow gutter="md">
            <IressCol>
              <IressFormField
                name="firstName"
                label="First Name"
                render={(controlledProps) => (
                  <IressInput {...controlledProps} readOnly />
                )}
                mb="none"
              />
            </IressCol>
            <IressCol>
              <IressFormField
                name="lastName"
                label="Last Name"
                render={(controlledProps) => (
                  <IressInput {...controlledProps} readOnly />
                )}
                mb="none"
              />
            </IressCol>
          </IressRow>
          <IressDivider my="spacing.4" />
          <IressFormField
            name="email"
            label="Email"
            render={(controlledProps) => (
              <IressInput {...controlledProps} type="email" />
            )}
          />
          <IressButton type="submit" mode="primary">
            Submit
          </IressButton>
        </IressContainer>
      </IressForm>
      <IressModal show={!!preview} onShowChange={(show) => setPreview(show)}>
        <IressTable
          caption="Submitted"
          rows={Object.entries(values).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </>
  );
};
```

#### Switching between readonly and edit modes

It is recommended to use a button to toggle between read-only and editable input modes.

Please take note of the following when switching between modes:

- Switching is done on a per-section basis, not on a per-field basis.
- When the user saves the data, it should switch back to read-only mode to avoid any confusion about whether the changes have been saved.

```tsx
import {
  IressButton,
  IressCol,
  IressContainer,
  IressForm,
  IressFormField,
  IressIcon,
  IressInline,
  IressInput,
  IressRow,
  IressSelect,
  IressText,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import { type FieldValues } from 'react-hook-form';

const Form = () => {
  const dependentOptions = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];
  const [values, setValues] = useState<FieldValues>({
    firstName: 'Leia',
    lastName: 'Skywalker',
    email: 'leia.skywalker@iress.com',
    dependents: 0,
  });
  const [editable, setEditable] = useState(false);
  const { success } = useToaster();

  return (
    <IressForm
      onSubmit={(data) => {
        setValues(data);
        setEditable(false);
        success({
          content: 'Saved successfully',
        });
      }}
      values={values}
    >
      <IressContainer>
        <IressText element="h2" mb="spacing.4">
          User Details
        </IressText>
        <IressRow gutter="md">
          <IressCol>
            <IressFormField
              name="firstName"
              label="First Name"
              render={(controlledProps) => (
                <IressInput {...controlledProps} readOnly={!editable} />
              )}
            />
          </IressCol>
          <IressCol>
            <IressFormField
              name="lastName"
              label="Last Name"
              render={(controlledProps) => (
                <IressInput {...controlledProps} readOnly={!editable} />
              )}
            />
          </IressCol>
        </IressRow>
        <IressRow gutter="md">
          <IressCol>
            <IressFormField
              name="email"
              label="Email"
              render={(controlledProps) => (
                <IressInput
                  {...controlledProps}
                  readOnly={!editable}
                  type="email"
                />
              )}
            />
          </IressCol>
          <IressCol>
            <IressFormField
              name="dependents"
              label="Dependents"
              render={(controlledProps) => (
                <IressSelect
                  {...controlledProps}
                  readOnly={!editable}
                  options={dependentOptions}
                />
              )}
            />
          </IressCol>
        </IressRow>
        {editable ? (
          <IressInline gap="sm">
            <IressButton type="submit" mode="primary">
              Save
            </IressButton>
            <IressButton onClick={() => setEditable(false)}>Cancel</IressButton>
          </IressInline>
        ) : (
          <IressButton
            onClick={() => setEditable(true)}
            prepend={<IressIcon name="pencil" />}
          >
            Edit
          </IressButton>
        )}
      </IressContainer>
    </IressForm>
  );
};

export const SwitchEditReadonlyForm = () => (
  <IressToasterProvider>
    <Form />
  </IressToasterProvider>
);
```

#### Nested forms

Unfortunately, it is [forbidden to nest form elements as per the HTML specifications](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form).

To achieve a similar effect, you can use multiple `IressForm` components, and trigger validation in multiple ways:

1. You can trigger specific forms using the `form` attribute of `IressButton`. The [`form` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#form) allows you to specify the form ID to submit when the button is clicked, which can be any form on the page, and will take precedence over the parent form of a button.
2. If you need to trigger multiple forms, you can use the [`requestSubmit` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit) on the form element to trigger the validation of multiple forms.
3. If you only want to trigger validation and not trigger submission even if the validation passes, you can use the `ref` attribute of `IressForm` and trigger validation manually using `ref.current?.api.trigger()`, which is based on the [React Hook Form API](https://react-hook-form.com/docs/useform/trigger).

The example here showcases triggering validation using the `form` attribute of `IressButton` and the `requestSubmit` method on the form element.

```tsx
import {
  IressButton,
  IressDivider,
  IressFieldGroup,
  IressForm,
  IressFormField,
  IressFormValidationSummary,
  IressInline,
  IressInput,
  IressModal,
  IressPanel,
  IressStack,
  IressTable,
} from '@iress-oss/ids-components';
import { useState } from 'react';

interface FormData {
  name: string;
}

const MainForm = () => {
  const [details, setDetails] = useState<FormData | undefined>();

  return (
    <>
      <IressForm<FormData>
        alert={
          <IressFormValidationSummary heading="Please fix the errors for the main form" />
        }
        id="mainForm"
        onSubmit={(data) => {
          setDetails(data);
        }}
      >
        <IressFormField<FormData>
          name="name"
          label="Name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
      </IressForm>
      <IressModal
        show={!!details}
        onShowChange={(show) => !show && setDetails(undefined)}
      >
        {details && (
          <IressTable
            caption="Submitted main form"
            rows={Object.entries(details).map((entry) => ({
              name: entry[0],
              value: JSON.stringify(entry[1], null, 2),
            }))}
          />
        )}
      </IressModal>
    </>
  );
};

const SubForm = () => {
  const [details, setDetails] = useState<FormData | undefined>();

  return (
    <IressPanel bg="alt">
      <IressStack gap="md">
        <IressForm<FormData>
          alert={
            <IressFormValidationSummary heading="Please fix the errors for the dependants" />
          }
          id="subForm"
          onSubmit={(data) => {
            setDetails(data);
          }}
        >
          <IressFieldGroup label="Add new dependant" inline mb="none">
            <IressFormField
              name="name"
              label="Name"
              render={(controlledProps) => <IressInput {...controlledProps} />}
              rules={{ required: true }}
            />
            <IressButton type="submit">Save</IressButton>
          </IressFieldGroup>
        </IressForm>
        <IressTable
          caption="Dependants"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'value', label: 'Value' },
          ]}
          rows={Object.entries(details ?? {}).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressStack>
    </IressPanel>
  );
};

export const NestedFormsExample = () => {
  const submitAllForms = () => {
    document.querySelector<HTMLFormElement>('[id=mainForm]')?.requestSubmit();
    document.querySelector<HTMLFormElement>('[id=subForm]')?.requestSubmit();
  };

  return (
    <IressStack gap="md">
      <MainForm />
      <SubForm />
      <IressDivider />
      <IressInline gap="md">
        <IressButton type="submit" form="mainForm">
          Submit main form
        </IressButton>
        <IressButton onClick={submitAllForms}>Submit all forms</IressButton>
      </IressInline>
    </IressStack>
  );
};
```

#### Form groups

Powered by [React Hook Form](https://react-hook-form.com/docs/usefieldarray)'s `useFieldArray`, this example allows you add/edit/delete multiple children sections within ONE form (not nested form).

```tsx
import {
  IressButton,
  IressDivider,
  IressFieldGroup,
  IressFormField,
  IressInline,
  IressInput,
  IressPanel,
  IressText,
  IressIcon,
  IressCloseButton,
  IressHookForm,
} from '@iress-oss/ids-components';
import {
  useFieldArray,
  useForm,
  type Control,
  type UseFormGetValues,
} from 'react-hook-form';

interface Client {
  name: string | undefined;
  salary: number | undefined;
  goal: string | undefined;
}

interface Dependant {
  name: string | undefined;
  relationship: string | undefined;
  age: number | undefined;
}

interface FormValues {
  client: Client;
  dependants: Dependant[];
}

interface ClientProps {
  control: Control<FormValues> | undefined;
}

interface DependantProps {
  index: number;
  control: Control<FormValues> | undefined;
  update: (index: number, data: Dependant) => void;
  remove: (index: number) => void;
  getValues: UseFormGetValues<FormValues>;
}

const defaultValues = {
  client: {
    name: '',
    salary: undefined,
    goal: '',
  },
  dependants: [
    {
      name: '',
      relationship: '',
      age: undefined,
    },
  ],
};

const ClientSection: React.FC<ClientProps> = ({ control }) => {
  return (
    <IressFieldGroup label="Client" inline mb="none">
      <IressFormField
        name="client.name"
        label="Name"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
      <IressFormField
        name="client.salary"
        label="Salary"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
      <IressFormField
        name="client.goal"
        label="Goal"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
    </IressFieldGroup>
  );
};

const DependantSection: React.FC<DependantProps> = ({
  index,
  update,
  remove,
  control,
  getValues,
}: DependantProps) => {
  return (
    <IressPanel bg="alt" noBorder mb="spacing.4">
      <IressInline horizontalAlign="right">
        <IressCloseButton
          onClick={() => remove(index)}
          mb="-lg"
          style={{ zIndex: 1 }}
        />
      </IressInline>
      <IressFieldGroup label={`Dependant ${index + 1}`} inline mb="none">
        <IressFormField
          name={`dependants.${index}.name`}
          label="Name"
          control={control}
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
        <IressFormField
          name={`dependants.${index}.relationship`}
          label="Relationship"
          control={control}
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
        <IressFormField
          name={`dependants.${index}.age`}
          label="Age"
          control={control}
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
        <IressButton
          type="button"
          prepend={<IressIcon name="check" />}
          onClick={() => {
            const data = getValues();
            const value = data?.dependants[index];
            update(index, value);
          }}
        >
          Save
        </IressButton>
      </IressFieldGroup>
    </IressPanel>
  );
};

export const FormGroups = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const { control, getValues } = form;

  const { fields, append, update, remove } = useFieldArray({
    name: 'dependants',
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <IressText>
      <h1>Form groups</h1>
      <p>
        This is one form with child sections (not nested forms). Play around to
        add/edit/delete child form sections:
      </p>
      <IressHookForm<FormValues> id="mainForm" form={form} onSubmit={onSubmit}>
        <ClientSection control={control} />
        {fields.map((field, index) => (
          <DependantSection
            key={field.id}
            index={index}
            control={control}
            update={update}
            remove={remove}
            getValues={getValues}
          />
        ))}
        <IressButton
          type="button"
          prepend={<IressIcon name="plus" />}
          onClick={() => {
            append({ name: '', relationship: '', age: undefined });
          }}
          status="success"
        >
          Add Dependant
        </IressButton>
        <IressDivider my="md" />
        <IressButton type="submit" mode="primary">
          Submit All
        </IressButton>
      </IressHookForm>
    </IressText>
  );
};
```

#### Conditional fields (`useWatch`)

When you have fields that are conditionally shown, you can use the `useWatch` hook to watch the value of another field and conditionally render the field.

**Notes:**

- You can use the `api.watch` method on the `IressForm`'s ref to watch the value of a field, but it is recommended to use the hook for better performance by isolating re-rendering at the component level.

```tsx
import {
  IressCheckbox,
  IressCheckboxGroup,
  IressForm,
  IressFormField,
  IressInput,
  IressText,
} from '@iress-oss/ids-components';
import { useWatch } from 'react-hook-form';

interface FieldValues {
  show?: string[];
  name?: string;
  email?: string;
}

/**
 * Conditional fields need to be rendered in a sub-component, to allow it to use the `useWatch`
 * hook to watch the value of the field dictating the display of conditional fields.
 */
const FormSectionWithConditionalFields = () => {
  const show = useWatch<FieldValues>({ name: 'show' });

  return (
    <IressText>
      <h2>
        Conditional fields using <code>useWatch</code>
      </h2>
      <p>
        This example demonstrates how to use the <code>useWatch()</code> hook to
        watch the value of a field and conditionally render other fields based
        on that value.
      </p>
      <IressFormField
        name="show"
        label="Select fields to show"
        rules={{
          required: 'Please select at least one field to show',
        }}
        render={(controlledProps) => (
          <IressCheckboxGroup {...controlledProps} layout="inline">
            <IressCheckbox value="name">Name</IressCheckbox>
            <IressCheckbox value="email">Email</IressCheckbox>
          </IressCheckboxGroup>
        )}
      />
      {show?.includes('name') && (
        <IressFormField
          name="name"
          label="Name"
          rules={{
            required: 'Name is required',
          }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
      )}
      {show?.includes('email') && (
        <IressFormField
          name="email"
          label="Email"
          rules={{
            required: 'Email is required',
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              message: 'Please enter a valid email address',
            },
          }}
          render={(controlledProps) => (
            <IressInput {...controlledProps} type="email" />
          )}
        />
      )}
    </IressText>
  );
};

export function UseWatchForm() {
  return (
    <IressForm>
      <FormSectionWithConditionalFields />
    </IressForm>
  );
}
```

#### Validation depend on other fields

This example shows how to validate one field based on another field's value.

The budget amount input validates against the selected budget range using the custom `validateBudgetInput` rules.

```tsx
import {
  IressStack,
  IressRow,
  IressCol,
  IressFormField,
  IressInputCurrency,
  IressSelect,
  IressButton,
  IressText,
  IressDivider,
  IressHookForm,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  primaryField: string;
  dependentField: string;
}

const budgetOptions = [
  { value: 'less-than-499', label: 'Less than $499' },
  { value: 'between-500-999', label: 'Between $500 to $999' },
  { value: 'more-than-1000', label: 'More than $1000' },
];

const validateBudgetInput = (
  value: string,
  selectedBudget: string,
): string | true => {
  if (!selectedBudget) return 'Select budget range first';

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 'Enter a valid number';

  switch (selectedBudget) {
    case 'less-than-499':
      return numericValue < 499 || 'Must be less than $499';
    case 'between-500-999':
      return (
        (numericValue >= 500 && numericValue <= 999) ||
        'Must be between $500-$999'
      );
    case 'more-than-1000':
      return numericValue > 1000 || 'Must be more than $1000';
    default:
      return true;
  }
};

export const ValidationDependOnOtherFields = () => {
  const [submitted, setSubmitted] = useState<FormData | undefined>(undefined);

  const form = useForm<FormData>({
    defaultValues: {
      primaryField: '',
      dependentField: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmitted(data);
  };

  const onError = (errors: Record<string, unknown>) => {
    console.log('Form validation errors:', errors);
  };

  return (
    <>
      <IressText element="h1">Validation depend on other fields</IressText>
      <IressText element="p">
        This form demonstrates how to validate a field based on the value of
        another field. The budget amount field is validated against the selected
        budget range.
      </IressText>
      <IressHookForm form={form} onSubmit={onSubmit} onError={onError}>
        <IressStack gap="md">
          <IressRow>
            <IressCol>
              <IressFormField
                name="primaryField"
                label="Monthly investment budget"
                rules={{
                  required: 'Budget range is required',
                }}
                render={(field) => (
                  <IressSelect
                    {...field}
                    placeholder="Select your budget range"
                    options={budgetOptions}
                  />
                )}
              />
            </IressCol>
          </IressRow>
          <IressRow>
            <IressCol>
              <IressFormField
                name="dependentField"
                label="Enter your budget amount ($)"
                rules={{
                  required: 'Budget amount is required',
                  validate: (value: string, formValues: FormData) =>
                    validateBudgetInput(value, formValues.primaryField),
                }}
                render={(field) => (
                  <IressInputCurrency {...field} type="number" />
                )}
              />
            </IressCol>
          </IressRow>
          <IressButton type="submit">Submit</IressButton>
        </IressStack>
      </IressHookForm>
      <IressDivider />
      {submitted && (
        <IressStack gap="md">
          <IressText element="h3">Submitted Values</IressText>
          <IressText>
            Budget Range:{' '}
            {budgetOptions.find(
              (option) => option.value === submitted.primaryField,
            )?.label ?? submitted.primaryField}
          </IressText>
          <IressText>Budget Amount: ${submitted.dependentField}</IressText>
        </IressStack>
      )}
    </>
  );
};
```

#### Custom form field components

You can integrate custom components within `IressFormField` to create enhanced form experiences.

This demo showcases how to embed a custom `TranscriptTextBox` component into `IressFormField` while leveraging its built-in validation rules, error handling, and state management without additional implementation.

**Reminder:** When building custom form components, avoid managing error message state internally. This helps maintain the IressForm as the single source of truth and ensures consistent, predictable UI behavior.

Key features demonstrated:

- **Universal Integration Pattern**: Shows how any custom component can be embedded in IressFormField
- **Built-in Validation**: Leverages IressFormField's validation rules with custom validation logic
- **Multiple Error Messages**: Displays simultaneous validation errors (e.g., wrong file type AND too large)
- **Drag & Drop**: Files can be dragged and dropped directly onto the textarea
- **File Upload Button**: Traditional file selection via button click
- **Visual Feedback**: UI changes during drag operations with border and background updates
- **Form State Management**: Automatically integrates with form context using controlled props
- **File Management**: Display uploaded files with remove functionality using `IressPanel`

```tsx
import {
  IressButton,
  IressForm,
  IressInput,
  IressFormField,
  IressStack,
  IressIcon,
  IressText,
  IressPanel,
  IressInline,
  type IressInputProps,
} from '@iress-oss/ids-components';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface TranscriptFormValues {
  transcript: TranscriptData | string;
}

interface TranscriptData {
  content: string;
  size?: number;
  type: 'file' | 'text';
  extension?: string;
  fileName?: string;
  rejectedReasons?: REJECTION_REASONS[];
}

interface TranscriptTextBoxProps {
  value: TranscriptData | string;
  onChange: (data: TranscriptData) => void;
  placeholder?: string;
  rows?: number;
  style?: React.CSSProperties;
  allowedExtensions?: string[];
  maxSizeInMB?: number;
}

interface SubmittedValuesDisplayProps {
  submittedValues: TranscriptFormValues | null;
  title?: string;
}

enum REJECTION_REASONS {
  TYPE = 'type',
  SIZE = 'size',
}

const validateFile =
  (allowedExtensions: string[], maxSizeInMB: number) =>
  (data: TranscriptData | string) => {
    if (
      !!data &&
      typeof data === 'object' &&
      data.type === 'file' &&
      Array.isArray(data.rejectedReasons) &&
      data.rejectedReasons.length > 0
    ) {
      const errors: string[] = [];

      if (data.rejectedReasons.includes(REJECTION_REASONS.TYPE)) {
        errors.push(`Only .${allowedExtensions.join(', ')} accepted`);
      }

      if (data.rejectedReasons.includes(REJECTION_REASONS.SIZE)) {
        errors.push(`File size must be less than ${maxSizeInMB}MB`);
      }

      if (errors.length > 0) {
        return errors.join('. ');
      }
    }

    return true;
  };

const TranscriptTextBox = ({
  value,
  onChange,
  placeholder = 'Copy and paste transcripts OR drag and drop / upload recordings, transcripts or documents here (.txt format).',
  rows = 10,
  style,
  allowedExtensions = ['txt'],
  maxSizeInMB = 10,
}: TranscriptTextBoxProps) => {
  // Extract content and file info from value
  const currentData =
    typeof value === 'string'
      ? { content: value, type: 'text' as const }
      : value;
  const currentFile =
    currentData?.type === 'file' &&
    (!currentData.rejectedReasons || currentData.rejectedReasons.length === 0)
      ? {
          name: currentData.fileName ?? 'Unknown file',
          size: currentData.size,
        }
      : null;

  const createTranscriptData = (
    content: string,
    type: 'file' | 'text',
    additionalData?: Partial<TranscriptData>,
  ): TranscriptData => ({
    content,
    type,
    ...additionalData,
  });

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onChange(
        createTranscriptData(content, 'file', {
          size: file.size,
          extension: file.name.split('.').pop()?.toLowerCase(),
          fileName: file.name,
        }),
      );
    };
    reader.onerror = () => {
      // Let parent handle errors through validation
      onChange(
        createTranscriptData('', 'file', {
          fileName: file.name,
        }),
      );
    };
    reader.readAsText(file);
  };

  const handleTextChange: IressInputProps<string, number>['onChange'] = (
    _e,
    textContent = '',
  ) => {
    onChange(createTranscriptData(textContent, 'text'));
  };

  const onFileSelected = (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    handleFileRead(file);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    maxSize: maxSizeInMB * 1024 * 1024,
    accept: allowedExtensions.reduce(
      (acc, ext) => {
        const mimeType =
          ext === 'txt' ? 'text/plain' : 'application/octet-stream';
        acc[mimeType] = acc[mimeType] || [];
        acc[mimeType].push(`.${ext}`);
        return acc;
      },
      {} as Record<string, string[]>,
    ),
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles);
        return;
      }

      if (rejectedFiles.length > 0) {
        const rejectedFile = rejectedFiles[0];
        const { file, errors } = rejectedFile;

        // Map error codes to rejection reasons
        const errorCodeMap = {
          'file-invalid-type': REJECTION_REASONS.TYPE,
          'file-too-large': REJECTION_REASONS.SIZE,
        } as const;

        const rejectedReasons = errors
          .map((error) => errorCodeMap[error.code as keyof typeof errorCodeMap])
          .filter((reason): reason is REJECTION_REASONS => Boolean(reason));

        onChange(
          createTranscriptData('', 'file', {
            fileName: file.name,
            rejectedReasons,
          }),
        );
      }
    },
  });

  const handleUploadClick = () => {
    open();
  };

  const removeFile = () => {
    onChange(createTranscriptData('', 'text'));
  };

  return (
    <IressStack gap="sm">
      <div {...getRootProps()} style={{ position: 'relative' }}>
        <input {...getInputProps()} />
        <IressInput
          value={currentData?.content || ''}
          onChange={handleTextChange}
          rows={rows}
          placeholder={isDragActive ? 'Drop your file here...' : placeholder}
          style={{
            boxSizing: 'border-box',
            border: isDragActive ? '1px dashed #007acc' : undefined,
            backgroundColor: isDragActive ? '#f0f8ff' : undefined,
            ...style,
          }}
        />
      </div>

      {currentFile && (
        <IressPanel>
          <IressInline horizontalAlign="between" verticalAlign="middle">
            <IressText>📄 {currentFile.name}</IressText>
            <IressButton mode="secondary" onClick={removeFile}>
              Remove
            </IressButton>
          </IressInline>
        </IressPanel>
      )}

      <IressButton
        mode="secondary"
        onClick={handleUploadClick}
        prepend={<IressIcon name="upload" />}
        alignSelf="start"
      >
        Upload
      </IressButton>
    </IressStack>
  );
};

const SubmittedValuesDisplay: React.FC<SubmittedValuesDisplayProps> = ({
  submittedValues,
  title = 'Submitted Values:',
}) => {
  if (!submittedValues) {
    return null;
  }

  return (
    <IressPanel>
      <IressStack gap="sm">
        <IressText textStyle="typography.body.md.strong">{title}</IressText>
        <IressText>
          <strong>Type:</strong>
          {typeof submittedValues.transcript === 'string'
            ? 'text'
            : submittedValues.transcript.type}
        </IressText>
        <IressText>
          <strong>Content:</strong>
          {typeof submittedValues.transcript === 'string'
            ? submittedValues.transcript
            : submittedValues.transcript.content}
        </IressText>
        {typeof submittedValues.transcript === 'object' &&
          submittedValues.transcript.fileName && (
            <IressText>
              <strong>File Name:</strong> {submittedValues.transcript.fileName}
            </IressText>
          )}
        {typeof submittedValues.transcript === 'object' &&
          submittedValues.transcript.size && (
            <IressText>
              <strong>File Size:</strong>
              {(submittedValues.transcript.size / 1024).toFixed(2)} KB
            </IressText>
          )}
      </IressStack>
    </IressPanel>
  );
};

const Heading = () => {
  return (
    <>
      <IressText element="h1">Custom FormField Components</IressText>
      <IressText element="p">
        This demo showcases how to embed any custom component
        (TranscriptTextBox) into IressFormField while leveraging its form
        validation, error handling, and state management without additional
        implementation. When building custom form components, avoid managing
        error message state internally. This helps maintain the IressForm as the
        single source of truth and ensures consistent, predictable UI behavior.
      </IressText>
    </>
  );
};

export const CustomFormFieldComponents = () => {
  const [submittedValues, setSubmittedValues] =
    useState<TranscriptFormValues | null>(null);
  const allowedExtensions = ['txt'];
  const maxSizeInMB = 0.1;

  const handleSubmit = (data: TranscriptFormValues) => {
    setSubmittedValues(data);
    console.log('Form submitted:', data);
  };

  return (
    <>
      <Heading />
      <IressForm<TranscriptFormValues>
        mode="onChange"
        onSubmit={handleSubmit}
        defaultValues={{ transcript: { content: '', type: 'text' } }}
      >
        <IressFormField
          label="Transcript"
          name="transcript"
          hint="Upload or copy and paste transcript here"
          render={(controlledProps) => (
            <TranscriptTextBox
              {...controlledProps}
              allowedExtensions={allowedExtensions}
              maxSizeInMB={maxSizeInMB}
            />
          )}
          rules={{
            required: 'Transcript is required',
            validate: {
              file: validateFile(allowedExtensions, maxSizeInMB),
            },
          }}
        />
        <IressButton type="submit" mode="primary">
          Submit
        </IressButton>
        <SubmittedValuesDisplay submittedValues={submittedValues} />
      </IressForm>
    </>
  );
};
```

#### Sanitising input

When sending user input to a server or third-party API, it is important to
sanitise the data to prevent cross-site scripting (XSS) attacks. This example
uses [DOMPurify](https://github.com/cure53/DOMPurify) to recursively strip
malicious HTML from all string values in the form data before submission.

Install DOMPurify in your project:

```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

```tsx
import {
  IressAlert,
  IressButton,
  IressForm,
  IressFormField,
  IressInput,
} from '@iress-oss/ids-components';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';

const sanitiseDeep = (value: unknown): unknown => {
  if (typeof value === 'string') return DOMPurify.sanitize(value);
  if (Array.isArray(value)) return value.map(sanitiseDeep);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, sanitiseDeep(v)]),
    );
  }
  return value;
};

export const SanitisedInputForm = () => {
  const [sanitisedData, setSanitisedData] = useState<FieldValues | null>(null);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          const clean = sanitiseDeep(data) as FieldValues;
          setSanitisedData(clean);
          console.log('Sanitised form data:', clean);
        }}
      >
        <IressFormField
          label="Name"
          name="name"
          rules={{ required: 'Name is required' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Bio"
          name="bio"
          hint="Try entering HTML like <img src=x onerror=alert(1)> to see it sanitised"
          rules={{ required: 'Bio is required' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton mode="primary" type="submit">
          Submit
        </IressButton>
      </IressForm>
      {sanitisedData && (
        <IressAlert
          status="success"
          heading="Sanitised output"
          mt="lg"
          multiLine
        >
          <pre>{JSON.stringify(sanitisedData, null, 2)}</pre>
        </IressAlert>
      )}
    </>
  );
};
```

### Testing

Unfortunately due to the asynchronous nature of React Hook Form validation, `IressForm` still needs to be tested using `screen.findBy` queries (at least in the first query after render). If `findBy` is not used, you will start to see the dreaded `act warnings`. For more information on testing IressForm, please refer to the (React Hook Form testing documentation)[https://react-hook-form.com/advanced-usage#TestingForm]

Here is an example of testing a form submission.

```tsx
render(
  <IressForm>
    <IressFormField
      label="Email"
      name="email"
      rules={{ required: true }}
      render={(controlledProps) => (
        <IressInput {...controlledProps} type="email" />
      )}
    />
    <IressButton type="submit">Submit</IressButton>
  </IressForm>,
);

// May be needed sometimes to get over the act warning
await screen.findByRole('form');

const emailInput = screen.getByRole('textbox');
const submitButton = screen.getByRole('button', { name: 'Submit' });

await userEvent.click(submitButton);

// Errors are asynchronous, so we need to wait for them to appear
const summaryError = await screen.findByText(
  'There was a problem submitting this form',
);
expect(summaryError).toBeInTheDocument();
```

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs#testing)

### Caveats

#### Properly resetting fields

When resetting fields that accept non-string values (like `IressSelect`), you should reset them to `null` or `undefined` instead of an empty string. This is because the underlying component is strictly typed and expects a specific value type.

**Problem:**

```tsx
const { resetField } = useFormContext();

resetField('rich-select', {
  label: '',
  value: '',
});
```

In this case, it will look like it cleared the field, but actually it has not. This is obvious with a `placeholder` set, as it will not show the placeholder.

**Solution:**
Override the `onChange` handler to pass the actual value as a second parameter:

```tsx
const { resetField } = useFormContext();

resetField('rich-select', null); // or undefined
```

This will properly reset the field to null and clear the field value.

#### Storing Select values in form state

The correct value to store in form state depends on whether `IressSelect` options are static (array) or asynchronous (function).

##### Static options (array-based)

`IressFormField` will store the primitive value of the selected option in form state. This is because `IressSelect` can resolve a primitive value back to a display label when options are static.

```tsx
// ✅ Store primitive value for static selects
<IressFormField
  name="meetingType"
  label="Meeting Type"
  render={({ onChange, ...controlledProps }) => (
    <IressSelect
      {...controlledProps}
      options={[{ label: 'Annual Review', value: 'annual-review' }]}
    />
  )}
/>;
```

##### Async options (function-based)

Store the full `{ label, value }` option object because `IressSelect` needs `LabelValueMeta` to render the selected label when options are asynchronous (it cannot resolve a primitive value back to a label without re-fetching).

```tsx
// ✅ Store full option object for async selects
<IressFormField
  name="client"
  label="Client"
  render={({ onChange, ...controlledProps }) => (
    <IressSelect
      {...controlledProps}
      onChange={(_e, _val, option) => onChange(option)}
      options={searchClients}
    />
  )}
/>;
```

##### Troubleshooting

If you see the warning _"A primitive value was passed but cannot be resolved because options are asynchronous"_ from IDS, it means you are storing a primitive value for an async select. Switch to storing the full option object as shown above.

---

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs)

## Specifications

### Behaviour

- Initial form validation is done when the user first submits the form. This allows them to focus on entering data without being overwhelmed by validation errors.
- If there are validation errors on submission, they will be shown at the form level as a summary, as well as per field. Only the first failing error will be displayed per field.
- After the first submission, fields are validated on change, to provide users instant feedback as they are now at the validation phase.

**Note:** The default user experience regarding validation is different to previous versions of IDS. This change was done to align IDS with the typical user experience found in other applications. If you would like to change the behaviour to be more consistent with the original IDS, set the `mode` prop of the form to `onBlur`.

### Migration to version 5 and beyond

The previous form components contained a lot of logic to translate the HTML5 validation API to a format that matched the design system's guidelines. This allowed users to use the default props of input such as `pattern` and `required`, and be assured that the `IressField` would display errors accordingly.

Although this worked for simple forms, it did not work for forms which had complex business requirements. This was due to the logic inside the form components being hard to override. Additionally, it was seemingly impossible to implement the business requirements using the HTML5 validation API, which itself is very restricted.

In version 5 we have decided to provide two alternative methods of using form components to better accommodate our consumer's needs.

The validation logic has been stripped from all of the existing form components. They are now closer to their native implementation, with a few customisations to match the IDS guidelines. IressField has transformed into a layout component to allow you to lay out form fields consistent with IDS guidelines, using your own validation tools.

Automated validation is now solely contained in `IressForm` and `IressFormField`, using [React Hook Form](https://react-hook-form.com/docs/useform) under the hood to simplify maintenance.

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs)

## Recipes

### Native Validation

```tsx
import {
  IressInput,
  IressButton,
  IressField,
  IressAlert,
  type InputBaseElement,
} from '@iress-oss/ids-components';
import { useState } from 'react';

export const NativeValidationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({
    name: false,
    email: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasErrors = Object.values(errors).some((error) => !!error);

  const handleInputChange = (e: React.ChangeEvent<InputBaseElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({
      ...errors,
      [e.target.name]: !e.currentTarget.reportValidity(),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitted(true);

    if (!form.checkValidity()) {
      const fieldData = Object.fromEntries(new FormData(form).entries());
      const fieldNames = Object.keys(fieldData);

      setErrors(
        fieldNames.reduce(
          (newErrors, fieldName) => {
            newErrors[fieldName] = !form
              .querySelector<HTMLInputElement>(`[name=${fieldName}]`)
              ?.checkValidity();
            return newErrors;
          },
          {} as Record<string, boolean>,
        ),
      );
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {isSubmitted && hasErrors && (
        <IressAlert status="danger">
          There's a problem with your submission.
        </IressAlert>
      )}
      <IressField
        label="Name"
        error={errors.name && 'Name is required'}
        required
      >
        <IressInput name="name" onChange={handleInputChange} required />
      </IressField>
      <IressField
        label="Email address"
        error={errors.email && 'Email is required'}
        required
      >
        <IressInput name="email" onChange={handleInputChange} required />
      </IressField>
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
    </form>
  );
};
```

### Forms In Expanders

```tsx
import {
  IressExpander,
  IressForm,
  IressFormField,
  IressInput,
  IressStack,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const Form = () => (
  <IressForm>
    <IressFormField
      label="Name"
      name="name"
      render={(controlledProps) => <IressInput {...controlledProps} />}
      rules={{
        required: 'Name is required',
      }}
    />
    <IressFormField
      label="Email address"
      name="email"
      render={(controlledProps) => <IressInput {...controlledProps} />}
      rules={{
        minLength: {
          message: 'Use a longer email address',
          value: 6,
        },
        required: 'Email is required',
      }}
    />
  </IressForm>
);

export function FormExpanders() {
  const [expander, setExpander] = useState('');

  const isOpen = (name: string) => expander === name;

  return (
    <IressStack gap="sm">
      <IressExpander
        activator="Sender"
        open={isOpen('Sender')}
        onChange={(open) => open && setExpander('Sender')}
      >
        {isOpen('Sender') && <Form />}
      </IressExpander>
      <IressExpander
        activator="Recipient"
        open={isOpen('Recipient')}
        onChange={(open) => open && setExpander('Recipient')}
      >
        {isOpen('Recipient') && <Form />}
      </IressExpander>
    </IressStack>
  );
}
```

### Hidden Inputs

```tsx
import {
  IressButton,
  IressFormField,
  IressHookForm,
  IressInput,
} from '@iress-oss/ids-components';
import { useForm } from 'react-hook-form';

export const HiddenInputsForm = () => {
  const form = useForm();
  const { register } = form;

  // This is a hidden input field that the user cannot see or interact with.
  // This is the recommended way to handle hidden inputs in Iress forms.
  const hiddenInputStoredInVariable = 'hiddenValue';

  return (
    <IressHookForm
      form={form}
      onSubmit={(data) => {
        console.log('Form submitted with data:', {
          ...data,
          hiddenInputStoredInVariable,
        });
      }}
    >
      <IressFormField
        label="Visible Input"
        name="visibleInput"
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />

      {/* Hidden field - NOT RECOMMENDED */}
      <input
        type="hidden"
        {...register('hiddenField')} // Manually register the hidden field with react-hook-form
        value="hiddenValue"
      />

      <IressButton type="submit">Submit</IressButton>
    </IressHookForm>
  );
};
```


---

# Loading

> Displays a loading state to indicate content is being fetched or processed.

## Import

```tsx
import { IressLoading } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Loading)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=loading&title=[Loading]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=loading,enhancement&title=[Loading]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| estimatedFinishTime | `number` | `3000 10000` | Estimated time in milliseconds for the loading to finish. |
| loaded | `boolean` | — | If set to `true`, will start hiding the loading indicator. It is recommended to use this prop if you are using the `IressLoading.shouldRender` hook to achieve a smooth loading experience. If set to `true`, will hide the skeleton and display the chart. |
| messageList | `Record<number, ReactNode>` | — | A message list to display while loading. The key is the time when you want the message to change to this message. If using a message list, the `children` will not be displayed. A checklist to display while loading. The key is the time when you want the item to be checked. |
| pattern | `component` , `default` , `long` , `page` , `start-up`, `validate`  | — | Use `pattern="start-up"` for the following use cases: - Loading an application for the first time - Switching from a different application to a new application - Switching from a client's website to an Iress application - Switching themes Use `pattern="validate"` for the following use cases: - Submitting a form - Saving a record Use `pattern="page"` for the following use cases: - Detail page for a record - Form page - Article page Use `pattern="component"` for the following use cases: - Component that is expected to be slow to load, such as a chart, table or large graphic. - Component that can be refreshed/updated with new data. The long loading pattern will display a checklist of items that are being loaded.  Use `pattern="long"` for the following use cases: - Calling multiple slow APIs to load data - Loading results from AI - Processing a large amount of data as a queue (eg. bulk uploading or large media file uploads) Do not set the `pattern` prop when no other pattern can be applied. It will only show the loading message after a delay, and is intended for use when loading is not expected to take a long time. Example use cases: - Navigating between different routes - Calling an API within the page that does not require a loading state |
| progress | `number` | — | If provided, will use this to set the `value` of the progress bar. If not provided, will use the `estimatedFinishTime` to calculate the progress. |
| renderProgress | `((props: Pick<[IressProgressProps](../../dist/components/Progress/Progress.d.ts)<number>, "max" | "min" | "value" | "sectionTitle">) => ReactNode) | ((props: Pick<[IressProgressProps](../../dist/components/Progress/Progress.d.ts), "max" , ... 1 more ... , "sectionTitle">) => ReactNode)` | — | This is a render prop that allows you to override the default progress rendering. This is useful if you want to use a different progress component or if you want to add additional props to the progress bar. |
| screenReaderText | `ReactNode` | `'Loading...' 'Loading...' 'Loading...' 'Loading...'` | Only screen readers will see this message, it is changed to the `children` message after the delay. Only screen readers will see this message. Only screen readers will see this message, it is changed to the `message` after the delay. |
| startFrom | `number` | `0` | Set the start from timer, useful when stringing multiple loading patterns across different pages (eg. logging via a third-party authentication provider) |
| timeout | `{ loaded?: number , { loaded?: number; message?: number; progress?: number , { skeleton?: number , number , undefined, undefined; } , undefined; } , undefined; } , undefined; message?: number , undefined; update?: number ` | `2500 500 3000` | Set the timeouts for showing the progress bar and message. The time in milliseconds before the loading message is displayed. Delay in milliseconds before the skeleton is displayed. Set the timeouts for showing the skeleton and update messages. Delay in milliseconds before the message is displayed. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| loading | `boolean, string ` | — | When true, button is in loading state. If provided a string, will be used as the loading text for screen readers. |
| message | `ReactNode` | `'This is taking longer than expected...'` | Set the message to be displayed when the button is in the loading state. |
| position | `bottom`, `right` , `top`  | — | This sets where the loading message will be displayed. - `bottom` - The loading message will be displayed below the button. It will be absolute positioned. - `top` - The loading message will be displayed above the button. It will be absolute positioned. - `right` - The loading message will be displayed to the right of the button. It will be inline positioned. |
| renderButton | `((props: Pick<[IressButtonProps](../../dist/components/Button/Button.d.ts), "loading">) => ReactNode)` | — | This is a render prop that allows you to override the default button rendering. This is useful if you want to use a different button component or if you want to add additional props to the button. |
| critical | `ReactNode` | — | If provided, will switch the skeleton to this template. Use when you have critical content that can be displayed while loading to allow the user to see some content while the rest is loading. |
| error | `ReactNode` | — | An error to display if the loading fails. This will override the skeleton. An error to display if the loading fails. This will override the `messageList` and show an error message instead. |
| template | `ReactNode` | `'page' 'chart'` | Which template to use as the skeleton, or you can use a ReactNode to customise the skeleton completely. |
| update | `ReactNode` | — | Set the chart to be updated. If a `ReactNode` is provided, it will be displayed as the message. If set to `true`, will display the default message `Updating...`. |

📄 [Full type definition](../../dist/patterns/Loading/Loading.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

The loading pattern is used to indicate that content is being loaded or processed consistently across Iress products.

```tsx
import {
  IressButton,
  IressContainer,
  IressForm,
  IressFormField,
  IressInputCurrency,
  IressLoading,
  IressPanel,
  IressText,
} from '@iress-oss/ids-components';
import { useDeferredValue, useEffect, useState } from 'react';
import retirementGraph from './retirement-graph.png';

interface PageProps {
  setPage: (page: number) => void;
}

interface ChartProps {
  money: number | null;
}

const API = {
  initialise: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 3000);
    }),
  data: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
  chart: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
  chartUpdate: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
};

const Graph = () => (
  <img
    src={retirementGraph}
    alt=""
    style={{ maxWidth: '100%', height: 'auto' }}
  />
);

const Chart = () => {
  const [chart, setChart] = useState(false);
  const [money, setMoney] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const safeLoaded = IressLoading.shouldRender(loaded);
  const deferredMoney = useDeferredValue(money);

  useEffect(() => {
    const initialise = async () => {
      const newChart = await API.chart();
      setChart(newChart);
      setLoaded(() => true);
    };

    void initialise();
  }, []);

  useEffect(() => {
    if (deferredMoney === null) {
      return;
    }

    const update = async () => {
      setUpdating(() => true);
      const newChart = await API.chartUpdate();
      setChart(newChart);
      setUpdating(() => false);
    };

    void update();
  }, [deferredMoney]);

  return (
    <IressLoading pattern="component" loaded={!safeLoaded} update={updating}>
      {chart && <Graph />}
      <IressPanel mt="spacing.4">
        <IressForm<ChartProps>
          onSubmit={(projectionData) => setMoney(projectionData.money)}
          heading="Update projection"
        >
          <IressFormField
            name="money"
            label="My money"
            render={(controlledProps) => (
              <IressInputCurrency {...controlledProps} />
            )}
          />
          <IressButton type="submit">Update projection</IressButton>
        </IressForm>
      </IressPanel>
    </IressLoading>
  );
};

const StartPage = ({ setPage }: PageProps) => (
  <IressText>
    <h2>Maximise your retirement</h2>
    <p>
      Maximize your retirement in Australia by contributing to your super early
      and making voluntary top-ups to benefit from compounding. Take advantage
      of employer contributions, government co-contributions, and tax benefits.
      Diversify your investments and review your strategy regularly to stay on
      track. Consider additional income streams and seek professional advice for
      a secure future.
    </p>
    <hr />
    <IressButton onClick={() => setPage(2)}>Next</IressButton>
  </IressText>
);

const RetirementIncomeProjectionPage = () => {
  const [data, setData] = useState(false);
  const loaded = data !== false;
  const renderLoading = IressLoading.shouldRender(loaded);

  useEffect(() => {
    const initialise = async () => {
      const newData = await API.data();
      setData(newData);
    };

    void initialise();
  }, []);

  if (renderLoading) {
    return <IressLoading pattern="page" template="form" loaded={loaded} />;
  }

  return (
    <IressText>
      <h2>Retirement Income Projection</h2>
      <p>
        We've got enough information to provide you with a retirement income
        projection. This will help you understand how much you can expect to
        receive in retirement based on your current super balance, your
        contributions, and your investment strategy.
      </p>
      <Chart />
    </IressText>
  );
};

export const LoadingWizard = () => {
  const [page, setPage] = useState(0);
  const loaded = page > 0;
  const renderLoading = IressLoading.shouldRender(loaded);

  useEffect(() => {
    const initialise = async () => {
      await API.initialise();
      setPage(1);
    };

    void initialise();
  }, []);

  if (renderLoading) {
    return <IressLoading pattern="start-up" loaded={loaded} />;
  }

  return (
    <IressContainer style={{ maxWidth: '600px', paddingBlock: '3rem' }}>
      {page === 1 && <StartPage setPage={setPage} />}
      {page === 2 && <RetirementIncomeProjectionPage />}
    </IressContainer>
  );
};
```

## Design

### When to use

Choose the pattern based on the type of content loading:

| Pattern | Use case | Examples |
|---------|----------|----------|
| `component` | A specific component is loading | Table with many rows, chart loading data |
| `default` | Long loading times are not expected | Navigation transitions |
| `long` | Expected to take 10+ seconds | Multiple API calls, AI generation, bulk uploads |
| `page` | An entire page is loading | Detail pages, forms, dashboards |
| `start-up` | Application is loading | First launch, switching applications, theme changes |
| `validate` | Server-side validation in progress | Form submission, saving a record |

### When not to use

- **Instant operations** (< 500ms) — no indicator needed; the system should feel instant
- **Background tasks** that don't block the UI — don't show a loading indicator; let the user continue working
- **Individual skeleton elements** — use [Skeleton](../components/skeleton.md) directly for custom layouts

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use one loading pattern per user action | Mix multiple loading patterns for the same task |
| Match the loading pattern across app transitions | Show a different indicator on each page |
| Set `estimatedFinishTime` based on real metrics | Guess at loading times |
| Use `IressLoading.shouldRender` for smooth transitions | Unmount loading abruptly without fade-out |

### Content guidelines

- **Messages**: Keep short and informative (e.g. "Processing transcript", not "Please wait while we process your data")
- **Message lists** (long pattern): Use action verbs describing what the system is doing
- **Screen reader text**: Always provide via `screenReaderText` prop

### Related patterns

- [Skeleton](../components/skeleton.md) — building blocks for custom loading templates
- [Spinner](../components/spinner.md) — low-level spinner for custom uses
- [Progress](../components/progress.md) — standalone progress bar

## Develop

### Quick Start

```tsx
import { IressLoading } from '@iress-oss/ids-components';

<IressLoading pattern="page" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs#api-props)

### Behaviour timing

The default behaviour follows UX best practices:

- **0–500ms**: No indicator shown (assumes content loaded)
- **500ms–2s**: Loading indicator animates in (skeleton or progress bar)
- **2–5s**: Loading message animates in
- **5–10s**: Additional messages rotate to show progress
- **10s+**: Checklist of items being completed

### Usage

#### Page loading

```tsx
import {
  IressCard,
  IressCol,
  IressContainer,
  IressDivider,
  IressInline,
  IressLoading,
  IressRow,
  IressSkeleton,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';
import { type ReactNode, useEffect, useState } from 'react';

const API = {
  criticalContent: async () =>
    new Promise<ReactNode>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(
          <IressContainer>
            <IressStack gap="lg">
              <IressRow horizontalAlign="between" verticalAlign="middle">
                <IressText element="h1" mb="none">
                  Dashboard
                </IressText>
                <IressInline gap="lg">
                  <IressSkeleton
                    textStyle="typography.heading.4"
                    width="200px"
                  />
                  <IressSkeleton
                    textStyle="typography.heading.4"
                    width="200px"
                  />
                </IressInline>
              </IressRow>
              <IressDivider />
              <IressRow gutter="lg">
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="Financial update 2025"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="The ASX update"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="In the news"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
              </IressRow>
            </IressStack>
          </IressContainer>,
        );
      }, 3000);
    }),
};

export const LoadingDashboard = () => {
  const [critical, setCritical] = useState<ReactNode | undefined>();

  useEffect(() => {
    const initialise = async () => {
      setCritical(await API.criticalContent());
    };

    void initialise();
  }, []);

  return (
    <IressLoading pattern="page" critical={critical} template="dashboard" />
  );
};
```

#### Start-up

```tsx
<IressLoading
  pattern="start-up"
  messageList={{
    0: 'Switching applications...',
    4500: 'This is taking longer than expected...',
  }}
/>;
```

#### Long running tasks

```tsx
<IressLoading
  pattern="long"
  messageList={{
    3000: 'Processing transcript',
    5000: 'Noting key information',
    7000: 'Generating summary',
  }}
/>;
```

#### Validate (form submission)

```tsx
<IressInline gap="sm">
  <IressLoading pattern="validate" loading />
  <IressButton mode="quaternary">Cancel</IressButton>
</IressInline>;
```

### Suspense

Use `IressLoadingSuspense` with React 19's `use` hook for automatic loading state management:

```tsx
import { IressLoadingSuspense } from '@iress-oss/ids-components';
import { use, useRef } from 'react';

const HomePage = () => {
  const dataRef = useRef(API.fetchPage('home'));
  const data = use(dataRef.current);
  return <h2>{data.title}</h2>;
};

export const App = () => (
  <IressLoadingSuspense pattern="page">
    <HomePage />
  </IressLoadingSuspense>
);
```

### Testing

The loading component uses `aria-live` regions for accessibility. Query by the message text:

```tsx
const message = screen.getByText('Loading...');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs#testing)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Not loaded | Shows skeleton/progress after timeout (default 500ms) |
| Message timeout | Message appears after 2.5s (configurable) |
| Loaded | Fades out smoothly (use `IressLoading.shouldRender` hook) |
| Error (long pattern) | Displays error state, overriding progress |

### Accessibility

- Uses `aria-live` regions to announce loading state changes to screen readers
- `screenReaderText` prop provides immediate announcement
- Progress bar announces percentage loaded
- Message changes are announced via polite live region

### Edge cases

- **Fast loads (< 500ms)**: No indicator shown — prevents flash of loading content
- **Nested loading**: `IressLoadingSuspense` nests — only the outermost shows an indicator
- **Multiple patterns on one page**: Use `component` pattern for slower elements within an already-loaded page
- **Stale content during update**: `component` pattern fades content and shows "Updating..." message

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs)

---

# Overview

### Explore

| Pattern | Description |
|---------|-------------|
| [Form](../patterns/form.md) | End-to-end form building with validation, layout, and accessibility |
| [Loading](../patterns/loading.md) | Skeleton screens, spinners, and suspense boundaries |
| [Feedback](../patterns/feedback.md) | Choosing between Alert, Toaster, and Modal for user feedback |
| [Search & Selection](../patterns/search-selection.md) | Autocomplete, Select, and TagInput for search and multi-select |
| [Dropdown Menu](../patterns/dropdown-menu.md) | Context menus, action menus, and navigation menus |

### What are patterns?

Patterns are multi-component recipes that solve recurring UI problems. While
components are individual building blocks, patterns show how to assemble them
into cohesive experiences — forms, navigation, loading states, and feedback
flows.

## How patterns differ from components

| | Component | Pattern |
|---|-----------|---------|
| **Scope** | Single element (e.g. a button, an input) | Multiple components working together |
| **Focus** | Props, states, accessibility of one element | User flow, layout, decision logic |
| **Example** | `IressButton` | A delete confirmation using Button + Modal + Toaster |

## Available patterns

| Pattern | What it solves |
|---------|---------------|
| [Breadcrumbs](../patterns/breadcrumbs.md) | Show hierarchical location and provide upward navigation. |
| [Contextual Menu](../patterns/contextual-menu.md) | Surface row-level or card-level actions in a compact overflow menu. |
| [Dropdown Menu](../patterns/dropdown-menu.md) | Filter or select from a list of options via a trigger button. |
| [Feedback](../patterns/feedback.md) | Decide between Alert, Toast, and Modal for communicating status. |
| [Form](../patterns/form.md) | Collect, validate, and submit user input with consistent UX. |
| [Loading](../patterns/loading.md) | Indicate progress during data fetching or processing. |
| [Search & Selection](../patterns/search-selection.md) | Combine search with selectable results (autocomplete, multi-select). |
| [Shadow](../patterns/shadow.md) | Isolate CSS in microfrontend or embedded contexts. |
| [Side Nav](../patterns/side-nav.md) | Persistent hierarchical navigation for applications. |

## When to use a pattern vs building custom

Use an IDS pattern when:

- The UI task is covered by one of the patterns above.
- You want consistent behaviour with other Iress products.
- You need built-in accessibility (focus management, keyboard nav, ARIA).

Build custom when:

- The interaction is unique to your product and has no parallel in other Iress
  tools.
- You've confirmed with design that no existing pattern fits.

Even custom flows should compose IDS components internally — only the
orchestration is custom, not the building blocks.

## Next steps

- [Feedback](../patterns/feedback.md) — the decision guide for choosing Alert vs
  Toast vs Modal
- [Form](../patterns/form.md) — end-to-end form validation and layout
- [Loading](../patterns/loading.md) — timing, behaviour, and pattern selection

---

# SearchSelection

> Decision guide for choosing between Autocomplete, Select, DropdownMenu, InputPopover, and Popover.

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-search-selection--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/SearchSelection)

Choosing between InputPopover, Autocomplete, Select, DropdownMenu, and Popover depends on whether users need to navigate to results, pick a form value, or trigger actions.

**Choose the right search/selection component:**

| Scenario | Component |
|----------|-----------|
| User types to filter, selects a form value | `IressAutocomplete` |
| User picks from a predefined list (single or multi) | `IressSelect` |
| User picks an action from a filtered menu | `IressDropdownMenu` |
| Custom popover triggered by input (e.g. date picker) | `IressInputPopover` |
| Fully custom floating content | `IressPopover` |

**Key differences:**

- **Autocomplete**: Free-text allowed, async options, value is a string
- **Select**: Must pick from list, supports multi-select and grouped options
- **DropdownMenu**: Actions (not form values), filterable, supports sections
- **InputPopover**: Low-level building block for custom input-triggered popovers
- **Popover**: Generic floating panel, no built-in search/selection logic

## Design

### Decision guide

| Criteria                  | Autocomplete               | DropdownMenu              | InputPopover + Menu        | Popover                   | Select                     |
| ------------------------- | -------------------------- | ------------------------- | -------------------------- | ------------------------- | -------------------------- |
| User types to filter      | Yes                        | No                        | Yes                        | No                        | Optional (async options)   |
| Result is navigation      | No (sets form value)       | Sometimes                 | Yes (links)                | N/A                       | No (sets form value)       |
| Freetext value allowed    | Yes                        | N/A                       | N/A                        | N/A                       | No (must pick an option)   |
| Triggered by              | Input focus / typing       | Button click              | Input focus / typing       | Button click              | Input click                |
| Custom result rendering   | No (label + meta only)     | Limited                   | Full control               | Full control              | No (label + meta only)     |
| Common use cases          | City input, tag input      | Actions, filters          | Site search, command palette | Custom content, previews | Country, status, category  |

### When to use each component

#### Autocomplete (`IressAutocomplete`)

Use Autocomplete when users type freetext and receive suggestions to **set a form value**. The input is not restricted to the suggestion list.

- **Address / city input**: User types and gets matching suggestions
- **Tag input**: Suggesting existing tags while allowing new ones
- **Form fields with large datasets**: When the option list is too large for a static dropdown

```tsx
import { IressAutocomplete, IressField } from '@iress-oss/ids-components';

<IressField label="Search clients">
  <IressAutocomplete
    placeholder="Type a name…"
    options={(query) => fetchClients(query)}
    noResultsText="No clients found"
    clearable
  />
</IressField>;
```

**Autocomplete vs Select:** If the user can submit any text value (even one not in the list), use Autocomplete. If the value *must* be one of the options, use Select.

#### DropdownMenu (`IressDropdownMenu`)

Use DropdownMenu for a list of actions or filter options triggered by a button.

- **Row actions**: Edit, delete, duplicate on a table row
- **Context menus**: Right-click or overflow (...) menus
- **Toolbar actions**: Grouped actions behind a single button
- **Filter menus**: Selecting filter criteria from a predefined list

```tsx
import { IressDropdownMenu } from '@iress-oss/ids-components';

<IressDropdownMenu
  label="Actions"
  options={[
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Delete', value: 'delete' },
  ]}
  onChange={(selected) => {
    if (selected.value === 'edit') handleEdit();
    if (selected.value === 'duplicate') handleDuplicate();
    if (selected.value === 'delete') handleDelete();
  }}
/>;
```

#### InputPopover + Menu (search navigation)

Use InputPopover with a Menu when users type a query and **navigate to a result** rather than selecting a form value. This gives you full control over how results are rendered and supports real links with proper routing.

- **Site search**: Type to find pages, click to navigate
- **Command palette**: Type to find actions or pages
- **Entity lookup with navigation**: Search for a record and go to its detail page

```tsx
import { Link } from 'your-router';
import {
  IressInput,
  IressInputPopover,
  IressMenu,
  IressMenuItem,
} from '@iress-oss/ids-components';

<IressInputPopover
  activator={
    <IressInput
      type="search"
      placeholder="Search…"
      onChange={handleSearch}
      clearable
    />
  }
>
  <IressMenu>
    {results.map((result) => (
      <IressMenuItem key={result.url} element={Link} to={result.url}>
        {result.title}
      </IressMenuItem>
    ))}
  </IressMenu>
</IressInputPopover>;
```

**Why not Autocomplete?** Autocomplete is designed for form values — it sets a value on selection. For search-and-navigate, you want real links (`<a>` or router `Link` elements) so that users can right-click → open in new tab, and screen readers announce results as links rather than listbox options.

#### Popover (`IressPopover`)

Use Popover for custom content triggered by a button that doesn't fit into the other categories. Popover gives you full control over what's rendered inside.

- **Rich previews**: Showing additional details or a summary on click
- **Custom forms**: A small inline form that doesn't warrant a modal
- **Composite content**: Anything that needs more than a simple list of options

```tsx
import {
  IressPopover,
  IressButton,
  IressStack,
  IressCheckbox,
} from '@iress-oss/ids-components';

<IressPopover
  activator={
    <IressButton icon="filter_list" mode="tertiary">
      Filters
    </IressButton>
  }
>
  <IressStack gap="sm">
    <IressCheckbox value="active">Active</IressCheckbox>
    <IressCheckbox value="archived">Archived</IressCheckbox>
  </IressStack>
</IressPopover>;
```

#### Select (`IressSelect`)

Use Select when users must choose from a predefined set of valid options.

- **Form fields**: Country, status, category, role
- **Filters**: Where the filter values are a known set
- **Configuration**: Choosing from predefined settings

When the list is long, use an async `options` function to enable built-in search:

```tsx
import { IressSelect, IressField } from '@iress-oss/ids-components';

<IressField label="Country">
  <IressSelect
    options={(query) => fetchCountries(query)}
    placeholder="Select a country"
  />
</IressField>;
```

### Quick reference

- **User types to set a form value with suggestions?** → Autocomplete
- **Button opens a list of actions or filters?** → DropdownMenu
- **User types to search and navigate to a page?** → InputPopover + Menu + MenuItem
- **Button opens custom content that doesn't fit the above?** → Popover
- **User must pick from a known list?** → Select (use async `options` function if large)

---

# Shadow

> Applies an elevated shadow effect to visually separate content layers.

## Import

```tsx
import { IressShadow } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-shadow--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Shadow)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=shadow&title=[Shadow]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=shadow,enhancement&title=[Shadow]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Children to be rendered inside the shadow DOM |
| fontFaceUrls | `string[]` | `[...defaultFonts]` | Optional array of font URLs to be included in the parent document head. By default it will include the default fonts from `@iress-oss/ids-tokens` (e.g., ['https://fonts.googleapis.com/css?family=Roboto'] |
| stylesheetContents | `Record<string, string>` | `{}` | Optional array of stylesheet contents to be included in the shadow DOM (e.g. { styleId: '.my-class { color: red; }' }) |
| stylesheetUrls | `string[]` | `[]` | Optional array of stylesheet URLs to be included in the shadow DOM (e.g., ['https://example.com/style.css']) |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| position | `bottom-center` , `bottom-end` , `bottom-start` , `top-center`, `top-end` , `top-start`  | `top-end` | The position on the screen where the toast will appear. |
| noIconProvider | `boolean` | `false` | Disable the built-in IconProvider. When true, no IconProvider is rendered, allowing you to provide your own icon loading mechanism (e.g. hiding the app until the Material Symbols font is fully loaded). |
| noSubsetting | `boolean` | `false` | Disable automatic font subsetting via Google Fonts CDN When false, only icons actually used in the component tree are loaded When true, the full Material Symbols font is loaded Ignored when `noIconProvider` is true. |
| popoverContainer | `container` , [FloatingUIContainer](../../dist/types.d.ts) | — | Container to render popovers into. By default, popovers render where their parent is rendered (no portal).  Set to `"container"` to reuse the same container as the `container` prop (useful when you want modals, slideouts, toasts **and** popovers in the same DOM node).  Individual popovers can still override this by setting their own `container` prop. |
| zIndexOffset | `number` | — | A value added to every IDS z-index layer via `calc()`. Use this when your application has a navigation element with a high z-index and IDS overlays (modal, slideout, toast) appear behind it. @example // Navbar sits at z-index 995 — shift IDS layers above it: <IressProvider zIndexOffset={1000}>...</IressProvider> // Modal → 1400, Toast → 1500, Tooltip → 1600 |
| toasterOffset | `string` | — | Offsets the toaster from the viewport edge (block axis). Useful when a fixed navbar would overlap the toaster. Accepts any valid CSS length value (e.g. `'60px'`, `'4rem'`). @example <IressProvider toasterOffset="60px">...</IressProvider> |

📄 [Full type definition](../../dist/patterns/Shadow/Shadow.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

The shadow pattern allows you to wrap your content in the shadow DOM, allowing you to isolate your styles from the rest of the application. This is useful when you want to create a component that has its own styles, without affecting the rest of the application (such as microfrontends).

```tsx
<IressShadow>
  <IressPanel>
    Content inside shadow DOM <IressIcon name="heart_smile" />
  </IressPanel>
</IressShadow>;
```

## Design

### When to use

- **Microfrontends**: Isolate styles between independently deployed applications
- **Third-party embedding**: Prevent host page styles from leaking into your components
- **Style encapsulation**: When CSS modules or naming conventions aren't sufficient isolation

### When not to use

- **Standard applications**: If you control the full page, use `IressProvider` directly
- **Web Components**: `IressShadow` does not create custom elements — it simply creates a shadow root on a `div` element

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use for style isolation in microfrontends | Use when you control the full page styles |
| Ensure font faces are loaded in the document head | Assume shadow DOM will isolate JavaScript state |
| Match provider configuration with the host app | Apply multiple nested `IressShadow` wrappers on the same element |

### Related patterns

- [Panel](../components/panel.md) — for content grouping with visual boundaries
- [Card](../components/card.md) — for self-contained content blocks
- [Popover](../components/popover.md) — for overlay content requiring style isolation

## Develop

### Quick Start

```tsx
import { IressShadow } from '@iress-oss/ids-components';

<IressShadow>{/* Your content here */}</IressShadow>;
```

### Usage

This is a simple component that is an alternative to the `IressProvider`. To use it, simply wrap your content in the `IressShadow` component.

It has similar props to the `IressProvider`, however it will apply the styles to the correct area depending on where its needed.

> **Note:** `IressShadow` includes `IressProvider` internally, which in turn includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, and `IressIconProvider`. You do not need to add any of these providers separately when using `IressShadow`.

- Font faces are injected into the document head, as they cannot be injected into the shadow DOM
- The IDS styles are injected into the shadow DOM
- The icon stylesheet is injected into both the document head and the shadow DOM, as the icon stylesheet includes both font face and icon styles

**Note:** The `IressShadow` component does not create a custom element, it simply creates a shadow root on a `div` element. All children inside `IressShadow` are standard React components — **not** custom elements or Web Components. The `slot` HTML attribute is not used; content positioning uses React props (`prepend`, `append`, `footer`, etc.).

<Details>
<summary>⚠️ Common AI mistake: "Shadow" means Web Components — **WRONG**</summary>

Agents see "Shadow" in `IressShadow` and incorrectly assume the application uses Web Components or custom elements with `slot` attributes. This is wrong — `IressShadow` is purely for CSS isolation in microfrontend scenarios. IDS has not offered Web Components since v4.

</Details>

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-shadow--docs)

---

# SideNav

> Provides a vertical navigation menu typically used in application sidebars.

## Import

```tsx
import { IressSideNav } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-side-nav--docs)
- [Figma](https://www.figma.com/design/youFqYT4CgpKxfLJQv80hf/WIP-Iress-Design-System-V6?node-id=6201-24)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/SideNav)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=side-nav&title=[Side Nav]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=side-nav,enhancement&title=[Side Nav]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeItemKey | `string` | — | Key of the active rail item. Sets the initial selection and can be updated externally. Rail clicks update the internal active item automatically. Key of the active rail item. Optional when sideMenuItems is provided — used only for rail highlighting. |
| sideMenuItems | `[IressSideNavPanelItem](../../dist/patterns/SideNav/SideNav.d.ts)[]` | — | Override: content to display in the side panel instead of `items[activeItemKey].children`. Can be flat items, groups, or a mix. |
| **items** | `[IressSideNavItem](../../dist/patterns/SideNav/SideNav.d.ts)[]` | — | Array of navigation items defining the rail icons. |
| onActiveItemKeyChange | `((key: string) => void)` | — | Callback fired when the active item changes via a rail click. |
| sideMenuLabel | `ReactNode` | — | Override: label displayed at the top of the side panel. When provided alongside sideMenuItems, this replaces the active item's label. |
| expanded | `boolean` | — | Whether the side panel is expanded (controlled). |
| defaultExpanded | `boolean` | `false` | Default expanded state (uncontrolled). |
| onExpandedChange | `((expanded: boolean) => void)` | — | Callback when the expanded state changes. |
| numbered | `boolean` | `false` | Whether to show numbered headers in the expanded side menu. |
| header | `ReactNode` | — | Content rendered at the top of the expanded side panel. |
| footer | `ReactNode` | — | Content rendered at the bottom of the expanded side panel. |
| aria-label | `string` | `Side navigation` | Accessible label for the navigation landmark. |
| expandLabel | `string` | `Expand navigation` | Label text for the expand button (accessibility). |
| collapseLabel | `string` | `Collapse navigation` | Label text for the collapse button (accessibility). |
| width | `number, string ` | `'250px'` | Width of the side panel when expanded. Can be a CSS length value or number (pixels). |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/patterns/SideNav/SideNav.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A side navigation pattern that combines a rail (icon-only bar) with an expandable side menu panel. Provides a data-driven API where items are passed as an array, with the rail acting as the main navigation and the side menu showcasing children under each navigation group.

```tsx
import { IressSideNav } from '@iress-oss/ids-components';

export function SideNavDefault() {
  return (
    <IressSideNav
      activeItemKey="hubs"
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'basic',
              label: 'Basic Details',
              href: '/hubs/basic-details',
            },
            {
              key: 'dependants',
              label: 'Dependants',
              href: '/hubs/dependants',
            },
            {
              key: 'employment',
              label: 'Employment',
              href: '/hubs/employment',
            },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          divider: true,
          children: [
            {
              key: 'holdings',
              label: 'Holdings',
              href: '/portfolios/holdings',
            },
            {
              key: 'transactions',
              label: 'Transactions',
              href: '/portfolios/transactions',
            },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
        },
      ]}
    />
  );
}
```

## Design

### When to use

- **Application shell navigation**: Provide persistent top-level navigation alongside content areas
- **Multi-section apps**: When the application has several major sections, each with its own sub-navigation
- **Progressive disclosure**: Show high-level categories on the rail and reveal detail in the expandable panel
- **Compact layouts**: Maximise content space by defaulting to a collapsed icon rail

### When not to use

- **Simple sites with few pages**: Use a standard horizontal nav or sidebar link list instead
- **Deeply nested hierarchies**: SideNav supports one level of children; for deeper nesting consider tree views
- **Temporary or contextual actions**: Use `IressContextualMenu` or `IressDropdownMenu` for action menus
- **Mobile-first layouts**: The rail + panel pattern is designed for desktop viewports; on mobile consider a hamburger menu or bottom navigation

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Limit to 7 top-level navigation items | Exceed 7 top-level items — it overwhelms users |
| Use icons consistently across all rail items | Mix items with and without icons in the rail |
| Highlight the active section clearly | Use SideNav for temporary or contextual actions |

### Content guidelines

- Keep labels short — 1–2 words per navigation item
- Use sentence case for all labels
- Ensure labels clearly describe the destination section

### Related patterns

- [Menu](../components/menu.md) — for simpler navigation lists
- [TabSet](../components/tab-set.md) — for switching between views within a page
- [Breadcrumbs](../patterns/breadcrumbs.md) — for showing hierarchical location

## Develop

### Quick Start

```tsx
import { IressSideNav } from '@iress-oss/ids-components';

<IressSideNav
  activeItemKey="hubs"
  items={[
    {
      key: 'hubs',
      label: 'Hubs',
      icon: 'hub',
      href: '/hubs',
      children: [
        {
          key: 'basic',
          label: 'Basic Details',
          href: '/hubs/basic-details',
        },
      ],
    },
  ]}
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-side-nav--docs#api-props)

### Usage

The `IressSideNav` component accepts an `items` array that defines the rail navigation items. Each item can optionally include `children` sub-items that are shown in the expandable side panel when that item is active.

The `activeItemKey` prop controls which rail item is currently selected — typically derived from the current route in your application.

```tsx
import { IressSideNav } from '@iress-oss/ids-components';

export function SideNavDefault() {
  return (
    <IressSideNav
      activeItemKey="hubs"
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'basic',
              label: 'Basic Details',
              href: '/hubs/basic-details',
            },
            {
              key: 'dependants',
              label: 'Dependants',
              href: '/hubs/dependants',
            },
            {
              key: 'employment',
              label: 'Employment',
              href: '/hubs/employment',
            },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          divider: true,
          children: [
            {
              key: 'holdings',
              label: 'Holdings',
              href: '/portfolios/holdings',
            },
            {
              key: 'transactions',
              label: 'Transactions',
              href: '/portfolios/transactions',
            },
          ],
          onClick: (e) => e.preventDefault(), // Required to make item selectable in this story
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
        },
      ]}
    />
  );
}
```

#### Header and footer

The `header` and `footer` props accept any `ReactNode`, allowing you to place a search bar, branding, version info, or other content in the expanded panel.

```tsx
import { IressInput, IressSideNav, IressText } from '@iress-oss/ids-components';

export function SideNavWithHeaderFooter() {
  return (
    <IressSideNav
      activeItemKey="portfolios"
      defaultExpanded
      header={
        <IressInput
          type="search"
          placeholder="Search navigation..."
          variant="search"
        />
      }
      footer={<IressText element="small">v2.4.1</IressText>}
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'basic',
              label: 'Basic Details',
              href: '/hubs/basic-details',
            },
            {
              key: 'dependants',
              label: 'Dependants',
              href: '/hubs/dependants',
            },
          ],
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          children: [
            {
              key: 'holdings',
              label: 'Holdings',
              href: '/portfolios/holdings',
            },
            {
              key: 'transactions',
              label: 'Transactions',
              href: '/portfolios/transactions',
            },
          ],
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
        },
      ]}
    />
  );
}
```

#### Grouped children

If your navigation has logical groupings, you can use the `children` property on child items to visually separate them in the side panel.

```tsx
import { IressSideNav } from '@iress-oss/ids-components';

export function SideNavGrouped() {
  return (
    <IressSideNav
      activeItemKey="hubs"
      defaultExpanded
      numbered
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          href: '/hubs',
          children: [
            {
              key: 'personal',
              label: 'Personal',
              active: true,
              children: [
                {
                  key: 'basic',
                  label: 'Basic Details',
                  href: '/hubs/basic-details',
                },
                {
                  key: 'dependants',
                  label: 'Dependants',
                  href: '/hubs/dependants',
                },
              ],
            },
            {
              key: 'financial',
              label: 'Financial',
              children: [
                {
                  key: 'employment',
                  label: 'Employment',
                  href: '/hubs/employment',
                },
                { key: 'tax', label: 'Tax Details', href: '/hubs/tax' },
              ],
            },
          ],
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          href: '/portfolios',
          children: [
            {
              key: 'holdings',
              label: 'Holdings',
              href: '/portfolios/holdings',
            },
            {
              key: 'transactions',
              label: 'Transactions',
              href: '/portfolios/transactions',
            },
          ],
        },
      ]}
    />
  );
}
```

#### Controlled state

Manage `expanded` and `activeItemKey` externally for full control over the navigation state.

```tsx
import { useState } from 'react';
import {
  IressCol,
  IressContainer,
  IressRow,
  IressSideNav,
  IressText,
  type SideNavItem,
} from '@iress-oss/ids-components';

const items: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    children: [
      { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
      { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
      { key: 'individual', label: 'Individual', href: '/hubs/individual' },
    ],
  },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    divider: true,
    children: [
      {
        key: 'returns',
        label: 'Investment Returns',
        href: '/portfolios/returns',
      },
      { key: 'strategy', label: 'Strategy', href: '/portfolios/strategy' },
      { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
    ],
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
  },
];

export const SideNavControlled = () => {
  const [activeKey, setActiveKey] = useState('hubs');
  const [expanded, setExpanded] = useState(true);

  return (
    <IressContainer fluid stretch px="spacing.2">
      <IressRow stretch gutter="spacing.4">
        <IressSideNav
          items={items}
          activeItemKey={activeKey}
          onActiveItemKeyChange={setActiveKey}
          expanded={expanded}
          onExpandedChange={setExpanded}
        />
        <IressCol p="spacing.4">
          <IressText>
            <h2>Active section: {activeKey}</h2>
            <p>
              Expanded: <strong>{expanded ? 'Yes' : 'No'}</strong>
            </p>
          </IressText>
        </IressCol>
      </IressRow>
    </IressContainer>
  );
};
```

#### Dynamic side menu

Use the `sideMenuItems` prop to override the side panel content with dynamically fetched or context-dependent sub-items.

```tsx
import { useState } from 'react';
import { IressSideNav, type SideNavPanelItem } from '@iress-oss/ids-components';

const menusBySection: Record<string, SideNavPanelItem[]> = {
  hubs: [
    {
      key: 'client-details',
      label: 'Client Details',
      active: true,
      children: [
        { key: 'basic', label: 'Basic Details', href: '/hubs/basic-details' },
        { key: 'dependants', label: 'Dependants', href: '/hubs/dependants' },
        { key: 'individual', label: 'Individual', href: '/hubs/individual' },
      ],
    },
    {
      key: 'financial',
      label: 'Financial Information',
      children: [
        { key: 'employment', label: 'Employment', href: '/hubs/employment' },
        { key: 'tax', label: 'Tax Details', href: '/hubs/tax' },
      ],
    },
  ],
  portfolios: [
    {
      key: 'investments',
      label: 'Investments',
      active: true,
      children: [
        { key: 'holdings', label: 'Holdings', href: '/portfolios/holdings' },
        { key: 'returns', label: 'Returns', href: '/portfolios/returns' },
      ],
    },
    {
      key: 'trading',
      label: 'Trading',
      children: [
        { key: 'orders', label: 'Orders', href: '/portfolios/orders' },
        { key: 'history', label: 'History', href: '/portfolios/history' },
      ],
    },
  ],
};

const labels: Record<string, string> = {
  hubs: 'Client Hub',
  portfolios: 'Portfolio Manager',
};

export function SideNavDynamicMenu() {
  const [activeKey, setActiveKey] = useState('hubs');

  return (
    <IressSideNav
      activeItemKey={activeKey}
      expanded
      numbered
      width="300px"
      sideMenuLabel={labels[activeKey] ?? 'Navigation'}
      sideMenuItems={menusBySection[activeKey]}
      items={[
        {
          key: 'hubs',
          label: 'Hubs',
          icon: 'hub',
          onClick: () => {
            setActiveKey('hubs');
          },
        },
        {
          key: 'portfolios',
          label: 'Portfolios',
          icon: 'bar_chart',
          divider: true,
          onClick: () => {
            setActiveKey('portfolios');
          },
        },
        {
          key: 'admin',
          label: 'Admin',
          icon: 'admin_panel_settings',
          href: '/admin',
          onClick: () => {
            setActiveKey('admin');
          },
        },
      ]}
    />
  );
}
```

#### Custom routing

Use the `element` prop on each item for integration with third-party routing libraries like React Router or Next.js.

```tsx
import { IressSideNav, type SideNavItem } from '@iress-oss/ids-components';
import { type HTMLAttributes, forwardRef } from 'react';

/**
 * This could be the `Link` component from `react-router-dom`, Next.js, or any other routing library.
 * It receives `href` and renders as an anchor internally.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & { href: string }
>(({ children, className, href, ...restProps }, ref) => (
  <a className={className} href={href} ref={ref} {...restProps}>
    {children}
  </a>
));

const items: SideNavItem[] = [
  {
    key: 'hubs',
    icon: 'hub',
    label: 'Hubs',
    href: '/hubs',
    element: Link,
    children: [
      {
        key: 'basic',
        label: 'Basic Details',
        href: '/hubs/basic-details',
        element: Link,
      },
      {
        key: 'dependants',
        label: 'Dependants',
        href: '/hubs/dependants',
        element: Link,
      },
      {
        key: 'individual',
        label: 'Individual',
        href: '/hubs/individual',
        element: Link,
      },
    ],
  },
  {
    key: 'portfolios',
    icon: 'bar_chart',
    label: 'Portfolios',
    href: '/portfolios',
    element: Link,
    divider: true,
    children: [
      {
        key: 'returns',
        label: 'Investment Returns',
        href: '/portfolios/returns',
        element: Link,
      },
      {
        key: 'strategy',
        label: 'Strategy',
        href: '/portfolios/strategy',
        element: Link,
      },
    ],
  },
  {
    key: 'admin',
    icon: 'admin_panel_settings',
    label: 'Admin',
    href: '/admin',
    element: Link,
  },
];

export const SideNavRouting = () => (
  <IressSideNav items={items} activeItemKey="hubs" defaultExpanded />
);
```

##### Integration with routing

SideNav is designed to work with any routing library:

```tsx
// Next.js
import Link from 'next/link';

const items = [
  { key: 'home', icon: 'home', label: 'Home', href: '/', element: Link },
];

// React Router
import { Link } from 'react-router-dom';

const items = [
  { key: 'home', icon: 'home', label: 'Home', href: '/', element: Link },
];
```

Derive `activeItemKey` from the current route:

```tsx
// Next.js
const activeSection = usePathname().split('/')[1];

// React Router
const activeSection = useLocation().pathname.split('/')[1];
```

## Specifications

### Accessibility

- The root element is a `<nav>` landmark with a configurable `aria-label` (default: "Side navigation")
- The expand/collapse toggle button includes `aria-expanded` to communicate state
- Rail items use tooltips with the item label for screen reader accessibility
- The side panel is marked `aria-hidden` when collapsed
- Keyboard navigation is supported through the underlying `IressMenu` component
- Custom `expandLabel` and `collapseLabel` props allow localisation of toggle button labels

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus between rail items and side panel items |
| `Enter` / `Space` | Activates the focused rail item or expands/collapses the panel |
| `ArrowDown` | Moves focus to the next item in the rail or side panel |
| `ArrowUp` | Moves focus to the previous item in the rail or side panel |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-side-nav--docs)
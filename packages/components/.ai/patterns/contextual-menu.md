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
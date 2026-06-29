# ContextualMenu

> Displays a context-sensitive menu of actions triggered by user interaction.

## Import

```tsx
import { IressContextualMenu } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-contextual-menu--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/ContextualMenu)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=contextual-menu&title=[Contextual Menu]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=contextual-menu,enhancement&title=[Contextual Menu]+Feature:+)

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
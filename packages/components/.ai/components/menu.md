# Menu

> Displays a list of navigational or actionable items.

## Import

```tsx
import { IressMenu } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Menu)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=menu&title=[Menu]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=menu,enhancement&title=[Menu]+Feature:+)

A menu can display grouped action buttons, navigation items or headings.

<StoryEmbed id="components-menu--basic"/>

## Design

### When to use

Most menu use cases are already covered by higher-level patterns. Use `IressMenu` directly only when these don't fit:

| Need | Use instead |
|------|-------------|
| Action menu on a button click | [ContextualMenu](../patterns/contextual-menu.md) |
| Filterable option list in a dropdown | [DropdownMenu](../patterns/dropdown-menu.md) |
| Select from a list of options | [Select](../components/select.md) |
| Sidebar navigation with sections | [SideNav](../patterns/side-nav.md) |
| Overflow items in breadcrumbs | [Breadcrumbs](../patterns/breadcrumbs.md) |

Use raw `IressMenu` for:

- **Standalone visible menus** — navigation or action lists that are always visible (not in a popover)
- **Custom list interactions** — when you need `listbox` role with custom rendering
- **Inside a Popover** — when building your own popover + menu composition

### When not to use

- **Primary navigation** — use a dedicated navigation component or layout
- **Simple link lists** — use plain links if there's no grouping or interactivity needed
- **Form selects** — use a Select component for form submissions

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Set the correct `role` for the menu's purpose | Mix navigation links and action buttons in the same menu |
| Wrap navigation menus in a `<nav>` element | Use `slot` attributes on children (legacy v4 pattern) |
| Use `IressMenuDivider` to separate logical groups | Stack too many items without headings or dividers |
| Use `prepend` and `append` props for icons | Place complex interactive content inside menu items |

### Content guidelines

- **Labels**: Use sentence case, keep action-oriented (e.g. "Edit profile", "Delete")
- **Headings**: Use `IressMenuHeading` to label groups of related items
- **Dividers**: Separate logical sections visually

### Related patterns

- [ContextualMenu](../patterns/contextual-menu.md) — action menu triggered by a button
- [DropdownMenu](../patterns/dropdown-menu.md) — filterable dropdown with search
- [Select](../components/select.md) — select from a list of options
- [SideNav](../patterns/side-nav.md) — sidebar navigation with sections
- [Breadcrumbs](../patterns/breadcrumbs.md) — overflow navigation menu
- [Popover](../components/popover.md) — commonly wraps menus for contextual display

## Develop

### Quick Start

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';

<IressMenu>
  <IressMenuItem>Action one</IressMenuItem>
  <IressMenuItem>Action two</IressMenuItem>
</IressMenu>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs#api-props)

### Usage

#### Basic

`IressMenuDivider`, `IressMenuHeading`, `IressMenuItem` and `IressMenuText` are supplied as children of the menu.

<StoryEmbed id="components-menu--basic"/>

#### Complex

`IressMenuItem`, `IressMenuHeading` and `IressMenuText` support `prepend`, `divider` and `append` props.

<StoryEmbed id="components-menu--complex"/>

#### Secondary navigation

When `href` is set on `IressMenuItem`, it renders as a link. Wrap in a `<nav>` and set `role` to `list`.

<StoryEmbed id="components-menu--secondary-navigation"/>

#### Headings

Use `IressMenuHeading` with the `element` or `textStyle` prop for heading levels.

<StoryEmbed id="components-menu--headings"/>

#### Dividers

Use `IressMenuDivider` or the `divider` prop on items for visual separation.

<StoryEmbed id="components-menu--dividers"/>

#### Fluid menus

Set `fluid` to stretch the menu to its container width.

<StoryEmbed id="components-menu--fluid"/>

#### Layout

The `layout` prop supports `stack` (default), `inline`, and `inline-equal-width`.

<StoryEmbed id="components-menu--layout"/>

#### Text wrapping

Use `noWrap` to prevent menu item text from wrapping.

<StoryEmbed id="components-menu--no-wrap"/>

#### Prepend & Append

Use `prepend` and `append` props to position content before or after item text.

<StoryEmbed id="components-menu--slot-props"/>

#### Roles

The `role` prop changes both the ARIA role and interaction model:

- `list` (default): navigated with `Tab`
- `menu`: navigated with arrow keys
- `listbox`: selectable items, navigated with arrow keys

<StoryEmbed id="components-menu--roles"/>

#### Variants

- Default — for popovers, side menus, and navigation
- `subdraw` — adds arrow icons for sub-menu navigation
- `radio` — radio mark style (single select listbox only)

<StoryEmbed id="components-menu--variants"/>

### Menu Group

`IressMenuGroup` groups related items under a common label.

<StoryEmbed id="components-menu-menugroup--multiple-groups"/>

### Menu Item

`IressMenuItem` is the individual item within a menu. It can be a button, link, or selectable option depending on the menu's role.

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';

<IressMenu>
  <IressMenuItem value="edit">Edit</IressMenuItem>
  <IressMenuItem href="/settings">Settings</IressMenuItem>
</IressMenu>
```

[View MenuItem props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu-menuitem--docs#api-props)

#### Selected

<StoryEmbed id="components-menu-menuitem--selected"/>

#### canToggle

<StoryEmbed id="components-menu-menuitem--can-toggle"/>

#### Prepend and append

<StoryEmbed id="components-menu-menuitem--prepend-and-append"/>

#### Element (custom routing)

<StoryEmbed id="components-menu-menuitem--element"/>

### Testing

Query menu items by their role:

```tsx
const menuItem = screen.getByRole('menuitem', { name: 'Settings' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the menu | — | `menu` |
| activator | A menu group activator (propagated from IressMenuGroup data-testid) | — | `<menugroup-testid>__activator` |
| subdraw | A subdraw container (propagated from IressMenuGroup data-testid) | — | `<menugroup-testid>__subdraw` |
| subdraw trigger | A subdraw trigger item (propagated from IressMenuGroup data-testid) | — | `<menugroup-testid>__subdraw__trigger` |
| checkbox mark | Checkbox indicator on a selectable item (propagated from IressMenuItem data-testid) | — | `<menuitem-testid>__checkbox-mark` |
| checkbox | Checkbox on a multi-select item (propagated from IressMenuItem data-testid) | — | `<menuitem-testid>__checkbox` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| List role | Items navigated with `Tab`, rendered as `listitem` |
| Menu role | Items navigated with arrow keys, rendered as `menuitem` |
| Listbox role | Items are selectable, rendered as `option` |
| Fluid | Menu stretches to container width |
| Subdraw variant | Group labels open fly-over submenus on click |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses appropriate ARIA roles (`list`, `menu`, `listbox`) based on `role` prop
- **2.1.1 Keyboard** — All items are keyboard accessible with role-appropriate navigation
- **1.3.1 Info and Relationships** — Headings and groups provide semantic structure

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Navigate items (list role) |
| `Arrow Up` / `Arrow Down` | Navigate items (menu/listbox role) |
| `Enter` / `Space` | Activate focused item or toggle selection |
| `Escape` | Close subdraw menus |
| `Home` / `End` | Jump to first/last item (menu/listbox role) |

### Edge cases

- **Empty menu**: Renders an empty container with the appropriate role
- **Nested subdraws**: Support multi-level nesting; close on Escape or outside click
- **Mixed content**: Non-interactive items (`IressMenuText`, `IressMenuHeading`) are skipped during keyboard navigation
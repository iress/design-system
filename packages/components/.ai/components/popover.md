# Popover

> Displays floating content anchored to a trigger element.

## Import

```tsx
import { IressPopover } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Popover)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=popover&title=[Popover]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=popover,enhancement&title=[Popover]+Feature:+)

A popover is a panel that is toggled on/off by an activator button or text input. The panel is positioned relative to its activator element.

<StoryEmbed id="components-popover--activator"/>

## Design

### When to use

Most popover use cases are already covered by higher-level components. Use `IressPopover` directly only when none of these fit:

| Need | Use instead |
|------|-------------|
| Action menu on a button | [ContextualMenu](../patterns/contextual-menu.md) |
| Filterable dropdown | [DropdownMenu](../patterns/dropdown-menu.md) |
| Select from options | [Select](../components/select.md) |
| Search with suggestions | [Autocomplete](../components/autocomplete.md) |
| Overflow navigation | [Breadcrumbs](../patterns/breadcrumbs.md) |
| Brief hover hint | [Tooltip](../components/tooltip.md) |

Use raw `IressPopover` for **custom floating content** that doesn't fit the patterns above (e.g. colour pickers, date pickers, custom filter panels).

### When not to use

- **Brief helpful text** — use [Tooltip](../components/tooltip.md) instead
- **Blocking decisions** — use a [Modal](../components/modal.md)
- **Large secondary workflows** — use a [Slideout](../components/slideout.md)

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep popover content focused and concise | Put complex multi-step forms inside a popover |
| Use an `IressButton` as the activator | Use non-interactive elements as activators |
| Allow the popover to close on outside click | Prevent all dismissal methods without clear reason |
| Consider mobile viewports — popovers reposition automatically | Assume a fixed position will work on all screen sizes |

### Content guidelines

- **Activator**: Use a clear label or icon that indicates content will appear
- **Content**: Keep focused on a single purpose — if it grows complex, consider a Modal or Slideout
- **Actions within**: Clicking a menu item should close the popover automatically

### Related patterns

- [ContextualMenu](../patterns/contextual-menu.md) — action menu triggered by a button
- [DropdownMenu](../patterns/dropdown-menu.md) — filterable dropdown with search
- [Select](../components/select.md) — select from a list of options
- [Autocomplete](../components/autocomplete.md) — search with suggestions
- [Breadcrumbs](../patterns/breadcrumbs.md) — overflow navigation menu
- [Tooltip](../components/tooltip.md) — for brief hover/focus descriptions
- [Modal](../components/modal.md) — for blocking overlay dialogs
- [Menu](../components/menu.md) — often used inside popovers for action lists

## Develop

### Quick Start

```tsx
import { IressPopover, IressButton } from '@iress-oss/ids-components';

<IressPopover activator={<IressButton>Open</IressButton>}>
  Popover content
</IressPopover>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs#api-props)

### Usage

#### Activator

The `activator` prop is required. It is the element used to trigger the popover, and works best with an `IressButton`.

<StoryEmbed id="components-popover--activator"/>

#### The `show` property

Control the popover with state using `show`, `onActivated` and `onDeactivated`.

<StoryEmbed id="components-popover--show-with-state"/>

#### Align

The popover panel can be aligned in one of 12 positions relative to the activator. Defaults to `auto` and repositions dynamically to avoid overflow.

<StoryEmbed id="components-popover--align"/>

#### Width

Set a custom width when content needs more space than the theme default.

<StoryEmbed id="components-popover--width"/>

#### Overflow

By default popovers grow in height based on content. Use `maxHeight` and `overflowY` via `contentStyle` to fix the height.

<StoryEmbed id="components-popover--overflow"/>

#### Container

Use the `container` prop to render the popover in a different DOM node.

<StoryEmbed id="components-popover--parent-container"/>

#### Using the `IressPopoverProvider`

Use `IressPopoverProvider` to set a shared container for all nested popovers. Individual popovers can override with their own `container` prop.

> **Note:** If using `IressProvider` or `IressShadow`, the popover provider is already included.

<StoryEmbed id="components-popover-provider--provider"/>

#### Input popover

A popover triggered by input changes. The `minLength` prop specifies the minimum characters before the popover shows. Focus inside is **virtual** (using `aria-activedescendant`).

<StoryEmbed id="components-input-popover--activator"/>

#### With menus

When `IressMenu` is inside `IressPopover`, the popover auto-closes on menu item click and focus moves to the first item on open.

<StoryEmbed id="components-popover--with-menu"/>

### Testing

Query the popover trigger, then interact to open:

```tsx
const trigger = screen.getByRole('button', { name: 'Open popover' });
await user.click(trigger);
expect(screen.getByText('Popover content')).toBeVisible();
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the popover | — | `popover` |
| activator | The popover trigger element | — | `popover__activator` |
| content | The popover content panel | — | `popover__content` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Closed | Popover panel is hidden |
| Opened | Panel appears positioned relative to activator, focus moves to content |
| Activator pressed while open | Popover closes |
| Focus lost | Popover closes when panel loses focus |
| Input popover | Opens when input meets `minLength`, uses virtual focus |

### Accessibility

**WCAG compliance:**

- **2.1.1 Keyboard** — Popover is fully keyboard accessible via activator
- **1.3.1 Info and Relationships** — Content is associated with its activator
- **4.1.2 Name, Role, Value** — Activator communicates expanded state via `aria-expanded`

**ARIA attributes:**

| Element | Attribute | Description |
|---------|-----------|-------------|
| Activator | `aria-expanded` | Indicates whether the popover is open |
| Activator | `aria-controls` | References the popover content panel |
| Content (input popover) | `aria-activedescendant` | Points to the virtually focused item |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens/closes the popover via the activator |
| `Escape` | Closes the popover |
| `Tab` | Moves focus through focusable content inside the popover |
| `ArrowDown` / `ArrowUp` | Navigates items in menu/listbox popovers |

### Edge cases

- **Dynamic repositioning**: Panel moves automatically to stay within viewport bounds
- **Nested popovers**: Supported (e.g. Select inside a popover) — content grows in height by default
- **Container portals**: When using `container`, ensure the target element exists before mount
- **Virtual focus**: `IressInputPopover` keeps real focus on the input while virtually highlighting items

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs)
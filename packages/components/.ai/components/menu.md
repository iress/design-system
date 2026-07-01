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

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| changeOnBlur | `boolean` | — | If set to true, change event will be fired with the correctly selected value. |
| children | `ReactNode` | — | Content of the menu, usually multiple `IressMenuItem`, `IressMenuHeading`, `IressMenuText` or `IressMenuDivider`. |
| defaultSelected | `[ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>` | — | Initially selected values of menu when `role` is listbox. Used for uncontrolled menus. |
| fluid | `boolean` | — | If set to true, menu will fill the width of its container. |
| id | `string` | — | Unique ID of the menu. If not provided, will be automatically generated. Used to add aria attributes for accessibility. |
| layout | `inline-equal-width`, `inline` , `stack`  | `stack` | Sets whether the layout is vertical (stack) or horizontal (inline/inline-equal-width). |
| multiSelect | `boolean` | — | If set to true, menu items will contain checkboxes. |
| noWrap | `boolean` | — | If set to true, menu items will not wrap onto a separate line when space is exceeded. |
| numbered | `boolean` | — | Add a numbered header style to the menu group. Only used when variant is 'side'. |
| onChange | `((value?: [ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple> , null) => void)` | — | Emitted when the menu value changes |
| selected | `[ControlledValue](../../dist/hooks/useControlledState.d.ts)<T, TMultiple>` | — | Selected values of menu when `role` is listbox. Used for controlled menus. |
| role | `list` , `listbox`, `menu`  | `list` | Type of menu, corresponding to [aria-roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles). Will be set automatically when used inside popover or when the `multiSelect` prop is set to true. |
| variant | `MenuVariants` | — | The variant of the menu, which determines some opinionated styles for the menu items |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Menu/Menu.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

### IressMenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| append | `ReactNode` | — | Section after menu item content. |
| canToggle | `boolean` | — | When true, the item can be toggled even in single-select mode. |
| children | `ReactNode` | — | The children to be rendered inside the menu item, describing the action. |
| className | `string` | — | The class name to be applied to the menu item. |
| divider | `boolean` | — | Adds a divider after any content. If you would like to add a divider before the menu item, use a `<IressMenuDivider />` instead. |
| element | `ElementType` | — | Change the component that will be rendered as the menu item, used for third-party libraries that require a specific element type. By default, it will render a button or an anchor tag based on the `href` prop. |
| href | `string` | — | Contains a URL or a URL fragment that the hyperlink points to. If this property is set and no `element` was set, an anchor tag will be rendered. Otherwise, a button will be rendered. |
| icon | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | The icon to be displayed in the button. If provided, the icon will be displayed and the `children` will be used as screen reader text (although you can explicitly override this with `aria-label`) |
| listItemStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | Style overrides for the menu item wrapper, which is the element rendered at the top level and contains a `role` attribute for accessibility. This is useful for menu item variants that require additional structure, such as the side nav drawer items. This is only applicable for the `listitem` role, as other roles will have the `role` attribute applied directly to the menu item element itself. |
| onBlur | `FocusEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when the menu item is blurred. |
| onClick | `MouseEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when the menu item is clicked. |
| onKeyDown | `KeyboardEventHandler<Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>>` | — | Emitted when a key is pressed while focused on the menu item. |
| loading | `boolean, string ` | — | When true, button is in loading state. If provided a string, will be used as the loading text for screen readers. |
| prepend | `ReactNode` | — | Section before menu item content. |
| selected | `boolean` | — | When true, shows the item in selected state. |
| value | `[FormControlValue](../../dist/types.d.ts)` | — | To be used when menu type is listbox. |

📄 [Full type definition](../../dist/components/MenuItem/MenuItem.d.ts)

### IressMenuHeading Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| element | `[IressTextElements](../../dist/components/MenuHeading/MenuHeading.d.ts)` | `'h2' as E` | The HTML element that should be rendered. |
| append | `ReactNode` | — | Section after menu item content. |
| divider | `boolean` | — | Adds a divider after any content. If you would like to add content before the menu item, use a `<hr />` instead. |
| prepend | `ReactNode` | — | Section before menu item content. |

📄 [Full type definition](../../dist/components/MenuHeading/MenuHeading.d.ts)

### IressMenuDivider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/MenuDivider/MenuDivider.d.ts)

### IressMenuGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| active | `boolean` | — | Whether this header is active/expanded, revealing child drawer items. Only used when parent Menu has variant="side". |
| append | `string , number , bigint , boolean , (ReactElement> & string) | (Iterable<ReactNode> & string) | ... 23 more ...` | — | Append an element after the label. Only used when variant is 'subdraw' to add an icon indicating a submenu. By default, a right arrow icon is used when variant is 'subdraw', so this prop is only needed if you want to override that. Section after menu item content. |
| **label** | `ReactNode` | — | Label for the group, displayed as a non-selectable heading. |
| children | `ReactNode` | — | Items within the group (typically menu items). |
| defaultActive | `boolean` | — | Uncontrolled default for the active/expanded state. Only used when parent Menu has variant="side". |
| divider | `boolean` | — | Adds a divider after the group. Adds a divider after any content. If you would like to add content before the menu item, use a `<hr />` instead. |
| element | ... 164 more ..., `article` , `circle` , `code` , `details` , `div` , `filter` , `footer` , `html` , `iframe` , `image` , `input` , `object` , `p` , `slot` , `span` , `style` , `symbol` , `title`  | — | Custom element type for the activator (e.g. for third-party routing). Only used when parent Menu has variant="side". The HTML element that should be rendered. |
| href | `string` | — | URL for the group activator link. Only used when parent Menu has variant="side". |
| onActiveChange | `((active?: boolean) => void)` | — | Callback fired when the active/expanded state changes. Only used when parent Menu has variant="side". |
| variant | `MenuVariants` | — | Variant of the menu group. - `undefined` (default): Renders inline with label as heading and children below. - `'subdraw'`: Renders as a trigger that opens a fly-over submenu containing children. - `'side'`: Renders as a numbered header with an expandable drawer containing children. |

📄 [Full type definition](../../dist/components/MenuGroup/MenuGroup.d.ts)

A menu can display grouped action buttons, navigation items or headings.

```tsx
import {
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuBasic() {
  return (
    <IressMenu defaultSelected="5">
      <IressMenuHeading>Menu heading</IressMenuHeading>
      <IressMenuItem value="2">Menu item (button)</IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem href="https://iress.com">Menu item (link)</IressMenuItem>
      <IressMenuItem selected value="5">
        Menu item (selected)
      </IressMenuItem>
    </IressMenu>
  );
}
```

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
</IressMenu>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs#api-props)

### Usage

#### Basic

`IressMenuDivider`, `IressMenuHeading`, `IressMenuItem` and `IressMenuText` are supplied as children of the menu.

```tsx
import {
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuBasic() {
  return (
    <IressMenu defaultSelected="5">
      <IressMenuHeading>Menu heading</IressMenuHeading>
      <IressMenuItem value="2">Menu item (button)</IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem href="https://iress.com">Menu item (link)</IressMenuItem>
      <IressMenuItem selected value="5">
        Menu item (selected)
      </IressMenuItem>
    </IressMenu>
  );
}
```

#### Complex

`IressMenuItem`, `IressMenuHeading` and `IressMenuText` support `prepend`, `divider` and `append` props.

```tsx
import {
  IressIcon,
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuComplex() {
  return (
    <IressMenu maxWidth="3/12">
      <IressMenuHeading prepend={<IressIcon name="sentiment_excited" />}>
        Heading with prepend
      </IressMenuHeading>
      <IressMenuItem
        value="3"
        divider
        selected
        prepend={<IressIcon name="flag" />}
        append={<IressIcon name="chevron-right" />}
      >
        Button with append and prepend
      </IressMenuItem>
      <IressMenuHeading
        element="h3"
        append={<IressIcon name="sentiment_excited" />}
        prepend={<IressIcon name="sentiment_excited" />}
      >
        Heading with append and prepend
      </IressMenuHeading>
      <IressMenuItem
        value="4"
        append={<IressIcon name="chevron-right" />}
        href="https://iress.com"
      >
        Link with append
      </IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem value="6" append={<IressIcon name="chevron-right" />}>
        Button with append
      </IressMenuItem>
    </IressMenu>
  );
}
```

#### Secondary navigation

When `href` is set on `IressMenuItem`, it renders as a link. Wrap in a `<nav>` and set `role` to `list`.

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';

export function MenuNavigation() {
  return (
    <nav aria-label="Secondary">
      <IressMenu>
        <IressMenuItem href="https://www.iress.com/software/financial-advice/">
          Financial advice
        </IressMenuItem>
        <IressMenuItem
          selected
          href="https://www.iress.com/software/trading-and-market-data/"
        >
          Trading and market data
        </IressMenuItem>
        <IressMenuItem href="https://www.iress.com/software/investment-management/">
          Investment management
        </IressMenuItem>
        <IressMenuItem href="https://www.iress.com/software/mortgages/">
          Mortgages
        </IressMenuItem>
      </IressMenu>
    </nav>
  );
}
```

#### Headings

Use `IressMenuHeading` with the `element` or `textStyle` prop for heading levels.

```tsx
import {
  IressMenu,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuHeadings() {
  return (
    <IressMenu>
      <IressMenuHeading element="h4">Menu heading (h4)</IressMenuHeading>
      <IressMenuItem>Menu item 1</IressMenuItem>
      <IressMenuHeading element="h5">Menu heading (h5)</IressMenuHeading>
      <IressMenuItem>Menu item 2</IressMenuItem>
    </IressMenu>
  );
}
```

#### Dividers

Use `IressMenuDivider` or the `divider` prop on items for visual separation.

```tsx
import {
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@iress-oss/ids-components';

export function MenuDividers() {
  return (
    <IressMenu>
      <IressMenuHeading element="h4" divider>
        Menu heading (h4)
      </IressMenuHeading>
      <IressMenuItem>Menu item 1</IressMenuItem>
      <IressMenuItem divider>Menu item 2</IressMenuItem>
      <IressMenuHeading element="h5">Menu heading (h5)</IressMenuHeading>
      <IressMenuItem selected>Menu item 3</IressMenuItem>
      <IressMenuItem>Menu item 4</IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem>Menu item 5</IressMenuItem>
    </IressMenu>
  );
}
```

#### Fluid menus

Set `fluid` to stretch the menu to its container width.

```tsx
<IressMenu fluid>
  <IressMenuItem value="1">Menu item 1</IressMenuItem>
  <IressMenuItem value="2">Menu item 2</IressMenuItem>
</IressMenu>;
```

#### Layout

The `layout` prop supports `stack` (default), `inline`, and `inline-equal-width`.

```tsx
import {
  IressMenu,
  IressMenuItem,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function MenuLayout() {
  return (
    <IressStack gap="lg">
      <IressText>
        <h3>Stack (default)</h3>
        <IressMenu layout="stack" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
      <IressText>
        <h3>Inline</h3>
        <IressMenu layout="inline" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
      <IressText>
        <h3>Inline Equal Width</h3>
        <IressMenu layout="inline-equal-width" defaultSelected="1">
          <IressMenuItem value="1">Option 1</IressMenuItem>
          <IressMenuItem value="2">Option 2</IressMenuItem>
          <IressMenuItem value="3">Option 3</IressMenuItem>
          <IressMenuItem value="4">Option 4</IressMenuItem>
          <IressMenuItem value="5">Option 5</IressMenuItem>
        </IressMenu>
      </IressText>
    </IressStack>
  );
}
```

#### Text wrapping

Use `noWrap` to prevent menu item text from wrapping.

```tsx
<IressInline>
  <IressMenu width="input.12">
    <IressMenuItem>Menu item with some text that wraps</IressMenuItem>
  </IressMenu>
  <IressMenu width="input.12" noWrap>
    <IressMenuItem>Non wrapping menu item with some text</IressMenuItem>
  </IressMenu>
</IressInline>;
```

#### Prepend & Append

Use `prepend` and `append` props to position content before or after item text.

```tsx
import {
  IressIcon,
  IressMenu,
  IressMenuHeading,
  IressMenuItem,
  IressPill,
} from '@iress-oss/ids-components';

export function MenuSlots() {
  return (
    <IressMenu role="menu">
      <IressMenuHeading prepend={<IressIcon name="cog" />}>
        Prepend slot
      </IressMenuHeading>
      <IressMenuItem prepend={<IressIcon name="file-alt" />}>
        New file
      </IressMenuItem>
      <IressMenuItem divider prepend={<IressIcon name="save" />}>
        Save file as
      </IressMenuItem>
      <IressMenuHeading append={<IressIcon name="link" />}>
        Append slot
      </IressMenuHeading>
      <IressMenuItem
        href="https://www.iress.com"
        append={<IressIcon name="chevron-right" />}
      >
        Visit the Iress website
      </IressMenuItem>
      <IressMenuItem
        href="https://google.com"
        append={<IressPill>8+</IressPill>}
      >
        Visit Google
      </IressMenuItem>
    </IressMenu>
  );
}
```

#### Roles

The `role` prop changes both the ARIA role and interaction model:

- `list` (default): navigated with `Tab`
- `menu`: navigated with arrow keys
- `listbox`: selectable items, navigated with arrow keys

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressButtonGroup,
  IressInline,
  IressMenu,
  IressMenuItem,
  IressStack,
  IressText,
  IressToggle,
} from '@iress-oss/ids-components';

export function MenuRoles() {
  const [role, setRole] = useState<'list' | 'menu' | 'listbox'>('list');
  const [multiSelect, setMultiSelect] = useState(false);

  return (
    <IressStack gap="md">
      <IressInline gap="md" verticalAlign="middle">
        <IressButtonGroup label="Menu role">
          <IressButton
            mode={role === 'list' ? 'primary' : 'secondary'}
            onClick={() => setRole('list')}
          >
            list
          </IressButton>
          <IressButton
            mode={role === 'menu' ? 'primary' : 'secondary'}
            onClick={() => setRole('menu')}
          >
            menu
          </IressButton>
          <IressButton
            mode={role === 'listbox' ? 'primary' : 'secondary'}
            onClick={() => setRole('listbox')}
          >
            listbox
          </IressButton>
        </IressButtonGroup>

        {role === 'listbox' && (
          <IressToggle
            checked={multiSelect}
            onChange={(checked) => setMultiSelect(checked)}
          >
            Multi-select
          </IressToggle>
        )}
      </IressInline>

      <IressText element="p" color="colour.neutral.70">
        {role === 'list' &&
          'List role: items are related context, navigated with tab key.'}
        {role === 'menu' &&
          'Menu role: items perform actions, arrow keys wrap around.'}
        {role === 'listbox' &&
          'Listbox role: items are selectable, like a <select> element.'}
      </IressText>

      <IressMenu
        role={role}
        multiSelect={role === 'listbox' ? multiSelect : undefined}
        aria-label="Role example"
      >
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
      </IressMenu>
    </IressStack>
  );
}
```

#### Variants

- Default — for popovers, side menus, and navigation
- `subdraw` — adds arrow icons for sub-menu navigation
- `radio` — radio mark style (single select listbox only)

```tsx
import {
  IressMenu,
  IressMenuItem,
  IressStack,
} from '@iress-oss/ids-components';

export function MenuVariants() {
  return (
    <IressStack gap="lg">
      <IressMenu variant="radio" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu variant="subdraw" maxWidth="input.12" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu variant="side" maxWidth="input.12" defaultSelected="5">
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
      <IressMenu
        variant="side"
        maxWidth="input.12"
        defaultSelected="5"
        numbered
      >
        <IressMenuItem value="1">Option 1</IressMenuItem>
        <IressMenuItem value="2">Option 2</IressMenuItem>
        <IressMenuItem value="3">Option 3</IressMenuItem>
        <IressMenuItem value="4">Option 4</IressMenuItem>
        <IressMenuItem value="5">Option 5</IressMenuItem>
      </IressMenu>
    </IressStack>
  );
}
```

### Menu Group

`IressMenuGroup` groups related items under a common label.

```tsx
<IressMenu>
  <IressMenuGroup label="Fruits">
    <IressMenuItem>Apple</IressMenuItem>
    <IressMenuItem>Banana</IressMenuItem>
    <IressMenuItem>Orange</IressMenuItem>
  </IressMenuGroup>
  <IressMenuGroup label="Vegetables" divider>
    <IressMenuItem>Carrot</IressMenuItem>
    <IressMenuItem>Broccoli</IressMenuItem>
  </IressMenuGroup>
</IressMenu>;
```

### Menu Item

`IressMenuItem` is the individual item within a menu. It can be a button, link, or selectable option depending on the menu's role.

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';

<IressMenu>
  <IressMenuItem value="edit">Edit</IressMenuItem>
  <IressMenuItem href="/settings">Settings</IressMenuItem>
</IressMenu>;
```

[View MenuItem props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu-menuitem--docs#api-props)

#### Selected

```tsx
<IressMenuItem selected>Menu item</IressMenuItem>;
```

#### canToggle

```tsx
<IressMenuItem value={9} canToggle>
  Menu item
</IressMenuItem>;
```

#### Prepend and append

```tsx
<IressMenuItem
  prepend={<IressIcon name="home" />}
  append={<IressPill mode="70">New</IressPill>}
>
  Menu item
</IressMenuItem>;
```

#### Element (custom routing)

```tsx
import { IressMenu, IressMenuItem } from '@iress-oss/ids-components';
import { type HTMLAttributes } from 'react';

/**
 * This could be the `Link` component from `react-router-dom` or any other routing library.
 */
const Link = ({
  to,
  ...restProps
}: Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }) => (
  <a {...restProps} href={to} />
);

export const RoutingLinkMenu = () => {
  return (
    <IressMenu role="menu" fluid>
      <IressMenuItem element={Link} to="https://iress.com" selected>
        Iress
      </IressMenuItem>
      <IressMenuItem element={Link} to="https://google.com">
        Google
      </IressMenuItem>
    </IressMenu>
  );
};
```

### Testing

Query menu items by their role:

```tsx
const menuItem = screen.getByRole('menuitem', { name: 'Settings' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-menu--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the menu | `getByRole('list')` by default, or `getByRole('menu')` / `getByRole('listbox')` depending on role prop | `menu` |
| activator | A menu group activator (propagated from IressMenuGroup data-testid) | `getByRole('button', { name: '...' })` | `<menugroup-testid>__activator` |
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
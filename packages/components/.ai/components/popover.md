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

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **activator** | `ReactElement> | undefined` | — | Content for an activator element, usually an `IressButton`. |
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `auto` | Sets the alignment of the popover relative to the activator element. |
| children | `ReactNode` | — | The content to render within the popover. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the popover into. By default, the popover will render where its parent is rendered.  **Note:** If the `container` doesn’t exist when the popover is mounted, ensure you pass an element directly (not a ref) and specify null as the default value before it is set. This lets it wait for the root to be available. For example, if you reference the parent element of a popover. |
| contentClassName | `string` | — | Class name of the popover content. @deprecated Use `contentStyle` instead. |
| contentStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | `{}` | This allows you to customise the content styling specifically, which is the floating element. It accepts an object with any of the styling properties available on `IressCSSProps`, as well as `className` and `style`. |
| defaultShow | `boolean` | — | When set to `true` the popover will be visible by default. Use for uncontrolled popovers. |
| displayMode | `inline` , `overlay` | `overlay` | Sets the display mode of popover. |
| fluid | `boolean` | — | Popovers can be fluid, meaning they will take up the full width of their container. |
| focusStartIndex | `number` | — | Which index to start the focus on when the popover is opened. Only works with `type` listbox and menu. Note: The index must exist in the list of items, otherwise it will not work. |
| matchActivatorWidth | `boolean` | — | Sets the popover to match the width of the activator. Note: This only works when `displayMode="overlay"`. |
| offset | `OffsetOptions` | `5` | The offset of the popover from its default position. This can be a number or an object with `mainAxis` and `crossAxis` properties, which specify the offset in pixels along the main axis (the axis along which the popover is aligned) and the cross axis (the perpendicular axis). |
| onActivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is activated. |
| onDeactivated | `((e?: Event, reason?: OpenChangeReason, activeIndex?: number , null , undefined) => void) | undefined` | — | Is called when popover is deactivated. |
| onNavigate | `((activeIndex: number , null) => void)` | — | Is called when registered popover items are navigated using arrow keys. Only works with `type` listbox and menu. |
| show | `boolean` | — | When set to `true` the modal will be visible. Use for controlled popovers. |
| type | `dialog` , `grid` , `listbox`, `menu` , `tree`  | — | Describes the type of content contained in the popover. |
| virtualFocus | `boolean` | `false` | Whether the focus is virtual (using `aria-activedescendant`). Use this if you need focus to remain on the reference element (such as an input), but allow arrow keys to navigate items. Note: This is only applicable when type is set to: `listbox` or `menu`, and only works out of the box with `IressMenu` and its subcomponents. |
| nested | `boolean` | — | Whether this popover uses nested navigation (ArrowRight to open, ArrowLeft to close). When not set, this is auto-detected based on whether the popover is inside another popover. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Popover/Popover.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

A popover is a panel that is toggled on/off by an activator button or text input. The panel is positioned relative to its activator element.

```tsx
<IressPopover activator={<IressButton>Toggle popover</IressButton>}>
  <p>Content goes here.</p>
</IressPopover>;
```

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
</IressPopover>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-popover--docs#api-props)

### Usage

#### Activator

The `activator` prop is required. It is the element used to trigger the popover, and works best with an `IressButton`.

```tsx
<IressPopover activator={<IressButton>Toggle popover</IressButton>}>
  <p>Content goes here.</p>
</IressPopover>;
```

#### The `show` property

Control the popover with state using `show`, `onActivated` and `onDeactivated`.

```tsx
import { IressButton, IressPopover } from '@iress-oss/ids-components';
import { useState } from 'react';

export function PopoverUsingState() {
  const [show, setShow] = useState(false);

  return (
    <IressPopover
      activator={
        <IressButton onClick={() => setShow(!show)}>
          Show popover using state
        </IressButton>
      }
      show={show}
      onActivated={() => setShow(true)}
      onDeactivated={() => setShow(false)}
    >
      A little more information about this area.
    </IressPopover>
  );
}
```

#### Align

The popover panel can be aligned in one of 12 positions relative to the activator. Defaults to `auto` and repositions dynamically to avoid overflow.

```tsx
<div style={{ padding: '80px 150px' }}>
  <IressStack gap="md">
    <IressInline horizontalAlign="center" gap="sm">
      <IressPopover
        activator={
          <IressTooltip
            align="bottom-start"
            tooltipText="Tooltips and popovers can go together if needed!"
          >
            <IressButton>top-start</IressButton>
          </IressTooltip>
        }
        align="top-start"
      />
      <IressPopover activator={<IressButton>top</IressButton>} align="top" />
      <IressPopover
        activator={<IressButton>top-end</IressButton>}
        align="top-end"
      />
    </IressInline>
    <IressInline horizontalAlign="between">
      <IressStack gap="sm">
        <IressInline horizontalAlign="left">
          <IressPopover
            activator={<IressButton>left-start</IressButton>}
            align="left-start"
          />
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressPopover
            activator={<IressButton>left</IressButton>}
            align="left"
          />
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressPopover
            activator={<IressButton>left-end</IressButton>}
            align="left-end"
          />
        </IressInline>
      </IressStack>
      <IressStack gap="sm">
        <IressInline horizontalAlign="right">
          <IressPopover
            activator={<IressButton>right-start</IressButton>}
            align="right-start"
          />
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressPopover
            activator={<IressButton>right</IressButton>}
            align="right"
          />
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressPopover
            activator={<IressButton>right-end</IressButton>}
            align="right-end"
          />
        </IressInline>
      </IressStack>
    </IressInline>
    <IressInline horizontalAlign="center" gap="sm">
      <IressPopover
        activator={<IressButton>bottom-start</IressButton>}
        align="bottom-start"
      />
      <IressPopover
        activator={<IressButton>bottom</IressButton>}
        align="bottom"
      />
      <IressPopover
        activator={<IressButton>bottom-end</IressButton>}
        align="bottom-end"
      />
    </IressInline>
  </IressStack>
</div>;
```

#### Width

Set a custom width when content needs more space than the theme default.

```tsx
<IressPopover
  container={document.body}
  contentStyle={{ style: { maxWidth: '30rem' } }}
>
  details
</IressPopover>;
```

#### Overflow

By default popovers grow in height based on content. Use `maxHeight` and `overflowY` via `contentStyle` to fix the height.

```tsx
<IressInline gap="md">
  <IressPopover
    align="bottom-start"
    container={document.body}
    activator={<IressButton>Normal popover</IressButton>}
  >
    paragraph
  </IressPopover>
  <IressPopover
    align="bottom-start"
    container={document.body}
    activator={<IressButton>Fixed height popover</IressButton>}
    contentStyle={{ scrollable: 'y', style: { maxHeight: '200px' } }}
  >
    paragraph
  </IressPopover>
</IressInline>;
```

#### Container

Use the `container` prop to render the popover in a different DOM node.

```tsx
import { useState } from 'react';
import { IressButton, IressPopover } from '@iress-oss/ids-components';

export const PopoverParentContainer = () => {
  const [parentContainer, setParentContainer] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <div id="parent" ref={setParentContainer}>
      <IressPopover
        activator={<IressButton>Toggle</IressButton>}
        container={parentContainer}
      >
        This content will be rendered in the parent container
      </IressPopover>
    </div>
  );
};
```

#### Using the `IressPopoverProvider`

Use `IressPopoverProvider` to set a shared container for all nested popovers. Individual popovers can override with their own `container` prop.

> **Note:** If using `IressProvider` or `IressShadow`, the popover provider is already included.

```tsx
import { useRef, useState } from 'react';
import {
  IressButton,
  IressPopover,
  IressPopoverProvider,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <IressStack gap="md">
      <IressText>
        The provider below delegates all nested popovers into the green
        container. The second popover overrides the provider&apos;s container
        and renders inline (no portal).
      </IressText>

      <IressPopoverProvider container={container}>
        <IressStack gap="md">
          <IressPopover activator={<IressButton>Uses provider</IressButton>}>
            This popover is rendered inside the provider&apos;s container below.
          </IressPopover>

          <IressPopover
            activator={<IressButton>Overrides provider</IressButton>}
            container={null}
          >
            This popover overrides the provider and renders inline.
          </IressPopover>
        </IressStack>
      </IressPopoverProvider>

      <div
        ref={(node) => {
          containerRef.current = node;
          setContainer(node);
        }}
        style={{
          border: '2px dashed green',
          padding: '16px',
          minHeight: '80px',
        }}
      >
        <IressText>
          <strong>Provider container</strong> — popovers using the provider will
          render here.
        </IressText>
      </div>
    </IressStack>
  );
};
```

#### Input popover

A popover triggered by input changes. The `minLength` prop specifies the minimum characters before the popover shows. Focus inside is **virtual** (using `aria-activedescendant`).

```tsx
<IressInputPopover activator={<IressInput />} container={document.body}>
  basic
</IressInputPopover>;
```

#### With menus

When `IressMenu` is inside `IressPopover`, the popover auto-closes on menu item click and focus moves to the first item on open.

```tsx
import {
  IressButton,
  IressIcon,
  IressMenu,
  IressMenuItem,
  IressPopover,
} from '@iress-oss/ids-components';

export function PopoverWithMenu() {
  return (
    <IressPopover
      activator={<IressButton>Open menu</IressButton>}
      container={document.body}
      type="menu"
      contentStyle={{ p: 'none' }}
    >
      <IressMenu role="menu">
        <IressMenuItem value="edit" prepend={<IressIcon name="edit" />}>
          Edit
        </IressMenuItem>
        <IressMenuItem
          value="duplicate"
          prepend={<IressIcon name="content_copy" />}
        >
          Duplicate
        </IressMenuItem>
        <IressMenuItem value="delete" prepend={<IressIcon name="delete" />}>
          Delete
        </IressMenuItem>
      </IressMenu>
    </IressPopover>
  );
}
```

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
| activator | The popover trigger element | `getByRole('button')` | `popover__activator` |
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

## Recipes

### Focusable Children

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressPopover,
  usePopoverItem,
} from '@iress-oss/ids-components';

const CountButton = () => {
  const [count, setCount] = useState(0);
  const { isActiveInPopover, ...popoverItemProps } = usePopoverItem('Count', {
    onKeyDown: (e) => {
      if (e.key === '+') {
        setCount(count + 1);
      }
    },
  });

  return (
    <IressButton
      {...popoverItemProps}
      active={isActiveInPopover}
      mode="tertiary"
      fluid
    >
      Increase count using the + key: {count}
    </IressButton>
  );
};

export const UsePopoverExample = () => (
  <IressPopover
    activator={<IressButton>Toggle</IressButton>}
    container={document.body}
    type="listbox"
    virtualFocus
  >
    <CountButton />
    <CountButton />
  </IressPopover>
);
```

### With Listbox

```tsx
import { useState } from 'react';
import {
  IressButton,
  IressMenu,
  IressMenuItem,
  IressPopover,
} from '@iress-oss/ids-components';

export function PopoverWithListbox() {
  const [selected, setSelected] = useState<string | undefined>('aus');

  return (
    <IressPopover
      activator={<IressButton>Select country</IressButton>}
      container={document.body}
      type="listbox"
      contentStyle={{ p: 'none' }}
    >
      <IressMenu
        role="listbox"
        aria-label="Country"
        selected={selected}
        onChange={(value) => setSelected(value as string)}
      >
        <IressMenuItem value="aus">Australia</IressMenuItem>
        <IressMenuItem value="nz">New Zealand</IressMenuItem>
        <IressMenuItem value="uk">United Kingdom</IressMenuItem>
        <IressMenuItem value="sg">Singapore</IressMenuItem>
      </IressMenu>
    </IressPopover>
  );
}
```

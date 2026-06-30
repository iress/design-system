# Tooltip

> Shows additional contextual information on hover or focus of a trigger element.

## Import

```tsx
import { IressTooltip } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Tooltip)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tooltip&title=[Tooltip]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tooltip,enhancement&title=[Tooltip]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | `[FloatingUIAligns](../../dist/types.d.ts)` | `top` | Sets the alignment of the popover relative to the activator element. |
| **children** | `ReactNode` | — | The element to add a tooltip to. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the tooltip into. Overrides the container set by `IressTooltipProvider`. |
| delay | `number` | `500` | Sets the tooltip display delay in milliseconds. |
| open | `boolean` | `false` | Only used for internal testing. |
| **tooltipText** | `string , string[]` | — | Sets the tooltip text. Can accept a string or an array of strings - if given an array, will output each string on a new line. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Tooltip/Tooltip.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

A component that shows concise, informative text about an element when focussed upon, hovered over or on a long touch.

```tsx
<IressStyled pt="spacing.6">
  <IressInline gap="md">
    <IressTooltip tooltipText="Single line Hello! This is a really long tooltip to try and see if it goes behind the scrollbar">
      <IressButton>Single line</IressButton>
    </IressTooltip>
    <IressTooltip tooltipText={['This tooltip', 'has multiple lines']}>
      <IressButton>Multi line</IressButton>
    </IressTooltip>
  </IressInline>
</IressStyled>;
```

## Design

### When to use

- **Icon-only buttons**: Provide a text label for buttons that only show an icon
- **Truncated content**: Show the full text of a truncated label
- **Supplementary info**: Add brief context to an element without cluttering the UI

### When not to use

- **Help text for form fields** — use hint text on the Field component instead
- **Rich or interactive content** — use a Popover or Modal
- **Critical information** — tooltips are not immediately visible; use inline text

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep tooltip text concise (a few words) | Put paragraph-length content in a tooltip |
| Only attach tooltips to focusable elements | Attach tooltips to non-focusable elements |
| Remove any `title` attribute from the trigger | Leave `title` attributes that duplicate or conflict with the tooltip |
| Use `align` to avoid obscuring content | Let tooltips cover interactive elements |

### Content guidelines

- **Text**: Plain text only — no HTML, links, or formatting
- **Length**: A few words to a short sentence; use a Popover for anything longer
- **Multi-line**: Pass an array of strings for line breaks

### Related patterns

- [Popover](../components/popover.md) — for rich, interactive content on hover/click
- [Field](../components/field.md) — use `hint` prop instead of tooltips for form help text

## Develop

### Quick Start

```tsx
import { IressTooltip, IressButton } from '@iress-oss/ids-components';

<IressTooltip tooltipText="Save your changes">
  <IressButton>Save</IressButton>
</IressTooltip>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs#api-props)

### Usage

#### Tooltip text

The `tooltipText` prop sets the content. Pass a string or an array of strings for multiple lines.

```tsx
<IressStyled pt="spacing.6">
  <IressInline gap="md">
    <IressTooltip tooltipText="Single line Hello! This is a really long tooltip to try and see if it goes behind the scrollbar">
      <IressButton>Single line</IressButton>
    </IressTooltip>
    <IressTooltip tooltipText={['This tooltip', 'has multiple lines']}>
      <IressButton>Multi line</IressButton>
    </IressTooltip>
  </IressInline>
</IressStyled>;
```

#### Align

The tooltip can be aligned in 12 positions relative to the activator. Position changes dynamically to avoid overflow.

```tsx
<div style={{ padding: '80px 150px' }}>
  <IressStack gap="md">
    <IressInline horizontalAlign="center" gap="sm">
      <IressTooltip tooltipText="Hello!" align="top-start">
        <IressButton>Top Start</IressButton>
      </IressTooltip>
      <IressTooltip tooltipText="Hello!" align="top">
        <IressButton>Top</IressButton>
      </IressTooltip>
      <IressTooltip tooltipText="Hello!" align="top-end">
        <IressButton>Top End</IressButton>
      </IressTooltip>
    </IressInline>
    <IressInline horizontalAlign="between">
      <IressStack gap="sm">
        <IressInline horizontalAlign="left">
          <IressTooltip tooltipText="Hello!" align="left-start">
            <IressButton>Left Start</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressTooltip tooltipText="Hello!" align="left">
            <IressButton>Left</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="left">
          <IressTooltip tooltipText="Hello!" align="left-end">
            <IressButton>Left End</IressButton>
          </IressTooltip>
        </IressInline>
      </IressStack>
      <IressStack gap="sm">
        <IressInline horizontalAlign="right">
          <IressTooltip tooltipText="Hello!" align="right-start">
            <IressButton>Right Start</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressTooltip tooltipText="Hello!" align="right">
            <IressButton>Right</IressButton>
          </IressTooltip>
        </IressInline>
        <IressInline horizontalAlign="right">
          <IressTooltip tooltipText="Hello!" align="right-end">
            <IressButton>Right End</IressButton>
          </IressTooltip>
        </IressInline>
      </IressStack>
    </IressInline>
    <IressInline horizontalAlign="center" gap="sm">
      <IressTooltip tooltipText="Hello!" align="bottom-start">
        <IressButton>Bottom Start</IressButton>
      </IressTooltip>
      <IressTooltip tooltipText="Hello!" align="bottom">
        <IressButton>Bottom</IressButton>
      </IressTooltip>
      <IressTooltip tooltipText="Hello!" align="bottom-end">
        <IressButton>Bottom End</IressButton>
      </IressTooltip>
    </IressInline>
  </IressStack>
</div>;
```

#### Delay

The `delay` prop sets milliseconds before the tooltip appears after `mouseEnter`.

```tsx
<IressStyled pt="spacing.6">
  <IressInline horizontalAlign="center" gap="sm">
    <IressTooltip tooltipText="Hello!" delay={0}>
      <IressButton>0ms (no delay)</IressButton>
    </IressTooltip>
    <IressTooltip tooltipText="Hello!">
      <IressButton>500ms (default)</IressButton>
    </IressTooltip>

    <IressTooltip tooltipText="Hello!" delay={2000}>
      <IressButton>2000ms</IressButton>
    </IressTooltip>
  </IressInline>
</IressStyled>;
```

### Testing

Hover over the trigger to show the tooltip, then query the content:

```tsx
const trigger = screen.getByText('Hover me');
await user.hover(trigger);
expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root wrapper element (contains activator and tooltip) | — | `tooltip` |
| activator | The tooltip trigger element | — | `tooltip__activator` |
| tooltip text | The floating tooltip content (visible on hover/focus) | `getByRole('tooltip')` | `tooltip__tooltip-text` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tooltip--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Hidden | Tooltip is not rendered in the DOM |
| Visible (hover) | Shows on `mouseEnter`, hides 500ms after `mouseLeave` |
| Visible (focus) | Shows on focus, hides immediately on blur |
| Visible (touch) | Shows on long press, hides on tap elsewhere |
| Pointer on tooltip | Tooltip remains visible while pointer is over it |

### Accessibility

**WCAG compliance:**

- **1.4.13 Content on Hover or Focus** — Tooltip is dismissable, hoverable, and persistent per WCAG requirements
- **4.1.2 Name, Role, Value** — Uses `role="tooltip"` and `aria-describedby` linking

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Focus the activator, showing the tooltip |
| `Escape` | Dismiss the tooltip while it is visible |
| `Tab` (away) | Blur the activator, hiding the tooltip |

### Edge cases

- **Existing title attribute**: Not suppressed — remove it manually to avoid duplicate text
- **Non-focusable activator**: Tooltip won't show on keyboard; always use a focusable trigger
- **Overflow positioning**: Tooltip auto-repositions to stay within the viewport
- **Very long text**: Text wraps at the tooltip's max-width
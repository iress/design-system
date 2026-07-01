# Pill

> Displays a small, rounded badge for categorisation or status indication.

## Import

```tsx
import { IressPill } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Pill)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=pill&title=[Pill]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=pill,enhancement&title=[Pill]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content of the badge. |
| mode | `10` , `20` , `30` , `40` , `50` , `60` , `70` , `80` , `90`, `danger` , `info` , `success` , `warning` , 10 , 20 , 30 , 40 , 50 , 60 , 70 , 80 , 90  | `90` | Style of the badge, based on the data colour palette (10-90) or system status colours (danger, info, success, warning). Can be a number (10-90), a string ('10'-'90'), or a system status ('danger', 'info', 'success', 'warning'). |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Pill/Pill.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Pills are used for status indicators and badges — primarily for status updates, notifications and counts.

```tsx
import { IressInline, IressPill } from '@iress-oss/ids-components';

export function PillMode() {
  return (
    <IressInline gap="sm">
      <IressPill mode={10}>10</IressPill>
      <IressPill mode={20}>20</IressPill>
      <IressPill mode={30}>30</IressPill>
      <IressPill mode={40}>40</IressPill>
      <IressPill mode={50}>50</IressPill>
      <IressPill mode={60}>60</IressPill>
      <IressPill mode={70}>70</IressPill>
      <IressPill mode={80}>80</IressPill>
      <IressPill mode={90}>90</IressPill>
    </IressInline>
  );
}
```

## Design

### When to use

- **Status indicators**: Show the state of an item (active, pending, completed)
- **Notification counts**: Display unread messages or pending items
- **Badges**: Highlight "New" or "Updated" labels
- **Visual emphasis**: Draw attention to important information without requiring interaction

### When not to use

- **Interactive items** — use [Tag](../components/tag.md) if users need to click, delete, or manage selections
- **Actions** — use [Button](../components/button.md) for clickable elements
- **Navigation** — use [Link](../components/link.md) for clickable text

Pills are **informational** — they display information but are not meant to be interactive.

### Content guidelines

- Keep pill text short (1–2 words)
- Use sentence case
- Match status colour to semantic meaning (`danger` for errors, `success` for completed)

### Related patterns

- [Tag](../components/tag.md) — for interactive, removable items
- [Alert](../components/alert.md) — for longer status messages

## Develop

### Quick Start

```tsx
import { IressPill } from '@iress-oss/ids-components';

<IressPill>Label</IressPill>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs#api-props)

### Usage

#### Mode

The `mode` prop controls the colour scheme of the badge. Use data palette colours (10-90) for data visualization and non-semantic colour needs, or system status colours (`danger`, `info`, `success`, `warning`) for semantic status indication.

```tsx
import { IressInline, IressPill } from '@iress-oss/ids-components';

export function PillMode() {
  return (
    <IressInline gap="sm">
      <IressPill mode={10}>10</IressPill>
      <IressPill mode={20}>20</IressPill>
      <IressPill mode={30}>30</IressPill>
      <IressPill mode={40}>40</IressPill>
      <IressPill mode={50}>50</IressPill>
      <IressPill mode={60}>60</IressPill>
      <IressPill mode={70}>70</IressPill>
      <IressPill mode={80}>80</IressPill>
      <IressPill mode={90}>90</IressPill>
    </IressInline>
  );
}
```

#### Status

System status colours provide semantic meaning for feedback and state indication. Available options are: `danger`, `info`, `success`, and `warning`.

```tsx
import { IressInline, IressPill } from '@iress-oss/ids-components';

export function PillStatus() {
  return (
    <IressInline gap="sm">
      <IressPill mode="danger">danger</IressPill>
      <IressPill mode="info">info</IressPill>
      <IressPill mode="success">success</IressPill>
      <IressPill mode="warning">warning</IressPill>
    </IressInline>
  );
}
```

### Testing

Query pills by their text content:

```tsx
const pill = screen.getByText('Active');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the pill | `getByText('...')` | `pill` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders an inline badge with text content |
| Mode | Colour controlled by `mode` prop (data palette or status colours) |

### Accessibility

- Pills are purely visual indicators — no interactive role
- Colour is not the sole means of conveying status (text content provides meaning)
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

Pills are used for status indicators and badges — primarily for status updates, notifications and counts.

<StoryEmbed id="components-pill--mode"/>

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

<IressPill>Label</IressPill>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs#api-props)

### Usage

#### Mode

The `mode` prop controls the colour scheme of the badge. Use data palette colours (10-90) for data visualization and non-semantic colour needs, or system status colours (`danger`, `info`, `success`, `warning`) for semantic status indication.

<StoryEmbed id="components-pill--mode"/>

#### Status

System status colours provide semantic meaning for feedback and state indication. Available options are: `danger`, `info`, `success`, and `warning`.

<StoryEmbed id="components-pill--status"/>

### Testing

Query pills by their text content:

```tsx
const pill = screen.getByText('Active');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the pill | — | `pill` |

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
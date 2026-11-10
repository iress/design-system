# Panel

> Provides a sectioned container for grouping related content with an optional heading.

## Import

```tsx
import { IressPanel } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-panel--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Panel)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=panel&title=[Panel]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=panel,enhancement&title=[Panel]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Main body of the card |
| element | `div` | — | Element type to render the Card as. |
| footer | `ReactNode` | — | Section that sticks to the bottom of the card |
| heading | `ReactNode` | — | Heading slot. Often used for a title or description. |
| media | `ReactNode` | — | Section (often for an image, table or chart) that appears before the heading |
| noBorder | `boolean` | — | When set to true, the card will not have a border. This is useful to de-prioritise a card within another bordered container, such as a card within a sidebar. |
| prepend | `ReactNode` | — | Slot to the left of card content. |
| selected | `boolean` | — | When set to true, card appears selected. |
| topRight | `ReactNode` | — | Slot positioned to the top right of the card, often used for an icon or action menu |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Panel/Panel.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

A panel is used to group related content.

```tsx
<IressPanel heading="Panel Heading">
  <p>Content goes here.</p>
</IressPanel>;
```

## Design

### When to use

- **Grouping content**: Create sections within a page that share a common purpose
- **Lists of items**: Group related items together visually

### When not to use

- **Micro-content** — use [Card](../components/card.md) for smaller, self-contained items
- **Custom padding/background** — use [Styled](../components/styled.md) or styling props directly

### Related patterns

- [Card](../components/card.md) — for smaller, self-contained content blocks
- [Expander](../components/expander.md) — for collapsible content sections

## Develop

### Quick Start

```tsx
import { IressPanel } from '@iress-oss/ids-components';

<IressPanel heading="Panel Heading">Panel content</IressPanel>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-panel--docs#api-props)

### Usage

`IressPanel` uses `IressCard` under the hood, so it inherits all of the same props and styling options. It is purely a semantic component that provides a more specific name for grouping related content together.

### Testing

`IressPanel` is a layout container. Query by `data-testid` or target its
children directly:

```tsx
const panel = screen.getByTestId('my-panel');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the panel | — | `panel` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-panel--docs)

## Specifications

### Behaviour

A semantic wrapper around `IressCard` for grouping related content. Inherits all Card props and styling.
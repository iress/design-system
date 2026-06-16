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

A panel is used to group related content.

<StoryEmbed id="components-panel--default"/>

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

<IressPanel heading="Panel Heading">
  Panel content
</IressPanel>
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
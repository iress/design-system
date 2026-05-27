# Panel
A panel is used to group related content.
> **Component:** `import { IressPanel } from '@iress-oss/ids-components'`
> **Storybook:** [Panel in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-panel--docs)```tsx
```

## Quick Start

```tsx
<IressPanel heading="Panel Heading">
  text
</IressPanel>
```

## Usage

`IressPanel` uses `IressCard` under the hood, so it inherits all of the same props and styling options. It is purely a semantic component that provides a more specific name for grouping related content together.

[View the API documentation for `IressCard`](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-card--docs)

### When to use

Panels are used to group related content. They can be used to create sections within a page, as well as group lists of items together.

- If you need to display micro-content, use [IressCard](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-card--docs) instead.
- If you need to add padding or a background to a section of content, use [IressStyled](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-styled--docs) or [styling props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-reference--docs) on the component itself.
- Otherwise, use `IressPanel` to group related content together.

## Testing

`IressPanel` is a layout container. Query by `data-testid` or target its
children directly:

```tsx
const panel = screen.getByTestId('my-panel');
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-panel--docs)

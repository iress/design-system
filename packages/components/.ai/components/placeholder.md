# Placeholder
A placeholder is a UI element that allows you to reserve space for content that has not been created yet, usually used for prototyping.
> **Component:** `import { IressPlaceholder } from '@iress-oss/ids-components'`
> **Storybook:** [Placeholder in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-placeholder--docs)```tsx
```

## Quick Start

```tsx
<IressPlaceholder heading="Placeholder" width={300} height={300}>
  This should be a description of the expected content
</IressPlaceholder>
```

## Usage

The `IressPlaceholder` component is a **last resort** component, as it provides very little context to the product team and/or user about what content will be placed in the placeholder.

It is recommended to use placeholders that emulate the content that will be placed in the placeholder, such as images or text that is similar to the final content. This will help the product team and/or user understand what to expect in the final product.

## Testing

`IressPlaceholder` is a visual placeholder. Query by `data-testid`:

```tsx
const placeholder = screen.getByTestId('my-placeholder');
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-placeholder--docs)

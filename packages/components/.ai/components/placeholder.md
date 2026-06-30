# Placeholder

> Renders a visual placeholder to represent future or missing content.

## Import

```tsx
import { IressPlaceholder } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-placeholder--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Placeholder)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=placeholder&title=[Placeholder]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=placeholder,enhancement&title=[Placeholder]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Description of the placeholder's envisioned contents. |
| heading | `ReactNode` | — | Title for the placeholder content. |
| height | `number, string ` | `auto` | Sets the height of the placeholder. |
| stretch | `boolean` | — | Sets the placeholder to be full width if true. |
| width | `number, string ` | `auto` | Sets the width of the placeholder. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Placeholder/Placeholder.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

A placeholder is a UI element that allows you to reserve space for content that has not been created yet, usually used for prototyping.

```tsx
<IressPlaceholder heading="Placeholder" width="300" height="300">
  This should be a description of the expected content
</IressPlaceholder>;
```

## Design

### When to use

- **Prototyping**: Reserve space for content not yet designed or built
- **Layout testing**: Visualise how content will fill available space

### When not to use

- **Production UIs** — placeholders are a development/prototyping aid, not a user-facing component
- **Loading states** — use [Skeleton](../components/skeleton.md) instead

### Related patterns

- [Skeleton](../components/skeleton.md) — for loading state placeholders in production UIs

## Develop

### Quick Start

```tsx
import { IressPlaceholder } from '@iress-oss/ids-components';

<IressPlaceholder heading="Placeholder" width={300} height={300}>
  This should be a description of the expected content
</IressPlaceholder>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-placeholder--docs#api-props)

### Usage

The `IressPlaceholder` component is a **last resort** component, as it provides very little context to the product team and/or user about what content will be placed in the placeholder.

It is recommended to use placeholders that emulate the content that will be placed in the placeholder, such as images or text that is similar to the final content. This will help the product team and/or user understand what to expect in the final product.

### Testing

`IressPlaceholder` is a visual placeholder. Query by `data-testid`:

```tsx
const placeholder = screen.getByTestId('my-placeholder');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the placeholder | `getByText('...')` | `placeholder` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-placeholder--docs)

## Specifications

### Behaviour

Renders a visual box with configurable width, height, heading, and description text. Development/prototyping aid only.
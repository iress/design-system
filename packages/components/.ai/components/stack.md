# Stack

> Lays out children vertically with consistent spacing between items.

## Import

```tsx
import { IressStack } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-stack--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Stack)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=stack&title=[Stack]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=stack,enhancement&title=[Stack]+Feature:+)

Use IressStack to control vertical spacing between content with consistent preset values.

```tsx
<IressStack gap="spacing.1">
  <IressPlaceholder height="50" />
  <IressPlaceholder height="50" />
  <IressPlaceholder height="50" />
</IressStack>;
```

## Design

### When to use

- **Vertical spacing**: Apply consistent vertical gaps between content blocks
- **Form layouts**: Stack fields vertically with even spacing
- **Section spacing**: Space content sections within a page

### When not to use

- **Horizontal layout** — use [Inline](../components/inline.md) instead
- **Grid columns** — use [Row](../components/row.md) + [Col](../components/col.md)

### Related patterns

- [Inline](../components/inline.md) — horizontal equivalent
- [Row](../components/row.md) + [Col](../components/col.md) — grid-based layout

## Develop

### Quick Start

```tsx
import { IressStack } from '@iress-oss/ids-components';

<IressStack gap="spacing.4">
  <p>Item 1</p>
  <p>Item 2</p>
</IressStack>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-stack--docs#api-props)

### Usage

#### Gap

Vertical spacing is applied to the direct children of the `IressStack` component. The amount of spacing is controlled by the gap prop which accepts from `spacing.0` to `spacing.10`.

##### What happened to `gutter`?

The previous `gutter` prop has been replaced by `gap`, which uses the latest set of spacing tokens. In terms of how it is used to space items inside the `IressStack` component, it is now directly mapped to the [CSS gap property](https://developer.mozilla.org/en-US/docs/Web/CSS/gap), which may change how your application is spaced. For most cases, there should be no change.

```tsx
<IressStack gap="spacing.4">
  <IressText element="h3">spacing.1</IressText>
  <IressStack gap="spacing.1">
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
  </IressStack>
  <IressText element="h3">spacing.4</IressText>
  <IressStack gap="spacing.4">
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
  </IressStack>
  <IressText element="h3">spacing.8</IressText>
  <IressStack gap="spacing.8">
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
  </IressStack>
</IressStack>;
```

#### Responsive gap

The `gap` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

```tsx
<IressStack
  gap={{
    xs: 'spacing.1',
    sm: 'spacing.2',
    md: 'spacing.4',
  }}
>
  <IressPlaceholder height="50" />
  <IressPlaceholder height="50" />
  <IressPlaceholder height="50" />
</IressStack>;
```

#### Inline children

The stack component will treat the direct children as a block element. If you want to wrap some items to display them inline, wrap them with `IressInline`.

In the example below: `IressButton` are inline because of wrapped by `IressInline`.

```tsx
<IressStack gap="spacing.4">
  <IressPanel bg="alt">Panel 1 (block)</IressPanel>
  <span>I am a block span with the same margin</span>
  <IressPanel bg="alt">Panel 2 (block)</IressPanel>
</IressStack>;
```

#### Lists

`IressStack` can also apply gap between the list items by using the new `element` (e.g. `ul`) prop.

```tsx
<IressStack gap="spacing.7" element="ul">
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</IressStack>;
```

#### Vertical alignment

The `verticalAlign` prop controls how content is positioned vertically within the stack. It accepts six values: `top`, `middle`, `bottom`, `between`, `around`, and `evenly`.

Use `top`, `middle`, or `bottom` to align items within the available space, and `between`, `around`, or `evenly` to distribute extra vertical space between items (similar to `space-between`, `space-around`, and `space-evenly` in CSS flexbox).

```tsx
<IressPanel style={{ height: '300px' }}>
  <IressStack gap="spacing.4" verticalAlign="bottom" stretch>
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
    <IressPlaceholder height="50" />
  </IressStack>
</IressPanel>;
```

### Testing

`IressStack` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const stack = screen.getByTestId('my-stack');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the stack | — | `stack` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-stack--docs)

## Specifications

### Behaviour

A CSS flexbox column wrapper with configurable gap, vertical alignment, and optional `element` prop for rendering as a list.
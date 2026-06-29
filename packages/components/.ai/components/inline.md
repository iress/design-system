# Inline

> Lays out children horizontally with consistent spacing between items.

## Import

```tsx
import { IressInline } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inline--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Inline)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=inline&title=[Inline]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=inline,enhancement&title=[Inline]+Feature:+)

IressInline renders a set of components in a row with equal spacing around them, wrapping onto multiple lines when necessary.

```tsx
<IressInline gap="spacing.4">
  <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
</IressInline>;
```

## Design

### When to use

- **Horizontal layout**: Arrange items in a row with consistent spacing
- **Wrapping content**: Items that should wrap to the next line when space runs out
- **Button rows**: Group buttons or links horizontally

### When not to use

- **Grid columns** — use [Row](../components/row.md) + [Col](../components/col.md) for proportional grid layouts
- **Vertical spacing** — use [Stack](../components/stack.md) instead

### Related patterns

- [Stack](../components/stack.md) — vertical equivalent
- [Row](../components/row.md) + [Col](../components/col.md) — grid-based layout

## Develop

### Quick Start

```tsx
import { IressInline } from '@iress-oss/ids-components';

<IressInline gap="spacing.4">
  <span>Item 1</span>
  <span>Item 2</span>
</IressInline>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inline--docs#api-props)

### Usage

#### Gap

Inline spacing is applied to the direct children of the `IressInline` component.

The amount of spacing is controlled by the `gap` prop and can be set from `spacing.0` to `spacing.10`.

##### What happened to `gutter`?

The previous `gutter` prop has been replaced by `gap`, which uses the latest set of spacing tokens.

The existing `gutter` values are still supported, as they are now aliases for the spacing tokens.

```tsx
<IressStack gap="spacing.10">
  <IressText element="h3">spacing.1</IressText>
  <IressInline gap="spacing.1">
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  </IressInline>
  <IressText element="h3">spacing.4</IressText>
  <IressInline gap="spacing.4">
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  </IressInline>
  <IressText element="h3">spacing.8</IressText>
  <IressInline gap="spacing.8">
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  </IressInline>
</IressStack>;
```

#### Responsive gap

The `gap` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

```tsx
<IressInline
  gap={{
    xs: 'spacing.1',
    sm: 'spacing.2',
    md: 'spacing.4',
  }}
>
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
</IressInline>;
```

#### Horizontal align

Horizontal alignment of the children is controlled by the `horizontalAlign` prop. It defaults to left and can be set to the following:

- `around` - space is distributed so each direct child has the same space on the left and on the right. This means that the gap between children is twice as large as the gap between the first / last items and the edges of the container, because the gap between children is comprised one child's spacing right plus the next child's spacing left.
- `between` - space is distributed evenly between direct children, but the first and last children sit tight to the edges of the container.
- `center` - children are aligned center, similar to `text-align: center`.
- `evenly` - space is distributed evenly between direct children.
- `left` - children are aligned left, similar to `text-align: left`.
- `right` - children are aligned right, similar to `text-align: right`.

```tsx
<IressContainer>
  <IressStack gap="spacing.10">
    <IressText element="h3">left</IressText>
    <IressInline gap="spacing.2" horizontalAlign="left">
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
    <IressText element="h3">center</IressText>
    <IressInline gap="spacing.2" horizontalAlign="center">
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
    <IressText element="h3">right</IressText>
    <IressInline gap="spacing.2" horizontalAlign="right">
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
    <IressText element="h3">between</IressText>
    <IressInline gap="spacing.2" horizontalAlign="between">
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
    </IressInline>
  </IressStack>
</IressContainer>;
```

#### Vertical align

Vertical alignment of the children is controlled by the `verticalAlign` prop. It defaults to top and can be set to the following:

- `bottom` - children are aligned to the bottom of the container.
- `middle` - children are aligned to the middle of the container.
- `stretch` - each direct child stretches to the full height of the inline container.
- `top` - children are aligned to the top of the container.

```tsx
<IressContainer>
  <IressStack gap="spacing.10">
    <IressText element="h3">top</IressText>
    <IressInline gap="spacing.2" horizontalAlign="center" verticalAlign="top">
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
    <IressText element="h3">middle</IressText>
    <IressInline
      gap="spacing.2"
      horizontalAlign="center"
      verticalAlign="middle"
    >
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
    <IressText element="h3">bottom</IressText>
    <IressInline
      gap="spacing.2"
      horizontalAlign="center"
      verticalAlign="bottom"
    >
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
    <IressText element="h3">stretch</IressText>
    <IressInline
      gap="spacing.2"
      horizontalAlign="center"
      verticalAlign="stretch"
    >
      <IressPlaceholder width="50" style={{ minHeight: '30px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
      <IressPlaceholder width="50" style={{ minHeight: '40px' }} />
    </IressInline>
  </IressStack>
</IressContainer>;
```

#### No wrap

The `IressInline` component automatically wraps children. There may be some scenarios where you do not require children to be wrapped. For this you can use the `noWrap` prop.

```tsx
<IressInline gap="spacing.4" noWrap>
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
  <IressPlaceholder width="50" style={{ minHeight: '50px' }} />
</IressInline>;
```

### Testing

`IressInline` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const inline = screen.getByTestId('my-inline');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the inline | — | `inline` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inline--docs)

## Specifications

### Behaviour

A CSS flexbox row wrapper with configurable gap, alignment, and wrapping behaviour.
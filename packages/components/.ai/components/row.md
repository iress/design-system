# Row

> Arranges children in a horizontal row within a grid or flex layout.

## Import

```tsx
import { IressRow } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Row)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=row&title=[Row]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=row,enhancement&title=[Row]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Any content you would like to be contained. Best used with `IressCol`. |
| gutter | `[ResponsiveProp](../../dist/types.d.ts)<[PositiveSpacingToken](../../dist/types.d.ts)>` | — | Sets the gap between the children `<IressCol />` components. |
| horizontalAlign | `any` | `left` | Horizontal alignment, follows flexbox justify-content |
| rowGap | `[ResponsiveProp](../../dist/types.d.ts)<[PositiveSpacingToken](../../dist/types.d.ts)>` | — | Sets the size of the top and bottom gap between direct children when they begin to wrap. @see https://developer.mozilla.org/docs/Web/CSS/row-gap |
| verticalAlign | `any` | `top` | Vertical alignment, follows flexbox align-items |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Row/Row.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

Used in conjunction with the IressCol component to lay out page content.

```tsx
<IressRow gutter="spacing.7" horizontalAlign="left" verticalAlign="top">
  <IressCol span={4}>
    <IressPlaceholder>Column 1</IressPlaceholder>
  </IressCol>
  <IressCol span={4}>
    <IressPlaceholder>Column 2</IressPlaceholder>
  </IressCol>
  <IressCol span={4}>
    <IressPlaceholder>Column 3</IressPlaceholder>
  </IressCol>
</IressRow>;
```

## Design

### When to use

- **Grid layouts**: Create multi-column layouts with `IressCol` children
- **Responsive grids**: Columns that reflow at different breakpoints

### When not to use

- **Simple horizontal lists** — use [Inline](../components/inline.md) instead
- **Without Col children** — Row is designed to work with `IressCol`

### Related patterns

- [Col](../components/col.md) — column children for the row grid
- [Container](../components/container.md) — centres and pads the page
- [Inline](../components/inline.md) — simpler horizontal layout

## Develop

### Quick Start

```tsx
import { IressRow, IressCol } from '@iress-oss/ids-components';

<IressRow>
  <IressCol span="6">Left</IressCol>
  <IressCol span="6">Right</IressCol>
</IressRow>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs#api-props)

### Usage

`IressRow` supports visual hierarchy by allowing you to add multiple columns in your layout, allowing the user to see more content on the screen at the same time.

It works best alongside the `IressContainer` and `IressCol` components.

#### Gutter

The spacing between columns is controlled by the `gutter` prop. To change the spacing between multiple columns once the row wraps, you can use the `rowGrap` prop.

Note: The `gutter` prop only works with `IressCol` components. If you are using other components, please use the `IressInline` component instead.

```tsx
<IressStack maxWidth="container.xl" gap="xl">
  <IressText element="h3">spacing.2</IressText>
  <IressRow gutter="spacing.2">
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter textAlign="center" className="iress-p--md">
          1 of 4<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>2 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>3 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>4 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressDivider mb="xl" />
  <IressText element="h3">spacing.4</IressText>
  <IressRow gutter="spacing.4">
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter textAlign="center" className="iress-p--md">
          1 of 4<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>2 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>3 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>4 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressDivider mb="xl" />
  <IressText element="h3">spacing.7</IressText>
  <IressRow gutter="spacing.7">
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter textAlign="center" className="iress-p--md">
          1 of 4<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>2 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>3 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>4 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Responsive Gutter

The `gutter` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

```tsx
<IressContainer>
  <IressRow
    gutter={{
      xs: 'spacing.1',
      sm: 'spacing.2',
      md: 'spacing.4',
      lg: 'spacing.7',
      xl: 'spacing.10',
      xxl: 'spacing.1',
    }}
  >
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter textAlign="center" className="iress-p--md">
          1 of 4<br />
          <small>Slightly taller</small>
        </IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>2 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>3 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
    <IressCol span={6}>
      <IressPlaceholder>
        <IressText noGutter>4 of 4</IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
</IressContainer>;
```

#### Horizontal alignment

`IressRow` can be set to align horizontally using the `horizontalAlign` prop.

```tsx
<IressContainer>
  <IressStack gap="md">
    <IressText element="h3">left</IressText>
    <IressRow horizontalAlign="left">
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">center</IressText>
    <IressRow horizontalAlign="center">
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">right</IressText>
    <IressRow horizontalAlign="right">
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">between</IressText>
    <IressRow horizontalAlign="between">
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol span={2}>
        <IressPlaceholder>
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
  </IressStack>
</IressContainer>;
```

#### Vertical alignment

`IressRow` can be set to align vertically using the `verticalAlign` prop.

```tsx
<IressContainer>
  <IressStack gap="md">
    <IressText element="h3">top</IressText>
    <IressRow style={{ height: '10rem' }} verticalAlign="top">
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">middle</IressText>
    <IressRow style={{ height: '10rem' }} verticalAlign="middle">
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">bottom</IressText>
    <IressRow style={{ height: '10rem' }} verticalAlign="bottom">
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
    <IressText element="h3">stretch</IressText>
    <IressRow style={{ height: '10rem' }} verticalAlign="stretch">
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>1 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>2 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
      <IressCol>
        <IressPlaceholder height="100%">
          <IressText noGutter>3 of 3</IressText>
        </IressPlaceholder>
      </IressCol>
    </IressRow>
  </IressStack>
</IressContainer>;
```

### Testing

`IressRow` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const row = screen.getByTestId('my-row');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the row | — | `row` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-row--docs)

## Specifications

### Behaviour

A CSS grid row container. Supports `gutter`, `horizontalAlign`, and `verticalAlign` props with responsive object values.

| Breakpoint | Screen Widths |
|------------|---------------|
| `xs` | 0 - 575px |
| `sm` | 576px - 767px |
| `md` | 768px - 1023px |
| `lg` | 1024px - 1279px |
| `xl` | 1280px - 1599px |
| `xxl` | 1600px and above |
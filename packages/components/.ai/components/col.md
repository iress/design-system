# Col

> Defines a column within a grid row layout.

## Import

```tsx
import { IressCol } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Col)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=col&title=[Col]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=col,enhancement&title=[Col]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| alignSelf | `center`, `end` , `start` , `stretch`  | — | Individual alignment of column |
| children | `ReactNode` | — | Any content you would like to be contained in a column. |
| offset | `[ResponsiveProp](../../dist/types.d.ts)<0 | 4 | "1" | 6 | 1 | "0" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | 2 | 3 | 5 | 7 | 8 | 9 | 10 | 11>` | — | Number of columns to offset. |
| span | `[ResponsiveProp](../../dist/types.d.ts)<4 | "1" | "auto" | 12 | 6 | 1 | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | 2 | 3 | 5 | 7 | 8 | 9 | 10 | 11 | "12">` | `auto` | Number of columns to span. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Col/Col.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Used in conjunction with the IressRow component to layout page content.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol>
      <IressPlaceholder>1 of 2</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>2 of 2</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol>
      <IressPlaceholder>1 of 3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>2 of 3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>3 of 3</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

## Design

### When to use

- **Grid layouts**: Divide content into columns within an `IressRow`
- **Responsive layouts**: Adjust column widths at different breakpoints. There are suggested max columns to show at each breakpoint (visible via the Specifications), but these are not hard rules. Use your judgement to determine the best layout for your content and users.

### When not to use

- **Simple horizontal spacing** — use [Inline](../components/inline.md) instead
- **Without a Row** — `IressCol` must be a direct child of `IressRow`

### Related patterns

- [Row](../components/row.md) — parent container for columns
- [Container](../components/container.md) — centres and pads page content
- [Inline](../components/inline.md) — simpler horizontal layout without grid semantics

## Develop

### Quick Start

```tsx
import { IressRow, IressCol } from '@iress-oss/ids-components';

<IressRow>
  <IressCol span="6">Left</IressCol>
  <IressCol span="6">Right</IressCol>
</IressRow>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs#api-props)

### Usage

#### Auto-sized

When no column widths are specified the `IressCol` component will render equal width columns.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol>
      <IressPlaceholder>1 of 2</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>2 of 2</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol>
      <IressPlaceholder>1 of 3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>2 of 3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>3 of 3</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Span

The `span` prop controls the number of grid columns the component should span.

If no `span` is provided it will default to `auto` which will make the column either fill the remaining space in the row (when used with a col number) or size evenly when used with other columns set to auto sizing.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol span="12">
      <IressPlaceholder>12</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="1">
      <IressPlaceholder>1</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>11</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="2">
      <IressPlaceholder>2</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>10</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="3">
      <IressPlaceholder>3</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>9</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="4">
      <IressPlaceholder>4</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>8</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="5">
      <IressPlaceholder>5</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>7</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol span="6">
      <IressPlaceholder>6</IressPlaceholder>
    </IressCol>
    <IressCol>
      <IressPlaceholder>6</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Responsive span

The `span` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints. Any missing keys will fall back to the value defined for the next smallest key.

**Note:** If a `span` prop is provided an object but no value is given for `xs` it will default to `12`. This means that columns will be full width on screen sizes below the sizes you've specified.

```tsx
import {
  IressCol,
  IressRow,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function ColResponsiveSpan() {
  return (
    <IressStack gap="spacing.4">
      <IressRow>
        <IressCol span={{ xs: 12, md: 3 }}>
          <IressText>Sidebar (full width on mobile, 3/12 on desktop)</IressText>
        </IressCol>
        <IressCol span={{ xs: 12, md: 9 }}>
          <IressText>
            Main content (full width on mobile, 9/12 on desktop)
          </IressText>
        </IressCol>
      </IressRow>
    </IressStack>
  );
}
```

#### Offset

The `offset` prop controls the amount of grid columns to offset.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol offset="1">
      <IressPlaceholder>1</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="2">
      <IressPlaceholder>2</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="3">
      <IressPlaceholder>3</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="4">
      <IressPlaceholder>4</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="5">
      <IressPlaceholder>5</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="6">
      <IressPlaceholder>6</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="7">
      <IressPlaceholder>7</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="8">
      <IressPlaceholder>8</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="9">
      <IressPlaceholder>9</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="10">
      <IressPlaceholder>10</IressPlaceholder>
    </IressCol>
  </IressRow>
  <IressRow>
    <IressCol offset="11">
      <IressPlaceholder>11</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Responsive offset

When a `ResponsiveSizing` object is passed into the `offset` prop, the offset will change at the specified breakpoints. It will apply to all breakpoints above the specified breakpoint.

For example, if you specify an offset for `md`, it will apply to `lg`, `xl` and `xxl` as well. If you want to change the offset at a specific breakpoint, you can pass in an object with the breakpoint as the key and the offset as the value.

```tsx
<IressStack gap="spacing.4">
  <IressRow>
    <IressCol offset={{ md: 5, lg: 2 }}>
      <IressPlaceholder>
        <IressText textAlign="center">
          offset: {'{'} md: 5, lg: 2 {'}'}
        </IressText>
      </IressPlaceholder>
    </IressCol>
  </IressRow>
</IressStack>;
```

#### Align self

The `alignSelf` prop controls the vertical alignment of the column (use if column alignment needs to differ from other columns in the row).

```tsx
<IressContainer>
  <IressRow
    style={{ border: '1px dashed hsl(43deg 100% 45%)', height: '10rem' }}
  >
    <IressCol alignSelf="start">
      <IressPlaceholder>Start</IressPlaceholder>
    </IressCol>
    <IressCol alignSelf="center">
      <IressPlaceholder>Center</IressPlaceholder>
    </IressCol>
    <IressCol alignSelf="end">
      <IressPlaceholder>End</IressPlaceholder>
    </IressCol>
    <IressCol alignSelf="stretch">
      <IressPlaceholder stretch>Stretch</IressPlaceholder>
    </IressCol>
  </IressRow>
</IressContainer>;
```

### Testing

`IressCol` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const col = screen.getByTestId('my-col');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the col | — | `col` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-col--docs)

## Specifications

### Behaviour

A CSS grid column wrapper. Supports `span`, `offset`, and `alignSelf` props with responsive object values.

| Breakpoint | Screen Widths |
|------------|---------------|
| `xs` | 0 - 575px |
| `sm` | 576px - 767px |
| `md` | 768px - 1023px |
| `lg` | 1024px - 1279px |
| `xl` | 1280px - 1599px |
| `xxl` | 1600px and above |
# Col

Used in conjunction with the IressRow component to layout page content

> **Component:** `import { IressCol } from '@iress-oss/ids-components'`
> **Storybook:** [Col in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-col--docs)

## Quick Start

```tsx
import { IressCol } from '@iress-oss/ids-components';

<IressCol numberOfColumns={2} />
```

## Examples

### Auto-sized

When no column widths are specified the `IressCol` component will render equal width columns.

```tsx
<IressStack gap="spacing.4">
<IressRow {...row}>
<IressCol {...column}>
<IressPlaceholder>1 of 2</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>2 of 2</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column}>
<IressPlaceholder>1 of 3</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>2 of 3</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>3 of 3</IressPlaceholder>
</IressCol>
</IressRow>
</IressStack>
```

[View "AutoSized" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-col--auto-sized)

### Span

The `span` prop controls the number of grid columns the component should span.

If no `span` is provided it will default to `auto` which will make the column either fill the remaining space in the row (when used with a col number) or size evenly when used with other columns set to auto sizing.

```tsx
<IressStack gap="spacing.4">
<IressRow {...row}>
<IressCol {...column} span="12">
<IressPlaceholder>12</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} span="1">
<IressPlaceholder>1</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>11</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} span="2">
<IressPlaceholder>2</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>10</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} span="3">
<IressPlaceholder>3</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>9</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} span="4">
<IressPlaceholder>4</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>8</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} span="5">
<IressPlaceholder>5</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>7</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} span="6">
<IressPlaceholder>6</IressPlaceholder>
</IressCol>
<IressCol {...column}>
<IressPlaceholder>6</IressPlaceholder>
</IressCol>
</IressRow>
</IressStack>
```

[View "Span" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-col--span)

### Responsive span

The `span` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints. Any missing keys will fall back to the value defined for the next smallest key.

**Note:** If a `span` prop is provided an object but no value is given for `xs` it will default to `12`. This means that columns will be full width on screen sizes below the sizes you've specified.

```tsx
<IressStack gap="spacing.4">
<IressPanel>
Current breakpoint: <CurrentBreakpoint />.
</IressPanel>

<IressRow {...row}>
{columns.map((column, index) => (
<IressCol {...columnProps} {...column} key={index}>
<IressPlaceholder>
<IressText textAlign="center">
Column {index + 1}
<br />
{column.span && JSON.stringify(column.span)}
</IressText>
</IressPlaceholder>
</IressCol>
))}
</IressRow>
</IressStack>
```

[View "ResponsiveSpan" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-col--responsive-span)

### Offset

The `offset` prop controls the amount of grid columns to offset.

```tsx
<IressStack gap="spacing.4">
<IressRow {...row}>
<IressCol {...column} offset="1">
<IressPlaceholder>1</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="2">
<IressPlaceholder>2</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="3">
<IressPlaceholder>3</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="4">
<IressPlaceholder>4</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="5">
<IressPlaceholder>5</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="6">
<IressPlaceholder>6</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="7">
<IressPlaceholder>7</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="8">
<IressPlaceholder>8</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="9">
<IressPlaceholder>9</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="10">
<IressPlaceholder>10</IressPlaceholder>
</IressCol>
</IressRow>
<IressRow {...row}>
<IressCol {...column} offset="11">
<IressPlaceholder>11</IressPlaceholder>
</IressCol>
</IressRow>
</IressStack>
```

[View "Offset" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-col--offset)

### Responsive offset

When a `ResponsiveSizing` object is passed into the `offset` prop, the offset will change at the specified breakpoints. It will apply to all breakpoints above the specified breakpoint.

For example, if you specify an offset for `md`, it will apply to `lg`, `xl` and `xxl` as well. If you want to change the offset at a specific breakpoint, you can pass in an object with the breakpoint as the key and the offset as the value.

```tsx
<IressStack gap="spacing.4">
<IressPanel>
Current breakpoint: <CurrentBreakpoint />.
</IressPanel>

<IressRow {...row}>
{columns.map((column, index) => (
<IressCol {...columnProps} {...column} key={index}>
<IressPlaceholder>
<IressText textAlign="center">
Column {index + 1}
<br />
{column.offset && JSON.stringify(column.offset)}
</IressText>
</IressPlaceholder>
</IressCol>
))}
</IressRow>
</IressStack>
```

[View "ResponsiveOffset" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-col--responsive-offset)

### Align self

The `alignSelf` prop controls the vertical alignment of the column (use if column alignment needs to differ from other columns in the row).

```tsx
<IressContainer>
<IressRow
{...row}
style={{ border: '1px dashed hsl(43deg 100% 45%)', height: '10rem' }}
>
<IressCol {...column} alignSelf="start">
<IressPlaceholder>Start</IressPlaceholder>
</IressCol>
<IressCol {...column} alignSelf="center">
<IressPlaceholder>Center</IressPlaceholder>
</IressCol>
<IressCol {...column} alignSelf="end">
<IressPlaceholder>End</IressPlaceholder>
</IressCol>
<IressCol {...column} alignSelf="stretch">
<IressPlaceholder stretch>Stretch</IressPlaceholder>
</IressCol>
</IressRow>
</IressContainer>
```

[View "AlignSelf" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-col--align-self)

## Testing

`IressCol` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const col = screen.getByTestId('my-col');
```

## Props

- **Type:** `IressColProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Col/Col.d.ts`

```typescript
import type { IressColProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-col--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-col--docs)*

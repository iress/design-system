# 
> **Component:** `import { IressRow } from '@iress-oss/ids-components'`
> **Storybook:** [ in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-row--docs)```tsx
```

## Quick Start

```tsx
<IressRow gutter="spacing.7" horizontalAlign="left" verticalAlign="top" />
```

## Usage

`IressRow` supports visual hierarchy by allowing you to add multiple columns in your layout, allowing the user to see more content on the screen at the same time.

It works best alongside the `IressContainer` and `IressCol` components.

### Gutter

The spacing between columns is controlled by the `gutter` prop. To change the spacing between multiple columns once the row wraps, you can use the `rowGrap` prop.

Note: The `gutter` prop only works with `IressCol` components. If you are using other components, please use the `IressInline` component instead.

```tsx
<IressStack maxWidth="container.xl" gap="xl">
{SPACING_AND_ALIAS_TOKENS.map((spacing, index) => {
return (
<IressText key={spacing}>
{index> 0 && <IressDivider mb="xl" />}
<h2>Gutter: {spacing}</h2>
<IressRow gutter={spacing as never} />
</IressText>
);
})}
</IressStack>
```

[View "Gutter" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-row--gutter)

### Responsive Gutter

The `gutter` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

```tsx
<IressContainer>
<IressStack gap="md">
<IressPanel bg="alt">
Current breakpoint: <CurrentBreakpoint />
</IressPanel>
<IressRow />
</IressStack>
</IressContainer>
```

[View "ResponsiveGutter" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-row--responsive-gutter)

### Alignment

### Horizontal alignment

`IressRow` can be set to align horizontally using the `horizontalAlign` prop.

```tsx
<IressContainer>
<IressStack gap="md">
{HORIZONTAL_ALIGNS.map((horizontalAlign, index) => (
<IressText key={horizontalAlign}>
{index !== 0 && <IressDivider mb="md" />}
<h2>Horizontal align: {horizontalAlign}</h2>
<IressRow horizontalAlign={horizontalAlign}
key={horizontalAlign}
/>
</IressText>
))}
</IressStack>
</IressContainer>
```

[View "HorizontalAlignment" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-row--horizontal-alignment)

### Vertical alignment

`IressRow` can be set to align vertically using the `verticalAlign` prop.

```tsx
<IressContainer>
<IressStack gap="md">
{VERTICAL_ALIGNS.map((verticalAlign) => (
<div key={verticalAlign}>
<IressText element="h2">Vertical align: {verticalAlign}</IressText>
<IressRow
style={{
height: '10rem',
border: `1px solid ${cssVars.colour.neutral[30]}`,
}} verticalAlign={verticalAlign}
/>
</div>
))}
</IressStack>
</IressContainer>
```

[View "VerticalAlignment" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-row--vertical-alignment)

## Testing

`IressRow` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const row = screen.getByTestId('my-row');
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-row--docs)

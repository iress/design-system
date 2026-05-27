# Inline

IressInline renders a set of components in a row with equal spacing around them, wrapping onto multiple lines when necessary.

> **Component:** `import { IressInline } from '@iress-oss/ids-components'`
> **Storybook:** [Inline in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-inline--docs)

## Quick Start

```tsx
import { IressInline } from '@iress-oss/ids-components';

<IressInline gap="spacing.4">
  uneven
</IressInline>
```

## Examples

### Gap

Inline spacing is applied to the direct children of the `IressInline` component.

The amount of spacing is controlled by the `gap` prop and can be set from `spacing.0` to `spacing.10`.

#### What happened to `gutter`?

The previous `gutter` prop has been replaced by `gap`, which uses the latest set of spacing tokens.

The existing `gutter` values are still supported, as they are now aliases for the spacing tokens.

```tsx
<IressStack gap="spacing.10">
{SPACING_AND_ALIAS_TOKENS.map((spacing) => (
<IressText key={spacing}>
<h2>{spacing}</h2>
<IressInline gap={spacing as never} />
</IressText>
))}
</IressStack>
```

[View "Gap" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-inline--gap)

### Responsive gap

The `gap` prop can take an object that takes five key/value pairs that correlate with the IDS breakpoints.

```tsx
<IressStack gap="spacing.4">
<IressPanel>
<p>
Current breakpoint: <CurrentBreakpoint />.
</p>
<p>
<code>gap=&#123;{JSON.stringify(args.gap)}&#125;</code>
</p>
</IressPanel>
<IressInline />
</IressStack>
```

[View "ResponsiveGap" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-inline--responsive-gap)

### Horizontal align

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
{HORIZONTAL_ALIGNS.map((horizontalAlign) => (
<IressText key={horizontalAlign}>
<h2>{horizontalAlign}</h2>
<IressInline horizontalAlign={horizontalAlign} />
</IressText>
))}
</IressStack>
</IressContainer>
```

[View "HorizontalAlign" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-inline--horizontal-align)

### Vertical align

Vertical alignment of the children is controlled by the `verticalAlign` prop. It defaults to top and can be set to the following:

- `bottom` - children are aligned to the bottom of the container.
- `middle` - children are aligned to the middle of the container.
- `stretch` - each direct child stretches to the full height of the inline container.
- `top` - children are aligned to the top of the container.

```tsx
<IressContainer>
<IressStack gap="spacing.10">
{VERTICAL_ALIGNS.map((verticalAlign) => (
<IressText key={verticalAlign} textAlign="center">
<h2>{verticalAlign}</h2>
<IressInline verticalAlign={verticalAlign} />
</IressText>
))}
</IressStack>
</IressContainer>
```

[View "VerticalAlign" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-inline--vertical-align)

### No wrap

The `IressInline` component automatically wraps children. There may be some scenarios where you do not require children to be wrapped. For this you can use the `noWrap` prop.

```tsx
<IressInline gap="spacing.10" noWrap>
  story
</IressInline>
```

[View "NoWrap" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-inline--no-wrap)

## Testing

`IressInline` is a layout primitive with no semantic role. Target its children
directly or use a `data-testid`:

```tsx
const inline = screen.getByTestId('my-inline');
```

## Props

- **Type:** `IressInlineProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Inline/Inline.d.ts`

```typescript
import type { IressInlineProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-inline--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-inline--docs)*

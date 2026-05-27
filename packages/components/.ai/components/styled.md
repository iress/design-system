# Styled
The IressStyled component provides an unopinionated wrapper that gives you direct access to all supported styling properties. Use it when you need custom styling without creating a dedicated component or writing custom CSS.
> **Component:** `import { IressStyled } from '@iress-oss/ids-components'`
> **Storybook:** [Styled in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-styled--docs)```tsx
```

## Quick Start

```tsx
<IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
  This is styled content using Panda CSS
</IressStyled>
```

## Usage

### The `element` prop

With the `element` prop you can select which HTML element the component should render as. It renders as a `div` by default, but can be set to any standard HTML element like `section`, `article`, `aside`, `nav`, `main`, `header`, `footer`, or `span`.

This allows you to maintain proper semantic HTML structure while applying custom styling.

```tsx
<IressStack gap="spacing.3">
<IressStyled element="section"
p="spacing.4"
bg="colour.neutral.20"
borderRadius="radius.2"
>
<IressText element="h3">Section Element</IressText>
<IressText>This is rendered as a section element.</IressText>
</IressStyled>

<IressStyled element="article"
p="spacing.4"
bg="colour.neutral.20"
borderRadius="radius.2"
>
<IressText element="h3">Article Element</IressText>
<IressText>This is rendered as an article element.</IressText>
</IressStyled>

<IressStyled element="aside"
p="spacing.4"
bg="colour.neutral.20"
borderRadius="radius.2"
>
<IressText element="h3">Aside Element</IressText>
<IressText>This is rendered as an aside element.</IressText>
</IressStyled>

<IressStyled element="nav"
p="spacing.4"
bg="colour.neutral.20"
borderRadius="radius.2"
>
<IressText element="h3">Nav Element</IressText>
<IressText>This is rendered as a nav element.</IressText>
</IressStyled>
</IressStack>
```

[View "Elements" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-styled--elements)

### Styling props

You can apply any of the styling props supported by the design system.

[View supported styling props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-reference--docs#reference)

#### Spacing

Use spacing tokens to control padding and margin. The spacing system provides consistent values from `spacing.0` to `spacing.10`.

```tsx
<IressStack gap="spacing.3">
<IressStyled p="spacing.2"
bg="colour.neutral.20"
borderRadius="radius.2"
>
<IressText>Small padding (spacing.2)</IressText>
</IressStyled>

<IressStyled p="spacing.4"
bg="colour.neutral.20"
borderRadius="radius.2"
>
<IressText>Medium padding (spacing.4)</IressText>
</IressStyled>

<IressStyled p="spacing.6"
bg="colour.neutral.20"
borderRadius="radius.2"
>
<IressText>Large padding (spacing.6)</IressText>
</IressStyled>

<IressStyled m="spacing.4"
p="spacing.4"
bg="colour.system.info.surface"
borderRadius="radius.2"
>
<IressText>With margin (spacing.4)</IressText>
</IressStyled>
</IressStack>
```

[View "Spacing" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-styled--spacing)

#### Colors

Apply design system color tokens to set background colors, text colors, and border colors. Use semantic color tokens like `colour.system.info.surface` for consistent theming.

```tsx
<IressStack gap="spacing.3">
<IressStyled p="spacing.4"
bg="colour.system.info.surface"
color="colour.system.info.text"
borderRadius="radius.2"
>
<IressText>Info color scheme</IressText>
</IressStyled>

<IressStyled p="spacing.4"
bg="colour.system.success.surface"
color="colour.system.success.text"
borderRadius="radius.2"
>
<IressText>Success color scheme</IressText>
</IressStyled>

<IressStyled p="spacing.4"
bg="colour.system.warning.surface"
color="colour.system.warning.text"
borderRadius="radius.2"
>
<IressText>Warning color scheme</IressText>
</IressStyled>

<IressStyled p="spacing.4"
bg="colour.system.danger.surface"
color="colour.system.danger.text"
borderRadius="radius.2"
>
<IressText>Danger color scheme</IressText>
</IressStyled>
</IressStack>
```

[View "Colors" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-styled--colors)

#### Complex compositions

Combine multiple styling properties to create rich, semantic HTML structures. The component provides full access to Panda CSS props for maximum flexibility.

```tsx
<IressStyled maxWidth="2/12"
m="auto"
p="spacing.5"
bg="colour.neutral.10"
borderRadius="radius.4"
>
<IressStyled mb="spacing.4">
<IressIcon
name="info"
color="colour.system.info.text"
textStyle="typography.heading.4"
/>
<IressText element="h2" textStyle="typography.heading.3">
Complex Styled Component
</IressText>
</IressStyled>

<IressText element="p" mb="spacing.3">
The <code>IressStyled</code> component provides full access to Panda CSS
styling props, allowing you to create complex layouts and designs
without writing custom CSS.
</IressText>

<IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
<IressText>
This example demonstrates combining multiple styling properties to
create a rich, semantic HTML structure with custom styling.
</IressText>
</IressStyled>
</IressStyled>
```

[View "Complex" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-styled--complex)

## When to use

- **Custom layouts**: When you need to create a unique layout that doesn't match existing components
- **Semantic HTML**: When you need to use specific HTML elements with custom styling
- **Quick prototyping**: For rapid development without creating dedicated styled components
- **One-off designs**: When a design pattern doesn't warrant creating a reusable component

## When not to use

- **Repeated patterns**: If you're using the same styling multiple times, create a dedicated component instead
- **Simple spacing**: Use layout components like `IressStack` or `IressInline` for simple spacing needs
- **Typography**: Use `IressText` for text styling with semantic elements

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-styled--docs)

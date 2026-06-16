# Styled

> A polymorphic utility component that applies design tokens and styling props to any HTML element or custom component.

## Import

```tsx
import { IressStyled } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Styled)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=styled&title=[Styled]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=styled,enhancement&title=[Styled]+Feature:+)

The IressStyled component is a utility for applying design tokens to any element. It provides an unopinionated wrapper that gives you direct access to all supported styling properties without creating a dedicated component or writing custom CSS.

<StoryEmbed id="components-styled--spacing"/>

## Design

### When to use

- **Custom layouts**: When you need a unique layout that doesn't match existing components
- **Semantic HTML**: When you need specific HTML elements with custom styling
- **Quick prototyping**: For rapid development without creating dedicated styled components
- **One-off designs**: When a design pattern doesn't warrant creating a reusable component

### When not to use

- **Repeated patterns** — create a dedicated component instead
- **Simple spacing** — use [Stack](../components/stack.md) or [Inline](../components/inline.md)
- **Typography** — use [Text](../components/text.md) for text styling with semantic elements

## Develop

### Quick Start

```tsx
import { IressStyled } from '@iress-oss/ids-components';

<IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
  This is styled content using design tokens for padding, background color, and border radius.
</IressStyled>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs#api-props)

### Usage

#### The `element` prop

With the `element` prop you can select which HTML element the component should render as. It renders as a `div` by default, but can be set to any standard HTML element like `section`, `article`, `aside`, `nav`, `main`, `header`, `footer`, or `span`.

This allows you to maintain proper semantic HTML structure while applying custom styling.

<StoryEmbed id="components-styled--elements"/>

#### Styling props

You can apply any of the styling props supported by the design system.

[View supported styling props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-reference--docs#reference)

##### Spacing

Use spacing tokens to control padding and margin. The spacing system provides consistent values from `spacing.0` to `spacing.10`.

<StoryEmbed id="components-styled--spacing"/>

##### Colors

Apply design system color tokens to set background colors, text colors, and border colors. Use semantic color tokens like `colour.system.info.surface` for consistent theming.

<StoryEmbed id="components-styled--colors"/>

##### Complex compositions

Combine multiple styling properties to create rich, semantic HTML structures. The component provides full access to design tokens for maximum flexibility.

<StoryEmbed id="components-styled--complex"/>

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs)

## Specifications

### Behaviour

Renders a configurable HTML element (`div` by default) with full design token support for spacing, colour, borders, and layout.
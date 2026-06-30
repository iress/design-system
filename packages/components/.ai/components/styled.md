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

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content to be styled. |
| element | `ElementType` | — | The HTML element or custom component to render. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Styled/Styled.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

The IressStyled component is a utility for applying design tokens to any element. It provides an unopinionated wrapper that gives you direct access to all supported styling properties without creating a dedicated component or writing custom CSS.

```tsx
<IressStack gap="spacing.3">
  <IressStyled p="spacing.2" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Small padding (spacing.2)</IressText>
  </IressStyled>

  <IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Medium padding (spacing.4)</IressText>
  </IressStyled>

  <IressStyled p="spacing.6" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Large padding (spacing.6)</IressText>
  </IressStyled>

  <IressStyled
    m="spacing.4"
    p="spacing.4"
    bg="colour.system.info.surface"
    borderRadius="radius.2"
  >
    <IressText>With margin (spacing.4)</IressText>
  </IressStyled>
</IressStack>;
```

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
  This is styled content using design tokens for padding, background color, and
  border radius.
</IressStyled>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs#api-props)

### Usage

#### The `element` prop

With the `element` prop you can select which HTML element the component should render as. It renders as a `div` by default, but can be set to any standard HTML element like `section`, `article`, `aside`, `nav`, `main`, `header`, `footer`, or `span`.

This allows you to maintain proper semantic HTML structure while applying custom styling.

```tsx
<IressStack gap="spacing.3">
  <IressStyled
    element="section"
    p="spacing.4"
    bg="colour.neutral.20"
    borderRadius="radius.2"
  >
    <IressText element="h3">Section Element</IressText>
    <IressText>This is rendered as a section element.</IressText>
  </IressStyled>

  <IressStyled
    element="article"
    p="spacing.4"
    bg="colour.neutral.20"
    borderRadius="radius.2"
  >
    <IressText element="h3">Article Element</IressText>
    <IressText>This is rendered as an article element.</IressText>
  </IressStyled>

  <IressStyled
    element="aside"
    p="spacing.4"
    bg="colour.neutral.20"
    borderRadius="radius.2"
  >
    <IressText element="h3">Aside Element</IressText>
    <IressText>This is rendered as an aside element.</IressText>
  </IressStyled>

  <IressStyled
    element="nav"
    p="spacing.4"
    bg="colour.neutral.20"
    borderRadius="radius.2"
  >
    <IressText element="h3">Nav Element</IressText>
    <IressText>This is rendered as a nav element.</IressText>
  </IressStyled>
</IressStack>;
```

#### Styling props

You can apply any of the styling props supported by the design system.

[View supported styling props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_styling-props-reference--docs#reference)

##### Spacing

Use spacing tokens to control padding and margin. The spacing system provides consistent values from `spacing.0` to `spacing.10`.

```tsx
<IressStack gap="spacing.3">
  <IressStyled p="spacing.2" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Small padding (spacing.2)</IressText>
  </IressStyled>

  <IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Medium padding (spacing.4)</IressText>
  </IressStyled>

  <IressStyled p="spacing.6" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>Large padding (spacing.6)</IressText>
  </IressStyled>

  <IressStyled
    m="spacing.4"
    p="spacing.4"
    bg="colour.system.info.surface"
    borderRadius="radius.2"
  >
    <IressText>With margin (spacing.4)</IressText>
  </IressStyled>
</IressStack>;
```

##### Colors

Apply design system color tokens to set background colors, text colors, and border colors. Use semantic color tokens like `colour.system.info.surface` for consistent theming.

```tsx
<IressStack gap="spacing.3">
  <IressStyled
    p="spacing.4"
    bg="colour.system.info.surface"
    color="colour.system.info.text"
    borderRadius="radius.2"
  >
    <IressText>Info color scheme</IressText>
  </IressStyled>

  <IressStyled
    p="spacing.4"
    bg="colour.system.success.surface"
    color="colour.system.success.text"
    borderRadius="radius.2"
  >
    <IressText>Success color scheme</IressText>
  </IressStyled>

  <IressStyled
    p="spacing.4"
    bg="colour.system.warning.surface"
    color="colour.system.warning.text"
    borderRadius="radius.2"
  >
    <IressText>Warning color scheme</IressText>
  </IressStyled>

  <IressStyled
    p="spacing.4"
    bg="colour.system.danger.surface"
    color="colour.system.danger.text"
    borderRadius="radius.2"
  >
    <IressText>Danger color scheme</IressText>
  </IressStyled>
</IressStack>;
```

##### Complex compositions

Combine multiple styling properties to create rich, semantic HTML structures. The component provides full access to design tokens for maximum flexibility.

```tsx
<IressStyled
  maxWidth="2/12"
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
    styling props, allowing you to create complex layouts and designs without
    writing custom CSS.
  </IressText>

  <IressStyled p="spacing.4" bg="colour.neutral.20" borderRadius="radius.2">
    <IressText>
      This example demonstrates combining multiple styling properties to create
      a rich, semantic HTML structure with custom styling.
    </IressText>
  </IressStyled>
</IressStyled>;
```

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-styled--docs)

## Specifications

### Behaviour

Renders a configurable HTML element (`div` by default) with full design token support for spacing, colour, borders, and layout.
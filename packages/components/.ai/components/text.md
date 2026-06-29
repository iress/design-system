# Text

> Renders styled text with consistent typography from the design system.

## Import

```tsx
import { IressText } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Text)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=text&title=[Text]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=text,enhancement&title=[Text]+Feature:+)

The IressText component allows you to set typographic styles either on one element, or a block of HTML elements.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextElement() {
  return (
    <IressStack gap="spacing.1">
      <IressText element="p">This is a p element.</IressText>
      <IressText element="div">This is a div element.</IressText>
      <IressText element="span">This is a span element.</IressText>
      <IressText element="h1">This is a h1 element.</IressText>
      <IressText element="h2">This is a h2 element.</IressText>
      <IressText element="h3">This is a h3 element.</IressText>
      <IressText element="h4">This is a h4 element.</IressText>
      <IressText element="h5">This is a h5 element.</IressText>
      <IressText element="h6">This is a h6 element.</IressText>
      <IressText element="code">This is a code element.</IressText>
      <IressText element="small">This is a small element.</IressText>
      <IressText element="cite">This is a cite element.</IressText>
      <IressText element="strong">This is a strong element.</IressText>
      <IressText element="em">This is a em element.</IressText>
      <IressText element="a">This is a a element.</IressText>
      <IressText element="blockquote">This is a blockquote element.</IressText>
      <IressText element="pre">This is a pre element.</IressText>
      <IressText element="mark">This is a mark element.</IressText>
    </IressStack>
  );
}
```

## Design

### When to use

- **Semantic headings with custom styling**: Render an `h2` visually as an `h4` to maintain document outline
- **Display text**: Apply display typography styles to content headings
- **Colour modes**: Apply semantic colour (e.g. muted, danger) to text blocks
- **Typographic blocks**: Wrap a block of HTML content to inherit consistent typography

### When not to use

- **Single paragraphs without styling** — use standard HTML `<p>` elements
- **Interactive text** — use [Link](../components/link.md) or [Button](../components/button.md) instead
- **Status messages** — use [Alert](../components/alert.md) for contextual feedback

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `element` to set the correct semantic element | Rely solely on `textStyle` for document structure |
| Only add `textStyle` when overriding the default visual treatment | Add redundant `textStyle` matching the element's default (e.g. `element="h1" textStyle="typography.heading.1"`) |
| Use `color` for semantic text colouring | Use inline styles for text colour |
| Maintain heading hierarchy in the document | Skip heading levels for visual reasons without using `textStyle` |

### Content guidelines

- **Heading hierarchy**: Ensure headings follow a logical order (h1 → h2 → h3) for accessibility
- **Text alignment**: Use left alignment for body text (default); centre for short labels or headings where appropriate
- **Colour usage**: Reserve `danger` and `warning` colours for error/warning text; use `muted` for secondary information

### Related patterns

- [Link](../components/link.md) — for interactive inline text
- [Alert](../components/alert.md) — for status messages
- [Readonly](../components/readonly.md) — for displaying non-editable form values

## Develop

### Quick Start

```tsx
import { IressText } from '@iress-oss/ids-components';

<IressText element="h1">Page Title</IressText>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs#api-props)

### The `element` prop

With the `element` prop you can select which HTML element you would like the text component to render as.

It renders as a `div` by default, but can also be set to any standard typography element.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextElement() {
  return (
    <IressStack gap="spacing.1">
      <IressText element="p">This is a p element.</IressText>
      <IressText element="div">This is a div element.</IressText>
      <IressText element="span">This is a span element.</IressText>
      <IressText element="h1">This is a h1 element.</IressText>
      <IressText element="h2">This is a h2 element.</IressText>
      <IressText element="h3">This is a h3 element.</IressText>
      <IressText element="h4">This is a h4 element.</IressText>
      <IressText element="h5">This is a h5 element.</IressText>
      <IressText element="h6">This is a h6 element.</IressText>
      <IressText element="code">This is a code element.</IressText>
      <IressText element="small">This is a small element.</IressText>
      <IressText element="cite">This is a cite element.</IressText>
      <IressText element="strong">This is a strong element.</IressText>
      <IressText element="em">This is a em element.</IressText>
      <IressText element="a">This is a a element.</IressText>
      <IressText element="blockquote">This is a blockquote element.</IressText>
      <IressText element="pre">This is a pre element.</IressText>
      <IressText element="mark">This is a mark element.</IressText>
    </IressStack>
  );
}
```

### The `textStyle` prop

The `textStyle` prop (previously `variant`) allows you alter the default styling of the element that it selected.

For example, in order to maintain the semantic structure of headings, you may need to style a `h2` element like a `h4`. Or you may want to style your heading using one of our display text formats.

> **⚠️ Do not add `textStyle` when the `element` already provides the correct styling.** For example, `element="h1"` already renders with `typography.heading.1` styling — adding `textStyle="typography.heading.1"` is redundant. Only use `textStyle` to intentionally override the default visual treatment (e.g. `element="h2" textStyle="typography.heading.4"` to make an h2 visually smaller), or when a designer has specified a different visual hierarchy in a Figma file.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextVariant() {
  return (
    <IressStack gap="md">
      <IressText textStyle="typography.heading.1">
        This is the typography.heading.1 text style.
      </IressText>
      <IressText textStyle="typography.heading.2">
        This is the typography.heading.2 text style.
      </IressText>
      <IressText textStyle="typography.heading.3">
        This is the typography.heading.3 text style.
      </IressText>
      <IressText textStyle="typography.heading.4">
        This is the typography.heading.4 text style.
      </IressText>
      <IressText textStyle="typography.heading.5">
        This is the typography.heading.5 text style.
      </IressText>
      <IressText textStyle="typography.body.sm">
        This is the typography.body.sm text style.
      </IressText>
    </IressStack>
  );
}
```

### The `color` prop

The `color` prop (previously `mode`) can be used to set the colour of the text to these predefined mode colours: Body, Muted, Primary, Info, Success, Warning, Danger, Positive and Negative.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextMode() {
  return (
    <IressStack gap="md">
      <IressText color="colour.neutral.70">
        This is colour.neutral.70 mode.
      </IressText>
      <IressText color="colour.primary.text">
        This is colour.primary.text mode.
      </IressText>
      <IressText color="colour.system.danger.text">
        This is colour.system.danger.text mode.
      </IressText>
      <IressText color="colour.system.success.text">
        This is colour.system.success.text mode.
      </IressText>
      <IressText color="colour.system.warning.text">
        This is colour.system.warning.text mode.
      </IressText>
      <IressText color="colour.system.info.text">
        This is colour.system.info.text mode.
      </IressText>
      <IressText color="colour.system.danger.text">
        Nested text mode demonstration:{' '}
        <IressText>I am nested, and return to the original colour</IressText>
      </IressText>
    </IressStack>
  );
}
```

### The `textAlign` prop

The `textAlign` prop (previously `align`) can be used to set the text's alignment.

```tsx
import { IressStack, IressText } from '@iress-oss/ids-components';

export function TextAlign() {
  return (
    <IressStack gap="md">
      <IressText textAlign="left">
        The quick brown fox jumps over the lazy dog
      </IressText>
      <IressText textAlign="center">
        The quick brown fox jumps over the lazy dog
      </IressText>
      <IressText textAlign="right">
        The quick brown fox jumps over the lazy dog
      </IressText>
      <IressText textAlign="justify">
        The quick brown fox jumps over the lazy dog
      </IressText>
      <IressText textAlign="inherit">
        The quick brown fox jumps over the lazy dog
      </IressText>
    </IressStack>
  );
}
```

### Block of typographic content

If you just need to style a block of typography content, you can just wrap the entire block of HTML with the text component.

```tsx
<IressText maxWidth="container.md" mx="auto" px="spacing.2">
  <h2>History</h2>
  <h3>Founding and Early Years (1993 - 2000)</h3>
  <p>
    <a href="https://iress.com" target="_blank">
      Iress Limited (ASX: IRE)
    </a>{' '}
    was founded in 1993 in Melbourne, Australia, as a provider of financial
    market data and trading software.
  </p>
  <h3>Expansion and IPO (2001 - 2010)</h3>
  <p>
    In 2001, Iress went public, listing on the Australian Securities Exchange
    (ASX). This move provided the company with capital to expand its operations
    and invest in new technologies.
  </p>
  <pre>Some code in here</pre>
</IressText>;
```

### Testing

Query text elements by their content:

```tsx
const heading = screen.getByRole('heading', { name: 'Page title' });
const paragraph = screen.getByText('Some content');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the text | `getByText('...')` | `text` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders as `<div>` with inherited typography styles |
| With `element` | Renders as the specified semantic HTML element |
| With `textStyle` | Overrides the element's default visual styling |
| With `color` | Applies the specified semantic colour token |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Use correct `element` to maintain semantic heading hierarchy
- **1.4.1 Use of Color** — Text colour supplements (not replaces) semantic meaning
- **2.4.6 Headings and Labels** — Headings should describe the content that follows

**Keyboard interaction:**

Text is not interactive. When content within text is interactive, those elements handle their own keyboard interaction.

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-text--docs)
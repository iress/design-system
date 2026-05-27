# Text
The IressText component allows you to set typographic styles either on one element, or a block on HTML elements.
> **Component:** `import { IressText } from '@iress-oss/ids-components'`
> **Storybook:** [Text in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-text--docs)```tsx
```

## Quick Start

```tsx
<IressText />
```

## Usage

### The `element` prop

With the `element` prop you can select which HTML element you would like the text component to render as.

It renders as a `div` by default, but can also be set to any standard typography element.

```tsx
<IressStack gap="spacing.1">
{TEXT_ELEMENTS.map((element) => (
<IressText key={element} element={element}>
This is a {element} element.
</IressText>
))}
</IressStack>
```

[View "Element" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-text--element)

### The `textStyle` prop

The `textStyle` prop (previously `variant`) allows you alter the default styling of the element that it selected.

For example, in order to maintain the semantic structure of headings, you may need to style a `h2` element like a `h4`. Or you may want to style your heading using one of our display text formats.

> **⚠️ Do not add `textStyle` when the `element` already provides the correct styling.** For example, `element="h1"` already renders with `typography.heading.1` styling — adding `textStyle="typography.heading.1"` is redundant. Only use `textStyle` to intentionally override the default visual treatment (e.g. `element="h2" textStyle="typography.heading.4"` to make an h2 visually smaller), or when a designer has specified a different visual hierarchy in a Figma file.

```tsx
<IressStack gap="md">
{TEXT_STYLES.map((variant) => (
<IressText key={variant} textStyle={variant}>
This is the {variant} text style.
</IressText>
))}
</IressStack>
```

[View "Variant" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-text--variant)

### The `color` prop

The `color` prop (previously `mode`) can be used to set the colour of the text to these predefined mode colours: Body, Muted, Primary, Info, Success, Warning, Danger, Positive and Negative.

```tsx
<IressStack gap="md">
{COLOR_TOKENS.map((mode) => (
<IressText key={mode} color={mode}>
This is {mode} mode.
</IressText>
))}
<IressText color="colour.primary.text">
Nested text mode demonstration:{' '}
<IressText>
I am nested, and return to the original colour
</IressText>
</IressText>
</IressStack>
```

[View "Mode" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-text--mode)

### The `textAlign` prop

The `textAlign` prop (previously `align`) can be used to set the text's alignment.

```tsx
<IressStack gap="md">
<IressText textAlign="left">
...
</IressText>
<IressText textAlign="center">
...
</IressText>
<IressText textAlign="right">
...
</IressText>
<IressText textAlign="justify">
...
</IressText>
<IressText textAlign="inherit">
...
</IressText>
</IressStack>
```

[View "Align" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-text--align)

## Behaviour

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
market data and trading software. Initially, the company focused on
delivering technology solutions for stockbrokers and traders, providing
real-time market data, order management, and trading execution tools.
</p>
<h3>Expansion and IPO (2001 - 2010)</h3>
<p>
In 2001, Iress went public, listing on the Australian Securities
Exchange (ASX). This move provided the company with capital to expand
its operations and invest in new technologies. During this period, Iress
expanded its services beyond trading platforms to include financial
planning software, portfolio management, and wealth management
solutions. The company also started expanding internationally, entering
markets such as the UK, Canada, New Zealand, and South Africa, through
organic growth and acquisitions.
</p>
<h3>Global Growth and Acquisitions (2011 - 2020)</h3>
<p>
Between 2011 and 2020, Iress continued its global expansion through
acquisitions and product diversification. Key acquisitions included:
</p>
<ul>
<li>
Avelo (2013): Strengthened its presence in the UK financial services
market.
</li>
<li>
Pulse Software (2014): Added financial advice solutions to its
portfolio.
</li>
<li>
INET BFA (2016): Expanded its reach into South Africa’s financial
market.
</li>
<li>
OneVue (2020): Enhanced its superannuation and investment
administration capabilities.
</li>
</ul>
<p>
During this period, Iress also expanded into mortgage lending technology
and digital financial services, adapting to the increasing demand for
automation and efficiency in financial markets.
</p>
<h3>Recent Developments (2021 - Present)</h3>
<p>
In 2021, Iress announced a strategic review of its business, focusing on
streamlining operations and improving profitability. The company also
experienced leadership changes, including new CEO appointments to drive
digital transformation.{' '}
</p>
<p>
Iress has continued to innovate with cloud-based solutions, artificial
intelligence (AI), and data analytics, catering to financial
institutions, brokers, and wealth management firms globally.
</p>
<pre>Some code in here</pre>
</IressText>
```

[View "TypographicBlock" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-text--typographic-block)

## Testing

Query text elements by their content:

```tsx
const heading = screen.getByRole('heading', { name: 'Page title' });
const paragraph = screen.getByText('Some content');
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-text--docs)

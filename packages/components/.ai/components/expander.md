# Expander
Expanders are commonly used to reveal more information or details about an element or content on a page.
> **Component:** `import { IressExpander } from '@iress-oss/ids-components'`
> **Storybook:** [Expander in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-expander--docs)```tsx
```

## Quick Start

```tsx
<IressExpander activator="Expander activator">
  Expander content will go here
</IressExpander>
```

## Accessibility

For Accessibility guidelines refer to
[W3 ARIA Patterns Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [W3 ARIA Patterns Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

## Examples

### Mode

Expander has a `mode` prop which can be used to change how the expander is displayed. There are two modes `section` (default) and `link`.

- `section` mode is used to expand larger sections of rich content, such as a table or a detailed transcript.
- `link` mode is used to expand a small section of content, usually used to provide additional context (eg. "Learn more" or "See more details").

```tsx
<IressStack gap="lg">
<IressStack gap="xs">
<IressText element="h2">Section (default)</IressText>
<IressExpander mode="section" />
</IressStack>
<IressStack gap="xs">
<IressText element="h2">Link</IressText>
<IressExpander mode="link" />
</IressStack>
</IressStack>
```

[View "Mode" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components---mode)

### Open

The `open` prop can be used to control the open state of the expander as can be seen below.

```tsx
<IressExpander open />
```

[View "Open" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components---open)

### Multiple expanders (accordion)

You can use multiple expanders to create an accordion, where all expander closes when another is opened.

```tsx
<MultipleExpander />
```

[View "Multiple" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components---multiple)

## Testing

Query the expander trigger by its button role:

```tsx
const trigger = screen.getByRole('button', { name: 'Show details' });
await user.click(trigger);
expect(trigger).toHaveAttribute('aria-expanded', 'true');
expect(screen.getByText('Expanded content')).toBeVisible();
```

### Gotchas

- **Open state via `aria-expanded`**: Check the activator button's
  `aria-expanded` attribute to verify whether the expander is open or closed.
- **Multiple expanders**: When using accordion-style behaviour (only one open at
  a time), verify that opening one closes the other by checking
  `aria-expanded` on both activators.

### Test IDs

When you pass a `data-testid` to `IressExpander`, the following nested test IDs
are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `activator` | `my-expander__activator` | The expand/collapse trigger button |
| `container` | `my-expander__container` | The collapsible content container |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-expander--docs)

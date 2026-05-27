# Card

Cards are used to group small, related pieces of information into one digestible unit.

> **Component:** `import { IressCard } from '@iress-oss/ids-components'`
> **Storybook:** [Card in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-card--docs)

## Quick Start

```tsx
import { IressCard } from '@iress-oss/ids-components';

<IressCard>
  I'm a card
</IressCard>
```

## Examples

### Simple cards

All slots and props for card are optional. You can create a simple card by adding some content to the default slot.

```tsx
<IressCard>
  I'm a simple card
</IressCard>
```

[View "Simple" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card--simple)

### No border

The `noBorder` prop can be used to remove the border from the card, which is useful when you want to de-prioritise a card within another bordered container, such as a card within a sidebar.

```tsx
<IressCard noBorder />
```

[View "NoBorder" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card--no-border)

### Padding

Padding can be controlled using the `p` prop. It can be set to `none`, `sm`, `md` or `lg`. It defaults to `md`.

```tsx
<IressStack gap="md">
<IressCard p="none">
I&rsquo;m a card with no padding
</IressCard>
<IressCard p="xs">
I&rsquo;m a card with xs padding
</IressCard>
<IressCard p="sm">
I&rsquo;m a card with sm padding
</IressCard>
<IressCard p="md">
I&rsquo;m a card with md padding
</IressCard>
</IressStack>
```

[View "Padding" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card--padding)

### Stretch

The `stretch` prop can be used to stretch the card to fill its container.

```tsx
<IressRow gutter="md" verticalAlign="stretch">
<IressCol>
<IressCard stretch>
I&rsquo;m a stretched card
</IressCard>
</IressCol>
<IressCol>
<IressCard>
I&rsquo;m a card with lots of content. Blah blah blah blah blah blah
blah blah blah blah blah blah blah blah blah blah blah blah blah blah
blah blah blah blah blah.
</IressCard>
</IressCol>
</IressRow>
```

[View "Stretch" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card--stretch)

### Selected

Setting the `selected` prop highlights the card, usually to allow selection in a list.

```tsx
<IressCard selected>
  I'm a selected card
</IressCard>
```

[View "Selected" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card--selected)

## Render props (slots)

If you're coming from v4 or earlier, you might be used to slots. In v5, we've replaced slots with render props which align with the React API. Render props allow you to create a structured layout for your card, while still having the flexibility to add custom content. They are simply functions that return JSX, so you can pass any component you like.

However, please be diligent as the component you use may not fit withing the confines of the `IressCard` layout.

### Prepend

Use the `prepend` prop to add content to the left side of the card.

```tsx
<IressCard>
  I'm a card using the prepend render prop
</IressCard>
```

[View "Prepend" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-slots--prepend)

### Top Right

Use the `topRight` prop to add content to the top right of the card. This is useful for adding a badge, icon, or an actions menu.

```tsx
<IressCard>
  I'm a card using the topRight render prop
</IressCard>
```

[View "TopRight" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-slots--top-right)

### Heading

Use the `heading` prop to add a header to the card. The header can be any component you like, but it is designed to support a simple heading element, optionally wrapped with a link.

**Note:** `headingText` and `headingLevel` props have been replaced with the `heading` render prop to give you more control over the heading element and its content. To use the previous behaviour, you can pass a string which will automatically create a `h2` element, or pass a `h*` element with the text as a child.

```tsx
<IressCard>
  I'm a card using the heading render prop
</IressCard>
```

[View "Heading" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-slots--heading)

### Media

Use the `media` prop to add media to the card. The media can be any component you like, but it is designed to support an image or video.

```tsx
<IressCard>
  I'm a card using the media render prop
</IressCard>
```

[View "Media" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-slots--media)

### Content

Use the `content` prop to add content to the card. The content can be any component you like, but it is designed to support simple text based elements.

[View "Content" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-slots--content)

### Footer

Use the `footer` prop to add a footer to the card. The footer can be any component you like, but it is designed to support buttons.

```tsx
<IressCard>
  I'm a card using the footer render prop
</IressCard>
```

[View "Footer" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-slots--footer)

### All slots

You can use all the slots together to create a custom card layout.

```tsx
<CardAllSlots />
```

[View "AllSlots" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-slots--all-slots)

## Clickable cards

Note: The `clickable` prop has been deprecated in favour of using component variations, or the `onClick` prop.

### Heading only

Since the `heading` prop now renders the component you give it, you have full control over the content of the `heading`. This means you can add pass it a heading with a link.

```tsx
<IressCard>
  I'm a card with a clickable heading. NEVER use me when the whole card is clickable.
</IressCard>
```

[View "HeadingOnly" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-clickable--heading-only)

### Whole card

The whole card can be made clickable by passing an `onClick` prop. All the appropriate styling will be added as well.

It's recommended to add `role="button"` and `tabindex="0"` to the card to make it clear to screen readers that the card is clickable.

```tsx
<IressCard role="button" tabIndex={0}>
  I am a card with an onClick handler. Click me to see what happens.
</IressCard>
```

[View "WholeCard" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-clickable--whole-card)

### Links and Buttons

To simplify the process of making the whole card clickable, you can use the `IressLinkCard` and `IressButtonCard` components. These components look exactly the same as the `IressCard` component, however their base tags are different, allowing you to use them exactly like you would a html link and button.

**Note:** These components replace the `button`, `clickable` and `href` props. You no longer need `button` and `clickable`, as these are automatically inferred. To mimic the `href` prop, simply change the component you are using to `IressLinkCard`.

```tsx
<IressInline gap="md" horizontalAlign="around">
  ```tsx
<IressButtonCard>
I am a card with a button element
</IressButtonCard>
```

[View "ButtonCard" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-clickable--button-card)
  ```tsx
<IressLinkCard>I am a card with an anchor element</IressLinkCard>
```

[View "LinkCard" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-card-clickable--link-card)
</IressInline>
```

## Testing

Query cards by their content or use a `data-testid`:

```tsx
const card = screen.getByTestId('my-card');
```

The role depends on the `element` prop:

```tsx
// element="a" (clickable card with link)
const card = screen.getByRole('link', { name: 'Card heading' });

// element="button" (clickable card with button)
const card = screen.getByRole('button', { name: 'Card heading' });

// default (div) — no implicit role, use data-testid
const card = screen.getByTestId('my-card');
```

### Test IDs

When you pass a `data-testid` to `IressCard`, the following nested test IDs are
generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `prepend` | `my-card__prepend` | The prepend slot container |
| `topRight` | `my-card__topRight` | The top-right slot container |
| `media` | `my-card__media` | The media slot container |
| `heading` | `my-card__heading` | The card heading container |
| `body` | `my-card__body` | The card body container |

## Props

- **Type:** `IressCardProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Card/Card.d.ts`

```typescript
import type { IressCardProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-card--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-card--docs)*

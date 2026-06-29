# Card

> Groups related content and actions into a contained, visually distinct surface.

## Import

```tsx
import { IressCard } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Card)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=card&title=[Card]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=card,enhancement&title=[Card]+Feature:+)

A container for grouping related content and actions with optional heading, footer, and media slots.

```tsx
import {
  IressInline,
  IressToggle,
  IressRow,
  IressCol,
  IressDivider,
  IressCard,
  IressStack,
  IressIcon,
  IressText,
  IressTag,
  IressPill,
  IressContextualMenu,
  IressPanel,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const SLOT_CONTENT = {
  prepend: <IressIcon name="star" />,
  media: (
    <img
      src="https://www.iress.com/media/images/media-contact.width-600.png"
      width="250"
      alt="A man in an Iress branded t-shirt smiles at the camera"
    />
  ),
  heading: <h2>Welcome to Iress!</h2>,
  topRight: <IressContextualMenu>More actions in here</IressContextualMenu>,
  children: (
    <IressText>
      Find out all the onboarding material you need{' '}
      <a href="https://iress.com">with this easy guide</a>.
    </IressText>
  ),
  footer: (
    <IressInline gap="sm" horizontalAlign="between" verticalAlign="middle">
      <IressInline gap="sm">
        <IressTag mode="30">#new-starter</IressTag>
        <IressTag mode="60">#first-day</IressTag>
      </IressInline>
      <IressPill mode="70">NEW</IressPill>
    </IressInline>
  ),
};

const SLOT_NAMES = Object.keys(SLOT_CONTENT) as Array<
  keyof typeof SLOT_CONTENT
>;

export function CardAllSlots() {
  const [show, setShow] = useState({
    children: true,
    prepend: false,
    media: true,
    heading: true,
    topRight: true,
    footer: true,
  });

  const cardProps = Object.fromEntries(
    SLOT_NAMES.filter((slot) => show[slot]).map((slot) => [
      slot,
      SLOT_CONTENT[slot],
    ]),
  );

  return (
    <IressStack maxWidth="container.lg" gap="md" mx="auto">
      <IressInline gap="md">
        {SLOT_NAMES.map((slot) => (
          <IressToggle
            key={slot}
            checked={show[slot]}
            onChange={(checked) => setShow({ ...show, [slot]: checked })}
          >
            {slot}
          </IressToggle>
        ))}
      </IressInline>
      <IressDivider />
      <IressRow gutter="md">
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
      </IressRow>
    </IressStack>
  );
}
```

## Design

### When to use

- **Content grouping**: Visually separate distinct pieces of content on a page
- **Actionable items**: Cards with clickable headings or entire card clickable
- **Dashboard widgets**: Self-contained content blocks in grid layouts
- **List items**: Repeatable content in a grid or list

### When not to use

- **Full-width sections** — use [Panel](../components/panel.md) instead
- **Navigation items** — use [Menu](../components/menu.md) or [SideNav](../patterns/side-nav.md)
- **Modals or overlays** — use [Modal](../components/modal.md) or [Popover](../components/popover.md)

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Keep card content focused on a single topic | Overload cards with too much information |
| Use consistent card sizes in a grid | Mix different card heights in the same row |
| Use `stretch` prop to fill available height | Manually set fixed heights |
| Use slots (heading, footer, prepend) for structure | Use arbitrary nested markup for layout |

### Content guidelines

- **Heading**: Keep concise — summarises the card's content
- **Footer**: Use for actions (buttons/links) related to the card content
- **Media**: Images should have descriptive alt text

### Related patterns

- [Panel](../components/panel.md) — for full-width content sections
- [Expander](../components/expander.md) — for progressive disclosure within cards

## Develop

### Quick Start

```tsx
import { IressCard } from '@iress-oss/ids-components';

<IressCard heading="Card title">Card content goes here.</IressCard>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs#api-props)

### Usage

#### Clickable card

```tsx
<IressCard
  role="button"
  onClick={() => alert('Card clicked')}
  onKeyDown={() => alert('Key down on card (for keyboard users)')}
  tabIndex={0}
>
  I am a card with an onClick handler. Click me to see what happens.
</IressCard>;
```

#### Selected state

```tsx
<IressCard selected>I'm a selected card</IressCard>;
```

#### No border

```tsx
<IressCard noBorder>I'm a card</IressCard>;
```

### Testing

Query the card by its test ID:

```tsx
const card = screen.getByTestId('my-card');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the card | `getByText('...')` | `card` |
| prepend | The prepend slot container | — | `card__prepend` |
| topRight | The top-right slot container | — | `card__topRight` |
| media | The media slot container | — | `card__media` |
| heading | The card heading container | `getByRole('heading')` | `card__heading` |
| body | The card body container | — | `card__body` |

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Static container with optional heading/footer slots |
| Clickable heading | Heading renders as a link or button |
| Clickable card | Entire card is interactive |
| Selected | Visual highlight applied via `selected` prop |
| Stretch | Card fills available height in a flex/grid container |

### Accessibility

- Clickable cards use appropriate `role` and keyboard support
- Card heading level can be configured via `headingLevel` prop
- Selected state communicated via `aria-selected`

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Activates clickable card or heading link |
| `Tab` | Moves focus to next interactive element |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-card--docs)
# Expander

> Reveals or hides a section of content with an expand/collapse toggle.

## Import

```tsx
import { IressExpander } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Expander)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=expander&title=[Expander]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=expander,enhancement&title=[Expander]+Feature:+)

Expanders are commonly used to reveal more information or details about an element or content on a page.

```tsx
import {
  IressExpander,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function ExpanderMode() {
  return (
    <IressStack gap="lg">
      <IressStack gap="xs">
        <IressText element="h2">Section (default)</IressText>
        <IressExpander activator="Expander activator" mode="section">
          Expander content will go here
        </IressExpander>
      </IressStack>
      <IressStack gap="xs">
        <IressText element="h2">Link</IressText>
        <IressExpander activator="Expander activator" mode="link">
          Expander content will go here
        </IressExpander>
      </IressStack>
    </IressStack>
  );
}
```

## Design

### When to use

- **Progressive disclosure**: Hide secondary content until the user requests it
- **Long pages**: Reduce page length by collapsing non-essential sections
- **Accordion patterns**: Group multiple expanders where only one (or more) can be open at a time
- **Inline details**: Use `link` mode for small "Learn more" or "See details" expansions

### When not to use

- **Navigation between views** — use Tabs or routing instead
- **Critical content** — don't hide essential information behind an expander
- **Very short content** — if the collapsed and expanded states are similar length, show it inline

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use descriptive activator labels | Use vague labels like "Click here" |
| Use `section` mode for large content blocks | Hide form fields inside expanders |
| Use `link` mode for brief additional context | Nest expanders within expanders |
| Manage accordion state for exclusive opening | Leave all expanders open by default in an accordion |

### Content guidelines

- **Activator label**: Describe what will be revealed (e.g. "View transaction details")
- **Content**: Keep expanded content focused and relevant to the activator label

### Related patterns

- [Tab Set](../components/tab-set.md) — for switching between panels of related content
- [Modal](../components/modal.md) — for content that requires user focus

## Develop

### Quick Start

```tsx
import { IressExpander } from '@iress-oss/ids-components';

<IressExpander activator="Expander activator">
  Expander content will go here
</IressExpander>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs#api-props)

### Usage

#### Mode

The `mode` prop controls display style:

- `section` (default): for larger sections of rich content
- `link`: for small inline expansions

```tsx
import {
  IressExpander,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

export function ExpanderMode() {
  return (
    <IressStack gap="lg">
      <IressStack gap="xs">
        <IressText element="h2">Section (default)</IressText>
        <IressExpander activator="Expander activator" mode="section">
          Expander content will go here
        </IressExpander>
      </IressStack>
      <IressStack gap="xs">
        <IressText element="h2">Link</IressText>
        <IressExpander activator="Expander activator" mode="link">
          Expander content will go here
        </IressExpander>
      </IressStack>
    </IressStack>
  );
}
```

#### Open

The `open` prop controls the expanded state programmatically.

```tsx
<IressExpander activator="Expander activator" open>
  Expander content will go here
</IressExpander>;
```

#### Multiple expanders (accordion)

Use multiple expanders with controlled state for accordion behaviour.

```tsx
import { IressExpander, IressStack } from '@iress-oss/ids-components';
import { useState } from 'react';

export const MultipleExpander = () => {
  const [openActivator, setOpenActivator] = useState('');

  const handleChange = (newOpenActivator: string, open?: boolean) => {
    setOpenActivator(open ? newOpenActivator : '');
  };

  return (
    <IressStack gap="spacing.4">
      <IressExpander
        activator="Top"
        open={openActivator === 'top'}
        onChange={(open) => handleChange('top', open)}
      >
        Expander content for the top activator goes here.
      </IressExpander>
      <IressExpander
        activator="Bottom"
        open={openActivator === 'bottom'}
        onChange={(open) => handleChange('bottom', open)}
      >
        Expander content for the bottom activator goes here.
      </IressExpander>
    </IressStack>
  );
};
```

### Testing

Query the expander trigger by its button role:

```tsx
const trigger = screen.getByRole('button', { name: 'Show details' });
await user.click(trigger);
expect(trigger).toHaveAttribute('aria-expanded', 'true');
expect(screen.getByText('Expanded content')).toBeVisible();
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the expander | — | `expander` |
| activator | The expand/collapse trigger button | `getByRole('button', { name: '...' })` | `expander__activator` |
| container | The collapsible content container (visible when expanded) | — | `expander__container` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-expander--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Collapsed | Only the activator is visible; content is hidden |
| Expanded | Content is visible below the activator |
| Controlled | Open state driven by `open` prop |
| Accordion | Multiple expanders managed via state so only one is open at a time |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Activator uses `aria-expanded` to communicate state
- **2.1.1 Keyboard** — Activator is a button, fully keyboard accessible
- **1.3.1 Info and Relationships** — `aria-controls` links activator to content region

**References:** [W3 ARIA Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), [W3 ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Toggle the expander open/closed |
| `Tab` | Move focus to/from the activator |

### Edge cases

- **Empty content**: Expander still toggles but shows nothing when expanded
- **Nested focusable content**: Focus moves naturally into expanded content on `Tab`
- **Animation**: Content animates open/closed; height transitions are handled internally
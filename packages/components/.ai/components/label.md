# Label

> Provides an accessible text label for a form control.

## Import

```tsx
import { IressLabel } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Label)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=label&title=[Label]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=label,enhancement&title=[Label]+Feature:+)

Use the IressLabel component when building bespoke form inputs and IressField is too restrictive.

<StoryEmbed id="components-label--required"/>

## Design

### When to use

- **Custom form controls**: When `IressField` is too opinionated for your layout
- **Non-interactive content**: Label read-only data without a `htmlFor` association
- **Required indicators**: Show an asterisk to indicate mandatory fields

### When not to use

- **Standard form fields** — use `IressField` which includes label, hint, and error support
- **Standalone text** — use `IressText` for non-label content

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Pair with a form control using `htmlFor` | Place interactive elements (links, buttons) inside the label |
| Use `hiddenLabel` for visually hidden but accessible labels | Omit labels entirely — screen readers need them |
| Use `readOnly="locked"` for permission-based read-only | Use a label without any associated content |

### Content guidelines

- **Text**: Use sentence case, keep concise and descriptive
- **Required**: Use the `required` prop to add an asterisk; don't manually add asterisks

### Related patterns

- [Field](../components/field.md) — full-featured form field wrapper with hint and error support

## Develop

### Quick Start

```tsx
import { IressLabel } from '@iress-oss/ids-components';

<IressLabel>This is a label</IressLabel>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs#api-props)

### Usage

#### Required

Use the `required` prop to distinguish the label with an asterisk.

<StoryEmbed id="components-label--required"/>

#### Hidden label

Set `hiddenLabel` to visually hide the label while keeping it accessible.

<StoryEmbed id="components-label--hidden-label"/>

#### Rich content

Render custom content into the label.

<StoryEmbed id="components-label--rich-content"/>

#### Locked readonly

Use `readOnly="locked"` when the field is read-only due to permissions. Adds a lock indicator.

<StoryEmbed id="components-label--locked-readonly"/>

### Testing

Labels are typically queried indirectly through the form control they describe:

```tsx
const input = screen.getByLabelText('Email address');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the label | — | `label` |
| text | The label text content | — | `label__text` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-label--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders as a `<label>` element associated via `htmlFor` |
| Without `htmlFor` | Renders as a `<strong>` element for non-interactive content |
| Required | Displays an asterisk before the label text |
| Hidden | Visually hidden but remains in the accessibility tree |
| Locked readonly | Displays a lock icon indicator |

### Accessibility

**WCAG compliance:**

- **1.3.1 Info and Relationships** — Programmatically associates label with input via `htmlFor`
- **2.5.3 Label in Name** — Visible label text matches the accessible name

**Do not** place interactive elements (anchors, buttons) inside `IressLabel`. This makes it difficult to activate the associated form input. See [MDN Label accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#accessibility_concerns).

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| Click on label | Focuses the associated form control |

### Edge cases

- **Labelling non-interactive content**: Omit `htmlFor` to render as `<strong>` instead of `<label>`
- **Nested test IDs**: `my-label__text` reaches the label text span
- **Rich content**: Custom children are rendered inside the label element
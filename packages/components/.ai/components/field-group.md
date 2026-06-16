# FieldGroup

> Groups related form fields together with a shared legend, description, and validation message.

## Import

```tsx
import { IressFieldGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/FieldGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=field-group&title=[FieldGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=field-group,enhancement&title=[FieldGroup]+Feature:+)

Groups multiple related fields together using a `fieldset` and `legend` for accessibility.

<StoryEmbed id="components-fieldgroup--inline"/>

## Design

### When to use

- **Related inputs**: Group radio buttons, checkboxes, or inputs that share a common label (e.g. "Address" with street, city, postcode)
- **Inline fields**: Combine multiple short fields on one line (e.g. first name + last name)
- **Joined inputs**: Visually connect inputs that form a single value (e.g. phone prefix + number)

### When not to use

- **Single field with label** — use [Field](../components/field.md) instead
- **Unrelated fields** — don't group fields just for layout; use [Row](../components/row.md) and [Col](../components/col.md)

### Content guidelines

- **Legend**: Describe the group's purpose (e.g. "Contact details", "Payment method")
- Use sentence case for legends
- Keep legends concise — they're read by screen readers before each field in the group

### Related patterns

- [Field](../components/field.md) — for single input + label + error
- [Form](../patterns/form.md) — for full form patterns with validation
- [Inline](../components/inline.md) — for layout without fieldset semantics

## Develop

### Quick Start

```tsx
import { IressFieldGroup, IressField, IressInput } from '@iress-oss/ids-components';

<IressFieldGroup label="Full name" inline>
  <IressField label="First name">
    <IressInput />
  </IressField>
  <IressField label="Last name">
    <IressInput />
  </IressField>
</IressFieldGroup>
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs#api-props)

### Usage

#### Inline

Fields arranged horizontally within the group.

<StoryEmbed id="components-fieldgroup--inline"/>

#### Inline with sink

Inline fields with error messages that sink below without disrupting layout.

<StoryEmbed id="components-fieldgroup--inline-sink"/>

#### Joined

Visually connected fields that form a single value.

<StoryEmbed id="components-fieldgroup--join"/>

#### Joined with sink

Joined fields with error sink behaviour.

<StoryEmbed id="components-fieldgroup--join-sink"/>

### Testing

Query the field group by its `group` role:

```tsx
const group = screen.getByRole('group', { name: 'Full name' });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs#testing)

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-fieldgroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders a `<fieldset>` with a visible `<legend>` |
| Inline | Children arranged horizontally with gap |
| Join | Children visually connected (shared border radius) |
| Error | Individual child fields show their own errors |

### Accessibility

- Renders as `<fieldset>` with `<legend>` — screen readers announce the legend before each field
- **WCAG 1.3.1 Info and Relationships** — programmatic grouping communicates field relationships
- Use `IressFieldGroup` instead of wrapping with `role="group"` manually

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves between fields within the group |

### Edge cases

- **Nested groups**: Avoid nesting `IressFieldGroup` inside another `IressFieldGroup` — screen readers announce each legend
- **Single child**: Valid but unnecessary — use `IressField` directly
# Toggle

> Renders a switch control for toggling between on and off states.

## Import

```tsx
import { IressToggle } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Toggle)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=toggle&title=[Toggle]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=toggle,enhancement&title=[Toggle]+Feature:+)

Toggles allow users to turn things on or off. When toggled, the associated change happens straight away.

```tsx
<IressToggle layout="inline">Toggle</IressToggle>;
```

## Design

### When to use

- **Immediate effect settings**: WiFi on/off, dark mode, notifications
- **Binary preferences**: Any setting with exactly two mutually exclusive states
- **Standalone controls**: Settings that take effect instantly without a save action

### When not to use

- **Form submissions** — use a Checkbox instead; toggles don't submit values with forms
- **Multiple related options** — use a Checkbox group or Radio group
- **Actions that need confirmation** — use a Button with a confirmation dialog

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use for immediate on/off changes | Use toggles inside forms that need submission |
| Always provide a label (visible or hidden) | Use a toggle without any label |
| Use `defaultChecked` for uncontrolled usage | Use toggles for actions that require a save step |

### Content guidelines

- **Labels**: Use sentence case, describe what will happen when on (e.g. "Show notifications")
- **State clarity**: The toggle's visual state should make it obvious whether the feature is on or off

### Related patterns

- [Checkbox](../components/checkbox.md) — for form inputs that submit values
- [Radio Group](../components/radio-group.md) — for mutually exclusive selections in forms

## Develop

### Quick Start

```tsx
import { IressToggle } from '@iress-oss/ids-components';

<IressToggle>Toggle</IressToggle>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs#api-props)

### Usage

#### Labels

Toggles should always have a label, set via `children`.

```tsx
<IressToggle layout="inline">Toggle</IressToggle>;
```

#### Hidden labels

Use `hiddenLabel` to visually hide the label while keeping it accessible to screen readers.

```tsx
<IressToggle hiddenLabel layout="inline">
  Toggle
</IressToggle>;
```

#### Checked

Use `checked` for controlled state, or `defaultChecked` for uncontrolled.

```tsx
import { IressToggle } from '@iress-oss/ids-components';
import { useState } from 'react';

export function ControlledToggle() {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <IressToggle checked={isChecked} onChange={() => setIsChecked(!isChecked)}>
      Controlled Toggle
    </IressToggle>
  );
}
```

#### Layout

The `layout` prop controls label position:

- `inline` (default)
- `inline-between` — label and control at opposite ends
- `inline-reverse` — label after the control
- `stack` — label above the control

```tsx
import {
  IressPanel,
  IressStack,
  IressText,
  IressToggle,
} from '@iress-oss/ids-components';

export function ToggleLayout() {
  return (
    <IressStack gap="lg">
      <IressText>
        <h3>inline</h3>
        <IressPanel>
          <IressToggle layout="inline">Toggle</IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>inline-between</h3>
        <IressPanel>
          <IressToggle layout="inline-between" defaultChecked>
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>inline-reverse</h3>
        <IressPanel>
          <IressToggle layout="inline-reverse">Toggle</IressToggle>
        </IressPanel>
      </IressText>
      <IressText>
        <h3>stack</h3>
        <IressPanel>
          <IressToggle layout="stack" defaultChecked>
            Toggle
          </IressToggle>
        </IressPanel>
      </IressText>
    </IressStack>
  );
}
```

### Testing

Query the toggle by its `switch` role (not `checkbox`):

```tsx
const toggle = screen.getByRole('switch', { name: 'Dark mode' });
await user.click(toggle);
expect(toggle).toBeChecked();
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the toggle | `getByRole('switch', { name: '...' })` | `toggle` |
| label | The toggle label element | `getByText('...')` | `toggle__label` |
| button | The toggle switch button | — | `toggle__button__button` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-toggle--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Unchecked | Toggle is in the off position |
| Checked | Toggle is in the on position; change takes effect immediately |
| Controlled | State driven by `checked` prop and `onChange` handler |
| Uncontrolled | Initial state set by `defaultChecked`; internal state management |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="switch"` with `aria-checked` to communicate state
- **2.1.1 Keyboard** — Toggle is operable via keyboard
- **1.3.1 Info and Relationships** — Label is programmatically associated

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Space` | Toggle the switch on/off |
| `Enter` | Toggle the switch on/off |
| `Tab` | Move focus to/from the toggle |

### Edge cases

- **No label**: Always provide a label; use `hiddenLabel` if it must be visually hidden
- **Inside forms**: Toggle does not participate in form submission — use Checkbox instead
- **Rapid toggling**: Each toggle fires `onChange` immediately; debounce in the handler if needed
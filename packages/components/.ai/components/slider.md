# Slider

> Allows users to select a value from a range by dragging a handle.

## Import

```tsx
import { IressSlider } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Slider)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=slider&title=[Slider]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=slider,enhancement&title=[Slider]+Feature:+)

Sliders provide a visual indication of adjustable content, where the user can select a value from a range usually represented on a horizontal track.

```tsx
<IressSlider defaultValue={3} />;
```

## Design

### When to use

- **Numeric ranges**: Allow users to select a value within a defined range (e.g. volume, price)
- **Visual feedback**: When users benefit from seeing their position within a range
- **Approximate values**: When an exact number is less important than a relative position

### When not to use

- **Exact numeric entry** — use an Input with type `number`
- **Very large ranges** — a slider with hundreds of steps is hard to control precisely
- **Non-numeric values** — use a Select or Radio group

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use tick labels for key values | Use a slider without any indication of the range |
| Set meaningful `min`, `max`, and `step` | Use very large step counts that make precise selection difficult |
| Provide a label via `IressField` | Use a slider without an accessible label |
| Use `formatValue` for custom display | Rely solely on the tooltip for value communication |

### Content guidelines

- **Labels**: Always pair with a Field or label that describes what the slider controls
- **Tick labels**: Use short values; hide less important labels on small screens with `srOnly`

### Related patterns

- [Field](../components/field.md) — wraps the slider with a label, hint, and error support
- [Input](../components/input.md) — for precise numeric entry

## Develop

### Quick Start

```tsx
import { IressSlider } from '@iress-oss/ids-components';

<IressSlider min={0} max={100} defaultValue={50} />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs#api-props)

### Usage

#### Default value

Set the initial value with `defaultValue`. Use `value` + `onChange` for controlled state.

```tsx
<IressSlider defaultValue={3} />;
```

#### Min, max and step

Configure the selectable range and increment size.

```tsx
<IressSlider min={10} max={100} step={10} />;
```

#### Ticks and labels

Use `tickLabels` to display value markers along the track. Pass an array of numbers, `TickLabel` objects, or `true` to auto-infer from min/max/step.

```tsx
<IressSlider
  min={0}
  max={200}
  step={20}
  tickLabels={[
    { value: 0, label: 'Zero' },
    { value: 20 },
    { value: 40 },
    { value: 60 },
    { value: 80 },
    { value: 100 },
    { value: 120 },
    { value: 140 },
    { value: 160 },
    { value: 180 },
    { value: 200, label: 'All' },
  ]}
/>;
```

#### Flexible ticks and labels

`min`, `max` and `step` are no longer automatically inferred from `tickLabels`. Use `formatValue` for custom tooltip display.

```tsx
<IressSlider
  min={-10}
  max={50}
  formatValue={(value) => `${value}°C`}
  tickLabels={[
    {
      value: 0,
      label: (
        <>
          0°C <br />
          Hypothermia
        </>
      ),
    },
    {
      value: 37,
      label: (
        <>
          37°C <br />
          Normal
        </>
      ),
    },
    {
      value: 45,
      label: (
        <>
          45°C <br />
          Wicked witch
          <br />
          of the west
        </>
      ),
    },
  ]}
/>;
```

#### Hidden labels

Use the `srOnly` property in `TickLabel` objects to hide labels on specific breakpoints while keeping them accessible.

```tsx
<IressSlider
  min={0}
  max={200}
  step={20}
  tickLabels={[
    { value: 0, label: 'Zero' },
    { value: 20, srOnly: { base: true, xl: false } },
    { value: 40, srOnly: { base: true, xl: false } },
    { value: 60, srOnly: { base: true, xl: false } },
    { value: 80, srOnly: { base: true, xl: false } },
    { value: 100 },
    { value: 120, srOnly: { base: true, xl: false } },
    { value: 140, srOnly: { base: true, xl: false } },
    { value: 160, srOnly: { base: true, xl: false } },
    { value: 180, srOnly: { base: true, xl: false } },
    { value: 200, label: 'All' },
  ]}
/>;
```

#### Read only

Use the `readOnly` prop to render the slider as read-only with a displayed value.

```tsx
<IressSlider
  min={0}
  max={200}
  step={20}
  value={0}
  readOnly
  tickLabels={[
    { value: 0, label: 'Zero' },
    { value: 200, label: 'All' },
  ]}
/>;
```

### Testing

Query the slider by its role:

```tsx
const slider = screen.getByRole('slider', { name: 'Volume' });
```

**Note:** `userEvent` does not work with range inputs. Use `fireEvent.change`:

```tsx
import { fireEvent } from '@testing-library/react';
fireEvent.change(screen.getByRole('slider'), { target: { value: '5' } });
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the slider | — | `slider` |
| slider | The range input element | `getByRole('slider')` | `slider__slider` |
| datalist | The tick marks datalist | — | `slider__datalist` |
| option | An individual tick mark option | — | `slider__datalist__option` |

---

### Storybook

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slider--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Slider shows at `defaultValue` or `min` position |
| Dragging | Thumb follows pointer; value updates in real time |
| Controlled | Value driven by `value` prop and `onChange` |
| Read only | Renders value as plain text; slider role removed |
| Step constraint | Thumb snaps to nearest valid step value |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- **2.1.1 Keyboard** — Fully operable via keyboard
- **1.3.1 Info and Relationships** — Label associated via `aria-labelledby` or wrapping Field

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Arrow Right` / `Arrow Up` | Increase value by one step |
| `Arrow Left` / `Arrow Down` | Decrease value by one step |
| `Home` | Set to minimum value |
| `End` | Set to maximum value |
| `Page Up` | Increase by a larger step (10× step or 10% of range) |
| `Page Down` | Decrease by a larger step |

### Edge cases

- **readOnly removes slider role**: Query by text content instead of role when read-only
- **Tick labels with `srOnly`**: Labels are always available to screen readers regardless of visibility
- **`formatValue`**: Custom formatted node replaces the value tooltip but does not affect `aria-valuenow`
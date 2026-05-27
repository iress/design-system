# Slider

Sliders provide a visual indication of adjustable content, where the user can select a value from a range usually represented on a horizontal track.

> **Component:** `import { IressSlider } from '@iress-oss/ids-components'`
> **Storybook:** [Slider in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-slider--docs)

## Quick Start

```tsx
import { IressSlider } from '@iress-oss/ids-components';

<IressSlider />
```

## Examples

### Default value

You can set the initial value of the slider using the `defaultValue` prop. If you would like to use a controlled slider, use the `value` prop and sync it with your state using `onChange`.

```tsx
<IressSlider defaultValue={3} />
```

[View "DefaultValue" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-slider--default-value)

### Min, max and step

To change the selectable values of the default slider you can change the `min`, `max` and `step` properties.

For instance, if you set `min` to 10 and `max` to 100 the user is able to select any number between 10 and 100.

By setting the `step` property to 10, for example, the user will only be able to select numbers in increments of ten i.e. 10, 20, 30, 40, 50, 60, 70, 80, 90, 100; as shown in the below example.

```tsx
<IressSlider min={10} max={100} step={10} />
```

[View "MinMaxAndStep" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-slider--min-max-and-step)

### Ticks and labels

It is also possible to include ticks and labels for selectable values. This can be done by using the `tickLabels` property and providing an array of numbers and/or `TickLabel` objects.

The `TickLabel` object takes value/label pairs. The value is required, however, an optional label property can be provided. If the label property is not specified, slider will display the value for the label.

If you provide an array of `TickLabel` objects, the value tooltip (the one that appears above the slider's thumb) will use the label from its matching value.

The `tickLabels` prop can also be set to true, in which case they will automatically be inferred from `min`, `max` and `step`.

```tsx
<IressSlider min={0} max={200} step={20} />
```

[View "TicksAndLabels" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-slider--ticks-and-labels)

### Flexible ticks and labels

As of version 5, `min`, `max` and `step` is no longer automatically inferred from `tickLabels`, allowing you to have more flexible `tickLabels`.

You can also use the `formatValue` prop to provide a formatted node to replace the value tooltip.

```tsx
<IressSlider max={50} />
```

[View "FlexibleTicksAndLabels" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-slider--flexible-ticks-and-labels)

### Hidden labels

Specific labels can be hidden for all or specified breakpoints. This can be done by using the `srOnly` property in the `TickLabel` object.

When a label is set to hide on a certain breakpoint, it will be hidden on the screen from that breakpoint onwards. You can reveal it on a larger breakpoint by setting the larger breakpoint to false.

1. To set the label to hide on all breakpoints you can set the xs property to true: `srOnly: { xs: true }`.
2. To only show on md and above you can `srOnly: { xs: true, md: false }`.

#### Behavior considerations

- The labels will always be available to screen readers to ensure best accessibility, as screen readers are not confined by screen space.
- The `ticksAndLabels` prop will still be used to match the `value` of the slider, even if its been set to be hidden on the user's screen.

```tsx
<IressStack gap="md">
<IressPanel bg="alt">
<IressText>
<CurrentBreakpoint />
</IressText>
</IressPanel>
<IressSlider />
</IressStack>
```

[View "HiddenLabels" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-slider--hidden-labels)

### Read only

Sliders can be set to read only by using the `readOnly` property. When set to read only the slider will render a read only input and display the specified value.

If you need more control over the read-only state (for example, rendering a stylised version of the value), you can use the [`IressReadonly` component](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-readonly--docs).

```tsx
<IressSlider min={0} max={200} step={20} value={0} readOnly />
```

[View "ReadOnly" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-slider--read-only)

## Testing

Query the slider by its role:

```tsx
const slider = screen.getByRole('slider', { name: 'Volume' });
```

### Gotchas

- **`userEvent` does not work on range inputs**: Due to a
  [known limitation](https://github.com/testing-library/user-event/issues/1067),
  `userEvent` cannot change range input values. Use `fireEvent.change` instead:

  ```tsx
  import { fireEvent } from '@testing-library/react';

  fireEvent.change(screen.getByRole('slider'), { target: { value: '5' } });
  ```

- **readOnly removes the slider role**: When `readOnly` is set, the slider role
  is removed and the value is displayed as plain text via `IressReadonly`.

### Test IDs

When you pass a `data-testid` to `IressSlider`, the following nested test IDs
are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `slider` | `my-slider__slider` | The range input element |
| `datalist` | `my-slider__datalist` | The tick marks datalist |
| `option` | `my-slider__option` | An individual tick mark option |

## Props

- **Type:** `IressSliderProps`
- **Type declarations:** `@iress-oss/ids-components/dist/components/Slider/Slider.d.ts`

```typescript
import type { IressSliderProps } from '@iress-oss/ids-components';
```


---

*View interactive examples: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-slider--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-slider--docs)*

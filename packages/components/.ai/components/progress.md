# Progress

> Visualises the completion status of a task or process as a progress bar.

## Import

```tsx
import { IressProgress } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Progress)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=progress&title=[Progress]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=progress,enhancement&title=[Progress]+Feature:+)

A progress component is used to indicate to a user the completion of a set of tasks or a process.

```tsx
<IressProgress min={10} max={30} value={20} />;
```

## Design

### When to use

> **Prefer [IressLoading](../patterns/loading.md)** for page/component loading states — it handles skeleton display, timing, and accessibility automatically.

- **Determinate progress**: When you know the completion percentage (e.g. file uploads, multi-step forms)
- **Step indicators**: Show progress through a multi-part process using `sectionTitle`
- **Upload/download progress**: Visualise file transfer progress

### When not to use

- **Indeterminate loading** (unknown duration) — use [Spinner](../components/spinner.md) or [Loading](../patterns/loading.md)
- **Content placeholders** — use [Skeleton](../components/skeleton.md) for layout-preserving loading states
- **Navigation between steps** — use a stepper or wizard pattern with interactive controls

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Set `min` and `max` to match your data range | Leave default 0–100 when your values differ |
| Use `sectionTitle` with tokens for screen readers | Display a progress bar without context for the user |
| Update progress in meaningful increments | Animate progress too frequently (causes layout thrashing) |

### Content guidelines

- **Section title**: Use the `{{current}}` and `{{max}}` tokens to provide context (e.g. "Step {'{{current}}'} of {'{{max}}'}")
- **Visual context**: Pair the progress bar with a text label explaining what is being loaded

### Related patterns

- [Loading](../patterns/loading.md) — full loading pattern with timing and accessibility
- [Spinner](../components/spinner.md) — for indeterminate loading
- [Skeleton](../components/skeleton.md) — for layout-preserving placeholders

## Develop

### Quick Start

```tsx
import { IressProgress } from '@iress-oss/ids-components';

<IressProgress min={0} max={100} value={50} />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs#api-props)

### Usage

Progress shows how far through a task or operation you are in a graphical way. The simplest way to use it to set the `value` to specify how much of the task the user has completed, relative to the `max` value (which defaults to 100).

#### Calculation to convert value into width

```tsx
Math.round(((this.value - this.min) / (this.max - this.min)) * 100);
```

This caters for those scenarios where the `min` or `max` values change.

#### Boundary limits

There is a danger that the value can exceed the boundaries set in the `min` and `max` values. To prevent this:

- If the `value` is less than the `min` prop, it is reset to the `min` prop
- If the `value` is more than the `max` prop, it is reset to the `max` prop

#### Section Title

The `sectionTitle` prop is used by assistive technologies and allows you to tailor the message announced when the progress component is selected. It supports two tokens:

- `{'{{current}}'}` — replaced with the `value`
- `{'{{max}}'}` — replaced with the maximum limit

For example, with a max of 10 and value of 6, the screen reader will announce: "Step 6 of 10"

#### Progress variants

The following examples demonstrate different ways to use the Progress component:

- **Empty state**: Shows a progress bar at 0% completion
- **Partial progress**: Shows a progress bar with partial completion (using custom min/max values)
- **With section title**: Uses the `sectionTitle` prop with tokens to display "Step X of Y"
- **With background image**: Demonstrates using a custom background image for visual interest

```tsx
import { IressProgress, IressStack } from '@iress-oss/ids-components';

export function ProgressExamples() {
  return (
    <IressStack gap="md">
      <IressProgress min={0} max={50} value={0} />
      <IressProgress min={10} max={30} value={20} />
      <IressProgress
        min={0}
        max={50}
        value={30}
        sectionTitle="Step {{current}} of {{max}}"
      />
      <IressProgress
        min={0}
        max={100}
        value={75}
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2858&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </IressStack>
  );
}
```

### Testing

Query the progress bar by its role:

```tsx
const progress = screen.getByRole('progressbar');
expect(progress).toHaveValue(75);
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the progress | `getByRole('meter')` when min, max, and value are all provided, otherwise `getByRole('progressbar')` | `progress` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders a horizontal bar filled to the calculated percentage |
| Value below min | Clamped to `min` value |
| Value above max | Clamped to `max` value |
| With section title | Assistive technologies announce contextual progress message |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **1.3.1 Info and Relationships** — `sectionTitle` provides programmatic context for screen readers

**Keyboard interaction:**

Progress bars are not interactive and do not receive focus.

### Edge cases

- **Value equals min**: Renders an empty bar (0% width)
- **Value equals max**: Renders a full bar (100% width)
- **Dynamic min/max changes**: Width recalculates automatically based on the formula

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-progress--docs)
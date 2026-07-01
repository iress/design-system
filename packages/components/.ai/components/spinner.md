# Spinner

> Displays an animated loading indicator to signal an ongoing process.

## Import

```tsx
import { IressSpinner } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Spinner)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=spinner&title=[Spinner]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=spinner,enhancement&title=[Spinner]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| flip | `both` , `horizontal` , `vertical` | — | Flip the icon horizontally, vertically or both axes. |
| type | `material` | — | The icon provider to use Note: Font Awesome is deprecated. Please migrate to Material Symbols. |
| set | `undefined` | `'fal'` | The icon set to be used (Font Awesome only): - `fal`: Font Awesome Light - `fab`: Font Awesome Brand @deprecated Font Awesome is deprecated. Please migrate to Material Symbols. |
| screenreaderText | `string` | — | Adds screen reader text if the icon needs to be visible to screen reader users Screen reader text for the chatty spinner. |
| rotate | 180 , `270`, 90  | — | Amount of degrees to rotate the icon. |
| spin | `half`, 1 , 2 , 3  | `half` | Accepts a numeric value for speed for one rotation. Spin speed of spinner. |
| filled | `boolean` | `false` | Filled variant for Material Symbols When true, icon uses filled style (fill=1) Useful for active/selected states |
| fixedWidth | `undefined` | — | Adds fixed width class for Font Awesome icons - fa-fw @deprecated Font Awesome specific. Material Symbols inherit text size automatically. |
| variant | `chatty`, `default`  | — | Variant of spinner. - 'default': Standard rotating spinner Variant of spinner. - 'chatty': Animated dots for chatting/typing indicator |

📄 [Full type definition](../../dist/components/Spinner/Spinner.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Spinners notify the user that a task is being processed. They indicate that the app is busy, and should be used when the user has to wait for more than a few seconds.

```tsx
<IressSpinner screenreaderText="Making magic happen..." />;
```

## Design

### When to use

> **Prefer [IressLoading](../patterns/loading.md)** — the Loading pattern handles timing and accessibility automatically. Use `IressSpinner` directly only when you need a standalone spinning indicator outside of a loading state.

- **Inline loading indicators**: Show a spinner next to a button or field during an async action
- **Chat typing indicators**: Use the `chatty` variant to show someone is typing
- **Custom loading UIs**: When building a bespoke loading experience not covered by `IressLoading`

### When not to use

- **Page or component loading states** — use [IressLoading](../patterns/loading.md) which handles skeleton display, timing, and accessibility
- **Determinate progress** — use [Progress](../components/progress.md) when you know the completion percentage
- **Content placeholders** — use [Skeleton](../components/skeleton.md) for layout-preserving loading states

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Provide `screenreaderText` or a visible `message` | Use a spinner without any accessible label |
| Use for indeterminate waits (unknown duration) | Use a spinner when you can show a progress bar |
| Keep messages concise ("Loading...", "Saving...") | Display spinners indefinitely without timeout handling |

### Related patterns

- [Loading](../patterns/loading.md) — full loading pattern with timing, fade-in, and accessibility
- [Skeleton](../components/skeleton.md) — layout-preserving placeholders
- [Progress](../components/progress.md) — for determinate progress indicators

## Develop

### Quick Start

```tsx
import { IressSpinner } from '@iress-oss/ids-components';

<IressSpinner screenreaderText="Loading..." />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs#api-props)

### Standalone

When using the spinner on its own, you can define the `screenreaderText` prop to provide context to screen readers.

```tsx
<IressSpinner screenreaderText="Making magic happen..." />;
```

### Chatty variant

The chatty variant displays an animated "typing" indicator with three dots. This is commonly used in chat interfaces to show that another user or system is currently typing a message.

```tsx
<IressSpinner variant="chatty" screenreaderText="User is typing..." />;
```

### Message

You can display a message alongside the spinner. In this case, you do not need to define the `screenreaderText` prop, as you have a visible message to the user telling them what is happening.

```tsx
<IressInline gap="sm" verticalAlign="middle">
  <IressSpinner color="colour.neutral.70" />
  <IressText color="colour.neutral.70">Making magic happen...</IressText>
</IressInline>;
```

### Testing

The query depends on the spinner variant:

**Default spinner** — renders as a decorative icon with `aria-hidden="true"`.
Wrap it in a container with an accessible label, or query by `data-testid`:

```tsx
const spinner = screen.getByTestId('my-spinner');
```

**Chatty spinner** (`variant="chatty"`) — renders with `role="status"`:

```tsx
const spinner = screen.getByRole('status');
```


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the spinner. Default variant is decorative (aria-hidden); chatty variant has role="status" | `getByRole('status')` for the chatty variant, or `getByTestId('...')` for the decorative default | `spinner` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders an animated spinning indicator |
| Chatty | Renders three animated dots for typing indication |
| With message | Displays visible text alongside the spinner |

### Accessibility

**WCAG compliance:**

- **1.1.1 Non-text Content** — `screenreaderText` provides an accessible name for the spinner
- **4.1.3 Status Messages** — Chatty variant uses `role="status"` for polite announcements

**Keyboard interaction:**

Spinners are not interactive and do not receive focus.

### Edge cases

- **No `screenreaderText` or `message`**: The spinner is purely decorative and hidden from assistive technologies — ensure context is provided by a parent element
- **Long-running operations**: Consider adding a timeout and showing an error state if the operation takes too long

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-spinner--docs)
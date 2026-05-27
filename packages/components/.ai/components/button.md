# Button
A button is a clickable item used to perform an action.
> **Component:** `import { IressButton } from '@iress-oss/ids-components'`
> **Storybook:** [Button in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-button--docs)```tsx
```

## Quick Start

```tsx
<IressButton>
  Button
</IressButton>
```

## Usage

### Avoid using `disabled`

IDS discourages using `disabled` on `IressButton`. Although the native HTML `disabled` attribute is supported via the underlying `<button>`/`<a>` element, it is an anti-pattern that should be avoided because:

- Screen readers skip disabled elements, making them invisible to assistive technology users
- Users cannot understand why a button is disabled or what they need to do to enable it
- It creates a poor user experience with no path to resolution

<details>
<summary>Alternatives by use case</summary>

**"Form is incomplete"** — Keep the submit button enabled. Use `IressForm` with `rules` validation — it will show inline errors on submit and prevent submission until the form is valid.

```tsx
// ❌ Disabling submit until form is valid
<IressButton disabled={!isValid} type="submit">Save</IressButton>

// ✅ Let IressForm handle validation on submit
<IressForm onSubmit={handleSubmit}>
  <IressFormField
    name="email"
    label="Email"
    rules={{ required: 'Email is required' }}
    render={(props) => <IressInput {...props} type="email" />}
  />
  <IressButton mode="primary" type="submit">Save</IressButton>
</IressForm>
```

**"Action is in progress"** — Use the `loading` prop. It shows a spinner, announces the state to screen readers, and automatically prevents duplicate clicks.

```tsx
// ❌ Disabling during submission
<IressButton disabled={isSubmitting}>Save</IressButton>

// ✅ Use loading — prevents clicks and communicates state
<IressButton loading={isSubmitting} mode="primary" type="submit">Save</IressButton>
```

**"User lacks permission"** — Hide the button entirely, or keep it enabled and show an explanation when clicked.

```tsx
// ❌ Showing a disabled button the user can never enable
<IressButton disabled={!canEdit}>Edit</IressButton>;

// ✅ Option A — don't render the button at all
{
  canEdit && <IressButton onClick={handleEdit}>Edit</IressButton>;
}

// ✅ Option B — explain on click
<IressButton onClick={() => (canEdit ? handleEdit() : showPermissionError())}>
  Edit
</IressButton>;
```

**"Prerequisite step not completed"** — Guide the user to the prerequisite instead of silently disabling.

```tsx
// ❌ Disabled with no explanation
<IressButton disabled={!hasSelectedItem}>Delete</IressButton>

// ✅ Explain what's needed
<IressButton onClick={() => !hasSelectedItem ? showAlert('Select an item first') : confirmDelete()}>
  Delete
</IressButton>
```

**"Destructive action needs confirmation"** — Use `IressModal` with `status="danger"` for a confirmation step.

</details>

## Examples

### Modes

The `mode` prop controls the visual appearance and priority of the button.

- **Primary:** Use for the main call to action. Limit to one per view.
- **Secondary:** Use for secondary calls to action.
- **Tertiary:** Use when you need extra affordance between your secondary actions.
- **Quaternary:** Use for less prominent actions, often used for preference toggles (eg. Collapse all).
- **Muted:** Use for less prominent actions, often in toolbars or inline with headings. Mainly used for icon-only buttons.

```tsx
<IressInline gap="md">
<IressButton mode="primary">
Primary button
</IressButton>
<IressButton mode="secondary">
Secondary button
</IressButton>
<IressButton mode="tertiary">
Tertiary button
</IressButton>
<IressButton mode="quaternary">
Quaternary button
</IressButton>
<IressButton mode="muted" icon="share">
Share
</IressButton>
</IressInline>
```

[View "Mode" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--mode)

### Status

The `status` prop allows you to apply a visual status to the button.

- **Success:** Usually used to indicate an action that should be perceived as positive, such as "Confirm" or "Buy".
- **Danger:** Use for destructive actions, such as "Delete" or "Remove". Also used for actions that are perceived as negative, such as "Cancel" or "Sell".

```tsx
<IressStack gap="md">
<IressInline gap="md">
<IressButton mode="primary" status="success">
Primary button
</IressButton>
<IressButton mode="secondary" status="success">
Secondary button
</IressButton>
<IressButton mode="tertiary" status="success">
Tertiary button
</IressButton>
<IressButton mode="quaternary" status="success">
Quaternary button
</IressButton>
<IressButton
mode="muted"
status="success"
icon="shopping_cart">
Add to cart
</IressButton>
</IressInline>
<IressInline gap="md">
<IressButton mode="primary" status="danger">
Primary button
</IressButton>
<IressButton mode="secondary" status="danger">
Secondary button
</IressButton>
<IressButton mode="tertiary" status="danger">
Tertiary button
</IressButton>
<IressButton mode="quaternary" status="danger">
Quaternary button
</IressButton>
<IressButton mode="muted" status="danger" icon="delete">
Delete
</IressButton>
</IressInline>
</IressStack>
```

[View "Status" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--status)

### Types

The `type` property controls the behaviour of the button. It defaults to `button`, which is the best option for most situations, but can also be set to `submit` or `reset`. `submit` should be used for buttons that submit forms, and `reset` should be used if the button clears form data and resets the form to its original state.

**Please note:** this differs from a standard HTML button element, where the `type` defaults to submit.

```tsx
<IressInline gap="md">
<IressButton type="button">
button
</IressButton>
<IressButton type="submit">
submit
</IressButton>
<IressButton type="reset">
reset
</IressButton>
</IressInline>
```

[View "Types" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--types)

### Loading

Loading buttons give the user an indication something is happening (eg. a form submission or extra content being loaded) after they have been triggered.

The loading state can be activated by setting the `loading` prop to `true`. To customise the screen reader announcement, pass a string instead of `true` (e.g. `loading="Submitting…"`). The default announcement is "Loading".

When the loading state is activated, any click events on the button are disabled.

```tsx
<IressInline gap="md">
<IressButton mode="primary">
...
</IressButton>
<IressButton mode="secondary">
...
</IressButton>
<IressButton mode="tertiary">
...
</IressButton>
<IressButton mode="quaternary">
...
</IressButton>
<IressButton mode="muted">
<IressIcon name="edit" />
</IressButton>
</IressInline>
```

[View "Loading" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--loading)

### Buttons as links

The `href` prop allows you to create a link that looks like a button. When set, the component will render an HTML anchor element instead of an HTML button element. This can be useful when you want to increase the target area and visual weight of a link, without changing the markup.

A good example of this is the Next and Previous links in a wizard layout. These should be HTML links (to tells the user that navigation will occur when clicked) but styling them as buttons makes them more prominent.

You can also use the link specific props `target` and `rel`.

```tsx
<IressButton href="https://www.iress.com/" rel="opener noreferrer" target="_blank">
  This is a link (anchor tag)
</IressButton>
```

[View "ButtonsAsLinks" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--buttons-as-links)

### Delete confirmation

> [!WARNING]
> **Make sure that the user understands the consequences of clicking the button**
>
> You may want to add a confirmation step to prevent accidental data loss if the
>   action is irreversible.

The confirmation step should be a modal with a simple message, as with the example below. Use a delete button for the modal's primary call to action, and use a secondary button for the cancel action.

If you're using a heading, ensure that it has an appropriate heading level to match the document structure. You should use a danger variant of the `IressText` element, with the element prop set to the appropriate heading level.

```tsx
<IressButton status="danger">
  Delete button with confirm
</IressButton>
```

[View "DeleteConfirmation" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--delete-confirmation)

### Fluid

If the `fluid` prop is set to true, the button will expand to be 100% of the width of its container.

The `fluid` prop can also be set to a breakpoint size, which means the button will be fluid up until its breakpoint is passed.

```tsx
<IressInline gap="md">
<IressText element="p">
Please resize your screen to see how the fluid value changes. Current
breakpoint: <CurrentBreakpoint renderLabel="and-above" />.
</IressText>
<IressButton fluid>
Always fluid
</IressButton>
<IressButton fluid="md">
Fluid on xs and sm
</IressButton>
</IressInline>
```

[View "Fluid" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--fluid)

### Wrapping text

Button text will wrap on to a new line if there's not enough space for the text to sit on a single line. If you want to prevent the text from wrapping, you can set the `noWrap` prop to `true`.

If your button contains a lot of text, the text may wrap on to more than one line. You can manage this on a case by case basis by setting a minimum width on your button via CSS if you need to.

```tsx
<IressText style={{ width: 250 }}>
<p>
<IressButton>
Button with lots of text content that will wrap (default behaviour)
</IressButton>
</p>

<p>
<IressButton style={{ minWidth: 300 }}>
Button with lots of text content and a minimum width set via CSS
</IressButton>
</p>

<p>
<IressButton noWrap>
Button with lots of text content with the noWrap prop set to true
</IressButton>
</p>
</IressText>
```

[View "WrappingText" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--wrapping-text)

### Prepend & Append

Use the `prepend` and `append` props to correctly position icons or badges inside buttons.

- **`prepend`** — Places the element before the button text
- **`append`** — Places the element after the button text
- **`icon`** — Convenience prop for setting the icon name directly (useful for icon-only buttons)

The `iconOnly` slot from previous versions of IDS (v4 and below) has been removed. Use the `icon` prop instead.

> **⚠️ Do not use `slot` attributes on children** (e.g. `<IressIcon slot="start" />`). The `slot` attribute is a legacy v4 pattern that is no longer supported. Always use the `prepend` and `append` props.

```tsx
<IressStack gap="md">
<IressInline gap="md">
<IressButton prepend={<IressIcon name="home" />}>
Prepend icon
</IressButton>
</IressInline>

<IressInline gap="md">
<IressButton append={<IressIcon name="home" />}>
Append icon
</IressButton>

<IressButton append={<IressPill>+999</IressPill>}>
Append pill
</IressButton>
</IressInline>

<IressInline gap="md">
<IressButton icon="home">
Home
</IressButton>
</IressInline>
</IressStack>
```

[View "Slots" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--slots)

### Download button

When a `href` is provided, the `download` prop can be used to indicate that the link should download a file instead of navigating to it. This is useful for links to files such as PDFs or images.

```tsx
<IressButton download prepend={<IressIcon name="download" />} />
```

[View "DownloadButton" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--download-button)

### Element

You can use the `element` prop to render a custom component as the button. This is useful for rendering a component from a third-party library, such as `react-router-dom`.

```tsx
<RoutingButton />
```

[View "Element" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-button--element)

## `IressCloseButton`

`IressCloseButton` is a special variant of `IressButton` that is used to execute a close action. It is used in modals, slideouts, and other components that require a close button.

It has one additional prop, `screenReaderText`, which is used to provide a screen reader only label for the close button.

[View "CloseButton" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-close-button--close-button)

## Testing

Query buttons by their accessible role:

```tsx
const button = screen.getByRole('button', { name: 'Submit' });
```

When `href` is provided, the button renders as a link:

```tsx
const link = screen.getByRole('link', { name: 'Go to dashboard' });
```

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-button--docs)

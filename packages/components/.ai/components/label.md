# Label
Use the IressLabel component when building bespoke form inputs and IressField is too restrictive.
> **Component:** `import { IressLabel } from '@iress-oss/ids-components'`
> **Storybook:** [Label in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-label--docs)```tsx
```

## Quick Start

```tsx
<IressLabel>
  This is a label
</IressLabel>
```

## Examples

### Required

To indicate that an input is required, you may use the `required` prop to distinguish the label with an asterix.

```tsx
<IressLabel required>
  This is a label for a required input
</IressLabel>
```

[View "Required" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-label--required)

### Hidden label

Sometimes you may wish to have an input with no visible label, but to still wrap the input in a label for accessibility. In this case, set `hiddenLabel` to `true`.

```tsx
<IressLabel hiddenLabel>
  This text is visible to screen readers only
</IressLabel>
```

[View "HiddenLabel" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-label--hidden-label)

### Rich content

You can render custom content into the label.

```tsx
<IressLabel hiddenLabel={false} />
```

[View "RichContent" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-label--rich-content)

### Locked readonly

Use `readOnly="locked"` when the associated field is readonly due to
permissions. This adds a lock indicator on the label.

```tsx
<IressLabel readOnly="locked">
  This label is locked
</IressLabel>
```

[View "LockedReadonly" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_components-label--locked-readonly)

## Accessibility

Don't place interactive elements such as anchors or buttons inside the `IressLabel`. Doing so makes it difficult for people to activate the form input associated with the label.

See the [MDN Label Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#accessibility_concerns) for more info.

### Labelling non-interactive content

`IressLabel` can be used to label non-interactive content, such as readonly data. In this case, do not provide a `htmlFor` prop. This will render the label using a `strong` tag instead of a `label` tag.

## Testing

Labels are typically queried indirectly through the form control they describe.
Use `getByLabelText` to find the associated input:

```tsx
const input = screen.getByLabelText('Email address');
```

### Test IDs

When you pass a `data-testid` to `IressLabel`, the following nested test IDs
are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `text` | `my-label__text` | The label text content |

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_components-label--docs)

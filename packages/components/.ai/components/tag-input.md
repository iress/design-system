# TagInput

> A form control that allows users to enter and manage a collection of tags via keyboard input.

## Import

```tsx
import { IressTagInput } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-taginput--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/TagInput)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tag-input&title=[TagInput]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tag-input,enhancement&title=[TagInput]+Feature:+)

A form control that allows users to enter and manage a collection of tags via keyboard input.

```tsx
<IressTagInput
  defaultValue={['Tag']}
  placeholder="Type and hit enter to add a tag"
  tagLimit={999}
/>;
```

## Design

### When to use

- **Free-form multi-value input**: Allow users to type and add multiple values (e.g. email addresses, keywords)
- **Token-based entry**: When selections need to be individually removable
- **Dynamic lists**: Building a list of items from user-typed content

### When not to use

- **Predefined options only** — use [Select](../components/select.md) with multi-select
- **Single value input** — use [Input](../components/input.md) instead
- **Non-removable display tags** — use [Tag](../components/tag.md) or [Pill](../components/pill.md)

### Do's and Don'ts

| ✅ Do | ❌ Don't |
| --- | --- |
| Provide a clear placeholder indicating expected input | Leave the input without guidance |
| Set a reasonable `tagLimit` when appropriate | Allow unlimited tags if the backend has constraints |
| Use within a [Field](../components/field.md) for label and validation | Use without a visible label |
| Validate tag content before adding (e.g. email format) | Accept any input without validation |

### Content guidelines

- **Placeholder**: Use action-oriented text like "Type and press Enter to add"
- **Validation**: Show errors via the parent Field component's validation message
- **Tag limit**: Communicate limits clearly — disable input when limit is reached

### Related patterns

- [Tag](../components/tag.md) — for displaying non-editable tags
- [Select](../components/select.md) — for selecting from predefined options
- [Autocomplete](../components/autocomplete.md) — for search + suggestions
- [Field](../components/field.md) — wrap TagInput for label and validation

## Develop

### Quick Start

```tsx
import { IressTagInput } from '@iress-oss/ids-components';

<IressTagInput
  defaultValue={['Tag 1', 'Tag 2']}
  placeholder="Type and press Enter"
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-taginput--docs#api-props)

### Controlled usage

Use `value` and `onChange` for controlled tag management:

```tsx
const [tags, setTags] = useState(['initial']);

<IressTagInput value={tags} onChange={setTags} placeholder="Add tags" />;
```

### With Field

Wrap in a Field for label, hint, and validation:

```tsx
<IressField label="Keywords" hint="Press Enter after each keyword">
  <IressTagInput placeholder="Add keyword" />
</IressField>;
```

### Tag limit

Restrict the number of tags a user can add:

```tsx
<IressTagInput tagLimit={5} placeholder="Max 5 tags" />;
```

## Specifications

### Keyboard interaction

| Key | Action |
| --- | --- |
| Enter | Adds the current input text as a tag |
| Backspace | Removes the last tag when input is empty |
| Tab | Moves focus out of the component |

### Accessibility

- The input has `role="textbox"` and is labelled via the parent Field
- Each tag is focusable and has a delete button with an accessible label
- Screen readers announce tag additions and removals via live regions
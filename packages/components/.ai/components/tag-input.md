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

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultValue | `string[]` | — | Tags to display (uncontrolled) |
| onChange | `((e?: SyntheticEvent<HTMLInputElement, Event>, value?: string[]) => void) | undefined` | — | Emitted when the value changes. |
| onExistingTag | `((tag: string) => void)` | — | Emitted when the user attempts to add a tag that already exists. |
| onTagDelete | `((children: string, e: SyntheticEvent<HTMLButtonElement, Event>) => void)` | — | Emitted when a tag is deleted |
| onTagDeleteAll | `((children: string, e: SyntheticEvent<HTMLButtonElement, Event>) => void)` | — | Emitted when the combined tag delete button is clicked |
| onTagDeleteButtonBlur | `((e: FocusEvent<HTMLButtonElement, Element>) => void)` | — | Emitted when a tag's delete button is blurred |
| selectedOptionsTagText | `string` | `selected` | Text displayed next to tag count in tag when tag limit is exceeded |
| tagLimit | `number` | `5` | Limit of tags to display before shortening to `selectedOptionsTagText` |
| value | `string[]` | — | Tags to display (controlled) |
| actions | `Omit<[IressButtonProps](../../dist/components/Button/Button.d.ts), "status" | "mode">[]` | — | Actions to display in the input field, rendered inside the input on the right. These will be rendered with opinionated styling. If you want to use custom buttons or controls, use the `append` prop instead. |
| width | `any` | `100%` | The width of the input. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| variant | `search` | — | The variant of the input, which will apply different styles to the input. The `search` variant is designed for search inputs and will have a different style for the clear button and loading spinner. |
| inline | `boolean` | — | Make prepend/append element closer to the input content. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the input as read-only. Use `'locked'` when the value is read-only because of permissions. |
| append | `ReactNode` | — | Content to append to the input field, usually a button or icon. |
| loading | `boolean, string ` | — | The loading states of the input field. If provided a string, will use that text as the loading message. |
| alignRight | `boolean` | `false` | Set input content align to right, useful for numeric inputs. |
| formatter | `((value?: string) => string | number)` | — | Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format. e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string) |
| onClear | `((e: ChangeEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the input is manually cleared. |
| clearable | `boolean` | `false` | If `true`, then user can clear the value of the input. |

📄 [Full type definition](../../dist/components/TagInput/TagInput.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

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
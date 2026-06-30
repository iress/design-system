# Tag

> Displays a compact label for categorisation, filtering, or metadata.

## Import

```tsx
import { IressTag } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Tag)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=tag&title=[Tag]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=tag,enhancement&title=[Tag]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Contents of the tag. |
| compact | `boolean` | — | If true, reduces the padding and height of the tag. Useful when used inside an input component. |
| deleteButton | `ReactNode` | — | You can completely replace the delete button to provide your own functionality. When this is provided, `deleteButtonText` will not be used and `onDelete` and `onDeleteButtonBlur` will not be called. |
| deleteButtonText | `string` | `Delete` | Screen reader text for delete button |
| element | `ElementType` | `'span'` | Element type to render the Tag as. |
| mode | `10` , `20` , `30` , `40` , `50` , `60` , `70` , `80` , `90`, `danger` , `info` , `success` , `warning` , 10 , 20 , 30 , 40 , 50 , 60 , 70 , 80 , 90  | — | Style of the tag, based on the data colour palette (10-90) or system status colours (danger, info, success, warning). Can be a number (10-90), a string ('10'-'90'), or a system status ('danger', 'info', 'success', 'warning'). |
| bordered | `boolean` | `false` | When true, renders the tag with a visible border instead of a filled background. |
| onDelete | `((children: string, e: SyntheticEvent<HTMLButtonElement, Event>) => void)` | — | Callback triggered when the tag is deleted |
| onDeleteButtonBlur | `((e: FocusEvent<HTMLButtonElement, Element>) => void)` | — | Callback triggered when the close button is blurred |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Tag/Tag.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

Tags represent individual units in a group of selected items.

```tsx
import { IressInline, IressTag } from '@iress-oss/ids-components';

export function TagMode() {
  return (
    <IressInline gap="sm">
      <IressTag mode={10}>10</IressTag>
      <IressTag mode={20}>20</IressTag>
      <IressTag mode={30}>30</IressTag>
      <IressTag mode={40}>40</IressTag>
      <IressTag mode={50}>50</IressTag>
      <IressTag mode={60}>60</IressTag>
      <IressTag mode={70}>70</IressTag>
      <IressTag mode={80}>80</IressTag>
      <IressTag mode={90}>90</IressTag>
    </IressInline>
  );
}
```

## Design

### When to use

- **Multi-select display**: Showing selected items in multi-select interfaces
- **Email recipients or domains**: Managing collections of addresses
- **Applied filters**: Showing removable filter criteria
- **Categorization**: Labelling content with removable categories

Tags are **interactive** — they can be clicked and deleted by users.

### When not to use

- **Status indicators** — use [Pill](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs) for non-interactive status badges or category labels
- **Action buttons** — use [Button](../components/button.md) or [ButtonGroup](../components/button-group.md) for triggering actions
- **Navigation items** — use [Link](../components/link.md) or navigation patterns

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `element="button"` explicitly for clickable tags | Rely on `onClick` alone to make tags interactive |
| Use semantic status modes (`danger`, `info`) for system states | Use status colours for decorative categorisation (use data palette `10`–`90`) |
| Use `compact` in dense layouts (e.g. inside inputs) | Mix compact and regular tags in the same context |
| Provide `deleteButtonText` for accessible delete labels | Use generic "Delete" text when context is needed |

### Content guidelines

- **Label**: Keep tag text short (1–3 words) and meaningful
- **Delete label**: Use `deleteButtonText` to provide context (e.g. "Remove john@example.com")
- **Colour**: Use data palette colours (`10`–`90`) for non-semantic categorisation; reserve status colours for system states

### Related patterns

- [Select](../components/select.md) — for selecting from an existing list (use `multiple` prop for multi-select with tags)
- [Pill](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-pill--docs) — for non-interactive status/category display
- [TagInput](#iresstagsinput) — for free-form tag entry

## Develop

### Quick Start

```tsx
import { IressTag } from '@iress-oss/ids-components';

<IressTag>Label</IressTag>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs#api-props)

### Mode

The `mode` prop controls the colour scheme of the tag. Use data palette colours (`10`–`90`) for non-semantic colour needs.

```tsx
import { IressInline, IressTag } from '@iress-oss/ids-components';

export function TagMode() {
  return (
    <IressInline gap="sm">
      <IressTag mode={10}>10</IressTag>
      <IressTag mode={20}>20</IressTag>
      <IressTag mode={30}>30</IressTag>
      <IressTag mode={40}>40</IressTag>
      <IressTag mode={50}>50</IressTag>
      <IressTag mode={60}>60</IressTag>
      <IressTag mode={70}>70</IressTag>
      <IressTag mode={80}>80</IressTag>
      <IressTag mode={90}>90</IressTag>
    </IressInline>
  );
}
```

### Status mode

Use semantic status values (`danger`, `info`, `success`, `warning`) when tags need to communicate a system status.

```tsx
import { IressInline, IressTag } from '@iress-oss/ids-components';

export function TagStatus() {
  return (
    <IressInline gap="sm">
      <IressTag mode="danger">danger</IressTag>
      <IressTag mode="info">info</IressTag>
      <IressTag mode="success">success</IressTag>
      <IressTag mode="warning">warning</IressTag>
    </IressInline>
  );
}
```

### Bordered tags

Set `bordered` to render a tag with a visible border using the tag's current colour, without altering its background. This enhances visibility and makes tags look more interactive — useful for dropdown filter tags or any context where tags need to stand out.

```tsx
import { IressInline, IressTag } from '@iress-oss/ids-components';

export function TagBordered() {
  return (
    <IressInline gap="sm">
      <IressTag bordered>No mode</IressTag>
      <IressTag mode={10} bordered>
        10
      </IressTag>
      <IressTag mode={20} bordered>
        20
      </IressTag>
      <IressTag mode={30} bordered>
        30
      </IressTag>
      <IressTag mode={40} bordered>
        40
      </IressTag>
      <IressTag mode={50} bordered>
        50
      </IressTag>
      <IressTag mode={60} bordered>
        60
      </IressTag>
      <IressTag mode={70} bordered>
        70
      </IressTag>
      <IressTag mode={80} bordered>
        80
      </IressTag>
      <IressTag mode={90} bordered>
        90
      </IressTag>
      <IressTag mode="danger" bordered>
        danger
      </IressTag>
      <IressTag mode="info" bordered>
        info
      </IressTag>
      <IressTag mode="success" bordered>
        success
      </IressTag>
      <IressTag mode="warning" bordered>
        warning
      </IressTag>
    </IressInline>
  );
}
```

### Clickable tags

Tags can be made clickable by setting `element="button"`. This is the recommended, explicit API and renders the tag as a `<button>` with hover styles to indicate it is clickable.

For backwards compatibility, passing `onClick` without setting `element` is also supported and will automatically render the tag as a `<button>`.

Use `element="a"` to render the tag as a link.

```tsx
<IressTag
  bordered
  onClick={() => {
    console.log('Tag clicked');
  }}
>
  Tag
</IressTag>;
```

### Compact tags

Set `compact` to render a smaller tag. This is useful in dense layouts, such as inside inputs where tags are displayed inline.

```tsx
<IressTag
  compact
  onDelete={() => {
    console.log('Tag deleted');
  }}
>
  Label
</IressTag>;
```

### Deleting tags

The delete button will not automatically remove the tag from the screen. Instead it will trigger the `onDelete` event. Use this event within your app to handle the display of tags.

The text a screen reader will announce defaults to "Delete" but can be changed using the `deleteButtonText` prop.

```tsx
import {
  IressButton,
  type IressButtonProps,
  IressInline,
  IressTag,
  type IressTagProps,
} from '@iress-oss/ids-components';
import { useState } from 'react';

export const TagDeletion = () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);

  const handleAdd: IressButtonProps['onClick'] = () => {
    setTags([...tags, `Tag ${tags.length + 1}`]);
  };

  const handleDelete: IressTagProps['onDelete'] = (tag) => {
    setTags((existingTags) =>
      existingTags.filter((existingTag) => existingTag !== tag),
    );
  };

  return (
    <IressInline gap="sm" verticalAlign="middle">
      {tags.map((tag) => (
        <IressTag
          key={tag}
          deleteButtonText={`Delete ${tag}`}
          onDelete={handleDelete}
        >
          {tag}
        </IressTag>
      ))}
      <IressButton onClick={handleAdd} icon="add" mode="muted">
        Add tag
      </IressButton>
    </IressInline>
  );
};
```

### Custom button

You can completely override the delete button by passing a custom component to the `deleteButton` prop.

```tsx
<IressTag
  deleteButton={
    <IressPopover
      activator={
        <IressButton mode="muted">
          <IressIcon name="chevron-circle-down" screenreaderText="Actions" />
        </IressButton>
      }
      align="bottom-start"
    >
      Some actions go in here
    </IressPopover>
  }
>
  Label
</IressTag>;
```

### Testing

Query tags by their text content:

```tsx
const tag = screen.getByText('Category');
```

When `element="button"` is set, the tag renders as a `<button>`:

```tsx
const tag = screen.getByRole('button', { name: 'Category' });
```

When `element="a"` is set, the tag renders as a link:

```tsx
const tag = screen.getByRole('link', { name: 'Category' });
```

For deletable tags, query the delete button:

```tsx
const deleteButton = screen.getByRole('button', { name: 'Delete Category' });
```

**Test IDs:**

When you pass a `data-testid` to `IressTag`, the following nested test IDs are generated automatically:

| Suffix | Example | Description |
| --- | --- | --- |
| `delete-button__button` | `my-tag__delete-button__button` | The tag delete button |


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the tag | `getByRole('button', { name: '...' })` when interactive, or `getByRole('link', { name: '...' })` when rendered as a link | `tag` |
| delete button | The tag delete button | `getByRole('button', { name: 'Remove item' })` | `tag__delete-button__button` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Renders as a static `<span>` with label text |
| Clickable (`element="button"`) | Renders as a `<button>` with hover/active styles |
| Deletable | Shows a delete button that triggers `onDelete` callback |
| Compact | Renders at smaller size for dense layouts |
| Bordered | Adds a visible border using the tag's colour |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Clickable tags render with `role="button"`; link tags with `role="link"`
- **2.4.4 Link Purpose** — Tag labels should describe their content or category
- **1.4.1 Use of Color** — Status is communicated via text label, not colour alone

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the tag (if clickable) or delete button |
| `Enter` / `Space` | Activates the tag click or delete action |

### Edge cases

- **Empty label**: Renders a tag with only the delete button — always provide meaningful text
- **Many tags**: Wrap in a scrollable container or use pagination to avoid overwhelming the user
- **Long labels**: Text truncates with ellipsis when exceeding available width

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-tag--docs)
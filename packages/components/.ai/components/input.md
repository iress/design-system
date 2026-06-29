# Input

> Renders a single-line text input for capturing user data.

## Import

```tsx
import { IressInput } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Input)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=input&title=[Input]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=input,enhancement&title=[Input]+Feature:+)

Inputs allow a user to input and interact with data. This component should be used as a child of the IressField component to ensure the correct placement of elements like label, error & hint text.

```tsx
<IressInput
  clearable
  placeholder="Search"
  prepend={<IressIcon name="search" />}
/>;
```

## Design

### When to use

- **Free text entry**: Names, emails, URLs, or any user-typed value
- **Formatted values**: Currency, percentages, or dates with a `formatter`
- **Multi-line text**: Textareas for longer content (via `rows` prop)
- **File uploads**: Selecting files from the user's device

### When not to use

- **Selection from fixed options** — use Select or RadioGroup
- **Rich text editing** — use a dedicated rich text editor
- **Currency input** — use InputCurrency for locale-aware formatting

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use appropriate `type` for the data (email, tel, url) | Default everything to `type="text"` |
| Set `inputmode` for mobile keyboard hints | Rely on `type="number"` for all numeric input |
| Use `sizing` to hint at expected input length | Make all inputs the same width regardless of content |
| Wrap in `IressFormField` for label and validation | Use a standalone input without an accessible label |

### Content guidelines

- **Placeholder**: Use as a hint, not a replacement for labels (e.g. "e.g. john@example.com")
- **Labels**: Always provide via `IressFormField`; keep concise and specific
- **Error messages**: Explain what went wrong and how to fix it

### Related patterns

- [Form Field](../patterns/form.md) — for wrapping with label, hint, and validation
- [Input Currency](../components/input-currency.md) — for locale-aware currency input
- [Autocomplete](../components/autocomplete.md) — for input with suggestions

## Develop

### Quick Start

```tsx
import { IressInput } from '@iress-oss/ids-components';

<IressInput placeholder="Enter your name" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs#api-props)

### Usage

#### Types

The input component's `type` can be set to one of the following value: `text` (default), `date`, `email`, `number`, `password`, `search`, `tel`, `url`, `time`, `color` and `file`.

```tsx
import { IressInput, IressStack } from '@iress-oss/ids-components';

export function InputTypes() {
  return (
    <IressStack gap="md">
      <IressInput type="text" placeholder="Text input" />
      <IressInput type="color" placeholder="Color input" />
      <IressInput type="date" placeholder="Date input" />
      <IressInput type="datetime-local" placeholder="Datetime-local input" />
      <IressInput type="email" placeholder="Email input" />
      <IressInput type="file" placeholder="File input" />
      <IressInput type="month" placeholder="Month input" />
      <IressInput type="number" placeholder="Number input" />
      <IressInput type="password" placeholder="Password input" />
      <IressInput type="search" placeholder="Search input" />
      <IressInput type="tel" placeholder="Tel input" />
      <IressInput type="time" placeholder="Time input" />
      <IressInput type="url" placeholder="Url input" />
      <IressInput type="week" placeholder="Week input" />
    </IressStack>
  );
}
```

#### Input modes

The `inputmode` attribute provides a hint to browsers for devices with onscreen keyboards to help them decide which keyboard to display.

```tsx
import { IressInput, IressStack } from '@iress-oss/ids-components';

export function InputModes() {
  return (
    <IressStack gap="md">
      <IressInput inputMode="text" placeholder="Text mode" />
      <IressInput inputMode="tel" placeholder="Tel mode" />
      <IressInput inputMode="url" placeholder="Url mode" />
      <IressInput inputMode="email" placeholder="Email mode" />
      <IressInput inputMode="numeric" placeholder="Numeric mode" />
      <IressInput inputMode="decimal" placeholder="Decimal mode" />
      <IressInput inputMode="search" placeholder="Search mode" />
    </IressStack>
  );
}
```

#### File uploads

When using the `type="file"` attribute, the input allows users to select one or more files from their device.

```tsx
import { IressField, IressInput } from '@iress-oss/ids-components';

export function InputFileType() {
  return (
    <IressField label="File upload">
      <IressInput type="file" required />
    </IressField>
  );
}
```

#### Clearable

By setting the `clearable` prop to `true` a clear button will appear when the user has entered a value into the input.

```tsx
<IressInput
  clearable
  placeholder="Search"
  prepend={<IressIcon name="search" />}
/>;
```

#### Sizing

Inputs can be resized to suit a specific number of characters. Widths can also be set as a percentage.

```tsx
import { IressInput, IressStack } from '@iress-oss/ids-components';

export function InputSizing() {
  return (
    <IressStack gap="md">
      <IressInput width="2" placeholder="2" />
      <IressInput width="4" placeholder="4" />
      <IressInput width="6" placeholder="6" />
      <IressInput width="8" placeholder="8" />
      <IressInput width="10" placeholder="10" />
      <IressInput width="12" placeholder="12" />
      <IressInput width="16" placeholder="16" />
      <IressInput width="25%" placeholder="25%" />
      <IressInput width="50%" placeholder="50%" />
      <IressInput width="75%" placeholder="75%" />
      <IressInput width="100%" placeholder="100%" />
    </IressStack>
  );
}
```

#### Textareas

Set the `rows` prop to render a `textarea` instead of an `input`.

```tsx
<IressInput rows={5} />;
```

#### Prepend & Append

Content (typically icons) can be added via the `prepend` and `append` props on `IressInput`.

> **⚠️ Do not use `slot` attributes on children** (e.g. `<IressIcon slot="start" />`). The `slot` attribute is a legacy v4 pattern that is no longer supported. Always use the `prepend` and `append` props.

```tsx
import { IressIcon, IressInput, IressStack } from '@iress-oss/ids-components';

export function InputSlots() {
  return (
    <IressStack gap="md">
      <IressInput
        prepend={<IressIcon name="search" />}
        placeholder="Prepend slot"
      />
      <IressInput
        append={<IressIcon name="search" />}
        placeholder="Append slot"
      />
      <IressInput
        prepend={<IressIcon name="search" />}
        placeholder="Prepend slot"
      />
      <IressInput
        append={<IressIcon name="search" />}
        placeholder="Append slot"
      />
    </IressStack>
  );
}
```

#### Actions

The `actions` prop allows you to add buttons to the input.

```tsx
<IressInput
  actions={[
    {
      icon: 'content_copy',
      children: 'Copy to clipboard',
      onClick: () => {
        void navigator.clipboard.writeText('Copied text!');
      },
    },
  ]}
  placeholder="Input with action button"
/>;
```

#### Read only

The `readOnly` prop can be set to prevent the user from changing the value of the input.

```tsx
<IressInput placeholder="Enter your name" readOnly value="Value" />;
```

#### Formatter

`formatter` allows you to display the value in a different format when the input is not focused.

**Notes:**

- When `formatter` is set, the `type` of the input is changed to `text` when not in focus.
- The value of the native input will be the formatted value, not the raw value.

```tsx
<IressInput
  placeholder="Enter a string and it will show in UPPERCASE when not focused, and show the raw value on focus"
  formatter={(value) => (value ? value.toString().toUpperCase() : '')}
/>;
```

##### Currency formatting example

```tsx
import { IressInput } from '@iress-oss/ids-components';

export function InputCurrencyFormatter() {
  const formatter = (value = '') => {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return value;
    }

    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(numberValue);
  };

  return (
    <IressInput
      defaultValue="0.00"
      formatter={formatter}
      placeholder="Enter any number and it will show in currency format when the input is not focused"
      type="number"
    />
  );
}
```

#### Auto-growing textareas

For textareas (when `rows` prop is set), you can enable the `autoGrow` prop to automatically expand the textarea height as the user types more lines.

```tsx
<IressInput rows={1} autoGrow append={<IressIcon name="wand_shine" />} />;
```

#### `variant`

The `variant` prop allows you to apply different styles to the input.

- `search`: Used for search inputs, you can use the `prepend` or `append` prop to add a search icon.

```tsx
<IressInput
  variant="search"
  placeholder="Start your search..."
  prepend={<IressIcon name="search" />}
/>;
```

#### Percentage formatting

You can use `IressInput` to display percentage formatting. When the field is focused, it can display the raw value, and when blurred, it can display the formatted percentage value.

```tsx
import { IressInput } from '@iress-oss/ids-components';

export const InputPercentage = () => (
  <IressInput<string | number>
    defaultValue="0.5"
    formatter={(value = '') => {
      if (value === '') return '';

      const numericValue = Number(value);

      if (Number.isNaN(numericValue)) {
        return String(value) ?? '';
      }

      return new Intl.NumberFormat('en-AU', {
        style: 'percent',
      }).format(numericValue);
    }}
    type="number"
  />
);
```

### Testing

Query the input by its role:

```tsx
const input = screen.getByRole('textbox', { name: 'Email' });
```

For number inputs, use `spinbutton`:

```tsx
const input = screen.getByRole('spinbutton', { name: 'Quantity' });
```

#### Gotchas

- **formatter changes the role**: When `formatter` is set on a `type="number"`
  input, the role changes between `textbox` (blurred) and `spinbutton` (focused).
- **readOnly removes the input role**: When `readOnly` is set, the textbox role
  is removed. The value is displayed as plain text.
- **Textarea vs Input test IDs**: When `rows` is set, the component renders a
  `<textarea>` with a `__textarea` test ID suffix. Without `rows`, it renders an
  `<input>` with a `__input` suffix.

  ```tsx
screen.getByTestId('my-input__input'); // Single-line
screen.getByTestId('my-input__textarea'); // Textarea (rows > 0)
```

- **clearable inputs**: The clear button only appears when the input has a value.

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the input | `getByRole('textbox')`, or `getByLabelText('...')` when inside a Field | `input` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Input accepts text entry and fires `onChange`/`onInput` events |
| Focused with formatter | Shows raw value; type reverts to original |
| Blurred with formatter | Shows formatted value; type becomes `text` |
| Read only | Renders as plain text with hidden input for form value |
| Clearable | Clear button appears when input has a value |
| Auto-grow textarea | Height expands as user types more lines |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="textbox"` or `role="spinbutton"` based on type
- **1.3.1 Info and Relationships** — Must be associated with a label via `IressFormField`
- **3.3.2 Labels or Instructions** — Placeholder is supplementary, not a label replacement

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus in/out of the input |
| `Escape` | Clears input when `clearable` is set (after clear button focus) |
| Standard text keys | Input characters as expected |

### Edge cases

- **formatter + type="number"**: Role changes between focus states — account for in tests
- **readOnly**: No textbox role in DOM — cannot query by role
- **File type**: Appearance controlled by browser; limited styling possible
- **Empty clearable input**: Clear button is hidden until a value is entered

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input--docs)
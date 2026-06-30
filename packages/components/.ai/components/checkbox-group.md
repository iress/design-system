# CheckboxGroup

> Groups related checkboxes so users can select multiple options from a set.

## Import

```tsx
import { IressCheckboxGroup } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkbox-group--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/CheckboxGroup)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=checkbox-group&title=[CheckboxGroup]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=checkbox-group,enhancement&title=[CheckboxGroup]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content to be displayed inside the group, usually multiple `IressCheckbox`. |
| defaultValue | `T , T[]` | — | Value of checkbox group when in uncontrolled mode. |
| layout | `'block' , 'inline', 'stack' ` | `'stack'` | Sets which of the block / inline layout options apply. |
| name | `string` | — | Name to be applied to all checkboxes in the group. |
| onChange | `(value?: T[]) => void` | — | Called with collated new value when a user toggles one of its children checkboxes. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the group in a read-only state. |
| value | `T , T[]` | — | Value of checkbox group when in controlled mode. |
| variant | `CheckboxVariants` | — | The visual variant of the checkboxes in the group. This is passed down to child checkboxes, but can be overridden at the individual checkbox level. - `card`: Provides a larger, card-like style with a heading slot. - `touch`: Provides a larger, button-like style, great for mobile devices. - `undefined`: The default checkbox style. |

📄 [Full type definition](../../dist/components/CheckboxGroup/CheckboxGroup.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

Checkbox groups allow users to make more than one choice in a set of related options.

```tsx
<IressCheckboxGroup name="let-them-eat-cake">
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

## Design

### When to use

- **Multiple selections**: Allow users to pick several options from a related set
- **Preference lists**: Settings pages with multiple toggleable preferences
- **Filter panels**: Multi-select filters for search results or data tables
- **Table row selection**: Combined with a table for bulk actions

### When not to use

- **Single selection** — use RadioGroup instead
- **Very large lists** (50+ items) — use a multi-select Select with search
- **Single toggle** — use a standalone Checkbox or Toggle

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `defaultValue` or `value` to control checked state | Set `checked` directly on child checkboxes within a group |
| Provide a clear group label via the form field | Leave the group unnamed and rely on visual context alone |
| Use `hiddenCheckbox` for custom card-style selections | Create custom checkbox UI without proper ARIA roles |
| Use the `layout` prop for standard arrangements | Overcomplicate layout with unnecessary custom CSS |

### Content guidelines

- **Group label**: Clearly describe what the user is selecting (e.g. "Notification preferences")
- **Option labels**: Keep concise and parallel in structure
- **Limit options**: Ideally 2–7 visible options; use progressive disclosure for more

### Related patterns

- [Checkbox](../components/checkbox.md) — for individual standalone checkboxes
- [Radio Group](../components/radio-group.md) — for single-select option groups
- [Form Field](../patterns/form.md) — for wrapping with label, hint, and validation

## Develop

### Quick Start

```tsx
import { IressCheckboxGroup } from '@iress-oss/ids-components';

<IressCheckboxGroup name="preferences" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkboxgroup--docs#api-props)

### Usage

#### Checkbox children

Individual checkboxes can be passed directly into `IressCheckboxGroup`.

**Note:** The `mapCheckboxGroupOptions` helper function is now deprecated. Use `array.map` to map options to `IressCheckbox` components instead.

```tsx
<IressCheckboxGroup name="let-them-eat-cake">
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

#### Default checked

The default checked state of the checkbox children should always be set using the `defaultValue` prop (not directly on the checkbox component).

```tsx
<IressCheckboxGroup
  name="let-them-eat-cake"
  defaultValue={['lemon-drizzle', 'victoria-sponge']}
>
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

#### Changing the checked state

The `value` prop can be updated if you need to change the checked state without interacting with the checkboxes.

```tsx
import {
  IressButton,
  IressCheckbox,
  IressCheckboxGroup,
  IressStack,
} from '@iress-oss/ids-components';
import { useState } from 'react';

export function CheckboxGroupUsingState() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <IressStack gap="sm">
      <IressCheckboxGroup
        value={value}
        onChange={(newValue) => setValue(newValue ?? [])}
      >
        <IressCheckbox value="lemon-drizzle">Lemon drizzle</IressCheckbox>
        <IressCheckbox value="victoria-sponge">Victoria Sponge</IressCheckbox>
        <IressCheckbox value="carrot-cake">Carrot Cake</IressCheckbox>
      </IressCheckboxGroup>
      <IressButton onClick={() => setValue([])}>Clear</IressButton>
    </IressStack>
  );
}
```

#### Layout

The `layout` prop controls how the checkbox group is displayed:

- **Stack (Default):** Checkboxes are laid out vertically. Labels are only as wide as their text.
- **Block:** Same as Stack, but labels take up the full width of the container.
- **Inline:** Checkboxes are laid out horizontally.

```tsx
import {
  IressCheckbox,
  IressCheckboxGroup,
  IressText,
} from '@iress-oss/ids-components';

export function CheckboxGroupLayout() {
  return (
    <IressText>
      <h3>block</h3>
      <IressCheckboxGroup layout="block">
        <IressCheckbox value="google" bg="alt">
          Google
        </IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">
          Newspaper
        </IressCheckbox>
        <IressCheckbox value="friend" bg="alt">
          Friend
        </IressCheckbox>
        <IressCheckbox value="other" bg="alt">
          Other
        </IressCheckbox>
      </IressCheckboxGroup>
      <h3>inline</h3>
      <IressCheckboxGroup layout="inline">
        <IressCheckbox value="google" bg="alt">
          Google
        </IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">
          Newspaper
        </IressCheckbox>
        <IressCheckbox value="friend" bg="alt">
          Friend
        </IressCheckbox>
        <IressCheckbox value="other" bg="alt">
          Other
        </IressCheckbox>
      </IressCheckboxGroup>
      <h3>stack</h3>
      <IressCheckboxGroup layout="stack">
        <IressCheckbox value="google" bg="alt">
          Google
        </IressCheckbox>
        <IressCheckbox value="newspaper" bg="alt">
          Newspaper
        </IressCheckbox>
        <IressCheckbox value="friend" bg="alt">
          Friend
        </IressCheckbox>
        <IressCheckbox value="other" bg="alt">
          Other
        </IressCheckbox>
      </IressCheckboxGroup>
    </IressText>
  );
}
```

#### Hidden checkboxes

You can use the `hiddenCheckbox` prop to create custom checkboxes. When enabled, the actual checkbox will be visually hidden, allowing you to create more interesting controls.

```tsx
<IressField
  label="I'd like to discuss the following with my financial adviser:"
  hint="Select all that apply"
>
  <IressCheckboxGroup
    defaultValue={['home']}
    variant="card"
    name="financial-review"
    layout="inline"
  >
    {children}
  </IressCheckboxGroup>
</IressField>;
```

#### Custom checkbox group layout

The checkbox group's `layout` prop gives you some default options to help control the layout of your controls. But sometimes you need more granular control, which you can achieve with a bit of custom CSS.

```tsx
<IressField
  label="I'd like to discuss the following with my financial adviser:"
  hint="Select all that apply"
>
  <IressCheckboxGroup
    defaultValue={['home']}
    variant="card"
    name="financial-review"
    layout="block"
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gridAutoRows: '1fr',
        gridGap: '16px',
        width: '100%',
        padding: '0.5rem',
        border: '1px dashed hsl(43deg 100% 45%)',
        resize: 'horizontal',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  </IressCheckboxGroup>
</IressField>;
```

#### Read only

The `readOnly` prop changes how the checkbox group is rendered. It will only render the children that are checked (alongside a hidden input that contains the `value` if it was set).

```tsx
<IressCheckboxGroup
  name="let-them-eat-cake"
  defaultValue={['lemon-drizzle', 'victoria-sponge']}
  readOnly
>
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

#### Touch

The `touch` prop adds the button-like border and padding to checkbox.

```tsx
<IressCheckboxGroup
  name="let-them-eat-cake"
  defaultValue={['lemon-drizzle', 'victoria-sponge']}
  variant="touch"
>
  <IressCheckbox key={1} value="lemon-drizzle">
    Lemon drizzle
  </IressCheckbox>
  <IressCheckbox key={2} value="victoria-sponge">
    Victoria Sponge
  </IressCheckbox>
  <IressCheckbox key={3} value="carrot-cake">
    Carrot Cake
  </IressCheckbox>
</IressCheckboxGroup>;
```

#### Checkboxes inside an `IressTable`

You can use `IressCheckboxGroup` and `IressTable` to create a table with checkboxes, allowing the users to select multiple rows.

```tsx
import {
  type FormControlValue,
  IressButton,
  IressCheckbox,
  IressForm,
  IressFormFieldset,
  IressPanel,
  IressStack,
  IressTable,
} from '@iress-oss/ids-components';
import { IressCheckboxGroup } from '../CheckboxGroup';
import { toArray } from '../../../helpers/formatting/toArray';
import { useWatch } from 'react-hook-form';

interface FieldValues {
  'let-them-eat-cake'?: FormControlValue[];
}

const SelectedValues = () => {
  const value = useWatch<FieldValues>({ name: 'let-them-eat-cake' });
  const valueString = toArray(value).join(', ');

  return (
    <IressPanel>
      Selected values: {valueString ? valueString : 'None'}
    </IressPanel>
  );
};

export const CheckboxGroupTable = () => (
  <IressForm
    defaultValues={{
      'let-them-eat-cake': ['lemon-drizzle', 'victoria-sponge'],
    }}
  >
    <IressStack gap="md">
      <SelectedValues />
      <IressFormFieldset
        label="Let them eat cake"
        name="let-them-eat-cake"
        hiddenLabel
        mb="none"
        rules={{ required: 'Please select a cake' }}
        render={(field) => (
          <IressCheckboxGroup {...field} layout="stack">
            <IressTable
              caption="Available options"
              columns={[
                { key: 'select', label: 'Select', width: '2rem' },
                { key: 'name', label: 'Name' },
              ]}
              rows={[
                {
                  select: (
                    <IressCheckbox hiddenLabel value="lemon-drizzle">
                      Select lemon drizzle
                    </IressCheckbox>
                  ),
                  name: 'Lemon drizzle',
                },
                {
                  select: (
                    <IressCheckbox hiddenLabel value="victoria-sponge">
                      Select Victoria Sponge
                    </IressCheckbox>
                  ),
                  name: 'Victoria Sponge',
                },
                {
                  select: (
                    <IressCheckbox hiddenLabel value="carrot-cake">
                      Select Carrot Cake
                    </IressCheckbox>
                  ),
                  name: 'Carrot Cake',
                },
              ]}
            />
          </IressCheckboxGroup>
        )}
      />
      <IressButton type="submit" mode="primary" alignSelf="start">
        Submit
      </IressButton>
    </IressStack>
  </IressForm>
);
```

### Testing

Query checkboxes within the group by their role:

```tsx
const checkboxes = screen.getAllByRole('checkbox');
await user.click(screen.getByRole('checkbox', { name: 'Option A' }));
```

Query the group itself by its `group` role:

```tsx
const group = screen.getByRole('group', { name: 'Select options' });
```

#### Disambiguating multiple checkbox groups

Use `within` to scope queries when multiple groups share the same option labels:

```tsx
import { within } from '@testing-library/react';

const group = screen.getByRole('group', { name: 'Interests' });
const option = within(group).getByRole('checkbox', { name: 'Music' });
```

#### Gotchas

- **readOnly mode**: When `readOnly` is set, all checkbox roles are removed from
  the DOM. Only selected options' label text and hidden `<input>` elements remain.
- **onChange returns an array**: The `onChange` callback receives the full array
  of selected values, not just the changed item.

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkboxgroup--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the checkbox group | `getByRole('group')` | `checkbox-group` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkboxgroup--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | All checkboxes unchecked unless `defaultValue` is set |
| Controlled | `value` prop determines checked state; `onChange` fires on interaction |
| Read only | Only checked items render as text with hidden inputs |
| Hidden checkbox | Visual checkbox hidden; checked state shown via label border thickness |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Group uses `role="group"` with an accessible name
- **1.3.1 Info and Relationships** — Checkboxes are semantically grouped
- **2.1.1 Keyboard** — All checkboxes focusable and togglable via keyboard

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Space` | Toggles the focused checkbox |
| `Tab` | Moves focus between checkboxes in the group |

### Edge cases

- **readOnly + nothing selected**: Group renders empty
- **onChange returns full array**: Not just the changed value — handle accordingly
- **defaultValue vs value**: Using both causes controlled/uncontrolled conflict
- **hiddenCheckbox**: Checked state communicated via border, not a visible tick

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-checkboxgroup--docs)
# InputCurrency

> Provides a text input formatted for entering monetary values.

## Import

```tsx
import { IressInputCurrency } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-input-currency--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/InputCurrency)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=input-currency&title=[InputCurrency]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=input-currency,enhancement&title=[InputCurrency]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| alignRight | `boolean` | — | Set input content align to right. |
| currencyCode | `string` | — | Set the currency symbol and appended currency code, default is `AUD`. |
| formatOptions | `Omit<NumberFormatOptions, "currency">` | — | Pass additional number format options. @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat |
| locale | `LocalesArgument` | — | Set the region of the currency, default is `en-AU`. |
| withSymbol | `boolean` | — | Set the currency symbol. |
| actions | `Omit<[IressButtonProps](../../dist/components/Button/Button.d.ts), "status" | "mode">[]` | — | Actions to display in the input field, rendered inside the input on the right. These will be rendered with opinionated styling. If you want to use custom buttons or controls, use the `append` prop instead. |
| width | `any` | — | The width of the input. |
| defaultValue | `null, number , string ` | — | The value of the input. Can be a string or a number. Use for uncontrolled inputs. |
| onChange | `((e: ChangeEvent<HTMLInputElement, Element>, value?: T) => void)` | — | Emitted when the input value changes with the new changed value. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| variant | `search` | — | The variant of the input, which will apply different styles to the input. The `search` variant is designed for search inputs and will have a different style for the clear button and loading spinner. |
| inline | `boolean` | — | Make prepend/append element closer to the input content. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the input as read-only. Use `'locked'` when the value is read-only because of permissions. |
| value | `null, number , string ` | — | The value of the input. Can be a string or a number. Use for controlled inputs. |
| append | `ReactNode` | — | Content to append to the input field, usually a button or icon. |
| loading | `boolean, string ` | — | The loading states of the input field. If provided a string, will use that text as the loading message. |
| prepend | `ReactNode` | — | Content to prepended to the input field, usually an icon. |
| formatter | `((value?: T) => string | number)` | — | Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format. e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string) |
| onClear | `((e: ChangeEvent<HTMLInputElement, Element>) => void)` | — | Emitted when the input is manually cleared. |
| clearable | `boolean` | `false` | If `true`, then user can clear the value of the input. |

📄 [Full type definition](../../dist/components/InputCurrency/InputCurrency.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

InputCurrency allows a user to input and interact with currency number. It works just like IressInput, with new props locale and currencyCode. This component meets ISO-4217 standard

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-GB"
  currencyCode="GBP"
  placeholder="Enter amount and dispay currency currency separator on blur"
/>;
```

## Design

### When to use

- **Currency entry**: Any field where the user inputs monetary values
- **Multi-locale support**: When the application needs to handle different currency formats (AUD, GBP, JPY)
- **Formatted display**: When you need locale-aware formatting on blur (grouping separators, decimal places)

### When not to use

- **Generic numbers** — use Input with `type="number"` instead
- **Display-only currency** — use a text formatter rather than an interactive input
- **Percentage values** — use Input with a percentage formatter

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Always pass both `locale` and `currencyCode` together | Set `locale` without `currencyCode` or vice versa |
| Use `alignRight` for numeric columns in tables | Use `readOnly` InputCurrency in tables — use column `format` instead |
| Use `withSymbol` when the currency isn't obvious from context | Rely solely on the symbol when multiple currencies are present |
| Use `formatOptions` for custom decimal places | Hardcode formatting logic outside the component |

### Content guidelines

- **Labels**: Describe the value being entered (e.g. "Purchase price", "Annual salary")
- **Currency context**: If the currency is not obvious, show the code in the label or use `withSymbol`

### Related patterns

- [Input](../components/input.md) — for general text/number input
- [Form Field](../patterns/form.md) — for wrapping with label, hint, and validation

## Develop

### Quick Start

```tsx
import { IressInputCurrency } from '@iress-oss/ids-components';

<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
/>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs#api-props)

### Usage

#### Different Locale and CurrencyCode

Display the GBP with `locale="en-GB"` and `currencyCode="GBP"` props (must pass both together)

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-GB"
  currencyCode="GBP"
  placeholder="Enter amount and dispay currency currency separator on blur"
/>;
```

Display the JPY with `locale="ja-JPY"` and `currencyCode="JPY"` props (must pass both together)

```tsx
<IressInputCurrency
  defaultValue={12345678}
  locale="ja-JP"
  currencyCode="JPY"
  placeholder="Enter amount and dispay currency currency separator on blur"
/>;
```

#### With Symbol

Display the currency symbol with `withSymbol` props

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
  withSymbol
  placeholder="Enter amount and dispay currency symbol on blur"
/>;
```

#### More Format Options

Pass more format options with `formatOptions` props. More format options in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat">here</a>

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
  placeholder="Pass and play around with other native Intl.NumberFormat options to the code sandbox"
  formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 4 }}
/>;
```

#### Read Only

The `readOnly` prop can be set to prevent the user from changing the value of the input. If you want to make the number align to right, please pass `alignRight` together.

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
  readOnly
  alignRight
  withSymbol
/>;
```

#### Align Right

Set the input content align to right with `alignRight` prop, which is more friendly for number input.

```tsx
<IressInputCurrency
  defaultValue={12345.678}
  locale="en-AU"
  currencyCode="AUD"
  alignRight
/>;
```

### Recipes

#### Using IressInputCurrency in table

It is not recommended to use the `readOnly` prop for `IressInputCurrency` inside tables, as it was designed for forms. This example shows how to use currency in the table, by using the `format` prop of when defining a column inside `IressTable`. Additionally, when all rows have the same currency, it is recommended to add the currency code on the column `label` and remove the `currencyCode` on all rows.

```tsx
import { IressTable } from '@iress-oss/ids-components';

export const CurrencyInTable = () => {
  return (
    <IressTable
      caption="My investments"
      columns={[
        {
          key: 'investmentName',
          label: 'Investment Name',
          format: 'string',
          width: '30%',
        },
        {
          key: 'investmentDate',
          label: 'Investment Date',
          format: 'date',
          width: '30%',
        },
        {
          key: 'totalPercentage',
          label: 'Total %',
          format: 'percent',
          width: '15%',
        },
        {
          key: 'amount',
          label: 'Investment Amount (AUD)',
          format: 'currency',
          currencyCode: '',
          width: '25%',
        },
      ]}
      rows={[
        {
          investmentName: 'US Stocks',
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
          amount: 23898,
        },
        {
          investmentName: 'US Bonds',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 26382.456,
        },
        {
          investmentName: 'AU Stocks',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 9342.1569,
        },
        {
          investmentName: 'UK Stocks',
          investmentDate: '2020-06-28',
          totalPercentage: 49,
          amount: 49751.4,
        },
      ]}
    />
  );
};
```

#### OnChange with valid value

Only able to input valid value when use `IressInputCurrency`. In this example, only number and 2 decimal places are allowed.

```tsx
import { IressInputCurrency } from '@iress-oss/ids-components';
import { useState } from 'react';

export const ValidValueOnChage = () => {
  const [value, setValue] = useState('');

  return (
    <IressInputCurrency
      value={value}
      onChange={(_e, value) => {
        if (typeof value === 'string' && /^-?\d*(\.\d{0,2})?$/.test(value)) {
          console.log('Valid value:', value);
          setValue(value);
        }
      }}
    />
  );
};
```

### Testing

Query the currency input by its role. Note that when a `formatter` is active, the input role changes between `textbox` (blurred) and `spinbutton` (focused):

```tsx
const input = screen.getByRole('textbox', { name: 'Amount' });
```

#### Gotchas

- **readOnly removes the input role**: When `readOnly` is set, the textbox role
  is removed and the formatted value is displayed as plain text.

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the input currency | `getByRole('textbox')`, or `getByLabelText('...')` when inside a Field. In focus, the input will have the role of `spinbutton`. | `input-currency` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default (blurred) | Displays formatted currency value with locale-specific separators |
| Focused | Shows raw numeric value for editing |
| Read only | Renders formatted value as plain text with hidden input |
| Align right | Content aligns to the right of the input field |
| With symbol | Currency symbol displayed as prepended content |

### Accessibility

**WCAG compliance:**

- **4.1.2 Name, Role, Value** — Uses `role="textbox"` (blurred) or `role="spinbutton"` (focused)
- **1.3.1 Info and Relationships** — Must be associated with a label via `IressFormField`
- **3.3.2 Labels or Instructions** — Currency context should be clear from label or symbol

**Keyboard interaction:**

| Key | Action |
|-----|--------|
| `Tab` | Moves focus in/out of the input; triggers format on blur |
| Standard numeric keys | Inputs digits and decimal separator |
| `Backspace` / `Delete` | Removes characters from the raw value |

### Edge cases

- **Invalid characters**: Only valid numeric input is accepted; invalid keystrokes are ignored
- **Locale mismatch**: Ensure `locale` and `currencyCode` are compatible (e.g. "en-GB" with "GBP")
- **Zero decimal currencies**: JPY and similar currencies display no decimal places
- **readOnly in tables**: Use column `format` prop instead of `readOnly` InputCurrency

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs)

## Recipes

### Currency In Table Recipe

```tsx
import { IressTable } from '@iress-oss/ids-components';

export const CurrencyInTable = () => {
  return (
    <IressTable
      caption="My investments"
      columns={[
        {
          key: 'investmentName',
          label: 'Investment Name',
          format: 'string',
          width: '30%',
        },
        {
          key: 'investmentDate',
          label: 'Investment Date',
          format: 'date',
          width: '30%',
        },
        {
          key: 'totalPercentage',
          label: 'Total %',
          format: 'percent',
          width: '15%',
        },
        {
          key: 'amount',
          label: 'Investment Amount (AUD)',
          format: 'currency',
          currencyCode: '',
          width: '25%',
        },
      ]}
      rows={[
        {
          investmentName: 'US Stocks',
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
          amount: 23898,
        },
        {
          investmentName: 'US Bonds',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 26382.456,
        },
        {
          investmentName: 'AU Stocks',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 9342.1569,
        },
        {
          investmentName: 'UK Stocks',
          investmentDate: '2020-06-28',
          totalPercentage: 49,
          amount: 49751.4,
        },
      ]}
    />
  );
};
```

### Valid Value On Chage Recipe

```tsx
import { IressInputCurrency } from '@iress-oss/ids-components';
import { useState } from 'react';

export const ValidValueOnChage = () => {
  const [value, setValue] = useState('');

  return (
    <IressInputCurrency
      value={value}
      onChange={(_e, value) => {
        if (typeof value === 'string' && /^-?\d*(\.\d{0,2})?$/.test(value)) {
          console.log('Valid value:', value);
          setValue(value);
        }
      }}
    />
  );
};
```

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

InputCurrency allows a user to input and interact with currency number. It works just like IressInput, with new props locale and currencyCode. This component meets ISO-4217 standard

<StoryEmbed id="components-inputcurrency--gbp"/>

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

<IressInputCurrency defaultValue={12345.678} locale="en-AU" currencyCode="AUD" />
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-inputcurrency--docs#api-props)

### Usage

#### Different Locale and CurrencyCode

Display the GBP with `locale="en-GB"` and `currencyCode="GBP"` props (must pass both together)

<StoryEmbed id="components-inputcurrency--gbp"/>

Display the JPY with `locale="ja-JPY"` and `currencyCode="JPY"` props (must pass both together)

<StoryEmbed id="components-inputcurrency--jpy"/>

#### With Symbol

Display the currency symbol with `withSymbol` props

<StoryEmbed id="components-inputcurrency--with-symbol"/>

#### More Format Options

Pass more format options with `formatOptions` props. More format options in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat">here</a>

<StoryEmbed id="components-inputcurrency--format-options"/>

#### Read Only

The `readOnly` prop can be set to prevent the user from changing the value of the input. If you want to make the number align to right, please pass `alignRight` together.

<StoryEmbed id="components-inputcurrency--read-only"/>

#### Align Right

Set the input content align to right with `alignRight` prop, which is more friendly for number input.

<StoryEmbed id="components-inputcurrency--align-right"/>

### Recipes

#### Using IressInputCurrency in table

It is not recommended to use the `readOnly` prop for `IressInputCurrency` inside tables, as it was designed for forms. This example shows how to use currency in the table, by using the `format` prop of when defining a column inside `IressTable`. Additionally, when all rows have the same currency, it is recommended to add the currency code on the column `label` and remove the `currencyCode` on all rows.

<StoryEmbed id="components-inputcurrency--currency-in-table"/>

#### OnChange with valid value

Only able to input valid value when use `IressInputCurrency`. In this example, only number and 2 decimal places are allowed.

<StoryEmbed id="components-inputcurrency--valid-value-on-chage"/>

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
| main | The root element of the input currency | — | `input-currency` |

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
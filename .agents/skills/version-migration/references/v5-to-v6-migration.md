# IDS v5 → v6 Migration Reference

This document covers changes specific to migrating from IDS v5 (`@iress-oss/ids-components@5.x`) to v6.

## Package Changes

| v5 Package                  | v6 Package                      |
| --------------------------- | ------------------------------- |
| `@iress-oss/ids-components` | `@iress-oss/ids-components`     |
| CSS: `dist/style.css`       | CSS: `styled-system/styles.css` |

## Component Renames

| v5 Component         | v6 Component                         | Notes                                                                 |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `IressBadge`         | `IressPill`                          | Renamed                                                               |
| `IressFilter`        | `IressDropdownMenu`                  | Now a pattern component                                               |
| `IressRichSelect`    | `IressSelect`                        | Consolidated; v5 `IressSelect` replaced by `native` prop on v6 Select |
| `IressCombobox`      | `IressSelect` or `IressAutocomplete` | Was deprecated in v5                                                  |
| `IressMultiCombobox` | `IressSelect` with `multiSelect`     | Was deprecated in v5                                                  |
| `IressNavbar`        | Removed                              | Build custom navigation per-application                               |

## New Components in v6

| Component                    | Purpose                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `IressBreadcrumbs`           | Navigation hierarchy                                                                               |
| `IressContextualMenu`        | Context / "more actions" menu                                                                      |
| `IressDropdownMenu`          | Filter/navigation dropdown                                                                         |
| `IressLink`                  | Anchor links in text                                                                               |
| `IressPill`                  | Status indicators, counters                                                                        |
| `IressImage`                 | Responsive images                                                                                  |
| `IressMenuGroup`             | Menu item grouping                                                                                 |
| `IressShadow`                | CSS isolation wrapper for micro-frontends (NOT a custom element — all children are standard React) |
| `IressSideNav`               | Side navigation                                                                                    |
| `IressFormField`             | Form-integrated field with validation                                                              |
| `IressFormValidationSummary` | Form validation summary                                                                            |

## Prop Changes by Component

### Button

| v5 prop           | v6 prop            | Notes                                               |
| ----------------- | ------------------ | --------------------------------------------------- |
| `mode="link"`     | `mode="tertiary"`  | Or use `IressLink` for links in text                |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                     |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                     |
| `mode="negative"` | `status="danger"`  | Use `status` prop                                   |
| `attrs`           | removed            | Use native HTML attributes directly                 |
| —                 | `icon`             | New: Material Symbol name for icon-only buttons     |
| —                 | `compact`          | New: reduces padding for compact buttons            |
| —                 | `status`           | New: `success` or `danger`                          |
| —                 | `active`           | New: indicates button has activated a modal/popover |

### Alert

| v5 prop        | v6 prop         | Notes                                               |
| -------------- | --------------- | --------------------------------------------------- |
| `status`       | `status`        | Added `neutral` option in v6                        |
| `headingText`  | `heading`       | `headingText` was deprecated in v5                  |
| `headingLevel` | removed         | Was deprecated in v5; v6 auto-handles               |
| `footer`       | `footer`        | Unchanged                                           |
| —              | `actions`       | New: array of button props with opinionated styling |
| —              | `closed`        | New: controlled dismissal                           |
| —              | `defaultClosed` | New: uncontrolled dismissal                         |
| —              | `onClose`       | New: callback when dismissed                        |
| —              | `icon`          | New: custom icon or `false` to hide                 |
| —              | `multiLine`     | New: layout for longer content                      |
| —              | `variant`       | New: `sidebar` or `full-width`                      |

### Toggle

| v5 prop       | v6 prop          | Notes                       |
| ------------- | ---------------- | --------------------------- |
| `checked`     | `checked`        | Unchanged (controlled mode) |
| —             | `defaultChecked` | New: for uncontrolled mode  |
| `children`    | `children`       | Unchanged                   |
| `hiddenLabel` | `hiddenLabel`    | Unchanged                   |
| `layout`      | `layout`         | Unchanged                   |
| `onChange`    | `onChange`       | Unchanged                   |
| —             | `disabled`       | New: disables the toggle    |

### Field (IressField)

| v5 prop         | v6 prop             | Notes                                  |
| --------------- | ------------------- | -------------------------------------- |
| `label`         | `label`             | Unchanged                              |
| `hiddenLabel`   | `hiddenLabel`       | Unchanged                              |
| `hint`          | `hint`              | Unchanged                              |
| `error`         | `error`             | Unchanged                              |
| `errorMessages` | `errorMessages`     | Unchanged                              |
| `optional`      | removed             | Use `required={false}` instead         |
| `required`      | `required`          | Unchanged                              |
| `readOnly`      | `readOnly`          | Unchanged                              |
| `htmlFor`       | `htmlFor`           | Unchanged                              |
| —               | `horizontal`        | New: inline label/input layout         |
| —               | `labelWidth`        | New: label width in horizontal mode    |
| —               | `removeErrorMargin` | New: removes reserved error space      |
| —               | `supplementary`     | New: content below field when no error |

### Modal

| v5 prop        | v6 prop            | Notes                    |
| -------------- | ------------------ | ------------------------ |
| `show`         | `show`             | Unchanged                |
| `defaultShow`  | `defaultShow`      | Unchanged                |
| `size`         | `size`             | Unchanged                |
| `heading`      | `heading`          | Unchanged                |
| `footer`       | `footer`           | Unchanged                |
| `padding`      | `p` (styling prop) | Use styling prop instead |
| `onShowChange` | `onShowChange`     | Unchanged                |
| `onEntered`    | `onEntered`        | Unchanged                |
| `onExited`     | `onExited`         | Unchanged                |

### Badge → Pill

| v5 prop   | v6 prop     | Notes                                                   |
| --------- | ----------- | ------------------------------------------------------- |
| Component | `IressPill` | `IressBadge` renamed to `IressPill`                     |
| `mode`    | `mode`      | Values changed: now uses data palette (10-90) or status |
| `pill`    | removed     | v6 Pill is always pill-shaped                           |
| `host`    | removed     | Use composition instead                                 |

### Select (was RichSelect)

| v5 prop       | v6 prop            | Notes                                                                                  |
| ------------- | ------------------ | -------------------------------------------------------------------------------------- |
| Component     | `IressSelect`      | `IressRichSelect` renamed to `IressSelect`                                             |
| `options`     | `options`          | Unchanged                                                                              |
| `value`       | `value`            | Now also accepts a plain string or `FormControlValue` (resolves to matching option)    |
| `multiSelect` | `multiSelect`      | Unchanged                                                                              |
| —             | `defaultValue`     | Accepts `LabelValueMeta` or plain string for uncontrolled pre-selection                |
| —             | `multiSelectLimit` | New: limits visible selected tags before collapsing to "+N more" (default `5`)         |
| —             | `native`           | New: renders native `<select>` element                                                 |

### Filter → DropdownMenu

| v5 prop       | v6 prop             | Notes                 |
| ------------- | ------------------- | --------------------- |
| Component     | `IressDropdownMenu` | `IressFilter` renamed |
| `options`     | `options`           | Unchanged             |
| `value`       | `selected`          | Prop renamed          |
| `multiSelect` | `multiSelect`       | Unchanged             |
| `searchable`  | `searchable`        | Unchanged             |

### Popover

| v5 prop        | v6 prop        | Notes                                                                                                |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `contentStyle` | `contentStyle` | Unchanged                                                                                            |
| —              | —              | ⚠️ **Breaking:** Popover content now has default `padding: spacing.4`. Override with `contentStyle={{ padding: 'spacing.0' }}` if you were providing your own inner padding |

### Readonly

| v5 prop | v6 prop   | Notes                                                                                                |
| ------- | --------- | ---------------------------------------------------------------------------------------------------- |
| —       | `actions` | New: array of button props rendered alongside the readonly value (e.g. edit/save toggles)            |
| —       | —         | ⚠️ **Breaking:** DOM structure changed — inner content is now wrapped in an additional `wrapper` div inside `root`. CSS selectors targeting direct children of the root may need updating |

## Styling Changes

### CSS Import

```tsx
// v5
import '@iress-oss/ids-components/dist/style.css';

// v6
import '@iress-oss/ids-components/styled-system/styles.css';
```

### Styling Props

v6 uses Panda CSS and exposes styling props on all components:

```tsx
// v6 styling props
<IressPanel p="lg" m="xl" bg="alt" />

// Responsive
<IressPanel p={{ base: 'sm', xl: 'lg' }} />
```

### Design Tokens

```tsx
// v6 - type-safe cssVars
import { cssVars } from '@iress-oss/ids-tokens';

<div style={{ color: cssVars.colour.primary.text }} />;
```

## Form Migration

v5 used standalone form components. v6 introduces `IressForm` + `IressFormField` with React Hook Form integration.

```tsx
// v5
<IressField label="Email" error={errors.email}>
  <IressInput name="email" value={value} onChange={handleChange} />
</IressField>

// v6
<IressForm defaultValues={{ email: '' }} onSubmit={handleSubmit}>
  <IressFormField
    name="email"
    label="Email"
    render={(field) => <IressInput {...field} />}
    rules={{ required: 'Required' }}
  />
</IressForm>
```

Note: `IressField` still exists in v6 for standalone layout without form binding.

## Icon Changes

v5 used FontAwesome icons. v6 uses Material Symbols.

```tsx
// v5
<IressIcon name="check" set="fas" />

// v6
<IressIcon name="check_circle" />
```

| v5 prop      | v6 prop | Notes                                |
| ------------ | ------- | ------------------------------------ |
| `name`       | `name`  | FontAwesome → Material Symbols names |
| `set`        | removed | v6 uses Material Symbols only        |
| `mode`       | `color` | Prop renamed                         |
| `size`       | removed | Inherits font size from parent       |
| `fixedWidth` | removed | Not needed with Material Symbols     |
| `spin`       | removed | Use CSS animation                    |

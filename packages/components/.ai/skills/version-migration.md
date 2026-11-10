# Skill: IDS Version Migration

## When to Use

- Migrating from IDS v5 (or v4) to IDS v6
- Migrating from OUI (`@iress/oui`) to IDS v6
- Updating imports from `@iress/components-react` to `@iress-oss/ids-components`
- Converting Formik forms to React Hook Form via `IressForm`/`IressFormField`
- Updating test files that use IDS v4 test utilities
- Reviewing migration PRs for correctness

## Decision Table: Which Migration Path?

| Current stack | Migration path                       | Complexity                        | Reference                                                 |
| ------------- | ------------------------------------ | --------------------------------- | --------------------------------------------------------- |
| OUI only      | OUI→v6 guide                         | High (form architecture change)   | prop-renames.md             |

# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

## OUI → IDS v6 Prop Changes

| OUI Component | OUI prop             | IDS v6 prop          | Notes                                                 |
| ------------- | -------------------- | -------------------- | ----------------------------------------------------- |
| `Alert`       | `context`            | `status`             | Values: `danger`, `info`, `success`, `warning`        |
| `Alert`       | `contextLabel`       | removed              | v6 auto-generates; remove this prop                   |
| `Alert`       | `closeLabel`         | `closeLabel`         | Unchanged                                             |
| `Alert`       | `onHide`             | `onClose`            | Callback for dismissing                               |
| `Button`      | `label`              | `children`           | `<Button label="X">` → `<IressButton>X</IressButton>` |
| `Button`      | `mode`               | `mode`               | Unchanged; values slightly different                  |
| `Button`      | `labelHidden`        | `icon` prop          | Use `icon` prop for icon-only buttons                 |
| `Button`      | `iconName`           | `icon`               | Use Material Symbol name                              |
| `Button`      | `showLoading`        | `loading`            | —                                                     |
| `Modal`       | `onHide`             | `onShowChange`       | `(show: boolean) => void`                             |
| `Modal`       | `show`               | `show`               | Unchanged                                             |
| `Modal`       | `size`               | `size`               | Values: `sm`, `md`, `lg` (OUI had `xs`, `xl` too)     |
| `Modal`       | `fixedFooter`        | `fixedFooter`        | Unchanged                                             |
| `Slideout`    | `show`               | `show`               | Unchanged                                             |
| `Slideout`    | `position`           | `position`           | Unchanged                                             |
| `Slideout`    | `size`               | `size`               | Values: `sm`, `md` (OUI had `lg`, `dynamic` too)      |
| `Fieldset`    | `legend`             | `label`              | On `IressFieldGroup`                                  |
| `Fieldset`    | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `RadioGroup`  | `legend`             | removed              | Use `IressFormField` `label` prop instead             |
| `RadioGroup`  | `legendHidden`       | removed              | Use `IressFormField` `hiddenLabel` prop               |
| `RadioGroup`  | `options`            | `children`           | Use `<IressRadio>` children instead of options array  |
| `RadioGroup`  | `checked`            | `value`              | —                                                     |
| `RadioGroup`  | `readOnly`           | `readOnly`           | Now accepts `boolean \| 'locked'`                     |
| `Toggle`      | `legend`             | `children`           | —                                                     |
| `Toggle`      | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `Toggle`      | `toggled`            | `checked`            | —                                                     |
| `Toggle`      | `labelTrue`          | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Toggle`      | `labelFalse`         | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Label`       | `label`              | `children`           | `<Label label="X">` → `<IressLabel>X</IressLabel>`    |
| `Label`       | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Label`       | `optional`           | `required`           | Logic inverted                                        |
| `Label`       | `required`           | `required`           | Now takes boolean, not string                         |
| `Input`       | `inputRef`           | `ref`                | Use standard React ref                                |
| `Input`       | `type`               | `type`               | Unchanged                                             |
| `Checkbox`    | `label`              | `children`           | —                                                     |
| `Checkbox`    | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Checkbox`    | `isInline`           | removed              | Use parent layout component                           |
| `Slider`      | `label`              | removed              | Use `aria-label` or wrap in `IressFormField`          |
| `Slider`      | `hideCurrentLabel`   | `hiddenValueTooltip` | —                                                     |
| `Slider`      | `hideBoundaryLabels` | `tickLabels`         | Set to `false` to hide                                |
| `Tabs`        | `activeTabIndex`     | `selected`           | Use tab `value` prop to identify tabs                 |
| `Tabs`        | `onSelect`           | `onChange`           | —                                                     |
| `Tabs`        | `lazy`               | removed              | v6 tabs are always lazy                               |
| `ProgressBar` | `now`                | `value`              | —                                                     |
| `ProgressBar` | `color`              | removed              | Use CSS custom properties for color                   |
| `ProgressBar` | `striped`            | removed              | Not available in v6                                   |
| `ProgressBar` | `animated`           | removed              | Not available in v6                                   |

## IDS v4 React → IDS v6 React Prop Changes (Verified against v4 source)

The v4 React wrappers (`@iress/components-react`) automatically convert Stencil's kebab-case props to camelCase and map custom events to React callback props (e.g., `iressModalEntered` → `onEntered`). This section documents the v4 React API compared to v6.

### Button

| v4 React prop     | v6 React prop      | Notes                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `mode`             | v4 values: `primary`, `secondary`, `tertiary`, `link`, `danger`, `positive`, `negative` → v6: `primary`, `secondary`, `tertiary`, `quaternary`, `muted` |
| `mode="link"`     | removed            | Use `mode="tertiary"` or `IressLink` component                                                                                                          |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                                                                                                                         |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                                                                                                                         |
| `mode="negative"` | removed            | Use `status="danger"` instead                                                                                                                           |
| `loading`         | `loading`          | Unchanged                                                                                                                                               |
| `loadingText`     | `loading` (string) | v6 accepts boolean or string for loading                                                                                                                |
| `fluid`           | `fluid`            | Unchanged                                                                                                                                               |
| `noWrap`          | `noWrap`           | Unchanged                                                                                                                                               |
| `href`            | `href`             | Unchanged                                                                                                                                               |
| `onClick`         | `onClick`          | Unchanged                                                                                                                                               |
| slot `icon-only`  | `icon` prop        | v6 uses `icon` prop for icon-only buttons                                                                                                               |
| slot `prepend`    | `prepend` prop     | v6 uses prop instead of slot                                                                                                                            |
| slot `append`     | `append` prop      | v6 uses prop instead of slot                                                                                                                            |

### Alert

| v4 React prop    | v6 React prop     | Notes                                                                                             |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `status`         | `status`          | v4: `error`, `warning`, `success`, `info` → v6: `danger`, `warning`, `success`, `info`, `neutral` |
| `status="error"` | `status="danger"` | Value renamed                                                                                     |
| `headingText`    | `heading`         | Prop renamed                                                                                      |
| `headingLevel`   | removed           | v6 auto-handles heading level                                                                     |
| slot `footer`    | `actions` prop    | v6 uses `actions` array for buttons                                                               |

### Modal

| v4 React prop          | v6 React prop          | Notes                                              |
| ---------------------- | ---------------------- | -------------------------------------------------- |
| `show`                 | `show`                 | Unchanged                                          |
| `size`                 | `size`                 | v4 allowed responsive array → v6 single value only |
| `closeText`            | `closeText`            | Unchanged                                          |
| `fixedFooter`          | `fixedFooter`          | Unchanged                                          |
| `disableBackdropClick` | `disableBackdropClick` | Unchanged                                          |
| `noCloseButton`        | `noCloseButton`        | Unchanged                                          |
| `padding`              | `p` (styling prop)     | Use styling prop instead                           |
| `onEntered`            | `onEntered`            | Unchanged                                          |
| `onExited`             | `onExited`             | Unchanged                                          |
| slot `footer`          | `footer` prop          | v6 uses prop instead of slot                       |

### Slideout

| v4 React prop | v6 React prop | Notes                                  |
| ------------- | ------------- | -------------------------------------- |
| `show`        | `show`        | Unchanged                              |
| `eleToPush`   | `eleToPush`   | Unchanged                              |
| `mode`        | `mode`        | Unchanged (`overlay`, `push`)          |
| `closeText`   | `closeText`   | Unchanged                              |
| `padding`     | removed       | Use `p` styling prop on content        |
| `position`    | `position`    | Unchanged                              |
| `size`        | `size`        | Unchanged                              |
| `backdrop`    | removed       | v6 always has backdrop in overlay mode |
| `onEntered`   | `onEntered`   | Unchanged                              |
| `onExited`    | `onExited`    | Unchanged                              |
| slot `footer` | `footer` prop | v6 uses prop instead of slot           |

### Panel

| v4 React prop    | v6 React prop         | Notes                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `background`     | `bg`                  | v4: `default`, `alt`, `transparent` → v6: `alt`, token values |
| `padding`        | `p` (styling prop)    | Use styling prop instead                                      |
| `textAlign`      | `textAlign`           | Unchanged                                                     |
| `stretch`        | `stretch`             | Unchanged (now styling prop)                                  |
| `noBorderRadius` | `borderRadius="none"` | Use `borderRadius` prop instead                               |

### Text

| v4 React prop | v6 React prop | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `variant`     | `textStyle`   | Prop renamed                 |
| `mode`        | `color`       | Prop renamed                 |
| `align`       | `textAlign`   | Prop renamed                 |
| `element`     | `element`     | Unchanged                    |
| `noGutter`    | removed       | Use `mb="none"` styling prop |

### Stack / Inline

| v4 React prop     | v6 React prop | Notes                                                        |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `gutter`          | `gap`         | v4: `none`, `xs`, `sm`, `md`, `lg`, `xl` → v6 spacing tokens |
| `horizontalAlign` | `justify`     | Prop renamed (Inline only)                                   |
| `verticalAlign`   | `align`       | Prop renamed (Inline only)                                   |
| `noWrap`          | `noWrap`      | Unchanged                                                    |

### Icon

| v4 React prop      | v6 React prop      | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| `name`             | `name`             | v4: FontAwesome names → v6: Material Symbols |
| `set`              | removed            | v6 uses Material Symbols only                |
| `mode`             | `color`            | Prop renamed                                 |
| `size`             | removed            | Inherits font size from parent               |
| `fixedWidth`       | removed            | Not needed with Material Symbols             |
| `spin`             | removed            | Use CSS animation instead                    |
| `rotate`           | removed            | Use CSS transform instead                    |
| `flip`             | removed            | Use CSS transform instead                    |
| `screenreaderText` | `screenreaderText` | Unchanged                                    |

### Label

| v4 React prop  | v6 React prop         | Notes                             |
| -------------- | --------------------- | --------------------------------- |
| `labelText`    | `children`            | v4 uses prop → v6 uses children   |
| `for`          | `htmlFor`             | Prop renamed                      |
| `hiddenLabel`  | `hiddenLabel`         | Unchanged                         |
| `optional`     | `required` (inverted) | Logic inverted                    |
| `optionalText` | removed               | v6 doesn't show "(optional)" text |
| `focusOn`      | removed               | Not needed in v6                  |

### Field

| v4 React prop        | v6 React prop     | Notes                                        |
| -------------------- | ----------------- | -------------------------------------------- |
| `label`              | `label`           | Unchanged                                    |
| `hiddenLabel`        | `hiddenLabel`     | Unchanged                                    |
| `hint`               | `hint`            | Unchanged                                    |
| `error`              | `errorMessages`   | Now takes array of `ValidationMessageObj`    |
| `disabledValidation` | removed           | Validation handled by `IressFormField` rules |
| `inline`             | `horizontal`      | Prop renamed                                 |
| `optionalText`       | removed           | —                                            |
| `valueMissing`       | `rules.required`  | Use `rules` prop on `IressFormField`         |
| `tooLong`            | `rules.maxLength` | Use `rules` prop on `IressFormField`         |
| `tooShort`           | `rules.minLength` | Use `rules` prop on `IressFormField`         |
| `patternMismatch`    | `rules.pattern`   | Use `rules` prop on `IressFormField`         |
| `rangeOverflow`      | `rules.max`       | Use `rules` prop on `IressFormField`         |
| `rangeUnderflow`     | `rules.min`       | Use `rules` prop on `IressFormField`         |

### Toggle

| v4 React prop | v6 React prop | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `checked`     | `checked`     | Unchanged                                |
| `label`       | `children`    | v4 uses prop → v6 uses children          |
| `hiddenLabel` | `hiddenLabel` | Unchanged                                |
| `layout`      | `layout`      | Unchanged                                |
| `onChange`    | `onChange`    | Unchanged (signature slightly different) |

### Badge → Pill

| v4 React prop     | v6 React prop | Notes                         |
| ----------------- | ------------- | ----------------------------- |
| Component renamed | `IressPill`   | `IressBadge` → `IressPill`    |
| `mode`            | `status`      | Prop renamed                  |
| `pill`            | removed       | v6 Pill is always pill-shaped |
| slot `host`       | removed       | Use composition instead       |

### SkipLink

| v4 React prop | v6 React prop  | Notes                                               |
| ------------- | -------------- | --------------------------------------------------- |
| `targetId`    | `href`         | Now takes full href with `#` (e.g., `href="#main"`) |
| `text`        | `children`     | v4 uses prop → v6 uses children                     |
| `customRoute` | `element` prop | Use `element` to customize rendered element         |

### Expander

| v4 React prop    | v6 React prop    | Notes                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `open`           | `open`           | Unchanged                                             |
| `mode`           | `mode`           | v4: `section`, `heading`, `link` → v6: `section` only |
| `mode="heading"` | `mode="section"` | Value renamed                                         |
| slot `activator` | `activator` prop | v4 uses slot → v6 uses prop                           |
| `onChange`       | `onChange`       | Unchanged                                             |

### Tabs (TabContainer → TabSet)

| v4 React prop     | v6 React prop | Notes                                     |
| ----------------- | ------------- | ----------------------------------------- |
| Component renamed | `IressTabSet` | `IressTabContainer` → `IressTabSet`       |
| `onChange`        | `onChange`    | Unchanged                                 |
| `IressTabButton`  | `IressTab`    | Component renamed                         |
| `IressTabPanel`   | removed       | Content now passed as `IressTab` children |

## Key Architecture Changes (v4 React → v6 React)

### Package Changes

| v4 Package                    | v6 Package                                 | Notes                   |
| ----------------------------- | ------------------------------------------ | ----------------------- |
| `@iress/components-react`     | `@iress-oss/ids-components`                | Main component package  |
| `@iress/ids-react-test-utils` | `@testing-library/react`                   | Use standard RTL        |
| `@iress/components` (CSS)     | `@iress-oss/ids-components/dist/style.css` | CSS import path changed |
| `@iress/ids-themes`           | `@iress-oss/ids-tokens`                    | Design tokens package   |

### Slot → Prop Migration

v4 used `slot` attributes on children to position content inside components. This is a legacy v4 pattern that is **no longer supported** — v6 uses React props directly (`prepend`, `append`, `footer`, `icon`, `activator`, etc.).

> **⚠️ Do not copy `slot` attributes from existing code.** If you see `slot="..."` in a codebase, it is legacy v4 code that needs to be migrated. AI agents frequently propagate this pattern by matching existing code — always use the prop-based API instead.

> **⚠️ `IressShadow` does NOT mean the app uses Web Components.** AI agents commonly see `IressShadow` (which uses Shadow DOM for CSS isolation) and incorrectly conclude the application uses custom elements with `slot` attributes. This is wrong — `IressShadow` wraps an entire React app in a single shadow root on a `<div>` element for style encapsulation. All components inside `IressShadow` are standard React components. IDS has not offered Web Components since v4.

```tsx
// ❌ v4: Using slot attributes (no longer supported)
<IressButton>
  <IressIcon slot="prepend" name="search" />
  Search
</IressButton>

// ✅ v6: Using props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>
```

```tsx
// ❌ v4: Modal footer slot (no longer supported)
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ v6: Modal footer prop
<IressModal
  show={show}
  footer={<IressButton>Close</IressButton>}
>
  Content
</IressModal>
```

### Event Callback Changes

v4 React wrappers mapped Stencil custom events to React callback props. Most remain the same in v6, but some have changed:

| v4 Callback     | v6 Callback     | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `onClick`       | `onClick`       | Unchanged                        |
| `onChange`      | `onChange`      | Unchanged (signature may differ) |
| `onBlur`        | `onBlur`        | Unchanged                        |
| `onFocus`       | `onFocus`       | Unchanged                        |
| `onEntered`     | `onEntered`     | Unchanged                        |
| `onExited`      | `onExited`      | Unchanged                        |
| `onActivated`   | `onActivated`   | Unchanged                        |
| `onDeactivated` | `onDeactivated` | Unchanged                        |
| `onClear`       | `onClear`       | Unchanged                        |

### Test Utility Migration

v4 provided `@iress/ids-react-test-utils` with `idsFireEvent` for testing custom events. v6 uses standard React Testing Library.

```tsx
// ❌ v4: Using idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });
idsFireEvent.entered(modal);
idsFireEvent.blur(field, { target: { value: 'test' } });

// ✅ v6: Using standard RTL
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

await userEvent.type(input, 'test');
fireEvent.transitionEnd(modal); // or wait for onEntered callback
await userEvent.tab(); // for blur
```

### Helper Function Migration

v4 provided helper functions in `@iress/components-react`. These are no longer needed in v6.

| v4 Helper                   | v6 Replacement                               |
| --------------------------- | -------------------------------------------- |
| `mapCheckboxGroupOptions()` | Use `<IressCheckbox>` children directly      |
| `mapRadioGroupOptions()`    | Use `<IressRadio>` children directly         |
| `mapSelectOptions()`        | Use `options` prop on `IressSelect`          |
| `mapTabs()`                 | Use `<IressTab>` children directly           |
| `mapMenuItems()`            | Use `<IressMenuItem>` children directly      |
| `showModal(id)`             | Use `show` prop or `useModal` hook           |
| `showSlideout(id)`          | Use `show` prop or `useSlideout` hook        |
| `rowData(arr, ref)`         | Pass `rowData` prop directly to `IressTable` |
| IDS v4 only   | v4→v6 guide                          | Medium (form architecture change) | prop-renames.md             |

# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

## OUI → IDS v6 Prop Changes

| OUI Component | OUI prop             | IDS v6 prop          | Notes                                                 |
| ------------- | -------------------- | -------------------- | ----------------------------------------------------- |
| `Alert`       | `context`            | `status`             | Values: `danger`, `info`, `success`, `warning`        |
| `Alert`       | `contextLabel`       | removed              | v6 auto-generates; remove this prop                   |
| `Alert`       | `closeLabel`         | `closeLabel`         | Unchanged                                             |
| `Alert`       | `onHide`             | `onClose`            | Callback for dismissing                               |
| `Button`      | `label`              | `children`           | `<Button label="X">` → `<IressButton>X</IressButton>` |
| `Button`      | `mode`               | `mode`               | Unchanged; values slightly different                  |
| `Button`      | `labelHidden`        | `icon` prop          | Use `icon` prop for icon-only buttons                 |
| `Button`      | `iconName`           | `icon`               | Use Material Symbol name                              |
| `Button`      | `showLoading`        | `loading`            | —                                                     |
| `Modal`       | `onHide`             | `onShowChange`       | `(show: boolean) => void`                             |
| `Modal`       | `show`               | `show`               | Unchanged                                             |
| `Modal`       | `size`               | `size`               | Values: `sm`, `md`, `lg` (OUI had `xs`, `xl` too)     |
| `Modal`       | `fixedFooter`        | `fixedFooter`        | Unchanged                                             |
| `Slideout`    | `show`               | `show`               | Unchanged                                             |
| `Slideout`    | `position`           | `position`           | Unchanged                                             |
| `Slideout`    | `size`               | `size`               | Values: `sm`, `md` (OUI had `lg`, `dynamic` too)      |
| `Fieldset`    | `legend`             | `label`              | On `IressFieldGroup`                                  |
| `Fieldset`    | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `RadioGroup`  | `legend`             | removed              | Use `IressFormField` `label` prop instead             |
| `RadioGroup`  | `legendHidden`       | removed              | Use `IressFormField` `hiddenLabel` prop               |
| `RadioGroup`  | `options`            | `children`           | Use `<IressRadio>` children instead of options array  |
| `RadioGroup`  | `checked`            | `value`              | —                                                     |
| `RadioGroup`  | `readOnly`           | `readOnly`           | Now accepts `boolean \| 'locked'`                     |
| `Toggle`      | `legend`             | `children`           | —                                                     |
| `Toggle`      | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `Toggle`      | `toggled`            | `checked`            | —                                                     |
| `Toggle`      | `labelTrue`          | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Toggle`      | `labelFalse`         | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Label`       | `label`              | `children`           | `<Label label="X">` → `<IressLabel>X</IressLabel>`    |
| `Label`       | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Label`       | `optional`           | `required`           | Logic inverted                                        |
| `Label`       | `required`           | `required`           | Now takes boolean, not string                         |
| `Input`       | `inputRef`           | `ref`                | Use standard React ref                                |
| `Input`       | `type`               | `type`               | Unchanged                                             |
| `Checkbox`    | `label`              | `children`           | —                                                     |
| `Checkbox`    | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Checkbox`    | `isInline`           | removed              | Use parent layout component                           |
| `Slider`      | `label`              | removed              | Use `aria-label` or wrap in `IressFormField`          |
| `Slider`      | `hideCurrentLabel`   | `hiddenValueTooltip` | —                                                     |
| `Slider`      | `hideBoundaryLabels` | `tickLabels`         | Set to `false` to hide                                |
| `Tabs`        | `activeTabIndex`     | `selected`           | Use tab `value` prop to identify tabs                 |
| `Tabs`        | `onSelect`           | `onChange`           | —                                                     |
| `Tabs`        | `lazy`               | removed              | v6 tabs are always lazy                               |
| `ProgressBar` | `now`                | `value`              | —                                                     |
| `ProgressBar` | `color`              | removed              | Use CSS custom properties for color                   |
| `ProgressBar` | `striped`            | removed              | Not available in v6                                   |
| `ProgressBar` | `animated`           | removed              | Not available in v6                                   |

## IDS v4 React → IDS v6 React Prop Changes (Verified against v4 source)

The v4 React wrappers (`@iress/components-react`) automatically convert Stencil's kebab-case props to camelCase and map custom events to React callback props (e.g., `iressModalEntered` → `onEntered`). This section documents the v4 React API compared to v6.

### Button

| v4 React prop     | v6 React prop      | Notes                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `mode`             | v4 values: `primary`, `secondary`, `tertiary`, `link`, `danger`, `positive`, `negative` → v6: `primary`, `secondary`, `tertiary`, `quaternary`, `muted` |
| `mode="link"`     | removed            | Use `mode="tertiary"` or `IressLink` component                                                                                                          |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                                                                                                                         |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                                                                                                                         |
| `mode="negative"` | removed            | Use `status="danger"` instead                                                                                                                           |
| `loading`         | `loading`          | Unchanged                                                                                                                                               |
| `loadingText`     | `loading` (string) | v6 accepts boolean or string for loading                                                                                                                |
| `fluid`           | `fluid`            | Unchanged                                                                                                                                               |
| `noWrap`          | `noWrap`           | Unchanged                                                                                                                                               |
| `href`            | `href`             | Unchanged                                                                                                                                               |
| `onClick`         | `onClick`          | Unchanged                                                                                                                                               |
| slot `icon-only`  | `icon` prop        | v6 uses `icon` prop for icon-only buttons                                                                                                               |
| slot `prepend`    | `prepend` prop     | v6 uses prop instead of slot                                                                                                                            |
| slot `append`     | `append` prop      | v6 uses prop instead of slot                                                                                                                            |

### Alert

| v4 React prop    | v6 React prop     | Notes                                                                                             |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `status`         | `status`          | v4: `error`, `warning`, `success`, `info` → v6: `danger`, `warning`, `success`, `info`, `neutral` |
| `status="error"` | `status="danger"` | Value renamed                                                                                     |
| `headingText`    | `heading`         | Prop renamed                                                                                      |
| `headingLevel`   | removed           | v6 auto-handles heading level                                                                     |
| slot `footer`    | `actions` prop    | v6 uses `actions` array for buttons                                                               |

### Modal

| v4 React prop          | v6 React prop          | Notes                                              |
| ---------------------- | ---------------------- | -------------------------------------------------- |
| `show`                 | `show`                 | Unchanged                                          |
| `size`                 | `size`                 | v4 allowed responsive array → v6 single value only |
| `closeText`            | `closeText`            | Unchanged                                          |
| `fixedFooter`          | `fixedFooter`          | Unchanged                                          |
| `disableBackdropClick` | `disableBackdropClick` | Unchanged                                          |
| `noCloseButton`        | `noCloseButton`        | Unchanged                                          |
| `padding`              | `p` (styling prop)     | Use styling prop instead                           |
| `onEntered`            | `onEntered`            | Unchanged                                          |
| `onExited`             | `onExited`             | Unchanged                                          |
| slot `footer`          | `footer` prop          | v6 uses prop instead of slot                       |

### Slideout

| v4 React prop | v6 React prop | Notes                                  |
| ------------- | ------------- | -------------------------------------- |
| `show`        | `show`        | Unchanged                              |
| `eleToPush`   | `eleToPush`   | Unchanged                              |
| `mode`        | `mode`        | Unchanged (`overlay`, `push`)          |
| `closeText`   | `closeText`   | Unchanged                              |
| `padding`     | removed       | Use `p` styling prop on content        |
| `position`    | `position`    | Unchanged                              |
| `size`        | `size`        | Unchanged                              |
| `backdrop`    | removed       | v6 always has backdrop in overlay mode |
| `onEntered`   | `onEntered`   | Unchanged                              |
| `onExited`    | `onExited`    | Unchanged                              |
| slot `footer` | `footer` prop | v6 uses prop instead of slot           |

### Panel

| v4 React prop    | v6 React prop         | Notes                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `background`     | `bg`                  | v4: `default`, `alt`, `transparent` → v6: `alt`, token values |
| `padding`        | `p` (styling prop)    | Use styling prop instead                                      |
| `textAlign`      | `textAlign`           | Unchanged                                                     |
| `stretch`        | `stretch`             | Unchanged (now styling prop)                                  |
| `noBorderRadius` | `borderRadius="none"` | Use `borderRadius` prop instead                               |

### Text

| v4 React prop | v6 React prop | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `variant`     | `textStyle`   | Prop renamed                 |
| `mode`        | `color`       | Prop renamed                 |
| `align`       | `textAlign`   | Prop renamed                 |
| `element`     | `element`     | Unchanged                    |
| `noGutter`    | removed       | Use `mb="none"` styling prop |

### Stack / Inline

| v4 React prop     | v6 React prop | Notes                                                        |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `gutter`          | `gap`         | v4: `none`, `xs`, `sm`, `md`, `lg`, `xl` → v6 spacing tokens |
| `horizontalAlign` | `justify`     | Prop renamed (Inline only)                                   |
| `verticalAlign`   | `align`       | Prop renamed (Inline only)                                   |
| `noWrap`          | `noWrap`      | Unchanged                                                    |

### Icon

| v4 React prop      | v6 React prop      | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| `name`             | `name`             | v4: FontAwesome names → v6: Material Symbols |
| `set`              | removed            | v6 uses Material Symbols only                |
| `mode`             | `color`            | Prop renamed                                 |
| `size`             | removed            | Inherits font size from parent               |
| `fixedWidth`       | removed            | Not needed with Material Symbols             |
| `spin`             | removed            | Use CSS animation instead                    |
| `rotate`           | removed            | Use CSS transform instead                    |
| `flip`             | removed            | Use CSS transform instead                    |
| `screenreaderText` | `screenreaderText` | Unchanged                                    |

### Label

| v4 React prop  | v6 React prop         | Notes                             |
| -------------- | --------------------- | --------------------------------- |
| `labelText`    | `children`            | v4 uses prop → v6 uses children   |
| `for`          | `htmlFor`             | Prop renamed                      |
| `hiddenLabel`  | `hiddenLabel`         | Unchanged                         |
| `optional`     | `required` (inverted) | Logic inverted                    |
| `optionalText` | removed               | v6 doesn't show "(optional)" text |
| `focusOn`      | removed               | Not needed in v6                  |

### Field

| v4 React prop        | v6 React prop     | Notes                                        |
| -------------------- | ----------------- | -------------------------------------------- |
| `label`              | `label`           | Unchanged                                    |
| `hiddenLabel`        | `hiddenLabel`     | Unchanged                                    |
| `hint`               | `hint`            | Unchanged                                    |
| `error`              | `errorMessages`   | Now takes array of `ValidationMessageObj`    |
| `disabledValidation` | removed           | Validation handled by `IressFormField` rules |
| `inline`             | `horizontal`      | Prop renamed                                 |
| `optionalText`       | removed           | —                                            |
| `valueMissing`       | `rules.required`  | Use `rules` prop on `IressFormField`         |
| `tooLong`            | `rules.maxLength` | Use `rules` prop on `IressFormField`         |
| `tooShort`           | `rules.minLength` | Use `rules` prop on `IressFormField`         |
| `patternMismatch`    | `rules.pattern`   | Use `rules` prop on `IressFormField`         |
| `rangeOverflow`      | `rules.max`       | Use `rules` prop on `IressFormField`         |
| `rangeUnderflow`     | `rules.min`       | Use `rules` prop on `IressFormField`         |

### Toggle

| v4 React prop | v6 React prop | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `checked`     | `checked`     | Unchanged                                |
| `label`       | `children`    | v4 uses prop → v6 uses children          |
| `hiddenLabel` | `hiddenLabel` | Unchanged                                |
| `layout`      | `layout`      | Unchanged                                |
| `onChange`    | `onChange`    | Unchanged (signature slightly different) |

### Badge → Pill

| v4 React prop     | v6 React prop | Notes                         |
| ----------------- | ------------- | ----------------------------- |
| Component renamed | `IressPill`   | `IressBadge` → `IressPill`    |
| `mode`            | `status`      | Prop renamed                  |
| `pill`            | removed       | v6 Pill is always pill-shaped |
| slot `host`       | removed       | Use composition instead       |

### SkipLink

| v4 React prop | v6 React prop  | Notes                                               |
| ------------- | -------------- | --------------------------------------------------- |
| `targetId`    | `href`         | Now takes full href with `#` (e.g., `href="#main"`) |
| `text`        | `children`     | v4 uses prop → v6 uses children                     |
| `customRoute` | `element` prop | Use `element` to customize rendered element         |

### Expander

| v4 React prop    | v6 React prop    | Notes                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `open`           | `open`           | Unchanged                                             |
| `mode`           | `mode`           | v4: `section`, `heading`, `link` → v6: `section` only |
| `mode="heading"` | `mode="section"` | Value renamed                                         |
| slot `activator` | `activator` prop | v4 uses slot → v6 uses prop                           |
| `onChange`       | `onChange`       | Unchanged                                             |

### Tabs (TabContainer → TabSet)

| v4 React prop     | v6 React prop | Notes                                     |
| ----------------- | ------------- | ----------------------------------------- |
| Component renamed | `IressTabSet` | `IressTabContainer` → `IressTabSet`       |
| `onChange`        | `onChange`    | Unchanged                                 |
| `IressTabButton`  | `IressTab`    | Component renamed                         |
| `IressTabPanel`   | removed       | Content now passed as `IressTab` children |

## Key Architecture Changes (v4 React → v6 React)

### Package Changes

| v4 Package                    | v6 Package                                 | Notes                   |
| ----------------------------- | ------------------------------------------ | ----------------------- |
| `@iress/components-react`     | `@iress-oss/ids-components`                | Main component package  |
| `@iress/ids-react-test-utils` | `@testing-library/react`                   | Use standard RTL        |
| `@iress/components` (CSS)     | `@iress-oss/ids-components/dist/style.css` | CSS import path changed |
| `@iress/ids-themes`           | `@iress-oss/ids-tokens`                    | Design tokens package   |

### Slot → Prop Migration

v4 used `slot` attributes on children to position content inside components. This is a legacy v4 pattern that is **no longer supported** — v6 uses React props directly (`prepend`, `append`, `footer`, `icon`, `activator`, etc.).

> **⚠️ Do not copy `slot` attributes from existing code.** If you see `slot="..."` in a codebase, it is legacy v4 code that needs to be migrated. AI agents frequently propagate this pattern by matching existing code — always use the prop-based API instead.

> **⚠️ `IressShadow` does NOT mean the app uses Web Components.** AI agents commonly see `IressShadow` (which uses Shadow DOM for CSS isolation) and incorrectly conclude the application uses custom elements with `slot` attributes. This is wrong — `IressShadow` wraps an entire React app in a single shadow root on a `<div>` element for style encapsulation. All components inside `IressShadow` are standard React components. IDS has not offered Web Components since v4.

```tsx
// ❌ v4: Using slot attributes (no longer supported)
<IressButton>
  <IressIcon slot="prepend" name="search" />
  Search
</IressButton>

// ✅ v6: Using props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>
```

```tsx
// ❌ v4: Modal footer slot (no longer supported)
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ v6: Modal footer prop
<IressModal
  show={show}
  footer={<IressButton>Close</IressButton>}
>
  Content
</IressModal>
```

### Event Callback Changes

v4 React wrappers mapped Stencil custom events to React callback props. Most remain the same in v6, but some have changed:

| v4 Callback     | v6 Callback     | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `onClick`       | `onClick`       | Unchanged                        |
| `onChange`      | `onChange`      | Unchanged (signature may differ) |
| `onBlur`        | `onBlur`        | Unchanged                        |
| `onFocus`       | `onFocus`       | Unchanged                        |
| `onEntered`     | `onEntered`     | Unchanged                        |
| `onExited`      | `onExited`      | Unchanged                        |
| `onActivated`   | `onActivated`   | Unchanged                        |
| `onDeactivated` | `onDeactivated` | Unchanged                        |
| `onClear`       | `onClear`       | Unchanged                        |

### Test Utility Migration

v4 provided `@iress/ids-react-test-utils` with `idsFireEvent` for testing custom events. v6 uses standard React Testing Library.

```tsx
// ❌ v4: Using idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });
idsFireEvent.entered(modal);
idsFireEvent.blur(field, { target: { value: 'test' } });

// ✅ v6: Using standard RTL
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

await userEvent.type(input, 'test');
fireEvent.transitionEnd(modal); // or wait for onEntered callback
await userEvent.tab(); // for blur
```

### Helper Function Migration

v4 provided helper functions in `@iress/components-react`. These are no longer needed in v6.

| v4 Helper                   | v6 Replacement                               |
| --------------------------- | -------------------------------------------- |
| `mapCheckboxGroupOptions()` | Use `<IressCheckbox>` children directly      |
| `mapRadioGroupOptions()`    | Use `<IressRadio>` children directly         |
| `mapSelectOptions()`        | Use `options` prop on `IressSelect`          |
| `mapTabs()`                 | Use `<IressTab>` children directly           |
| `mapMenuItems()`            | Use `<IressMenuItem>` children directly      |
| `showModal(id)`             | Use `show` prop or `useModal` hook           |
| `showSlideout(id)`          | Use `show` prop or `useSlideout` hook        |
| `rowData(arr, ref)`         | Pass `rowData` prop directly to `IressTable` |
| IDS v5 only   | v5→v6 guide                          | Low–Medium                        | v5-to-v6-migration.md |

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
| `readOnly`      | `readOnly`          | Now accepts `boolean \| 'locked'`. Use `'locked'` when the field is read-only due to permissions |
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
| —       | `variant` | New: set to `'locked'` for disabled-like styling when the value is read-only due to permissions      |
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
| OUI + IDS v4  | Both OUI→v6 and v4→v6 guides         | High (form architecture change)   | prop-renames.md             |

# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

## OUI → IDS v6 Prop Changes

| OUI Component | OUI prop             | IDS v6 prop          | Notes                                                 |
| ------------- | -------------------- | -------------------- | ----------------------------------------------------- |
| `Alert`       | `context`            | `status`             | Values: `danger`, `info`, `success`, `warning`        |
| `Alert`       | `contextLabel`       | removed              | v6 auto-generates; remove this prop                   |
| `Alert`       | `closeLabel`         | `closeLabel`         | Unchanged                                             |
| `Alert`       | `onHide`             | `onClose`            | Callback for dismissing                               |
| `Button`      | `label`              | `children`           | `<Button label="X">` → `<IressButton>X</IressButton>` |
| `Button`      | `mode`               | `mode`               | Unchanged; values slightly different                  |
| `Button`      | `labelHidden`        | `icon` prop          | Use `icon` prop for icon-only buttons                 |
| `Button`      | `iconName`           | `icon`               | Use Material Symbol name                              |
| `Button`      | `showLoading`        | `loading`            | —                                                     |
| `Modal`       | `onHide`             | `onShowChange`       | `(show: boolean) => void`                             |
| `Modal`       | `show`               | `show`               | Unchanged                                             |
| `Modal`       | `size`               | `size`               | Values: `sm`, `md`, `lg` (OUI had `xs`, `xl` too)     |
| `Modal`       | `fixedFooter`        | `fixedFooter`        | Unchanged                                             |
| `Slideout`    | `show`               | `show`               | Unchanged                                             |
| `Slideout`    | `position`           | `position`           | Unchanged                                             |
| `Slideout`    | `size`               | `size`               | Values: `sm`, `md` (OUI had `lg`, `dynamic` too)      |
| `Fieldset`    | `legend`             | `label`              | On `IressFieldGroup`                                  |
| `Fieldset`    | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `RadioGroup`  | `legend`             | removed              | Use `IressFormField` `label` prop instead             |
| `RadioGroup`  | `legendHidden`       | removed              | Use `IressFormField` `hiddenLabel` prop               |
| `RadioGroup`  | `options`            | `children`           | Use `<IressRadio>` children instead of options array  |
| `RadioGroup`  | `checked`            | `value`              | —                                                     |
| `RadioGroup`  | `readOnly`           | `readOnly`           | Now accepts `boolean \| 'locked'`                     |
| `Toggle`      | `legend`             | `children`           | —                                                     |
| `Toggle`      | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `Toggle`      | `toggled`            | `checked`            | —                                                     |
| `Toggle`      | `labelTrue`          | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Toggle`      | `labelFalse`         | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Label`       | `label`              | `children`           | `<Label label="X">` → `<IressLabel>X</IressLabel>`    |
| `Label`       | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Label`       | `optional`           | `required`           | Logic inverted                                        |
| `Label`       | `required`           | `required`           | Now takes boolean, not string                         |
| `Input`       | `inputRef`           | `ref`                | Use standard React ref                                |
| `Input`       | `type`               | `type`               | Unchanged                                             |
| `Checkbox`    | `label`              | `children`           | —                                                     |
| `Checkbox`    | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Checkbox`    | `isInline`           | removed              | Use parent layout component                           |
| `Slider`      | `label`              | removed              | Use `aria-label` or wrap in `IressFormField`          |
| `Slider`      | `hideCurrentLabel`   | `hiddenValueTooltip` | —                                                     |
| `Slider`      | `hideBoundaryLabels` | `tickLabels`         | Set to `false` to hide                                |
| `Tabs`        | `activeTabIndex`     | `selected`           | Use tab `value` prop to identify tabs                 |
| `Tabs`        | `onSelect`           | `onChange`           | —                                                     |
| `Tabs`        | `lazy`               | removed              | v6 tabs are always lazy                               |
| `ProgressBar` | `now`                | `value`              | —                                                     |
| `ProgressBar` | `color`              | removed              | Use CSS custom properties for color                   |
| `ProgressBar` | `striped`            | removed              | Not available in v6                                   |
| `ProgressBar` | `animated`           | removed              | Not available in v6                                   |

## IDS v4 React → IDS v6 React Prop Changes (Verified against v4 source)

The v4 React wrappers (`@iress/components-react`) automatically convert Stencil's kebab-case props to camelCase and map custom events to React callback props (e.g., `iressModalEntered` → `onEntered`). This section documents the v4 React API compared to v6.

### Button

| v4 React prop     | v6 React prop      | Notes                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `mode`             | v4 values: `primary`, `secondary`, `tertiary`, `link`, `danger`, `positive`, `negative` → v6: `primary`, `secondary`, `tertiary`, `quaternary`, `muted` |
| `mode="link"`     | removed            | Use `mode="tertiary"` or `IressLink` component                                                                                                          |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                                                                                                                         |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                                                                                                                         |
| `mode="negative"` | removed            | Use `status="danger"` instead                                                                                                                           |
| `loading`         | `loading`          | Unchanged                                                                                                                                               |
| `loadingText`     | `loading` (string) | v6 accepts boolean or string for loading                                                                                                                |
| `fluid`           | `fluid`            | Unchanged                                                                                                                                               |
| `noWrap`          | `noWrap`           | Unchanged                                                                                                                                               |
| `href`            | `href`             | Unchanged                                                                                                                                               |
| `onClick`         | `onClick`          | Unchanged                                                                                                                                               |
| slot `icon-only`  | `icon` prop        | v6 uses `icon` prop for icon-only buttons                                                                                                               |
| slot `prepend`    | `prepend` prop     | v6 uses prop instead of slot                                                                                                                            |
| slot `append`     | `append` prop      | v6 uses prop instead of slot                                                                                                                            |

### Alert

| v4 React prop    | v6 React prop     | Notes                                                                                             |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `status`         | `status`          | v4: `error`, `warning`, `success`, `info` → v6: `danger`, `warning`, `success`, `info`, `neutral` |
| `status="error"` | `status="danger"` | Value renamed                                                                                     |
| `headingText`    | `heading`         | Prop renamed                                                                                      |
| `headingLevel`   | removed           | v6 auto-handles heading level                                                                     |
| slot `footer`    | `actions` prop    | v6 uses `actions` array for buttons                                                               |

### Modal

| v4 React prop          | v6 React prop          | Notes                                              |
| ---------------------- | ---------------------- | -------------------------------------------------- |
| `show`                 | `show`                 | Unchanged                                          |
| `size`                 | `size`                 | v4 allowed responsive array → v6 single value only |
| `closeText`            | `closeText`            | Unchanged                                          |
| `fixedFooter`          | `fixedFooter`          | Unchanged                                          |
| `disableBackdropClick` | `disableBackdropClick` | Unchanged                                          |
| `noCloseButton`        | `noCloseButton`        | Unchanged                                          |
| `padding`              | `p` (styling prop)     | Use styling prop instead                           |
| `onEntered`            | `onEntered`            | Unchanged                                          |
| `onExited`             | `onExited`             | Unchanged                                          |
| slot `footer`          | `footer` prop          | v6 uses prop instead of slot                       |

### Slideout

| v4 React prop | v6 React prop | Notes                                  |
| ------------- | ------------- | -------------------------------------- |
| `show`        | `show`        | Unchanged                              |
| `eleToPush`   | `eleToPush`   | Unchanged                              |
| `mode`        | `mode`        | Unchanged (`overlay`, `push`)          |
| `closeText`   | `closeText`   | Unchanged                              |
| `padding`     | removed       | Use `p` styling prop on content        |
| `position`    | `position`    | Unchanged                              |
| `size`        | `size`        | Unchanged                              |
| `backdrop`    | removed       | v6 always has backdrop in overlay mode |
| `onEntered`   | `onEntered`   | Unchanged                              |
| `onExited`    | `onExited`    | Unchanged                              |
| slot `footer` | `footer` prop | v6 uses prop instead of slot           |

### Panel

| v4 React prop    | v6 React prop         | Notes                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `background`     | `bg`                  | v4: `default`, `alt`, `transparent` → v6: `alt`, token values |
| `padding`        | `p` (styling prop)    | Use styling prop instead                                      |
| `textAlign`      | `textAlign`           | Unchanged                                                     |
| `stretch`        | `stretch`             | Unchanged (now styling prop)                                  |
| `noBorderRadius` | `borderRadius="none"` | Use `borderRadius` prop instead                               |

### Text

| v4 React prop | v6 React prop | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `variant`     | `textStyle`   | Prop renamed                 |
| `mode`        | `color`       | Prop renamed                 |
| `align`       | `textAlign`   | Prop renamed                 |
| `element`     | `element`     | Unchanged                    |
| `noGutter`    | removed       | Use `mb="none"` styling prop |

### Stack / Inline

| v4 React prop     | v6 React prop | Notes                                                        |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `gutter`          | `gap`         | v4: `none`, `xs`, `sm`, `md`, `lg`, `xl` → v6 spacing tokens |
| `horizontalAlign` | `justify`     | Prop renamed (Inline only)                                   |
| `verticalAlign`   | `align`       | Prop renamed (Inline only)                                   |
| `noWrap`          | `noWrap`      | Unchanged                                                    |

### Icon

| v4 React prop      | v6 React prop      | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| `name`             | `name`             | v4: FontAwesome names → v6: Material Symbols |
| `set`              | removed            | v6 uses Material Symbols only                |
| `mode`             | `color`            | Prop renamed                                 |
| `size`             | removed            | Inherits font size from parent               |
| `fixedWidth`       | removed            | Not needed with Material Symbols             |
| `spin`             | removed            | Use CSS animation instead                    |
| `rotate`           | removed            | Use CSS transform instead                    |
| `flip`             | removed            | Use CSS transform instead                    |
| `screenreaderText` | `screenreaderText` | Unchanged                                    |

### Label

| v4 React prop  | v6 React prop         | Notes                             |
| -------------- | --------------------- | --------------------------------- |
| `labelText`    | `children`            | v4 uses prop → v6 uses children   |
| `for`          | `htmlFor`             | Prop renamed                      |
| `hiddenLabel`  | `hiddenLabel`         | Unchanged                         |
| `optional`     | `required` (inverted) | Logic inverted                    |
| `optionalText` | removed               | v6 doesn't show "(optional)" text |
| `focusOn`      | removed               | Not needed in v6                  |

### Field

| v4 React prop        | v6 React prop     | Notes                                        |
| -------------------- | ----------------- | -------------------------------------------- |
| `label`              | `label`           | Unchanged                                    |
| `hiddenLabel`        | `hiddenLabel`     | Unchanged                                    |
| `hint`               | `hint`            | Unchanged                                    |
| `error`              | `errorMessages`   | Now takes array of `ValidationMessageObj`    |
| `disabledValidation` | removed           | Validation handled by `IressFormField` rules |
| `inline`             | `horizontal`      | Prop renamed                                 |
| `optionalText`       | removed           | —                                            |
| `valueMissing`       | `rules.required`  | Use `rules` prop on `IressFormField`         |
| `tooLong`            | `rules.maxLength` | Use `rules` prop on `IressFormField`         |
| `tooShort`           | `rules.minLength` | Use `rules` prop on `IressFormField`         |
| `patternMismatch`    | `rules.pattern`   | Use `rules` prop on `IressFormField`         |
| `rangeOverflow`      | `rules.max`       | Use `rules` prop on `IressFormField`         |
| `rangeUnderflow`     | `rules.min`       | Use `rules` prop on `IressFormField`         |

### Toggle

| v4 React prop | v6 React prop | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `checked`     | `checked`     | Unchanged                                |
| `label`       | `children`    | v4 uses prop → v6 uses children          |
| `hiddenLabel` | `hiddenLabel` | Unchanged                                |
| `layout`      | `layout`      | Unchanged                                |
| `onChange`    | `onChange`    | Unchanged (signature slightly different) |

### Badge → Pill

| v4 React prop     | v6 React prop | Notes                         |
| ----------------- | ------------- | ----------------------------- |
| Component renamed | `IressPill`   | `IressBadge` → `IressPill`    |
| `mode`            | `status`      | Prop renamed                  |
| `pill`            | removed       | v6 Pill is always pill-shaped |
| slot `host`       | removed       | Use composition instead       |

### SkipLink

| v4 React prop | v6 React prop  | Notes                                               |
| ------------- | -------------- | --------------------------------------------------- |
| `targetId`    | `href`         | Now takes full href with `#` (e.g., `href="#main"`) |
| `text`        | `children`     | v4 uses prop → v6 uses children                     |
| `customRoute` | `element` prop | Use `element` to customize rendered element         |

### Expander

| v4 React prop    | v6 React prop    | Notes                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `open`           | `open`           | Unchanged                                             |
| `mode`           | `mode`           | v4: `section`, `heading`, `link` → v6: `section` only |
| `mode="heading"` | `mode="section"` | Value renamed                                         |
| slot `activator` | `activator` prop | v4 uses slot → v6 uses prop                           |
| `onChange`       | `onChange`       | Unchanged                                             |

### Tabs (TabContainer → TabSet)

| v4 React prop     | v6 React prop | Notes                                     |
| ----------------- | ------------- | ----------------------------------------- |
| Component renamed | `IressTabSet` | `IressTabContainer` → `IressTabSet`       |
| `onChange`        | `onChange`    | Unchanged                                 |
| `IressTabButton`  | `IressTab`    | Component renamed                         |
| `IressTabPanel`   | removed       | Content now passed as `IressTab` children |

## Key Architecture Changes (v4 React → v6 React)

### Package Changes

| v4 Package                    | v6 Package                                 | Notes                   |
| ----------------------------- | ------------------------------------------ | ----------------------- |
| `@iress/components-react`     | `@iress-oss/ids-components`                | Main component package  |
| `@iress/ids-react-test-utils` | `@testing-library/react`                   | Use standard RTL        |
| `@iress/components` (CSS)     | `@iress-oss/ids-components/dist/style.css` | CSS import path changed |
| `@iress/ids-themes`           | `@iress-oss/ids-tokens`                    | Design tokens package   |

### Slot → Prop Migration

v4 used `slot` attributes on children to position content inside components. This is a legacy v4 pattern that is **no longer supported** — v6 uses React props directly (`prepend`, `append`, `footer`, `icon`, `activator`, etc.).

> **⚠️ Do not copy `slot` attributes from existing code.** If you see `slot="..."` in a codebase, it is legacy v4 code that needs to be migrated. AI agents frequently propagate this pattern by matching existing code — always use the prop-based API instead.

> **⚠️ `IressShadow` does NOT mean the app uses Web Components.** AI agents commonly see `IressShadow` (which uses Shadow DOM for CSS isolation) and incorrectly conclude the application uses custom elements with `slot` attributes. This is wrong — `IressShadow` wraps an entire React app in a single shadow root on a `<div>` element for style encapsulation. All components inside `IressShadow` are standard React components. IDS has not offered Web Components since v4.

```tsx
// ❌ v4: Using slot attributes (no longer supported)
<IressButton>
  <IressIcon slot="prepend" name="search" />
  Search
</IressButton>

// ✅ v6: Using props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>
```

```tsx
// ❌ v4: Modal footer slot (no longer supported)
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ v6: Modal footer prop
<IressModal
  show={show}
  footer={<IressButton>Close</IressButton>}
>
  Content
</IressModal>
```

### Event Callback Changes

v4 React wrappers mapped Stencil custom events to React callback props. Most remain the same in v6, but some have changed:

| v4 Callback     | v6 Callback     | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `onClick`       | `onClick`       | Unchanged                        |
| `onChange`      | `onChange`      | Unchanged (signature may differ) |
| `onBlur`        | `onBlur`        | Unchanged                        |
| `onFocus`       | `onFocus`       | Unchanged                        |
| `onEntered`     | `onEntered`     | Unchanged                        |
| `onExited`      | `onExited`      | Unchanged                        |
| `onActivated`   | `onActivated`   | Unchanged                        |
| `onDeactivated` | `onDeactivated` | Unchanged                        |
| `onClear`       | `onClear`       | Unchanged                        |

### Test Utility Migration

v4 provided `@iress/ids-react-test-utils` with `idsFireEvent` for testing custom events. v6 uses standard React Testing Library.

```tsx
// ❌ v4: Using idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });
idsFireEvent.entered(modal);
idsFireEvent.blur(field, { target: { value: 'test' } });

// ✅ v6: Using standard RTL
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

await userEvent.type(input, 'test');
fireEvent.transitionEnd(modal); // or wait for onEntered callback
await userEvent.tab(); // for blur
```

### Helper Function Migration

v4 provided helper functions in `@iress/components-react`. These are no longer needed in v6.

| v4 Helper                   | v6 Replacement                               |
| --------------------------- | -------------------------------------------- |
| `mapCheckboxGroupOptions()` | Use `<IressCheckbox>` children directly      |
| `mapRadioGroupOptions()`    | Use `<IressRadio>` children directly         |
| `mapSelectOptions()`        | Use `options` prop on `IressSelect`          |
| `mapTabs()`                 | Use `<IressTab>` children directly           |
| `mapMenuItems()`            | Use `<IressMenuItem>` children directly      |
| `showModal(id)`             | Use `show` prop or `useModal` hook           |
| `showSlideout(id)`          | Use `show` prop or `useSlideout` hook        |
| `rowData(arr, ref)`         | Pass `rowData` prop directly to `IressTable` |
| OUI + IDS v5  | OUI→v6 guide + v5→v6 for IDS changes | High (form architecture change)   | v5-to-v6-migration.md |

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
| `readOnly`      | `readOnly`          | Now accepts `boolean \| 'locked'`. Use `'locked'` when the field is read-only due to permissions |
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
| —       | `variant` | New: set to `'locked'` for disabled-like styling when the value is read-only due to permissions      |
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

Full interactive guides with diff viewers are available in Storybook:

- [v4→v5 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-v4-to-v5--docs)
- [v5→v6 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-v5-to-v6--docs)
- [OUI→v6 guide](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/resources-migration-guides-from-oui-to-v6--docs)

---

## Pre-Migration Assessment

Before starting migration, run these scripts (or perform checks manually):

1. **Identify current version**: `scripts/detect-version.sh` — detects IDS/OUI version and recommends migration path
2. **Audit component usage**: `scripts/audit-components.sh` — generates component usage report
3. **Check for deprecated props**: `scripts/find-deprecated-props.sh` — finds props that will break
4. **Check form architecture**: `scripts/find-formik.sh` — identifies Formik forms needing migration
5. **Check test patterns**: `scripts/find-test-utils.sh` — finds old test utilities
6. **Review custom CSS**: Search for `.oui-`, `.ids-`, or `iress-` class selectors that may break
7. **Setup VRT (recommended)**: `scripts/setup-playwright-vrt.sh` — generates Playwright visual regression tests
8. **Capture baseline screenshots**: Run VRT suite before migration to capture current state
9. **Create migration branch**: Ensure you can rollback if needed

---

## Quick Reference: Package Changes

### Import path

```ts
// ❌ Old (IDS v4)
import { IressButton } from '@iress/components-react';

// ❌ Old (OUI)
import { Button, Input } from '@iress/oui';

// ✅ IDS v6
import { IressButton, IressInput } from '@iress-oss/ids-components';
```

```bash
npm install @iress-oss/ids-components
npm install @iress-oss/ids-tokens  # if using tokens directly
```

### CSS entry point

```ts
// ✅ Required in your app entry point
import '@iress-oss/ids-components/dist/style.css';
```

### Token package

```ts
// ✅ Required for design tokens
import '@iress-oss/ids-tokens/build/css-vars.css';
import { cssVars } from '@iress-oss/ids-tokens';
```

---

## Key Migration Areas

### v5 → v6 Migration

For migrations specifically from IDS v5 to v6, see references/v5-to-v6-migration.md for:

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
| `readOnly`      | `readOnly`          | Now accepts `boolean \| 'locked'`. Use `'locked'` when the field is read-only due to permissions |
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
| —       | `variant` | New: set to `'locked'` for disabled-like styling when the value is read-only due to permissions      |
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

- Package and CSS import changes
- Component renames (`IressBadge` → `IressPill`, `IressFilter` → `IressDropdownMenu`, etc.)
- Prop changes by component (Button, Alert, Toggle, Field, Modal, Select)
- Icon migration (FontAwesome → Material Symbols)
- Form migration patterns

### Component renames

Components that changed names between versions (IDS and OUI → v6), plus removed and new components. See references/component-renames.md for the full map.

# Component Rename Map

Components that changed names between versions. All other IDS components keep the same name (with the `Iress` prefix in v6).

## IDS v4/v5 → v6 Renames

| Old name          | New name (v6)       | Notes                                                                                   |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------- |
| `IressBadge`      | `IressPill`         | Renamed in v6                                                                           |
| `IressFilter`     | `IressDropdownMenu` | Renamed to pattern component                                                            |
| `IressRichSelect` | `IressSelect`       | Renamed; old `IressSelect` replaced by `native` prop                                    |
| `IressField`      | `IressFormField`    | New form-integrated wrapper; `IressField` still exists as a standalone layout component |

## OUI → v6 Renames

| OUI Component    | v6 Component                                         | Notes                                                 |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `Badge`          | `IressPill`                                          | —                                                     |
| `Button`         | `IressButton`                                        | OUI uses `label` prop → v6 uses `children`            |
| `Modal`          | `IressModal`                                         | `onHide` → `onShowChange`; `show` prop unchanged      |
| `Alert`          | `IressAlert`                                         | `context` → `status`; `contextLabel` removed          |
| `DropdownButton` | `IressDropdownMenu` / `IressSelect` / `IressPopover` | Depends on use case                                   |
| `ProgressBar`    | `IressProgress`                                      | Props mostly unchanged                                |
| `Scrollable`     | `scrollable` styling prop                            | Available on any component                            |
| `Input`          | `IressInput`                                         | Can be standalone or wrapped in `IressFormField`      |
| `TextArea`       | `IressInput` with `rows` prop                        | Use `rows={4}` for textarea behavior                  |
| `Label`          | `IressLabel` or `IressFormField` `label` prop        | OUI uses `label` prop → v6 uses `children`            |
| `FormGroup`      | `IressField` or `IressFormField`                     | Built into Field components                           |
| `Fieldset`       | `IressFieldGroup`                                    | `legend` → `label`                                    |
| `RadioGroup`     | `IressRadioGroup`                                    | `legend` removed; use `IressFormField` for label      |
| `Checkbox`       | `IressCheckbox`                                      | Can be standalone or wrapped in `IressFormField`      |
| `CheckboxGroup`  | `IressCheckboxGroup`                                 | —                                                     |
| `Slideout`       | `IressSlideout`                                      | `show` prop unchanged                                 |
| `Toggle`         | `IressToggle`                                        | `legend` → `children`; `toggled` → `checked`          |
| `Tabs`           | `IressTabSet`                                        | `activeTabIndex` → `selected`/`defaultSelected`       |
| `Tab`            | `IressTab`                                           | —                                                     |
| `Slider`         | `IressSlider`                                        | `label` removed; use `aria-label` or `IressFormField` |
| `Tooltip`        | `IressTooltip`                                       | —                                                     |
| `Popover`        | `IressPopover`                                       | —                                                     |
| `Card`           | `IressCard`                                          | —                                                     |
| `Table`          | `IressTable`                                         | —                                                     |
| `Link`           | `IressLink`                                          | —                                                     |
| `Nav`            | Removed                                              | Build custom navigation with IDS components           |
| `NavBar`         | Removed                                              | Build custom navigation with IDS components           |
| `NavItem`        | Removed                                              | Use `IressSideNav` or custom implementation           |
| `SingleSelect`   | `IressSelect`                                        | —                                                     |
| `AutoComplete`   | `IressAutocomplete`                                  | —                                                     |
| `DatePicker`     | `IressInput` with `type="date"`                      | Native browser date picker                            |
| `TimePicker`     | `IressInput` with `type="time"`                      | Native browser time picker                            |

## Removed Components

| Component                | Replacement                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `IressNavbar`            | Removed — build with IDS components per-application                                              |
| `IressToast` (direct)    | Use `IressToasterProvider` + `useToaster`                                                        |
| `IressToaster` (direct)  | Use `IressToasterProvider` + `useToaster`                                                        |
| `IressSelectOption`      | Use `options` prop on `IressSelect`                                                              |
| `IressHide` (deprecated) | Use `srOnly`, `hideFrom`, or `hideBelow` styling props (component still exported but deprecated) |
| OUI `Nav`                | Build custom with `IressSideNav` or IDS primitives                                               |
| OUI `NavBar`             | Build custom with IDS primitives                                                                 |
| OUI `NavItem`            | Use `IressSideNav` items or custom implementation                                                |
| OUI `NavDropdown`        | Use `IressDropdownMenu` or `IressPopover`                                                        |
| OUI `DatePicker`         | `IressInput` with `type="date"`                                                                  |
| OUI `TimePicker`         | `IressInput` with `type="time"`                                                                  |
| OUI `TreeView`           | Not available in v6                                                                              |
| OUI `Onboarding`         | Not available in v6                                                                              |
| OUI `Process`            | Not available in v6                                                                              |

## New Components in v6

| Component                    | Purpose                                                                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `IressBreadcrumbs`           | Navigation hierarchy breadcrumbs                                                                                                                |
| `IressContextualMenu`        | Context / "more actions" menu                                                                                                                   |
| `IressDropdownMenu`          | Filter/navigation dropdown (replaces `IressFilter`)                                                                                             |
| `IressLink`                  | Anchor links in text paragraphs                                                                                                                 |
| `IressPill`                  | Status indicators, counters (replaces `IressBadge`)                                                                                             |
| `IressTag`                   | Interactive tags                                                                                                                                |
| `IressImage`                 | Responsive images                                                                                                                               |
| `IressMenuGroup`             | Menu item grouping                                                                                                                              |
| `IressShadow`                | CSS isolation wrapper for micro-frontends (creates shadow root on a `<div>` — NOT a custom element; all children are standard React components) |
| `IressSideNav`               | Side navigation (combines `rail` + `side` menu variants)                                                                                        |
| `IressButtonCard`            | Card rendered as a button                                                                                                                       |
| `IressLinkCard`              | Card rendered as a link                                                                                                                         |
| `IressFormValidationSummary` | Form validation summary alert                                                                                                                   |
| `IressReadonly`              | Read-only display of form values (supports `actions` prop for inline action buttons)                                                            |
| `IressSpinner`               | Loading spinner                                                                                                                                 |

Key renames: `IressBadge` → `IressPill`, `IressRichSelect` → `IressSelect`, `IressField` → `IressFormField`, `IressFilter` → `IressDropdownMenu`.

### Prop renames (CRITICAL — verified against source code)

Using old prop names will silently fail. See references/prop-renames.md for the complete table.

# Prop Rename Cheat Sheet

## CRITICAL — verified against source code

These prop names have been verified against the actual IDS v6 source. Using the old prop names will silently fail.

## OUI → IDS v6 Prop Changes

| OUI Component | OUI prop             | IDS v6 prop          | Notes                                                 |
| ------------- | -------------------- | -------------------- | ----------------------------------------------------- |
| `Alert`       | `context`            | `status`             | Values: `danger`, `info`, `success`, `warning`        |
| `Alert`       | `contextLabel`       | removed              | v6 auto-generates; remove this prop                   |
| `Alert`       | `closeLabel`         | `closeLabel`         | Unchanged                                             |
| `Alert`       | `onHide`             | `onClose`            | Callback for dismissing                               |
| `Button`      | `label`              | `children`           | `<Button label="X">` → `<IressButton>X</IressButton>` |
| `Button`      | `mode`               | `mode`               | Unchanged; values slightly different                  |
| `Button`      | `labelHidden`        | `icon` prop          | Use `icon` prop for icon-only buttons                 |
| `Button`      | `iconName`           | `icon`               | Use Material Symbol name                              |
| `Button`      | `showLoading`        | `loading`            | —                                                     |
| `Modal`       | `onHide`             | `onShowChange`       | `(show: boolean) => void`                             |
| `Modal`       | `show`               | `show`               | Unchanged                                             |
| `Modal`       | `size`               | `size`               | Values: `sm`, `md`, `lg` (OUI had `xs`, `xl` too)     |
| `Modal`       | `fixedFooter`        | `fixedFooter`        | Unchanged                                             |
| `Slideout`    | `show`               | `show`               | Unchanged                                             |
| `Slideout`    | `position`           | `position`           | Unchanged                                             |
| `Slideout`    | `size`               | `size`               | Values: `sm`, `md` (OUI had `lg`, `dynamic` too)      |
| `Fieldset`    | `legend`             | `label`              | On `IressFieldGroup`                                  |
| `Fieldset`    | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `RadioGroup`  | `legend`             | removed              | Use `IressFormField` `label` prop instead             |
| `RadioGroup`  | `legendHidden`       | removed              | Use `IressFormField` `hiddenLabel` prop               |
| `RadioGroup`  | `options`            | `children`           | Use `<IressRadio>` children instead of options array  |
| `RadioGroup`  | `checked`            | `value`              | —                                                     |
| `RadioGroup`  | `readOnly`           | `readOnly`           | Now accepts `boolean \| 'locked'`                     |
| `Toggle`      | `legend`             | `children`           | —                                                     |
| `Toggle`      | `legendHidden`       | `hiddenLabel`        | —                                                     |
| `Toggle`      | `toggled`            | `checked`            | —                                                     |
| `Toggle`      | `labelTrue`          | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Toggle`      | `labelFalse`         | removed              | v6 Toggle is binary switch, no true/false labels      |
| `Label`       | `label`              | `children`           | `<Label label="X">` → `<IressLabel>X</IressLabel>`    |
| `Label`       | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Label`       | `optional`           | `required`           | Logic inverted                                        |
| `Label`       | `required`           | `required`           | Now takes boolean, not string                         |
| `Input`       | `inputRef`           | `ref`                | Use standard React ref                                |
| `Input`       | `type`               | `type`               | Unchanged                                             |
| `Checkbox`    | `label`              | `children`           | —                                                     |
| `Checkbox`    | `labelHidden`        | `hiddenLabel`        | —                                                     |
| `Checkbox`    | `isInline`           | removed              | Use parent layout component                           |
| `Slider`      | `label`              | removed              | Use `aria-label` or wrap in `IressFormField`          |
| `Slider`      | `hideCurrentLabel`   | `hiddenValueTooltip` | —                                                     |
| `Slider`      | `hideBoundaryLabels` | `tickLabels`         | Set to `false` to hide                                |
| `Tabs`        | `activeTabIndex`     | `selected`           | Use tab `value` prop to identify tabs                 |
| `Tabs`        | `onSelect`           | `onChange`           | —                                                     |
| `Tabs`        | `lazy`               | removed              | v6 tabs are always lazy                               |
| `ProgressBar` | `now`                | `value`              | —                                                     |
| `ProgressBar` | `color`              | removed              | Use CSS custom properties for color                   |
| `ProgressBar` | `striped`            | removed              | Not available in v6                                   |
| `ProgressBar` | `animated`           | removed              | Not available in v6                                   |

## IDS v4 React → IDS v6 React Prop Changes (Verified against v4 source)

The v4 React wrappers (`@iress/components-react`) automatically convert Stencil's kebab-case props to camelCase and map custom events to React callback props (e.g., `iressModalEntered` → `onEntered`). This section documents the v4 React API compared to v6.

### Button

| v4 React prop     | v6 React prop      | Notes                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | `mode`             | v4 values: `primary`, `secondary`, `tertiary`, `link`, `danger`, `positive`, `negative` → v6: `primary`, `secondary`, `tertiary`, `quaternary`, `muted` |
| `mode="link"`     | removed            | Use `mode="tertiary"` or `IressLink` component                                                                                                          |
| `mode="danger"`   | `status="danger"`  | Use `status` prop with any mode                                                                                                                         |
| `mode="positive"` | `status="success"` | Use `status` prop with any mode                                                                                                                         |
| `mode="negative"` | removed            | Use `status="danger"` instead                                                                                                                           |
| `loading`         | `loading`          | Unchanged                                                                                                                                               |
| `loadingText`     | `loading` (string) | v6 accepts boolean or string for loading                                                                                                                |
| `fluid`           | `fluid`            | Unchanged                                                                                                                                               |
| `noWrap`          | `noWrap`           | Unchanged                                                                                                                                               |
| `href`            | `href`             | Unchanged                                                                                                                                               |
| `onClick`         | `onClick`          | Unchanged                                                                                                                                               |
| slot `icon-only`  | `icon` prop        | v6 uses `icon` prop for icon-only buttons                                                                                                               |
| slot `prepend`    | `prepend` prop     | v6 uses prop instead of slot                                                                                                                            |
| slot `append`     | `append` prop      | v6 uses prop instead of slot                                                                                                                            |

### Alert

| v4 React prop    | v6 React prop     | Notes                                                                                             |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `status`         | `status`          | v4: `error`, `warning`, `success`, `info` → v6: `danger`, `warning`, `success`, `info`, `neutral` |
| `status="error"` | `status="danger"` | Value renamed                                                                                     |
| `headingText`    | `heading`         | Prop renamed                                                                                      |
| `headingLevel`   | removed           | v6 auto-handles heading level                                                                     |
| slot `footer`    | `actions` prop    | v6 uses `actions` array for buttons                                                               |

### Modal

| v4 React prop          | v6 React prop          | Notes                                              |
| ---------------------- | ---------------------- | -------------------------------------------------- |
| `show`                 | `show`                 | Unchanged                                          |
| `size`                 | `size`                 | v4 allowed responsive array → v6 single value only |
| `closeText`            | `closeText`            | Unchanged                                          |
| `fixedFooter`          | `fixedFooter`          | Unchanged                                          |
| `disableBackdropClick` | `disableBackdropClick` | Unchanged                                          |
| `noCloseButton`        | `noCloseButton`        | Unchanged                                          |
| `padding`              | `p` (styling prop)     | Use styling prop instead                           |
| `onEntered`            | `onEntered`            | Unchanged                                          |
| `onExited`             | `onExited`             | Unchanged                                          |
| slot `footer`          | `footer` prop          | v6 uses prop instead of slot                       |

### Slideout

| v4 React prop | v6 React prop | Notes                                  |
| ------------- | ------------- | -------------------------------------- |
| `show`        | `show`        | Unchanged                              |
| `eleToPush`   | `eleToPush`   | Unchanged                              |
| `mode`        | `mode`        | Unchanged (`overlay`, `push`)          |
| `closeText`   | `closeText`   | Unchanged                              |
| `padding`     | removed       | Use `p` styling prop on content        |
| `position`    | `position`    | Unchanged                              |
| `size`        | `size`        | Unchanged                              |
| `backdrop`    | removed       | v6 always has backdrop in overlay mode |
| `onEntered`   | `onEntered`   | Unchanged                              |
| `onExited`    | `onExited`    | Unchanged                              |
| slot `footer` | `footer` prop | v6 uses prop instead of slot           |

### Panel

| v4 React prop    | v6 React prop         | Notes                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `background`     | `bg`                  | v4: `default`, `alt`, `transparent` → v6: `alt`, token values |
| `padding`        | `p` (styling prop)    | Use styling prop instead                                      |
| `textAlign`      | `textAlign`           | Unchanged                                                     |
| `stretch`        | `stretch`             | Unchanged (now styling prop)                                  |
| `noBorderRadius` | `borderRadius="none"` | Use `borderRadius` prop instead                               |

### Text

| v4 React prop | v6 React prop | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `variant`     | `textStyle`   | Prop renamed                 |
| `mode`        | `color`       | Prop renamed                 |
| `align`       | `textAlign`   | Prop renamed                 |
| `element`     | `element`     | Unchanged                    |
| `noGutter`    | removed       | Use `mb="none"` styling prop |

### Stack / Inline

| v4 React prop     | v6 React prop | Notes                                                        |
| ----------------- | ------------- | ------------------------------------------------------------ |
| `gutter`          | `gap`         | v4: `none`, `xs`, `sm`, `md`, `lg`, `xl` → v6 spacing tokens |
| `horizontalAlign` | `justify`     | Prop renamed (Inline only)                                   |
| `verticalAlign`   | `align`       | Prop renamed (Inline only)                                   |
| `noWrap`          | `noWrap`      | Unchanged                                                    |

### Icon

| v4 React prop      | v6 React prop      | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| `name`             | `name`             | v4: FontAwesome names → v6: Material Symbols |
| `set`              | removed            | v6 uses Material Symbols only                |
| `mode`             | `color`            | Prop renamed                                 |
| `size`             | removed            | Inherits font size from parent               |
| `fixedWidth`       | removed            | Not needed with Material Symbols             |
| `spin`             | removed            | Use CSS animation instead                    |
| `rotate`           | removed            | Use CSS transform instead                    |
| `flip`             | removed            | Use CSS transform instead                    |
| `screenreaderText` | `screenreaderText` | Unchanged                                    |

### Label

| v4 React prop  | v6 React prop         | Notes                             |
| -------------- | --------------------- | --------------------------------- |
| `labelText`    | `children`            | v4 uses prop → v6 uses children   |
| `for`          | `htmlFor`             | Prop renamed                      |
| `hiddenLabel`  | `hiddenLabel`         | Unchanged                         |
| `optional`     | `required` (inverted) | Logic inverted                    |
| `optionalText` | removed               | v6 doesn't show "(optional)" text |
| `focusOn`      | removed               | Not needed in v6                  |

### Field

| v4 React prop        | v6 React prop     | Notes                                        |
| -------------------- | ----------------- | -------------------------------------------- |
| `label`              | `label`           | Unchanged                                    |
| `hiddenLabel`        | `hiddenLabel`     | Unchanged                                    |
| `hint`               | `hint`            | Unchanged                                    |
| `error`              | `errorMessages`   | Now takes array of `ValidationMessageObj`    |
| `disabledValidation` | removed           | Validation handled by `IressFormField` rules |
| `inline`             | `horizontal`      | Prop renamed                                 |
| `optionalText`       | removed           | —                                            |
| `valueMissing`       | `rules.required`  | Use `rules` prop on `IressFormField`         |
| `tooLong`            | `rules.maxLength` | Use `rules` prop on `IressFormField`         |
| `tooShort`           | `rules.minLength` | Use `rules` prop on `IressFormField`         |
| `patternMismatch`    | `rules.pattern`   | Use `rules` prop on `IressFormField`         |
| `rangeOverflow`      | `rules.max`       | Use `rules` prop on `IressFormField`         |
| `rangeUnderflow`     | `rules.min`       | Use `rules` prop on `IressFormField`         |

### Toggle

| v4 React prop | v6 React prop | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `checked`     | `checked`     | Unchanged                                |
| `label`       | `children`    | v4 uses prop → v6 uses children          |
| `hiddenLabel` | `hiddenLabel` | Unchanged                                |
| `layout`      | `layout`      | Unchanged                                |
| `onChange`    | `onChange`    | Unchanged (signature slightly different) |

### Badge → Pill

| v4 React prop     | v6 React prop | Notes                         |
| ----------------- | ------------- | ----------------------------- |
| Component renamed | `IressPill`   | `IressBadge` → `IressPill`    |
| `mode`            | `status`      | Prop renamed                  |
| `pill`            | removed       | v6 Pill is always pill-shaped |
| slot `host`       | removed       | Use composition instead       |

### SkipLink

| v4 React prop | v6 React prop  | Notes                                               |
| ------------- | -------------- | --------------------------------------------------- |
| `targetId`    | `href`         | Now takes full href with `#` (e.g., `href="#main"`) |
| `text`        | `children`     | v4 uses prop → v6 uses children                     |
| `customRoute` | `element` prop | Use `element` to customize rendered element         |

### Expander

| v4 React prop    | v6 React prop    | Notes                                                 |
| ---------------- | ---------------- | ----------------------------------------------------- |
| `open`           | `open`           | Unchanged                                             |
| `mode`           | `mode`           | v4: `section`, `heading`, `link` → v6: `section` only |
| `mode="heading"` | `mode="section"` | Value renamed                                         |
| slot `activator` | `activator` prop | v4 uses slot → v6 uses prop                           |
| `onChange`       | `onChange`       | Unchanged                                             |

### Tabs (TabContainer → TabSet)

| v4 React prop     | v6 React prop | Notes                                     |
| ----------------- | ------------- | ----------------------------------------- |
| Component renamed | `IressTabSet` | `IressTabContainer` → `IressTabSet`       |
| `onChange`        | `onChange`    | Unchanged                                 |
| `IressTabButton`  | `IressTab`    | Component renamed                         |
| `IressTabPanel`   | removed       | Content now passed as `IressTab` children |

## Key Architecture Changes (v4 React → v6 React)

### Package Changes

| v4 Package                    | v6 Package                                 | Notes                   |
| ----------------------------- | ------------------------------------------ | ----------------------- |
| `@iress/components-react`     | `@iress-oss/ids-components`                | Main component package  |
| `@iress/ids-react-test-utils` | `@testing-library/react`                   | Use standard RTL        |
| `@iress/components` (CSS)     | `@iress-oss/ids-components/dist/style.css` | CSS import path changed |
| `@iress/ids-themes`           | `@iress-oss/ids-tokens`                    | Design tokens package   |

### Slot → Prop Migration

v4 used `slot` attributes on children to position content inside components. This is a legacy v4 pattern that is **no longer supported** — v6 uses React props directly (`prepend`, `append`, `footer`, `icon`, `activator`, etc.).

> **⚠️ Do not copy `slot` attributes from existing code.** If you see `slot="..."` in a codebase, it is legacy v4 code that needs to be migrated. AI agents frequently propagate this pattern by matching existing code — always use the prop-based API instead.

> **⚠️ `IressShadow` does NOT mean the app uses Web Components.** AI agents commonly see `IressShadow` (which uses Shadow DOM for CSS isolation) and incorrectly conclude the application uses custom elements with `slot` attributes. This is wrong — `IressShadow` wraps an entire React app in a single shadow root on a `<div>` element for style encapsulation. All components inside `IressShadow` are standard React components. IDS has not offered Web Components since v4.

```tsx
// ❌ v4: Using slot attributes (no longer supported)
<IressButton>
  <IressIcon slot="prepend" name="search" />
  Search
</IressButton>

// ✅ v6: Using props
<IressButton prepend={<IressIcon name="search" />}>
  Search
</IressButton>
```

```tsx
// ❌ v4: Modal footer slot (no longer supported)
<IressModal show={show}>
  Content
  <div slot="footer">
    <IressButton>Close</IressButton>
  </div>
</IressModal>

// ✅ v6: Modal footer prop
<IressModal
  show={show}
  footer={<IressButton>Close</IressButton>}
>
  Content
</IressModal>
```

### Event Callback Changes

v4 React wrappers mapped Stencil custom events to React callback props. Most remain the same in v6, but some have changed:

| v4 Callback     | v6 Callback     | Notes                            |
| --------------- | --------------- | -------------------------------- |
| `onClick`       | `onClick`       | Unchanged                        |
| `onChange`      | `onChange`      | Unchanged (signature may differ) |
| `onBlur`        | `onBlur`        | Unchanged                        |
| `onFocus`       | `onFocus`       | Unchanged                        |
| `onEntered`     | `onEntered`     | Unchanged                        |
| `onExited`      | `onExited`      | Unchanged                        |
| `onActivated`   | `onActivated`   | Unchanged                        |
| `onDeactivated` | `onDeactivated` | Unchanged                        |
| `onClear`       | `onClear`       | Unchanged                        |

### Test Utility Migration

v4 provided `@iress/ids-react-test-utils` with `idsFireEvent` for testing custom events. v6 uses standard React Testing Library.

```tsx
// ❌ v4: Using idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });
idsFireEvent.entered(modal);
idsFireEvent.blur(field, { target: { value: 'test' } });

// ✅ v6: Using standard RTL
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

await userEvent.type(input, 'test');
fireEvent.transitionEnd(modal); // or wait for onEntered callback
await userEvent.tab(); // for blur
```

### Helper Function Migration

v4 provided helper functions in `@iress/components-react`. These are no longer needed in v6.

| v4 Helper                   | v6 Replacement                               |
| --------------------------- | -------------------------------------------- |
| `mapCheckboxGroupOptions()` | Use `<IressCheckbox>` children directly      |
| `mapRadioGroupOptions()`    | Use `<IressRadio>` children directly         |
| `mapSelectOptions()`        | Use `options` prop on `IressSelect`          |
| `mapTabs()`                 | Use `<IressTab>` children directly           |
| `mapMenuItems()`            | Use `<IressMenuItem>` children directly      |
| `showModal(id)`             | Use `show` prop or `useModal` hook           |
| `showSlideout(id)`          | Use `show` prop or `useSlideout` hook        |
| `rowData(arr, ref)`         | Pass `rowData` prop directly to `IressTable` |

Most common renames:

| Component               | Old prop (OUI) | New prop (v6)  |
| ----------------------- | -------------- | -------------- |
| `Alert`                 | `context`      | `status`       |
| `Modal`                 | `onHide`       | `onShowChange` |
| `Fieldset`/`RadioGroup` | `legend`       | `label`        |
| `Label`                 | `optional`     | `required`     |

| Component (IDS v4/v5)      | Old prop     | New prop (v6)  |
| -------------------------- | ------------ | -------------- |
| `IressButton`              | `variant`    | `mode`         |
| `IressAlert`               | `variant`    | `status`       |
| `IressModal`               | `isOpen`     | `show`         |
| `IressModal`               | `onClose`    | `onShowChange` |
| `IressModal`               | `title`      | `heading`      |
| `IressPanel`               | `background` | `bg`           |
| `IressStack`/`IressInline` | `gutter`     | `gap`          |

### Form migration (Formik → React Hook Form)

The most significant architectural change. Forms use `IressForm` + `IressFormField` with `render` prop, replacing Formik's `<Field as={...}>` pattern. Yup schemas become per-field `rules` props.

See references/form-migration.md for validation mapping, before/after examples, and common patterns.

# Form Migration (Formik → React Hook Form)

The most significant architectural change in IDS v6. Forms use `IressForm` + `IressFormField` with a `render` prop pattern, replacing Formik's `<Field as={...}>` approach. Validation moves from Yup schemas to per-field `rules` props (React Hook Form rules).

## Validation migration (Yup → rules)

| Yup                      | React Hook Form `rules`                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| `.required('msg')`       | `required: 'msg'`                                                      |
| `.min(n, 'msg')`         | `minLength: { value: n, message: 'msg' }`                              |
| `.max(n, 'msg')`         | `maxLength: { value: n, message: 'msg' }`                              |
| `.email('msg')`          | `pattern: { value: /emailRegex/, message: 'msg' }`                     |
| `.matches(regex, 'msg')` | `pattern: { value: regex, message: 'msg' }`                            |
| `.positive('msg')`       | `validate: { positive: (v) => v > 0 \|\| 'msg' }`                      |
| `.integer('msg')`        | `validate: { integer: (v) => Number.isInteger(Number(v)) \|\| 'msg' }` |

## Full before/after example

**Before (Formik + OUI):**

```tsx
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Label, FormGroup, Button } from '@iress/oui';

const schema = Yup.object({
  email: Yup.string().email('Invalid').required('Required'),
});

function MyForm() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={schema}
      onSubmit={handle}
    >
      {({ errors, touched }) => (
        <Form>
          <FormGroup>
            <Label htmlFor="email" label="Email" />
            <Field name="email" as={Input} type="email" />
            {errors.email && touched.email && <span>{errors.email}</span>}
          </FormGroup>
          <Button type="submit" mode={Button.Mode.Primary} label="Submit" />
        </Form>
      )}
    </Formik>
  );
}
```

**After (IDS v6):**

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

function MyForm() {
  return (
    <IressForm defaultValues={{ email: '' }} onSubmit={handle}>
      <IressFormField
        name="email"
        label="Email"
        render={(field) => <IressInput {...field} type="email" />}
        rules={{
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid',
          },
        }}
      />
      <IressButton type="submit" mode="primary">
        Submit
      </IressButton>
    </IressForm>
  );
}
```

## Common form patterns

> **Note:** The `render` prop receives two arguments: `(field, state)`. The `field` object contains the control props (value, onChange, etc.), and `state` contains form state info (errors, isDirty, etc.). For simple cases, you only need the first argument.

**Simple form field:**

```tsx
<IressFormField
  name="fieldName"
  label="Field Label"
  render={(field) => <IressInput {...field} />}
  rules={{ required: 'Required' }}
/>
```

**Field group (replacing Fieldset):**

```tsx
<IressFieldGroup label="Personal details">
  <IressFormField
    name="first"
    label="First name"
    render={(field) => <IressInput {...field} />}
  />
  <IressFormField
    name="last"
    label="Last name"
    render={(field) => <IressInput {...field} />}
  />
</IressFieldGroup>
```

**Radio group:**

```tsx
<IressFormField
  name="preference"
  label="Preference"
  render={(field) => (
    <IressRadioGroup {...field}>
      <IressRadio value="a">Option A</IressRadio>
      <IressRadio value="b">Option B</IressRadio>
    </IressRadioGroup>
  )}
/>
```

**Modal with form:**

```tsx
<IressModal show={isOpen} onShowChange={setIsOpen} heading="Edit item">
  <IressForm onSubmit={handleSubmit}>
    <IressFormField
      name="name"
      label="Name"
      render={(field) => <IressInput {...field} />}
    />
    <IressButton type="submit" mode="primary">
      Save
    </IressButton>
  </IressForm>
</IressModal>
```

Quick example:

```tsx
<IressForm defaultValues={{ email: '' }} onSubmit={handle}>
  <IressFormField
    name="email"
    label="Email"
    render={(props) => <IressInput {...props} type="email" />}
    rules={{ required: 'Required' }}
  />
  <IressButton type="submit" mode="primary">
    Submit
  </IressButton>
</IressForm>
```

### Testing migration

IDS v6 uses standard React Testing Library — no special test utilities. Replace `idsFireEvent` with `fireEvent`/`userEvent`, remove `mockLazyLoadedComponents`, prefer `getByRole`/`getByLabelText` over `getByTestId`.

See references/testing-migration.md for import changes, pattern mapping, config updates, and form test examples.

# Testing Migration

IDS v6 uses standard React Testing Library — no special test utilities needed.

## Remove IDS v4 React test utilities

v4 provided `@iress/ids-react-test-utils` with custom helpers for testing Stencil web component wrappers. These are no longer needed in v6.

```ts
// ❌ Remove v4 test utils
import { 
  idsFireEvent, 
  mockLazyLoadedComponents,
  componentLoad 
} from '@iress/ids-react-test-utils';

// ✅ Use standard RTL
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

## idsFireEvent Migration

v4's `idsFireEvent` was needed to fire custom Stencil events. v6 uses standard React events.

| v4 `idsFireEvent` method             | v6 Replacement                                       |
| ------------------------------------ | ---------------------------------------------------- |
| `idsFireEvent.click(el)`             | `await userEvent.click(el)`                          |
| `idsFireEvent.change(el, { target: { value } })` | `await userEvent.type(el, value)` or `fireEvent.change(el, { target: { value } })` |
| `idsFireEvent.blur(el)`              | `await userEvent.tab()` or `fireEvent.blur(el)`      |
| `idsFireEvent.focus(el)`             | `await userEvent.click(el)` or `fireEvent.focus(el)` |
| `idsFireEvent.entered(modal)`        | Wait for `onEntered` callback or use `waitFor`       |
| `idsFireEvent.exited(modal)`         | Wait for `onExited` callback or use `waitFor`        |
| `idsFireEvent.select(el, detail)`    | Use `onChange` callback testing                      |
| `idsFireEvent.submit(form, data)`    | `await userEvent.click(submitButton)`                |
| `idsFireEvent.error(form, messages)` | Test validation via form submission                  |

### Before/After Examples

```tsx
// ❌ v4: Testing modal entered
import { idsFireEvent } from '@iress/ids-react-test-utils';

const onEntered = jest.fn();
render(<IressModal show onEntered={onEntered} />);
const modal = screen.getByRole('dialog');
idsFireEvent.entered(modal);
expect(onEntered).toHaveBeenCalled();

// ✅ v6: Testing modal entered
const onEntered = jest.fn();
render(<IressModal show onEntered={onEntered} />);
await waitFor(() => expect(onEntered).toHaveBeenCalled());
```

```tsx
// ❌ v4: Testing input change
import { idsFireEvent } from '@iress/ids-react-test-utils';

idsFireEvent.change(input, { target: { value: 'test' } });

// ✅ v6: Testing input change
await userEvent.type(input, 'test');
// or
fireEvent.change(input, { target: { value: 'test' } });
```

## Remove mockLazyLoadedComponents

v4 required mocking lazy-loaded Stencil components. v6 components load synchronously.

```ts
// ❌ v4: Required for async component loading
import { mockLazyLoadedComponents } from '@iress/ids-react-test-utils';

beforeEach(() => {
  mockLazyLoadedComponents();
});

// ✅ v6: Not needed — remove entirely
```

## Test pattern changes

| v4 pattern                           | v6 pattern                                           |
| ------------------------------------ | ---------------------------------------------------- |
| `idsFireEvent.click(el)`             | `await userEvent.click(el)`                          |
| `await findByTestId('x__button')`    | `getByRole('button', { name: 'X' })`                 |
| `mockLazyLoadedComponents()`         | Remove — components load synchronously               |
| Async `findBy*` for component render | Synchronous `getBy*` in most cases                   |
| `componentLoad()`                    | Remove — not needed                                  |

## Prefer accessibility queries

```ts
// ❌ Old: brittle test IDs
screen.getByTestId('submit-button');

// ✅ New: accessible queries
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');
```

## Update Jest config (not needed for Vitest)

If using **Jest** (not Vitest), add IDS packages to the transform allowlist:

```ts
// Jest only — Vitest handles ESM natively and does not need this
transformIgnorePatterns: [
  'node_modules/(?!(@iress-oss/ids-components|@iress-oss/ids-tokens)/)',
],
```

## Form test migration

```tsx
// ❌ v4: Testing with IressForm and idsFireEvent
import { idsFireEvent } from '@iress/ids-react-test-utils';

render(
  <IressForm onSubmit={mockSubmit}>
    <IressField label="Name">
      <IressInput name="name" />
    </IressField>
    <IressButton type="submit">Submit</IressButton>
  </IressForm>
);

const input = screen.getByLabelText('Name');
idsFireEvent.change(input, { target: { value: 'Test' } });
idsFireEvent.submit(form, { name: 'Test' });

// ✅ v6: Testing with IressForm and userEvent
render(
  <IressForm defaultValues={{ name: '' }} onSubmit={mockSubmit}>
    <IressFormField
      name="name"
      label="Name"
      render={(field) => <IressInput {...field} />}
    />
    <IressButton type="submit">Submit</IressButton>
  </IressForm>,
);

await userEvent.type(screen.getByRole('textbox', { name: 'Name' }), 'Test');
await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
expect(mockSubmit).toHaveBeenCalledWith({ name: 'Test' });
```

### Styling migration

OUI CSS classes and IDS v4 Stencil classes are removed. Use styling props (`p`, `m`, `bg`, `gap`, `scrollable`) or design tokens (`var(--iress-*)`). Declare `@layer` order if custom CSS is overridden.

See references/styling-migration.md for examples and AG Grid migration.

# Styling Migration

## CSS class changes

```css
/* ❌ OUI classes — removed */
.oui-button {
}

/* ❌ IDS v4 Stencil classes — removed */
.sc-iress-button-h {
}

/* ✅ IDS v6 — use styling props or design tokens */
```

## Styling props

IDS v6 exposes styling props on every component:

```tsx
// Spacing
<IressPanel p="lg" m="xl" />

// Responsive
<IressPanel p={{ base: 'sm', xl: 'lg' }} />

// Colour
<IressPanel bg="alt" />

// Scrollable
<IressPanel scrollable="y" style={{ maxHeight: '400px' }}>
  <LongContent />
</IressPanel>
```

## Design tokens for custom styles

Prefer the type-safe `cssVars` object from `@iress-oss/ids-tokens` — it gives you autocomplete and compile-time checking:

```tsx
import { cssVars } from '@iress-oss/ids-tokens';

// ✅ Preferred — type-safe cssVars
<div
  style={{
    color: cssVars.colour.primary.text,
    padding: cssVars.spacing[4],
  }}
/>;
```

If you need to reference tokens in plain CSS (e.g. a `.css` file or CSS-in-JS template string), fall back to CSS custom properties (note: uses British spelling `colour`, numeric spacing keys):

```css
/* Fallback — plain CSS custom properties */
.custom-element {
  color: var(--iress-colour-primary-text);
  padding: var(--iress-spacing-4);
}
```

## Cascade layers

All IDS v6 CSS lives in cascade layers. Declare layer order if your own CSS is being overridden:

```css
@layer reset, base, tokens, recipes, utilities;
```

## AG Grid migration

```tsx
// ❌ Old (v5)
import { IressAgGridContainer } from '@iress/ids-themes';

<IressAgGridContainer>
  <AgGridReact {...gridProps} />
</IressAgGridContainer>;

// ✅ New (v6) — minimum AG Grid version 33
import { getAgGridThemeProps } from '@iress/ids-themes';

<AgGridReact {...getAgGridThemeProps()} {...gridProps} />;
```

---

## Post-Migration Validation

After completing migration, run `scripts/validate-migration.sh` or verify manually:

1. **Automated checks**: Run validation script to check for common issues
2. **Visual regression**: Run VRT suite and review all visual diffs (see references/visual-regression-testing.md)

# Visual Regression Testing for Migration

Visual regression testing (VRT) is highly recommended for IDS v6 migration to catch styling and layout changes that automated checks miss.

## Why VRT for Migration?

IDS v6 introduces significant styling changes:
- New CSS architecture (Panda CSS)
- Different default spacing/sizing
- Icon system change (FontAwesome → Material Symbols)
- Component visual updates (shadows, borders, colors)

VRT catches these before users do.

## Recommended: Playwright VRT

Playwright has built-in visual comparison with minimal setup.

### Automated Setup

The migration skill includes a script that auto-detects your routing framework and generates tests:

```bash
.agents/skills/version-migration/scripts/setup-playwright-vrt.sh
```

This script:
- Detects **React Router** or **Next.js** (App Router / Pages Router)
- Finds all static routes in your application
- Generates Playwright config and test suite
- Creates tests for each route + interactive components
- Includes responsive viewport tests

**Supported frameworks:**
- React Router (v5, v6)
- Next.js App Router
- Next.js Pages Router

Dynamic routes (with `:param` or `[param]`) are skipped automatically.

### Manual Setup

If you prefer manual setup or use a different router:

```bash
# Install Playwright
npm install -D @playwright/test

# Initialize (creates playwright.config.ts)
npx playwright install
```

### Basic Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  // Generate baseline screenshots
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true' ? 'all' : 'none',
});
```

### Pre-Migration: Capture Baselines

Before migrating, the setup script has already generated route-based tests. Just capture baselines:

```typescript
// e2e/components.spec.ts
import { test, expect } from '@playwright/test';

test('button variants', async ({ page }) => {
  await page.goto('/components/button');
  await expect(page).toHaveScreenshot('button-variants.png');
});

test('form validation', async ({ page }) => {
  await page.goto('/forms/example');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveScreenshot('form-validation.png');
});

test('modal open', async ({ page }) => {
  await page.goto('/components/modal');
  await page.getByRole('button', { name: 'Open Modal' }).click();
  await page.waitForSelector('[role="dialog"]');
  await expect(page).toHaveScreenshot('modal-open.png');
});
```

```bash
UPDATE_SNAPSHOTS=true npx playwright test
```

This creates `e2e/components.spec.ts-snapshots/` with baseline images for all detected routes.

If you need to add custom tests, edit `e2e/components.spec.ts`:

### Post-Migration: Compare

After migrating to v6, run tests without `UPDATE_SNAPSHOTS`:

```bash
npx playwright test
```

Playwright will:
- Compare new screenshots to baselines
- Fail tests if differences exceed threshold
- Generate diff images showing changes

### Review Differences

```bash
# Open HTML report with visual diffs
npx playwright show-report
```

Review each diff:
- ✅ **Expected changes**: Update baseline (`UPDATE_SNAPSHOTS=true`)
- ❌ **Regressions**: Fix the component/styling

## Alternative: Chromatic (Storybook)

If using Storybook, Chromatic provides automated VRT:

```bash
# Install
npm install -D chromatic

# Capture baseline (before migration)
npx chromatic --project-token=<token>

# After migration, run again
npx chromatic --project-token=<token>
```

Chromatic shows visual diffs in a web UI.

## What to Test

The auto-generated test suite covers:

1. **All static routes**: Every page in your app (excluding dynamic routes)
2. **Interactive components**: Buttons, forms, modals (auto-detected)
3. **Responsive layouts**: Mobile, tablet, desktop viewports

Additional priority components to add manually:

1. **Forms**: Inputs, validation states, error messages
2. **Modals/Slideouts**: Overlays, positioning, backdrop
3. **Buttons**: All modes, loading states, icons
4. **Alerts**: All status variants
5. **Tables**: Headers, rows, sorting indicators
6. **Navigation**: Menus, tabs, breadcrumbs
7. **Layout**: Spacing, responsive breakpoints

## Tips

- **Test critical user flows**, not every component variation
- **Use consistent viewport sizes** (e.g., 1280x720)
- **Wait for animations** to complete before screenshots
- **Mask dynamic content** (timestamps, random IDs)
- **Set threshold** for acceptable pixel differences (e.g., 0.2%)

## Playwright VRT Script

Use `scripts/setup-playwright-vrt.sh` to generate a starter test suite based on your component usage.

## Integration with CI

```yaml
# .github/workflows/vrt.yml
name: Visual Regression Tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm start & npx wait-on http://localhost:3000
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## When to Update Baselines

Update baselines when:
- ✅ Visual change is intentional (design update)
- ✅ Component behavior improved (better accessibility)
- ✅ Layout fix (responsive improvement)

Don't update when:
- ❌ Unexpected spacing change
- ❌ Missing styles
- ❌ Broken layout
- ❌ Wrong colors/icons

## Post-Migration Checklist

- [ ] Run VRT suite
- [ ] Review all visual diffs
- [ ] Fix regressions
- [ ] Update baselines for intentional changes
- [ ] Document visual changes in PR
- [ ] Get design team approval for significant changes
3. **Visual check**: All components render without console errors or warnings
4. **Form functionality**: Submit forms and verify validation rules work correctly
5. **Test suite**: All tests pass with new testing patterns (no `idsFireEvent`, etc.)
6. **Accessibility**: Keyboard navigation and screen reader functionality intact
7. **Styling**: No missing styles, check responsive breakpoints
8. **Interactive states**: Hover, focus, disabled, loading states work as expected
9. **Build**: Production build completes without errors, check bundle size

The validation script checks for:

- Old imports (`@iress/oui`, `@iress/components-react`)
- Old test utils (`idsFireEvent`, `mockLazyLoadedComponents`)
- Deprecated props (`variant=`, `isOpen=`, `gutter=`, etc.)
- Required CSS import
- Remaining Formik usage

---

## Common Gotchas

See references/common-gotchas.md for a comprehensive troubleshooting guide covering:

# Common Gotchas

## Critical Breaking Changes

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| Components have no styles            | Missing CSS import                               | Add `import '@iress-oss/ids-components/dist/style.css'` to app entry |
| Form validation not working          | Using HTML5 attributes (`required`, `maxLength`) | Move validation to `rules` prop on `IressFormField`                  |
| Modal won't close                    | Using `isOpen` prop (IDS v4/v5)                  | Rename to `show`                                                     |
| Button variant not applying          | Using `variant` prop (IDS v4/v5)                 | Rename to `mode`                                                     |
| Tests fail "Cannot find module"      | Jest can't transform IDS v6                      | Update `transformIgnorePatterns`                                     |
| `idsFireEvent` not found             | Using removed IDS v4 test utils                  | Replace with standard `fireEvent` from RTL                           |

## IDS v4 React → v6 React Gotchas

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| `idsFireEvent` not found             | v4 test utils removed                            | Use standard `fireEvent`/`userEvent` from RTL                        |
| `mockLazyLoadedComponents` not found | v4 test utils removed                            | Not needed — v6 components load synchronously                        |
| Slots not rendering                  | v4 uses slots, v6 uses props                     | `<div slot="footer">` → `footer={<div>}` prop                        |
| `mapRadioGroupOptions` not found     | v4 helper removed                                | Use `<IressRadio>` children directly                                 |
| `mapCheckboxGroupOptions` not found  | v4 helper removed                                | Use `<IressCheckbox>` children directly                              |
| `mapTabs` not found                  | v4 helper removed                                | Use `<IressTab>` children directly                                   |
| `showModal(id)` not found            | v4 helper removed                                | Use `show` prop or `useModal` hook                                   |
| Button `mode="link"` not working     | Mode removed                                     | Use `mode="tertiary"` or `IressLink` component                       |
| Button `mode="danger"` not working   | Mode removed                                     | Use `status="danger"` with any mode                                  |
| Button `mode="positive"` not working | Mode removed                                     | Use `status="success"` with any mode                                 |
| Alert `status="error"` not working   | Value renamed                                    | Use `status="danger"` instead                                        |
| Icon `name` not working              | v4 uses FontAwesome, v6 uses Material Symbols    | Replace FA icon names with Material Symbol names                     |
| Icon `set` prop not working          | Prop removed                                     | v6 uses Material Symbols only                                        |
| Label `labelText` not working        | v4 uses prop, v6 uses children                   | `<IressLabel>Text</IressLabel>` instead of `labelText="Text"`        |
| Field validation props not working   | v4 inline validation removed                     | Use `rules` prop on `IressFormField`                                 |
| Panel `noBorderRadius` not working   | Prop changed                                     | Use `borderRadius="none"` instead                                    |
| Expander `mode="heading"` not working| Value renamed                                    | Use `mode="section"` instead                                         |
| SkipLink `targetId` not working      | Prop renamed                                     | Use `href="#targetId"` instead                                       |
| TabContainer not found               | Component renamed                                | Use `IressTabSet` instead                                            |
| TabButton/TabPanel not found         | Components merged                                | Use `IressTab` with children for content                             |

## OUI-Specific Gotchas

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| OUI Alert `context` not working      | Prop renamed                                     | Use `status` (e.g. `status="danger"` not `context="danger"`)         |
| OUI Alert `contextLabel` missing     | Prop removed in v6                               | Alert now auto-generates context labels; remove prop                 |
| OUI Button children not rendering    | OUI uses `label` prop, v6 uses `children`        | Move `label="Submit"` to `<IressButton>Submit</IressButton>`         |
| OUI Label not rendering text         | OUI uses `label` prop, v6 uses `children`        | Use `<IressLabel>Text</IressLabel>` or `IressFormField` `label` prop |
| OUI Modal `onHide` not firing        | Prop renamed                                     | Use `onShowChange` callback                                          |
| OUI Fieldset `legend` not showing    | Prop renamed                                     | Use `label` prop on `IressFieldGroup`                                |
| OUI RadioGroup `legend` not showing  | Prop renamed                                     | Use `label` prop on `IressFormField` wrapping `IressRadioGroup`      |
| OUI Toggle `legend` not showing      | Prop renamed                                     | Use `children` prop on `IressToggle`                                 |
| OUI Scrollable not working           | Component removed                                | Use `scrollable="y"` styling prop on any component                   |
| OUI ProgressBar not rendering        | Component renamed                                | Use `IressProgress` instead                                          |
| OUI Badge not rendering              | Component renamed                                | Use `IressPill` instead                                              |

## Component API Changes

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| Form fields render without labels    | Using standalone `<Label>`                       | Move label text into `label` prop on `IressFormField`                |
| Custom CSS overriding components     | Cascade layer ordering                           | Declare `@layer` order in stylesheet                                 |
| `IressPanel alt` prop not working    | No boolean `alt` prop exists                     | Use `bg="alt"` instead                                               |
| `IressAlert mode` not working        | Prop was renamed                                 | Use `status` (e.g. `status="danger"`)                                |
| `IressFieldGroup legend` not working | Prop was renamed                                 | Use `label` instead                                                  |
| `IressButton link` mode not working  | Mode removed                                     | Use `mode="tertiary"` or `IressLink` for paragraph links             |
| `IressButton danger` mode not working| Mode removed                                     | Use `status="danger"` with any mode                                  |
| `IressInput` not in form context     | v6 inputs work standalone but forms need wrapper | Wrap with `IressFormField` inside `IressForm`                        |
| `IressCheckbox` checked not updating | Using `defaultChecked` in controlled mode        | Use `checked` prop for controlled, `defaultChecked` for uncontrolled |
| `IressRadioGroup` options prop gone  | API changed to composition pattern               | Use `IressRadio` children instead of `options` array                 |
| `IressToggle` `toggled` prop gone    | Prop renamed                                     | Use `checked` or `defaultChecked`                                    |
| `IressToggle` `labelTrue/False` gone | API simplified                                   | Use `children` for label; toggle is now binary switch                |
| `IressSlider` `label` prop gone      | API changed                                      | Use `aria-label` or wrap in `IressFormField`                         |
| `IressTabs` `activeTabIndex` gone    | API changed                                      | Use `selected`/`defaultSelected` with tab `value` props              |
| `IressSelect` options format changed | Now uses `LabelValueMeta` objects                | Use `{ label: 'Text', value: 'val' }` format                         |
| `IressSelect` `value` not selecting | Passing a string instead of `LabelValueMeta`     | v6 now accepts plain strings for `value`/`defaultValue` — ensure the string matches an option's `value` field. A console warning is logged if the value can't be resolved against the available options |
| `IressPopover` content has extra padding | Default padding added in v6                  | Popover content now has `padding: spacing.4` by default. Override with `contentStyle={{ padding: 'spacing.0' }}` if you were providing your own inner padding |
| `IressReadonly` CSS selectors broken | DOM structure changed                            | Inner content is now wrapped in an additional `wrapper` div inside `root`. Update CSS selectors targeting direct children of the readonly root element |
| Form control `readOnly` type changed | `readOnly` now accepts `boolean \| 'locked'`    | Use `readOnly="locked"` when the field is read-only due to permissions. This applies locked styling via `IressReadonly variant="locked"` |
| `IressModal` `title` not rendering   | Prop renamed                                     | Use `heading` prop                                                   |
| `IressSlideout` `eleToPush` selector | Needs valid CSS selector or element ref          | Pass string selector, HTMLElement, or React ref                      |

## Form Architecture Changes

| Problem                              | Cause                                            | Solution                                                             |
| ------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| Formik `<Field as={}>` not working   | Formik replaced with React Hook Form             | Use `IressFormField` with `render` prop                              |
| Yup schema validation not working    | Yup replaced with RHF rules                      | Convert to `rules` prop (see form-migration.md)                      |
| `useFormikContext` not available     | Formik removed                                   | Use `useFormContext` from `react-hook-form`                          |
| Form `initialValues` not working     | Prop renamed                                     | Use `defaultValues` on `IressForm`                                   |
| Form `validationSchema` not working  | Yup integration removed                          | Use per-field `rules` on `IressFormField`                            |
| `setFieldValue` not available        | Formik API removed                               | Use `setValue` from `useFormContext` or form ref                     |
| Form errors not displaying           | Error handling changed                           | Errors auto-display via `IressFormField`; use `errorMessages` prop   |

- Critical breaking changes (missing CSS, validation, renamed props)
- IDS v4 React → v6 React gotchas (test utils, slots, helpers, icons)
- OUI-specific gotchas (prop renames, removed components)
- Component API changes (form fields, styling, composition patterns)
- Form architecture changes (Formik → React Hook Form)

---

## Cross-References

### Generated migration guides (read these for full details)

- **v4→v5** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-v5.md`
- **v5→v6** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-v6.md`
- **OUI→v6** — `node_modules/@iress-oss/ids-components/.ai/guides/migration-guides-oui.md`

### Component and pattern docs

- **Component docs** — `node_modules/@iress-oss/ids-components/.ai/components/`
- **Pattern docs** — `node_modules/@iress-oss/ids-components/.ai/patterns/`
- **Index** — `node_modules/@iress-oss/ids-components/.ai/index.json`

### Related skills

- **token-usage** — Design token usage patterns
- **ui-translation** — Building new IDS v6 UIs from scratch
- **ui-doctor** — Auditing IDS compliance

## Reference

- **Storybook and Guidelines:** https://main--691abcc79dfa560a36d0a74f.chromatic.com

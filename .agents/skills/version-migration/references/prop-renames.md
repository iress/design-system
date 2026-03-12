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
| `RadioGroup`  | `readOnly`           | `readOnly`           | Unchanged                                             |
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

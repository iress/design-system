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

# Form

> Manages form state, validation, and submission for a group of input fields.

## Import

```tsx
import { IressForm } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Form)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=form&title=[Form]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=form,enhancement&title=[Form]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| actions | `ReactNode` | — | The actions to be displayed at the top right of the form. The actions to be displayed at the bottom left of the form. |
| footer | `ReactNode` | — | Footer to be displayed at the bottom of the form. This can be used for additional information, links, or actions that are relevant to the form but not part of the main content. |
| heading | `ReactNode` | — | Title displayed at the top of the form, usually the purpose of the form. |
| mode | `all` , `onBlur` , `onChange` , `onSubmit` , `onTouched` | `'onBlur' 'onSubmit'` | Configure the validation strategy **before** a user submits the form the first time. For long forms, it is recommended to use `onBlur` to avoid overwhelming the user with validation errors. This means that validation will occur when the user leaves a field, rather than on every change. Configure the validation strategy **before** a user submits the form the first time. For short forms, it is recommended to use `onSubmit`, as the data is normally familiar to the user (eg. login). @see https://react-hook-form.com/docs/useform#mode @see https://react-hook-form.com/docs/useform#mode |
| panelStyle | `[IressPanelProps](../../dist/components/Panel/Panel.d.ts)` | `{ bg: "alt" }` | Style the panel that wraps the form fields. |
| pattern | `long` , `short` | — | Use `pattern="long"` for the following use cases: - Forms that are used for data entry, such as creating or updating large datasets. - Forms that are longer than the viewport (usually more than 8-9 fields). Use `pattern="short"` for the following use cases: - Login forms, or similar forms that requires data familiar to the users - Forms that fit the length of a single screen (less than 8-9 fields) |
| reValidateMode | `onBlur` , `onChange` , `onSubmit` | `'onChange' 'onChange'` | Configure the validation strategy **after** a user submits the form the first time. During this phase, it is recommended to use `onChange` to provide immediate feedback on field changes so users can correct errors as they go. @see https://react-hook-form.com/docs/useform#reValidateMode @see https://react-hook-form.com/docs/useform#reValidateMode |
| sticky | `boolean` | — | If set to `true`, the form will have a sticky header that remains at the top of the viewport when scrolling. This is useful for long forms where you want the header to always be visible. |
| children | `ReactNode` | — | The content of the form, usually multiple `IressFormField` or `IressFormFieldset` components. |
| onSubmit | `((data: T) => void)` | — | Handler for when the submit method on the form is called after validation is passed. @see https://react-hook-form.com/docs/useform/handlesubmit |
| onError | `SubmitErrorHandler<T>` | — | Emitted when any field has an error. Called after the first submit if any errors are recorded, and from then on when any value changes. @see https://react-hook-form.com/docs/useform/handlesubmit |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| alert | `ReactNode` | `<IressFormValidationSummary srOnly />` | The content of the alert section. |
| onValidChange | `((isValid: boolean) => void)` | — | Emitted when the form state is valid. @see https://react-hook-form.com/docs/useform/formstate |
| updateErrorSummaryOnSubmit | `boolean` | `false` | If set to `true`, the summary will only update when the form is submitted, not on every field change. This is useful for performance reasons, especially in large forms. |
| context | `object` | — | This context object is mutable and will be injected into the `resolver`'s second argument (eg. [Yup](https://github.com/jquense/yup) validation's context object). @see https://react-hook-form.com/docs/useform#context |
| criteriaMode | `CriteriaMode` | — | Display all validation errors or one at a time. @see https://react-hook-form.com/docs/useform#criteriaMode |
| defaultValues | `((BrowserNativeObject , { [x: string]: any; }, { [x: string]: any; } , NestedValue) & FieldValues) ` | — | Default values to be passed through when an input is unset. @see https://react-hook-form.com/docs/useform#defaultValues |
| delayError | `number` | — | Delay error from appearing instantly. @see https://react-hook-form.com/docs/useform#delayError |
| progressive | `boolean` | — | Progressive Enhancement only applicable for SSR framework. @see https://react-hook-form.com/docs/useform |
| resetOptions | `Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; keepFieldsRef: boolean; }> , undefi...` | — | This property is related to value update behaviors. @see https://react-hook-form.com/docs/useform#resetOptions |
| resolver | `Resolver<T, object, T>` | — | This function allows you to use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others. @see https://react-hook-form.com/docs/useform#resolver |
| shouldUseNativeValidation | `boolean` | — | This config will enable browser native validation. It will also enable CSS selectors :valid and:invalid making styling inputs easier. @see https://react-hook-form.com/docs/useform#shouldUseNativeValidation |
| shouldUnregister | `boolean` | — | By default, an input value will be retained when input is removed. However, you can set `shouldUnregister` to `true` to `unregister` input during unmount. @see https://react-hook-form.com/docs/useform#shouldUnregister |
| values | `FieldValues` | — | The values prop will react to changes and update the form values, which is useful when your form needs to be updated by external state or server data. @see https://react-hook-form.com/docs/useform#values |

📄 [Full type definition](../../dist/patterns/Form/Form.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

### IressFormField Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| control | `Control<T>` | — | React Hook Form control object. It is used to register the field with the form. It is automatically provided when used inside an `IressForm`, but it can be overridden if you are using a custom form control. @see https://react-hook-form.com/ts#Control |
| defaultValue | `any` | — | A default value for the field. Although this is provided here as it is part of the React Hook Form API, it is recommended to set the default value in the form's `defaultValues` prop, to ensure the form is correctly initialised. |
| **name** | `string` | — | Name of the field. It is used to identify the field in the form. It must be unique within the form. |
| **render** | `(field: FormFieldRenderProps<T>, state: FormFieldRenderState<T>) => ReactNode` | — | Render function to provide the control for the field. To ensure the field is correctly registered with the form, the control must be passed as props to the rendered component. (eg. `render={field => <IressInput {...field} />}`) |
| renderSupplementary | `((field: FormFieldRenderProps<T>, state: FormFieldRenderState<T>) => ReactNode)` | — | Render function to allow you to render supplementary content alongside the field, with access to the field props and state. This can be useful for rendering custom components that need to interact with the form state, such as character counters, password strength meters, or custom validation messages. (eg. `renderSupplementary={{ value } => <CharCount value={value} />}`) |
| rules | `CustomRules<T>` | — | Validation rules, including: required, min, max, minLength, maxLength, pattern, validate @see https://react-hook-form.com/api/useform/register) |
| shouldUnregister | `boolean` | — | Input will be unregistered after unmount and defaultValues will be removed as well (it will not be stored in the form state). @see https://react-hook-form.com/docs/usecontroller |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the field in a read-only state, replacing the input with a static display of the current value. Validation rules are skipped. Use `'locked'` when the field is read-only due to permissions. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| error | `ReactNode` | — | Validation error to be displayed above the field. |
| **label** | `ReactNode` | — | Text to be displayed in the label. |
| hint | `ReactNode` | — | Text to be displayed as supporting field description. |
| horizontal | `boolean` | — | Displays the label and input field inline instead of stacked vertically. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| errorMessages | `[ValidationMessageObj](../../dist/interfaces.d.ts)[]` | — | Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`. |
| labelWidth | `string` | — | Controls the width of the label container when in horizontal mode. Can be any valid CSS width value (e.g., '200px', '20%', 'auto'). Only applies when `horizontal` is true. |
| removeErrorMargin | `boolean` | — | Removes the reserved space for error messages, allowing fields to stack with narrower gaps. When true, no margin is reserved for potential error messages. |
| supplementary | `ReactNode` | — | Supplementary content to be displayed below the field. Is only shown when the field is not in an error state. |

📄 [Full type definition](../../dist/patterns/FormField/FormField.d.ts)

### IressFormFieldset Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| control | `Control<TFieldValues>` | — | React Hook Form control object. It is used to register the field with the form. It is automatically provided when used inside an `IressForm`, but it can be overridden if you are using a custom form control. @see https://react-hook-form.com/ts#Control |
| defaultValue | `any` | — | A default value for the field. Although this is provided here as it is part of the React Hook Form API, it is recommended to set the default value in the form's `defaultValues` prop, to ensure the form is correctly initialised. |
| **name** | `string` | — | Name of the field. It is used to identify the field in the form. It must be unique within the form. |
| **render** | `(field: FormFieldRenderProps<TFieldValues>) => ReactNode` | — | Render function to provide the control for the field. |
| rules | `CustomRules<TFieldValues>` | — | Validation rules, including: required, min, max, minLength, maxLength, pattern, validate @see https://react-hook-form.com/api/useform/register |
| shouldUnregister | `boolean` | — | Input will be unregistered after unmount and defaultValues will be removed as well (it will not be stored in the form state). @see https://react-hook-form.com/docs/usecontroller |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| error | `ReactNode` | — | Validation error to be displayed above the field. |
| **label** | `ReactNode` | — | Text to be displayed in the label. |
| hint | `ReactNode` | — | Text to be displayed as supporting field description. |
| horizontal | `boolean` | — | Displays the label and input field inline instead of stacked vertically. |
| readOnly | `[FormControlReadOnly](../../dist/types.d.ts)` | — | Renders the group in a read-only state (no asterisk symbol). Use `'locked'` when the control is read-only due to permissions. |
| hiddenLabel | `boolean` | — | Visually hides the label text, but still available to screen readers. |
| errorMessages | `[ValidationMessageObj](../../dist/interfaces.d.ts)[]` | — | Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`. |
| labelWidth | `string` | — | Controls the width of the label container when in horizontal mode. Can be any valid CSS width value (e.g., '200px', '20%', 'auto'). Only applies when `horizontal` is true. |
| removeErrorMargin | `boolean` | — | Removes the reserved space for error messages, allowing fields to stack with narrower gaps. When true, no margin is reserved for potential error messages. |
| supplementary | `ReactNode` | — | Supplementary content to be displayed below the field. Is only shown when the field is not in an error state. |

📄 [Full type definition](../../dist/patterns/FormFieldset/FormFieldset.d.ts)

### IressFormValidationSummary Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| status | `danger` , `info` , `success`, `warning`  | — | Status for all child ValidationMessage components |
| linkToTarget | `string` | — | Renders validation messages as links pointing at the field it relates to, specified as a string Only works when used with the `messages` prop. |
| visiblePrefix | `boolean` | — | If set to true, the prefix will be visually displayed (default is only available to screen readers) |
| itemStyle | `[IressCustomiseSlot](../../dist/interfaces.d.ts)` | — | Add additional styles to each item in the list. |
| actions | `[IressAlertButtonProps](../../dist/patterns/FormValidationSummary/FormValidationSummary.d.ts)[]` | — | Actions to display in the alert. These will be rendered as buttons with opinionated styling. If you want to use custom buttons, use the `footer` prop instead. |
| defaultClosed | `boolean` | — | If true, the alert will be dismissed and unrendered from the DOM. Use for uncontrolled dismissal of the alert, where the component manages its own dismissed state internally. |
| closed | `boolean` | — | If true, the alert will be dismissed and unrendered from the DOM. Use for controlled dismissal of the alert, where the parent component manages the dismissed state and passes it down via this prop. |
| closeLabel | `string` | — | Optional override for the default close button label "Close". |
| footer | `ReactNode` | — | Buttons and controls for the alert. @deprecated Use `actions` instead for buttons with opinionated styling. If you need other footer content, use the `children` prop instead. |
| heading | `ReactNode` | `<h3>There was a problem submitting this form</h3>` | Text for alert heading. If a string, it will use a heading with level 2. |
| icon | [MaterialSymbol](https://fonts.google.com/icons?icon.set=Material+Symbols) | — | Icon to display in the alert. If set to `false`, no icon will be displayed. If not provided, the icon will be determined by the `status` prop. |
| multiLine | `boolean` | — | If true, the alert will have a layout that supports longer content, with increased spacing and the icon aligned to the top of the alert instead of centered. Should be used when the content of the alert is more than a couple of sentences. |
| onClose | `((e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | — | Icon to display in the alert. If set to `false`, no icon will be displayed. If not provided, the icon will be determined by the `status` prop. |
| variant | `full-width`, `sidebar`  | — | Variants of the alert, allowing it to be styled differently based on where its used in the application. - Sidebar: The icon will be aligned to the heading, and the text will appear below the icon. - Full-width: The border will be removed, except for the bottom border. |

📄 [Full type definition](../../dist/patterns/FormValidationSummary/FormValidationSummary.d.ts)

Use the IressForm component when you want to request, validate and process data from the user.

```tsx
<IressForm pattern="short">
  <IressFormField
    name="name"
    label="Name"
    rules={{ required: 'Name is required' }}
    render={(controlledProps) => <IressInput {...controlledProps} />}
  />
  <IressFormField
    name="email"
    label="Email"
    rules={{ required: 'Email is required' }}
    render={(controlledProps) => (
      <IressInput {...controlledProps} type="email" />
    )}
  />
</IressForm>;
```

```tsx
import { IressForm } from '@iress-oss/ids-components';
```

## Design

### When to use

- Collecting user input that needs validation
- Multi-field data entry with structured layout
- Progressive disclosure of form sections

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Validate on submit for short forms (≤ 8 fields) | Disable the submit button to indicate errors |
| Use `IressFormField` for every input in the form | Use `useState` to manage form field values |
| Mark required fields with the `required` rule | Rely solely on colour to indicate errors |

### Content guidelines

- Write error messages that are actionable (e.g. "Enter a valid email address" not "Invalid input")
- Use sentence case for labels and placeholders
- Mark required fields — the form will display an asterisk automatically

### Related patterns

- [Field](../components/field.md) — for standalone field layout without form validation
- [FormField](../patterns/form.md) — for individual validated form fields
- [Input](../components/input.md) — for text input controls
- [Select](../components/select.md) — for single-value selection
- [Checkbox](../components/checkbox.md) — for boolean or multi-select options

### Patterns

The `IressForm` component supports different patterns to ensure consistency in how forms are displayed depending on the context of the form.

1. `long`: This pattern is used when a form has more than 8 fields. It has the following characteristics:
   - The `heading` and `actions` are displayed at the top of the form and can be `sticky`, ensuring they are always visible to the user.
   - The validation errors are displayed when the user blurs out of a field (ie. moves to the next field), ensuring that the user is informed of any errors before submitting the form.
2. `short`: This is the default pattern and should be used when a form has 8 or fewer fields, usually for familiar data such as the user's login details. It has the following characteristics:
   - The `heading` is displayed at the top of the for and the `actions` are displayed at the bottom of the form.
   - The validation errors are displayed when the user submits the form to ensure that the user is not overwhelmed with errors when filling out the form.

**Note:** It is recommended to use the patterns above for new applications, or those doing an overhaul, as they provide a consistent user experience across forms. For older products, please follow the existing patterns in your application to ensure consistency with the rest of the product.

## Develop

### Installation

As of version 6, `react-hook-form` has been moved to a peer dependency. You will need to install it alongside `@iress-oss/ids-components` in order to use the `IressForm` or `IressHookForm` component.

```bash
yarn add @iress-oss/ids-components react-hook-form
```

### Quick Start

```tsx
import { IressForm } from '@iress-oss/ids-components';

<IressForm
  actions={
    <IressButton mode="primary" type="submit">
      Submit
    </IressButton>
  }
>
  <IressFormField
    label="Name"
    name="name"
    render={(controlledProps) => <IressInput {...controlledProps} />}
    rules={{
      required: true,
    }}
  />
</IressForm>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs#api-props)

### Key concepts

#### State management

`IressForm` manages the state of the form, including the form data and validation. This is done using the `useForm` hook from React Hook Forms. This hook provides a way to manage the form state, and provides methods to interact with the form. This was done to simplify the form components, make them more predictable (as the form becomes the single source of truth for all form related data) and improve performance by reducing re-renders (very important for large forms).

Due to this change, there are a few things you should consider during development:

- Avoid using the `useState` hook to manage form state. Instead, use the `useFormContext()` hook from `react-hook-form` or the `ref` of the `IressForm` component to interact with the form state. The initial value of the form can be set using the `defaultValues` prop, but from then on you should be using either the hook or ref to interact with the form state.
- Avoid using `onChange` handlers on form fields to react to form values. Instead, use the `useWatch` hook from `react-hook-form` to watch the value of a field and conditionally render fields based on the value of another field.

See below an example comparing a version 4 and version 5 `IressForm` when managing form state.

```diff
-import { IressForm, IressField, IressInput, IressCheckboxGroup, IressCheckbox } from '@iress/components';
+import { IressForm, IressFormField, IressInput, IressCheckboxGroup, IressCheckbox } from '@iress-oss/ids-components';
+import { useWatch } from 'react-hook-form';

-export const App = () => {
-  const [show, setShow] = useState(['name']);
-
-  return (
-    <IressForm>
-      <IressField label="Show fields">
-        <IressCheckboxGroup value={show} onChange={(newValues) => setShow(newValues)}>
+const ConditionalFields = () => {
+  const show = useWatch({ name: 'show' });
+
+  return (
+    <>
+      <IressFormField
+        label="Show fields"
+        name="show"
+        render={(controlledProps) => (
+          <IressCheckboxGroup {...controlledProps}>
             <IressCheckbox value="name">Name</IressCheckbox>
             <IressCheckbox value="email">Email</IressCheckbox>
           </IressCheckboxGroup>
-        </IressField>
-        {show.includes('name') && (
-          <IressField label="Name">
-            <IressInput name="name" />
-          </IressField>
-        )}
-        {show.includes('email') && (
-          <IressField label="Email">
-            <IressInput name="email" type="email" />
-          </IressField>
-        )}
-    </IressForm>
-  );
-};
+        )}
+      />
+      {show?.includes('name') && (
+        <IressFormField label="Name" name="name"
+          render={(controlledProps) => <IressInput {...controlledProps} />}
+        />
+      )}
+      {show?.includes('email') && (
+        <IressFormField label="Email" name="email"
+          render={(controlledProps) => <IressInput {...controlledProps} type="email" />}
+        />
+      )}
+    </>
+  );
+};
+
+export const App = () => (
+  <IressForm defaultValues={{ show: ['name'] }}>
+    <ConditionalFields />
+  </IressForm>
+);
```

#### Validation
#### Validation

Validation is now done declaratively using the `rules` prop on the `IressFormField` component. This is based on the [rules available in React Hook Forms](https://www.react-hook-form.com/api/useform/register/#options). This change was made to allow for more complex validation rules to be implemented.

Due to this change, there are a few things you should consider during development:

- If you want validation messages to be shown on form controls, you need to use the `IressFormField` component to wrap around the form control and set the `rules` prop. This will allow the form to manage the validation state of the field.
- Although you can still use props such as `maxLength` on `IressInput`, these no longer propagate to the form validation. You need to use the `rules` prop to set these validation rules as well, and rely on `maxLength` for the input to stop the user from entering more characters than allowed (a user experience improvement that we definitely recommend).
- You can no longer override default error messages for the whole form. To override the default messages, you must specify them in the `rules` prop per `IressFormField`.

See below an example comparing a version 4 and version 5 `IressForm` when adding validation rules.

```diff
-import { IressForm, IressField, IressInput, IressButton } from '@iress/components';
+import { IressForm, IressFormField, IressInput, IressButton } from '@iress-oss/ids-components';

 export const App = () => (
-  <IressForm valueMissing="{{fieldName}} needs to be filled in!">
-    <IressField label="Name">
-      <IressInput name="name" required />
-    </IressField>
-    <IressField label="Email">
-      <IressInput name="email" maxLength={10} />
-    </IressField>
+  <IressForm>
+    <IressFormField
+      label="Name"
+      name="name"
+      render={(controlledProps) => <IressInput {...controlledProps} />}
+      rules={{ required: 'Name needs to be filled in!' }}
+    />
+    <IressFormField
+      label="Email"
+      name="email"
+      render={(controlledProps) => <IressInput {...controlledProps} type="email" maxLength={10} />}
+      rules={{ maxLength: 10 }}
+    />
     <IressButton type="submit" mode="primary">
       Sign up
     </IressButton>
   </IressForm>
 );
```

#### Syncing state

For most scenarios, you should use the `onSubmit` event to sync the form data with other state management systems (eg. server, browser storage or state management libraries such as Redux). This event is emitted when the form passes validation, and contains a map of the field names and the data entered by the user.

For more complex scenarios, you may need to sync a field value before the form is submitted. In this case, you can use the `useWatch` hook to watch the value of a field and sync it with your state.

Consider the following for your development:

- Only use other state management systems to fill out the form at the initial render using `defaultValues`. After that, use the `onSubmit` event to sync the form data with your state.
- If you need to set form with data coming from an external system, use the `ref` of the form to `reset` the form values.

```tsx
const ref = useRef<FormRef | null>(null);
const api = useApi();

const handleSubmit = async (data) => {
  // Sync the form data with your state
  const details = await api.updateUser(data);

  // Update the form with the new data
  ref.current?.reset(details);
};

return (
  <IressForm onSubmit={handleSubmit} ref={ref}>
    ...
  </IressForm>
);
```

### Usage

#### Fields

Use the `IressFormField` component to create form fields. This component is a layout component that wraps around form controls such as `IressInput`. It provides a consistent layout for form fields, and hooks into the `IressForm` component to provide validation and error handling.

It has three required props:

- `name`: The name of the field, which will be used to identify the field in the form data.
- `label`: The label for the field.
- `render`: A render prop that renders the form control. It is passed an object containing the props to be spread onto the form control to allow it to be controlled by the form.

```tsx
<IressFormField
  name="email"
  label="Email"
  render={(controlledProps) => <IressInput {...controlledProps} type="email" />}
/>;
```

#### Supported form controls

Here are some examples of how to use `IressFormField` with different form controls. If you are using a form control that has multiple inputs inside (for example, `IressCheckboxGroup`), you can use `IressFormFieldset`, which changes the HTML structure to use a `fieldset` and `legend` element to group the inputs.

| Control | Wrapper | `render` prop |
|---------|---------|--------------|
| `IressInput` | `IressFormField` | `render={(controlledProps) => <IressInput {...controlledProps} />}` |
| `IressInputDate` | `IressFormField` | `render={(controlledProps) => <IressInput {...controlledProps} type="date" />}` |
| `IressSelect` | `IressFormField` | `render={(controlledProps) => ( <IressSelect {...controlledProps} options={[ { label: 'Male', value: 'male', prepend: <IressIcon name="mars" />, }, { label: 'Female', value: 'female', prepend: <IressIcon name="venus" />, }, { label: 'Other', value: 'other', prepend: <IressIcon name="otter" />, }, ]} /> )}` |
| `IressCheckboxGroup` | `IressFormFieldset` | `render={(controlledProps) => ( <IressCheckboxGroup {...controlledProps}> <IressCheckbox value="reading">Reading</IressCheckbox> <IressCheckbox value="writing">Writing</IressCheckbox> </IressCheckboxGroup> )}` |
| `IressRadioGroup` | `IressFormFieldset` | `render={(controlledProps) => ( <IressRadioGroup {...controlledProps}> <IressRadio value="steak">Steak</IressRadio> <IressRadio value="fish">Fish</IressRadio> <IressRadio value="salad">Salad</IressRadio> </IressRadioGroup> )}` |
| `IressCheckbox` | `IressFormField` | `render={({ value, ...controlledProps }) => ( <IressCheckbox {...controlledProps}>I agree to the terms and conditions</IressCheckbox> )}` |
| `IressAutocomplete` | `IressFormField` | `render={(controlledProps) => ( <IressAutocomplete {...controlledProps} options={searchStarWarsCharacters} /> )}` |
| `IressSlider` | `IressFormField` | `render={(controlledProps) => <IressSlider {...controlledProps} />}` |
| `IressTagInput` | `IressFormField` | `render={(controlledProps) => <IressTagInput {...controlledProps} />}` |

#### Supplementary content

The `renderSupplementary` prop allows you to render additional content alongside the field that has access to the field props and state. This is useful for displaying dynamic information such as character counters, password strength meters, or custom help text that responds to user input.

The render function receives two arguments:

1. `field`: An object containing the field props (id, name, value, onChange, onBlur, ref)
2. `state`: An object containing the field state (fieldState, formState)

Common use cases include:

- **Character counters**: Display the current character count and maximum allowed
- **Password strength indicators**: Show password strength based on the current value
- **Dynamic hints**: Provide contextual help based on the field value
- **Custom validation feedback**: Display real-time validation feedback separate from error messages

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressText,
} from '@iress-oss/ids-components';

export function FormFieldSupplementary() {
  return (
    <IressForm>
      <IressFormField
        label="Comment"
        name="comment"
        hint="Enter your feedback (max 200 characters)"
        render={(controlledProps) => (
          <IressInput
            {...controlledProps}
            rows={3}
            maxLength={200}
            placeholder="Type your comment here..."
          />
        )}
        renderSupplementary={({ value }) => (
          <IressText textStyle="typography.body.sm" color="muted">
            {(value as string)?.length || 0} / 200 characters
          </IressText>
        )}
        rules={{
          maxLength: {
            value: 200,
            message: 'Comment must not exceed 200 characters',
          },
        }}
      />
    </IressForm>
  );
}
```

#### Rules

Use the `rules` prop on the `IressFormField` component to add validation rules. These are based on the [rules available in React Hook Forms](https://www.react-hook-form.com/api/useform/register/#options). The following rules are supported.

**Note:** In version 5, you can no longer override default error messages for the whole form. To override the default messages, you must specify them in the `rules` prop per `IressFormField`.

##### `required`

A boolean which, if `true`, indicates that the input must have a value before the form can be submitted. You can assign a string to return a custom error message.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `required` rule works with all form controls (Input, Select, Checkbox, etc.).
 * Pass `true` for the default message, or a string for a custom message.
 */
export function FormRuleRequired() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        rules={{ required: true }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        rules={{ required: 'Please check this field' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `maxLength`

The maximum character length of the value to accept for this input.

**Notes**

- For `IressInput`, you should also set the `maxLength` to stop the user from entering more characters than allowed.
- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `maxLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMaxLength() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a maximum of 5 characters"
        rules={{ maxLength: 5 }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a maximum of 5 characters"
        rules={{
          maxLength: {
            value: 5,
            message: 'Please enter a max of 5 characters!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `minLength`

The minimum character length of the value to accept for this input.

**Notes**

- For `IressInput`, you should also set the `minLength` to stop the user from entering more characters than allowed.
- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `minLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMinLength() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a minimum of 7 characters"
        rules={{ minLength: 7 }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a minimum of 7 characters"
        rules={{
          minLength: {
            value: 7,
            message: 'Please enter a min of 7 characters!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `max`

The maximum number to accept for this input.

**Notes**

- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `maxLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMaxLength() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a maximum of 5 characters"
        rules={{ maxLength: 5 }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a maximum of 5 characters"
        rules={{
          maxLength: {
            value: 5,
            message: 'Please enter a max of 5 characters!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `min`

The minimum number to accept for this input.

**Notes**

- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `minLength` rule works with text-based controls (Input, InputCurrency).
 */
export function FormRuleMinLength() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a minimum of 7 characters"
        rules={{ minLength: 7 }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a minimum of 7 characters"
        rules={{
          minLength: {
            value: 7,
            message: 'Please enter a min of 7 characters!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `pattern`

The accepted regex pattern for the input.

**Notes**

- Only applies to: `IressAutocomplete`, `IressInput`, `IressRadioGroup` and `IressSelect`.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `pattern` rule works with text-based controls. Uses a regex to validate input.
 */
export function FormRulePattern() {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a valid email address"
        rules={{ pattern: emailRegex }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a valid email address"
        rules={{
          pattern: {
            value: emailRegex,
            message: 'Please enter a valid email address!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `minDate`

The minimum date to accept for this input.

**Note:** This is a custom rule created for `IressForm` and its sub-components. It will translate the rule into a `validate` rule for react-hook-forms. It will not work with a `validate` function, only if you set the `validate` prop to an `object` of functions.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `minDate` rule works with date inputs. Validates that the date is after the specified value.
 */
export function FormRuleMinDate() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a date after today"
        rules={{ minDate: new Date() }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} type="date" />
        )}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a date after today"
        rules={{
          minDate: {
            value: new Date(),
            message: 'Please enter a date after today!',
          },
        }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} type="date" />
        )}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `maxDate`

The maximum date to accept for this input.

**Note:** This is a custom rule created for `IressForm` and its sub-components. It will translate the rule into a `validate` rule for react-hook-forms. It will not work with a `validate` function, only if you set the `validate` prop to an `object` of functions.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `maxDate` rule works with date inputs. Validates that the date is before the specified value.
 */
export function FormRuleMaxDate() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter a date before today"
        rules={{ maxDate: new Date() }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} type="date" />
        )}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter a date before today"
        rules={{
          maxDate: {
            value: new Date(),
            message: 'Please enter a date before today!',
          },
        }}
        render={(controlledProps) => (
          <IressInput {...controlledProps} type="date" />
        )}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `email`

Ensures the input is a valid email address.

**Note:** This is a custom rule created for `IressForm` and its sub-components. It will translate the rule into a `validate` rule for react-hook-forms. It will not work with a `validate` function, only if you set the `validate` prop to an `object` of functions.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `email` rule is a shorthand for email validation. Works with text-based controls.
 */
export function FormRuleEmail() {
  return (
    <IressForm>
      <IressFormField
        label="Default message"
        name="default"
        hint="Enter an email address"
        rules={{ email: true }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Custom message"
        name="custom"
        hint="Enter an email address"
        rules={{ email: 'Please enter a valid email address!' }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

##### `validate`

You can pass a callback function as the argument to validate, or you can pass an object of callback functions to validate against all of them. This function will be executed on its own without depending on other validation rules included.

**Notes**

- for `object` or `array` input data, it's recommended to use the validate function for validation as the other rules mostly apply to `string`, `string[]`, `number` and `boolean` data types.

```tsx
import {
  IressForm,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';

/**
 * The `validate` rule allows custom validation functions. Works with all form controls.
 * Return `true` for valid, or a string message for invalid.
 */
export function FormRuleValidate() {
  return (
    <IressForm>
      <IressFormField
        label="Must contain 'hello'"
        name="default"
        hint="Type something containing 'hello'"
        rules={{
          validate: {
            containsHello: (value: string) =>
              value?.includes('hello') || 'Value must contain "hello"',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressFormField
        label="Must be Google"
        name="custom"
        hint="Type 'Google' to pass"
        rules={{
          validate: {
            isGoogle: (value: string) =>
              value === 'Google' || 'Only Google is accepted!',
          },
        }}
        render={(controlledProps) => <IressInput {...controlledProps} />}
      />
      <IressButton type="submit" mode="primary">
        Validate
      </IressButton>
    </IressForm>
  );
}
```

#### Handling submission

When the form passes validation (if not disabled), the `onSubmit` event is emitted. Its event details contain a map of the field names and the data entered by the user.

```tsx
import {
  IressTable,
  IressForm,
  IressModal,
  IressFormField,
  IressInput,
  IressButton,
} from '@iress-oss/ids-components';
import { useState } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export function FormSubmission() {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState<FieldValues | undefined>(
    undefined,
  );

  return (
    <IressForm
      onSubmit={(data) => {
        setSubmitted(data);
        setShowModal(true);
      }}
    >
      <IressFormField
        label="Name"
        name="name"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          required: 'Name is required',
        }}
      />
      <IressFormField
        label="Email address"
        name="email"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          minLength: {
            message: 'Use a longer email address',
            value: 6,
          },
          required: 'Email is required',
        }}
      />
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
      <IressModal
        show={showModal}
        onShowChange={setShowModal}
        onExited={() => setSubmitted(undefined)}
      >
        <IressTable
          caption="Submitted details"
          rows={Object.entries(submitted ?? {}).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </IressForm>
  );
}
```

#### Pre-fill the form

You can set the `defaultValues` prop to pre-fill the form values.

```tsx
<IressForm
  pattern="short"
  defaultValues={{
    name: 'Luke Skywalker',
    email: 'luke.skywalker@iress.com',
  }}
/>;
```

#### Custom error handling

The `onError` prop allows you to listen to any field errors. It takes two arguments. The first is a map of the field name and an object containing the first error message and type. The second is a ref to the original element that caused the error (the ref of the underlying input).

One use case for this prop is to create your own visible error summary at the top of the form, or to log errors to an external service.

```tsx
import {
  IressTable,
  IressForm,
  IressModal,
  IressStack,
  IressFormField,
  IressInput,
  IressButton,
  IressText,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import { type FieldErrors } from 'react-hook-form';

interface FieldValues {
  name?: string;
  email?: string;
}

export function CustomErrorHandlingForm() {
  const [errors, setErrors] = useState<FieldErrors<FieldValues> | undefined>(
    undefined,
  );

  return (
    <IressForm onError={(data) => setErrors(data)}>
      <IressText mb="md">
        <h2>Custom error handling</h2>
        <p>
          Demonstrates usage of the <code>onError</code> prop to show a modal
          when there are issues with the form.
        </p>
      </IressText>
      <IressFormField
        label="Name"
        name="name"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          required: 'Name is required',
        }}
      />
      <IressFormField
        label="Email address"
        name="email"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          minLength: {
            message: 'Use a longer email address',
            value: 6,
          },
          required: 'Email is required',
        }}
      />
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
      <IressModal
        show={!!errors}
        onShowChange={(show) => !show && setErrors(undefined)}
      >
        <IressTable
          caption="Errors"
          rows={Object.entries(errors ?? {}).map(([name, errorDetails]) => ({
            name,
            errorDetails: (
              <IressStack gap="sm">
                <ul>
                  <li>Error type: {String(errorDetails?.type)}</li>
                  <li>Error message: {String(errorDetails?.message)}</li>
                </ul>
              </IressStack>
            ),
          }))}
        />
      </IressModal>
    </IressForm>
  );
}
```

#### `values`

If you would like more control over each value of the form, you should use the `values` prop. This will make the form controlled, meaning it will rely completely on the `values` state to render the value of each field. You will need to use the `onSubmit` prop to sync the form value with your state.

Use cases where you may need the `values` prop:

- Syncing with a server once the values have been processed
- Syncing the value with browser storage

**Note:** `values` takes precedence over `defaultValues`. To ensure your form state is predictable, it is best to only use one prop to manage form values.

```tsx
import {
  IressForm,
  IressModal,
  IressDivider,
  IressButton,
  IressTable,
  IressInline,
  IressFormField,
  IressInput,
} from '@iress-oss/ids-components';
import { useState } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export function ControlledForm() {
  const [values, setValues] = useState<FieldValues>({
    name: 'Leia Skywalker',
    email: 'leia.skywalker@iress.com',
  });
  const [preview, setPreview] = useState(false);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          setValues(data);
          setPreview(true);
        }}
        values={values}
        mode="onChange"
      >
        <IressFormField
          label="Name"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            required: 'Name is required',
          }}
        />
        <IressFormField
          label="Email address"
          name="email"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            minLength: {
              message: 'Use a longer email address',
              value: 6,
            },
            required: 'Email is required',
          }}
        />
      </IressForm>
      <IressDivider my="md" />
      <IressInline gap="sm">
        <IressButton onClick={() => setPreview(true)}>Last update</IressButton>
        <IressButton
          onClick={() =>
            setValues({
              name: '',
              email: '',
            })
          }
        >
          Clear
        </IressButton>
      </IressInline>
      <IressModal show={!!preview} onShowChange={(show) => setPreview(show)}>
        <IressTable
          caption="Last update"
          rows={Object.entries(values).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </>
  );
}
```

#### Disable validation

Disabling validation is not possible with the `IressForm` component. In cases where you do need to disable validation, please consider the following:

1. Use a non-submitting button to save a draft (eg. `<IressButton type="button">Save as draft</IressButton>`). Then you can use the `ref` of the form to get the form data.
2. Use a native `form` element, and customise the error handling.

Here we have an example showcasing option one.

```tsx
import {
  type FormRef,
  IressButton,
  IressDivider,
  IressForm,
  IressFormField,
  IressInput,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';
import { useRef } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

const Form = () => {
  const { success, error } = useToaster();
  const formRef = useRef<FormRef<FieldValues>>(null);

  return (
    <>
      <IressForm
        onSubmit={() =>
          success({
            heading: 'Passed validation',
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          })
        }
        onError={() =>
          error({
            heading: 'Failed validation',
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          })
        }
        ref={formRef}
      >
        <IressFormField
          label="Name"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            required: 'Name is required',
          }}
        />
        <IressFormField
          label="Email address"
          name="email"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            minLength: {
              message: 'Use a longer email address',
              value: 6,
            },
            required: 'Email is required',
          }}
        />
      </IressForm>
      <IressDivider my="md" />
      <IressButton
        onClick={() => {
          success({
            heading: 'Saved as draft (no validation)',
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          });
        }}
      >
        Save as draft
      </IressButton>
    </>
  );
};

export function DisableValidationForm() {
  return (
    <IressToasterProvider>
      <Form />
    </IressToasterProvider>
  );
}
```

#### Resetting the form

You can reset the form using the `ref` of the form. You must provide a `defaultValues` prop that contains all the fields in the form to ensure it resets properly.

**Note:** `<button type="reset" />` does not work with `IressForm`. You need to add an `onClick` prop to the button and use the `ref.reset` method to reset the form.

```tsx
import {
  IressForm,
  type FormRef,
  IressDivider,
  IressButton,
  IressFormField,
  IressInput,
} from '@iress-oss/ids-components';
import { useRef } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export function FormReset() {
  const ref = useRef<FormRef<FieldValues>>(null);

  return (
    <IressForm ref={ref}>
      <IressFormField
        label="Name"
        name="name"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          required: 'Name is required',
        }}
      />
      <IressFormField
        label="Email address"
        name="email"
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{
          minLength: {
            message: 'Use a longer email address',
            value: 6,
          },
          required: 'Email is required',
        }}
      />
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
      <IressDivider my="md" />
      <IressButton type="reset" onClick={() => ref.current?.reset()}>
        Reset
      </IressButton>
    </IressForm>
  );
}
```

#### `IressHookForm`

`IressHookForm` is the underlying component that `IressForm` is built upon. It has a single required prop, `form`, which expects the return value of the `useForm` hook from React Hook Forms.

It has been exposed to consumers to allow you to have complete control of your React Hook Forms instance whilst still taking advantage of the IDS form components.

Some use cases:

1. You may need to use the `useForm` hook in a parent component to share the form state with multiple child components.
2. You would like to use the return value of the `useForm` hook without having to use a ref to access the `react-hook-form` api.

```tsx
import {
  IressButton,
  IressCheckbox,
  IressContainer,
  IressDivider,
  IressFormField,
  IressHookForm,
  IressInput,
  IressInputCurrency,
  IressPanel,
  IressText,
} from '@iress-oss/ids-components';
import { useForm } from 'react-hook-form';

interface FieldValues {
  firstName: string;
  lastName: string;
  insuredAtPolicyLevel?: boolean;
  sumInsured?: number;
  sumInsured_na?: string;
}

export const HookFormExample = () => {
  const initialInsuredAtPolicyLevel = false;
  const initialSumInsured = 5000;

  const form = useForm<FieldValues>();
  const { watch, control } = form;

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const insuredAtPolicyLevel = watch('insuredAtPolicyLevel');

  return (
    <IressContainer>
      <IressText>
        <h2>Hook Form Example</h2>
        <p>
          This example demonstrates how to use the <code>IressHookForm</code>{' '}
          component to create a form with controlled fields and conditional
          rendering based on form values.
        </p>
        <IressHookForm form={form}>
          {firstName && lastName && (
            <IressPanel mb="md" bg="alt">
              Name: {firstName} {lastName}
            </IressPanel>
          )}
          <IressFormField
            name="firstName"
            label="First Name"
            render={(controlledProps) => <IressInput {...controlledProps} />}
            rules={{ required: true }}
          />
          <IressFormField
            name="lastName"
            label="Last Name"
            render={(controlledProps) => (
              <IressInput {...controlledProps} type="email" />
            )}
            rules={{ required: true }}
          />
          <IressDivider mt="lg" mb="md" />
          <IressFormField
            name="insuredAtPolicyLevel"
            defaultChecked={initialInsuredAtPolicyLevel}
            label="Insurance options"
            control={control}
            render={(controlledProps) => (
              <IressCheckbox {...controlledProps}>
                Insured at policy level
              </IressCheckbox>
            )}
          />
          {insuredAtPolicyLevel && (
            <IressFormField
              name="sumInsured"
              defaultValue={initialSumInsured}
              label="Sum insured"
              control={control}
              render={(controlledProps) => (
                <IressInputCurrency {...controlledProps} currencyCode="GBP" />
              )}
            />
          )}
          {!insuredAtPolicyLevel && (
            <IressFormField
              name="sumInsured_na"
              defaultValue="N/A"
              label="Sum insured"
              control={control}
              render={(properties) => <IressInput {...properties} readOnly />}
            />
          )}
          <IressButton type="submit" mode="primary">
            Submit
          </IressButton>
        </IressHookForm>
      </IressText>
    </IressContainer>
  );
};
```

#### `IressFormValidationSummary`

`IressFormValidationSummary` is the error summary component that is added to the top of the form for screen readers to announce validation errors. It is automatically added to the form when there are validation errors, but you can also use it independently to create your own error summary, usually used if you want a visible error summary at the top of the form.

```tsx
<IressFormValidationSummary />;
```

#### With readonly data

You can use `IressForm` with readonly data by setting the `readOnly` prop to `true` on controlled elements. This will disable those form controls, but will include the values in the form submission.

Please take note of the following when displaying read only data.

- It is best to keep readonly data in a separate section of the form, to further avoid confusion with editable fields.

```tsx
import {
  IressButton,
  IressCol,
  IressContainer,
  IressDivider,
  IressForm,
  IressFormField,
  IressInput,
  IressModal,
  IressRow,
  IressTable,
  IressText,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import { type FieldValues } from 'react-hook-form';

export const WithReadonlyDataForm = () => {
  const [values, setValues] = useState<FieldValues>({
    firstName: 'Leia',
    lastName: 'Skywalker',
    email: 'leia.skywalker@iress.com',
  });
  const [preview, setPreview] = useState(false);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          setValues(data);
          setPreview(true);
        }}
        values={values}
      >
        <IressContainer>
          <IressText element="h2">User Details</IressText>
          <IressRow gutter="md">
            <IressCol>
              <IressFormField
                name="firstName"
                label="First Name"
                render={(controlledProps) => (
                  <IressInput {...controlledProps} readOnly />
                )}
                mb="none"
              />
            </IressCol>
            <IressCol>
              <IressFormField
                name="lastName"
                label="Last Name"
                render={(controlledProps) => (
                  <IressInput {...controlledProps} readOnly />
                )}
                mb="none"
              />
            </IressCol>
          </IressRow>
          <IressDivider my="spacing.4" />
          <IressFormField
            name="email"
            label="Email"
            render={(controlledProps) => (
              <IressInput {...controlledProps} type="email" />
            )}
          />
          <IressButton type="submit" mode="primary">
            Submit
          </IressButton>
        </IressContainer>
      </IressForm>
      <IressModal show={!!preview} onShowChange={(show) => setPreview(show)}>
        <IressTable
          caption="Submitted"
          rows={Object.entries(values).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </>
  );
};
```

#### Switching between readonly and edit modes

It is recommended to use a button to toggle between read-only and editable input modes.

Please take note of the following when switching between modes:

- Switching is done on a per-section basis, not on a per-field basis.
- When the user saves the data, it should switch back to read-only mode to avoid any confusion about whether the changes have been saved.

```tsx
import {
  IressButton,
  IressCol,
  IressContainer,
  IressForm,
  IressFormField,
  IressIcon,
  IressInline,
  IressInput,
  IressRow,
  IressSelect,
  IressText,
  IressToasterProvider,
  useToaster,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import { type FieldValues } from 'react-hook-form';

const Form = () => {
  const dependentOptions = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];
  const [values, setValues] = useState<FieldValues>({
    firstName: 'Leia',
    lastName: 'Skywalker',
    email: 'leia.skywalker@iress.com',
    dependents: 0,
  });
  const [editable, setEditable] = useState(false);
  const { success } = useToaster();

  return (
    <IressForm
      onSubmit={(data) => {
        setValues(data);
        setEditable(false);
        success({
          content: 'Saved successfully',
        });
      }}
      values={values}
    >
      <IressContainer>
        <IressText element="h2" mb="spacing.4">
          User Details
        </IressText>
        <IressRow gutter="md">
          <IressCol>
            <IressFormField
              name="firstName"
              label="First Name"
              render={(controlledProps) => (
                <IressInput {...controlledProps} readOnly={!editable} />
              )}
            />
          </IressCol>
          <IressCol>
            <IressFormField
              name="lastName"
              label="Last Name"
              render={(controlledProps) => (
                <IressInput {...controlledProps} readOnly={!editable} />
              )}
            />
          </IressCol>
        </IressRow>
        <IressRow gutter="md">
          <IressCol>
            <IressFormField
              name="email"
              label="Email"
              render={(controlledProps) => (
                <IressInput
                  {...controlledProps}
                  readOnly={!editable}
                  type="email"
                />
              )}
            />
          </IressCol>
          <IressCol>
            <IressFormField
              name="dependents"
              label="Dependents"
              render={(controlledProps) => (
                <IressSelect
                  {...controlledProps}
                  readOnly={!editable}
                  options={dependentOptions}
                />
              )}
            />
          </IressCol>
        </IressRow>
        {editable ? (
          <IressInline gap="sm">
            <IressButton type="submit" mode="primary">
              Save
            </IressButton>
            <IressButton onClick={() => setEditable(false)}>Cancel</IressButton>
          </IressInline>
        ) : (
          <IressButton
            onClick={() => setEditable(true)}
            prepend={<IressIcon name="pencil" />}
          >
            Edit
          </IressButton>
        )}
      </IressContainer>
    </IressForm>
  );
};

export const SwitchEditReadonlyForm = () => (
  <IressToasterProvider>
    <Form />
  </IressToasterProvider>
);
```

#### Nested forms

Unfortunately, it is [forbidden to nest form elements as per the HTML specifications](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form).

To achieve a similar effect, you can use multiple `IressForm` components, and trigger validation in multiple ways:

1. You can trigger specific forms using the `form` attribute of `IressButton`. The [`form` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#form) allows you to specify the form ID to submit when the button is clicked, which can be any form on the page, and will take precedence over the parent form of a button.
2. If you need to trigger multiple forms, you can use the [`requestSubmit` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit) on the form element to trigger the validation of multiple forms.
3. If you only want to trigger validation and not trigger submission even if the validation passes, you can use the `ref` attribute of `IressForm` and trigger validation manually using `ref.current?.api.trigger()`, which is based on the [React Hook Form API](https://react-hook-form.com/docs/useform/trigger).

The example here showcases triggering validation using the `form` attribute of `IressButton` and the `requestSubmit` method on the form element.

```tsx
import {
  IressButton,
  IressDivider,
  IressFieldGroup,
  IressForm,
  IressFormField,
  IressFormValidationSummary,
  IressInline,
  IressInput,
  IressModal,
  IressPanel,
  IressStack,
  IressTable,
} from '@iress-oss/ids-components';
import { useState } from 'react';

interface FormData {
  name: string;
}

const MainForm = () => {
  const [details, setDetails] = useState<FormData | undefined>();

  return (
    <>
      <IressForm<FormData>
        alert={
          <IressFormValidationSummary heading="Please fix the errors for the main form" />
        }
        id="mainForm"
        onSubmit={(data) => {
          setDetails(data);
        }}
      >
        <IressFormField<FormData>
          name="name"
          label="Name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
      </IressForm>
      <IressModal
        show={!!details}
        onShowChange={(show) => !show && setDetails(undefined)}
      >
        {details && (
          <IressTable
            caption="Submitted main form"
            rows={Object.entries(details).map((entry) => ({
              name: entry[0],
              value: JSON.stringify(entry[1], null, 2),
            }))}
          />
        )}
      </IressModal>
    </>
  );
};

const SubForm = () => {
  const [details, setDetails] = useState<FormData | undefined>();

  return (
    <IressPanel bg="alt">
      <IressStack gap="md">
        <IressForm<FormData>
          alert={
            <IressFormValidationSummary heading="Please fix the errors for the dependants" />
          }
          id="subForm"
          onSubmit={(data) => {
            setDetails(data);
          }}
        >
          <IressFieldGroup label="Add new dependant" inline mb="none">
            <IressFormField
              name="name"
              label="Name"
              render={(controlledProps) => <IressInput {...controlledProps} />}
              rules={{ required: true }}
            />
            <IressButton type="submit">Save</IressButton>
          </IressFieldGroup>
        </IressForm>
        <IressTable
          caption="Dependants"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'value', label: 'Value' },
          ]}
          rows={Object.entries(details ?? {}).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressStack>
    </IressPanel>
  );
};

export const NestedFormsExample = () => {
  const submitAllForms = () => {
    document.querySelector<HTMLFormElement>('[id=mainForm]')?.requestSubmit();
    document.querySelector<HTMLFormElement>('[id=subForm]')?.requestSubmit();
  };

  return (
    <IressStack gap="md">
      <MainForm />
      <SubForm />
      <IressDivider />
      <IressInline gap="md">
        <IressButton type="submit" form="mainForm">
          Submit main form
        </IressButton>
        <IressButton onClick={submitAllForms}>Submit all forms</IressButton>
      </IressInline>
    </IressStack>
  );
};
```

#### Form groups

Powered by [React Hook Form](https://react-hook-form.com/docs/usefieldarray)'s `useFieldArray`, this example allows you add/edit/delete multiple children sections within ONE form (not nested form).

```tsx
import {
  IressButton,
  IressDivider,
  IressFieldGroup,
  IressFormField,
  IressInline,
  IressInput,
  IressPanel,
  IressText,
  IressIcon,
  IressCloseButton,
  IressHookForm,
} from '@iress-oss/ids-components';
import {
  useFieldArray,
  useForm,
  type Control,
  type UseFormGetValues,
} from 'react-hook-form';

interface Client {
  name: string | undefined;
  salary: number | undefined;
  goal: string | undefined;
}

interface Dependant {
  name: string | undefined;
  relationship: string | undefined;
  age: number | undefined;
}

interface FormValues {
  client: Client;
  dependants: Dependant[];
}

interface ClientProps {
  control: Control<FormValues> | undefined;
}

interface DependantProps {
  index: number;
  control: Control<FormValues> | undefined;
  update: (index: number, data: Dependant) => void;
  remove: (index: number) => void;
  getValues: UseFormGetValues<FormValues>;
}

const defaultValues = {
  client: {
    name: '',
    salary: undefined,
    goal: '',
  },
  dependants: [
    {
      name: '',
      relationship: '',
      age: undefined,
    },
  ],
};

const ClientSection: React.FC<ClientProps> = ({ control }) => {
  return (
    <IressFieldGroup label="Client" inline mb="none">
      <IressFormField
        name="client.name"
        label="Name"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
      <IressFormField
        name="client.salary"
        label="Salary"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
      <IressFormField
        name="client.goal"
        label="Goal"
        control={control}
        render={(controlledProps) => <IressInput {...controlledProps} />}
        rules={{ required: true }}
      />
    </IressFieldGroup>
  );
};

const DependantSection: React.FC<DependantProps> = ({
  index,
  update,
  remove,
  control,
  getValues,
}: DependantProps) => {
  return (
    <IressPanel bg="alt" noBorder mb="spacing.4">
      <IressInline horizontalAlign="right">
        <IressCloseButton
          onClick={() => remove(index)}
          mb="-lg"
          style={{ zIndex: 1 }}
        />
      </IressInline>
      <IressFieldGroup label={`Dependant ${index + 1}`} inline mb="none">
        <IressFormField
          name={`dependants.${index}.name`}
          label="Name"
          control={control}
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
        <IressFormField
          name={`dependants.${index}.relationship`}
          label="Relationship"
          control={control}
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
        <IressFormField
          name={`dependants.${index}.age`}
          label="Age"
          control={control}
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
        <IressButton
          type="button"
          prepend={<IressIcon name="check" />}
          onClick={() => {
            const data = getValues();
            const value = data?.dependants[index];
            update(index, value);
          }}
        >
          Save
        </IressButton>
      </IressFieldGroup>
    </IressPanel>
  );
};

export const FormGroups = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const { control, getValues } = form;

  const { fields, append, update, remove } = useFieldArray({
    name: 'dependants',
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <IressText>
      <h1>Form groups</h1>
      <p>
        This is one form with child sections (not nested forms). Play around to
        add/edit/delete child form sections:
      </p>
      <IressHookForm<FormValues> id="mainForm" form={form} onSubmit={onSubmit}>
        <ClientSection control={control} />
        {fields.map((field, index) => (
          <DependantSection
            key={field.id}
            index={index}
            control={control}
            update={update}
            remove={remove}
            getValues={getValues}
          />
        ))}
        <IressButton
          type="button"
          prepend={<IressIcon name="plus" />}
          onClick={() => {
            append({ name: '', relationship: '', age: undefined });
          }}
          status="success"
        >
          Add Dependant
        </IressButton>
        <IressDivider my="md" />
        <IressButton type="submit" mode="primary">
          Submit All
        </IressButton>
      </IressHookForm>
    </IressText>
  );
};
```

#### Conditional fields (`useWatch`)

When you have fields that are conditionally shown, you can use the `useWatch` hook to watch the value of another field and conditionally render the field.

**Notes:**

- You can use the `api.watch` method on the `IressForm`'s ref to watch the value of a field, but it is recommended to use the hook for better performance by isolating re-rendering at the component level.

```tsx
import {
  IressCheckbox,
  IressCheckboxGroup,
  IressForm,
  IressFormField,
  IressInput,
  IressText,
} from '@iress-oss/ids-components';
import { useWatch } from 'react-hook-form';

interface FieldValues {
  show?: string[];
  name?: string;
  email?: string;
}

/**
 * Conditional fields need to be rendered in a sub-component, to allow it to use the `useWatch`
 * hook to watch the value of the field dictating the display of conditional fields.
 */
const FormSectionWithConditionalFields = () => {
  const show = useWatch<FieldValues>({ name: 'show' });

  return (
    <IressText>
      <h2>
        Conditional fields using <code>useWatch</code>
      </h2>
      <p>
        This example demonstrates how to use the <code>useWatch()</code> hook to
        watch the value of a field and conditionally render other fields based
        on that value.
      </p>
      <IressFormField
        name="show"
        label="Select fields to show"
        rules={{
          required: 'Please select at least one field to show',
        }}
        render={(controlledProps) => (
          <IressCheckboxGroup {...controlledProps} layout="inline">
            <IressCheckbox value="name">Name</IressCheckbox>
            <IressCheckbox value="email">Email</IressCheckbox>
          </IressCheckboxGroup>
        )}
      />
      {show?.includes('name') && (
        <IressFormField
          name="name"
          label="Name"
          rules={{
            required: 'Name is required',
          }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
      )}
      {show?.includes('email') && (
        <IressFormField
          name="email"
          label="Email"
          rules={{
            required: 'Email is required',
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              message: 'Please enter a valid email address',
            },
          }}
          render={(controlledProps) => (
            <IressInput {...controlledProps} type="email" />
          )}
        />
      )}
    </IressText>
  );
};

export function UseWatchForm() {
  return (
    <IressForm>
      <FormSectionWithConditionalFields />
    </IressForm>
  );
}
```

#### Validation depend on other fields

This example shows how to validate one field based on another field's value.

The budget amount input validates against the selected budget range using the custom `validateBudgetInput` rules.

```tsx
import {
  IressStack,
  IressRow,
  IressCol,
  IressFormField,
  IressInputCurrency,
  IressSelect,
  IressButton,
  IressText,
  IressDivider,
  IressHookForm,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  primaryField: string;
  dependentField: string;
}

const budgetOptions = [
  { value: 'less-than-499', label: 'Less than $499' },
  { value: 'between-500-999', label: 'Between $500 to $999' },
  { value: 'more-than-1000', label: 'More than $1000' },
];

const validateBudgetInput = (
  value: string,
  selectedBudget: string,
): string | true => {
  if (!selectedBudget) return 'Select budget range first';

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 'Enter a valid number';

  switch (selectedBudget) {
    case 'less-than-499':
      return numericValue < 499 || 'Must be less than $499';
    case 'between-500-999':
      return (
        (numericValue >= 500 && numericValue <= 999) ||
        'Must be between $500-$999'
      );
    case 'more-than-1000':
      return numericValue > 1000 || 'Must be more than $1000';
    default:
      return true;
  }
};

export const ValidationDependOnOtherFields = () => {
  const [submitted, setSubmitted] = useState<FormData | undefined>(undefined);

  const form = useForm<FormData>({
    defaultValues: {
      primaryField: '',
      dependentField: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmitted(data);
  };

  const onError = (errors: Record<string, unknown>) => {
    console.log('Form validation errors:', errors);
  };

  return (
    <>
      <IressText element="h1">Validation depend on other fields</IressText>
      <IressText element="p">
        This form demonstrates how to validate a field based on the value of
        another field. The budget amount field is validated against the selected
        budget range.
      </IressText>
      <IressHookForm form={form} onSubmit={onSubmit} onError={onError}>
        <IressStack gap="md">
          <IressRow>
            <IressCol>
              <IressFormField
                name="primaryField"
                label="Monthly investment budget"
                rules={{
                  required: 'Budget range is required',
                }}
                render={(field) => (
                  <IressSelect
                    {...field}
                    placeholder="Select your budget range"
                    options={budgetOptions}
                  />
                )}
              />
            </IressCol>
          </IressRow>
          <IressRow>
            <IressCol>
              <IressFormField
                name="dependentField"
                label="Enter your budget amount ($)"
                rules={{
                  required: 'Budget amount is required',
                  validate: (value: string, formValues: FormData) =>
                    validateBudgetInput(value, formValues.primaryField),
                }}
                render={(field) => (
                  <IressInputCurrency {...field} type="number" />
                )}
              />
            </IressCol>
          </IressRow>
          <IressButton type="submit">Submit</IressButton>
        </IressStack>
      </IressHookForm>
      <IressDivider />
      {submitted && (
        <IressStack gap="md">
          <IressText element="h3">Submitted Values</IressText>
          <IressText>
            Budget Range:{' '}
            {budgetOptions.find(
              (option) => option.value === submitted.primaryField,
            )?.label ?? submitted.primaryField}
          </IressText>
          <IressText>Budget Amount: ${submitted.dependentField}</IressText>
        </IressStack>
      )}
    </>
  );
};
```

#### Custom form field components

You can integrate custom components within `IressFormField` to create enhanced form experiences.

This demo showcases how to embed a custom `TranscriptTextBox` component into `IressFormField` while leveraging its built-in validation rules, error handling, and state management without additional implementation.

**Reminder:** When building custom form components, avoid managing error message state internally. This helps maintain the IressForm as the single source of truth and ensures consistent, predictable UI behavior.

Key features demonstrated:

- **Universal Integration Pattern**: Shows how any custom component can be embedded in IressFormField
- **Built-in Validation**: Leverages IressFormField's validation rules with custom validation logic
- **Multiple Error Messages**: Displays simultaneous validation errors (e.g., wrong file type AND too large)
- **Drag & Drop**: Files can be dragged and dropped directly onto the textarea
- **File Upload Button**: Traditional file selection via button click
- **Visual Feedback**: UI changes during drag operations with border and background updates
- **Form State Management**: Automatically integrates with form context using controlled props
- **File Management**: Display uploaded files with remove functionality using `IressPanel`

```tsx
import {
  IressButton,
  IressForm,
  IressInput,
  IressFormField,
  IressStack,
  IressIcon,
  IressText,
  IressPanel,
  IressInline,
  type IressInputProps,
} from '@iress-oss/ids-components';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface TranscriptFormValues {
  transcript: TranscriptData | string;
}

interface TranscriptData {
  content: string;
  size?: number;
  type: 'file' | 'text';
  extension?: string;
  fileName?: string;
  rejectedReasons?: REJECTION_REASONS[];
}

interface TranscriptTextBoxProps {
  value: TranscriptData | string;
  onChange: (data: TranscriptData) => void;
  placeholder?: string;
  rows?: number;
  style?: React.CSSProperties;
  allowedExtensions?: string[];
  maxSizeInMB?: number;
}

interface SubmittedValuesDisplayProps {
  submittedValues: TranscriptFormValues | null;
  title?: string;
}

enum REJECTION_REASONS {
  TYPE = 'type',
  SIZE = 'size',
}

const validateFile =
  (allowedExtensions: string[], maxSizeInMB: number) =>
  (data: TranscriptData | string) => {
    if (
      !!data &&
      typeof data === 'object' &&
      data.type === 'file' &&
      Array.isArray(data.rejectedReasons) &&
      data.rejectedReasons.length > 0
    ) {
      const errors: string[] = [];

      if (data.rejectedReasons.includes(REJECTION_REASONS.TYPE)) {
        errors.push(`Only .${allowedExtensions.join(', ')} accepted`);
      }

      if (data.rejectedReasons.includes(REJECTION_REASONS.SIZE)) {
        errors.push(`File size must be less than ${maxSizeInMB}MB`);
      }

      if (errors.length > 0) {
        return errors.join('. ');
      }
    }

    return true;
  };

const TranscriptTextBox = ({
  value,
  onChange,
  placeholder = 'Copy and paste transcripts OR drag and drop / upload recordings, transcripts or documents here (.txt format).',
  rows = 10,
  style,
  allowedExtensions = ['txt'],
  maxSizeInMB = 10,
}: TranscriptTextBoxProps) => {
  // Extract content and file info from value
  const currentData =
    typeof value === 'string'
      ? { content: value, type: 'text' as const }
      : value;
  const currentFile =
    currentData?.type === 'file' &&
    (!currentData.rejectedReasons || currentData.rejectedReasons.length === 0)
      ? {
          name: currentData.fileName ?? 'Unknown file',
          size: currentData.size,
        }
      : null;

  const createTranscriptData = (
    content: string,
    type: 'file' | 'text',
    additionalData?: Partial<TranscriptData>,
  ): TranscriptData => ({
    content,
    type,
    ...additionalData,
  });

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onChange(
        createTranscriptData(content, 'file', {
          size: file.size,
          extension: file.name.split('.').pop()?.toLowerCase(),
          fileName: file.name,
        }),
      );
    };
    reader.onerror = () => {
      // Let parent handle errors through validation
      onChange(
        createTranscriptData('', 'file', {
          fileName: file.name,
        }),
      );
    };
    reader.readAsText(file);
  };

  const handleTextChange: IressInputProps<string, number>['onChange'] = (
    _e,
    textContent = '',
  ) => {
    onChange(createTranscriptData(textContent, 'text'));
  };

  const onFileSelected = (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    handleFileRead(file);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    maxSize: maxSizeInMB * 1024 * 1024,
    accept: allowedExtensions.reduce(
      (acc, ext) => {
        const mimeType =
          ext === 'txt' ? 'text/plain' : 'application/octet-stream';
        acc[mimeType] = acc[mimeType] || [];
        acc[mimeType].push(`.${ext}`);
        return acc;
      },
      {} as Record<string, string[]>,
    ),
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles);
        return;
      }

      if (rejectedFiles.length > 0) {
        const rejectedFile = rejectedFiles[0];
        const { file, errors } = rejectedFile;

        // Map error codes to rejection reasons
        const errorCodeMap = {
          'file-invalid-type': REJECTION_REASONS.TYPE,
          'file-too-large': REJECTION_REASONS.SIZE,
        } as const;

        const rejectedReasons = errors
          .map((error) => errorCodeMap[error.code as keyof typeof errorCodeMap])
          .filter((reason): reason is REJECTION_REASONS => Boolean(reason));

        onChange(
          createTranscriptData('', 'file', {
            fileName: file.name,
            rejectedReasons,
          }),
        );
      }
    },
  });

  const handleUploadClick = () => {
    open();
  };

  const removeFile = () => {
    onChange(createTranscriptData('', 'text'));
  };

  return (
    <IressStack gap="sm">
      <div {...getRootProps()} style={{ position: 'relative' }}>
        <input {...getInputProps()} />
        <IressInput
          value={currentData?.content || ''}
          onChange={handleTextChange}
          rows={rows}
          placeholder={isDragActive ? 'Drop your file here...' : placeholder}
          style={{
            boxSizing: 'border-box',
            border: isDragActive ? '1px dashed #007acc' : undefined,
            backgroundColor: isDragActive ? '#f0f8ff' : undefined,
            ...style,
          }}
        />
      </div>

      {currentFile && (
        <IressPanel>
          <IressInline horizontalAlign="between" verticalAlign="middle">
            <IressText>📄 {currentFile.name}</IressText>
            <IressButton mode="secondary" onClick={removeFile}>
              Remove
            </IressButton>
          </IressInline>
        </IressPanel>
      )}

      <IressButton
        mode="secondary"
        onClick={handleUploadClick}
        prepend={<IressIcon name="upload" />}
        alignSelf="start"
      >
        Upload
      </IressButton>
    </IressStack>
  );
};

const SubmittedValuesDisplay: React.FC<SubmittedValuesDisplayProps> = ({
  submittedValues,
  title = 'Submitted Values:',
}) => {
  if (!submittedValues) {
    return null;
  }

  return (
    <IressPanel>
      <IressStack gap="sm">
        <IressText textStyle="typography.body.md.strong">{title}</IressText>
        <IressText>
          <strong>Type:</strong>
          {typeof submittedValues.transcript === 'string'
            ? 'text'
            : submittedValues.transcript.type}
        </IressText>
        <IressText>
          <strong>Content:</strong>
          {typeof submittedValues.transcript === 'string'
            ? submittedValues.transcript
            : submittedValues.transcript.content}
        </IressText>
        {typeof submittedValues.transcript === 'object' &&
          submittedValues.transcript.fileName && (
            <IressText>
              <strong>File Name:</strong> {submittedValues.transcript.fileName}
            </IressText>
          )}
        {typeof submittedValues.transcript === 'object' &&
          submittedValues.transcript.size && (
            <IressText>
              <strong>File Size:</strong>
              {(submittedValues.transcript.size / 1024).toFixed(2)} KB
            </IressText>
          )}
      </IressStack>
    </IressPanel>
  );
};

const Heading = () => {
  return (
    <>
      <IressText element="h1">Custom FormField Components</IressText>
      <IressText element="p">
        This demo showcases how to embed any custom component
        (TranscriptTextBox) into IressFormField while leveraging its form
        validation, error handling, and state management without additional
        implementation. When building custom form components, avoid managing
        error message state internally. This helps maintain the IressForm as the
        single source of truth and ensures consistent, predictable UI behavior.
      </IressText>
    </>
  );
};

export const CustomFormFieldComponents = () => {
  const [submittedValues, setSubmittedValues] =
    useState<TranscriptFormValues | null>(null);
  const allowedExtensions = ['txt'];
  const maxSizeInMB = 0.1;

  const handleSubmit = (data: TranscriptFormValues) => {
    setSubmittedValues(data);
    console.log('Form submitted:', data);
  };

  return (
    <>
      <Heading />
      <IressForm<TranscriptFormValues>
        mode="onChange"
        onSubmit={handleSubmit}
        defaultValues={{ transcript: { content: '', type: 'text' } }}
      >
        <IressFormField
          label="Transcript"
          name="transcript"
          hint="Upload or copy and paste transcript here"
          render={(controlledProps) => (
            <TranscriptTextBox
              {...controlledProps}
              allowedExtensions={allowedExtensions}
              maxSizeInMB={maxSizeInMB}
            />
          )}
          rules={{
            required: 'Transcript is required',
            validate: {
              file: validateFile(allowedExtensions, maxSizeInMB),
            },
          }}
        />
        <IressButton type="submit" mode="primary">
          Submit
        </IressButton>
        <SubmittedValuesDisplay submittedValues={submittedValues} />
      </IressForm>
    </>
  );
};
```

#### Sanitising input

When sending user input to a server or third-party API, it is important to
sanitise the data to prevent cross-site scripting (XSS) attacks. This example
uses [DOMPurify](https://github.com/cure53/DOMPurify) to recursively strip
malicious HTML from all string values in the form data before submission.

Install DOMPurify in your project:

```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

```tsx
import {
  IressAlert,
  IressButton,
  IressForm,
  IressFormField,
  IressInput,
} from '@iress-oss/ids-components';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';

const sanitiseDeep = (value: unknown): unknown => {
  if (typeof value === 'string') return DOMPurify.sanitize(value);
  if (Array.isArray(value)) return value.map(sanitiseDeep);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, sanitiseDeep(v)]),
    );
  }
  return value;
};

export const SanitisedInputForm = () => {
  const [sanitisedData, setSanitisedData] = useState<FieldValues | null>(null);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          const clean = sanitiseDeep(data) as FieldValues;
          setSanitisedData(clean);
          console.log('Sanitised form data:', clean);
        }}
      >
        <IressFormField
          label="Name"
          name="name"
          rules={{ required: 'Name is required' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Bio"
          name="bio"
          hint="Try entering HTML like <img src=x onerror=alert(1)> to see it sanitised"
          rules={{ required: 'Bio is required' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton mode="primary" type="submit">
          Submit
        </IressButton>
      </IressForm>
      {sanitisedData && (
        <IressAlert
          status="success"
          heading="Sanitised output"
          mt="lg"
          multiLine
        >
          <pre>{JSON.stringify(sanitisedData, null, 2)}</pre>
        </IressAlert>
      )}
    </>
  );
};
```

### Testing

Unfortunately due to the asynchronous nature of React Hook Form validation, `IressForm` still needs to be tested using `screen.findBy` queries (at least in the first query after render). If `findBy` is not used, you will start to see the dreaded `act warnings`. For more information on testing IressForm, please refer to the (React Hook Form testing documentation)[https://react-hook-form.com/advanced-usage#TestingForm]

Here is an example of testing a form submission.

```tsx
render(
  <IressForm>
    <IressFormField
      label="Email"
      name="email"
      rules={{ required: true }}
      render={(controlledProps) => (
        <IressInput {...controlledProps} type="email" />
      )}
    />
    <IressButton type="submit">Submit</IressButton>
  </IressForm>,
);

// May be needed sometimes to get over the act warning
await screen.findByRole('form');

const emailInput = screen.getByRole('textbox');
const submitButton = screen.getByRole('button', { name: 'Submit' });

await userEvent.click(submitButton);

// Errors are asynchronous, so we need to wait for them to appear
const summaryError = await screen.findByText(
  'There was a problem submitting this form',
);
expect(summaryError).toBeInTheDocument();
```

[View test roles/IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs#testing)

### Caveats

#### Properly resetting fields

When resetting fields that accept non-string values (like `IressSelect`), you should reset them to `null` or `undefined` instead of an empty string. This is because the underlying component is strictly typed and expects a specific value type.

**Problem:**

```tsx
const { resetField } = useFormContext();

resetField('rich-select', {
  label: '',
  value: '',
});
```

In this case, it will look like it cleared the field, but actually it has not. This is obvious with a `placeholder` set, as it will not show the placeholder.

**Solution:**
Override the `onChange` handler to pass the actual value as a second parameter:

```tsx
const { resetField } = useFormContext();

resetField('rich-select', null); // or undefined
```

This will properly reset the field to null and clear the field value.

---

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs)

## Specifications

### Behaviour

- Initial form validation is done when the user first submits the form. This allows them to focus on entering data without being overwhelmed by validation errors.
- If there are validation errors on submission, they will be shown at the form level as a summary, as well as per field. Only the first failing error will be displayed per field.
- After the first submission, fields are validated on change, to provide users instant feedback as they are now at the validation phase.

**Note:** The default user experience regarding validation is different to previous versions of IDS. This change was done to align IDS with the typical user experience found in other applications. If you would like to change the behaviour to be more consistent with the original IDS, set the `mode` prop of the form to `onBlur`.

### Migration to version 5 and beyond

The previous form components contained a lot of logic to translate the HTML5 validation API to a format that matched the design system's guidelines. This allowed users to use the default props of input such as `pattern` and `required`, and be assured that the `IressField` would display errors accordingly.

Although this worked for simple forms, it did not work for forms which had complex business requirements. This was due to the logic inside the form components being hard to override. Additionally, it was seemingly impossible to implement the business requirements using the HTML5 validation API, which itself is very restricted.

In version 5 we have decided to provide two alternative methods of using form components to better accommodate our consumer's needs.

The validation logic has been stripped from all of the existing form components. They are now closer to their native implementation, with a few customisations to match the IDS guidelines. IressField has transformed into a layout component to allow you to lay out form fields consistent with IDS guidelines, using your own validation tools.

Automated validation is now solely contained in `IressForm` and `IressFormField`, using [React Hook Form](https://react-hook-form.com/docs/useform) under the hood to simplify maintenance.

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-form--docs)
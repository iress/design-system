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

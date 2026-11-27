# IDS Migration

> 3 docs

---

# Migrating from OUI to IDS v6

This guide covers migrating from the legacy OUI component library (`@iress/oui`) to the Iress Design System v6 (`@iress-oss/ids-components`). It also covers upgrading existing IDS v4 (`@iress/components-react`) components, replacing Formik with IDS v6's React Hook Form integration, and updating your test infrastructure.

> **If you are migrating from IDS v5**, see [Migrating from v5](../migration/from-v5-to-v6.md) instead — that guide focuses on v5-to-v6 breaking changes only.

---

## Overview

### Why migrate?

| Benefit             | Details                                                            |
| ------------------- | ------------------------------------------------------------------ |
| **Consistency**     | A single component library aligned with IDS v6 standards           |
| **Accessibility**   | Improved WCAG compliance built into every component                |
| **Maintainability** | OUI and IDS v4 are legacy — IDS v6 is actively maintained          |
| **TypeScript**      | Full type-safety for components, styling props, and forms          |
| **Performance**     | React Hook Form is lighter than Formik; IDS v6 ships optimised CSS |
| **Bundle size**     | Removing OUI, Formik, and Yup can save 200–300 KB                  |

### Migration scope

The migration covers three main areas:

1. **OUI → IDS v6** — Replace all `@iress/oui` components with `@iress-oss/ids-components` equivalents
2. **IDS v4 → IDS v6** — Update all `@iress/components-react` imports and adapt to v6 API changes
3. **Formik → React Hook Form** — Replace Formik forms with IDS v6's built-in form architecture

---

## 1. Dependencies

### Update `package.json`

Remove legacy packages and add IDS v6:

```diff
{
  "dependencies": {
-   "@iress/oui": "^x.y.z",
-   "@iress/components-react": "^x.y.z",
-   "formik": "^x.y.z",
-   "yup": "^x.y.z",
+   "@iress-oss/ids-components": "^6.0.0",
+   "react-hook-form": "^7.0.0"
  }
}
```

> `react-hook-form` is a peer dependency of `IressForm` in v6. You must add it to your own dependencies.

### Update imports

```diff
// OUI imports
-import { Button, Input, Modal } from '@iress/oui';
+import { IressButton, IressInput, IressModal } from '@iress-oss/ids-components';

// IDS v4 imports
-import { IressButton, IressText } from '@iress/components-react';
+import { IressButton, IressText } from '@iress-oss/ids-components';
```

### Add the stylesheet

IDS v6 no longer injects CSS into the DOM. Add this **once** in your app entry point:

```tsx
import '@iress-oss/ids-components/dist/style.css';
```

---

## 2. OUI component mapping

### Direct mappings (low complexity)

These OUI components map directly to an IDS v6 equivalent with minimal prop changes.

#### Button → IressButton

```diff
-<Button variant="primary" onClick={handleClick} disabled={false}>
+<IressButton mode="primary" onClick={handleClick} disabled={false}>
   Submit
-</Button>
+</IressButton>
```

| OUI prop   | IDS v6 prop | Notes                                           |
| ---------- | ----------- | ----------------------------------------------- |
| `variant`  | `mode`      | Same values: `primary`, `secondary`, `tertiary` |
| `loading`  | `loading`   | Unchanged                                       |
| `disabled` | `disabled`  | Unchanged                                       |
| `type`     | `type`      | Unchanged                                       |

> **New in v6:** `element` prop to render as a routing `Link`, `icon` prop for icon-only buttons, and `status` prop for `danger`/`success` states.

#### ProgressBar → IressProgress

```diff
-<ProgressBar value={50} max={100} />
+<IressProgress value={50} max={100} />
```

Props are unchanged.

#### Badge → IressPill

```diff
-<Badge variant="info">Info</Badge>
+<IressPill mode="info">Info</IressPill>
```

| OUI prop  | IDS v6 prop |
| --------- | ----------- |
| `variant` | `mode`      |

> In IDS v6, `IressBadge` has been renamed to `IressPill`. Use `IressPill` for static indicators and `IressTag` for interactive elements.

### Medium complexity

#### Modal → IressModal

```diff
-<Modal isOpen={isOpen} title="My Modal" onClose={handleClose}>
+<IressModal show={isOpen} heading="My Modal" onShowChange={handleClose}>
   Modal content
-</Modal>
+</IressModal>
```

| OUI prop  | IDS v6 prop    |
| --------- | -------------- |
| `isOpen`  | `show`         |
| `title`   | `heading`      |
| `onClose` | `onShowChange` |

#### DropdownButton → IressDropdownMenu / IressSelect / IressPopover

OUI's `DropdownButton` can be replaced by several IDS v6 components depending on the use case:

| Use case                | IDS v6 component    | When to use                                                                    |
| ----------------------- | ------------------- | ------------------------------------------------------------------------------ |
| Menu of actions         | `IressDropdownMenu` | Selecting from a list of options with built-in search and multi-select support |
| Form select             | `IressSelect`       | Selecting a value within a form                                                |
| Custom dropdown content | `IressPopover`      | Full control over the dropdown content                                         |

**IressDropdownMenu example:**

```diff
-<DropdownButton>
+<IressDropdownMenu
-  <MenuItem onClick={action1}>Action 1</MenuItem>
+  label="Actions"
-  <MenuItem onClick={action2}>Action 2</MenuItem>
+  options={[
-</DropdownButton>
+    { label: 'Action 1', value: 'action1' },
+    { label: 'Action 2', value: 'action2' },
+  ]}
+  onChange={(value) => handleAction(value)}
+/>
```

**IressSelect example (in a form):**

```diff
-<DropdownButton>
+<IressFormField
-  <MenuItem value="opt1">Option 1</MenuItem>
+  name="selection"
-  <MenuItem value="opt2">Option 2</MenuItem>
+  label="Choose option"
-</DropdownButton>
+  render={(props) => (
+    <IressSelect
+      {...props}
+      options={[
+        { label: 'Option 1', value: 'opt1' },
+        { label: 'Option 2', value: 'opt2' },
+      ]}
+    />
+  )}
+ />
```

### Using styling props

#### Scrollable

OUI's `Scrollable` component is replaced by the `scrollable` styling prop, available on any IDS v6 component. It sets `overflow: auto` with design-system-styled scrollbars.

| Value  | Behaviour              |
| ------ | ---------------------- |
| `true` | Scroll on both axes    |
| `"x"`  | Horizontal scroll only |
| `"y"`  | Vertical scroll only   |

```diff
-<Scrollable height="300px" maxHeight="500px">
+<IressPanel scrollable="y" style={{ height: '300px', maxHeight: '500px' }}>
  <Content />
-</Scrollable>
+</IressPanel>
```

You can also use `scrollable` on any element — it is not limited to `IressPanel`:

```tsx
<IressStack scrollable="y" style={{ maxHeight: '400px' }}>
  <LongContent />
</IressStack>;
```

---

## 3. Form migration (Formik → IDS v6)

This is the most significant architectural change. IDS v6 forms use **React Hook Form** under the hood via `IressForm` and `IressFormField`.

### Key differences

| Formik                                | IDS v6                                         |
| ------------------------------------- | ---------------------------------------------- |
| `<Formik>` wrapper with render props  | `<IressForm>` with declarative children        |
| `<Field>` with `as` prop              | `<IressFormField>` with `render` prop          |
| Yup validation schemas                | Per-field `rules` prop (React Hook Form rules) |
| `<ErrorMessage>` component            | Automatic error display by `IressFormField`    |
| Standalone `<Label>` + `<Input>`      | Integrated `IressFormField` with `label` prop  |
| `<FormGroup>` / `<Fieldset>` wrappers | `IressFormField` or `IressFieldGroup`          |

### Basic form migration

**Before (Formik + OUI):**

```tsx
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Label, FormGroup, Button } from '@iress/oui';

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Min 8 characters')
    .required('Password is required'),
});

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Field name="email" as={Input} type="email" />
            {errors.email && touched.email && <span>{errors.email}</span>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Field name="password" as={Input} type="password" />
            {errors.password && touched.password && (
              <span>{errors.password}</span>
            )}
          </FormGroup>

          <Button type="submit" variant="primary">
            Login
          </Button>
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

function LoginForm() {
  return (
    <IressForm
      defaultValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
    >
      <IressFormField
        name="email"
        label="Email"
        render={(props) => <IressInput {...props} type="email" />}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email',
          },
        }}
      />

      <IressFormField
        name="password"
        label="Password"
        render={(props) => <IressInput {...props} type="password" />}
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'Min 8 characters' },
        }}
      />

      <IressButton type="submit" mode="primary">
        Login
      </IressButton>
    </IressForm>
  );
}
```

### Validation migration (Yup → rules)

| Yup                      | React Hook Form `rules`                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| `.required('msg')`       | `required: 'msg'`                                                      |
| `.min(n, 'msg')`         | `minLength: { value: n, message: 'msg' }`                              |
| `.max(n, 'msg')`         | `maxLength: { value: n, message: 'msg' }`                              |
| `.email('msg')`          | `pattern: { value: /…/, message: 'msg' }`                              |
| `.matches(regex, 'msg')` | `pattern: { value: regex, message: 'msg' }`                            |
| `.positive('msg')`       | `validate: { positive: (v) => v > 0 \|\| 'msg' }`                      |
| `.integer('msg')`        | `validate: { integer: (v) => Number.isInteger(Number(v)) \|\| 'msg' }` |
| `.url('msg')`            | `pattern: { value: /^https?:\/\/.+/, message: 'msg' }`                 |

### Form component mapping

#### Input → IressFormField + IressInput

```diff
-<Input type="text" value={value} onChange={onChange} placeholder="Enter text" required />
+<IressFormField
+  name="fieldName"
+  label="Label Text"
+  render={(props) => <IressInput {...props} type="text" placeholder="Enter text" />}
+  rules={{ required: 'This field is required' }}
+/>
```

#### TextArea → IressFormField + IressInput (with rows)

```diff
-<TextArea value={value} onChange={onChange} rows={5} />
+<IressFormField
+  name="textField"
+  label="Description"
+  render={(props) => <IressInput {...props} rows={5} />}
+  rules={{ required: 'This field is required' }}
+/>
```

#### Label → IressFormField (label prop)

Labels are now integrated into `IressFormField` — no separate component needed:

```diff
-<Label htmlFor="fieldId">Field Label</Label>
+<IressFormField
-<Input id="fieldId" />
+  name="fieldName"
+  label="Field Label"
+  render={(props) => <IressInput {...props} />}
+/>
```

#### FormGroup / Fieldset → IressFormField or IressFieldGroup

`FormGroup` functionality is built into `IressFormField`. For `Fieldset` grouping, use `IressFieldGroup` which provides a semantic `<fieldset>` with a legend:

```diff
-<Fieldset legend="Personal Info">
+<IressFieldGroup label="Personal Info">
-  <Label>Name</Label>
+  <IressFormField
-  <Input name="name" />
+    name="name"
-</Fieldset>
+    label="Name"
+    render={(props) => <IressInput {...props} />}
+  />
+</IressFieldGroup>
```

#### RadioGroup → IressFormField + IressRadioGroup

```diff
-<RadioGroup name="gender" value={value} onChange={onChange}>
+<IressFormField
-  <Radio value="male">Male</Radio>
+  name="gender"
-  <Radio value="female">Female</Radio>
+  label="Gender"
-</RadioGroup>
+  render={(props) => (
+    <IressRadioGroup {...props}>
+      <IressRadio value="male">Male</IressRadio>
+      <IressRadio value="female">Female</IressRadio>
+    </IressRadioGroup>
+  )}
+/>
```

#### Checkbox → IressFormField + IressCheckbox

```diff
-<Checkbox checked={checked} onChange={onChange}>Accept terms</Checkbox>
+<IressFormField
+  name="acceptTerms"
+  render={(props) => (
+    <IressCheckbox {...props}>Accept terms</IressCheckbox>
+  )}
+  rules={{ required: 'You must accept terms' }}
+/>
```

---

## 4. IDS v4 → v6 component changes

If your project also uses IDS v4 (`@iress/components-react`), these components need updating alongside the OUI migration.

### Package import

All imports change from `@iress/components-react` to `@iress-oss/ids-components`. Component names stay the same.

### Breaking changes

| Component                       | Change                                                             | Migration                                              |
| ------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| `IressButton`                   | `variant` → `mode`                                                 | Find and replace                                       |
| `IressAlert`                    | `variant` → `status`; `error` → `danger`                           | Find and replace                                       |
| `IressModal`                    | `isOpen` → `show`, `title` → `heading`, `onClose` → `onShowChange` | Find and replace                                       |
| `IressForm`                     | Complete React Hook Form architecture                              | See [Form migration](#3-form-migration-formik--ids-v6) |
| `IressField` → `IressFormField` | Renamed; uses `render` prop pattern                                | See [Form migration](#3-form-migration-formik--ids-v6) |
| `IressText`                     | `variant` → `textStyle`, `mode` → `color`, `align` → `textAlign`   | Find and replace                                       |
| `IressStack`                    | `gutter` → `gap`                                                   | Find and replace                                       |
| `IressDivider`                  | `gutter` removed                                                   | Use `my` / `mx` styling props                          |
| `IressBadge` → `IressPill`      | Renamed                                                            | Find and replace                                       |

### Low-risk components (unchanged API)

These components only need an import path update:

- `IressPanel`
- `IressInline`
- `IressIcon`
- `IressSkeleton`
- `IressSpinner`
- `IressProgress`

> For a comprehensive list of all v5-to-v6 component changes, see [Migrating from v5](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_resources-migration-guides-from-v5-to-v6--docs).

---

## 5. Testing migration

### Remove IDS v4 test utilities

IDS v6 uses standard React Testing Library — no special test utilities needed.

```diff
// jest.setup.js or vitest.setup.ts
-import { mockLazyLoadedComponents } from '@iress/ids-react-test-utils/dist/react-test-utils/src/mocks/mockLazyLoadedComponents';
+import '@testing-library/jest-dom';
-mockLazyLoadedComponents();
```

### Update test patterns

| IDS v4 pattern                       | IDS v6 pattern                                       |
| ------------------------------------ | ---------------------------------------------------- |
| `idsFireEvent.click(el)`             | `fireEvent.click(el)` or `await userEvent.click(el)` |
| `await findByTestId('x__button')`    | `getByRole('button', { name: 'X' })`                 |
| `mockLazyLoadedComponents()`         | Remove — components load synchronously               |
| Async `findBy*` for component render | Synchronous `getBy*` in most cases                   |

### Prefer accessibility queries

```diff
-const button = await findByTestId('submit-btn__button');
-idsFireEvent.click(button);
+const button = getByRole('button', { name: 'Submit' });
+fireEvent.click(button);
```

### Update Jest / Vitest configuration

```diff

// Transform patterns
{
  transformIgnorePatterns: [
-    "node_modules/(?!(@iress/components-react|@iress/components|@stencil/core)/)"
+    "/node_modules/(?!@iress-oss/ids-components)"
  ]
}
// CSS module mocking
{
  moduleNameMapper: {
-    "ids-web-components.css$": "<rootDir>/test/style-mock.ts"
+    "@iress-oss/ids-components/(.*).css": "<rootDir>/test/style-mock.ts"
  }
}
```

### Form test migration

```diff
test('form validation', async () => {
-  const { findByTestId } = render(<Form />);
-  const input = await findByTestId('email__input');
-  idsFireEvent.click(await findByTestId('submit-btn__button'));
-  const error = await findByTestId('email__error');
-  expect(error).toBeInTheDocument();
+  const { getByRole, findByText } = render(<Form />);
+  fireEvent.click(getByRole('button', { name: 'Submit' }));
+  expect(await findByText('Email is required')).toBeInTheDocument();
});
```

---

## 6. Styling migration

### CSS class changes

OUI and IDS v4 used different class naming conventions that no longer exist in v6:

```css
/* ❌ OUI classes — no longer exist */
.oui-button {
}

/* ❌ IDS v4 Stencil classes — no longer exist */
.sc-iress-button-h {
}

/* ✅ IDS v6 — use styling props or design tokens */
```

### Use styling props instead of custom CSS

IDS v6 exposes global styling props on every component:

```tsx
// Spacing
<IressPanel p="lg" m="xl" />

// Responsive
<IressPanel p={{ base: 'sm', xl: 'lg' }} />

// Colour
<IressPanel bg="alt" />
```

### Use design tokens for custom styles

```css
/* ✅ Preferred — design tokens */
.custom-element {
  color: var(--iress-color-text-primary);
  padding: var(--iress-spacing-md);
}
```

### Cascade layers

All IDS v6 CSS lives in cascade layers. If your own un-layered CSS is being overridden, declare layer order:

```css
@layer reset, base, tokens, recipes, utilities;
```

---

## 7. Common patterns

### Pattern 1: Simple form field

```tsx
<IressFormField
  name="fieldName"
  label="Field Label"
  render={(props) => <IressInput {...props} />}
  rules={{ required: 'Required' }}
/>;
```

### Pattern 2: Complete form

```tsx
<IressForm onSubmit={handleSubmit} defaultValues={{ field1: '', field2: '' }}>
  <IressFormField
    name="field1"
    label="First field"
    render={(props) => <IressInput {...props} />}
  />
  <IressFormField
    name="field2"
    label="Second field"
    render={(props) => <IressInput {...props} />}
  />
  <IressButton type="submit" mode="primary">
    Submit
  </IressButton>
</IressForm>;
```

### Pattern 3: Modal with form

```tsx
<IressModal show={isOpen} onShowChange={setIsOpen} heading="Edit item">
  <IressForm onSubmit={handleSubmit}>
    <IressFormField
      name="name"
      label="Name"
      render={(props) => <IressInput {...props} />}
    />
    <IressButton type="submit" mode="primary">
      Save
    </IressButton>
  </IressForm>
</IressModal>;
```

### Pattern 4: Contextual menu

```tsx
<IressContextualMenu
  items={[
    { key: 'edit', label: 'Edit', onClick: handleEdit },
    { key: 'delete', label: 'Delete', onClick: handleDelete },
  ]}
/>;
```

---

## 8. Common gotchas

| Problem                              | Cause                                            | Solution                                                                  |
| ------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------------------- |
| Components have no styles            | Missing CSS import                               | Add `import '@iress-oss/ids-components/dist/style.css'` to your app entry |
| Form validation not working          | Using HTML5 attributes (`required`, `maxLength`) | Move all validation to the `rules` prop on `IressFormField`               |
| Modal won't close                    | Using `isOpen` prop                              | Rename to `show`                                                          |
| Button variant not applying          | Using `variant` prop                             | Rename to `mode`                                                          |
| Tests fail with "Cannot find module" | Jest can't transform IDS v6                      | Update `transformIgnorePatterns` in your test config                      |
| `idsFireEvent` not found             | Using removed IDS v4 test utils                  | Replace with standard `fireEvent` from React Testing Library              |
| Form fields render without labels    | Using standalone `<Label>`                       | Move the label text into the `label` prop on `IressFormField`             |
| Custom CSS overriding components     | Cascade layer ordering                           | Declare `@layer` order in your stylesheet                                 |

---

## 9. Full component reference

| OUI component    | IDS v6 equivalent                                    | Complexity | Notes                                  |
| ---------------- | ---------------------------------------------------- | ---------- | -------------------------------------- |
| `Button`         | `IressButton`                                        | Low        | `variant` → `mode`                     |
| `Input`          | `IressFormField` + `IressInput`                      | High       | Requires form context                  |
| `TextArea`       | `IressFormField` + `IressInput`                      | High       | Use `rows` prop                        |
| `Label`          | `IressFormField` `label` prop                        | Medium     | No separate component                  |
| `FormGroup`      | `IressFormField`                                     | High       | Built-in to FormField                  |
| `Fieldset`       | `IressFieldGroup`                                    | Low        | Use `label` prop                       |
| `RadioGroup`     | `IressFormField` + `IressRadioGroup`                 | High       | Requires form context                  |
| `Radio`          | `IressRadio`                                         | Medium     | Must be in `IressRadioGroup`           |
| `Checkbox`       | `IressFormField` + `IressCheckbox`                   | Medium     | —                                      |
| `Modal`          | `IressModal`                                         | Medium     | `isOpen` → `show`, `title` → `heading` |
| `DropdownButton` | `IressDropdownMenu` / `IressSelect` / `IressPopover` | Medium     | Depends on use case — see above        |
| `ProgressBar`    | `IressProgress`                                      | Low        | Props unchanged                        |
| `Badge`          | `IressPill`                                          | Low        | `variant` → `mode`                     |
| `Scrollable`     | `scrollable` styling prop                            | Low        | Available on any component             |

| IDS v4 component           | IDS v6 change                             | Complexity |
| -------------------------- | ----------------------------------------- | ---------- |
| `IressButton`              | `variant` → `mode`                        | Low        |
| `IressAlert`               | `variant` → `status`; `error` → `danger`  | Low        |
| `IressText`                | `variant` → `textStyle`, `mode` → `color` | Low        |
| `IressStack`               | `gutter` → `gap`                          | Low        |
| `IressModal`               | `isOpen` → `show`, `title` → `heading`    | Medium     |
| `IressForm` / `IressField` | React Hook Form architecture              | High       |
| `IressBadge`               | Renamed to `IressPill`                    | Low        |
| `IressPanel`               | Import path only                          | Low        |
| `IressInline`              | Import path only                          | Low        |
| `IressDivider`             | `gutter` removed; use `my`/`mx`           | Low        |

---

# Migrating from v5 to v6

This guide covers all breaking changes, deprecations, and new features introduced in version 6 of the Iress Design System. While the list is extensive, most changes relate to look-and-feel rather than code.

---

## Overview

### Optimised token system

The design token count has been reduced from **940 to 88**, focusing on the essentials required to rebrand an application from a client style guide — similar to the original global tokens in previous IDS versions.

The new token system enables closer brand parity, including:

- Custom **remote font stylesheets** attached to a theme
- An **accent colour** to further emphasise a client's brand
- **Radius tokens** controlled at group level (badge, button, form, layout)

**What this means in practice:**

- Border widths and styles are no longer customisable via tokens. Inputs will always have a `1px` border; tabs always look the same except for colours and radius.
- Animations and transitions have been removed from theme customisation.
- Old themes have been translated to the new tokens as closely as possible, but minor visual inconsistencies may appear where tokens are now hard-coded.

### Default theme

Version 6 ships with a **fully styled Iress-branded default theme**. Loading a theme is now **optional** — only required for theme switching (e.g. multi-client applications) or backwards compatibility with older IDS versions.

### Styling props

Utility classes (e.g. `iress-hide--sm`) and internal component tokens (e.g. `--iress-text-color`) have been replaced with **global styling props** available on every component.

```tsx
// Padding and margin via props
<IressPanel p="lg" m="xl" bg="alt" />

// Responsive values
<IressPanel p={{ base: 'sm', xl: 'lg' }} bg="alt" />
```

Utility classes for components have been changed to functions:

```tsx
// Apply Panel styling to a native div
<div className={panel()} />;
```

> **Note:** Styling props only accept design token values. For custom values, use standard CSS. Not every internal component token has a matching styling prop — only those needed for rebranding.

### Cascade layers

All component CSS now lives in its own cascade layer, making overrides straightforward. However, un-layered CSS now takes priority over component styles by default.

To control priority, declare your own layer order:

```css
@layer reset, base, tokens, recipes, utilities;
```

### Panda CSS (for contributors)

SASS modules have been replaced with [Panda CSS](https://panda-css.com/) for type-safe styles and styling props. See the updated contributing guidelines for details.

---

## Component changes

### Alert

| Change                 | Details                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| Removed `headingLevel` | Use a native heading tag inside the `heading` prop                              |
| Removed `headingText`  | Use the `heading` prop                                                          |
| Deprecated `footer`    | Use `actions` or `children` instead                                             |
| New `actions`          | Styled buttons based on alert status. Accepts `IressButtonProps[]`              |
| New `icon`             | Change or remove the icon                                                       |
| New `variant`          | Change alert style depending on context                                         |
| New `onDismiss`        | Add dismiss functionality                                                       |
| New `multiLine`        | Display on multiple lines for longer content (single row after `md` by default) |

### Autocomplete

| Change                   | Details                                              |
| ------------------------ | ---------------------------------------------------- |
| Removed `watermark`      | No longer supported                                  |
| Hook: `options` required | `options` is now required in `useAutocompleteSearch` |
| Hook: `displayResults`   | Removed from hook return                             |

### Badge → Pill (renamed)

`IressBadge` has been renamed to `IressPill`. Use the new component.

### Button

| Change                             | Details                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| Removed `attrs`                    | Pass attributes directly to the component                                      |
| Removed `link` mode                | Use other button modes for actions, or the new `IressLink` for paragraph links |
| Removed `danger` mode              | Use `status="danger"`                                                          |
| Removed `positive` mode            | Use `status="success"`                                                         |
| Removed `negative` mode            | Use `status="danger"`                                                          |
| New `quaternary` and `muted` modes | —                                                                              |
| New `element` prop                 | Render as a custom component (e.g. React Router `Link`, Next.js `Link`)        |
| New `icon` prop                    | Render an icon-only button with even padding. `children` becomes the tooltip   |

### ButtonGroup

| Change                            | Details                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| Removed `options`                 | Use `IressButton` children instead                                                      |
| `onChange` simplified             | Returns the selected value directly (no longer `{ selected }`)                          |
| `defaultValue`/`onChange`/`value` | Now type-aware based on `multiple` prop — arrays when `true`, single value when `false` |

### Card

| Change                        | Details                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Removed `composeIDSCardSlots` | Use the `card` styling function                                                  |
| Removed `composeIDSCard`      | Use the `card` styling function                                                  |
| New `element` prop            | Render as button or link. Alternatively use `IressButtonCard` or `IressLinkCard` |
| Layout change                 | Now stretches to container width by default                                      |

### Checkbox

| Change                              | Details                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| `readonly` → `readOnly`             | —                                                                              |
| Removed `mapCheckboxGroupOptions`   | Map arrays directly to `IressCheckboxGroup`                                    |
| Removed `hiddenControl` and `touch` | Use the new `variant` prop (`"card"` or `"touch"`)                             |
| New `variant` prop                  | `"card"` — checkbox on top right with heading. `"touch"` — larger touch target |
| Updated `ref`                       | Now exposes `blur()`, `focus()`, and `input` (underlying DOM element)          |
| Removed ref methods                 | `check()` and `reset()` removed from ref                                       |

### CheckboxGroup

| Change                              | Details                                            |
| ----------------------------------- | -------------------------------------------------- |
| `readonly` → `readOnly`             | —                                                  |
| Removed `full` layout               | Use `stack` or `block`                             |
| Removed `hiddenControl` and `touch` | Use the new `variant` prop (`"card"` or `"touch"`) |

### CheckboxMark

No longer has a `ref` prop. Wrap the element in a `<div ref={elementRef} />` and query from there.

### Col

No changes.

### Combobox (removed)

`IressCombobox` and `IressMultiCombobox` have been removed. Use:

- `IressSelect` for restricted selection from options
- `IressAutocomplete` for free-text input with suggestions

### Container

No changes.

### Divider

| Change            | Details                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| Removed `gutter`  | Use `my` (or `mx` if vertical) styling prop                             |
| No default margin | Works correctly inside `IressStack` and `IressInline` without overrides |

### Editor

| Change                                   | Details                                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Removed second `onChange` parameter      | Use the new `onUpdate` handler to react to Tiptap update events                                       |
| New `IressEditor.SimpleToolbar` children | Children are appended to the toolbar                                                                  |
| SSR/Next.js change                       | Styles are no longer injected into the DOM. Include `@iress/ids-editor/dist/style.css` in your bundle |

### Expander

| Change                    | Details                                                |
| ------------------------- | ------------------------------------------------------ |
| Removed `mode="heading"`  | Use `mode="section"` or custom styles                  |
| `onChange` simplified     | Returns the open state directly (no longer `{ open }`) |
| New `activatorStyle` prop | Customise the activator button directly                |

### Field

| Change                                      | Details                                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Removed `optional`                          | Use `required` instead                                                                          |
| New `supplementary` / `renderSupplementary` | Shown below the field; hidden when `error` or `errorMessages` is set                            |
| Errors now below field                      | Errors animate in below the field                                                               |
| Built-in bottom margin                      | Fields have bottom margin for error/supplementary area — **do not wrap fields in `IressStack`** |
| New `horizontal`                            | Inline label/input layout                                                                       |
| New `labelWidth`                            | Control label container width                                                                   |
| New `removeErrorMargin`                     | Removes error space reservation                                                                 |

### FieldGroup

| Change                 | Details                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| Removed `optional`     | Use `required` instead                                               |
| New `supplementary`    | Shown below the group; hidden when `error` or `errorMessages` is set |
| Errors below group     | Shown with a border to distinguish from child field errors           |
| Built-in bottom margin | Same as `Field` — **do not wrap in `IressStack`**                    |

### Filter → DropdownMenu (renamed)

`IressFilter` has been renamed and moved to the `DropdownMenu` pattern component.

### Hide (deprecated)

Use the `srOnly` or `hide` styling props available on any component.

### Icon

| Change                  | Details                                                                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Removed `mode`          | Use `color` instead                                                                                                                                 |
| `name` is now type-safe | IDE autocompletion available                                                                                                                        |
| Removed `size`          | Inherits font size from parent. Use custom CSS for specific sizes; use `IressImage` for large icons                                                 |
| New `IressIconProvider` | Required for optimal Material Symbols usage with font subsetting. Already included in `IressProvider` and `IressShadow` — no need to add separately |
| New `type` prop         | Select icon provider (`'fontawesome'` \| `'material'`)                                                                                              |
| New `filled` prop       | Material Symbols filled variant                                                                                                                     |

### Image

New component for displaying responsive images.

### Inline

| Change           | Details                                   |
| ---------------- | ----------------------------------------- |
| `gutter` → `gap` | Accepts the larger spacing token spectrum |
| New `rowGap`     | Set top/bottom gap when content wraps     |

### Input

| Change                     | Details                                                      |
| -------------------------- | ------------------------------------------------------------ |
| Removed `watermark`        | —                                                            |
| Clearing `clearable` input | Now triggers `onChange`                                      |
| New `variant` prop         | Change the look of the input for certain contexts            |
| New `actions` prop         | Add buttons with opinionated styling to the end of the input |
| New hover and focus states | `prepend` and `append` change colour when focused            |

### InputCurrency

No code changes (inherits Input styling changes).

### Label

Removed `optional` prop. Use `required` instead.

### Link

New component for anchor links in text paragraphs. Accepts the same props as `IressButton` except `mode` and `status`.

### Menu

| Change                            | Details                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `defaultValue`/`onChange`/`value` | Type-aware based on `multiSelect` — arrays when `true`, single value when `false`       |
| Removed `MenuSelected` interface  | Menu is now generic extending `FormControlValue`                                        |
| Removed `mapMenuItems`            | Map `IressMenuItem` using arrays directly                                               |
| Removed `role="nav"`              | Nav styling removed. For navigation menus, use `IressSideNav` pattern or custom styling |
| New `radio` variant               | Radio prepend to show selection                                                         |
| New `subdraw` variant             | Menu groups as popovers                                                                 |
| New `side` variant                | Side menu with collapsible groups                                                       |
| New `rail` variant                | Blue background, best with icons                                                        |

### MenuItem

| Change                            | Details                                                |
| --------------------------------- | ------------------------------------------------------ |
| `defaultValue`/`onChange`/`value` | Same `multiSelect` typing changes as Menu              |
| Removed `MenuSelected` interface  | —                                                      |
| Removed `attrs`                   | Add props directly                                     |
| Removed custom menu item hooks    | Use the new `element` prop to wrap a routing component |
| New `icon` prop                   | Shows an icon; children becomes a tooltip              |

### MenuGroup

New component for grouping menu items, headings, and text. Renders differently based on the menu variant.

### MenuHeading

Removed `level`. Use `element` instead.

### MenuText

No changes.

### Modal

| Change                       | Details                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `padding` → `p` styling prop | Default padding changed from `'md'` to `'lg'`                                                                                        |
| Removed `fullpage`           | Modal no longer covers the entire screen on small devices                                                                            |
| Custom heading node          | `id` is no longer automatically added. Set the `id` prop on your custom node to connect to the modal. String headings work as before |
| No shadow                    | Slight blur on the background instead                                                                                                |

### Navbar (removed)

This component has been removed. Since IDS serves multiple parent applications with different navbars, this is best kept in individual applications (built with IDS components for consistency).

### Panel

| Change                       | Details                                                         |
| ---------------------------- | --------------------------------------------------------------- |
| Removed `background`         | Use the `bg` prop (e.g. `bg="alt"` or `bg="colour.neutral.20"`) |
| Removed `bg="page"`          | —                                                               |
| `padding` → `p` styling prop | —                                                               |
| Responsive padding           | Set each edge individually per breakpoint                       |

**Before:**

```tsx
<IressPanel
  padding={{
    xs: { b: 'sm', t: 'lg', r: 'sm', l: 'lg' },
    xl: { b: 'none', t: 'sm', r: 'lg', l: 'sm' },
  }}
/>;
```

**After:**

```tsx
<IressPanel pb={{ xs: 'sm', xl: 'none' }} pt={{ xs: 'lg', xl: 'sm' }} />;
```

### Pill

New component supporting the data colour spectrum with automatic rounded corners. For static content only (status indicators, counters). For interactive use, see `IressTag`.

### Placeholder

| Change                | Details                              |
| --------------------- | ------------------------------------ |
| Removed `transparent` | Use `bg="transparent"`               |
| New colour scheme     | Uses `data.50` for better visibility |

### Popover

| Change                        | Details                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Removed `disabledAutoToggle`  | Use `show`, `onActivated`, and `onDeactivated` for controlled popovers. `ref` is reserved for uncontrolled                                             |
| Removed `width`               | Use `contentStyle` prop with custom CSS                                                                                                                |
| Deprecated `contentClassName` | Use `contentStyle.className`                                                                                                                           |
| New `contentStyle`            | Customise `className`, `style`, and styling props on the popover content                                                                               |
| New `fluid`                   | Full container width                                                                                                                                   |
| New `offset`                  | Number or object for popover positioning offset (default: 5)                                                                                           |
| New `nested`                  | Nested navigation behaviour                                                                                                                            |
| Z-index                       | Now uses z-index for consistent layering                                                                                                               |
| Default padding               | ⚠️ Content now has `padding: spacing.4` by default. If you were adding your own inner padding, override with `contentStyle={{ padding: 'spacing.0' }}` |

### Progress

| Change                            | Details                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Renders `<meter>` or `<progress>` | `<meter>` when `min` is set; `<progress>` otherwise                                  |
| Single element                    | No more `__progressbar` test id                                                      |
| Simplified ARIA                   | Only `aria-label` is rendered. If testing by attribute (not role), update your tests |

### Provider

| Change                     | Details                                                                |
| -------------------------- | ---------------------------------------------------------------------- |
| Removed `noIcons`          | Use `noDefaultFont` instead                                            |
| Removed `injectPushStyles` | No longer available                                                    |
| New `noSubsetting`         | Controls automatic font subsetting via Google Fonts CDN for icons      |
| New `noDefaultFont`        | Controls loading of default Iress font from CDN                        |
| Icon handling              | Now uses `IressIconProvider` with Material Symbols instead of icon CSS |

> **Note:** `IressProvider` already includes `IressModalProvider`, `IressSlideoutProvider`, `IressToasterProvider`, and `IressIconProvider`. You do not need to add these separately. `IressShadow` includes `IressProvider` internally, so no additional providers are needed when using `IressShadow` either.

### Radio

| Change                              | Details                                            |
| ----------------------------------- | -------------------------------------------------- |
| Removed `mapRadioGroupOptions`      | Map arrays directly to `IressRadioGroup`           |
| Removed `hiddenControl` and `touch` | Use the new `variant` prop (`"card"` or `"touch"`) |

### RadioGroup

| Change                              | Details                                            |
| ----------------------------------- | -------------------------------------------------- |
| `readonly` → `readOnly`             | —                                                  |
| Removed `hiddenControl` and `touch` | Use the new `variant` prop (`"card"` or `"touch"`) |

### RadioMark

New component for rendering a standalone radio mark indicator (similar to `IressCheckboxMark`).

### Readonly

| Change               | Details                                                                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Styled to match      | Styled to match other input text sizes. Use the new `textStyle` prop for larger text (e.g. statistics)                                                               |
| New `actions` prop   | Array of button props rendered alongside the readonly value (e.g. edit/save toggles). Actions passed to `IressInput` in `readOnly` mode are also forwarded           |
| DOM structure change | ⚠️ Inner content is now wrapped in an additional `wrapper` div inside `root`. CSS selectors targeting direct children of the readonly root element may need updating |

### RichSelect → Select (renamed)

`IressRichSelect` has been renamed to `IressSelect`. See the **Select** section below for full details.

### Row

| Change              | Details                                                         |
| ------------------- | --------------------------------------------------------------- |
| New `rowGap` prop   | Set a different gap between rows vs `gutter`                    |
| Removed `useColGap` | Use `IressInline` to add gaps between non-`IressCol` components |

### Select

| Change                                 | Details                                                                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Renamed from `IressRichSelect`         | Now uses `LabelValueMeta` via `options`                                                                                     |
| `readonly` → `readOnly`                | —                                                                                                                           |
| `defaultValue`/`onChange`/`value`      | Type-aware based on `multiSelect` — arrays when `true`, single value when `false`                                           |
| `value`/`defaultValue` accepts strings | Now also accepts a plain string or `FormControlValue` that resolves to the matching option automatically                    |
| New `multiSelectLimit` prop            | Limits visible selected tags before collapsing to "+N more" summary (default `5`). Display only — does not limit selections |
| New `native` prop                      | Renders a browser-native select (replaces the old `IressSelect`)                                                             |
| `onChange` signature                   | `onChange(event, value, labelValue)` — `value` is the primitive (`FormControlValue`), `labelValue` is the full `LabelValueMeta` |
| Grouped items                          | Now supported                                                                                                               |
| New hover and focus states             | —                                                                                                                           |

The v5 native `IressSelect` with `children` (option elements) is replaced by `IressSelect` with the `native` prop:

**Before (v5):**

```tsx
<IressSelect>
  <IressSelectOption value="1">Option 1</IressSelectOption>
</IressSelect>;
```

**After (v6):**

```tsx
<IressSelect native options={[{ label: 'Option 1', value: '1' }]} />;
```

### SelectOption (removed)

Use the `options` prop on `IressSelect` instead.

### Skeleton

`textVariant` changed to `textStyle`.

### SkipLink

| Change                     | Details                     |
| -------------------------- | --------------------------- |
| Removed `targetId`         | Use `href` instead          |
| Styled as secondary button | No more custom skip link UI |

### Slider

| Change                  | Details                          |
| ----------------------- | -------------------------------- |
| `readonly` → `readOnly` | —                                |
| `hiddenOn` → `srOnly`   | Consistent with other components |

### Slideout

| Change                       | Details                                                     |
| ---------------------------- | ----------------------------------------------------------- |
| Removed `backdrop`           | Use `IressModal` instead                                    |
| Removed `size="lg"`          | Use a separate page for large content                       |
| `padding` → `p` styling prop | —                                                           |
| Single slideout only         | Only one open at a time                                     |
| Removed `injectPushStyles`   | Styles are applied via the `style` attribute on `eleToPush` |
| Custom heading node          | Same `id` handling change as Modal                          |

### Spinner

Removed `name` prop. All spinners are now consistent across Iress products.

### Stack

| Change                  | Details                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `gutter` → `gap`        | Accepts the larger spacing token spectrum                                                                                                        |
| No longer uses `margin` | Uses flexbox. Use `horizontalAlign` or wrap children with `IressInline` for inline display. Use `alignSelf` on children for individual alignment |
| New `element` prop      | Render as a different HTML element (e.g. `<ul>` for lists)                                                                                       |
| New `horizontalAlign`   | Set horizontal alignment of stack content                                                                                                        |
| New `verticalAlign`     | Set vertical alignment with additional options (`'between'`, `'around'`, `'evenly'`)                                                             |

### Styled

New component for applying IDS styling props to any element or component without using the styled-system JSX components directly.

### Table

| Change                            | Details                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `IressTableFormattedValue`        | No more `currencyCode` prop. Use `currencyFormatOptions={{ withSymbol: true/false }}` |
| Columns must be an array          | Object format removed                                                                 |
| New `rowProps`                    | Set styling props for the entire row                                                  |
| New `alternate` prop              | Control row striping                                                                  |
| New `removeRowBorders` prop       | —                                                                                     |
| `TableColumn.align` → `textAlign` | Consistent with styling props                                                         |
| `TableColumn` styling props       | `bg`, `color`, `noGutter`, `srOnly`, `textAlign`, `textStyle` applied to the column   |
| Removed `IressTable.useTable()`   | Import `useTable` directly                                                            |
| Updated default styling           | More display-friendly, print-friendly. `compact` version has a stylised heading       |

### TabSet

| Change               | Details                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Removed `mapTabs`    | Use `Array.map` to map objects to `IressTab`                                                                                               |
| Selected tabs        | Now have a highlighted background                                                                                                          |
| New `panelStyle`     | Custom style for panel area                                                                                                                |
| New `tabHolderStyle` | Custom style for tab holder area                                                                                                           |
| New `type`           | Tab styling type (`'primary'` \| `'secondary'`)                                                                                            |
| Active indicator     | Now uses `ResizeObserver` and `getBoundingClientRect()` for positioning — correctly updates when tab content changes size or layout shifts |

### Tag

| Change               | Details                                            |
| -------------------- | -------------------------------------------------- |
| Data colour spectrum | Now supported                                      |
| New compact version  | For placing inside inputs (e.g. `TagInput`)        |
| Delete hover         | Red hover on the delete button to warn of deletion |

### TagInput

| Change                         | Details                                   |
| ------------------------------ | ----------------------------------------- |
| Removed `testid__input__input` | Use `testid__input` instead               |
| Removed `testid__items`        | —                                         |
| `onTagDelete` signature        | Now includes event: `(label, e) => void`  |
| `onTagDeleteAll` signature     | Now includes event: `(label, e) => void`  |
| New `tagLimit`                 | Limit tags before shortening (default: 5) |
| New `selectedOptionsTagText`   | Text for tag count display                |

### Text

| Change                       | Details                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| Removed `display` variations | Use `textStyle` with `typography.body.lg`, `typography.heading.4`, or `typography.heading.5` |
| `variant` → `textStyle`      | —                                                                                            |
| `mode` → `color`             | —                                                                                            |
| `align` → `textAlign`        | —                                                                                            |
| Nested elements              | Now styles nested `<table>` and `<pre>` tags                                                 |
| Icons in headings            | No longer have automatic padding. Use `ml`/`mr` on `IressIcon` or wrap with `IressInline`    |

### Toast

`IressToast` is no longer directly available. Use `IressToasterProvider` and `useToaster` to create toasts. For static toasts, use `IressAlert`.

> **Note:** `IressToasterProvider` is already included in `IressProvider` and `IressShadow` — you do not need to add it separately if you are using either of these.

### Toaster

| Change                      | Details                                                   |
| --------------------------- | --------------------------------------------------------- |
| `IressToaster` removed      | Use `IressToasterProvider` and `useToaster`               |
| Multiple providers          | Use different `id` props for different positions/contexts |
| `children` → `content`      | In `useToaster`                                           |
| `headingLevel` → `heading`  | —                                                         |
| `headingText` → `heading`   | —                                                         |
| No `position` at hook level | Set `position` on `IressToasterProvider`                  |
| Simple string toasts        | Pass a string directly for a simple message               |
| `status` value change       | `'error'` is now `'danger'` (Alert-based)                 |

### Toggle

| Change                  | Details                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| Controlled/uncontrolled | Now uses `checked`/`defaultChecked` like checkbox. Explicitly set whether controlled |
| Removed forwarded `ref` | Wrap in a `<div>` and use query selectors if needed                                  |
| New `defaultChecked`    | For uncontrolled mode                                                                |
| New `disabled`          | Disable the toggle                                                                   |

### Tooltip

| Change                       | Details                                                  |
| ---------------------------- | -------------------------------------------------------- |
| `align` prop simplified      | Removed deprecated enum option, now uses string literals |
| Removed `IressTooltip.Align` | Use string values directly                               |

### ValidationLink

No changes.

### ValidationMessage

No changes.

### ValidationSummary

New `itemStyle` prop for customising each item's `className`, `style`, and styling props.

---

## New pattern components

### Breadcrumbs

Display a list of links as breadcrumbs showing navigation hierarchy.

### Contextual Menu

Show a context or "more actions" menu.

### Dropdown Menu

Show a filtering/navigation menu in a dropdown (replaces `IressFilter`).

### Form (refactored to pattern)

| Change              | Details                                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Now a pattern       | Accepts `short` and `long` patterns for form template and validation                                                                                            |
| Removed `form` prop | Use `IressHookForm` to pass a custom `react-hook-form` instance                                                                                                 |
| Validation summary  | No longer shown by default. Use `IressFormValidationSummary` via the `alert` prop                                                                               |
| Peer dependency     | `react-hook-form` is now a peer dependency — add it to your project. IDS wrappers (e.g. `IressForm.useWatch`) are removed; use `react-hook-form` hooks directly |

### Loading

No changes.

### Shadow

Render IDS inside a **shadow DOM** for micro-frontends. Styles are automatically imported and encapsulated. Supports custom style injection and wraps `IressProvider` automatically.

### Side Nav

Combines the `rail` and `side` menu variants into a side navigation component for large applications.

---

## Theme changes

| Change                        | Details                                                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Removed `theme` export        | Use `cssVars` from `@iress-oss/ids-tokens`                                                                                                                        |
| Removed `designTokens` export | Use `designTokens` from `@iress-oss/ids-tokens`                                                                                                                   |
| Removed view modes            | For touch mode, use the touch sub-theme (e.g. `iress-beta-theme-light--touch`). Compact has been removed; use component-level `compact` variants or styling props |

### AG Grid

| Change                         | Details                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| Removed `IressAgGridContainer` | Import `getAgGridThemeProps` and spread onto `AgGridReact` |
| AG Grid &lt; 33 dropped        | Minimum version is now 33                                  |
| Removed utility classes        | Use custom CSS classes for cell styling                    |

**Before:**

```tsx
<IressAgGridContainer>
  <AgGridReact {...gridProps} />
</IressAgGridContainer>;
```

**After:**

```tsx
<AgGridReact {...getAgGridThemeProps()} {...gridProps} />;
```

---

# Migration from v4 to v5

This is a step-by-step guide for upgrading your application from IDS v4 to v5.

## Updating your dependencies

### Upgrade IDS and themes

Update your dependencies in your `package.json` file to the following:

```json
"dependencies": {
  "@iress-oss/ids-components": "^5.0.0",
  "@iress/themes": "^5.0.0"
}
```

or run:

```
yarn add @iress-oss/ids-components@^5.0.0 @iress/themes@^5.0.0
```

### Upgrade React

The minimum required version of React is 17. If you are using an older version of React, you will need to update it.

## Updating imports

### Changing components

Update your imports to the new package name:

```diff
-import { IressButton } from '@iress/components-react';
+import { IressButton } from '@iress-oss/ids-components';
```

You can run both packages together, so you can migrate components one by one.

```diff
-import { IressModal, IressButton } from '@iress/components-react';
+import { IressModal } from '@iress/components-react';
+import { IressButton } from '@iress-oss/ids-components';
```

### Importing component styles

IDS v5 no longer injects CSS into the DOM. You will need to import the stylesheet directly into your application.

```ts
import '@iress-oss/ids-components/dist/style.css';
```

## Update Jest configuration

If you are using Jest, you will need to update your Jest configuration to add the new IDS package to your `transformIgnorePatterns`.

**Note:** If you are using version 4 and version 5 in parallel, you will need to keep the old IDS packages in your `transformIgnorePatterns` until you have completely migrated over your components.

```json
"transformIgnorePatterns": [
  "/node_modules/(?!@iress-oss/ids-components)"
]
```

If you are mocking CSS files for your tests, you'll also need to make sure the new stylesheet is matched by your `moduleNameMapper`:

```diff
  "moduleNameMapper": {
    "^.+\.(scss|less)$": "<rootDir>/test/style-mock.ts",
    "ids-web-components.css$": "<rootDir>/test/style-mock.ts",
-    "global.css$": "<rootDir>/test/style-mock.ts"
+    "global.css$": "<rootDir>/test/style-mock.ts",
+    "@iress-oss/ids-components/(.*).css": "<rootDir>/test/style-mock.ts"
  },
```

## Handling breaking changes

### Components

Since the move to React, the majority of the components have been simplified to improve developer experience. We have listed the changes in this google doc by component, so you can attend to each component separately.

[{`Google doc`}](https://docs.google.com/document/d/1H3-zFDftCHDjwaFkwFxVo1uziPsOj8qJn7p3NFG3aUg/edit)

### Testing

Components are no longer loaded asynchronously, so you can test them as you would any other React component. The testing utilities have been removed from the package, so you will need to update your tests to use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) or another testing library.

Below is an example of a changed test using React Testing Library.

```diff
-import { render } from '@testing-library/react';
-import { idsFireEvent } from '@iress/ids-react-test-utils';
+import { render, fireEvent } from '@testing-library/react';
  
-test('login form', async () => {
+test('login form', () => {
    const loginMock = jest.fn();
    const screen = render(<LoginForm loginUser={loginMock}/>);

-    const usernameInput = await screen.findByTestId('username__input');
-    const passwordInput = await screen.findByTestId('password__input');
-    const submitBtn = await screen.findByTestId('submit-btn__button');
-    idsFireEvent.change(usernameInput, { target: { value: 'joe.bloggs' }});
-    idsFireEvent.change(passwordInput, { target: { value: '1234' }});
-    idsFireEvent.click(submitBtn);
+    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
+    const passwordInput = screen.getByRole('textbox', { name: 'Password' });
+    const submitBtn = screen.getByRole('button');
+    fireEvent.change(usernameInput, { target: { value: 'joe.bloggs' }});
+    fireEvent.change(passwordInput, { target: { value: '1234' }});
+    fireEvent.click(submitBtn);

    expect(loginMock).toHaveBeenCalledWith("joe.bloggs", "1234");
});
```

#### Component specific testing

Some components have additional testing requirements. The changed testing requirements will be listed on each component's docs page.

These include:

- [Form](../docs/components-form--docs.md#testing)
- [Modal](../docs/components-modal--docs.md#testing)
- [Slideout](../docs/components-slideout--docs.md#testing)

### Styling

The original CSS framework used for IDS was based on the Stencil library. It was lightly scoped (no shadow DOM) using CSS classes like: `sc-iress-radio-h sc-iress-radio-s`.

These classes have been removed from version 5. If you are targeting components using these classes, it will be good for you review if you should adapt the CSS in a different way (ie. using design tokens/CSS variables instead, which should work no matter the class name, or adding custom classes to the IDS components). If targeting elements is still required, the new classes will be formatted as: `.ids-radio-${ids-version}`, and nested elements will use a modified BEM naming convention: `.ids-radio--label-${ids-version}`. The version number will be exposed; you can import it via Javascript, SASS and CSS module values to make future upgrades easier.

#### Option 1: Use design tokens and custom classes

This is the recommended approach. You can use design tokens and custom classes to style the components.

```css
.custom-radio {
  --iress-text-color: red;
  align-self: center;
}
```

```tsx
<IressRadio className="custom-radio" />;
```

#### Option 2: Target the new classes

This option is **not recommended** and should be used as a last resort, as the class names can change in future, in which case your stylesheet will no longer have any effect. It is recommended to use design tokens or custom classes instead.

```scss
@use '@iress-oss/ids-components/dist/constants/index.scss' as *;

.ids-radio-#{$ids-version} {
  align-self: center;
}

.ids-radio--label-#{$ids-version} {
  color: red;
}
```

### Theme tokens

There are a few token changes that have changed (though this has been relatively minor). The version 5 themes have been updated to use the new design tokens, however if you are using version 4 in parallel with version 5, you may notice that the version 4 styles can no longer find the removed/changed tokens.

To fix this issue, please backfill the tokens in your application until you have finished your migration.

```scss
/* TODO: Will be removed once we have moved to IDS version 5 */
/* Change to the name(s) of the themes you want to back fill. */
.iress-theme-light {
  --iress-alert-error-text-color: var(--iress-alert-danger-text-color);
  --iress-alert-error-background-color: var(
    --iress-alert-danger-background-color
  );
  --iress-alert-error-border-color: var(--iress-alert-danger-border-color);
  --iress-alert-error-heading-icon-text-color: var(
    --iress-alert-danger-heading-icon-text-color
  );

  --iress-button-margin-right: var(--iress-g-spacing-xs);

  --iress-combobox-option-meta-font-weight: var(
    --iress-a-muted-font-weight,
    var(--iress-g-font-weight, normal)
  );
  --iress-combobox-option-meta-text-color: var(
    --iress-g-muted-text-color,
    var(--iress-default-text-color--light)
  );

  --iress-filter-option-meta-font-weight: var(
    --iress-a-muted-font-weight,
    var(--iress-g-font-weight, normal)
  );
  --iress-filter-option-meta-text-color: var(
    --iress-g-muted-text-color,
    var(--iress-default-text-color--light)
  );

  --iress-form-field-margin-bottom: var(
    --iress-a-vertical-spacing-lg,
    var(--iress-g-spacing-lg)
  );

  --iress-table-cell-buy-text-color: var(
    --iress-table-cell-positive-text-color
  );
  --iress-table-cell-sell-text-color: var(
    --iress-table-cell-negative-text-color
  );
  --iress-table-cell-selected-buy-text-color: var(
    --iress-table-cell-selected-positive-text-color
  );
  --iress-table-cell-selected-sell-text-color: var(
    --iress-table-cell-selected-negative-text-color
  );

  --iress-validation-message-error-text-color: var(
    --iress-validation-message-danger-text-color
  );
}
```

## AG grid theme

As of version 5, we only support the lite AG grid theme, which is used in conjunction with the default alpine theme. In version 5, its imports have changed slightly.

Run the following command to install the AG grid lite theme:

```
yarn add @iress/ag-grid-theme@^5.0.0
```

Then you can import the AG Grid theme CSS, import the relevant IDS theme, and hook up the styles by setting a class of ag-theme-alpine ag-theme-iress-lite on your grid wrapper.

```diff
import "@iress/themes/build/css/iress-theme-dark.css";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
-import "@iress/themes/global.css";
-import '@iress/ag-grid-theme/dist/lite/css/all.css';
+import '@iress/ag-grid-theme/dist/ag-theme-iress-lite.css';

// You can also include variables, styles and utilities separately for easy debugging
-// import '@iress/ag-grid-theme/dist/lite/css/variables.css';
-// import '@iress/ag-grid-theme/dist/lite/css/styles.css';
-// import '@iress/ag-grid-theme/dist/lite/css/utilities.css';
+// import '@iress/ag-grid-theme/dist/css/variables.css';
+// import '@iress/ag-grid-theme/dist/css/styles.css';
+// import '@iress/ag-grid-theme/dist/css/utilities.css';
<div className="ag-theme-alpine ag-theme-iress-lite">
  <AgGridReact />
</div>
```

## Removing version 4

Version 5 and version 4 can be run in parallel, but it is recommended to remove version 4 to avoid any conflicts once you have completely migrated over your components.

Run the following to remove version 4 and its related packages:

```sh
yarn remove @iress/components @iress/components-react @iress/components-react-custom-elements @iress/ids-react-test-utils
```

### Remove `global.css`

The `global.css` file has been removed, it is now recommended to include the Roboto font directly using Google Fonts.

```diff
-import '@iress/themes/global.css';
+<link
+  href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap"
+  rel="stylesheet"
+/>
```

### Remove from Jest configuration

If you are using Jest, you will need to update your Jest configuration to remove the old IDS packages from your `transformIgnorePatterns`.

```diff
"transformIgnorePatterns": [
-  "node_modules/(?!(@iress/components-react|@iress/components|@iress/components-react-custom-elements|@stencil/core)/)"
+  "/node_modules/(?!@iress-oss/ids-components)"
]
```

You can also remove the `mockLazyLoadedComponents` function from your Jest setup.

```diff
-import { mockLazyLoadedComponents } from '@iress/ids-react-test-utils/dist/react-test-utils/src/mocks/mockLazyLoadedComponents';
-mockLazyLoadedComponents();
```

You should also be able to remove the style mocks from your Jest configuration's `moduleNameMapper`, unless you are using CSS-in-JS, as IDS no longer injects CSS into the DOM.

```diff
-"moduleNameMapper": {
-  "\.css$": "<rootDir>/PATH/TO/style-mock.ts"
-}
```
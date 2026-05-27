# Migrating from OUI to IDS v6

> **Guide:** `@iress-oss/ids-components`
> **Storybook:** [Migrating from OUI to IDS v6 in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_resources-migration-guides-from-oui-to-v6--docs)

This guide covers migrating from the legacy OUI component library (`@iress/oui`) to the Iress Design System v6 (`@iress-oss/ids-components`). It also covers upgrading existing IDS v4 (`@iress/components-react`) components, replacing Formik with IDS v6's React Hook Form integration, and updating your test infrastructure.

> **If you are migrating from IDS v5**, see [Migrating from v5](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_resources-migration-guides-from-v5-to-v6--docs) instead — that guide focuses on v5-to-v6 breaking changes only.

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

[View "UpdateDependencies" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--update-dependencies)

> `react-hook-form` is a peer dependency of `IressForm` in v6. You must add it to your own dependencies.

### Update imports

[View "UpdateImports" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--update-imports)

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

[View "ButtonMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--button-migration)

| OUI prop   | IDS v6 prop | Notes                                           |
| ---------- | ----------- | ----------------------------------------------- |
| `variant`  | `mode`      | Same values: `primary`, `secondary`, `tertiary` |
| `loading`  | `loading`   | Unchanged                                       |
| `disabled` | `disabled`  | Unchanged                                       |
| `type`     | `type`      | Unchanged                                       |

> **New in v6:** `element` prop to render as a routing `Link`, `icon` prop for icon-only buttons, and `status` prop for `danger`/`success` states.

#### ProgressBar → IressProgress

[View "ProgressBarMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--progress-bar-migration)

Props are unchanged.

#### Badge → IressPill

[View "BadgeMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--badge-migration)

| OUI prop  | IDS v6 prop |
| --------- | ----------- |
| `variant` | `mode`      |

> In IDS v6, `IressBadge` has been renamed to `IressPill`. Use `IressPill` for static indicators and `IressTag` for interactive elements.

### Medium complexity

#### Modal → IressModal

[View "ModalMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--modal-migration)

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

```tsx
<IressOUI allowModeChange />
```

[View "DropdownMenuMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--dropdown-menu-migration)

**IressSelect example (in a form):**

```tsx
<IressOUI allowModeChange />
```

[View "DropdownSelectMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--dropdown-select-migration)

### Using styling props

#### Scrollable

OUI's `Scrollable` component is replaced by the `scrollable` styling prop, available on any IDS v6 component. It sets `overflow: auto` with design-system-styled scrollbars.

| Value  | Behaviour              |
| ------ | ---------------------- |
| `true` | Scroll on both axes    |
| `"x"`  | Horizontal scroll only |
| `"y"`  | Vertical scroll only   |

[View "ScrollableMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--scrollable-migration)

You can also use `scrollable` on any element — it is not limited to `IressPanel`:

```tsx
<IressStack scrollable="y" style={{ maxHeight: '400px' }}>
  <LongContent />
</IressStack>
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

```tsx
<IressOUI allowModeChange />
```

[View "InputMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--input-migration)

#### TextArea → IressFormField + IressInput (with rows)

```tsx
<IressOUI allowModeChange />
```

[View "TextAreaMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--text-area-migration)

#### Label → IressFormField (label prop)

Labels are now integrated into `IressFormField` — no separate component needed:

```tsx
<IressOUI allowModeChange />
```

[View "LabelMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--label-migration)

#### FormGroup / Fieldset → IressFormField or IressFieldGroup

`FormGroup` functionality is built into `IressFormField`. For `Fieldset` grouping, use `IressFieldGroup` which provides a semantic `<fieldset>` with a legend:

```tsx
<IressOUI allowModeChange />
```

[View "FieldsetMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--fieldset-migration)

#### RadioGroup → IressFormField + IressRadioGroup

```tsx
<IressOUI allowModeChange />
```

[View "RadioGroupMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--radio-group-migration)

#### Checkbox → IressFormField + IressCheckbox

```tsx
<IressOUI allowModeChange />
```

[View "CheckboxMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--checkbox-migration)

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

[View "RemoveTestUtils" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--remove-test-utils)

### Update test patterns

| IDS v4 pattern                       | IDS v6 pattern                                       |
| ------------------------------------ | ---------------------------------------------------- |
| `idsFireEvent.click(el)`             | `fireEvent.click(el)` or `await userEvent.click(el)` |
| `await findByTestId('x__button')`    | `getByRole('button', { name: 'X' })`                 |
| `mockLazyLoadedComponents()`         | Remove — components load synchronously               |
| Async `findBy*` for component render | Synchronous `getBy*` in most cases                   |

### Prefer accessibility queries

[View "AccessibilityQueries" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--accessibility-queries)

### Update Jest / Vitest configuration

```tsx
<IressOUI allowModeChange />
```

[View "JestVitestConfig" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--jest-vitest-config)

### Form test migration

```tsx
<IressOUI allowModeChange />
```

[View "FormTestMigration" example in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/components_resources-migration-guides-oui--form-test-migration)

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
/>
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
</IressForm>
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
</IressModal>
```

### Pattern 4: Contextual menu

```tsx
<IressContextualMenu
  items={[
    { key: 'edit', label: 'Edit', onClick: handleEdit },
    { key: 'delete', label: 'Delete', onClick: handleDelete },
  ]}
/>
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

*View in Storybook: [https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_resources-migration-guides-from-oui-to-v6--docs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components_resources-migration-guides-from-oui-to-v6--docs)*

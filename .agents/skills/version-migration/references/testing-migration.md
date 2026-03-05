# Testing Migration

IDS v6 uses standard React Testing Library — no special test utilities needed.

## Remove IDS v4 test utilities

```ts
// ❌ Remove
import {
  idsFireEvent,
  mockLazyLoadedComponents,
} from '@iress/components-react/test';

// ✅ Use standard RTL
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

## Test pattern changes

| Old pattern                          | New pattern                                          |
| ------------------------------------ | ---------------------------------------------------- |
| `idsFireEvent.click(el)`             | `fireEvent.click(el)` or `await userEvent.click(el)` |
| `await findByTestId('x__button')`    | `getByRole('button', { name: 'X' })`                 |
| `mockLazyLoadedComponents()`         | Remove — components load synchronously               |
| Async `findBy*` for component render | Synchronous `getBy*` in most cases                   |

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
// ❌ Old: Formik-based test
const { getByLabelText } = render(
  <Formik initialValues={{ name: '' }} onSubmit={mockSubmit}>
    {() => (
      <Form>
        <Field name="name" as={Input} />
      </Form>
    )}
  </Formik>,
);

// ✅ New: IDS v6 form test
const { getByRole } = render(
  <IressForm defaultValues={{ name: '' }} onSubmit={mockSubmit}>
    <IressFormField
      name="name"
      label="Name"
      render={(field) => <IressInput {...field} />}
    />
    <IressButton type="submit">Submit</IressButton>
  </IressForm>,
);

await userEvent.type(getByRole('textbox', { name: 'Name' }), 'Test');
await userEvent.click(getByRole('button', { name: 'Submit' }));
expect(mockSubmit).toHaveBeenCalledWith({ name: 'Test' });
```

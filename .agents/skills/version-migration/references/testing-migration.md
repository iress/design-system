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

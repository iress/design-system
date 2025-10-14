import { renderHook, screen } from '@testing-library/react';

import { useNoDefaultValueInForms } from './useNoDefaultValueInForms';
import { IressForm } from '../Form';

const ERROR_MESSAGE =
  'Using the defaultValue prop on an IressComponent inside an IressForm component is not supported. Please use the defaultValue prop on the IressFormField, or use defaultValues on the IressForm component (recommended) to ensure a single source of truth for your form.';

describe('useNoDefaultValueInForms', () => {
  it('does not throw error if used outside of a form with a defaultValue', () => {
    expect(() => {
      renderHook(() =>
        useNoDefaultValueInForms({
          component: 'IressComponent',
          defaultValue: 'default',
        }),
      );
    }).not.toThrow(ERROR_MESSAGE);
  });

  it('does not throw error if using inside a form without a default value', () => {
    expect(async () => {
      renderHook(
        () =>
          useNoDefaultValueInForms({
            component: 'IressComponent',
          }),
        {
          wrapper: ({ children }) => (
            <IressForm>
              {children}
              <input aria-label="input" />
            </IressForm>
          ),
        },
      );

      // Remove act warnings
      await screen.findByRole('textbox');
    }).not.toThrow(ERROR_MESSAGE);
  });

  it('throws an error if used with a default value inside a form', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => {
      renderHook(
        () =>
          useNoDefaultValueInForms({
            component: 'IressComponent',
            defaultValue: 'default',
          }),
        {
          wrapper: ({ children }) => <IressForm>{children}</IressForm>,
        },
      );
    }).toThrow(ERROR_MESSAGE);
  });

  it('overrides the error message if provided', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => {
      renderHook(
        () =>
          useNoDefaultValueInForms({
            component: 'IressComponent',
            defaultValue: 'default',
            message: 'Custom error',
          }),
        {
          wrapper: ({ children }) => <IressForm>{children}</IressForm>,
        },
      );
    }).toThrow('Custom error');
  });
});

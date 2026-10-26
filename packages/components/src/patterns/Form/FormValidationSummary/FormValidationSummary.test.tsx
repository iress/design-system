import { render, screen } from '@testing-library/react';
import { IressForm, IressFormField, IressFormFieldset } from '@/main';
import userEvent from '@testing-library/user-event';
import { FormContext } from '../FormContext';
import { IressFormValidationSummary } from './FormValidationSummary';

describe('IressFormValidationSummary', () => {
  it('should generate validation messages for field with label', async () => {
    render(
      <IressForm>
        <IressFormValidationSummary data-testid="validation-summary" />
        <IressFormField
          name="field"
          label="Field name"
          render={(controlledProps) => <input {...controlledProps} />}
          rules={{ required: true }}
        />
        <button type="submit">Submit</button>
      </IressForm>,
    );

    // Should not be there by default
    const summary = screen.getByTestId('validation-summary');
    expect(summary).toBeEmptyDOMElement();

    const submit = screen.getByRole('button', { name: 'Submit' });

    await userEvent.click(submit);

    expect(summary).toHaveTextContent(
      'Error: Field name: Please fill out this field',
    );
  });

  it('should generate validation messages for field with legend', async () => {
    render(
      <IressForm>
        <IressFormValidationSummary data-testid="validation-summary" />
        <IressFormFieldset
          name="field"
          label="Field name"
          render={(controlledProps) => <input {...controlledProps} />}
          rules={{ required: true }}
        />
        <button type="submit">Submit</button>
      </IressForm>,
    );

    // Should not be there by default
    const summary = screen.getByTestId('validation-summary');
    expect(summary).toBeEmptyDOMElement();

    const submit = screen.getByRole('button', { name: 'Submit' });

    await userEvent.click(submit);

    expect(summary).toHaveTextContent(
      'Error: Field name: Please fill out this field',
    );
  });

  it('should use formatted field name when no label or legend is present', () => {
    const setFocusOnError = vi.fn();

    render(
      <FormContext.Provider
        value={{
          id: 'testForm',
          errorMessages: {
            woeIsMe: 'Please fill me out',
          },
          setFocusOnError,
          setErrorMessage: vi.fn(),
        }}
      >
        <IressFormValidationSummary data-testid="validation-summary" />
      </FormContext.Provider>,
    );

    const summary = screen.getByTestId('validation-summary');
    expect(summary).toHaveTextContent('Error: Woe Is Me: Please fill me out');

    // Calls the setFocusOnError function with the summary element when its rendered
    expect(setFocusOnError).toHaveBeenCalled();
  });

  it('should handle multiple validation errors', () => {
    render(
      <FormContext.Provider
        value={{
          id: 'testForm',
          errorMessages: {
            woeIsMe: 'Please fill me out',
            moreWoe: 'Please fill me out too',
          },
          setFocusOnError: vi.fn(),
          setErrorMessage: vi.fn(),
        }}
      >
        <IressFormValidationSummary data-testid="validation-summary" />
      </FormContext.Provider>,
    );

    const summary = screen.getByTestId('validation-summary');
    expect(summary).toHaveTextContent(
      'Error: Woe Is Me: Please fill me outError: More Woe: Please fill me out too',
    );
  });

  it('should use role="alert" by default', () => {
    render(
      <FormContext.Provider
        value={{
          id: 'testForm',
          errorMessages: { field: 'Required' },
          setFocusOnError: vi.fn(),
          setErrorMessage: vi.fn(),
        }}
      >
        <IressFormValidationSummary data-testid="validation-summary" />
      </FormContext.Provider>,
    );

    expect(screen.getByTestId('validation-summary')).toHaveAttribute(
      'role',
      'alert',
    );
  });

  it('should allow overriding the role prop', () => {
    render(
      <FormContext.Provider
        value={{
          id: 'testForm',
          errorMessages: { field: 'Required' },
          setFocusOnError: vi.fn(),
          setErrorMessage: vi.fn(),
        }}
      >
        <IressFormValidationSummary
          data-testid="validation-summary"
          role="status"
        />
      </FormContext.Provider>,
    );

    expect(screen.getByTestId('validation-summary')).toHaveAttribute(
      'role',
      'status',
    );
  });

  it('should allow overriding aria-live prop', () => {
    render(
      <FormContext.Provider
        value={{
          id: 'testForm',
          errorMessages: { field: 'Required' },
          setFocusOnError: vi.fn(),
          setErrorMessage: vi.fn(),
        }}
      >
        <IressFormValidationSummary
          data-testid="validation-summary"
          aria-live="polite"
        />
      </FormContext.Provider>,
    );

    const summary = screen.getByTestId('validation-summary');
    expect(summary).toHaveAttribute('aria-live', 'polite');
  });

  it('should forward role and aria-live when there are no errors', () => {
    render(
      <FormContext.Provider
        value={{
          id: 'testForm',
          errorMessages: {},
          setFocusOnError: vi.fn(),
          setErrorMessage: vi.fn(),
        }}
      >
        <IressFormValidationSummary
          data-testid="validation-summary"
          role="status"
          aria-live="polite"
        />
      </FormContext.Provider>,
    );

    const summary = screen.getByTestId('validation-summary');
    expect(summary).toHaveAttribute('role', 'status');
    expect(summary).toHaveAttribute('aria-live', 'polite');
  });
});

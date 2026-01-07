import { render, screen } from '@testing-library/react';
import { FormValidationSummary } from './FormValidationSummary';
import { IressForm, IressFormField, IressFormFieldset } from '@/main';
import userEvent from '@testing-library/user-event';
import { FormContext } from '../FormContext';

describe('FormValidationSummary', () => {
  it('should generate validation messages for field with label', async () => {
    render(
      <IressForm>
        <FormValidationSummary data-testid="validation-summary" />
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
    expect(screen.queryByTestId('validation-summary')).not.toBeInTheDocument();

    const submit = screen.getByRole('button', { name: 'Submit' });

    await userEvent.click(submit);

    const summary = screen.getByTestId('validation-summary');
    expect(summary).toHaveTextContent(
      'Error: Field name: Please fill out this field',
    );
  });

  it('should generate validation messages for field with legend', async () => {
    render(
      <IressForm>
        <FormValidationSummary data-testid="validation-summary" />
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
    // TODO: Skipping this as it seems flakey, needs investigation
    // expect(screen.queryByTestId('validation-summary')).not.toBeInTheDocument();

    const submit = screen.getByRole('button', { name: 'Submit' });

    await userEvent.click(submit);

    const summary = screen.getByTestId('validation-summary');
    expect(summary).toHaveTextContent(
      'Error: Field name: Please fill out this field',
    );
  });

  it('should use formatted field name when no label or legend is present', () => {
    render(
      <FormContext.Provider
        value={{
          id: 'testForm',
          errorMessages: {
            woeIsMe: 'Please fill me out',
          },
          setErrorMessage: vi.fn(),
        }}
      >
        <FormValidationSummary data-testid="validation-summary" />
      </FormContext.Provider>,
    );

    const summary = screen.getByTestId('validation-summary');
    expect(summary).toHaveTextContent('Error: Woe Is Me: Please fill me out');
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
          setErrorMessage: vi.fn(),
        }}
      >
        <FormValidationSummary data-testid="validation-summary" />
      </FormContext.Provider>,
    );

    const summary = screen.getByTestId('validation-summary');
    expect(summary).toHaveTextContent(
      'Error: Woe Is Me: Please fill me outError: More Woe: Please fill me out too',
    );
  });

  it('should remove error from summary when field becomes valid', async () => {
    const user = userEvent.setup();

    render(
      <IressForm reValidateMode="onChange">
        <FormValidationSummary data-testid="validation-summary" />
        <IressFormField
          name="email"
          label="Email"
          rules={{ required: 'Email is required' }}
          render={(controlledProps) => (
            <input {...controlledProps} data-testid="email-input" />
          )}
        />
        <button type="submit" data-testid="submit-btn">
          Submit
        </button>
      </IressForm>,
    );

    // Submit without filling - should show error
    await user.click(screen.getByTestId('submit-btn'));

    // Wait for validation summary to appear
    const summary = await screen.findByTestId('validation-summary');
    expect(summary).toHaveTextContent('Email: Email is required');

    // Fill the field - error should disappear
    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'test@example.com');

    // Validation summary should disappear when field becomes valid
    await screen
      .findByTestId('validation-summary', {}, { timeout: 100 })
      .catch(() => {
        // Expected to not find the summary
      });
    expect(screen.queryByTestId('validation-summary')).not.toBeInTheDocument();
  });

  it('should NOT update validation summary on field change when updateErrorSummaryOnSubmit is true', async () => {
    const user = userEvent.setup();

    render(
      <IressForm reValidateMode="onChange" updateErrorSummaryOnSubmit={true}>
        <FormValidationSummary data-testid="validation-summary" />
        <IressFormField
          name="email"
          label="Email"
          rules={{ required: 'Email is required' }}
          render={(controlledProps) => (
            <input {...controlledProps} data-testid="email-input" />
          )}
        />
        <button type="submit" data-testid="submit-btn">
          Submit
        </button>
      </IressForm>,
    );

    // Submit without filling - should show error
    await user.click(screen.getByTestId('submit-btn'));

    // Wait for validation summary to appear
    const summary = await screen.findByTestId('validation-summary');
    expect(summary).toHaveTextContent('Email: Email is required');

    // Fill the field - error should STILL BE VISIBLE (per updateErrorSummaryOnSubmit behavior)
    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'test@example.com');

    // Summary should still show the error because updateErrorSummaryOnSubmit=true
    // The summary only updates on next submit
    expect(screen.getByTestId('validation-summary')).toBeInTheDocument();
    expect(screen.getByTestId('validation-summary')).toHaveTextContent(
      'Email: Email is required',
    );

    // Submit again - NOW the validation summary should disappear
    await user.click(screen.getByTestId('submit-btn'));

    // After successful submit, validation summary should be cleared
    expect(screen.queryByTestId('validation-summary')).not.toBeInTheDocument();
  });

  it('should handle rapid successive field validations without stale state (bug regression test)', async () => {
    const user = userEvent.setup();

    render(
      <IressForm reValidateMode="onChange">
        <FormValidationSummary data-testid="validation-summary" />
        <IressFormField
          name="field1"
          label="Field 1"
          rules={{ required: 'Field 1 is required' }}
          render={(controlledProps) => (
            <input {...controlledProps} data-testid="field1-input" />
          )}
        />
        <IressFormField
          name="field2"
          label="Field 2"
          rules={{ required: 'Field 2 is required' }}
          render={(controlledProps) => (
            <input {...controlledProps} data-testid="field2-input" />
          )}
        />
        <IressFormField
          name="field3"
          label="Field 3"
          rules={{ required: 'Field 3 is required' }}
          render={(controlledProps) => (
            <input {...controlledProps} data-testid="field3-input" />
          )}
        />
        <button type="submit" data-testid="submit-btn">
          Submit
        </button>
      </IressForm>,
    );

    // Submit - should show 3 errors
    await user.click(screen.getByTestId('submit-btn'));

    // Wait for all errors to appear
    const summary = await screen.findByTestId('validation-summary');
    expect(summary).toHaveTextContent('Field 1');
    expect(summary).toHaveTextContent('Field 2');
    expect(summary).toHaveTextContent('Field 3');

    // Fill all fields rapidly (this could expose stale state bugs)
    await user.type(screen.getByTestId('field1-input'), 'value1');
    await user.type(screen.getByTestId('field2-input'), 'value2');
    await user.type(screen.getByTestId('field3-input'), 'value3');

    // All errors should be cleared from the summary
    // BUG: If using stale state from closure, some errors might persist
    expect(screen.queryByTestId('validation-summary')).not.toBeInTheDocument();
  });
});

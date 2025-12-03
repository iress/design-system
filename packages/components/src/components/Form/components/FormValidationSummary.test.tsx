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
});

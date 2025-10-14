import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { FormRef, IressHookForm } from './HookForm';
import {
  IressButton,
  IressFormField,
  IressFormValidationSummary,
  IressInput,
  IressSelect,
  IressText,
} from '@/main';
import { FieldValues } from 'react-hook-form';
import { FormFieldErrorMessages } from '../FormField/helpers/getErrorTypeMessage';
import { useRef } from 'react';

describe('IressHookForm', () => {
  it('renders the component with the correct classes, roles and test ids', async () => {
    const Form = () => {
      const form = IressHookForm.useForm();

      return (
        <IressHookForm
          data-testid="test-form"
          className="test-class"
          form={form}
        >
          <IressFormField
            name="email"
            label="Email address"
            rules={{
              required: 'Email is required',
              minLength: { value: 6, message: 'Use a longer email address' },
            }}
            render={(controlledProps) => <IressInput {...controlledProps} />}
          />
          <IressButton type="submit" mode="primary">
            Submit
          </IressButton>
        </IressHookForm>
      );
    };

    render(<Form />);

    const component = await screen.findByTestId('test-form');
    expect(component).toHaveClass(`test-class`);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    expect(screen.getByTestId('test-form__error-summary')).toBeInTheDocument();

    expect(
      screen.getByTestId('test-form__error-summary__error'),
    ).toBeInTheDocument();

    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
  });

  describe('alert', () => {
    it('renders the content in the alert slot', async () => {
      const FormWithCustomAlert = () => {
        const form = IressHookForm.useForm();

        return (
          <IressHookForm
            alert={
              <IressFormValidationSummary>
                Danger Will Robinson! Danger!
              </IressFormValidationSummary>
            }
            form={form}
          >
            Test text
          </IressHookForm>
        );
      };

      render(<FormWithCustomAlert />);

      const alert = await screen.findByRole('alert');
      expect(alert).toBeInTheDocument();
      within(alert).getByText('Danger Will Robinson! Danger!');
    });

    it('focuses on the alert when the form is submitted and there are errors', async () => {
      const FormWithAlertFocus = () => {
        const form = IressHookForm.useForm({
          shouldFocusError: false,
        });

        return (
          <IressHookForm alert={<IressFormValidationSummary />} form={form}>
            <IressFormField
              name="email"
              label="Email address"
              rules={{
                required: 'Email is required',
                minLength: { value: 6, message: 'Use a longer email address' },
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
            <IressButton type="submit" mode="primary">
              Submit
            </IressButton>
          </IressHookForm>
        );
      };

      render(<FormWithAlertFocus />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      const alert = await screen.findByRole('alert');
      expect(alert).toHaveFocus();
    });

    it('updates the form errors only on submit if updateErrorSummaryOnSubmit is true', async () => {
      const FormErrorSummaryOnSubmit = () => {
        const form = IressHookForm.useForm({
          shouldFocusError: false,
        });

        return (
          <IressHookForm
            alert={<IressFormValidationSummary />}
            form={form}
            updateErrorSummaryOnSubmit
          >
            <IressFormField
              name="name"
              label="Name"
              rules={{
                required: true,
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
            <IressButton type="submit" mode="primary">
              Submit
            </IressButton>
          </IressHookForm>
        );
      };

      render(<FormErrorSummaryOnSubmit />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      const fieldError = await screen.findByText(
        FormFieldErrorMessages.required,
      );
      const summaryError = await screen.findByText(
        `Name: ${FormFieldErrorMessages.required}`,
      );

      // Both errors should be displayed initially
      expect(fieldError).toBeInTheDocument();
      expect(summaryError).toBeInTheDocument();

      const input = screen.getByRole('textbox', { name: /Name/ });
      await userEvent.type(input, 'Test');

      // After typing, the field error should disappear, but the summary error should remain
      expect(fieldError).not.toBeInTheDocument();
      expect(summaryError).toBeInTheDocument();

      await userEvent.click(submitButton);

      // After clicking submit again, the summary error should go away as well
      expect(summaryError).not.toBeInTheDocument();
    });
  });

  describe('controlled form elements', () => {
    it('calls onValidChange when the form is valid', async () => {
      const onValidChange = vi.fn();
      const OnValidChangeForm = () => {
        const form = IressHookForm.useForm({ mode: 'onChange' });

        return (
          <IressHookForm form={form} onValidChange={onValidChange}>
            <IressFormField
              name="email"
              label="Email address"
              rules={{
                required: 'Email is required',
                minLength: { value: 6, message: 'Use a longer email address' },
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
            <IressButton type="submit" mode="primary">
              Submit
            </IressButton>
          </IressHookForm>
        );
      };

      render(<OnValidChangeForm />);

      const emailInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      await userEvent.type(emailInput, 'a');

      const longerValidationMessage = await screen.findByText(
        'Use a longer email address',
      );
      expect(longerValidationMessage).toBeInTheDocument();

      // Input valid email
      await userEvent.type(emailInput, 'bcd@mail.com');
      await userEvent.click(submitButton);

      expect(onValidChange).toHaveBeenCalled();
    });

    it('hide the input field if the select value is hide', async () => {
      const SlaveField = () => {
        const { control } = IressHookForm.useFormContext<{ master: string }>();
        const masterValue = IressHookForm.useWatch({ control, name: 'master' });

        if (masterValue !== 'show') {
          return null;
        }

        return (
          <IressFormField
            name="slave"
            label="Slave"
            render={(controlledProps) => <IressInput {...controlledProps} />}
          />
        );
      };

      const ConditionalFieldForm = () => {
        const form = IressHookForm.useForm({
          defaultValues: { master: 'show' },
        });

        return (
          <IressHookForm form={form}>
            <IressFormField
              name="master"
              label="Master"
              render={(controlledProps) => (
                <IressSelect {...controlledProps}>
                  <option value="show">show</option>
                  <option value="hide">hide</option>
                </IressSelect>
              )}
            />
            <SlaveField />
          </IressHookForm>
        );
      };

      render(<ConditionalFieldForm />);

      const emailInput = screen.getByRole('textbox');
      const masterSelect = screen.getByRole('combobox');

      expect(emailInput).toBeInTheDocument();

      await userEvent.selectOptions(masterSelect, 'hide');
      expect(masterSelect).toHaveValue('hide');

      expect(emailInput).not.toBeInTheDocument();
    });

    it('shows validation errors at the header and in the input labels when the form is submitted before required fields are filled', async () => {
      const FormWithCustomErrors = () => {
        const form = IressHookForm.useForm({ mode: 'onChange' });

        return (
          <IressHookForm form={form}>
            <IressFormField
              name="email"
              label="Email address"
              rules={{
                required: 'Email is required',
                minLength: { value: 6, message: 'Use a longer email address' },
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
            <IressButton type="submit" mode="primary">
              Submit
            </IressButton>
          </IressHookForm>
        );
      };

      render(<FormWithCustomErrors />);

      const emailInput = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // Type one character to trigger the min char requirement.
      await userEvent.type(emailInput, 'a');

      const longerValidationMessage = await screen.findByText(
        'Use a longer email address',
      );
      expect(longerValidationMessage).toBeInTheDocument();

      // Clear input field
      await userEvent.clear(emailInput);
      await userEvent.click(submitButton);

      // Validate the required field validation
      const summaryError = await screen.findByText(
        'There was a problem submitting this form',
      );
      expect(summaryError).toBeInTheDocument();

      // Focus should be on the first input with an error
      expect(emailInput).toHaveFocus();

      expect(
        screen.getByText('Email address: Email is required'),
      ).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('shows default validation messages when the form is submitted before required fields are filled', async () => {
      const FormWithDefaultErrors = () => {
        const form = IressHookForm.useForm();

        return (
          <IressHookForm form={form}>
            <IressFormField
              name="name"
              label="Name"
              rules={{
                required: true,
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
            <IressButton type="submit" mode="primary">
              Submit
            </IressButton>
          </IressHookForm>
        );
      };

      render(<FormWithDefaultErrors />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      expect(
        await screen.findByText(FormFieldErrorMessages.required),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Name: ${FormFieldErrorMessages.required}`),
      ).toBeInTheDocument();
    });

    it('uses a string min value in the form validation summary', async () => {
      const FormWithMinValueErrors = () => {
        const form = IressHookForm.useForm();

        return (
          <IressHookForm form={form}>
            <IressFormField
              label="Date"
              name="date"
              render={(controlledProps) => (
                <IressInput {...controlledProps} type="date" />
              )}
              rules={{
                min: '2024-11-14',
              }}
            />
            <IressButton type="submit">Validate</IressButton>
          </IressHookForm>
        );
      };

      render(<FormWithMinValueErrors />);

      const input = await screen.findByLabelText('Date');
      const submit = screen.getByRole('button', { name: 'Validate' });

      await userEvent.type(input, '2024-11-13');
      await userEvent.click(submit);

      expect(
        screen.getByText(
          `Date: ${FormFieldErrorMessages.min.replace('{{attrValue}}', '2024-11-14')}`,
        ),
      ).toBeInTheDocument();
    });
  });

  describe('Use the form ref to interact with a form from outside the form component', () => {
    it('Form submit and reset methods', async () => {
      const defaultValue = 'default@email.com';
      const onSubmit = vi.fn();

      const ComplexFormWithRef = () => {
        const formRef = useRef<FormRef<FieldValues>>(null);
        const form = IressHookForm.useForm({
          defaultValues: { email: defaultValue } as FieldValues,
        });

        return (
          <IressHookForm form={form} ref={formRef} onSubmit={onSubmit}>
            <IressText>Complex Form</IressText>
            <IressFormField
              name="email"
              label="Email address"
              rules={{
                required: 'Email is required',
                minLength: { value: 6, message: 'Use a longer email address' },
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
            <IressButton
              type="submit"
              mode="primary"
              onClick={() => formRef.current?.submit()}
            >
              Submit
            </IressButton>
            <IressButton
              type="reset"
              mode="primary"
              onClick={() => formRef.current?.reset()}
            >
              Reset
            </IressButton>
          </IressHookForm>
        );
      };

      render(<ComplexFormWithRef />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      const resetButton = screen.getByRole('button', { name: 'Reset' });
      const emailInput = screen.getByRole('textbox', {
        name: /email address/i,
      });

      await userEvent.type(emailInput, 'test');
      expect(emailInput).toHaveValue(`${defaultValue}test`);

      await userEvent.click(resetButton);
      expect(emailInput).toHaveValue(defaultValue);

      await userEvent.click(submitButton);
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const AccessibleForm = () => {
        const form = IressHookForm.useForm();

        return (
          <IressHookForm
            data-testid="test-form"
            className="test-class"
            form={form}
          >
            <IressFormField
              name="email"
              label="Email address"
              rules={{
                required: 'Email is required',
                minLength: { value: 6, message: 'Use a longer email address' },
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
            <IressButton type="submit" mode="primary">
              Submit
            </IressButton>
          </IressHookForm>
        );
      };

      const { container } = render(<AccessibleForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('IressHookForm exports', () => {
    it('should export useFieldArray', () => {
      expect(IressHookForm.useFieldArray).toBeDefined();
    });

    it('should export useForm', () => {
      expect(IressHookForm.useForm).toBeDefined();
    });

    it('should export useFormContext', () => {
      expect(IressHookForm.useFormContext).toBeDefined();
    });

    it('should export useWatch', () => {
      expect(IressHookForm.useWatch).toBeDefined();
    });
  });
});

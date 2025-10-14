import { RenderResult, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { FieldValues } from 'react-hook-form';

import { IressButton } from '../Button';
import { IressText } from '../Text';
import {
  FormFieldErrorMessages,
  IressForm,
  IressFormField,
  IressFormProps,
  // IressFormContext,
} from '.';
import styles from './Form.module.scss';
import {
  ComplexForm,
  ComplexFormWithRef,
  ConditionalFieldForm,
} from './mocks/TestComponents';
import { IressInput } from '../Input';

const renderComplexForm = (
  props: IressFormProps<FieldValues> = {},
): RenderResult => {
  return render(<ComplexForm {...props} />);
};

describe('IressForm', () => {
  it('should render the component with the correct classes and test id', async () => {
    render(<IressForm data-testid="test-form" className="test-class" />);

    const component = await screen.findByTestId('test-form');
    expect(component).toHaveClass(`test-class`);
  });

  it('should render the content in the alert slot', async () => {
    render(
      <IressForm
        alert={<IressText>Danger Will Robinson! Danger!</IressText>}
      />,
    );
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass(styles.alert);
    within(alert).getByText('Danger Will Robinson! Danger!');
  });

  it('renders with the correct data-testids', async () => {
    const screen = renderComplexForm({
      'data-testid': 'test-component',
    });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(
      screen.getByTestId('test-component__error-summary'),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('test-component__error-summary__error'),
    ).toBeInTheDocument();
  });

  describe('controlled form elements', () => {
    it('should render buttons and elements as children correctly', () => {
      renderComplexForm();

      const emailInput = screen.getByRole('textbox');
      expect(emailInput).toBeInTheDocument();
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      expect(submitButton).toBeInTheDocument();
    });

    it('should call onValidChange when the form is valid', async () => {
      const onValidChange = vi.fn();
      renderComplexForm({ id: 'form', mode: 'onChange', onValidChange });

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

    it('should hide the input field if the select value is hide', async () => {
      render(<ConditionalFieldForm />);

      const emailInput = screen.getByRole('textbox');
      const masterSelect = screen.getByRole('combobox');

      expect(emailInput).toBeInTheDocument();

      await userEvent.selectOptions(masterSelect, 'hide');
      expect(masterSelect).toHaveValue('hide');

      expect(emailInput).not.toBeInTheDocument();
    });

    it('should show validation errors at the header and in the input labels when the form is submitted before required fields are filled', async () => {
      renderComplexForm({
        id: 'form',
        mode: 'onChange',
      });

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

      // TODO: At the moment the error summary will change as the user edits the form. We are validating this with users, and will probably come up with a better design instead.
      // After we click clear, when it's in "onChange' form mode the error summary won't change but field error will show as required.
      // As long as you type it will show the same error message.
      // expect(screen.getByText('Email is required')).toBeInTheDocument();

      expect(
        screen.getByText('Email address: Email is required'),
      ).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('shows default validation messages when the form is submitted before required fields are filled', async () => {
      render(
        <IressForm>
          <IressFormField
            name="name"
            label="Name"
            rules={{
              required: true,
            }}
            render={(controlledProps) => <IressInput {...controlledProps} />}
          />
          <IressButton type={IressButton.Type.Submit}>Submit</IressButton>
        </IressForm>,
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      expect(
        await screen.findByText(FormFieldErrorMessages.required),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Name: ${FormFieldErrorMessages.required}`),
      ).toBeInTheDocument();
    });

    it('updates the form errors only on submit if updateErrorSummaryOnSubmit is true', async () => {
      render(
        <IressForm updateErrorSummaryOnSubmit>
          <IressFormField
            name="name"
            label="Name"
            rules={{
              required: true,
            }}
            render={(controlledProps) => <IressInput {...controlledProps} />}
          />
          <IressButton type="submit">Submit</IressButton>
        </IressForm>,
      );

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

    // TODO: Move to FormValidationSummary.test.tsx once they are no longer mocked
    it('uses a string min value in the form validation summary', async () => {
      render(
        <IressForm>
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
        </IressForm>,
      );

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
      const { getByRole } = render(
        <ComplexFormWithRef
          defaultValues={{ email: defaultValue }}
          onSubmit={onSubmit}
        />,
      );

      const submitButton = getByRole('button', { name: 'Submit' });
      const resetButton = getByRole('button', { name: 'Reset' });
      const emailInput = getByRole('textbox', { name: /email address/i });

      await userEvent.type(emailInput, 'test');
      expect(emailInput).toHaveValue(`${defaultValue}test`);

      await userEvent.click(resetButton);
      expect(emailInput).toHaveValue(defaultValue);

      await userEvent.click(submitButton);
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe('interactions', () => {
    it('focuses on the summary on submit', async () => {
      render(
        <IressForm>
          <IressFormField
            name="name"
            label="Name"
            rules={{
              required: true,
            }}
            render={(controlledProps) => <IressInput {...controlledProps} />}
          />
          <IressButton type="submit">Submit</IressButton>
        </IressForm>,
      );

      const alert = screen.getByRole('alert');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      expect(alert).toHaveFocus();
    });

    it('if hiddenErrorSummary is set to true, focus on the first field with an error', async () => {
      render(
        <IressForm hiddenErrorSummary>
          <IressFormField
            name="name"
            label="Name"
            rules={{
              required: true,
            }}
            render={(controlledProps) => <IressInput {...controlledProps} />}
          />
          <IressButton type="submit">Submit</IressButton>
        </IressForm>,
      );

      const alert = screen.getByRole('alert');
      const nameInput = screen.getByRole('textbox', { name: /Name/ });

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);

      expect(alert).not.toHaveFocus();
      expect(nameInput).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressForm data-testid="test-component" className="test-class">
          Test text
        </IressForm>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('IressForm exports', () => {
    it('should export useForm', () => {
      expect(IressForm.useForm).toBeDefined();
    });

    it('should export useFormContext', () => {
      expect(IressForm.useFormContext).toBeDefined();
    });

    it('should export useWatch', () => {
      expect(IressForm.useWatch).toBeDefined();
    });
  });
});

import { render, screen } from '@testing-library/react';

import { IressFormField } from './FormField';
import { type FormRef, IressButton, IressForm, IressInput } from '@/main';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import React from 'react';

describe('IressFormField', () => {
  it('throws an error when used outside of an IressForm', () => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());

    expect(() =>
      render(
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />,
      ),
    ).toThrow(
      'IressFormField must be used inside an IressForm. If you need a standalone field, use IressField instead.',
    );

    vi.restoreAllMocks();
  });

  it('renders an input with appropriate attributes in an IressForm', async () => {
    const onSubmit = vi.fn();

    render(
      <IressForm id="iress-form" onSubmit={onSubmit}>
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const input = await screen.findByRole('textbox', { name: 'Label' });
    expect(input).toBeInTheDocument();

    // Passes attributes from react-hook-form to the input
    expect(input).toHaveAttribute('id', 'iress-form__name');
    expect(input).toHaveAttribute('name', 'name');

    await userEvent.type(input, 'value');

    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({ name: 'value' });
  });

  it('renders a nested input with the appropriate attributes', async () => {
    render(
      <IressForm id="iress-form">
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => (
            <div>
              <IressInput {...controlledProps} />
            </div>
          )}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const input = await screen.findByRole('textbox', { name: 'Label' });
    expect(input).toBeInTheDocument();

    // Passes attributes from react-hook-form to the input
    expect(input).toHaveAttribute('id', 'iress-form__name');
    expect(input).toHaveAttribute('name', 'name');
  });

  it('renders error messages related to a field', async () => {
    render(
      <IressForm id="iress-form">
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: 'This field is required' }}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const input = await screen.findByRole('textbox', {
      name: /Required.*Label/,
    });
    expect(input).toBeInTheDocument();

    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    const errorMessage = await screen.findByText('This field is required');
    expect(errorMessage).toBeInTheDocument();

    // Check it passes it to the form
    const formErrorMessage = await screen.findByText(
      'Label: This field is required',
    );
    expect(formErrorMessage).toBeInTheDocument();
  });

  it('does not show or set error messages when readOnly is true', async () => {
    render(
      <IressForm id="iress-form">
        <IressFormField
          label="Label"
          name="name"
          readOnly
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: 'This field is required' }}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const input = await screen.findByRole('textbox', { name: 'Label' });
    expect(input).toBeInTheDocument();

    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    // Error message should not be shown in the field
    expect(
      screen.queryByText('This field is required'),
    ).not.toBeInTheDocument();

    // Form level error message should not be shown
    expect(
      screen.queryByText('Label: This field is required'),
    ).not.toBeInTheDocument();
  });

  it('uses external control when provided explicitly', async () => {
    const ExternalControlForm = () => {
      const { control } = useForm({
        defaultValues: { externalName: 'initial' },
      });

      return (
        <IressForm id="iress-form">
          <IressFormField
            control={control}
            label="External Control"
            name="externalName"
            render={(controlledProps) => <IressInput {...controlledProps} />}
          />
        </IressForm>
      );
    };

    render(<ExternalControlForm />);

    const input = await screen.findByRole('textbox', {
      name: 'External Control',
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('initial');
  });

  it('handles shouldUnregister as boolean true correctly', async () => {
    const onSubmit = vi.fn();

    const FormWithConditionalField = () => {
      const [showField, setShowField] = React.useState(true);

      return (
        <IressForm id="iress-form" onSubmit={onSubmit}>
          {showField && (
            <IressFormField
              label="Conditional Field"
              name="conditionalField"
              shouldUnregister={true}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
          )}
          <IressButton type="button" onClick={() => setShowField(false)}>
            Hide Field
          </IressButton>
          <IressButton type="submit">Submit</IressButton>
        </IressForm>
      );
    };

    render(<FormWithConditionalField />);

    const input = await screen.findByRole('textbox', {
      name: 'Conditional Field',
    });
    expect(input).toBeInTheDocument();

    // Type a value
    await userEvent.type(input, 'test value');
    expect(input).toHaveValue('test value');

    // Hide the field (this should trigger unregistration)
    const hideButton = screen.getByRole('button', { name: 'Hide Field' });
    await userEvent.click(hideButton);

    // Field should be gone
    expect(
      screen.queryByRole('textbox', { name: 'Conditional Field' }),
    ).not.toBeInTheDocument();

    // Submit the form
    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({});
  });

  it('handles shouldUnregister as object with options correctly', async () => {
    const onSubmit = vi.fn();
    const dirtyFields = vi.fn();

    const FormWithAdvancedUnregister = () => {
      const [showField, setShowField] = React.useState(true);
      const formRef = React.useRef<FormRef<object>>(null);

      dirtyFields(formRef.current?.api.formState.dirtyFields);

      return (
        <IressForm id="iress-form" onSubmit={onSubmit} ref={formRef}>
          {showField && (
            <IressFormField
              label="Advanced Unregister"
              name="advancedField"
              shouldUnregister={{
                keepDirty: true,
                keepTouched: true,
                keepError: false,
                keepIsValid: true,
              }}
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
          )}
          <IressButton type="button" onClick={() => setShowField(false)}>
            Hide Advanced Field
          </IressButton>
          <IressButton type="submit">Submit</IressButton>
        </IressForm>
      );
    };

    render(<FormWithAdvancedUnregister />);

    const input = await screen.findByRole('textbox', {
      name: 'Advanced Unregister',
    });
    expect(input).toBeInTheDocument();

    // Type a value to make field dirty
    await userEvent.type(input, 'advanced test');
    expect(input).toHaveValue('advanced test');

    // Hide the field (this should trigger advanced unregistration)
    const hideButton = screen.getByRole('button', {
      name: 'Hide Advanced Field',
    });
    await userEvent.click(hideButton);

    // Field should be gone
    expect(
      screen.queryByRole('textbox', { name: 'Advanced Unregister' }),
    ).not.toBeInTheDocument();

    // Submit the form
    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({});
    expect(dirtyFields).toHaveBeenLastCalledWith({ advancedField: true });
  });

  it('defaults shouldUnregister to false when not provided', async () => {
    const onSubmit = vi.fn();

    const FormWithDefaultUnregister = () => {
      const [showField, setShowField] = React.useState(true);

      return (
        <IressForm id="iress-form" onSubmit={onSubmit}>
          {showField && (
            <IressFormField
              label="Default Unregister"
              name="defaultField"
              // shouldUnregister not provided - should default to false
              render={(controlledProps) => <IressInput {...controlledProps} />}
            />
          )}
          <IressButton type="button" onClick={() => setShowField(false)}>
            Hide Default Field
          </IressButton>
          <IressButton type="submit">Submit</IressButton>
        </IressForm>
      );
    };

    render(<FormWithDefaultUnregister />);

    const input = await screen.findByRole('textbox', {
      name: 'Default Unregister',
    });
    expect(input).toBeInTheDocument();

    // Type a value
    await userEvent.type(input, 'default test');
    expect(input).toHaveValue('default test');

    // Hide the field
    const hideButton = screen.getByRole('button', {
      name: 'Hide Default Field',
    });
    await userEvent.click(hideButton);

    // Field should be gone
    expect(
      screen.queryByRole('textbox', { name: 'Default Unregister' }),
    ).not.toBeInTheDocument();

    // Submit the form
    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({
      defaultField: 'default test',
    });
  });

  it('automatically uses form context control when control prop not provided', async () => {
    const onSubmit = vi.fn();

    render(
      <IressForm
        id="iress-form"
        onSubmit={onSubmit}
        defaultValues={{ autoControl: 'context value' }}
      >
        <IressFormField
          label="Auto Control"
          name="autoControl"
          // control prop not provided - should use form context
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const input = await screen.findByRole('textbox', { name: 'Auto Control' });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('context value');

    // Clear and type new value
    await userEvent.clear(input);
    await userEvent.type(input, 'new value');

    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({ autoControl: 'new value' });
  });
});

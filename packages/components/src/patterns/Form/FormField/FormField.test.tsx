import { render, screen } from '@testing-library/react';

import { IressFormField } from './FormField';
import {
  IressButton,
  IressCheckbox,
  IressForm,
  IressInput,
  IressSelect,
} from '@/main';
import userEvent from '@testing-library/user-event';

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
      name: 'RequiredLabel',
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

  describe('integration', () => {
    it('uses the typed value', async () => {
      const onSubmit = vi.fn();

      render(
        <IressForm onSubmit={onSubmit}>
          <IressFormField
            label="Select"
            name="select"
            render={(controlledProps) => (
              <IressSelect {...controlledProps} placeholder="Select">
                <option value={1}>One</option>
              </IressSelect>
            )}
          />
          <IressButton type="submit">Submit</IressButton>
        </IressForm>,
      );

      const select = await screen.findByRole('combobox', {
        name: 'Select',
      });

      await userEvent.selectOptions(select, '1');

      const submit = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submit);

      expect(onSubmit).toHaveBeenCalledWith({ select: 1 });
    });

    it('changes the renderProps to use checked instead of value when used with IressCheckbox', async () => {
      const onSubmit = vi.fn();
      const renderProps = vi.fn();

      render(
        <IressForm onSubmit={onSubmit}>
          <IressFormField
            label="Checkbox"
            name="checkbox"
            defaultValue={false} // required otherwise it complains about being uncontrolled
            render={(controlledProps) => {
              renderProps(controlledProps);
              return <IressCheckbox {...controlledProps} />;
            }}
          />
          <IressButton type="submit">Submit</IressButton>
        </IressForm>,
      );

      const checkbox = await screen.findByRole('checkbox', {
        name: 'Checkbox',
      });
      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);

      const submit = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submit);

      expect(onSubmit).toHaveBeenCalledWith({ checkbox: true });
      expect(renderProps).toHaveBeenCalledWith(
        expect.objectContaining({
          value: true,
        }),
      );
      expect(checkbox).toBeChecked();
    });

    it('changes the renderProps to include onClear when used with IressInput', async () => {
      const onError = vi.fn();
      const onSubmit = vi.fn();
      const renderProps = vi.fn();

      render(
        <IressForm onSubmit={onSubmit} onError={onError}>
          <IressFormField
            label="Textbox"
            name="text"
            render={(controlledProps) => {
              renderProps(controlledProps);
              return <IressInput {...controlledProps} clearable />;
            }}
            rules={{ required: true }}
          />
          <IressButton type="submit">Submit</IressButton>
        </IressForm>,
      );

      const textbox = await screen.findByRole('textbox', {
        name: /Textbox/,
      });

      expect(renderProps).toHaveBeenLastCalledWith(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- should be mapped to onChange
          onClear: expect.any(Function),
        }),
      );

      await userEvent.type(textbox, 'test value');

      const submit = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submit);

      expect(onSubmit).toHaveBeenCalledWith({ text: 'test value' });

      const clear = screen.getByRole('button', { name: 'Clear' });
      await userEvent.click(clear);

      await userEvent.click(submit);

      expect(onError).toHaveBeenCalled();
    });
  });
});

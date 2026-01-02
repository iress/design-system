import { render, screen } from '@testing-library/react';

import { IressFormField, IressFormFieldProps } from './FormField';
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

  it('does not apply validation rules when readOnly is true', async () => {
    const onSubmit = vi.fn();
    const onError = vi.fn();

    render(
      <IressForm id="iress-form" onSubmit={onSubmit} onError={onError}>
        <IressFormField
          label="Label"
          name="name"
          readOnly
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            required: 'This field is required',
            minLength: { value: 5, message: 'Minimum 5 characters' },
          }}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    // Should submit without errors since readOnly bypasses validation
    expect(onSubmit).toHaveBeenCalledWith({ name: undefined });
    expect(onError).not.toHaveBeenCalled();
  });

  it('renders supplementary content via renderSupplementary prop', async () => {
    render(
      <IressForm id="iress-form">
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          renderSupplementary={() => (
            <div data-testid="supplementary-content">Character count: 0</div>
          )}
        />
      </IressForm>,
    );

    const supplementary = await screen.findByTestId('supplementary-content');
    expect(supplementary).toBeInTheDocument();
    expect(supplementary).toHaveTextContent('Character count: 0');
  });

  it('provides field props and state to renderSupplementary', async () => {
    const renderSupplementary = vi.fn(() => (
      <div data-testid="supplementary">Supplementary</div>
    ));

    render(
      <IressForm id="iress-form">
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          renderSupplementary={renderSupplementary}
        />
      </IressForm>,
    );

    await screen.findByTestId('supplementary');

    expect(renderSupplementary).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'iress-form__name',
        name: 'name',
        value: undefined,
        onChange: expect.any(Function) as never,
        onBlur: expect.any(Function) as never,
      }),
      expect.objectContaining({
        fieldState: expect.objectContaining({
          isDirty: false,
          isTouched: false,
          invalid: false,
        }) as never,
        formState: expect.objectContaining({
          defaultValues: expect.anything() as never,
        }) as never,
      }),
    );
  });

  it('updates renderSupplementary when field value changes', async () => {
    const renderSupplementary = vi.fn<
      Exclude<
        IressFormFieldProps<{
          name: string;
        }>['renderSupplementary'],
        undefined
      >
    >((field) => (
      <div data-testid="char-count">Characters: {field.value?.length ?? 0}</div>
    ));

    render(
      <IressForm id="iress-form">
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          renderSupplementary={renderSupplementary}
        />
      </IressForm>,
    );

    const input = await screen.findByRole('textbox', { name: 'Label' });
    const charCount = await screen.findByTestId('char-count');

    expect(charCount).toHaveTextContent('Characters: 0');

    await userEvent.type(input, 'test');

    expect(charCount).toHaveTextContent('Characters: 4');
    expect(renderSupplementary).toHaveBeenLastCalledWith(
      expect.objectContaining({
        value: 'test',
      }),
      expect.any(Object),
    );
  });

  it('renders both renderSupplementary and supplementary prop content', async () => {
    render(
      <IressForm id="iress-form">
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          renderSupplementary={() => (
            <div data-testid="render-supplementary">Dynamic content</div>
          )}
          supplementary={
            <div data-testid="static-supplementary">Static content</div>
          }
        />
      </IressForm>,
    );

    const dynamicContent = await screen.findByTestId('render-supplementary');
    const staticContent = await screen.findByTestId('static-supplementary');

    expect(dynamicContent).toBeInTheDocument();
    expect(staticContent).toBeInTheDocument();
  });

  it('provides field error state to renderSupplementary', async () => {
    const renderSupplementary = vi.fn<
      Exclude<
        IressFormFieldProps<{
          name: string;
        }>['renderSupplementary'],
        undefined
      >
    >((_field, state) => (
      <div data-testid="error-indicator">
        {state.fieldState?.error ? 'Error' : 'No error'}
      </div>
    ));

    render(
      <IressForm id="iress-form">
        <IressFormField
          label="Label"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          renderSupplementary={renderSupplementary}
          rules={{ required: 'This field is required' }}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const errorIndicator = await screen.findByTestId('error-indicator');
    expect(errorIndicator).toHaveTextContent('No error');

    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    // After submit with empty field, error should appear
    const fieldError = await screen.findByText('This field is required');
    expect(fieldError).toBeInTheDocument();
    expect(errorIndicator).not.toBeInTheDocument();
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

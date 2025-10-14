import { render, screen } from '@testing-library/react';

import { IressFormFieldset } from './FormFieldset';
import {
  IressButton,
  IressCheckbox,
  IressCheckboxGroup,
  IressForm,
} from '@/main';
import userEvent from '@testing-library/user-event';

describe('IressFormFieldset', () => {
  it('throws an error when used outside of an IressForm', () => {
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn());

    expect(() =>
      render(
        <IressFormFieldset
          label="Label"
          name="name"
          render={(controlledProps) => (
            <IressCheckboxGroup {...controlledProps}>
              <IressCheckbox value="1">Option 1</IressCheckbox>
            </IressCheckboxGroup>
          )}
        />,
      ),
    ).toThrow(
      'IressFormFieldset must be used inside an IressForm. If you need a standalone field, use IressFieldGroup instead.',
    );

    vi.restoreAllMocks();
  });

  it('renders an input with appropriate attributes in an IressForm', async () => {
    const onSubmit = vi.fn();

    render(
      <IressForm id="iress-form" onSubmit={onSubmit}>
        <IressFormFieldset
          label="Label"
          name="name"
          render={(controlledProps) => (
            <IressCheckboxGroup
              {...controlledProps}
              data-testid="checkbox-group"
            >
              <IressCheckbox value="1">Option 1</IressCheckbox>
            </IressCheckboxGroup>
          )}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const group = await screen.findByRole('group', { name: 'Label' });
    expect(group).toBeInTheDocument();

    // Passes attributes from react-hook-form to the rendered element
    const checkboxGroup = screen.getByTestId('checkbox-group');
    expect(checkboxGroup).toHaveAttribute('id', 'iress-form__name');

    const checkbox = screen.getByRole('checkbox', { name: 'Option 1' });
    await userEvent.click(checkbox);

    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({ name: ['1'] });
  });

  it('renders error messages related to a field', async () => {
    render(
      <IressForm id="iress-form">
        <IressFormFieldset
          label="Label"
          name="name"
          render={(controlledProps) => (
            <IressCheckboxGroup {...controlledProps}>
              <IressCheckbox value="1">Option 1</IressCheckbox>
            </IressCheckboxGroup>
          )}
          rules={{ required: 'This field is required' }}
        />
        <IressButton type="submit">Submit</IressButton>
      </IressForm>,
    );

    const group = await screen.findByRole('group', { name: 'Required Label' });
    expect(group).toBeInTheDocument();

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
});

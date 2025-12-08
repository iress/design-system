import {
  IressCheckbox,
  IressCheckboxGroup,
  IressForm,
  IressFormField,
  type IressFormProps,
  IressInput,
  IressText,
} from '@/main';
import { useWatch } from 'react-hook-form';

interface FieldValues {
  show?: string[];
  name?: string;
  email?: string;
}

/**
 * Conditional fields need to be rendered in a sub-component, to allow it to use the `useWatch`
 * hook to watch the value of the field dictating the display of conditional fields.
 */
const FormSectionWithConditionalFields = () => {
  const show = useWatch<FieldValues>({ name: 'show' });

  return (
    <IressText>
      <h2>
        Conditional fields using <code>useWatch</code>
      </h2>
      <p>
        This example demonstrates how to use the <code>useWatch()</code> hook to
        watch the value of a field and conditionally render other fields based
        on that value.
      </p>
      <IressFormField
        name="show"
        label="Select fields to show"
        rules={{
          required: 'Please select at least one field to show',
        }}
        render={(controlledProps) => (
          <IressCheckboxGroup {...controlledProps} layout="inline">
            <IressCheckbox value="name">Name</IressCheckbox>
            <IressCheckbox value="email">Email</IressCheckbox>
          </IressCheckboxGroup>
        )}
      />
      {show?.includes('name') && (
        <IressFormField
          name="name"
          label="Name"
          rules={{
            required: 'Name is required',
          }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
      )}
      {show?.includes('email') && (
        <IressFormField
          name="email"
          label="Email"
          rules={{
            required: 'Email is required',
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              message: 'Please enter a valid email address',
            },
          }}
          render={(controlledProps) => (
            <IressInput {...controlledProps} type="email" />
          )}
        />
      )}
    </IressText>
  );
};

export const UseWatchForm = (args: IressFormProps<FieldValues>) => (
  <IressForm {...args}>
    <FormSectionWithConditionalFields />
  </IressForm>
);

import {
  IressTable,
  IressFormProps,
  IressForm,
  IressModal,
  IressStack,
  IressFormField,
  IressInput,
  IressButton,
} from '@/main';
import { useState } from 'react';
import { FieldErrors } from 'react-hook-form';

interface FieldValues {
  name?: string;
  email?: string;
}

export const CustomErrorHandlingForm = (args: IressFormProps<FieldValues>) => {
  const [errors, setErrors] = useState<FieldErrors<FieldValues> | undefined>(
    undefined,
  );

  return (
    <IressForm {...args} onError={(data) => setErrors(data)}>
      <IressStack gutter="md">
        <IressFormField
          label="Name"
          name="name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            required: 'Name is required',
          }}
        />
        <IressFormField
          label="Email address"
          name="email"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{
            minLength: {
              message: 'Use a longer email address',
              value: 6,
            },
            required: 'Email is required',
          }}
        />
        <IressButton mode="primary" type="submit">
          Sign up
        </IressButton>
      </IressStack>
      <IressModal
        show={!!errors}
        onShowChange={(show) => !show && setErrors(undefined)}
      >
        <IressTable
          caption="Errors"
          rows={Object.entries(errors ?? {}).map(([name, errorDetails]) => ({
            name,
            errorDetails: (
              <IressStack gutter="sm">
                <ul>
                  <li>Error type: {String(errorDetails?.type)}</li>
                  <li>Error message: {String(errorDetails?.message)}</li>
                </ul>
              </IressStack>
            ),
          }))}
        />
      </IressModal>
    </IressForm>
  );
};

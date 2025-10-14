import {
  IressFormProps,
  IressForm,
  FormRef,
  IressDivider,
  IressButton,
  IressStack,
  IressFormField,
  IressInput,
} from '@/main';
import { useRef } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export const FormReset = (args: IressFormProps<FieldValues>) => {
  const ref = useRef<FormRef<FieldValues>>(null);

  return (
    <IressForm {...args} ref={ref}>
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
      <IressDivider />
      <IressButton type="reset" onClick={() => ref.current?.reset()}>
        Reset
      </IressButton>
    </IressForm>
  );
};

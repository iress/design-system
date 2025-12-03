import {
  type FormRef,
  IressButton,
  IressDivider,
  IressForm,
  IressFormField,
  type IressFormProps,
  IressInput,
  IressStack,
  IressToasterProvider,
  useToaster,
} from '@/main';
import { useRef } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

const Form = (args: IressFormProps<FieldValues>) => {
  const { success, error } = useToaster();
  const formRef = useRef<FormRef<FieldValues>>(null);

  return (
    <>
      <IressForm
        {...args}
        onSubmit={() =>
          success({
            heading: 'Passed validation',
            children: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          })
        }
        onError={() =>
          error({
            heading: 'Failed validation',
            children: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          })
        }
        ref={formRef}
      >
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
      </IressForm>
      <IressDivider />
      <IressButton
        onClick={() => {
          success({
            heading: 'Saved as draft (no validation)',
            children: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          });
        }}
      >
        Save as draft
      </IressButton>
    </>
  );
};

export const DisableValidationForm = (args: IressFormProps<FieldValues>) => (
  <IressToasterProvider>
    <Form {...args} />
  </IressToasterProvider>
);

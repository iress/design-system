import {
  FormRef,
  IressButton,
  IressDivider,
  IressForm,
  IressFormField,
  IressFormProps,
  IressInput,
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
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          })
        }
        onError={() =>
          error({
            heading: 'Failed validation',
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
          })
        }
        ref={formRef}
      >
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
      </IressForm>
      <IressDivider my="md" />
      <IressButton
        onClick={() => {
          success({
            heading: 'Saved as draft (no validation)',
            content: JSON.stringify(formRef.current?.api.getValues(), null, 2),
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

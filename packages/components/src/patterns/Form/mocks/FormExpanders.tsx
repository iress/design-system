import {
  IressExpander,
  IressForm,
  IressFormField,
  IressFormProps,
  IressInput,
  IressStack,
} from '@/main';
import { useState } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

const Form = (args: IressFormProps<FieldValues>) => (
  <IressForm {...args}>
    <IressStack gap="md">
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
    </IressStack>
  </IressForm>
);

export const FormExpanders = (args: IressFormProps<FieldValues>) => {
  const [expander, setExpander] = useState('');

  const isOpen = (name: string) => expander === name;

  return (
    <IressStack gap="sm">
      <IressExpander
        activator="Sender"
        open={isOpen('Sender')}
        onChange={(open) => open && setExpander('Sender')}
      >
        {isOpen('Sender') && <Form {...args} />}
      </IressExpander>
      <IressExpander
        activator="Recipient"
        open={isOpen('Recipient')}
        onChange={(open) => open && setExpander('Recipient')}
      >
        {isOpen('Recipient') && <Form {...args} />}
      </IressExpander>
    </IressStack>
  );
};

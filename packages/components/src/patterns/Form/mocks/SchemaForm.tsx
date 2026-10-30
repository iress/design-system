import { useState } from 'react';
import { z } from 'zod/v4';
import {
  IressButton,
  IressCheckbox,
  IressCheckboxGroup,
  IressForm,
  IressFormField,
  IressFormFieldset,
  IressInput,
  IressStack,
} from '@/main';

const profileSchema = z.object({
  name: z.string().min(1, 'Enter your name'),
  nickname: z.string().optional(),
  age: z
    .string()
    .regex(/^\d+$/, 'Enter your age in whole years')
    .transform(Number),
  contact: z.object({ email: z.email('Enter a valid email address') }),
  interests: z.array(z.string()).min(1, 'Choose at least one interest'),
});

export const SchemaForm = () => {
  const [submitted, setSubmitted] = useState<z.output<typeof profileSchema>>();

  return (
    <IressStack gap="md">
      <IressForm
        heading="Customer profile"
        pattern="short"
        schema={profileSchema}
        defaultValues={{
          name: '',
          nickname: '',
          age: '',
          contact: { email: '' },
          interests: [],
        }}
        onSubmit={setSubmitted}
        actions={
          <IressButton type="submit" mode="primary">
            Save profile
          </IressButton>
        }
      >
        <IressFormField
          name="name"
          label="Name"
          render={(field) => <IressInput {...field} />}
        />
        <IressFormField
          name="nickname"
          label="Nickname"
          render={(field) => <IressInput {...field} />}
        />
        <IressFormField
          name="age"
          label="Age"
          hint="Submitted as a number, not a string."
          render={(field) => <IressInput {...field} inputMode="numeric" />}
        />
        <IressFormField
          name="contact.email"
          label="Email"
          render={(field) => <IressInput {...field} type="email" />}
        />
        <IressFormFieldset
          name="interests"
          label="Interests"
          render={(field) => (
            <IressCheckboxGroup {...field}>
              <IressCheckbox value="investing">Investing</IressCheckbox>
              <IressCheckbox value="retirement">Retirement</IressCheckbox>
            </IressCheckboxGroup>
          )}
        />
      </IressForm>
      {submitted && (
        <pre aria-live="polite">{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </IressStack>
  );
};

import {
  IressAlert,
  IressButton,
  IressForm,
  IressFormField,
  IressInput,
} from '@/main';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';

export const SanitisedInputForm = () => {
  const [sanitisedData, setSanitisedData] = useState<FieldValues | null>(null);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          const clean = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              typeof value === 'string' ? DOMPurify.sanitize(value) : value,
            ]),
          );
          setSanitisedData(clean);
          console.log('Sanitised form data:', clean);
        }}
      >
        <IressFormField
          label="Name"
          name="name"
          rules={{ required: 'Name is required' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          label="Bio"
          name="bio"
          hint="Try entering HTML like <img src=x onerror=alert(1)> to see it sanitised"
          rules={{ required: 'Bio is required' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton mode="primary" type="submit">
          Submit
        </IressButton>
      </IressForm>
      {sanitisedData && (
        <IressAlert
          status="success"
          heading="Sanitised output"
          mt="lg"
          multiLine
        >
          <pre>{JSON.stringify(sanitisedData, null, 2)}</pre>
        </IressAlert>
      )}
    </>
  );
};

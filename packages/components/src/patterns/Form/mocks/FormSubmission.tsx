import {
  IressTable,
  type IressFormProps,
  IressForm,
  IressModal,
  IressFormField,
  IressInput,
  IressButton,
} from '@/main';
import { useState } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export const FormSubmission = (args: IressFormProps<FieldValues>) => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState<FieldValues | undefined>(
    undefined,
  );

  return (
    <IressForm
      {...args}
      onSubmit={(data) => {
        setSubmitted(data);
        setShowModal(true);
      }}
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
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
      <IressModal
        show={showModal}
        onShowChange={setShowModal}
        onExited={() => setSubmitted(undefined)}
      >
        <IressTable
          caption="Submitted details"
          rows={Object.entries(submitted ?? {}).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </IressForm>
  );
};

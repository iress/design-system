import {
  type IressFormProps,
  IressForm,
  IressModal,
  IressDivider,
  IressButton,
  IressTable,
  IressInline,
  IressStack,
  IressFormField,
  IressInput,
} from '@/main';
import { useState } from 'react';

interface FieldValues {
  name?: string;
  email?: string;
}

export const ControlledForm = (args: IressFormProps<FieldValues>) => {
  const [values, setValues] = useState<FieldValues>({
    name: 'Leia Skywalker',
    email: 'leia.skywalker@iress.com',
  });
  const [preview, setPreview] = useState(false);

  return (
    <>
      <IressForm
        {...args}
        onSubmit={(data) => {
          setValues(data);
          setPreview(true);
        }}
        values={values}
        mode="onChange"
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
      <IressInline gutter="sm">
        <IressButton onClick={() => setPreview(true)}>Last update</IressButton>
        <IressButton
          onClick={() =>
            setValues({
              name: '',
              email: '',
            })
          }
        >
          Clear
        </IressButton>
      </IressInline>
      <IressModal show={!!preview} onShowChange={(show) => setPreview(show)}>
        <IressTable
          caption="Last update"
          rows={Object.entries(values).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </>
  );
};

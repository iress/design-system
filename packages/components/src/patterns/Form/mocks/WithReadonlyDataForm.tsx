import {
  IressButton,
  IressCol,
  IressContainer,
  IressDivider,
  IressForm,
  IressFormField,
  IressInput,
  IressModal,
  IressRow,
  IressStack,
  IressTable,
  IressText,
} from '@/main';
import { useState } from 'react';
import { type FieldValues } from 'react-hook-form';

export const WithReadonlyDataForm = () => {
  const [values, setValues] = useState<FieldValues>({
    firstName: 'Leia',
    lastName: 'Skywalker',
    email: 'leia.skywalker@iress.com',
  });
  const [preview, setPreview] = useState(false);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          setValues(data);
          setPreview(true);
        }}
        values={values}
      >
        <IressContainer>
          <IressStack gap="md">
            <IressText element="h2">User Details</IressText>
            <IressRow gutter="md">
              <IressCol>
                <IressFormField
                  name="firstName"
                  label="First Name"
                  render={(controlledProps) => (
                    <IressInput {...controlledProps} readOnly />
                  )}
                  mb="none"
                />
              </IressCol>
              <IressCol>
                <IressFormField
                  name="lastName"
                  label="Last Name"
                  render={(controlledProps) => (
                    <IressInput {...controlledProps} readOnly />
                  )}
                  mb="none"
                />
              </IressCol>
            </IressRow>
            <IressDivider />
            <IressRow>
              <IressCol>
                <IressFormField
                  name="email"
                  label="Email"
                  render={(controlledProps) => (
                    <IressInput {...controlledProps} type="email" />
                  )}
                />
              </IressCol>
            </IressRow>
            <IressButton type="submit" mode="primary">
              Submit
            </IressButton>
          </IressStack>
        </IressContainer>
      </IressForm>
      <IressModal show={!!preview} onShowChange={(show) => setPreview(show)}>
        <IressTable
          caption="Submitted"
          rows={Object.entries(values).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressModal>
    </>
  );
};

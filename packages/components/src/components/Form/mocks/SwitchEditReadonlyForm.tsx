import {
  IressButton,
  IressCol,
  IressContainer,
  IressForm,
  IressFormField,
  IressIcon,
  IressInline,
  IressInput,
  IressModal,
  IressRow,
  IressSelect,
  IressStack,
  IressTable,
  IressText,
} from '@/main';
import { useState } from 'react';
import { type FieldValues } from 'react-hook-form';
import { type FormControlValue } from '@/main';

export const SwitchEditReadonlyForm = () => {
  const dependentOptions = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];
  const [values, setValues] = useState<FieldValues>({
    firstName: 'Leia',
    lastName: 'Skywalker',
    email: 'leia.skywalker@iress.com',
    dependents: 0,
  });
  const [preview, setPreview] = useState(false);
  const [editable, setEditable] = useState(false);

  return (
    <>
      <IressForm
        onSubmit={(data) => {
          setValues(data);
          setPreview(true);
          setEditable(false);
        }}
        values={values}
      >
        <IressContainer>
          <IressStack gutter="md">
            <IressText element="h2">User Details</IressText>
            <IressRow gutter="md">
              <IressCol>
                <IressFormField
                  name="firstName"
                  label="First Name"
                  render={(controlledProps) => (
                    <IressInput {...controlledProps} readOnly={!editable} />
                  )}
                />
              </IressCol>
              <IressCol>
                <IressFormField
                  name="lastName"
                  label="Last Name"
                  render={(controlledProps) => (
                    <IressInput {...controlledProps} readOnly={!editable} />
                  )}
                />
              </IressCol>
            </IressRow>
            <IressRow gutter="md">
              <IressCol>
                <IressFormField
                  name="email"
                  label="Email"
                  render={(controlledProps) => (
                    <IressInput
                      {...controlledProps}
                      readOnly={!editable}
                      type="email"
                    />
                  )}
                />
              </IressCol>
              <IressCol>
                <IressFormField
                  name="dependents"
                  label="dependents"
                  render={(controlledProps) => (
                    <IressSelect
                      {...controlledProps}
                      readonly={!editable}
                      onChange={(
                        e: React.ChangeEvent<HTMLSelectElement>,
                        value?: FormControlValue,
                      ) => controlledProps.onChange(value)}
                    >
                      {dependentOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </IressSelect>
                  )}
                />
              </IressCol>
            </IressRow>
            {editable ? (
              <IressInline gutter="sm">
                <IressButton type="submit" mode="primary">
                  Save
                </IressButton>
                <IressButton onClick={() => setEditable(false)}>
                  Cancel
                </IressButton>
              </IressInline>
            ) : (
              <IressButton
                onClick={() => setEditable(true)}
                prepend={<IressIcon name="pencil" />}
              >
                Edit
              </IressButton>
            )}
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

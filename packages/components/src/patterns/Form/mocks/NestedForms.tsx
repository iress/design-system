import {
  IressButton,
  IressDivider,
  IressFieldGroup,
  IressForm,
  IressFormField,
  IressFormValidationSummary,
  IressInline,
  IressInput,
  IressModal,
  IressPanel,
  IressStack,
  IressTable,
} from '@/main';
import { useState } from 'react';

interface FormData {
  name: string;
}

const MainForm = () => {
  const [details, setDetails] = useState<FormData | undefined>();

  return (
    <>
      <IressForm<FormData>
        alert={
          <IressFormValidationSummary heading="Please fix the errors for the main form" />
        }
        id="mainForm"
        onSubmit={(data) => {
          setDetails(data);
        }}
      >
        <IressFormField<FormData>
          name="name"
          label="Name"
          render={(controlledProps) => <IressInput {...controlledProps} />}
          rules={{ required: true }}
        />
      </IressForm>
      <IressModal
        show={!!details}
        onShowChange={(show) => !show && setDetails(undefined)}
      >
        {details && (
          <IressTable
            caption="Submitted main form"
            rows={Object.entries(details).map((entry) => ({
              name: entry[0],
              value: JSON.stringify(entry[1], null, 2),
            }))}
          />
        )}
      </IressModal>
    </>
  );
};

const SubForm = () => {
  const [details, setDetails] = useState<FormData | undefined>();

  return (
    <IressPanel bg="alt">
      <IressStack gap="md">
        <IressForm<FormData>
          alert={
            <IressFormValidationSummary heading="Please fix the errors for the dependants" />
          }
          id="subForm"
          onSubmit={(data) => {
            setDetails(data);
          }}
        >
          <IressFieldGroup label="Add new dependant" inline mb="none">
            <IressFormField
              name="name"
              label="Name"
              render={(controlledProps) => <IressInput {...controlledProps} />}
              rules={{ required: true }}
            />
            <IressButton type="submit">Save</IressButton>
          </IressFieldGroup>
        </IressForm>
        <IressTable
          caption="Dependants"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'value', label: 'Value' },
          ]}
          rows={Object.entries(details ?? {}).map((entry) => ({
            name: entry[0],
            value: JSON.stringify(entry[1], null, 2),
          }))}
        />
      </IressStack>
    </IressPanel>
  );
};

export const NestedFormsExample = () => {
  const submitAllForms = () => {
    document.querySelector<HTMLFormElement>('[id=mainForm]')?.requestSubmit();
    document.querySelector<HTMLFormElement>('[id=subForm]')?.requestSubmit();
  };

  return (
    <IressStack gap="md">
      <MainForm />
      <SubForm />
      <IressDivider />
      <IressInline gap="md">
        <IressButton type="submit" form="mainForm">
          Submit main form
        </IressButton>
        <IressButton onClick={submitAllForms}>Submit all forms</IressButton>
      </IressInline>
    </IressStack>
  );
};

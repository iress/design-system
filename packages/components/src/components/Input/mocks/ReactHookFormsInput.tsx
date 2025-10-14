import {
  InputRef,
  IressAlert,
  IressButton,
  IressInline,
  IressInput,
  IressLabel,
  IressModal,
  IressStack,
  IressTable,
} from '@/main';
import { useState } from 'react';
import { Controller, UseFormRegisterReturn, useForm } from 'react-hook-form';

const registerInnerElement = (register: UseFormRegisterReturn) => {
  return {
    ...register,
    onClear: register.onChange,
    ref: (ref: InputRef | null) => {
      if (ref) {
        register.ref(ref.input);
      }
    },
  };
};

export const ReactHookFormsInput = () => {
  const { register, handleSubmit, control } = useForm();
  const [data, setData] = useState<Record<string, string> | undefined>();

  return (
    // eslint-disable-next-line sonarjs/void-use -- This is a mock form submission
    <form onSubmit={void handleSubmit(setData)}>
      <IressStack gutter="md">
        <IressAlert status="info">
          Although you can use <code>IressInput</code> directly with React Hook
          Forms, we recommend using <code>IressFormField</code> within{' '}
          <code>IressForm</code> for a more integrated experience.
        </IressAlert>
        <IressInline gutter="md" verticalAlign="middle">
          <IressLabel htmlFor="Controller">
            Input using <code>{`{ Controller } from 'react-hook-forms'`}</code>
          </IressLabel>
          <Controller
            name="Controller"
            control={control}
            render={({ field }) => (
              <IressInput
                {...field}
                clearable
                onClear={field.onChange}
                id="firstName"
              />
            )}
          />
        </IressInline>
        <IressInline gutter="md" verticalAlign="middle">
          <IressLabel htmlFor="register">
            Input using <code>{`{ register } = useForm()`}</code>
          </IressLabel>
          <IressInput
            {...registerInnerElement(register('register'))}
            clearable
            id="register"
          />
        </IressInline>
        <IressButton type="submit">Submit</IressButton>
      </IressStack>
      {data && (
        <IressModal
          show={!!data}
          onShowChange={(show) => !show && setData(undefined)}
        >
          <IressTable
            caption="Submitted details"
            rows={Object.entries(data ?? {}).map((entry) => ({
              name: entry[0],
              value: JSON.stringify(entry[1], null, 2),
            }))}
          />
        </IressModal>
      )}
    </form>
  );
};

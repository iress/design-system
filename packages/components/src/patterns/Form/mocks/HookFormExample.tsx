import {
  IressButton,
  IressCheckbox,
  IressContainer,
  IressDivider,
  IressFormField,
  IressHookForm,
  IressInput,
  IressInputCurrency,
  IressPanel,
  IressText,
} from '@/main';
import { useForm } from 'react-hook-form';

interface FieldValues {
  firstName: string;
  lastName: string;
  insuredAtPolicyLevel?: boolean;
  sumInsured?: number;
  sumInsured_na?: string;
}

export const HookFormExample = () => {
  const initialInsuredAtPolicyLevel = false;
  const initialSumInsured = 5000;

  const form = useForm<FieldValues>();
  const { watch, control } = form;

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const insuredAtPolicyLevel = watch('insuredAtPolicyLevel');

  return (
    <IressContainer>
      <IressText>
        <h2>Hook Form Example</h2>
        <p>
          This example demonstrates how to use the <code>IressHookForm</code>{' '}
          component to create a form with controlled fields and conditional
          rendering based on form values.
        </p>
        <IressHookForm form={form}>
          {firstName && lastName && (
            <IressPanel mb="md" bg="alt">
              Name: {firstName} {lastName}
            </IressPanel>
          )}
          <IressFormField
            name="firstName"
            label="First Name"
            render={(controlledProps) => <IressInput {...controlledProps} />}
            rules={{ required: true }}
          />
          <IressFormField
            name="lastName"
            label="Last Name"
            render={(controlledProps) => (
              <IressInput {...controlledProps} type="email" />
            )}
            rules={{ required: true }}
          />
          <IressDivider mt="lg" mb="md" />
          <IressFormField
            name="insuredAtPolicyLevel"
            defaultChecked={initialInsuredAtPolicyLevel}
            label="Insurance options"
            control={control}
            render={(controlledProps) => (
              <IressCheckbox {...controlledProps}>
                Insured at policy level
              </IressCheckbox>
            )}
          />
          {insuredAtPolicyLevel && (
            <IressFormField
              name="sumInsured"
              defaultValue={initialSumInsured}
              label="Sum insured"
              control={control}
              render={(controlledProps) => (
                <IressInputCurrency {...controlledProps} currencyCode="GBP" />
              )}
            />
          )}
          {!insuredAtPolicyLevel && (
            <IressFormField
              name="sumInsured_na"
              defaultValue="N/A"
              label="Sum insured"
              control={control}
              render={(properties) => <IressInput {...properties} readOnly />}
            />
          )}
          <IressButton type="submit" mode="primary">
            Submit
          </IressButton>
        </IressHookForm>
      </IressText>
    </IressContainer>
  );
};

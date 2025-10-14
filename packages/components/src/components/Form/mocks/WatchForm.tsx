import {
  IressStack,
  IressRow,
  IressCol,
  IressFormField,
  IressInputCurrency,
  IressInput,
  IressCheckbox,
  IressText,
} from '@/main';
import { IressForm } from '../Form';

export const WatchForm = () => {
  const initialInsuredAtPolicyLevel = false;
  const initialSumInsured = 5000;

  const { watch, control } = IressForm.useForm();
  const form = IressForm.useForm();
  const insuredAtPolicyLevel = watch('insuredAtPolicyLevel') as
    | boolean
    | undefined;

  return (
    <IressForm form={form}>
      <IressStack gutter="lg" data-testid="income-details">
        <IressText>
          This is a conditional field example using "watch".
        </IressText>
        <IressRow gutter="lg">
          <IressCol span={{ md: '8' }}>
            <IressStack gutter="sm">
              {insuredAtPolicyLevel && (
                <IressFormField
                  name="sumInsured"
                  defaultValue={initialSumInsured}
                  label="Sum insured"
                  control={control}
                  render={(properties) => (
                    <IressInputCurrency {...properties} currencyCode="GBP" />
                  )}
                />
              )}
              {!insuredAtPolicyLevel && (
                <IressFormField
                  name="sumInsured_na"
                  defaultValue="N/A"
                  label="Sum insured"
                  control={control}
                  render={(properties) => (
                    <IressInput {...properties} readOnly />
                  )}
                />
              )}
              <IressFormField
                name="insuredAtPolicyLevel"
                defaultChecked={initialInsuredAtPolicyLevel}
                label=""
                control={control}
                render={(properties) => (
                  <IressCheckbox {...properties}>
                    Insured at policy level
                  </IressCheckbox>
                )}
              />
            </IressStack>
          </IressCol>
        </IressRow>
      </IressStack>
    </IressForm>
  );
};

import {
  type FormControlValue,
  IressButton,
  IressCheckbox,
  IressForm,
  IressFormFieldset,
  IressPanel,
  IressStack,
  IressTable,
} from '@/main';
import { IressCheckboxGroup } from '../CheckboxGroup';
import { toArray } from '../../../helpers/formatting/toArray';
import { useWatch } from 'react-hook-form';

interface FieldValues {
  'let-them-eat-cake'?: FormControlValue[];
}

const SelectedValues = () => {
  const value = useWatch<FieldValues>({ name: 'let-them-eat-cake' });
  const valueString = toArray(value).join(', ');

  return (
    <IressPanel>
      Selected values: {valueString ? valueString : 'None'}
    </IressPanel>
  );
};

export const CheckboxGroupTable = () => (
  <IressForm
    defaultValues={{
      'let-them-eat-cake': ['lemon-drizzle', 'victoria-sponge'],
    }}
  >
    <IressStack gap="md">
      <SelectedValues />
      <IressFormFieldset
        label="Let them eat cake"
        name="let-them-eat-cake"
        hiddenLabel
        rules={{ required: 'Please select a cake' }}
        render={(field) => (
          <IressCheckboxGroup {...field} layout="stack">
            <IressTable
              caption="Available options"
              columns={[
                { key: 'select', label: 'Select', width: '2rem' },
                { key: 'name', label: 'Name' },
              ]}
              rows={[
                {
                  select: (
                    <IressCheckbox hiddenLabel value="lemon-drizzle">
                      Select lemon drizzle
                    </IressCheckbox>
                  ),
                  name: 'Lemon drizzle',
                },
                {
                  select: (
                    <IressCheckbox hiddenLabel value="victoria-sponge">
                      Select Victoria Sponge
                    </IressCheckbox>
                  ),
                  name: 'Victoria Sponge',
                },
                {
                  select: (
                    <IressCheckbox hiddenLabel value="carrot-cake">
                      Select Carrot Cake
                    </IressCheckbox>
                  ),
                  name: 'Carrot Cake',
                },
              ]}
            />
          </IressCheckboxGroup>
        )}
      />
      <IressButton type="submit" mode="primary">
        Submit
      </IressButton>
    </IressStack>
  </IressForm>
);

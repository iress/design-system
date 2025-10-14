import {
  IressStack,
  IressRow,
  IressCol,
  IressFormField,
  IressInputCurrency,
  IressSelect,
  IressButton,
  IressText,
  IressDivider,
  IressForm,
  IressHookForm,
} from '@/main';
import { useState } from 'react';

interface FormData {
  primaryField: string;
  dependentField: string;
}

const budgetOptions = [
  { value: 'less-than-499', label: 'Less than $499' },
  { value: 'between-500-999', label: 'Between $500 to $999' },
  { value: 'more-than-1000', label: 'More than $1000' },
];

const validateBudgetInput = (
  value: string,
  selectedBudget: string,
): string | true => {
  if (!selectedBudget) return 'Select budget range first';

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return 'Enter a valid number';

  switch (selectedBudget) {
    case 'less-than-499':
      return numericValue < 499 || 'Must be less than $499';
    case 'between-500-999':
      return (
        (numericValue >= 500 && numericValue <= 999) ||
        'Must be between $500-$999'
      );
    case 'more-than-1000':
      return numericValue > 1000 || 'Must be more than $1000';
    default:
      return true;
  }
};

export const ValidationDependOnOtherFields = () => {
  const [submitted, setSubmitted] = useState<FormData | undefined>(undefined);

  const form = IressForm.useForm<FormData>({
    defaultValues: {
      primaryField: '',
      dependentField: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setSubmitted(data);
  };

  const onError = (errors: Record<string, unknown>) => {
    console.log('Form validation errors:', errors);
  };

  return (
    <>
      <IressText element="h1">Validation depend on other fields</IressText>
      <IressText element="p">
        This form demonstrates how to validate a field based on the value of
        another field. The budget amount field is validated against the selected
        budget range.
      </IressText>
      <IressHookForm form={form} onSubmit={onSubmit} onError={onError}>
        <IressStack gap="md">
          <IressRow>
            <IressCol>
              <IressFormField
                name="primaryField"
                label="Monthly investment budget"
                rules={{
                  required: 'Budget range is required',
                }}
                render={(field) => (
                  <IressSelect
                    {...field}
                    placeholder="Select your budget range"
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </IressSelect>
                )}
              />
            </IressCol>
          </IressRow>
          <IressRow>
            <IressCol>
              <IressFormField
                name="dependentField"
                label="Enter your budget amount ($)"
                rules={{
                  required: 'Budget amount is required',
                  validate: (value: string, formValues: FormData) =>
                    validateBudgetInput(value, formValues.primaryField),
                }}
                render={(field) => (
                  <IressInputCurrency {...field} type="number" />
                )}
              />
            </IressCol>
          </IressRow>
          <IressButton type="submit">Submit</IressButton>
        </IressStack>
      </IressHookForm>
      <IressDivider />
      {submitted && (
        <IressStack gap="md">
          <IressText element="h3">Submitted Values</IressText>
          <IressText>
            Budget Range:{' '}
            {budgetOptions.find(
              (option) => option.value === submitted.primaryField,
            )?.label ?? submitted.primaryField}
          </IressText>
          <IressText>Budget Amount: ${submitted.dependentField}</IressText>
        </IressStack>
      )}
    </>
  );
};

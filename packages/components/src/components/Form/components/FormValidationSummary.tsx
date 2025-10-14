import { useContext } from 'react';
import { FormContext } from '../FormContext';
import { formatObjectKey } from '@helpers/formatting/formatObjectKey';
import {
  IressValidationSummary,
  type IressValidationSummaryProps,
} from '@/components/ValidationMessage';

/**
 * Validation summary messages based on the form context from react-hook-form
 */
export const FormValidationSummary = (
  props: Omit<IressValidationSummaryProps, 'messages'>,
) => {
  const form = useContext(FormContext);

  if (!form) {
    throw new Error('FormValidationSummary must be used within a IressForm');
  }

  // TODO: Possibly move this logic to a resolver so we can access the original field reference
  // Resolvers are a big change to how the validation would work, as we would have to ask the consumers to use a schema to validate the form
  const validationSummaryMessages = Object.entries(form.errorMessages)
    .filter(([, error]) => !!error)
    .map(([fieldName, error]) => {
      // Get the field id
      const fieldId = `${form?.id}__${fieldName}`;
      const fieldElement = document.getElementById(fieldId);

      // Get the field label
      const fieldLabelList = (fieldElement as HTMLInputElement)?.labels;
      const fieldLabels = Array.from(fieldLabelList ?? []);
      const fieldLegend = fieldElement
        ?.closest('fieldset')
        ?.querySelector('legend');

      const errorMessagePrefix = `${
        fieldLabels[0]?.dataset?.name ??
        fieldLegend?.dataset?.name ??
        formatObjectKey(fieldName)
      }: `;

      return {
        linkToTarget: fieldId,
        message: `${errorMessagePrefix}${error}`,
      };
    });

  return (
    <IressValidationSummary {...props} messages={validationSummaryMessages} />
  );
};

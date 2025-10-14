import { stringReplacer } from '@helpers/formatting/stringReplacer';

export enum FormFieldErrorMessages {
  required = 'Please fill out this field',
  maxLength = 'Please shorten this text to {{attrValue}} characters or less',
  minLength = 'Please lengthen this text to {{attrValue}} characters or more',
  max = 'Please enter a value less than or equal to {{attrValue}}',
  min = 'Please enter a value greater than or equal to {{attrValue}}',
  minDate = 'Please enter a date that is on or after {{attrValue}}',
  maxDate = 'Please enter a date that is on or before {{attrValue}}',
  pattern = 'Please match the requested format',
  email = 'Please enter a valid email address',
  validate = 'Please enter a valid value',
}

export type FormFieldErrorType = keyof typeof FormFieldErrorMessages;

export const getErrorTypeMessage = (
  message?: string,
  type?: FormFieldErrorType,
  rules?: Partial<Record<FormFieldErrorType, unknown>>,
  prefix = '',
) => {
  if (message) {
    return message;
  }

  const defaultMessage = type
    ? stringReplacer(
        FormFieldErrorMessages[type] ?? FormFieldErrorMessages.validate,
        [
          {
            name: '{{attrValue}}',
            value: String(rules?.[type]),
          },
        ],
      )
    : FormFieldErrorMessages.validate;

  return `${prefix}${defaultMessage}`;
};

import { stringReplacer } from '@helpers/formatting/stringReplacer';
import {
  FormFieldErrorMessages,
  type FormFieldErrorType,
} from '../FormField.types';

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

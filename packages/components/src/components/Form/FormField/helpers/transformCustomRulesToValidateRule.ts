import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  type Validate,
  type PathValue,
} from 'react-hook-form';
import { getDateObj } from '@/helpers/formatting/formatDate';
import { type CustomRules } from '../FormField.types';

export const transformCustomRulesToValidateRule = <
  T extends FieldValues = FieldValues,
>({
  email,
  minDate: minDateRule,
  maxDate: maxDateRule,
  validate,
  ...defaultRules
}: CustomRules<T>): UseControllerProps<T, FieldPath<T>>['rules'] => {
  if (
    validate &&
    typeof validate !== 'object' &&
    (email || minDateRule || maxDateRule)
  ) {
    throw new Error(
      'IressForm: To use custom IDS rules, the validate prop must be an object.',
    );
  }

  const customValidate = (validate ?? {}) as Record<
    string,
    Validate<PathValue<T, FieldPath<T>>, T>
  >;

  if (email) {
    customValidate.email = (value?: string) => {
      if (!value) {
        return true;
      }

      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      const result = typeof email === 'string' ? email : false;

      return emailRegex.test(value) || result;
    };
  }

  if (minDateRule) {
    const minDate = minDateRule instanceof Date ? minDateRule : minDateRule.value;
    const result = minDateRule instanceof Date ? false : minDateRule.message;

    customValidate.minDate = (value?: Date | string) => {
      if (!value) {
        return true;
      }

      return getDateObj(value) >= minDate || result;
    };
  }

  if (maxDateRule) {
    const maxDate = maxDateRule instanceof Date ? maxDateRule : maxDateRule.value;
    const result = maxDateRule instanceof Date ? false : maxDateRule.message;

    customValidate.maxDate = (value?: Date | string) => {
      if (!value) {
        return true;
      }

      return getDateObj(value) <= maxDate || result;
    };
  }

  return {
    ...defaultRules,
    validate: customValidate,
  };
};

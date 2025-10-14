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
    const minDate = 'value' in minDateRule ? minDateRule.value : minDateRule;
    const result = 'message' in minDateRule ? minDateRule.message : false;

    customValidate.minDate = (value?: Date | string) => {
      if (!value) {
        return true;
      }

      return getDateObj(value) >= minDate || result;
    };
  }

  if (maxDateRule) {
    const maxDate = 'value' in maxDateRule ? maxDateRule.value : maxDateRule;
    const result = 'message' in maxDateRule ? maxDateRule.message : false;

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

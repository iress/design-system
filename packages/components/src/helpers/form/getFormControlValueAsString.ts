import { FormControlValue } from '@/types';

export const getFormControlValueAsString = <T = FormControlValue>(
  value?: T,
): string => {
  // eslint-disable-next-line sonarjs/different-types-comparison -- it could be null
  return value === undefined || value === null ? '' : String(value);
};

import { type FormControlValue } from '@/types';

export const getFormControlValueAsString = (
  value?: FormControlValue,
): string => {
  return value === undefined || value === null ? '' : String(value);
};

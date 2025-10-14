import { type FormControlValue } from '@/types';
import { getFormControlValueAsString } from './getFormControlValueAsString';

export const getFormControlValueAsStringIfDefined = <T = FormControlValue>(
  value?: T,
): string | undefined => {
  if (value === undefined) return undefined;
  return getFormControlValueAsString(value);
};

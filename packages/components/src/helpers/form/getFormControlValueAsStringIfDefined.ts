import { type FormControlValue } from '@/types';
import { getFormControlValueAsString } from './getFormControlValueAsString';

export const getFormControlValueAsStringIfDefined = (
  value?: FormControlValue,
): string | undefined => {
  if (value === undefined) return undefined;
  return getFormControlValueAsString(value);
};

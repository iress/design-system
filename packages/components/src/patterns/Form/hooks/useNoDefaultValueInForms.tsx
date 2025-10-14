import { useContext } from 'react';
import { FormContext } from '../FormContext';
import { type FormControlValue } from '@/types';

interface NoDefaultValueInFormsHookProps<T = FormControlValue> {
  component: string;
  defaultValue?: T;
  message?: string;
}

export const useNoDefaultValueInForms = <T = FormControlValue,>({
  component,
  defaultValue,
  message,
}: NoDefaultValueInFormsHookProps<T>) => {
  const form = useContext(FormContext);

  if (form && defaultValue !== undefined) {
    throw new Error(
      message ??
        `Using the defaultValue prop on an ${component} inside an IressForm component is not supported. Please use the defaultValue prop on the IressFormField, or use defaultValues on the IressForm component (recommended) to ensure a single source of truth for your form.`,
    );
  }
};

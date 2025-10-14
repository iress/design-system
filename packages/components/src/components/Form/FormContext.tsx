import { createContext } from 'react';
import { type IressFormProps } from './Form.types';
import { type FieldValues } from 'react-hook-form';

export interface FormContextValue {
  id: IressFormProps<FieldValues>['id'];
  errorMessages: Record<keyof FieldValues, string | undefined>;
  setErrorMessage: (name: keyof FieldValues, message?: string) => void;
}

export const FormContext = createContext<FormContextValue | undefined>(
  undefined,
);

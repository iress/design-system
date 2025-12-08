import { createContext } from 'react';
import type { FieldValues } from 'react-hook-form';

export interface FormContextValue {
  /**
   * The error messages for each field in the form.
   * The keys are the field names, and the values are the error messages.
   * If a field has no error, the value will be `undefined`.
   * This is used to display validation errors in the form.
   */
  errorMessages: Record<keyof FieldValues, string | undefined>;

  /**
   * The ID of the form.
   * This is used to link the form with its fields and validation messages.
   */
  id: string;

  /**
   * Sets what element should receive focus when the form is submitted but there are validation errors.
   */
  setFocusOnError: (element: HTMLElement | null) => void;

  /**
   * Sets an error message for a specific field in the form.
   * If the message is `undefined`, it will remove the error for that field.
   * This is useful for dynamically updating error messages based on user input or validation results.
   * @param name The name of the field to set the error message for.
   * @param message The error message to set for the field. If `undefined`, it will remove the error for that field.
   */
  setErrorMessage: (name: keyof FieldValues, message?: string) => void;
}

export const FormContext = createContext<FormContextValue | undefined>(
  undefined,
);

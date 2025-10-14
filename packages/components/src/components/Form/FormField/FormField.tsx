import { useContext, useEffect, useMemo } from 'react';
import { type FieldValues, useController } from 'react-hook-form';
import { getErrorTypeMessage } from './helpers/getErrorTypeMessage';
import {
  type FormFieldErrorType,
  type IressFormFieldProps,
} from './FormField.types';
import { FormContext } from '../FormContext';
import { transformCustomRulesToValidateRule } from './helpers/transformCustomRulesToValidateRule';
import { IressForm } from '../Form';
import { IressField } from '@/components/Field';

/**
 * A `IressField` wrapper that can show error message and label automatically inside an `IressForm`.
 * It uses the `useController` hook from `react-hook-form` for form management.
 */
export const IressFormField = <TFieldValues extends FieldValues>({
  control: controlProp,
  defaultValue,
  name,
  render,
  rules: withCustomRules,
  shouldUnregister = false,
  readOnly,
  ...fieldProps
}: IressFormFieldProps<TFieldValues>) => {
  const form = useContext(FormContext);

  if (!form) {
    throw new Error(
      'IressFormField must be used inside an IressForm. If you need a standalone field, use IressField instead.',
    );
  }

  const context = IressForm.useFormContext();
  const control = controlProp ?? context.control;

  const rules = useMemo(() => {
    if (readOnly) return undefined;
    return withCustomRules
      ? transformCustomRulesToValidateRule(withCustomRules)
      : undefined;
  }, [readOnly, withCustomRules]);

  const { field, fieldState } = useController<TFieldValues>({
    control: controlProp,
    defaultValue,
    name,
    rules,
    shouldUnregister:
      typeof shouldUnregister === 'boolean' ? shouldUnregister : false,
  });

  useEffect(() => {
    return () => {
      if (typeof shouldUnregister === 'object') {
        control?.unregister(name, shouldUnregister);
      }
    };
  }, [control, name, shouldUnregister]);

  const errorMessage = useMemo(
    () =>
      fieldState.error
        ? getErrorTypeMessage(
            fieldState.error?.message,
            fieldState.error?.type as FormFieldErrorType,
            withCustomRules,
          )
        : '',
    [fieldState.error, withCustomRules],
  );

  useEffect(() => {
    if (!readOnly) {
      form.setErrorMessage(name, errorMessage);
    } else {
      form.setErrorMessage(name, '');
    }
  }, [errorMessage, form, name, readOnly]);

  return (
    <IressField
      errorMessages={
        errorMessage && !readOnly ? [{ message: errorMessage }] : undefined
      }
      readOnly={readOnly}
      required={!!rules?.required}
      htmlFor={`${form?.id}__${name}`}
      {...fieldProps}
    >
      {render({ ...field, id: `${form?.id}__${name}` })}
    </IressField>
  );
};

import { useContext, useEffect, useMemo } from 'react';
import { type FieldValues, useController } from 'react-hook-form';
import { getErrorTypeMessage } from './helpers/getErrorTypeMessage';
import { IressFieldGroup } from '@/components/Field';
import {
  type FormFieldErrorType,
  type IressFormFieldsetProps,
} from './FormField.types';
import { FormContext } from '../FormContext';
import { transformCustomRulesToValidateRule } from './helpers/transformCustomRulesToValidateRule';

/**
 * A `IressFieldGroup` wrapper that can show error message and legend automatically inside an `IressForm`.
 * It uses the `useController` hook from `react-hook-form` for form management.
 */
export const IressFormFieldset = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  render,
  rules: withCustomRules,
  shouldUnregister,
  ...fieldGroupProps
}: IressFormFieldsetProps<TFieldValues>) => {
  const form = useContext(FormContext);

  if (!form) {
    throw new Error(
      'IressFormFieldset must be used inside an IressForm. If you need a standalone field, use IressFieldGroup instead.',
    );
  }

  const rules = withCustomRules
    ? transformCustomRulesToValidateRule(withCustomRules)
    : undefined;

  const { field, fieldState } = useController<TFieldValues>({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  });

  const errorMessage = useMemo(
    () =>
      fieldState.error
        ? getErrorTypeMessage(
            fieldState.error?.message,
            fieldState.error?.type as FormFieldErrorType,
            withCustomRules,
          )
        : '',
    [fieldState, withCustomRules],
  );

  useEffect(() => {
    form.setErrorMessage(name, errorMessage);
  }, [errorMessage, form, name]);

  return (
    <IressFieldGroup
      errorMessages={errorMessage ? [{ message: errorMessage }] : undefined}
      required={!!rules?.required}
      {...fieldGroupProps}
    >
      {render({ ...field, id: `${form?.id}__${name}` })}
    </IressFieldGroup>
  );
};

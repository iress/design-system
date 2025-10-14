import { ReactNode, useContext, useEffect, useMemo, useRef } from 'react';
import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  FormFieldErrorType,
  getErrorTypeMessage,
} from './helpers/getErrorTypeMessage';
import { IressFieldGroup, IressFieldGroupProps } from '@/components/Field';
import { FormContext } from '../FormContext';
import {
  CustomRules,
  transformCustomRulesToValidateRule,
} from './helpers/transformCustomRulesToValidateRule';
import { FormFieldRenderProps } from './FormField';
import { useFieldRenderProps } from './hooks/useFieldRenderProps';
import { ReactHookFormCompatibleRef } from '@/interfaces';

export interface IressFormFieldsetProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
> extends Omit<
      IressFieldGroupProps,
      'children' | 'htmlFor' | 'required' | 'join' | 'inline'
    >,
    Omit<UseControllerProps<T, FieldPath<T>>, 'disabled'> {
  /**
   * React Hook Form control object. It is used to register the field with the form.
   * It is automatically provided when used inside an `IressForm`, but it can be overridden if you are using a custom form control.
   * @see https://react-hook-form.com/ts#Control
   */
  control?: Control<T>;

  /**
   * A default value for the field. Although this is provided here as it is part of the React Hook Form API, it is recommended to set the default value in the form's `defaultValues` prop, to ensure the form is correctly initialised.
   */
  defaultValue?: FieldPathValue<T, TName>;

  /**
   * Name of the field. It is used to identify the field in the form. It must be unique within the form.
   */
  name: FieldPath<T>;

  /**
   * Render function to provide the control for the field.
   */
  render: (field: FormFieldRenderProps<T>) => ReactNode;

  /**
   * Validation rules, including: required, min, max, minLength, maxLength, pattern, validate
   * @see https://react-hook-form.com/api/useform/register
   */
  rules?: CustomRules<T>;

  /**
   * Input will be unregistered after unmount and defaultValues will be removed as well (it will not be stored in the form state).
   * @see https://react-hook-form.com/docs/usecontroller
   */
  shouldUnregister?: boolean;
}

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
  const fieldRef = useRef<ReactHookFormCompatibleRef | null>(null);

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

  const renderField = useFieldRenderProps<TFieldValues>(field, fieldRef);

  return (
    <IressFieldGroup
      errorMessages={errorMessage ? [{ message: errorMessage }] : undefined}
      required={!!rules?.required}
      {...fieldGroupProps}
    >
      {render({ ...renderField, id: `${form?.id}__${name}` })}
    </IressFieldGroup>
  );
};

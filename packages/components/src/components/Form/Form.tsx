import { forwardRef } from 'react';
import {
  type FieldValues,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { type FormRef, type IressFormProps } from './Form.types';
import { IressHookForm } from './HookForm/HookForm';

const Form = <T extends FieldValues>(
  {
    defaultValues,
    context,
    criteriaMode,
    delayError,
    mode = 'onSubmit',
    progressive,
    resetOptions,
    resolver,
    reValidateMode = 'onChange',
    shouldFocusError,
    shouldUseNativeValidation,
    shouldUnregister,
    values,
    ...restProps
  }: IressFormProps<T>,
  ref: React.ForwardedRef<FormRef<T>>,
) => {
  const methods = useForm<T>({
    defaultValues,
    context,
    criteriaMode,
    delayError,
    mode,
    progressive,
    resetOptions,
    resolver,
    reValidateMode,
    shouldFocusError: shouldFocusError ?? restProps.hiddenErrorSummary,
    shouldUseNativeValidation,
    shouldUnregister,
    values,
  });

  return <IressHookForm<T> form={methods} {...restProps} ref={ref} />;
};

const ForwardedForm = forwardRef(Form) as <T extends FieldValues>(
  props: IressFormProps<T> & { ref?: React.Ref<FormRef<T>> },
) => React.ReactElement;
export const IressForm = ForwardedForm as typeof ForwardedForm & {
  useForm: typeof useForm;
  useWatch: typeof useWatch;
  useFormContext: typeof useFormContext;
};

/**
 * Allows you to use the methods from `react-hook-form` in a nested component of `IressForm`.
 * This is useful when you need to access the form methods in a component that is not a direct child of `IressForm`.
 */
IressForm.useForm = useForm;

/**
 * Allows you to use the form context from `react-hook-form` in a nested component of `IressForm`.
 * This is useful when you need to access the form context in a component that is not a direct child of `IressForm`.
 */
IressForm.useFormContext = useFormContext;

/**
 * Allows you watch changes to other form fields in an IressForm.
 * This is useful when you need to conditionally render fields based on the value of another field.
 */
IressForm.useWatch = useWatch;

import {
  FormEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  useFieldArray,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';
import { useIdIfNeeded } from '../../../hooks';
import { IressFormValidationSummary } from '../FormValidationSummary/FormValidationSummary';
import { IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { FormContext, FormContextValue } from '../FormContext';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@/helpers/utility/propagateTestid';

export interface IressHookFormProps<T extends FieldValues, TContext = object>
  extends Omit<
    IressStyledProps<'form'>,
    'defaultChecked' | 'defaultValue' | 'onSubmit' | 'onError'
  > {
  /**
   * The content of the alert section.
   * @default <IressFormValidationSummary srOnly />
   */
  alert?: ReactNode;

  /**
   * The content of the form, usually multiple `IressFormField` or `IressFormFieldset` components.
   */
  children?: ReactNode;

  /**
   * React hook form instance.
   */
  form: UseFormReturn<T, TContext>;

  /**
   * Emitted when any field has an error.
   * Called after the first submit if any errors are recorded, and from then on when any value changes.
   *
   * @see https://react-hook-form.com/docs/useform/handlesubmit
   */
  onError?: SubmitErrorHandler<T>;

  /**
   * Handler for when the submit method on the form is called after validation is passed.
   *
   * @see https://react-hook-form.com/docs/useform/handlesubmit
   */
  onSubmit?: (data: T) => void;

  /**
   * Emitted when the form state is valid.
   *
   * @see https://react-hook-form.com/docs/useform/formstate
   */
  onValidChange?: (isValid: boolean) => void;

  /**
   * If set to `true`, the summary will only update when the form is submitted, not on every field change.
   * This is useful for performance reasons, especially in large forms.
   * @default false
   */
  updateErrorSummaryOnSubmit?: boolean;
}

/**
 * The form reference allows you to access the `react-hook-form` methods and element, as well as dynamically submit or reset the form.
 * This is useful for cases where you need to programmatically control the form, such as submitting it from a button outside the form.
 * @param T - The type of the form values.
 */
export interface FormRef<T extends FieldValues> {
  /**
   * The `react-hook-form` instance, which provides methods to interact with the form.
   * This includes methods like `reset`, `setValue`, `getValues`, etc.
   * @see https://react-hook-form.com/docs/useform
   */
  api: UseFormReturn<T>;

  /**
   * The HTML form element, which can be used to access the DOM element directly.
   */
  element?: HTMLFormElement;

  /**
   * Resets the form to its initial state or to the provided values.
   * This will clear all fields and errors, and set the form values to the default values.
   * If no values are provided, it will reset to the default values defined in the form.
   * @param values - The values to reset the form to. If not provided, it will reset to the default values defined in the form.
   */
  reset: (values?: DefaultValues<T>) => void;

  /**
   * Submits the form programmatically.
   * This will trigger the form validation and call the `onSubmit` handler if the form is valid.
   */
  submit: () => void;
}

/**
 * Common form pattern props, pretty much adding commentary to UseFormProps from `react-hook-form`.
 */
export interface FormPatternProps<T extends FieldValues, TContext = object>
  extends Partial<
    Omit<UseFormProps<T, TContext>, 'disabled' | 'errors' | 'shouldFocusError'>
  > {
  /**
   * This context object is mutable and will be injected into the `resolver`'s second argument (eg. [Yup](https://github.com/jquense/yup) validation's context object).
   * @see https://react-hook-form.com/docs/useform#context
   */
  context?: UseFormProps<T, TContext>['context'];

  /**
   * Display all validation errors or one at a time.
   * @see https://react-hook-form.com/docs/useform#criteriaMode
   */
  criteriaMode?: UseFormProps<T, TContext>['criteriaMode'];

  /**
   * Default values to be passed through when an input is unset.
   * @see https://react-hook-form.com/docs/useform#defaultValues
   */
  defaultValues?: DefaultValues<T>;

  /**
   * Delay error from appearing instantly.
   * @see https://react-hook-form.com/docs/useform#delayError
   */
  delayError?: UseFormProps<T, TContext>['delayError'];

  /**
   * Configure the validation strategy **before** a user submits the form the first time.
   * @see https://react-hook-form.com/docs/useform#mode
   * @default 'onSubmit'
   */
  mode?: UseFormProps<T, TContext>['mode'];

  /**
   * Progressive Enhancement only applicable for SSR framework.
   * @see https://react-hook-form.com/docs/useform
   */
  progressive?: UseFormProps<T, TContext>['progressive'];

  /**
   * This property is related to value update behaviors.
   * @see https://react-hook-form.com/docs/useform#resetOptions
   */
  resetOptions?: UseFormProps<T, TContext>['resetOptions'];

  /**
   * This function allows you to use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others.
   * @see https://react-hook-form.com/docs/useform#resolver
   */
  resolver?: UseFormProps<T, TContext>['resolver'];

  /**
   * Configure validation strategy when inputs with errors get re-validated **after** a user submits the form the first time.
   * @see https://react-hook-form.com/docs/useform#reValidateMode
   * @default 'onChange'
   */
  reValidateMode?: UseFormProps<T, TContext>['reValidateMode'];

  /**
   * This config will enable browser native validation. It will also enable CSS selectors :valid and:invalid making styling inputs easier.
   * @see https://react-hook-form.com/docs/useform#shouldUseNativeValidation
   */
  shouldUseNativeValidation?: UseFormProps<
    T,
    TContext
  >['shouldUseNativeValidation'];

  /**
   * By default, an input value will be retained when input is removed. However, you can set `shouldUnregister` to `true` to `unregister` input during unmount.
   * @see https://react-hook-form.com/docs/useform#shouldUnregister
   */
  shouldUnregister?: UseFormProps<T, TContext>['shouldUnregister'];

  /**
   * The values prop will react to changes and update the form values, which is useful when your form needs to be updated by external state or server data.
   * @see https://react-hook-form.com/docs/useform#values
   */
  values?: UseFormProps<T, TContext>['values'];
}

/**
 * This interface allows us to expose the methods from `react-hook-form` that are used in `IressHookForm`.
 * This is used by consumers with more complex forms that need to access the form methods directly, and ensure it is using the same version of `react-hook-form` as `IressHookForm` and `IressForm`.
 */
export interface HookFormExports {
  /**
   * Allows you to perform operations with a list of dynamic inputs that need to be appended, updated, removed etc.
   * This is useful when you have a form with a list of items that can be added or removed dynamically, such as a list of addresses or phone numbers.
   * @see https://react-hook-form.com/docs/usefieldarray
   */
  useFieldArray: typeof useFieldArray;

  /**
   * Allows you to use the methods from `react-hook-form` in a nested component of `IressForm`.
   * This is useful when you want more control over the form, such as submitting it programmatically or resetting it, without having to set a ref.
   * @see https://react-hook-form.com/docs/useform
   */
  useForm: typeof useForm;

  /**
   * Allows you to use the form context from `react-hook-form` in a nested component of `IressForm`.
   * This is useful when you need to access the form context in a component that is not a direct child of `IressForm`.
   * @see https://react-hook-form.com/docs/useformcontext
   */
  useFormContext: typeof useFormContext;

  /**
   * Allows you watch changes to other form fields in an IressForm.
   * This is useful when you need to conditionally render fields based on the value of another field.
   * @see https://react-hook-form.com/docs/usewatch
   */
  useWatch: typeof useWatch;
}

const HookForm = <T extends FieldValues, TContext = object>(
  {
    alert,
    children,
    className,
    'data-testid': testId,
    form: methods,
    onSubmit,
    onValidChange,
    onError,
    updateErrorSummaryOnSubmit,
    ...restProps
  }: IressHookFormProps<T, TContext>,
  ref: ForwardedRef<FormRef<T>>,
) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const [errorMessages, setErrorMessages] = useState<
    FormContextValue['errorMessages']
  >({});
  const messageQueue = useRef<FormContextValue['errorMessages']>({});
  const focusRef = useRef<HTMLElement | null>(null);
  const element = useRef<HTMLFormElement | null>(null);

  const { handleSubmit, reset, formState } = methods;
  const { isValid, isSubmitted } = formState;
  const [pendingErrorUpdate, setPendingErrorUpdate] = useState(false);

  const handleError = useCallback<SubmitErrorHandler<T>>(
    (errors) => {
      onError?.(errors);
      focusRef.current?.focus();

      if (updateErrorSummaryOnSubmit) {
        // Signal that we need to update error messages from the queue
        setPendingErrorUpdate(true);
      }
    },
    [onError, updateErrorSummaryOnSubmit],
  );

  const submitHandler = useCallback(
    (e?: FormEvent) => {
      void handleSubmit((data) => {
        onSubmit?.(data);
        setErrorMessages({});
        messageQueue.current = {};
      }, handleError)(e);
    },
    [handleError, handleSubmit, onSubmit],
  );

  const setMessageQueue = useCallback(
    (getErrors: () => FormContextValue['errorMessages']) => {
      messageQueue.current = getErrors();
    },
    [],
  );

  const setFocusOnError = useCallback<FormContextValue['setFocusOnError']>(
    (element) => {
      focusRef.current = element;
    },
    [],
  );

  const setErrorMessage = useCallback<FormContextValue['setErrorMessage']>(
    (field, message) => {
      if (
        message === errorMessages[field] ||
        (!message && !errorMessages[field])
      )
        return;

      const currentMessages = updateErrorSummaryOnSubmit
        ? messageQueue.current
        : errorMessages;

      const newMessages = [...methods.control._names.mount.values()].reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === field ? message : currentMessages[key],
        }),
        {},
      );

      if (updateErrorSummaryOnSubmit) {
        setMessageQueue(() => newMessages);
      } else {
        setErrorMessages(() => newMessages);
      }
    },
    [
      errorMessages,
      methods.control._names.mount,
      setMessageQueue,
      updateErrorSummaryOnSubmit,
    ],
  );

  // Public api for consumers
  useImperativeHandle(ref, () => ({
    element: element?.current ?? undefined,
    api: methods,
    submit: () => submitHandler(),
    reset: (values) => reset(values),
  }));

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  // Update error messages when form is submitted and updateErrorSummaryOnSubmit is true
  useEffect(() => {
    if (updateErrorSummaryOnSubmit && pendingErrorUpdate && isSubmitted) {
      setErrorMessages(() => messageQueue.current);
      setPendingErrorUpdate(false);
    }
  }, [updateErrorSummaryOnSubmit, pendingErrorUpdate, isSubmitted]);

  // Context for form fields to reference the form ID and error messages
  const formContext = useMemo<FormContextValue>(
    () => ({
      id,
      errorMessages,
      setErrorMessage,
      setFocusOnError,
    }),
    [errorMessages, id, setErrorMessage, setFocusOnError],
  );

  return (
    <FormContext.Provider value={formContext}>
      <FormProvider {...methods}>
        <styled.form
          {...restProps}
          className={cx(className, GlobalCSSClass.Form)}
          data-testid={testId}
          id={id}
          noValidate
          onSubmit={submitHandler}
          ref={element}
        >
          {alert ?? (
            <IressFormValidationSummary
              data-testid={propagateTestid(testId, 'error-summary')}
              srOnly
            />
          )}
          {children}
        </styled.form>
      </FormProvider>
    </FormContext.Provider>
  );
};

const ForwardedHookForm = forwardRef(HookForm) as <
  T extends FieldValues,
  TContext = object,
>(
  props: IressHookFormProps<T, TContext> & {
    ref?: Ref<FormRef<T>>;
  },
) => ReactElement;

export const IressHookForm = ForwardedHookForm as typeof ForwardedHookForm &
  HookFormExports;

IressHookForm.useFieldArray = useFieldArray;
IressHookForm.useForm = useForm;
IressHookForm.useFormContext = useFormContext;
IressHookForm.useWatch = useWatch;

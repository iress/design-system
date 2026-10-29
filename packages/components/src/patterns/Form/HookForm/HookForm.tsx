import {
  type FormEvent,
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import { useIdIfNeeded } from '../../../hooks';
import { IressFormValidationSummary } from '../FormValidationSummary/FormValidationSummary';
import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { FormContext, type FormContextValue } from '../FormContext';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@/helpers/utility/propagateTestid';

/**
 * Structural contract for Zod 4 classic schemas, not a general schema adapter.
 * Keeps Zod optional for consumers who use rules or a custom resolver.
 */
export interface FormSchema<TOutput = unknown, TInput = unknown> {
  readonly _input: TInput;
  readonly _output: TOutput;
  readonly _zod: {
    readonly version: { readonly major: 4 };
  };
  parseAsync: (data: unknown) => Promise<TOutput>;
}

export interface IressHookFormProps<
  T extends FieldValues,
  TContext = object,
  TOutput = T,
> extends Omit<
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
  form: UseFormReturn<T, TContext, TOutput>;

  /** @internal Schema metadata supplied by IressForm, not a second resolver. */
  schema?: FormSchema<TOutput, T>;

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
  onSubmit?: (data: TOutput) => void;

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
export interface FormRef<
  T extends FieldValues,
  TContext = object,
  TOutput = T,
> {
  /**
   * The `react-hook-form` instance, which provides methods to interact with the form.
   * This includes methods like `reset`, `setValue`, `getValues`, etc.
   * @see https://react-hook-form.com/docs/useform
   */
  api: UseFormReturn<T, TContext, TOutput>;

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
interface FormPatternOptions<
  T extends FieldValues,
  TContext = object,
  TOutput = T,
> extends Partial<
  Omit<
    UseFormProps<T, TContext, TOutput>,
    'disabled' | 'errors' | 'shouldFocusError' | 'resolver'
  >
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

export type FormPatternProps<
  T extends FieldValues,
  TContext = object,
  TOutput = T,
> = FormPatternOptions<T, TContext, TOutput> &
  (
    | {
        /**
         * Zod 4 classic schema. Validation is resolved internally; submitted data uses
         * the schema output type, while defaultValues and form methods use input.
         * Cannot be combined with resolver.
         */
        schema: FormSchema<TOutput, T>;
        resolver?: never;
      }
    | {
        schema?: never;
        /** Custom React Hook Form resolver. Cannot be combined with schema. */
        resolver?: UseFormProps<T, TContext, TOutput>['resolver'];
      }
  );

const HookForm = <T extends FieldValues, TContext = object, TOutput = T>(
  {
    alert,
    children,
    className,
    'data-testid': testId,
    form: methods,
    schema,
    onSubmit,
    onValidChange,
    onError,
    updateErrorSummaryOnSubmit,
    ...restProps
  }: IressHookFormProps<T, TContext, TOutput>,
  ref: ForwardedRef<FormRef<T, TContext, TOutput>>,
) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const [errorMessages, setErrorMessages] = useState<
    FormContextValue['errorMessages']
  >({});
  const messageQueue = useRef<FormContextValue['errorMessages']>({});
  const focusRef = useRef<HTMLElement | null>(null);
  const element = useRef<HTMLFormElement | null>(null);

  const { handleSubmit, reset, formState } = methods;
  const { isValid, submitCount } = formState;

  const handleError = useCallback<SubmitErrorHandler<T>>(
    (errors) => {
      onError?.(errors);
      focusRef.current?.focus();
    },
    [onError],
  );

  const submitHandler = useCallback(
    (e?: FormEvent) => {
      void handleSubmit((data) => {
        // Validation passed - clear all errors
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
      // Compare against the correct source to prevent redundant updates
      const currentMessages = updateErrorSummaryOnSubmit
        ? messageQueue.current
        : errorMessages;

      if (
        message === currentMessages[field] ||
        (!message && !currentMessages[field])
      )
        return;

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

  // Sync error messages from queue when form is submitted with updateErrorSummaryOnSubmit enabled
  useEffect(() => {
    if (updateErrorSummaryOnSubmit && submitCount > 0) {
      setErrorMessages(() => messageQueue.current);
    }
  }, [updateErrorSummaryOnSubmit, submitCount]);

  // Context for form fields to reference the form ID and error messages
  const formContext = useMemo<FormContextValue>(
    () => ({
      id,
      errorMessages,
      setErrorMessage,
      setFocusOnError,
      schema,
    }),
    [errorMessages, id, setErrorMessage, setFocusOnError, schema],
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

HookForm.displayName = 'IressHookForm';

export const IressHookForm = forwardRef(HookForm) as (<
  T extends FieldValues,
  TContext = object,
  TOutput = T,
>(
  props: IressHookFormProps<T, TContext, TOutput> & {
    ref?: Ref<FormRef<T, TContext, TOutput>>;
  },
) => ReactElement) & {
  displayName: 'IressHookForm';
};
IressHookForm.displayName = 'IressHookForm';

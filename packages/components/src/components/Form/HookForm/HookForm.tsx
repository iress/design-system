import {
  type FormEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
} from 'react-hook-form';
import styles from '../Form.module.scss';

import classNames from 'classnames';
import { GlobalCSSClass } from '@/enums';
import { IressAlert } from '../../Alert';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { useIdIfNeeded } from '../../../hooks';
import { type FormRef, type IressHookFormProps } from '../Form.types';
import { FormContext, type FormContextValue } from '../FormContext';
import { FormValidationSummary } from '../components/FormValidationSummary';

const HookForm = <T extends FieldValues>(
  {
    alert: alertSlot,
    children,
    'data-testid': testId,
    errorSummaryHeading = <h3>There was a problem submitting this form</h3>,
    errorSummaryHeadingText,
    errorSummaryHeadingLevel,
    form: methods,
    gutter = 'lg',
    hiddenErrorSummary,
    onSubmit,
    onValidChange,
    onError,
    updateErrorSummaryOnSubmit,
    ...restProps
  }: IressHookFormProps<T>,
  ref: React.ForwardedRef<FormRef<T>>,
) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const [errorMessages, setErrorMessages] = useState<
    FormContextValue['errorMessages']
  >({});
  const { handleSubmit, reset, formState } = methods;
  const focusRef = useRef<HTMLDivElement | null>(null);
  const { isValid, isSubmitted } = formState;
  const messageQueue = useRef<FormContextValue['errorMessages']>({});
  const [pendingErrorUpdate, setPendingErrorUpdate] = useState(false);

  const hasError = !!Object.values(errorMessages).filter((message) => !!message)
    .length;
  const showErrorSummary = hasError && !hiddenErrorSummary;

  const displayAlert = showErrorSummary || alertSlot;

  // Update error messages when form is submitted and updateErrorSummaryOnSubmit is true
  useEffect(() => {
    if (updateErrorSummaryOnSubmit && pendingErrorUpdate && isSubmitted) {
      setErrorMessages(() => messageQueue.current);
      setPendingErrorUpdate(false);
    }
  }, [updateErrorSummaryOnSubmit, pendingErrorUpdate, isSubmitted]);

  const handleError = useCallback<SubmitErrorHandler<T>>(
    (errors) => {
      onError?.(errors);

      // On first submit, it doesn't work without the timeout
      setTimeout(() => focusRef?.current?.focus());

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

  const setErrorMessage = useCallback<FormContextValue['setErrorMessage']>(
    (field, message) => {
      if (
        message === errorMessages[field] ||
        (!message && !errorMessages[field])
      )
        return;

      const fn = updateErrorSummaryOnSubmit
        ? setMessageQueue
        : setErrorMessages;

      const currentMessages = updateErrorSummaryOnSubmit
        ? messageQueue.current
        : errorMessages;

      fn(() =>
        [...methods.control._names.mount.values()].reduce(
          (acc, key) => ({
            ...acc,
            [key]: key === field ? message : currentMessages[key],
          }),
          {},
        ),
      );
    },
    [
      errorMessages,
      methods.control._names.mount,
      setMessageQueue,
      updateErrorSummaryOnSubmit,
    ],
  );

  // Refs
  const element = useRef<HTMLFormElement | null>(null);

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

  // Context for form fields to reference the form ID and error messages
  const formContext = useMemo<FormContextValue>(
    () => ({
      id,
      errorMessages,
      setErrorMessage,
    }),
    [errorMessages, id, setErrorMessage],
  );

  return (
    <FormContext.Provider value={formContext}>
      <FormProvider {...methods}>
        <form
          {...restProps}
          id={id}
          onSubmit={submitHandler}
          noValidate
          data-testid={testId}
          ref={element}
          className={classNames(
            restProps.className,
            'iress-u-stack',
            `iress--gutter--${gutter}`,
          )}
        >
          <div
            role="alert"
            tabIndex={-1}
            className={classNames({
              [styles.alert]: true,
              [GlobalCSSClass.Hidden]: !displayAlert,
            })}
            ref={focusRef}
          >
            {showErrorSummary ? (
              <IressAlert
                status="danger"
                heading={errorSummaryHeading}
                headingText={errorSummaryHeadingText}
                headingLevel={errorSummaryHeadingLevel}
              >
                <FormValidationSummary
                  data-testid={propagateTestid(testId, 'error-summary')}
                />
              </IressAlert>
            ) : null}
            {alertSlot}
          </div>
          <div
            className={classNames({
              [GlobalCSSClass.IgnoreStack]: !showErrorSummary,
            })}
          >
            {children}
          </div>
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
};

export const IressHookForm = forwardRef(HookForm) as <T extends FieldValues>(
  props: IressHookFormProps<T> & { ref?: React.Ref<FormRef<T>> },
) => React.ReactElement;

import { type FieldValues, useForm, type UseFormProps } from 'react-hook-form';
import {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type Ref,
  useMemo,
} from 'react';
import { form } from '../Form.styles';
import {
  type FormPatternProps,
  type FormRef,
  IressHookForm,
  type IressHookFormProps,
} from '../HookForm/HookForm';
import { cx } from '@/styled-system/css';
import { IressText } from '@/components/Text';

export interface ShortFormProps<T extends FieldValues, TContext = object>
  extends Omit<IressHookFormProps<T, TContext>, 'form'>,
    FormPatternProps<T, TContext> {
  /**
   * The actions to be displayed at the bottom left of the form.
   */
  actions?: ReactNode;

  /**
   * Title displayed at the top of the form, usually the purpose of the form.
   */
  heading?: ReactNode;

  /**
   * Configure the validation strategy **before** a user submits the form the first time.
   * For short forms, it is recommended to use `onSubmit`, as the data is normally familiar to the user (eg. login).
   * @see https://react-hook-form.com/docs/useform#mode
   * @default 'onSubmit'
   */
  mode?: UseFormProps<T, TContext>['mode'];

  /**
   * Use `pattern="short"` for the following use cases:
   * - Login forms, or similar forms that requires data familiar to the users
   * - Forms that fit the length of a single screen (less than 8-9 fields)
   */
  pattern?: 'short';

  /**
   * Configure the validation strategy **after** a user submits the form the first time.
   * During this phase, it is recommended to use `onChange` to provide immediate feedback on field changes so users can correct errors as they go.
   * @see https://react-hook-form.com/docs/useform#reValidateMode
   * @default 'onChange'
   */
  reValidateMode?: UseFormProps<T, TContext>['reValidateMode'];
}

const ShortFormPattern = <T extends FieldValues, TContext = object>(
  {
    actions,
    alert,
    children,
    className,
    criteriaMode,
    context,
    defaultValues,
    delayError,
    heading: headingProp,
    mode = 'onSubmit',
    progressive,
    resetOptions,
    resolver,
    reValidateMode = 'onChange',
    shouldUseNativeValidation,
    shouldUnregister,
    values,
    ...restProps
  }: ShortFormProps<T, TContext>,
  ref: ForwardedRef<FormRef<T>>,
) => {
  const reactHookForm = useForm({
    criteriaMode,
    context,
    defaultValues,
    delayError,
    mode,
    progressive,
    resetOptions,
    resolver,
    reValidateMode,
    shouldFocusError: !alert,
    shouldUseNativeValidation,
    shouldUnregister,
    values,
  });
  const styles = form({ pattern: 'short' });

  const heading = useMemo(() => {
    if (typeof headingProp === 'string') {
      return <IressText element="h2">{headingProp}</IressText>;
    }
    return headingProp;
  }, [headingProp]);

  return (
    <IressHookForm
      form={reactHookForm}
      {...restProps}
      className={cx(className, styles.root)}
      ref={ref}
    >
      {heading}
      {alert}
      {children}
      {actions}
    </IressHookForm>
  );
};

export const ShortForm = forwardRef(ShortFormPattern) as <
  T extends FieldValues,
  TContext = object,
>(
  props: ShortFormProps<T, TContext> & {
    ref?: Ref<FormRef<T>>;
  },
) => ReactElement;

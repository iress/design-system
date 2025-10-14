import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useMemo,
} from 'react';
import { IressText } from '@/components/Text';
import { form } from '../Form.styles';
import { cx } from '@/styled-system/css';
import {
  FormPatternProps,
  FormRef,
  IressHookForm,
  IressHookFormProps,
} from '../HookForm/HookForm';
import { IressPanel, IressPanelProps } from '@/components/Panel';
import { IressInline } from '@/components/Inline';

export interface LongFormProps<T extends FieldValues, TContext = object>
  extends Omit<IressHookFormProps<T, TContext>, 'form'>,
    FormPatternProps<T, TContext> {
  /**
   * The actions to be displayed at the top right of the form.
   */
  actions: ReactNode;

  /**
   * Footer to be displayed at the bottom of the form.
   * This can be used for additional information, links, or actions that are relevant to the form but not part of the main content.
   */
  footer?: ReactNode;

  /**
   * Title displayed at the top of the form, usually the purpose of the form.
   */
  heading: ReactNode;

  /**
   * Configure the validation strategy **before** a user submits the form the first time.
   * For long forms, it is recommended to use `onBlur` to avoid overwhelming the user with validation errors.
   * This means that validation will occur when the user leaves a field, rather than on every change.
   * @see https://react-hook-form.com/docs/useform#mode
   * @default 'onBlur'
   */
  mode?: UseFormProps<T, TContext>['mode'];

  /**
   * Style the panel that wraps the form fields.
   * @default { bg: "alt" }
   */
  panelStyle?: IressPanelProps;

  /**
   * Use `pattern="long"` for the following use cases:
   * - Forms that are used for data entry, such as creating or updating large datasets.
   * - Forms that are longer than the viewport (usually more than 8-9 fields).
   */
  pattern?: 'long';

  /**
   * Configure the validation strategy **after** a user submits the form the first time.
   * During this phase, it is recommended to use `onChange` to provide immediate feedback on field changes so users can correct errors as they go.
   * @see https://react-hook-form.com/docs/useform#reValidateMode
   * @default 'onChange'
   */
  reValidateMode?: UseFormProps<T, TContext>['reValidateMode'];

  /**
   * If set to `true`, the form will have a sticky header that remains at the top of the viewport when scrolling.
   * This is useful for long forms where you want the header to always be visible.
   */
  sticky?: boolean;
}

const LongFormPattern = <T extends FieldValues, TContext = object>(
  {
    actions,
    alert,
    children,
    className,
    criteriaMode,
    context,
    defaultValues,
    delayError,
    footer,
    heading: headingProp,
    mode = 'onBlur',
    panelStyle = { bg: 'alt' },
    progressive,
    resetOptions,
    resolver,
    reValidateMode = 'onChange',
    shouldUseNativeValidation,
    shouldUnregister,
    sticky = false,
    values,
    ...restProps
  }: LongFormProps<T, TContext>,
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
  const styles = form({ pattern: 'long', sticky });

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
      className={cx(styles.root, className)}
      ref={ref}
    >
      <IressInline
        gap="sm"
        horizontalAlign="between"
        verticalAlign="bottom"
        className={styles.header}
      >
        {heading}
        <div className={styles.actions}>{actions}</div>
      </IressInline>
      <IressPanel
        {...panelStyle}
        className={cx(styles.children, panelStyle.className)}
      >
        {alert}
        {children}
      </IressPanel>
      {footer && <div className={styles.footer}>{footer}</div>}
    </IressHookForm>
  );
};

export const LongForm = forwardRef(LongFormPattern) as <
  T extends FieldValues,
  TContext = object,
>(
  props: LongFormProps<T, TContext> & {
    ref?: Ref<FormRef<T>>;
  },
) => ReactElement;

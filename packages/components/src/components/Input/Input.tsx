import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  MouseEvent,
  FocusEvent,
  RefAttributes,
  ReactElement,
  ReactNode,
  ForwardedRef,
} from 'react';
import { GlobalCSSClass } from '@/enums';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import {
  InputBase,
  type InputRef,
  type InputBaseProps,
  type InputBaseElement,
} from './InputBase/InputBase';
import { IressSpinner } from '../Spinner';
import { useControlledState } from '@/hooks/useControlledState';
import { IressReadonly } from '../Readonly';
import { FormControlValue, FormElementWidths } from '@/types';
import { cx } from '@/styled-system/css';
import { input } from './Input.styles';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';
import { IressCloseButton } from '../Button';

export type IressInputProps<
  T extends FormControlValue = string | number,
  TRows extends number | undefined = undefined,
> = Omit<InputBaseProps<TRows>, 'defaultValue' | 'onChange' | 'value'> & {
  /**
   * Set input content align to right, useful for numeric inputs.
   * @default false
   */
  alignRight?: boolean;

  /**
   * Content to append to the input field, usually a button or icon.
   **/
  append?: ReactNode;

  /**
   * If `true`, then user can clear the value of the input. Will be ignored if `rows` prop is in use.
   * @default false
   */
  clearable?: boolean;

  /**
   * The value of the input. Can be a string or a number. Use for uncontrolled inputs.
   */
  defaultValue?: T;

  /**
   * Bring your own formatter that will be used to format the value when the input is not focused, allowing you to display the value in a different format.
   * e.g. User type in value="dsf 987kkk123" => result after formatter: $987,123 (string)
   */
  formatter?: (value?: T) => string | number;

  /**
   * Make prepend/append element closer to the input content.
   */
  inline?: boolean;

  /**
   * The loading states of the input field. If provided a string, will use that text as the loading message.
   */
  loading?: boolean | string;

  /**
   * Emitted when the input value changes with the new changed value.
   */
  onChange?: (e: ChangeEvent<InputBaseElement<TRows>>, value?: T) => void;

  /**
   * Emitted when the input is manually cleared.
   */
  onClear?: (e: ChangeEvent<InputBaseElement<TRows>>) => void;

  /**
   * Content to prepended to the input field, usually an icon.
   */
  prepend?: ReactNode;

  /**
   * The value of the input. Can be a string or a number. Use for controlled inputs.
   */
  value?: T;

  /**
   * The width of the input.
   */
  width?: FormElementWidths;
};

/**
 * - **Clearable**: If the `clearable` prop is set to `true`, a clear button will appear when there is a value in the input field. Clicking this button will clear the input and trigger the `onChange` event.
 * - **Prepend and Append**: You can add custom React nodes before (prepend) or after (append) the input field.
 */
const Input = <
  T extends FormControlValue = string | number,
  TRows extends number | undefined = undefined,
>(
  { rows, ...props }: IressInputProps<T, TRows>,
  ref: ForwardedRef<InputRef<TRows>>,
) => {
  const {
    loading = false,
    clearable = false,
    defaultValue,
    onClear,
    width,
    prepend,
    append,
    onChange,
    className,
    readOnly,
    formatter,
    type,
    inline,
    alignRight,
    ...inputProps
  } = props as IressInputProps<T, undefined>;

  useNoDefaultValueInForms({
    component: 'IressInput',
    defaultValue,
  });

  const inputRef = useRef<InputRef<TRows> | null>(null);
  const interactedUsingMouse = useRef<true | null>(null);

  const { value, setValue } = useControlledState<T>({
    component: 'IressInput',
    defaultValue,
    value: props.value,
  });
  const validValue = getFormControlValueAsString(value);
  const [focused, setFocused] = useState(false);
  const [styleProps, nonStyleProps] = splitCssProps(inputProps);

  const displayValue = useMemo(() => {
    if (formatter && !focused) {
      return formatter(value);
    }

    return validValue;
  }, [formatter, value, validValue, focused]);

  const displayType = useMemo(() => {
    if (rows !== undefined) {
      return undefined;
    }

    if (formatter && !focused) {
      return { type: 'text' };
    }

    return { type };
  }, [formatter, focused, type, rows]);

  useImperativeHandle<InputRef<TRows>, InputRef<TRows>>(
    ref,
    () =>
      ({
        ...inputRef.current,
        extras: {
          additionalOnChangeProps: ['onClear'],
        },
      }) as InputRef<TRows>,
  );

  if (readOnly) {
    return (
      <IressReadonly
        {...inputProps}
        defaultValue={undefined}
        value={value}
        alignRight={alignRight}
        append={append}
        className={className}
      >
        {displayValue}
      </IressReadonly>
    );
  }

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setValue('' as T);
    inputRef.current?.focus();

    // Create a change event to be dispatched.
    // Tell the 3rd party library the input value changed.
    const changeEvent = new Event('change', {
      bubbles: true,
    }) as unknown as ChangeEvent<HTMLInputElement & HTMLTextAreaElement>;

    Object.defineProperty(changeEvent, 'target', {
      writable: false,
      value: { value: '', ...e.target },
    });

    onClear?.(changeEvent);
  };

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement & HTMLTextAreaElement
  > = (e) => {
    const newValue = e.target.value as T;
    setValue(newValue);
    onChange?.(e, newValue);
  };

  const classes = input({
    alignRight,
    inline,
    isTextarea: rows !== undefined,
    width,
  });

  return (
    <styled.div
      className={cx(
        // classes.root,
        GlobalCSSClass.FormElement,
        GlobalCSSClass.Input,
        className,
        classes.wrapper,
        GlobalCSSClass.FormElementInner,
      )}
      data-testid={inputProps['data-testid']}
      {...styleProps}
    >
      {prepend && <div className={cx(classes.addon)}>{prepend}</div>}
      <InputBase
        {...(nonStyleProps as InputBaseProps<TRows>)}
        {...displayType}
        className={classes.formControl}
        value={displayValue}
        onChange={handleInputChange}
        onFocus={(e: FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => {
          setFocused(true);
          inputProps?.onFocus?.(e);

          if (!interactedUsingMouse.current) {
            queueMicrotask(() => e.target.select());
          } else {
            interactedUsingMouse.current = null;
          }
        }}
        onMouseDown={(
          e: MouseEvent<HTMLInputElement & HTMLTextAreaElement>,
        ) => {
          inputProps?.onMouseDown?.(e);
          interactedUsingMouse.current = true;
        }}
        onBlur={(e: FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => {
          setFocused(false);
          inputProps?.onBlur?.(e);
        }}
        rows={rows}
        ref={inputRef}
      />
      <div className={cx(classes.internal)}>
        {loading && (
          <IressSpinner
            screenreaderText={loading === true ? 'loading' : loading}
          />
        )}
        {validValue && clearable && (
          <IressCloseButton
            onClick={handleClear}
            onMouseDown={(e) => e.preventDefault()}
            screenreaderText="Clear"
          />
        )}
      </div>
      {append && <div className={cx(classes.addon)}>{append}</div>}
    </styled.div>
  );
};

export const IressInput = forwardRef(Input) as <
  T extends FormControlValue = string | number,
  TRows extends number | undefined = undefined,
>(
  props: IressInputProps<T, TRows> & RefAttributes<InputRef<TRows> | null>,
) => ReactElement;

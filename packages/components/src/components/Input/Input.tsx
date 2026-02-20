import {
  type ChangeEvent,
  type ChangeEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type MouseEvent,
  type FocusEvent,
  type RefAttributes,
  type ReactElement,
  type ReactNode,
  type ForwardedRef,
  type HTMLInputTypeAttribute,
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
import { type FormControlValue, type FormElementWidths } from '@/types';
import { cx } from '@/styled-system/css';
import { input } from './Input.styles';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';
import {
  IressButton,
  type IressButtonProps,
  IressCloseButton,
} from '../Button';

export type IressInputProps<
  T extends FormControlValue = string | number,
  TRows extends number | undefined = undefined,
> = Omit<InputBaseProps<TRows>, 'defaultValue' | 'onChange' | 'value'> & {
  /**
   * Actions to display in the input field, rendered inside the input on the right. These will be rendered with opinionated styling.
   * If you want to use custom buttons or controls, use the `append` prop instead.
   */
  actions?: Omit<IressButtonProps, 'mode' | 'status'>[];

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
} & (TRows extends number
    ? {
        /**
         * Controls the auto-grow behaviour of the textarea when `rows` is set.
         * - Set to a number (e.g. `autoGrow={10}`) to define the maximum number of visible rows before the textarea starts scrolling.
         * - Set to `true` to enable auto-grow with a default maximum of 5 visible rows.
         * @default false (no auto-grow) or 5 rows when `autoGrow` is `true`
         */
        autoGrow?: number | boolean;
      }
    : {
        /**
         * If `true`, then user can clear the value of the input.
         * @default false
         */
        clearable?: boolean;

        /**
         * The variant of the input, which will apply different styles to the input. The `search` variant is designed for search inputs and will have a different style for the clear button and loading spinner.
         */
        variant?: 'search';
      });

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
    actions,
    variant,
    ...inputProps
  } = props as IressInputProps<T, undefined>;

  let autoGrow =
    rows !== undefined
      ? (props as IressInputProps<T, number>).autoGrow
      : undefined;

  if (autoGrow === true) {
    autoGrow = 5;
  }

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

  const displayValue = formatter && !focused ? formatter(value) : validValue;
  let displayType: { type?: HTMLInputTypeAttribute } | undefined =
    formatter && !focused ? { type: 'text' } : { type };

  if (rows !== undefined) {
    displayType = undefined;
  }

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

  // Auto-grow functionality for textarea
  useEffect(() => {
    if (rows && autoGrow && inputRef.current) {
      const textarea = inputRef.current.input as HTMLTextAreaElement;
      if (!textarea) return;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';

      // Calculate the height of one row
      const lineHeight =
        parseFloat(getComputedStyle(textarea).lineHeight) * 1.075;
      const maxHeight = lineHeight * autoGrow;

      // Set height to scrollHeight but not exceeding maxHeight
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;

      // Enable/disable overflow based on whether we've hit the max
      textarea.style.overflowY =
        textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [value, rows, autoGrow]);

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
    autoGrow: !!autoGrow,
    inline,
    isTextarea: rows !== undefined,
    stretched: !!styleProps.stretch,
    variant,
    width,
  });

  return (
    <div
      className={cx(
        GlobalCSSClass.FormElement,
        GlobalCSSClass.Input,
        className,
        classes.root,
      )}
      data-testid={inputProps['data-testid']}
    >
      <styled.div
        className={cx(classes.wrapper, GlobalCSSClass.FormElementInner)}
        {...styleProps}
      >
        {prepend && (
          <div className={cx(classes.addon, GlobalCSSClass.InputAddon)}>
            {prepend}
          </div>
        )}
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
              compact
            />
          )}
        </div>
        {append && (
          <div className={cx(classes.addon, GlobalCSSClass.InputAddon)}>
            {append}
          </div>
        )}
      </styled.div>
      {actions?.map((action, index) => (
        <IressButton
          {...action}
          className={cx(action.className, classes.action)}
          key={index}
        />
      ))}
    </div>
  );
};

export const IressInput = forwardRef(Input) as (<
  T extends FormControlValue = string | number,
  TRows extends number | undefined = undefined,
>(
  props: IressInputProps<T, TRows> & RefAttributes<InputRef<TRows> | null>,
) => ReactElement) & {
  displayName: 'IressInput';
};

IressInput.displayName = 'IressInput';

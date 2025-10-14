import classNames from 'classnames';
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormElementWidth, GlobalCSSClass, TextFieldType } from '@/enums';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { ClearButton } from './ClearButton/ClearButton';
import { InputBase } from './InputBase/InputBase';
import { InputMode, type IressInputProps } from './Input.types';
import styles from './Input.module.scss';
import { IressSpinner } from '../Spinner';
import { useControlledState } from '@/hooks/useControlledState';
import {
  type InputBaseElement,
  type InputRef,
} from './InputBase/InputBase.types';
import { IressReadonly } from '../Readonly';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';
import { type FormControlValue } from '@/types';

/**
 * - **Clearable**: If the `clearable` prop is set to `true`, a clear button will appear when there is a value in the input field. Clicking this button will clear the input and trigger the `onChange` event.
 * - **Prepend and Append**: You can add custom React nodes before (prepend) or after (append) the input field.
 */
const Input = <T extends FormControlValue = string | number>(
  props: IressInputProps<T>,
  ref: React.ForwardedRef<InputRef>,
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
    watermark,
    readOnly,
    formatter,
    type,
    inline,
    alignRight,
    ...inputProps
  } = props;

  useNoDefaultValueInForms({
    component: 'IressInput',
    defaultValue,
  });

  const inputRef = useRef<InputRef | null>(null);
  const interactedUsingMouse = useRef<true | null>(null);

  const { value, setValue } = useControlledState<T>({
    component: 'IressInput',
    defaultValue,
    value: props.value,
  });
  const validValue = getFormControlValueAsString(value);
  const [focused, setFocused] = useState(false);

  const displayValue = useMemo(() => {
    if (formatter && !focused) {
      return formatter(value);
    }

    return validValue;
  }, [formatter, value, validValue, focused]);

  const displayType = useMemo(() => {
    if (formatter && !focused) {
      return 'text';
    }

    return type;
  }, [formatter, focused, type]);

  useImperativeHandle<InputRef | null, InputRef | null>(
    ref,
    () => inputRef.current,
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

  const handleClear = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setValue('' as T);
    inputRef.current?.focus();

    // Create a change event to be dispatched.
    // Tell the 3rd party library the input value changed.
    const changeEvent = new Event('change', {
      bubbles: true,
    }) as unknown as React.ChangeEvent<InputBaseElement>;

    Object.defineProperty(changeEvent, 'target', {
      writable: false,
      value: { value: '', ...e.target },
    });

    onClear?.(changeEvent);
  };

  const handleInputChange: React.ChangeEventHandler<InputBaseElement> = (e) => {
    const newValue = e.target.value as T;
    setValue(newValue);
    onChange?.(e, newValue);
  };

  const classes = classNames(
    styles.input,
    className,
    GlobalCSSClass.FormElement,
    {
      [`${GlobalCSSClass.Width}--${width}`]: width?.includes('perc'),
      [styles.watermark]: watermark,
    },
  );

  return (
    <div className={classes} data-testid={inputProps['data-testid']}>
      <div
        className={classNames(styles.wrapper, GlobalCSSClass.FormElementInner, {
          [styles.inlineWrapper]: inline,
        })}
      >
        {prepend && (
          <div className={`${styles.addon} ${styles.prepend}`}>{prepend}</div>
        )}
        <InputBase
          {...inputProps}
          className={classNames({
            [`${GlobalCSSClass.Width}--${width}`]:
              width && !width?.includes('perc'),
            [styles.alignRight]: alignRight,
          })}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={(e) => {
            setFocused(true);
            inputProps?.onFocus?.(e);

            if (!interactedUsingMouse.current) {
              queueMicrotask(() => e.target.select());
            } else {
              interactedUsingMouse.current = null;
            }
          }}
          onMouseDown={(e) => {
            inputProps?.onMouseDown?.(e);
            interactedUsingMouse.current = true;
          }}
          onBlur={(...args) => {
            setFocused(false);
            inputProps?.onBlur?.(...args);
          }}
          type={displayType}
          ref={inputRef}
        />
        <div className={styles.internal}>
          {loading && (
            <IressSpinner
              screenreaderText={loading === true ? 'loading' : loading}
            />
          )}
          {validValue && clearable && <ClearButton onClick={handleClear} />}
        </div>
        {append && (
          <div className={`${styles.addon} ${styles.append}`}>{append}</div>
        )}
      </div>
    </div>
  );
};

const ForwardedInput = forwardRef(Input) as <T extends FormControlValue>(
  props: IressInputProps<T> & React.RefAttributes<InputRef | null>,
) => React.ReactElement;

export const IressInput = ForwardedInput as typeof ForwardedInput & {
  /** @deprecated IressInput.Type is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Type: typeof TextFieldType;
  /** @deprecated IressInput.Width is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Width: typeof FormElementWidth;
  /** @deprecated IressInput.InputMode is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  InputMode: typeof InputMode;
};

/** @deprecated IressInput.Type is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressInput.Type = TextFieldType;

/** @deprecated IressInput.Width is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressInput.Width = FormElementWidth;

/** @deprecated IressInput.InputMode is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressInput.InputMode = InputMode;

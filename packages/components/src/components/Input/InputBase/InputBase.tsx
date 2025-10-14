import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './InputBase.module.scss';
import { type InputBaseProps, type InputRef } from './InputBase.types';
import classNames from 'classnames';
import { idsLogger } from '@helpers/utility/idsLogger';
import { LoggerLevels } from '@/enums';

/**
 * `InputBase` is a versatile input field component that can be used as either a text input or a textarea.
 *
 * If the `rows` prop is greater than 0, it will render a textarea; otherwise, it will render a regular text input.
 *
 * - **Ref Forwarding and Imperative Handle**: This component forwards a ref to the input or textarea element and provides a `focus` method via `useImperativeHandle`. This allows parent components to programmatically focus the input.
 */
export const InputBase = forwardRef<InputRef, InputBaseProps>((props, ref) => {
  const {
    rows = 0,
    type = 'text',
    'data-testid': testid,
    className,
    ...inputProps
  } = props;

  const isTextArea = rows > 0;

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => {
    const currentElement = isTextArea ? textareaRef.current : inputRef.current;

    return {
      // React hook form requires the focus, blur, input
      focus: () => currentElement?.focus(),
      blur: () => currentElement?.blur(),
      input: isTextArea ? textareaRef.current : inputRef.current,
    };
  });

  if (isTextArea) {
    ['min', 'max', 'step'].forEach((prop) => {
      // Check for unsupported props when rendering a textarea
      if ({ ...inputProps, type }[prop as keyof typeof inputProps]) {
        idsLogger(
          "IressInput: The prop '${prop}' is not supported when 'rows' is greater than 0 and the component is rendered as a textarea.",
          LoggerLevels.Warn,
        );
      }
    });

    return (
      <textarea
        rows={rows}
        {...(testid && { 'data-testid': `${testid}__textarea` })}
        {...inputProps}
        ref={textareaRef}
        className={classNames(styles.formControl, styles.textarea, className)}
      />
    );
  }

  return (
    <input
      type={type}
      {...(testid && { 'data-testid': `${testid}__input` })}
      {...inputProps}
      ref={inputRef}
      className={classNames(styles.formControl, className)}
    />
  );
});

InputBase.displayName = 'InputBase';

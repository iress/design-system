import {
  forwardRef,
  type ReactElement,
  type Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { type ReactHookFormCompatibleRef } from '@/interfaces';

type InputElement<TRows extends number | undefined = undefined> =
  TRows extends number ? 'textarea' : 'input';

/**
 * InputBaseElement is a type that maps to either an HTMLInputElement or HTMLTextAreaElement
 * based on the `TRows` type parameter.
 * If `TRows` is a number, it maps to HTMLTextAreaElement; otherwise, it maps to HTMLInputElement.
 */
export type InputBaseElement<TRows extends number | undefined = undefined> =
  HTMLElementTagNameMap[InputElement<TRows>];

/**
 * InputRef is a type that represents a ref to the InputBaseElement.
 * It is compatible with React Hook Form and can be used to access the input or textarea element.
 */
export type InputRef<TRows extends number | undefined = undefined> =
  ReactHookFormCompatibleRef<InputBaseElement<TRows>>;

/**
 * `InputBase` is a versatile input field component that can be used as either a text input or a textarea.
 *
 * If the `rows` prop is greater than 0, it will render a textarea; otherwise, it will render a regular text input.
 *
 * - **Ref Forwarding and Imperative Handle**: This component forwards a ref to the input or textarea element and provides a `focus` method via `useImperativeHandle`. This allows parent components to programmatically focus the input.
 */
export type InputBaseProps<TRows extends number | undefined = undefined> = Omit<
  IressStyledProps<InputElement<TRows>>,
  'width'
> & {
  /**
   * Number of rows in the `textarea` (when set the component renders a textarea element)
   */
  rows?: TRows;
};

const Input = <TRows extends number | undefined = undefined>(
  { 'data-testid': testid, rows, ...restProps }: InputBaseProps<TRows>,
  ref: Ref<InputRef<TRows>>,
) => {
  const isTextArea = rows !== undefined;

  const inputRef = useRef<InputBaseElement<undefined>>(null);
  const textareaRef = useRef<InputBaseElement<number>>(null);

  useImperativeHandle(ref, () => {
    const currentElement = isTextArea ? textareaRef.current : inputRef.current;

    return {
      focus: () => currentElement?.focus(),
      blur: () => currentElement?.blur(),
      input: isTextArea ? textareaRef.current : inputRef.current,
    } as InputRef<TRows>;
  });

  if (rows !== undefined) {
    return (
      <styled.textarea
        rows={rows}
        {...(testid && { 'data-testid': `${testid}__textarea` })}
        {...(restProps as InputBaseProps<number>)}
        ref={textareaRef}
      />
    );
  }

  const inputProps = restProps as InputBaseProps<undefined>;

  return (
    <styled.input
      {...(testid && { 'data-testid': `${testid}__input` })}
      {...inputProps}
      type={inputProps.type ?? 'text'}
      ref={inputRef}
    />
  );
};

/**
 * `InputBase` is a versatile input field component that can be used as either a text input or a textarea.
 *
 * If the `rows` prop is greater than 0, it will render a textarea; otherwise, it will render a regular text input.
 *
 * - **Ref Forwarding and Imperative Handle**: This component forwards a ref to the input or textarea element and provides a `focus` method via `useImperativeHandle`. This allows parent components to programmatically focus the input.
 */
export const InputBase = forwardRef(Input) as <
  TRows extends number | undefined = undefined,
>(
  props: InputBaseProps<TRows> & {
    ref?: Ref<InputRef<TRows>>;
  },
) => ReactElement;

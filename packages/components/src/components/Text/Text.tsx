import { styled } from '@/styled-system/jsx';
import { type IressStyledProps } from '@/types';
import { text } from './Text.styles';
import { type FC, useMemo } from 'react';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export type TextElements =
  | 'p'
  | 'div'
  | 'span'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'code'
  | 'small'
  | 'cite'
  | 'caption'
  | 'strong'
  | 'em'
  | 'a'
  | 'blockquote'
  | 'pre';

export type IressTextProps<E extends TextElements = 'div'> =
  IressStyledProps<E> & {
    /**
     * The HTML element that should be rendered.
     */
    element?: E;
  };

export const IressText = <E extends TextElements = 'div'>({
  className,
  ...restProps
}: IressTextProps<E>) => {
  const Component = useMemo(
    () => styled(restProps.element ?? 'div', text) as FC<IressTextProps<E>>,
    [restProps.element],
  );

  return (
    <Component
      {...(restProps as IressTextProps<E>)}
      className={cx(className, GlobalCSSClass.Text)}
    />
  );
};

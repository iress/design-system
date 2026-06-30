import { styled } from '@/styled-system/jsx';
import { type IressStyledProps } from '@/types';
import { text } from './Text.styles';
import { type FC, useMemo } from 'react';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export type IressTextElements =
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
  | 'mark'
  | 'pre';

/**
 * @deprecated Use `IressTextElements` instead. This type will be removed in a future release.
 */
export type TextElements = IressTextElements;

export type IressTextProps<E extends IressTextElements = 'div'> =
  IressStyledProps<E> & {
    /**
     * The HTML element that should be rendered.
     */
    element?: E;
  };

/**
 * Renders styled text with consistent typography from the design system.
 *
 * @example
 * ```tsx
 * import { IressText } from '@iress-oss/ids-components';
 *
 * <IressText element="h2" textStyle="typography.heading.2">Hello world</IressText>
 * ```
 */
export const IressText = <E extends IressTextElements = 'div'>({
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

IressText.displayName = 'IressText';

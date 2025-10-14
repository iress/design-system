import { useMemo, FC, ReactNode } from 'react';
import { HorizontalAligns, IressStyledProps, ResponsiveProp } from '@/types';
import { stack } from './Stack.styles';
import { styled } from '@/styled-system/jsx';
import { PositiveSpacingToken } from '@theme-preset/tokens/spacing';
import { GlobalCSSClass } from '@/enums';
import { cx } from '@/styled-system/css';

export type IressStackProps<
  E extends keyof React.JSX.IntrinsicElements = 'div',
> = IressStyledProps<E> & {
  /**
   * Content to be separated by a gutter.
   */
  children?: ReactNode;

  /**
   * The HTML element that should be rendered.
   * @default 'div'
   */
  element?: E;

  /**
   * Sets the gap between direct children.
   * @see https://developer.mozilla.org/docs/Web/CSS/gap
   */
  gap?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * Sets the horizontal alignment of the stack content.
   */
  horizontalAlign?: HorizontalAligns;
};

export const IressStack = <
  E extends keyof React.JSX.IntrinsicElements = 'div',
>({
  className,
  element,
  ...restProps
}: IressStackProps<E>) => {
  const Tag = useMemo(
    () => styled(element ?? 'div', stack) as unknown as FC<IressStackProps<E>>,
    [element],
  );

  return (
    <Tag
      {...(restProps as IressStackProps<E>)}
      className={cx(className, GlobalCSSClass.Stack)}
    />
  );
};

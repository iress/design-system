import { useMemo, type FC, type ReactNode } from 'react';
import {
  type PositiveSpacingToken,
  type HorizontalAligns,
  type VerticalAligns,
  type IressStyledProps,
  type ResponsiveProp,
} from '@/types';
import { stack } from './Stack.styles';
import { styled } from '@/styled-system/jsx';
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

  /**
   * Sets the vertical alignment of the stack content.
   */
  verticalAlign?:
    | Omit<VerticalAligns, 'stretch'>
    | 'between'
    | 'around'
    | 'evenly';
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

  console.log(restProps);

  return (
    <Tag
      {...(restProps as IressStackProps<E>)}
      className={cx(className, GlobalCSSClass.Stack)}
    />
  );
};

IressStack.displayName = 'IressStack';

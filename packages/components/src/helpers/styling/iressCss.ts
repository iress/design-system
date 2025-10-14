import { type IressCSSProps } from '@/interfaces';
import { css } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { type SystemStyleObject } from '@/styled-system/types';
import { type ComponentProps, type ElementType, type FC } from 'react';

/**
 * This creates a combination of utility classes you can use to style native HTML elements using IDS.
 *
 * @see https://design.wm.iress.com/?path=/docs/styling-props-reference--docs
 *
 * @param stylingProps Supporting properties for styling.
 * @returns {string} A string of classes that can be applied to an element.
 */
export const iressCss = (stylingProps: IressCSSProps): string => {
  return css(stylingProps as SystemStyleObject);
};

type StyledProps<C extends ElementType> = ComponentProps<C> & IressCSSProps;

/**
 * This creates a component (similar to a styled component) that can be used to apply styling to native HTML elements using IDS.
 *
 * @see https://design.wm.iress.com/?path=/docs/styling-props-reference--docs
 *
 * @param element The native HTML element to be styled, e.g. 'div', 'span', etc. Can also be a custom component, e.g. 'Link'.
 * @returns {FC<StyledProps<T>>} A functional component that accepts styling props and renders the specified element with the applied styles.
 */
export const iressStyled = <T extends ElementType>(
  element: T,
): FC<StyledProps<T>> => {
  return styled(element) as FC<StyledProps<T>>;
};

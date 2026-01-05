import { type IressCSSProps } from '@/interfaces';
import { css } from '@/styled-system/css';
import { type SystemStyleObject } from '@/styled-system/types';

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

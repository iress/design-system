import { normaliseHideValues } from './helpers/normaliseHideValues';
import { type ResponsiveSizing } from '@/interfaces';
import { type FC, type ReactNode } from 'react';
import { styled } from '@/styled-system/jsx';
import { type IressStyledProps } from '@/types';

const Div = styled('div') as FC<IressStyledProps>;

/**
 * @deprecated IressHide has been deprecated.
 * - Please use the `srOnly` prop on any component to show or hide content from screen readers.
 * - Please use the `hide` prop on any component to show or hide content at different breakpoints.
 */
export interface IressHideProps extends IressStyledProps {
  /**
   * Content to hide.
   */
  children: ReactNode;

  /**
   * Content will be hidden on any screen sizes that are set to true.
   */
  hiddenOn: ResponsiveSizing<boolean>;

  /**
   * If true, the content will not be visible, but will be available to screen readers
   */
  visuallyHidden?: boolean;
}

/**
 * @deprecated IressHide has been deprecated.
 * - Please use the `srOnly` prop on any component to show or hide content from screen readers.
 * - Please use the `hide` prop on any component to show or hide content at different breakpoints.
 */
export const IressHide = ({
  children,
  hiddenOn,
  visuallyHidden,
  ...restProps
}: IressHideProps) => {
  const hideValues = normaliseHideValues(hiddenOn);

  return (
    <Div
      {...restProps}
      srOnly={visuallyHidden ? hideValues : undefined}
      hide={visuallyHidden ? undefined : hideValues}
    >
      {children}
    </Div>
  );
};

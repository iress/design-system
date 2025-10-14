import classNames from 'classnames';
import {
  type IressStackProps,
  StackCssClass,
  type StackWithEnums,
} from './Stack.types';
import { getResponsiveLayoutModifiers } from '@helpers/responsive/getResponsiveLayoutModifiers';
import { GutterSize } from '@/enums';

export const IressStack: StackWithEnums = ({
  children,
  className,
  gutter = 'none',
  ...restProps
}: IressStackProps) => (
  <div
    className={classNames(
      className,
      StackCssClass.Base,
      getResponsiveLayoutModifiers(StackCssClass.Gutter, gutter, 'none'),
    )}
    {...restProps}
  >
    {children}
  </div>
);

/** @deprecated IressStack.Gutter is now deprecated and will be removed in a future version. Please use the GutterSizes type instead. */
IressStack.Gutter = GutterSize;

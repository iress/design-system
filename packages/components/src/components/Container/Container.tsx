import classNames from 'classnames';
import { type IressContainerProps, ContainerCssClass } from './Container.types';

export const IressContainer = ({
  children,
  className,
  fluid,
  ...restProps
}: IressContainerProps) => (
  <div
    {...restProps}
    className={classNames(className, ContainerCssClass.Base, {
      [ContainerCssClass.Fluid]: fluid,
    })}
  >
    {children}
  </div>
);

import classNames from 'classnames';
import { type IressHideProps, HideCssClass } from './Hide.types';
import { composeHideClasses } from './helpers/composeHideClasses';

export const IressHide = ({
  children,
  hiddenOn,
  visuallyHidden,
  className,
  ...restProps
}: IressHideProps) => {
  const modifier = visuallyHidden
    ? HideCssClass.VisuallyHidden
    : HideCssClass.TotallyHidden;

  return (
    <div
      className={classNames(className, composeHideClasses(modifier, hiddenOn))}
      {...restProps}
    >
      {children}
    </div>
  );
};

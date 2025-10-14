import { forwardRef } from 'react';
import {
  IressCheckboxStyles as styles,
  type IressCheckboxMarkProps,
} from './CheckboxMark.types';
import classNames from 'classnames';

const CheckboxMark = (
  { checked, indeterminate, className, ...restProps }: IressCheckboxMarkProps,
  ref: React.LegacyRef<SVGSVGElement>,
) => {
  return (
    <svg
      ref={ref}
      className={classNames(className, styles.checkboxMark, {
        [styles.indeterminate]: indeterminate,
        [styles.checked]: checked,
      })}
      {...restProps}
      version="1.1"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        className={styles.indeterminateMark}
        x1="30"
        y1="100"
        x2="170"
        y2="100"
      ></line>
      <polyline
        className={styles.checkedMark}
        points="30 95 80 142 170 50"
      ></polyline>
    </svg>
  );
};

export const IressCheckboxMark = forwardRef<
  SVGSVGElement,
  IressCheckboxMarkProps
>(CheckboxMark);

import { css, cx } from '@/styled-system/css';
import { checkboxMark } from './CheckboxMark.styles';
import { IressStyledProps } from '@/types';
import { splitCssProps } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

export interface IressCheckboxMarkProps extends IressStyledProps<'svg'> {
  /**
   * Checked status of the checkbox mark
   */
  checked?: boolean;

  /**
   * Indeterminate status of the checkbox mark
   */
  indeterminate?: boolean;

  /**
   * Size of the checkbox mark
   */
  size?: 'sm';
}

export const IressCheckboxMark = ({
  checked,
  className,
  indeterminate,
  size,
  ...restProps
}: IressCheckboxMarkProps) => {
  const classes = checkboxMark.raw({ checked, indeterminate, size });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <svg
      className={cx(
        className,
        css(classes.root, styleProps),
        GlobalCSSClass.CheckboxMark,
      )}
      data-checked={checked ? 'true' : 'false'}
      {...nonStyleProps}
      version="1.1"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        className={css(classes.indeterminateMark)}
        x1="30"
        y1="100"
        x2="170"
        y2="100"
      ></line>
      <polyline
        className={css(classes.checkedMark)}
        points="30 95 80 142 170 50"
      ></polyline>
    </svg>
  );
};

import { css, cx } from '@/styled-system/css';
import { checkboxMark } from './CheckboxMark.styles';
import { type IressStyledProps } from '@/types';
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
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 10H15" className={css(classes.indeterminateMark)} />
      <path d="M5 10L8.5 13.5L16 6" className={css(classes.checkedMark)} />
    </svg>
  );
};

IressCheckboxMark.displayName = 'IressCheckboxMark';

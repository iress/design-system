import { css, cx } from '@/styled-system/css';
import { splitCssProps } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { type IressCSSProps } from '@/interfaces';
import { radioMark } from './RadioMark.styles';

export interface IressRadioMarkProps extends IressCSSProps {
  /**
   * Whether the radio is checked
   */
  checked?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string;
}

/**
 * RadioMark component renders the SVG circle used to indicate a selected radio button.
 *
 * @example
 * ```tsx
 * import { IressRadioMark } from '@iress-oss/ids-components';
 *
 * <IressRadioMark checked />
 * ```
 */
export const IressRadioMark = ({
  checked = false,
  className,
  ...restProps
}: IressRadioMarkProps) => {
  const styles = radioMark.raw({ checked });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <svg
      version="1.1"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...nonStyleProps}
      className={cx(
        css(styles, styleProps),
        GlobalCSSClass.FormElement,
        className,
      )}
    >
      <circle cx="100" cy="100" r="70" />
    </svg>
  );
};

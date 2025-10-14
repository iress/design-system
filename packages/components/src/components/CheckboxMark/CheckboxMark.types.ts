import variables from './CheckboxMark.vars.module.scss';
import styles from './CheckboxMark.module.scss';

Object.assign(variables, styles);
export const IressCheckboxStyles = styles;

export interface IressCheckboxMarkProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {
  /**
   * Checked status of the checkbox mark
   */
  checked?: boolean;

  /**
   * Indeterminate status of the checkbox mark
   */
  indeterminate?: boolean;
}

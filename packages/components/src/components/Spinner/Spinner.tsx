import { GlobalCSSClass } from '@/enums';
import { IressIcon, type IressIconProps } from '../Icon';
import { spinner } from './Spinner.styles';
import { cx } from '@/styled-system/css';

export interface IressSpinnerProps extends Omit<IressIconProps, 'name'> {
  /**
   * Spin speed of spinner.
   * @default half
   **/
  spin?: IressIconProps['spin'];
}

export const IressSpinner = ({
  className,
  spin = 'half',
  ...restProps
}: IressSpinnerProps) => {
  return (
    <IressIcon
      {...restProps}
      className={cx(className, spinner(), GlobalCSSClass.Spinner)}
      name="spinner-third"
      spin={spin}
    />
  );
};

import { type IressIconProps } from '../Icon';

export interface IressSpinnerProps extends Omit<IressIconProps, 'name'> {
  /**
   * Name of spinner icon.
   * @default spinner-third
   **/
  name?: IressIconProps['name'];

  /**
   * Spin speed of spinner.
   * @default half
   **/
  spin?: IressIconProps['spin'];
}

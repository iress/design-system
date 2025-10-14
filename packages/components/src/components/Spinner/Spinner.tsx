import classNames from 'classnames';
import { type IressSpinnerProps } from './Spinner.types';
import { IressIcon } from '../Icon';
import styles from './Spinner.module.scss';

export const IressSpinner = ({
  className,
  name = 'spinner-third',
  spin = 'half',
  ...restProps
}: IressSpinnerProps) => (
  <IressIcon
    {...restProps}
    className={classNames(className, styles.spinner)}
    name={name}
    spin={spin}
  />
);

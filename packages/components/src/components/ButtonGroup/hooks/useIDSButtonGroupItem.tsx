import {
  type ButtonGroupItemHook,
  type ButtonGroupItemProps,
} from '../ButtonGroup.types';
import { useButtonGroup } from './useButtonGroup';
import styles from '../ButtonGroup.module.scss';
import classNames from 'classnames';

export const useIDSButtonGroupItem = ({
  value,
}: ButtonGroupItemProps): ButtonGroupItemHook | undefined => {
  const buttonGroup = useButtonGroup();

  if (!buttonGroup) return undefined;

  return {
    className: classNames(styles.item, {
      [styles.active]: buttonGroup.isActive(value),
    }),
    props: {
      'aria-pressed': buttonGroup.isActive(value),
    },
    toggle() {
      if (value === undefined) return;
      buttonGroup?.toggle?.(value, !buttonGroup.isActive(value));
    },
  };
};

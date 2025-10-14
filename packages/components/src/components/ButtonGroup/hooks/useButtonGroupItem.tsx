import { useContext } from 'react';
import { ButtonGroupContext } from '../ButtonGroupProvider';
import { FormControlValue } from '@/types';

export interface ButtonGroupItemProps {
  /**
   * The value of the button, when used in `IressButtonGroup`.
   */
  value?: FormControlValue;
}

export interface ButtonGroupItemHook {
  active: boolean;
  props: {
    'aria-pressed': boolean;
  };
  toggle: () => void;
}

export const useButtonGroupItem = ({
  value,
}: ButtonGroupItemProps): ButtonGroupItemHook | undefined => {
  const buttonGroup = useContext(ButtonGroupContext);

  if (!buttonGroup) return undefined;

  const isActive = buttonGroup.isActive(value);

  return {
    active: isActive,
    props: {
      'aria-pressed': isActive,
    },
    toggle() {
      if (value === undefined) return;
      buttonGroup?.toggle?.(value, !isActive);
    },
  };
};

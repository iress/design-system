import { useRef } from 'react';
import {
  type PopoverStateHookProps,
  type PopoverStateHookReturn,
} from '../Popover.types';
import { useControlledState } from '@/hooks/useControlledState';

/**
 * This stores the popover states into its own hook, and manages the controlled state of the popover.
 * - hasInnerRole: whether the popover has an inner role. If there is an inner role that matches popover, the popover itself will render with no role.
 * - show: whether the popover is open or not. this can be controlled/uncontrolled.
 *
 * @param {PopoverStateHookProps} props initial props passed by the consumer. This will set whether the popover is controlled or not.
 * @returns hasInnerRole, isControlled, setShow, setHasInnerRole, show
 */
export const usePopoverState = ({
  defaultShow,
  show: showProp,
}: PopoverStateHookProps): PopoverStateHookReturn => {
  const hasInnerRole = useRef<boolean>(false);

  const {
    isControlled,
    setValue: setShow,
    value: show,
  } = useControlledState({
    component: 'IressPopover',
    defaultValue: defaultShow,
    propName: 'show',
    value: showProp,
  });

  return {
    hasInnerRole: () => hasInnerRole.current,
    isControlled,
    setShow,
    setHasInnerRole: (flag: boolean) => {
      hasInnerRole.current = flag;
    },
    show: !!show,
  };
};

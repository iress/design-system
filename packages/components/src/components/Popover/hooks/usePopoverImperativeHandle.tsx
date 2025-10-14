import { type ForwardedRef, useImperativeHandle } from 'react';
import {
  type PopoverAriaHookReturn,
  type PopoverContextValue,
  type PopoverRef,
  type PopoverStateHookReturn,
} from '../Popover.types';
import { type UseFloatingReturn } from '@floating-ui/react';

export const usePopoverImperativeHandle = (
  ref: ForwardedRef<PopoverRef>,
  api: UseFloatingReturn,
  aria: PopoverAriaHookReturn,
  state: PopoverStateHookReturn,
  context?: PopoverContextValue,
) => {
  useImperativeHandle(
    ref,
    () => ({
      getActivator: () => api.elements.domReference as HTMLElement | null,
      getFocusableActivator: context?.getFocusableActivator,
      getContent: () => api.elements.floating,
      setShow: state.setShow,
      show: state.show,
      toggleAriaControls: aria.toggleAriaControls,
    }),
    [
      context?.getFocusableActivator,
      state.setShow,
      state.show,
      aria.toggleAriaControls,
      api.elements.domReference,
      api.elements.floating,
    ],
  );
};

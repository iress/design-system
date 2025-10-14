import { ForwardedRef, useImperativeHandle } from 'react';
import { PopoverHookReturn } from './usePopover';

export interface PopoverRef
  extends Pick<PopoverHookReturn, 'setShow' | 'show' | 'toggleAriaControls'> {
  getActivator: () => HTMLElement | null;
  getFocusableActivator?: () => HTMLElement | undefined;
  getContent: () => HTMLElement | null;
}

export const usePopoverImperativeHandle = (
  ref: ForwardedRef<PopoverRef>,
  context: PopoverHookReturn,
) => {
  useImperativeHandle(
    ref,
    () => ({
      getActivator: () =>
        context.api.elements.domReference as HTMLElement | null,
      getFocusableActivator: context.getFocusableActivator,
      getContent: () => context.api.elements.floating,
      setShow: context.setShow,
      show: context.show,
      toggleAriaControls: context.toggleAriaControls,
    }),
    [
      context.api.elements.domReference,
      context.api.elements.floating,
      context.getFocusableActivator,
      context.setShow,
      context.show,
      context.toggleAriaControls,
    ],
  );
};

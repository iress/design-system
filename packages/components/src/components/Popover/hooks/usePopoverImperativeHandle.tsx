import { type ForwardedRef, useImperativeHandle } from 'react';
import { type FloatingPopoverHookReturn } from './useFloatingPopover';

export interface PopoverRef extends Pick<
  FloatingPopoverHookReturn,
  'setShow' | 'show' | 'toggleAriaControls'
> {
  /**
   * Gets the activator element of the popover. This is the element that triggers the popover to open when interacted with. It is a div container for the activator content, and is not focusable itself (e.g., if the activator is a button inside the container).
   * @returns {HTMLElement | null
   */
  getActivator: () => HTMLElement | null;

  /**
   * Gets the focusable activator element of the popover. This is the element that should receive focus when the popover is opened, which may be different from the activator element in some cases (e.g., a nested button inside the activator).
   * @returns {HTMLElement | undefined}
   */
  getFocusableActivator?: () => HTMLElement | undefined;

  /**
   * Gets the content element of the popover. This is the element that contains the content of the popover, and is used for positioning and focus management.
   * @returns {HTMLElement | null}
   */
  getContent: () => HTMLElement | null;
}

export const usePopoverImperativeHandle = (
  ref: ForwardedRef<PopoverRef>,
  context: FloatingPopoverHookReturn,
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

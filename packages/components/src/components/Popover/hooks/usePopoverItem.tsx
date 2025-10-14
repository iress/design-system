import { useListItem } from '@floating-ui/react';
import {
  type PopoverItemHookReturn,
  type PopoverVirtualNode,
} from '../Popover.types';
import { useEffect, useId } from 'react';
import { usePopover } from './usePopover';

/**
 * This is a wrapper around the useListItem hook from Floating UI, which is used to manage the focus state of the popover items.
 * It provides the necessary props to the popover items to manage their focus state, and sets virtual focus if required.
 *
 * See: https://floating-ui.com/docs/FloatingList#uselistitem
 *
 * @param {string} typeAheadLabel the label to be used when the user is typing to navigate the activator (currently unused in IDS)
 * @param {PopoverVirtualNode | null} virtualNode the virtual node to use when the item is focused. This contains some interactions to emulate keydown and blur on the popover item.
 * @returns {IressHTMLAttributes} the props to be passed to the floating content
 */
export const usePopoverItem = (
  typeAheadLabel?: string,
  virtualNode: PopoverVirtualNode | null = null,
): PopoverItemHookReturn => {
  const popover = usePopover();
  const { ref, index } = useListItem({ label: typeAheadLabel });
  const id = useId();

  const isActiveInPopover =
    popover?.setVirtualFocus && index === popover?.activeIndex;
  const popoverTabIndex = isActiveInPopover ? 0 : -1;

  useEffect(() => {
    if (isActiveInPopover) {
      popover?.setVirtualFocus?.(virtualNode);
    }
  }, [isActiveInPopover, popover, virtualNode]);

  return {
    id,
    isActiveInPopover,
    ref,
    tabIndex: popover ? popoverTabIndex : undefined,
  };
};

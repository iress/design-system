import { useListItem } from '@floating-ui/react';
import {
  type KeyboardEventHandler,
  useContext,
  useEffect,
  useId,
  useMemo,
} from 'react';
import { PopoverContext } from './usePopover';

export interface PopoverItemHookReturn {
  /**
   * The id to be passed to the item.
   * It is used to set the aria-activedescendant on virtually focused popovers, allowing screen readers to announce the active item.
   */
  id: string;

  /**
   * Whether the item is active in the popover.
   * This is used to set the style of the item when it is active, whether virtual or not.
   */
  isActiveInPopover?: boolean;

  /**
   * The ref to be passed to the item.
   * This is used to register the item within Floating UI, allowing it to be focused and managed by the popover.
   */
  ref?: (node: HTMLElement | null) => void;

  /**
   * The tabIndex to be passed to the item.
   * - In virtual focus mode, this is always -1, as the item is not focusable.
   * - In non-virtual focus mode, this is 0 if the item is active, and -1 otherwise.
   */
  tabIndex?: number;
}

export interface PopoverVirtualNode<T extends HTMLElement = HTMLElement> {
  onBlur?: KeyboardEventHandler<T>;
  onKeyDown?: KeyboardEventHandler<T>;
}

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
export const usePopoverItem = <T extends HTMLElement = HTMLElement>(
  typeAheadLabel?: string,
  virtualNode: PopoverVirtualNode<T> | null = null,
): PopoverItemHookReturn => {
  const popover = useContext(PopoverContext);
  const { ref, index } = useListItem({ label: typeAheadLabel });
  const id = useId();

  const isActiveInPopover = index === popover?.activeIndex;

  const popoverTabIndex = useMemo(() => {
    if (!popover) {
      return undefined;
    }

    if (isActiveInPopover && !popover?.isVirtualFocus) {
      return 0;
    }

    return -1;
  }, [isActiveInPopover, popover]);

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

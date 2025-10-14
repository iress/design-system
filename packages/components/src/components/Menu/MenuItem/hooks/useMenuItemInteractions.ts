import { useMenu } from '../../hooks/useMenu';
import {
  type MenuItemInteractionsHookProps,
  type MenuItemInteractionsHookReturn,
} from '../MenuItem.types';
import { useCallback } from 'react';
import { type MenuContextValue } from '../../Menu.types';
import {
  type FormControlValue,
  type PopoverContextValue,
  type PopoverVirtualNode,
} from '@/main';
import { usePopover } from '@/components/Popover/hooks/usePopover';
import { usePopoverItem } from '@/components/Popover/hooks/usePopoverItem';

/**
 * Calculate the event handlers needed to handle the state of the menu item when used inside a menu.
 * If inside a popover, it will close the popover once the menu item has been selected (in single select mode)
 *
 * TODO: Change to a helper and pass menu and popover as arguments
 *
 * @param {MenuItemInteractionsHookProps<T>} props A subset of `IressMenuItemProps` that describe the state of the menu item, and additional interactions.
 * @returns {MenuItemInteractionsHookReturn<T>} to help screen readers understand how to interact with the menu item, and its current state.
 */
export const useMenuItemInteractions = <T extends HTMLElement>({
  canToggle,
  onClick,
  onKeyDown,
  role,
  selected: selectedProp,
  value,
}: MenuItemInteractionsHookProps<T>): MenuItemInteractionsHookReturn<T> => {
  const menu = useMenu();
  const popover = usePopover();

  const selected = menu?.supportsSelection
    ? menu.isSelected(value)
    : selectedProp;

  const handleClick = useCallback(
    (e: React.MouseEvent<T>) => {
      onClick?.(e);
      handleMenuItemClick(menu, value, selected, popover, canToggle);
    },
    [canToggle, menu, onClick, popover, selected, value],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<T>) => {
      onKeyDown?.(e);

      if (e.key === 'Tab' && menu?.supportsSelection && menu?.changeOnBlur) {
        menu?.toggle(value, true);
      }
    },
    [menu, onKeyDown, value],
  );

  const { tabIndex, ...popoverItem } = usePopoverItem(
    undefined,
    getPopoverVirtualNode(
      {
        canToggle,
        onClick,
        onKeyDown,
        value,
      },
      menu,
      selected,
    ),
  );

  return {
    ...popoverItem,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    tabIndex: role === 'option' ? tabIndex : undefined,
  };
};

const handleMenuItemClick = (
  menu?: MenuContextValue,
  value?: FormControlValue,
  selected?: boolean,
  popover?: PopoverContextValue,
  canToggle?: boolean,
) => {
  if (menu?.supportsSelection) {
    menu.toggle(value, canToggle || menu?.multiSelect ? !selected : true);
  }

  if (menu?.hasArrowKeyNav && !menu?.multiSelect) {
    popover?.setShow?.(false);
    popover?.getFocusableActivator?.()?.focus();
    popover?.resetActiveIndex();
  }
};

const getPopoverVirtualNode = <T extends HTMLElement>(
  interactions: Pick<
    MenuItemInteractionsHookProps<T>,
    'canToggle' | 'onClick' | 'onKeyDown' | 'value'
  >,
  menu?: MenuContextValue,
  selected?: boolean,
): PopoverVirtualNode => ({
  onBlur: () => menu?.changeOnBlur && menu?.toggle(interactions.value, true),
  onKeyDown: (e, popover) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      menu?.toggle(
        interactions.value,
        interactions.canToggle || menu?.multiSelect ? !selected : true,
      );

      if (menu?.hasArrowKeyNav && !menu?.multiSelect) {
        popover?.resetActiveIndex();
      }

      // Create a click event to be virtualised.
      const clickEvent = new Event('click', {
        bubbles: true,
      }) as unknown as React.MouseEvent<T>;

      Object.defineProperty(clickEvent, 'target', {
        writable: false,
        value: { value: '', ...e.target },
      });

      interactions.onClick?.(clickEvent);
    }

    interactions.onKeyDown?.(e as React.KeyboardEvent<T>);
  },
});

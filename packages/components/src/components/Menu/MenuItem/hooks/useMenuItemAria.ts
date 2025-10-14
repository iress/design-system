import {
  type MenuItemAriaHookProps,
  type MenuItemAriaHookReturn,
} from '../MenuItem.types';
import { useMenu } from '../../hooks/useMenu';
import { idsLogger } from '@helpers/utility/idsLogger';

/**
 * Calculate aria attributes based on the props of the IressMenuItem.
 * Inside a menu, it will also change the aria-selected based on the state of the owning IressMenu.
 *
 * TODO: Change to a helper and pass menu as an argument
 *
 * @param {MenuItemAriaHookProps} props A subset of `IressMenuItemProps` that describe the expected interaction and state of the item.
 * @returns aria-* attributes to help screen readers understand how to interact with the menu item, and its current state.
 */
export const useMenuItemAria = ({
  selected,
  value,
}: MenuItemAriaHookProps): MenuItemAriaHookReturn => {
  const menu = useMenu();
  const isSelected = menu?.supportsSelection
    ? menu.isSelected(value)
    : selected;

  if (menu?.supportsSelection && selected) {
    idsLogger(
      `IressMenuItem: The selected prop on IressMenuItem does not work when used inside an IressMenu with role=listbox or the multiSelect prop set to true. Use the selected prop on IressMenu instead.`,
    );
  }

  return {
    'aria-selected': menu?.supportsSelection ? isSelected : undefined,
    'aria-current': menu?.role === 'nav' || menu?.nav ? isSelected : undefined,
  };
};

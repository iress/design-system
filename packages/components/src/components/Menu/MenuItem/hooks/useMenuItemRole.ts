import { type MenuItemRoles } from '../MenuItem.types';
import { useMenu } from '../../hooks/useMenu';
import { usePopover } from '@/components/Popover/hooks/usePopover';

/**
 * Calculate the role of the menu item. It will change depending on its context (if its inside a menu or popover, and based on their role/type).
 *
 * TODO: Change to a helper and pass menu and popover as arguments
 *
 * @returns {MenuItemRoles | undefined} final role of the menu item, based on its context.
 */
export const useMenuItemRole = (): MenuItemRoles | undefined => {
  const menu = useMenu();
  const popover = usePopover();
  const role = menu?.role ?? popover?.type;

  if (role === 'listbox') return 'option';
  if (role === 'menu') return 'menuitem';
  return role === 'list' ? 'listitem' : undefined;
};

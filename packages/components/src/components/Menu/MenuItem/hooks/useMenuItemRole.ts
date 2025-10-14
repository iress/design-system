import { useContext } from 'react';
import { MenuContext } from '../../Menu';
import { PopoverContext } from '@/components/Popover/hooks/usePopover';

/**
 * Calculate the role of the menu item. It will change depending on its context (if its inside a menu or popover, and based on their role/type).
 */
export const useMenuItemRole = () => {
  const menu = useContext(MenuContext);
  const popover = useContext(PopoverContext);
  const role = menu?.role ?? popover?.type;

  if (role === 'listbox') return 'option';
  if (role === 'menu') return 'menuitem';
  return role === 'list' ? 'listitem' : undefined;
};

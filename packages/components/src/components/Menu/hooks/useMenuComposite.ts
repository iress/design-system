import { usePopover } from '@/components/Popover/hooks/usePopover';
import { type MenuRoles } from '..';
import { useMenu } from './useMenu';

/**
 * Helps the consuming component decide whether the Menu needs to use Floating UI Composite components.
 * Floating UI composite components manage the keyboard navigation of the menu.
 *
 * Scenarios
 * - If the role is menu or listbox and not inside a popover, it will return true
 * - If it is any other role, or used inside a popover which uses hooks to do keyboard navigation, it will return false
 *
 * See: https://floating-ui.com/docs/Composite
 * Also see: https://floating-ui.com/docs/useListNavigation
 *
 * TODO: Change to a helper and pass popover and menu as arguments
 *
 * @param {MenuRoles} role The role set by the consumer, this may be overridden depending on popover context.
 * @returns {boolean}
 */
export const useMenuComposite = (role?: MenuRoles): boolean => {
  const popover = usePopover();
  const menu = useMenu();
  const menuRole = role ?? menu?.role;
  if (popover || !menuRole) return false;
  return ['menu', 'listbox'].includes(menuRole);
};

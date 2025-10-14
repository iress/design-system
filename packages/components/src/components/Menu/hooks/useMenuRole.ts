import { usePopover } from '@/components/Popover/hooks/usePopover';
import { type MenuRoles } from '../Menu.types';
import { type PopoverContextValue } from '@/main';

/**
 * Create the role that the menu will be rendered with.
 * Inside a popover, the menu will adopt the type of the popover when applicable.
 *
 * TODO: Change to a helper and pass popover as an argument
 *
 * @param {boolean} multiSelect Whether its a multiSelect menu
 * @param {MenuRoles} roleProp The role set by the consumer, this may be overridden depending on popover context.
 * @returns {MenuRoles}
 */
export const useMenuRole = (
  multiSelect?: boolean,
  roleProp?: MenuRoles,
): MenuRoles => {
  const popover = usePopover();
  const [role, fromPopover] = getRole(multiSelect, roleProp, popover);

  if (fromPopover) {
    popover?.setHasInnerRole(true);
  }

  return role;
};

const getRole = (
  multiSelect?: boolean,
  roleProp?: MenuRoles,
  popover?: PopoverContextValue,
): [role: MenuRoles, fromPopover: boolean] => {
  if (popover?.type === 'listbox' || popover?.type === 'menu') {
    return [popover.type, true];
  }

  let newRole = roleProp ?? 'list';

  if (multiSelect) {
    newRole = 'listbox';
  } else if (roleProp === 'nav') {
    newRole = 'list';
  }

  return [newRole, false];
};

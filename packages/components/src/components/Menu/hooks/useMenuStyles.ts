import { type MenuStylesHookProps, type MenuStylesHookReturn } from '..';
import classNames from 'classnames';
import styles from '../Menu.module.scss';
import { usePopover } from '@/components/Popover/hooks/usePopover';

/**
 * Create the class names used to style the menu.
 * Inside a popover the menu will be fluid by default.
 *
 * TODO: Change to a helper and pass popover as an argument from the consuming component.
 *
 * @param {MenuStylesHookProps} props A subset of `IressMenuProps` that decide the styling of the component.
 * @returns {MenuStylesHookReturn}
 */
export const useMenuStyles = ({
  className,
  fluid,
  layout = 'stack',
  role,
}: MenuStylesHookProps): MenuStylesHookReturn => {
  const popover = usePopover();
  const popoverType = popover?.type;

  return {
    className: classNames(className, styles.menu, styles[layout], {
      [styles.fluid]:
        (popoverType && ['listbox', 'menu'].includes(popoverType)) ?? fluid,
      [styles.nav]: role === 'nav' && styles.nav,
    }),
  };
};

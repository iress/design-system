import { IressCheckboxMark } from '@/components/CheckboxMark';
import { useMenu } from '../../hooks/useMenu';
import { type MenuItemButtonHookProps } from '../MenuItem.types';
import styles from '../MenuItem.module.scss';
import { useMemo } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import classNames from 'classnames';
import { type IressButtonProps } from '@/main';

/**
 * Calculate the props required to style the `IressButton` as a menu item.
 * Exposed as a hook to allow styling of third-party components to look and act like a `IressMenuItem` inside a `IressMenu`.
 * Inside a menu, it will also change the selected state based on the state of the owning IressMenu.
 *
 * TODO: Change to a helper and pass menu as an argument
 *
 * @param {MenuItemButtonHookProps} props A subset of `IressMenuItemProps` that describe the state of the `IressButton` and its styling.
 * @param {MenuItemInteractionsHookReturn<T>} interactions The interactions provided by the consuming component, that set whether the button is tabbable or not.
 * @returns {MenuItemButtonHookReturn} to help screen readers understand how to interact with the menu item, and its current state.
 */
export const useMenuItemButtonProps = (
  {
    append,
    children,
    className,
    'data-testid': dataTestId,
    divider,
    role,
    selected: selectedProp,
    prepend: prependProp,
    value,
  }: MenuItemButtonHookProps,
  isActiveInPopover?: boolean,
): IressButtonProps => {
  const menu = useMenu();
  const isSelected = menu?.supportsSelection
    ? menu.isSelected(value)
    : selectedProp;

  const prepend = useMemo(() => {
    if (menu?.multiSelect)
      return (
        <IressCheckboxMark
          className={styles.checkboxMark}
          checked={isSelected}
          data-testid={propagateTestid(dataTestId, 'checkbox-mark')}
        />
      );
    return prependProp;
  }, [dataTestId, isSelected, menu?.multiSelect, prependProp]);

  return {
    append: append ? (
      <span className={styles.append}>{append}</span>
    ) : undefined,
    children: children ? (
      <span className={styles.contents}>{children}</span>
    ) : undefined,
    className: classNames(className, styles.menuItem, styles.button, {
      [styles.divider]: divider,
      [styles.selected]: isSelected,
      [styles.multiSelect]: menu?.multiSelect,
      [styles.noWrap]: menu?.noWrap,
      [styles[`menu--nav`]]: menu?.nav,
      [styles[`menu--${menu?.layout}`]]: !!menu?.layout,
      'iress--active': isActiveInPopover,
    }),
    noWrap: menu?.noWrap,
    prepend,
    role: role === 'listitem' ? undefined : role,
  };
};

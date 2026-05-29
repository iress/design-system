import { useContext } from 'react';
import { MenuContext } from '../Menu';
import { IressDivider, type IressDividerProps } from '@/components/Divider';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export type IressMenuDividerProps = Omit<
  IressDividerProps,
  'vertical' | 'role'
>;

/**
 * A visual divider used to separate groups of items within a menu.
 *
 * @example
 * ```tsx
 * import { IressMenu, IressMenuItem, IressMenuDivider } from '@iress-oss/ids-components';
 *
 * <IressMenu>
 *   <IressMenuItem>Edit</IressMenuItem>
 *   <IressMenuDivider />
 *   <IressMenuItem>Delete</IressMenuItem>
 * </IressMenu>
 * ```
 */
export const IressMenuDivider = ({
  className,
  ...restProps
}: IressMenuDividerProps) => {
  const menu = useContext(MenuContext);

  return (
    <IressDivider
      {...restProps}
      className={cx(className, GlobalCSSClass.MenuDivider)}
      role={menu?.role === 'menu' ? undefined : 'presentation'}
      vertical={menu?.layout && menu.layout !== 'stack'}
    />
  );
};

IressMenuDivider.displayName = 'IressMenuDivider';

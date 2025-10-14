import { useContext } from 'react';
import { MenuContext } from '../Menu';
import { IressDivider, IressDividerProps } from '@/components/Divider';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export type IressMenuDividerProps = Omit<
  IressDividerProps,
  'vertical' | 'role'
>;

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

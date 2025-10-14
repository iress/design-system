import classNames from 'classnames';
import styles from '../MenuItem/MenuItem.module.scss';
import { type IressMenuTextProps } from '../MenuItem/MenuItem.types';
import { useMenu } from '../hooks/useMenu';
import { useMenuItemRole } from '../MenuItem/hooks/useMenuItemRole';
import { IressText } from '@/main';

export const IressMenuText = ({
  append,
  children,
  className,
  divider,
  prepend,
  role,
  ...restProps
}: IressMenuTextProps) => {
  const menu = useMenu();
  const menuItemRole = useMenuItemRole() ?? role;

  return (
    <IressText
      {...restProps}
      className={classNames(className, styles.menuItem, styles.text, {
        [styles.divider]: divider,
        [styles[`menu--${menu?.layout}`]]: !!menu?.layout,
      })}
      role={menuItemRole}
    >
      {prepend && <div className={styles.textPrepend}>{prepend}</div>}
      <div className={styles.contents}>{children}</div>
      {append && <div className={styles.textAppend}>{append}</div>}
    </IressText>
  );
};

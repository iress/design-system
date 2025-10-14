import { type ComponentPropsWithRef } from 'react';
import {
  type IressMenuProps,
  MenuLayout,
  MenuType,
  type MenuWithEnums,
} from './Menu.types';
import { MenuProvider } from './MenuProvider';
import { useIdIfNeeded } from '../../hooks';
import { Composite } from '@floating-ui/react';
import { type IressHTMLAttributes } from '@/main';
import { idsLogger } from '@helpers/utility/idsLogger';
import { useMenuAria } from './hooks/useMenuAria';
import { useMenuComposite } from './hooks/useMenuComposite';
import { useMenuStyles } from './hooks/useMenuStyles';
import { useMenuRole } from './hooks/useMenuRole';

export const IressMenu: MenuWithEnums = ({
  changeOnBlur,
  children,
  className,
  defaultSelected,
  fluid,
  id: idProp,
  layout = 'stack',
  multiSelect,
  noWrap,
  onChange,
  role: roleProp,
  selected,
  type,
  ...restProps
}: IressMenuProps) => {
  const id = useIdIfNeeded({ id: idProp });
  const roleOrType = roleProp ?? type;
  const role = useMenuRole(multiSelect, roleOrType);
  const aria = useMenuAria({
    id,
    layout,
    multiSelect,
    role,
  });
  const styles = useMenuStyles({ className, fluid, layout, role: roleOrType });
  const isComposite = useMenuComposite(role);

  const props: IressHTMLAttributes & ComponentPropsWithRef<'div'> = {
    ...restProps,
    ...styles,
    ...aria,
    role,
    id,
    children,
  };

  if (type !== undefined) {
    idsLogger(
      `IressMenu: The type prop is deprecated. Please use the role prop instead.`,
    );
  }

  return (
    <MenuProvider
      changeOnBlur={changeOnBlur}
      defaultSelected={defaultSelected}
      id={id}
      layout={layout}
      multiSelect={multiSelect}
      nav={roleOrType === 'nav'}
      noWrap={noWrap}
      onChange={onChange}
      role={role}
      selected={selected}
    >
      {isComposite ? (
        <Composite loop={role === 'menu'} render={<div {...props} />} />
      ) : (
        <div {...props} />
      )}
    </MenuProvider>
  );
};

/** @deprecated IressMenu.Layout enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressMenu.Layout = MenuLayout;

/** @deprecated IressMenu.Type enum is now deprecated and will be removed in a future version. Please use the value directly, and set it to the menu `role` prop. **/
IressMenu.Type = MenuType;

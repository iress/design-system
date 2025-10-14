import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useMenuItemRole } from './hooks/useMenuItemRole';
import { useMenuItemAria } from './hooks/useMenuItemAria';
import { useMenuItemButtonProps } from './hooks/useMenuItemButtonProps';
import { type ButtonRef, IressButton } from '../../Button';
import { useMenuItemInteractions } from './hooks/useMenuItemInteractions';
import { type IressMenuItemProps } from './MenuItem.types';
import { useMenuItemComposite } from './hooks/useMenuItemComposite';

const MenuItem = (
  {
    append,
    canToggle,
    children,
    className,
    divider,
    onClick,
    onKeyDown,
    prepend,
    role: roleProp,
    selected,
    value,
    ...restProps
  }: IressMenuItemProps,
  ref: React.Ref<ButtonRef | null>,
) => {
  const role = useMenuItemRole() ?? roleProp;
  const aria = useMenuItemAria({ selected, value });
  const { isActiveInPopover, ...interactions } = useMenuItemInteractions({
    canToggle,
    onClick,
    onKeyDown,
    role,
    selected,
    value,
  });
  const buttonProps = useMenuItemButtonProps(
    {
      append,
      children,
      className,
      'data-testid': restProps['data-testid'],
      divider,
      prepend,
      role,
      selected,
      value,
    },
    isActiveInPopover,
  );
  const elementRef = useRef<ButtonRef | null>(null);

  useImperativeHandle(ref, () => elementRef.current);

  return useMenuItemComposite(
    <IressButton {...aria} {...interactions} {...buttonProps} {...restProps} />,
    role,
  );
};

export const IressMenuItem = forwardRef(MenuItem);

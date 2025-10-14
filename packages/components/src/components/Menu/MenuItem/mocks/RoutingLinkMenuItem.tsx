import {
  ButtonRef,
  IressAnchorHTMLAttributes,
  IressMenuItemProps,
  useMenuItemAria,
  useMenuItemButtonProps,
  useMenuItemComposite,
  useMenuItemInteractions,
  useMenuItemRole,
} from '@/main';
import { Ref, forwardRef } from 'react';

const RoutingLink = (
  { children, ...restProps }: IressAnchorHTMLAttributes,
  ref: Ref<ButtonRef>,
) => (
  <a {...restProps} ref={ref as never}>
    {children}
  </a>
);

const RoutingLinkWithRef = forwardRef(RoutingLink);

export const RoutingLinkMenuItem = ({
  append,
  children,
  className,
  divider,
  prepend,
  selected,
  value,
  ...restProps
}: IressMenuItemProps) => {
  const role = useMenuItemRole();
  const aria = useMenuItemAria({ selected, value });
  const interactions = useMenuItemInteractions({
    selected,
    value,
  });
  const buttonProps = useMenuItemButtonProps({
    append,
    children,
    className,
    divider,
    prepend,
    role,
    selected,
    value,
  });

  return (
    useMenuItemComposite(
      <RoutingLinkWithRef
        {...restProps}
        {...aria}
        {...interactions}
        className={buttonProps.className}
      >
        {buttonProps.prepend}
        {buttonProps.children}
        {buttonProps.append}
      </RoutingLinkWithRef>,
      role,
    ) ?? <></>
  );
};

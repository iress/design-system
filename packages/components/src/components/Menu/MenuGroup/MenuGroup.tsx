import { useContext, type ReactNode } from 'react';
import type { TextElements } from '@/components/Text';
import { IressMenuDivider } from '../MenuDivider/MenuDivider';
import {
  IressMenuHeading,
  type IressMenuTextProps,
} from '../MenuText/MenuText';
import {
  IressPopover,
  type IressPopoverProps,
  usePopover,
} from '@/components/Popover';
import { IressMenuItem } from '../MenuItem/MenuItem';
import { IressMenu, MenuContext } from '../Menu';
import { IressIcon } from '@/components/Icon';
import { propagateTestid } from '@/helpers/utility/propagateTestid';

/**
 * Variant of the menu group.
 * - `undefined` (default): Renders inline with label as heading and children below.
 * - `'subdraw'`: Renders as a trigger that opens a fly-over submenu containing children.
 */
export type MenuGroupVariant = 'subdraw' | undefined;

type MenuGroupRestProps<
  TLabel extends TextElements = 'h2',
  TVariant extends MenuGroupVariant = undefined,
> = TVariant extends 'subdraw'
  ? Omit<IressPopoverProps, 'children' | 'activator'>
  : Omit<IressMenuTextProps<TLabel>, 'children'>;

export type IressMenuGroupProps<
  TLabel extends TextElements = 'h2',
  TVariant extends MenuGroupVariant = undefined,
> = MenuGroupRestProps<TLabel, TVariant> & {
  /**
   * Label for the group, displayed as a non-selectable heading.
   */
  label: ReactNode;

  /**
   * Items within the group (typically menu items).
   */
  children?: ReactNode;

  /**
   * Adds a divider after the group.
   */
  divider?: boolean;

  /**
   * Variant of the menu group.
   * - `undefined` (default): Renders inline with label as heading and children below.
   * - `'subdraw'`: Renders as a trigger that opens a fly-over submenu containing children.
   */
  variant?: TVariant;
};

/**
 * MenuGroup component for grouping related menu items under a common heading.
 * The heading is non-focusable and non-selectable, serving as a label for the group.
 *
 * When `variant="subdraw"`, the group label becomes a clickable trigger that opens
 * a fly-over submenu containing the group's children.
 */
export const IressMenuGroup = <
  E extends TextElements = 'div',
  TVariant extends MenuGroupVariant = undefined,
>({
  label,
  children,
  divider,
  variant,
  'data-testid': dataTestId,
  ...restProps
}: IressMenuGroupProps<E, TVariant>) => {
  const menu = useContext(MenuContext);
  const popover = usePopover();

  // Subdraw variant - compose existing components
  if (variant == 'subdraw') {
    const popoverProps = restProps as MenuGroupRestProps<E, 'subdraw'>;

    return (
      <>
        <IressPopover
          align="right-start"
          offset={{ mainAxis: 0, crossAxis: 0 }}
          type={menu?.role === 'list' ? undefined : menu?.role}
          virtualFocus={popover?.isVirtualFocus}
          {...popoverProps}
          data-testid={propagateTestid(dataTestId, 'subdraw')}
          activator={
            <IressMenuItem
              append={<IressIcon name="keyboard_arrow_right" />}
              data-testid={propagateTestid(dataTestId, 'subdraw__trigger')}
            >
              {label}
            </IressMenuItem>
          }
        >
          <IressMenu>{children}</IressMenu>
        </IressPopover>
        {divider && <IressMenuDivider />}
      </>
    );
  }

  // Default variant - inline rendering
  return (
    <>
      <IressMenuHeading data-testid={dataTestId} {...restProps}>
        {label}
      </IressMenuHeading>
      {children}
      {divider && <IressMenuDivider />}
    </>
  );
};

IressMenuGroup.displayName = 'IressMenuGroup';

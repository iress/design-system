import { useContext, type ElementType, type MouseEventHandler, type ReactNode } from 'react';
import type { TextElements } from '@/components/Text';
import { IressMenuDivider } from '../MenuDivider/MenuDivider';
import { type IressMenuTextProps } from '../MenuText/MenuText';
import {
  IressPopover,
  type IressPopoverProps,
  usePopover,
} from '@/components/Popover';
import { IressMenuItem } from '../MenuItem/MenuItem';
import { IressMenu, MenuContext, type MenuVariants } from '../Menu';
import { IressIcon } from '@/components/Icon';
import { propagateTestid } from '@/helpers/utility/propagateTestid';
import { menuGroup } from './MenuGroup.styles';
import { useControlledState, useIdIfNeeded } from '@/hooks';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { IressMenuHeading } from '../MenuHeading/MenuHeading';

type MenuGroupRestProps<
  TLabel extends TextElements = 'h2',
  TVariant extends MenuVariants = undefined,
> = TVariant extends 'subdraw'
  ? Omit<IressPopoverProps, 'children' | 'activator'>
  : Omit<IressMenuTextProps<TLabel>, 'children'>;

export type IressMenuGroupProps<
  TLabel extends TextElements = 'h2',
  TVariant extends MenuVariants = undefined,
> = MenuGroupRestProps<TLabel, TVariant> & {
  /**
   * Whether this header is active/expanded, revealing child drawer items.
   * Only used when parent Menu has variant="side".
   */
  active?: boolean;

  /**
   * Append an element after the label. Only used when variant is 'subdraw' to add an icon indicating a submenu.
   * By default, a right arrow icon is used when variant is 'subdraw', so this prop is only needed if you want to override that.
   */
  append?: ReactNode;

  /**
   * Label for the group, displayed as a non-selectable heading.
   */
  label: ReactNode;

  /**
   * Items within the group (typically menu items).
   */
  children?: ReactNode;

  /**
   * Uncontrolled default for the active/expanded state.
   * Only used when parent Menu has variant="side".
   */
  defaultActive?: boolean;

  /**
   * Adds a divider after the group.
   */
  divider?: boolean;

  /**
   * Custom element type for the activator (e.g. for third-party routing).
   * Only used when parent Menu has variant="side".
   */
  element?: ElementType;

  /**
   * URL for the group activator link.
   * Only used when parent Menu has variant="side".
   */
  href?: string;

  /**
   * Callback fired when the active/expanded state changes.
   * Only used when parent Menu has variant="side".
   */
  onActiveChange?: (active?: boolean) => void;

  /**
   * Click handler for the group activator.
   * Only used when parent Menu has variant="side".
   */
  onClick?: MouseEventHandler;

  /**
   * Variant of the menu group.
   * - `undefined` (default): Renders inline with label as heading and children below.
   * - `'subdraw'`: Renders as a trigger that opens a fly-over submenu containing children.
   * - `'side'`: Renders as a numbered header with an expandable drawer containing children.
   */
  variant?: TVariant;
};

/**
 * MenuGroup component for grouping related menu items under a common heading.
 * The heading is non-focusable and non-selectable, serving as a label for the group.
 *
 * When `variant="subdraw"`, the group label becomes a clickable trigger that opens
 * a fly-over submenu containing the group's children.
 *
 * @example
 * ```tsx
 * import { IressMenuGroup, IressMenuItem } from '@iress-oss/ids-components';
 *
 * <IressMenuGroup label="Actions">
 *   <IressMenuItem>Edit</IressMenuItem>
 *   <IressMenuItem>Delete</IressMenuItem>
 * </IressMenuGroup>
 * ```
 */
export const IressMenuGroup = <
  E extends TextElements = 'div',
  TVariant extends MenuVariants = undefined,
>({
  append,
  active: activeProp,
  children,
  className,
  defaultActive,
  divider,
  element,
  href,
  label,
  onActiveChange,
  onClick,
  variant: variantProp,
  'data-testid': dataTestId,
  ...restProps
}: IressMenuGroupProps<E, TVariant>) => {
  const id = useIdIfNeeded(restProps as never);
  const menu = useContext(MenuContext);
  const popover = usePopover();
  const variant = variantProp ?? menu?.variant;

  if (variant && (popover?.type === 'listbox' || menu?.role === 'listbox')) {
    throw new Error(
      '[IressMenuGroup] IressMenu with variants cannot be used within a Menu with role="listbox" or Popover with type="listbox", as it is not intended for that use case. Please unset the variant for grouping in listbox contexts.',
    );
  }

  const { value: active, setValue: setActive } = useControlledState<boolean>({
    component: 'IressMenuGroup',
    defaultValue: defaultActive,
    onChange: onActiveChange,
    value: activeProp,
  });

  // Side variant - numbered header with expandable drawer
  if (variant == 'side') {
    const classes = menuGroup({
      numbered: menu?.numbered,
      open: active,
    });

    return (
      <>
        <div
          className={cx(classes.root, className)}
          {...restProps}
          data-testid={dataTestId}
        >
          <IressMenuItem
            className={cx(classes.activator, GlobalCSSClass.MenuGroupActivator)}
            data-testid={propagateTestid(dataTestId, 'activator')}
            href={href}
            element={element}
            onClick={(e) => {
              setActive(!active);
              onClick?.(e);
            }}
            aria-expanded={active}
            id={id}
            aria-controls={`${id}-content`}
          >
            {label}
          </IressMenuItem>
          <div
            className={cx(classes.wrapper, GlobalCSSClass.MenuGroup)}
            id={`${id}-content`}
          >
            <div className={classes.content}>{children}</div>
          </div>
        </div>
        {divider && <IressMenuDivider />}
      </>
    );
  }

  // Subdraw variant - compose existing components
  if (variant == 'subdraw') {
    return (
      <>
        <IressPopover
          align="right-start"
          nested
          offset={{ mainAxis: 0, crossAxis: 0 }}
          type={menu?.role === 'list' ? undefined : menu?.role}
          virtualFocus={popover?.isVirtualFocus}
          contentStyle={{ p: 'none' }}
          {...restProps}
          className={cx(GlobalCSSClass.MenuGroup, className)}
          data-testid={propagateTestid(dataTestId, 'subdraw')}
          activator={
            <IressMenuItem
              append={append ?? <IressIcon name="keyboard_arrow_right" />}
              className={GlobalCSSClass.MenuGroupActivator}
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
      <IressMenuHeading
        data-testid={dataTestId}
        {...restProps}
        className={cx(GlobalCSSClass.MenuGroup, className)}
        srOnly={variant == 'rail' ? true : undefined}
        width={variant == 'rail' ? 'auto' : undefined}
      >
        {label}
      </IressMenuHeading>
      {children}
      {divider && <IressMenuDivider />}
    </>
  );
};

IressMenuGroup.displayName = 'IressMenuGroup';

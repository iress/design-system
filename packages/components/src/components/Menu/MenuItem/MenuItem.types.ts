import type React from 'react';
import { type HeadingLevel } from '@/enums';
import { type FormControlValue, type HeadingLevels } from '@/types';
import {
  type ButtonRef,
  type IressButtonProps,
  type IressTextProps,
  type PopoverItemHookReturn,
} from '@/main';

export interface IressMenuItemProps
  extends MenuItemStyleHookProps,
    Omit<MenuItemInteractionsHookProps, 'id' | 'onClick' | 'onKeyDown'>,
    Omit<IressButtonProps, 'mode' | 'fluid'> {}

export type IressMenuTextProps = MenuItemStyleHookProps & IressTextProps;

export interface IressMenuHeadingProps extends IressMenuTextProps {
  /**
   * Renders the heading level (h2 - h6).
   * @default h2
   */
  level?: HeadingLevel | HeadingLevels;
}

export interface MenuItemStyleHookProps {
  /**
   * Section after menu item content.
   */
  append?: React.ReactNode;

  /**
   * Adds a divider after any content.
   * If you would like to add content before the menu item, use a `<hr />` instead.
   */
  divider?: boolean;

  /**
   * 	Section before menu item content.
   */
  prepend?: React.ReactNode;
}

export interface MenuItemInteractionsHookProps<T = ButtonRef> {
  /**
   * When true, the item can be toggled even in single-select mode.
   */
  canToggle?: boolean;

  /**
   * Emitted when the menu item is clicked.
   */
  onClick?: React.MouseEventHandler<T>;

  /**
   * Emitted when a key is pressed while focused on the menu item.
   */
  onKeyDown?: React.KeyboardEventHandler<T>;

  /**
   * The role of this item, usually passed from the `useMenuItemRole` hook.
   */
  role?: IressButtonProps['role'];

  /**
   * When true, shows the item in selected state.
   */
  selected?: boolean;

  /**
   * To be used when menu type is listbox.
   */
  value?: FormControlValue;
}

export interface MenuItemInteractionsHookReturn<T>
  extends PopoverItemHookReturn {
  /**
   * Changes the value of its parent menu on click.
   */
  onClick: (e: React.MouseEvent<T>, value?: FormControlValue) => void;

  /**
   * If configured, changes the value of its parent menu on tab.
   */
  onKeyDown: (e: React.KeyboardEvent<T>, value?: FormControlValue) => void;

  /**
   * When true, the item can be focused.
   */
  tabIndex?: number;
}

export interface MenuItemAriaHookProps {
  /**
   * When true, shows the item in selected state.
   */
  selected?: boolean;

  /**
   * The value of the menu item.
   */
  value?: FormControlValue;
}

export interface MenuItemAriaHookReturn {
  /**
   * When true, tells screen readers that the item is selected.
   */
  'aria-selected'?: boolean;

  /**
   * When true, tells screen readers that the item represents the current page.
   */
  'aria-current'?: boolean;
}

export interface MenuItemButtonHookProps
  extends Pick<
    IressButtonProps,
    | 'append'
    | 'children'
    | 'className'
    | 'data-testid'
    | 'prepend'
    | 'role'
    | 'value'
  > {
  /**
   * When true, will render a divider before the item.
   */
  divider?: boolean;

  /**
   * When true, shows the item in selected state.
   */
  selected?: boolean;
}

/** @deprecated MenuItemRole enum is now deprecated and will be removed in a future version. Please use the MenuItemRoles type instead. **/
export enum MenuItemRole {
  ListItem = 'listitem',
  MenuItem = 'menuitem',
  Option = 'option',
}
export const MENU_ITEM_ROLES = ['listitem', 'option', 'menuitem'] as const;
export type MenuItemRoles = (typeof MENU_ITEM_ROLES)[number];

export type MenuItemAriaCurrent = 'true' | 'false' | 'page' | undefined;

export interface MenuHeadingType extends React.FC<IressMenuHeadingProps> {
  Level: typeof HeadingLevel;
}

export interface MenuItem {
  label: string | React.JSX.Element;
  href?: string;
  onClick?: React.MouseEventHandler;
  divider?: boolean;
  headingLevel?: HeadingLevel;
  selected?: boolean;
  value?: FormControlValue;
  testId?: string;
  key?: string | number;
}

import { type IressHTMLAttributes } from '@/interfaces';
import { type FormControlValue } from '@/types';
import { type PropsWithChildren } from 'react';

export interface IressMenuProps
  extends Omit<IressHTMLAttributes, 'defaultValue' | 'onChange' | 'value'> {
  /**
   * If set to true, change event will be fired with the correctly selected value.
   */
  changeOnBlur?: boolean;

  /**
   * Content of the menu, usually multiple `IressMenuItem`, `IressMenuHeading` or `IressMenuDivider`.
   */
  children?: React.ReactNode;

  /**
   * Initially selected values of menu when `role` is listbox.
   * Used for uncontrolled menus.
   */
  defaultSelected?: MenuSelected;

  /**
   * If set to true, menu will fill the width of its container.
   */
  fluid?: boolean;

  /**
   * Unique ID of the menu. If not provided, will be automatically generated.
   * Used to add aria attributes for accessibility.
   */
  id?: string;

  /**
   * Sets whether the layout is vertical (stack) or horizontal (inline/inline-equal-width).
   * @default stack
   */
  layout?: MenuLayout | MenuLayouts;

  /**
   * If set to true, menu items will contain checkboxes.
   */
  multiSelect?: boolean;

  /**
   * If set to true, menu items will not wrap onto a separate line when space is exceeded.
   */
  noWrap?: boolean;

  /**
   * Emitted when the menu value changes
   */
  onChange?: (value?: MenuSelected | null) => void;

  /**
   * Selected values of menu when `role` is listbox.
   * Used for controlled menus.
   */
  selected?: MenuSelected;

  /**
   * Type of menu, corresponding to [aria-roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
   * Will be set automatically when used inside popover or when the `multiSelect` prop is set to true.
   */
  role?: MenuType | MenuRoles;

  /**
   * Type of Menu - will be set automatically when used inside popover or when the multiSelect prop is set to true.
   * @deprecated Use `role` instead.
   */
  type?: MenuType;
}

export interface MenuProviderProps extends PropsWithChildren {
  changeOnBlur?: boolean;
  defaultSelected?: MenuSelected;
  id: string;
  layout: MenuLayouts;
  multiSelect?: boolean;
  nav?: boolean;
  noWrap?: boolean;
  onChange?: (value?: MenuSelected) => void;
  role?: MenuRoles;
  selected?: MenuSelected;
}

export interface MenuContextValue {
  changeOnBlur?: boolean;
  hasArrowKeyNav?: boolean;
  id: string;
  isSelected: (value?: FormControlValue) => boolean;
  layout: MenuLayouts;
  multiSelect?: boolean;
  nav?: boolean;
  noWrap?: boolean;
  role?: MenuRoles;
  selected?: MenuSelected;
  supportsSelection: boolean;
  toggle: (value?: FormControlValue, flag?: boolean) => void;
}

export interface MenuAriaHookProps {
  fluid?: boolean;
  id: string;
  layout?: MenuLayouts;
  multiSelect?: boolean;
  noWrap?: boolean;
  role?: MenuRoles;
}

export interface MenuAriaHookReturn {
  'aria-multiselectable'?: boolean;
  'aria-orientation'?: 'horizontal' | 'vertical';
}

export interface MenuStylesHookProps {
  className?: string;
  fluid?: boolean;
  layout?: MenuLayouts;
  role?: MenuRoles;
}

export interface MenuStylesHookReturn {
  className: string;
}

export type MenuSelected = FormControlValue | FormControlValue[];

/** @deprecated MenuType enum is now deprecated and will be removed in a future version. Please use the MenuRoles type instead. **/
export enum MenuType {
  Menu = 'menu',
  List = 'list',
  Listbox = 'listbox',
  Nav = 'nav',
}
export const MENU_ROLES = ['menu', 'list', 'listbox', 'nav'] as const;
export type MenuRoles = (typeof MENU_ROLES)[number];

/** @deprecated MenuLayout enum is now deprecated and will be removed in a future version. Please use the MenuLayouts enum instead. **/
export enum MenuLayout {
  Stack = 'stack',
  Inline = 'inline',
  InlineEqualWidth = 'inline-equal-width',
}
export const MENU_LAYOUTS = ['stack', 'inline', 'inline-equal-width'] as const;
export type MenuLayouts = (typeof MENU_LAYOUTS)[number];

export interface MenuWithEnums extends React.FC<IressMenuProps> {
  /** @deprecated IressMenu.Layout enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Layout: typeof MenuLayout;

  /** @deprecated IressMenu.Type enum is now deprecated and will be removed in a future version. Please use the value directly, and set it to the menu `role` prop. **/
  Type: typeof MenuType;
}

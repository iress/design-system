import { type PropsWithChildren, type ReactNode } from 'react';
import type React from 'react';
import { type IressHTMLAttributes } from '@/interfaces';
import { type FormControlValue } from '@/types';

export interface IressTabSetProps
  extends Omit<IressHTMLAttributes, 'onChange'> {
  /**
   * Content to be displayed inside the IressTabs, usually multiple `IressTab`.
   */
  children?: ReactNode;

  /**
   * Set the selected tab for uncontrolled tabs.
   * If the `IressTab` does not have a `value` prop, it will match by index.
   */
  defaultSelected?: FormControlValue;

  /**
   * Layout options for the positioning of tabs.
   * @default top-left
   */
  layout?: TabSetLayout | TabSetLayouts;

  /**
   * Emitted when a tab changes.
   */
  onChange?: (event: TabSetChangedEventDetail) => void;

  /**
   * Set the selected tab for controlled tabs.
   * If the `IressTab` does not have a `value` prop, it will match by index.
   */
  selected?: FormControlValue;
}

export interface TabSetProviderProps extends PropsWithChildren {
  defaultSelected?: FormControlValue;
  onChange?: (event: TabSetChangedEventDetail) => void;
  panel: HTMLDivElement | null;
  selected?: FormControlValue;
}

export interface TabSetContextValue {
  items: TabSetItem[];
  active?: TabSetItem;
  panel: HTMLDivElement | null;
  register: (item: TabSetRegisterItem) => void;
  indexOf: (id: string, value?: FormControlValue) => number;
  isActive: (id: string, value?: FormControlValue) => boolean;
  activate: (index: number, value?: FormControlValue) => void;
}

export interface TabSetChangedEventDetail {
  value?: FormControlValue;
  index: number;
}

export interface TabSetWithEnums extends React.FC<IressTabSetProps> {
  /** @deprecated IressTabSet.Layout enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Layout: typeof TabSetLayout;
}

export interface TabSetItemProps extends IressHTMLAttributes {
  handleSelection: (index: number, value?: FormControlValue) => void;
  index: number;
  selected?: boolean;
  value?: FormControlValue;
}

export interface TabSetItemRenderProps
  extends React.HTMLAttributes<HTMLElement> {
  ref?: (instance: HTMLElement | null) => void;
}

export interface TabSetRegisterItem {
  id: string;
  value?: FormControlValue;
}

export interface TabSetItem extends TabSetRegisterItem {
  index: number;
}

/** @deprecated IressTabs.Layout enum is now deprecated and will be removed in a future version. Please use the values directly instead. **/
export enum TabSetLayout {
  TopLeft = 'top-left',
  TopCenter = 'top-center',
  TopRight = 'top-right',
}
export const TAB_SET_LAYOUTS = ['top-left', 'top-center', 'top-right'] as const;
export type TabSetLayouts = (typeof TAB_SET_LAYOUTS)[number];

export interface Tab {
  tabName: string;
  active: boolean;
  tabButtonText: ReactNode;
  tabPanelContent: ReactNode;
  tabButtonTestId?: string;
  tabPanelTestId?: string;
  tabButtonOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

import {
  type ReactElement,
  type MutableRefObject,
  type PropsWithChildren,
} from 'react';

import { type DisplayMode, type FloatingUIAlign } from '@/enums';
import { type IressHTMLAttributes } from '@/interfaces';
import {
  type ElementProps,
  type OpenChangeReason,
  type UseFloatingReturn,
  type useInteractions,
} from '@floating-ui/react';
import {
  type DisplayModes,
  type FloatingUIAligns,
  type FloatingUIContainer,
} from '@/types';

export interface IressPopoverProps extends IressHTMLAttributes {
  /**
   * Content for an activator element, usually an `IressButton`.
   */
  activator: PopoverActivatorProps['children'];

  /**
   * Sets the alignment of the popover relative to the activator element.
   * @default auto
   */
  align?: FloatingUIAlign | FloatingUIAligns;

  /**
   * The content to render within the popover.
   */
  children?: React.ReactNode;

  /**
   * The container element to render the popover into.
   * By default, the popover will render where its parent is rendered.
   *
   * **Note:** If the `container` doesn’t exist when the popover is mounted, ensure you pass an element directly (not a ref) and specify null as the default value before it is set. This lets it wait for the root to be available. For example, if you reference the parent element of a popover.
   */
  container?: FloatingUIContainer;

  /**
   * Class name of the popover content
   */
  contentClassName?: string;

  /**
   * When set to `true` the popover will be visible by default. Use for uncontrolled popovers.
   */
  defaultShow?: boolean;

  /**
   * When set to `true`, popover toggling can only be done through the toggle method on the `ref`.
   * @deprecated Use a controlled `show` prop instead.
   */
  disabledAutoToggle?: boolean;

  /**
   * Sets the display mode of popover.
   * @default overlay
   */
  displayMode?: DisplayMode | DisplayModes;

  /**
   * Which index to start the focus on when the popover is opened. Only works with `type` listbox and menu.
   * Note: The index must exist in the list of items, otherwise it will not work.
   * @default 0
   */
  focusStartIndex?: number;

  /**
   * Sets the popover to match the width of the activator.
   * Note: This only works when `displayMode="overlay"`.
   */
  matchActivatorWidth?: boolean;

  /**
   * Is called when popover is activated.
   */
  onActivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;

  /**
   * Is called when popover is deactivated.
   */
  onDeactivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;

  /**
   * Is called when registered popover items are navigated using arrow keys. Only works with `type` listbox and menu.
   */
  onNavigate?: (activeIndex: number | null) => void;

  /**
   * When set to `true` the modal will be visible. Use for controlled popovers.
   */
  show?: boolean;

  /**
   * Describes the type of content contained in the popover.
   */
  type?: PopoverType | PopoverTypes;

  /**
   * Sets the width of the popover
   * @deprecated use the `--iress-max-width` design token instead.
   */
  width?: string;

  /**
   * Whether the focus is virtual (using `aria-activedescendant`).
   * Use this if you need focus to remain on the reference element (such as an input), but allow arrow keys to navigate items.
   * Note: This is only applicable when type is set to: `listbox` or `menu`, and only works out of the box with `IressMenu` and its subcomponents.
   * @default false
   */
  virtualFocus?: boolean;
}

export interface PopoverActivatorProps extends IressHTMLAttributes {
  children?: ReactElement;
}

export interface PopoverContentProps extends IressHTMLAttributes {
  container?: FloatingUIContainer;
  displayMode?: DisplayModes;
  virtualFocus?: boolean;
}

export interface PopoverStateHookProps {
  defaultShow?: boolean;
  show?: boolean;
}

export interface PopoverStateHookReturn {
  hasInnerRole: () => boolean;
  isControlled: boolean;
  setShow: (flag?: boolean) => void;
  setHasInnerRole: (flag: boolean) => void;
  show: boolean;
}

export interface PopoverAriaHookReturn {
  getAriaControls: () => string[];
  toggleAriaControls: (id: string, addOrRemove?: boolean) => void;
}

export interface PopoverItemHookReturn {
  isActiveInPopover?: boolean;
  id: string;
  ref?: (node: HTMLElement | null) => void;
  tabIndex?: number;
}

export interface PopoverNavigationHookReturn {
  activeIndex: number | null;
  list: React.MutableRefObject<(HTMLElement | null)[]>;
  listNav: ElementProps;
  setActiveIndex: (value: number | null) => void;
}

export interface PopoverProviderProps
  extends PropsWithChildren,
    PopoverStateHookProps {
  align: FloatingUIAligns;
  autoHighlight?: boolean;
  disabledAutoToggle?: boolean;
  focusStartIndex?: number;
  matchActivatorWidth?: boolean;
  onActivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;
  onDeactivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;
  onNavigate?: (activeIndex: number | null) => void;
  type?: PopoverTypes;
  virtualFocus?: boolean;
}

export interface PopoverContextValue
  extends PopoverStateHookReturn,
    PopoverAriaHookReturn {
  activeIndex: number | null;
  api: UseFloatingReturn;
  disabledAutoToggle?: boolean;
  getVirtualFocus?: () => PopoverVirtualNode | null;
  getFocusableActivator: () => HTMLElement | undefined;
  interactions: ReturnType<typeof useInteractions>;
  list: MutableRefObject<(HTMLElement | null)[]>;
  type?: PopoverTypes;
  resetActiveIndex: () => void;
  setActiveIndex: (value: number | null) => void;
  setShowWithReason: (
    flag: boolean,
    e?: Event,
    reason?: OpenChangeReason,
  ) => void;
  setVirtualFocus?: (node: PopoverVirtualNode | null) => void;
}

export interface PopoverRef
  extends Pick<PopoverContextValue, 'setShow' | 'show'>,
    Pick<PopoverAriaHookReturn, 'toggleAriaControls'> {
  getActivator: () => HTMLElement | null;
  getFocusableActivator?: () => HTMLElement | undefined;
  getContent: () => HTMLElement | null;
}

export interface PopoverVirtualNode {
  onBlur?: React.KeyboardEventHandler<HTMLElement>;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLElement>,
    popover?: PopoverContextValue,
  ) => void;
}

/** @deprecated PopoverType enum is now deprecated and will be removed in a future version. Please use the PopoverTypes type instead. **/
export enum PopoverType {
  Menu = 'menu',
  Listbox = 'listbox',
  Tree = 'tree',
  Grid = 'grid',
  Dialog = 'dialog',
}
export const POPOVER_TYPES = [
  'menu',
  'listbox',
  'tree',
  'grid',
  'dialog',
] as const;
export type PopoverTypes = (typeof POPOVER_TYPES)[number];

export const POPOVER_USE_MAX_HEIGHT = 200;

export enum PopoverCssClass {
  Active = 'iress--popover-active',
}

export interface PopoverWithEnums
  extends React.ForwardRefExoticComponent<
    IressPopoverProps & React.RefAttributes<PopoverRef>
  > {
  /** @deprecated IressPopover.Align is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Align: typeof FloatingUIAlign;

  /** @deprecated IressPopover.Type is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Type: typeof PopoverType;
}

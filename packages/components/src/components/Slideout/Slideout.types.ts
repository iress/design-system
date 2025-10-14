import {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { type IressHTMLAttributes } from '@/interfaces';
import { type PaddingSize } from '@/enums';
import { type FloatingUIContainer, type PaddingSizes } from '@/types';
import { type OpenChangeReason } from '@floating-ui/react';

export interface IressSlideoutProps extends IressHTMLAttributes {
  /**
   * When set to `true` a backdrop will be displayed to cover the contents of the page.
   * The slideout will then become the only element that can be interacted with.
   */
  backdrop?: boolean;

  /**
   * Content to be displayed within the slideout.
   */
  children?: ReactNode;

  /**
   * Screenreader text for close button.
   * @default 'Close'
   */
  closeText?: string;

  /**
   * The container element to render the slideout into.
   * By default, the slideout will render at the end of the document body.
   */
  container?: FloatingUIContainer;

  /**
   * When set to `true` the slideout will be visible.
   * Use for uncontrolled slideouts.
   */
  defaultShow?: boolean;

  /**
   * The element that needs to be pushed relative to the slideout. This can be a string selector to match an existing element in the DOM, a html element, or a React reference.
   * Will be ignored if `mode` is not set to `push` or if element does not exist.
   */
  eleToPush?: string | HTMLElement | React.MutableRefObject<HTMLElement | null>;

  /**
   * Panel to place slideout controls.
   */
  footer?: ReactNode;

  /**
   * Sets the heading for the slideout.
   * If passed an element, it will render the element with an id, to ensure its connection to the slideout.
   */
  heading?: ReactElement | string;

  /**
   * Unique ID for the slideout. Use if you would like to open this slideout from anywhere in your app using the `useSlideout` hook.
   */
  id?: string;

  /**
   * Sets how the Slideout interacts with the content of the page.
   * `overlay` overlays the page content, obscuring the content below.
   * `push` will push the element (specified by `eleToPush`) across the page. `push` will revert back to `overlay` if `eleToPush` is not specified or if the screen size < 1200px.
   * @default 'overlay'
   */
  mode?: SlideoutMode | SlideoutModes;

  /**
   * Emitted when the slideout has opened or closed internally.
   * Use for controlled slideouts.
   */
  onShowChange?: (show: boolean, reason?: OpenChangeReason) => void;

  /**
   * Emitted when the slideout has mounted, unmounted, opened or closed. Open and close occur before animation begins.
   */
  onStatus?: (status: 'unmounted' | 'initial' | 'open' | 'close') => void;

  /**
   * Emitted when the slideout has opened.
   */
  onEntered?: () => void;

  /**
   * Emitted when the slideout has closed.
   */
  onExited?: () => void;

  /**
   * Sets the padding of the wrapping panel component.
   * @default 'md'
   */
  padding?: PaddingSize | PaddingSizes;

  /**
   * Position of the slideout relative to the page. `left` or `right`.
   * @default 'right'
   */
  position?: SlideoutPosition | SlideoutPositions;

  /**
   * When set to `true` the slideout will be visible.
   * Use for controlled slideouts.
   */
  show?: boolean;

  /**
   * Accepts a single `SlideoutSize`. Slideouts will display at 100% for mobile screens (<576px).
   * @default 'sm'
   */
  size?: SlideoutSize | SlideoutSizes;
}

export interface IressSlideoutProviderProps extends PropsWithChildren {
  /**
   * The container element to render the slideout into.
   * By default, the slideout will render at the end of the document body.
   */
  container?: FloatingUIContainer;

  /**
   * If you are rendering a slideout inside a micro-frontend, using `push` mode and `eleToPush` is targetting an element in the parent app, you will need to set this to `true` to ensure the styles are injected into the parent app.
   * This will ensure the slideout is positioned correctly and the element is pushed correctly.
   */
  injectPushStyles?: boolean | string;
}

export interface IressSlideoutContextValue {
  container?: FloatingUIContainer;
  opened: string[];
  showSlideout: (id: string, flag?: boolean) => void;
}

export interface SlideoutInnerProps extends IressHTMLAttributes {
  closeText?: string;
  floatingRef?: (node: HTMLElement | null) => void;
  footer?: ReactNode;
  heading?: ReactNode;
  onOpenChange: (show: boolean) => void;
  padding?: PaddingSize | PaddingSizes;
}

export interface SlideoutWithEnums extends React.FC<IressSlideoutProps> {
  /** @deprecated IressSlideout.Mode will be removed in future versions of IDS. Please use the value directly. */
  Mode: typeof SlideoutMode;

  /** @deprecated IressSlideout.Padding will be removed in future versions of IDS. Please use the value directly. */
  Padding: typeof PaddingSize;

  /** @deprecated IressSlideout.Position will be removed in future versions of IDS. Please use the value directly. */
  Position: typeof SlideoutPosition;

  /** @deprecated IressSlideout.Size will be removed in future versions of IDS. Please use the value directly. */
  Size: typeof SlideoutSize;
}

/** @deprecated IressSlideout.Mode enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
export enum SlideoutMode {
  Overlay = 'overlay',
  Push = 'push',
}
export const SLIDEOUT_MODES = ['overlay', 'push'] as const;
export type SlideoutModes = (typeof SLIDEOUT_MODES)[number];

/** @deprecated IressSlideout.Position enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
export enum SlideoutPosition {
  Right = 'right',
  Left = 'left',
}
export const SLIDEOUT_POSITIONS = ['right', 'left'] as const;
export type SlideoutPositions = (typeof SLIDEOUT_POSITIONS)[number];

/** @deprecated IressSlideout.Size enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
export enum SlideoutSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
}
export const SLIDEOUT_SIZES = ['sm', 'md', 'lg'] as const;
export type SlideoutSizes = (typeof SLIDEOUT_SIZES)[number];

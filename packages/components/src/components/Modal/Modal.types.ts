import {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { type IressHTMLAttributes, type ResponsiveSizing } from '@/interfaces';
import { type ModalSize, type PaddingSize } from '@/enums';
import { type FloatingUIContainer, type PaddingSizes } from '@/types';

export interface IressModalProps extends IressHTMLAttributes {
  /**
   * Text to be displayed inside the modal.
   */
  children?: ReactNode;

  /**
   * Screenreader text for close button.
   * @default Close
   */
  closeText?: string;

  /**
   * The container element to render the modal into.
   * By default, the modal will render at the end of the document body.
   */
  container?: FloatingUIContainer;

  /**
   * When set to `true` the modal will be visible by default. Use for uncontrolled modals.
   */
  defaultShow?: boolean;

  /**
   * When set to `true`, users cannot exit the modal by clicking the backdrop or using the escape key.
   */
  disableBackdropClick?: boolean;

  /**
   * When set to `true` the modal's footer will always be visible and fixed to the bottom of the modal.
   */
  fixedFooter?: boolean;

  /**
   * Panel to place modal controls.
   */
  footer?: ReactNode;

  /**
   * Sets the heading for the modal.
   * If passed an element, it will render the element with an id, to ensure its connection to the modal.
   */
  heading?: ReactElement | string;

  /**
   * Unique ID for the modal. Use if you would like to open this modal from anywhere in your app using the `useModal` hook.
   */
  id?: string;

  /**
   * When set to `true`, no close button will be rendered. You must add your own closing mechanism to ensure accessibility.
   */
  noCloseButton?: boolean;

  /**
   * Emitted when the modal has opened or closed internally. Use for controlled modals.
   */
  onShowChange?: (show: boolean) => void;

  /**
   * Emitted when the modal has mounted, unmounted, opened or closed. Open and close occur before animation begins.
   */
  onStatus?: (status: 'unmounted' | 'initial' | 'open' | 'close') => void;

  /**
   * Emitted when the modal has opened.
   */
  onEntered?: () => void;

  /**
   * Emitted when the modal has closed.
   */
  onExited?: () => void;

  /**
   * Sets the padding of the wrapping panel component
   * @default md
   */
  padding?: PaddingSize | PaddingSizes;

  /**
   * When set to `true` the modal will be visible. Use for controlled modals.
   */
  show?: boolean;

  /**
   * Accepts a `string` or `{ xs: sm }` (for responsive sizing) of `ModalSizes` options.
   * @default md
   */
  size?: ModalSize | ResponsiveSizing<ModalSize | ModalSizes> | ModalSizes;

  /**
   * When set to `true`, the modal will act like a static element when open.
   * This means it will not lock scroll or focus within the modal.
   * Note: This is used internally to display modals in Styler. It is not recommended to use this prop in your own applications.
   */
  static?: boolean;
}

export interface IressModalProviderProps extends PropsWithChildren {
  /**
   * The container element to render the modal into.
   * By default, the modal will render at the end of the document body.
   */
  container?: FloatingUIContainer;
}

export interface IressModalContextValue {
  opened: string[];
  container?: FloatingUIContainer;
  showModal: (id: string, flag?: boolean) => void;
}

export const MODAL_SIZES = ['sm', 'md', 'lg', 'fullpage'] as const;
export type ModalSizes = (typeof MODAL_SIZES)[number];

export interface ModalWithEnums extends React.FC<IressModalProps> {
  /** @deprecated IressModal.Size enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Size: typeof ModalSize;

  /** @deprecated IressModal.Padding enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Padding: typeof PaddingSize;
}

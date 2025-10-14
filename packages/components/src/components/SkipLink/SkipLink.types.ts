import { type IressAnchorHTMLAttributes } from '@/interfaces';
import { type ReactNode } from 'react';

export interface IressSkipLinkProps extends IressAnchorHTMLAttributes {
  /**
   * Description of where the skip link jumps to.
   * @default Skip to content
   */
  children?: ReactNode;

  /**
   * The target of the skip link.
   */
  href?: string;

  /**
   * Unique identifier for the skip link.
   */
  id?: string;

  /**
   * The target ID of the element that the link will skip to. If not provided, will fall back to the `href` property.
   * @deprecated Use `href` with a `#` instead (eg. #main).
   */
  targetId?: string;
}

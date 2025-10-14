import { type IressHTMLAttributes } from '@/main';
import { type ReactNode } from 'react';

export interface IressPlaceholderProps extends IressHTMLAttributes {
  /**
   * Description of the placeholder's envisioned contents.
   */
  children?: ReactNode;

  /**
   * Sets the height of the placeholder.
   */
  height?: string | number;

  /**
   * Sets the placeholder to be full width if true.
   */
  stretch?: boolean;

  /**
   * Sets the placeholder to be transparent if true.
   */
  transparent?: boolean;

  /**
   * Sets the width of the placeholder.
   */
  width?: string | number;
}

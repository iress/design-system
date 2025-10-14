import { type ReactNode } from 'react';
import { type IressTextProps } from '@/main';

export interface IressSelectBodyProps extends IressTextProps {
  /**
   * Footer of the select, it will render as fixed (pinned).
   */
  footer?: ReactNode;

  /**
   * Header of the select, it will render as fixed (pinned).
   */
  header?: ReactNode;
}

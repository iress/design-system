import { type ReactNode } from 'react';
import { type IressTableCommonProps } from '../Table.types';
import { type IressHTMLAttributes } from '@/interfaces';

export interface IressTableBodyProps<TRow extends object = never, TVal = never>
  extends IressHTMLAttributes<HTMLTableSectionElement>,
    IressTableCommonProps<TRow, TVal> {
  /**
   * Caption that describes the data in the inner table, required for accessibility.
   * Used to open/close the inner table.
   *
   * **Note:** Do not include interactive elements inside the caption.
   */
  caption: ReactNode;

  /**
   * When set to true, the table caption will be visually hidden.
   * If set, the inner table will always be open.
   */
  hiddenCaption?: boolean;

  /**
   * Is called when table is opened.
   */
  onOpened?: () => void;

  /**
   * Is called when table is closed.
   */
  onClosed?: () => void;

  /**
   * When true, all rows will be visible, otherwise they are hidden.
   */
  open?: boolean;
}

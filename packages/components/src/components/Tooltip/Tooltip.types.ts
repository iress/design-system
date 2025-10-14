import { type FloatingUIAligns } from '@/main';
import { type FloatingUIAlign } from '@/enums';
import { type IressHTMLAttributes } from '@/interfaces';
import { type ReactNode } from 'react';

export interface IressTooltipProps extends IressHTMLAttributes {
  /**
   * Sets the alignment of the popover relative to the activator element.
   * @default top
   */
  align?: FloatingUIAlign | FloatingUIAligns;

  /**
   * The element to add a tooltip to.
   */
  children: ReactNode;

  /**
   * Sets the tooltip display delay in milliseconds.
   * @default 500
   */
  delay?: number;

  /**
   * Only used for internal testing.
   * @default false
   */
  open?: boolean;

  /**
   * Sets the tooltip text. Can accept a string or an array of strings - if given an array, will output each string on a new line.
   */
  tooltipText: string | string[];
}

export interface TooltipWithEnums extends React.FC<IressTooltipProps> {
  /** @deprecated IressTooltip.Align is now deprecated and will be removed in a future version. Please use the GutterSizes type instead. */
  Align: typeof FloatingUIAlign;
}

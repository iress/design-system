import { type ReactNode } from 'react';
import { type IressHTMLAttributes } from '@/interfaces';

export interface IressExpanderProps
  extends Omit<IressHTMLAttributes, 'onChange'> {
  /**
   * The element used to activate the expandable container.
   */
  activator: ReactNode;

  /**
   * Contents that will be expanded/collapsed when the expander is activated.
   */
  children?: ReactNode;

  /**
   * Emitted when the open state changes.
   */
  onChange?: (newValue: ExpanderActivatorClickEventDetail) => void;

  /**
   * Controls the display mode of the activator element. Can be Section, Heading or Link.
   */
  mode?: ExpanderMode | ExpanderModes;

  /**
   * When true the expandable container will be visible and the activator will display as open.
   */
  open?: boolean;
}

export interface ExpanderActivatorClickEventDetail {
  open?: boolean;
}

export const EXPANDER_MODES = ['section', 'heading', 'link'] as const;
export type ExpanderModes = (typeof EXPANDER_MODES)[number];

/** @deprecated ExpanderMode is now deprecated and will be removed in a future version. Please use the ExpanderModes type instead. **/
export enum ExpanderMode {
  Section = 'section',
  Heading = 'heading',
  Link = 'link',
}

export interface ExpanderWithEnums extends React.FC<IressExpanderProps> {
  /** @deprecated IressExpander.Mode is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Mode: typeof ExpanderMode;
}

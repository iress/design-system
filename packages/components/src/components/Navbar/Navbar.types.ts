import { type ReactNode } from 'react';
import { type IressHTMLAttributes } from '@/interfaces';
import { type Breakpoint } from '@/enums';
import { type Breakpoints } from '@/types';

export interface IressNavbarProps extends IressHTMLAttributes {
  /**
   * Sets the breakpoint at which the main nav content is hidden, and replaced by a hamburger menu. If not set, the navbar won't be responsive.
   */
  breakpoint?: Breakpoint | Breakpoints;

  /**
   * Content to be rendered inside the navbar (e.g. navigation links).
   */
  children?: ReactNode;

  /**
   * Fixes the navbar with relation to the viewport if true. If false, the navbar will scroll out of view when the user scrolls.
   */
  fixed?: boolean;

  /**
   * When navbar is fixed, elements that are obscured by the fixed navbar are scrolled into view when they receive focus.
   */
  handledFocus?: boolean;

  /**
   * Sets the url of the home link
   */
  homeUrl?: string;

  /**
   * Sets the alignment of the nav; either start (all left-aligned), between (children slot left-aligned and nav slot right-aligned) or end (all right-aligned)
   */
  horizontalAlign?: NavbarHorizontalAlign | NavbarHorizontalAligns;

  /**
   * Content for the logo slot.
   */
  logo?: ReactNode;

  /**
   * Adds alt text to the logo's <img>
   * @deprecated Use `logo` instead, and `alt` text to your img.
   */
  logoAltText?: string;

  /**
   * Sets the source url of the logo
   * @deprecated Use `logo` instead with the proper `src` attribute.
   */
  logoSrc?: string;

  /**
   * Content for the nav slot.
   */
  nav?: ReactNode;

  /**
   * The name of the nav element (used by screen reader users). The nav element is wrapped around any content in the Nav slot
   */
  navLabel?: string;
}

/** @deprecated NavbarHorizontalAlign enum is now deprecated and will be removed in a future version. Please use the NavbarHorizontalAligns type instead. **/
export enum NavbarHorizontalAlign {
  Between = 'between',
  End = 'end',
  Start = 'start',
}

export type NavbarHorizontalAligns = 'between' | 'end' | 'start';

export interface NavbarWithEnums extends React.FC<IressNavbarProps> {
  /** @deprecated IressNavbar.Layout enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  HorizontalAlign: typeof NavbarHorizontalAlign;

  /** @deprecated IressNavbar.Breakpoint enum is now deprecated and will be removed in a future version. Please use the value directly. **/
  Breakpoint: typeof Breakpoint;
}

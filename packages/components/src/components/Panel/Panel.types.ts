import { type VariablePaddingSize, type ResponsiveSizing } from '@/interfaces';
import {
  type MixedPaddingSize,
  type PaddingSizes,
  type TextAligns,
} from '@/types';
import { type PaddingSize, type TextAlign } from '@/enums';
import { type ReactNode } from 'react';

export interface IressPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Panel background - controls the background style (set via the theme).
   */
  background?: PanelBackground | PanelBackgrounds;

  /**
   * Content to be grouped using a panel.
   */
  children?: ReactNode;

  /**
   * Setting to true will ignore the border radius set in the theme and set it to zero.
   */
  noBorderRadius?: boolean;

  /**
   * Removes bottom margin from last child of the panel element if true.
   */
  noGutter?: boolean;

  /**
   * Padding of the panel.
   */
  padding?:
    | PaddingSize
    | PaddingSizes
    | VariablePaddingSize
    | ResponsiveSizing<MixedPaddingSize>;

  /**
   * If `true`, the panel background will fill the height of the container.
   */
  stretch?: boolean;

  /**
   * Text alignment for panel.
   */
  textAlign?: TextAlign | TextAligns;
}

export interface PanelWithEnums extends React.FC<IressPanelProps> {
  /** @deprecated IressPanel.Background is now deprecated and will be removed in a future version. Please use the PanelBackgrounds type instead. */
  Background: typeof PanelBackground;

  /** @deprecated IressPanel.Padding is now deprecated and will be removed in a future version. Please use the PaddingSizes type instead. */
  Padding: typeof PaddingSize;

  /** @deprecated IressPanel.TextAlign is now deprecated and will be removed in a future version. Please use the TextAligns type instead. */
  TextAlign: typeof TextAlign;
}

export enum PanelCssClass {
  Background = 'iress--background',
  Base = 'iress-u-panel',
  NoBorderRadius = 'iress--no-border-radius',
  NoGutter = 'iress--no-gutter',
  Stretch = 'iress--stretch',
}

/** @deprecated PanelBackground is now deprecated and will be removed in a future version. Please use the PanelBackgrounds type instead. */
export enum PanelBackground {
  Default = 'default',
  Alt = 'alt',
  Page = 'page',
  Transparent = 'transparent',
}
export const PANEL_BACKGROUNDS = [
  'default',
  'alt',
  'page',
  'transparent',
] as const;
export type PanelBackgrounds = (typeof PANEL_BACKGROUNDS)[number];

export type PanelPadding =
  | PaddingSize
  | VariablePaddingSize
  | PaddingSize[]
  | VariablePaddingSize[]
  | ResponsiveSizing<MixedPaddingSize>;

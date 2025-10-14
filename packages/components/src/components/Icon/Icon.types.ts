import { type TextMode, type TextModes } from '../../main';

export interface IressIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The name of the icon
   */
  name: string;

  /**
   * Adds screen reader text if the icon needs to be visible to screen reader users
   */
  screenreaderText?: string;

  /**
   * The icon set to be used
   * @default IconSet.FALight
   */
  set?: IconSet | IconSets;

  /**
   * Amount of degrees to rotate the icon
   */
  rotate?: IconRotate | IconRotates;

  /**
   * Adds fixed width class for Font Awesome icons - fa-fw
   */
  fixedWidth?: boolean;

  /**
   * Flip the icon horizontally or vertically
   */
  flip?: IconFlip | IconFlips;

  /**
   * Allows control of the icon color
   */
  mode?: TextMode | TextModes;

  /**
   * Re-size the icon using the `IconSize` enum, based on FontAwesome's size classes
   */
  size?: IconSize | IconSizes;

  /**
   * Accepts a numeric value for speed for one rotation.
   */
  spin?: IconSpin | IconSpins;
}

/** @deprecated IconSet enum is now deprecated and will be removed in a future version. Please use the IconSets type instead. */
export enum IconSet {
  FALight = 'fal',
  FABrand = 'fab',
}
export const ICON_SETS = ['fal', 'fab'] as const;
export type IconSets = (typeof ICON_SETS)[number];

/** @deprecated IconSize enum is now deprecated and will be removed in a future version. Please use the IconSizes type instead. */
export enum IconSize {
  Xs = 'xs',
  Sm = 'sm',
  Lg = 'lg',
  TwoTimes = '2x',
  ThreeTimes = '3x',
  FiveTimes = '5x',
  SevenTimes = '7x',
  TenTimes = '10x',
}
export const ICON_SIZES = [
  'xs',
  'sm',
  'lg',
  '2x',
  '3x',
  '5x',
  '7x',
  '10x',
] as const;
export type IconSizes = (typeof ICON_SIZES)[number];

/** @deprecated IconFlip enum is now deprecated and will be removed in a future version. Please use the IconFlips type instead. */
export enum IconFlip {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Both = 'both',
}
export const ICON_FLIPS = ['horizontal', 'vertical', 'both'] as const;
export type IconFlips = (typeof ICON_FLIPS)[number];

/** @deprecated IconRotate enum is now deprecated and will be removed in a future version. Please use the IconRotates type instead. */
export enum IconRotate {
  Deg90 = '90',
  Deg180 = '180',
  Deg270 = '270',
}
export const ICON_ROTATES = ['90', '180', '270'] as const;
export type IconRotates = (typeof ICON_ROTATES)[number];

/** @deprecated IconSpin enum is now deprecated and will be removed in a future version. Please use the IconSpins type instead. */
export enum IconSpin {
  SpinHalf = 'half',
  Spin1 = '1',
  Spin2 = '2',
  Spin3 = '3',
}
export const ICON_SPINS = ['half', '1', '2', '3'] as const;
export type IconSpins = (typeof ICON_SPINS)[number];

export interface IconWithEnums
  extends React.ForwardRefExoticComponent<
    IressIconProps & React.RefAttributes<HTMLElement>
  > {
  /** @deprecated IressIcon.Set is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Set: typeof IconSet;

  /** @deprecated IressIcon.Rotate is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Rotate: typeof IconRotate;

  /** @deprecated IressIcon.Flip is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Flip: typeof IconFlip;

  /** @deprecated IressIcon.Size is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Size: typeof IconSize;

  /** @deprecated IressIcon.Spin is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Spin: typeof IconSpin;

  /** @deprecated IressIcon.Mode is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Mode: typeof TextMode;
}

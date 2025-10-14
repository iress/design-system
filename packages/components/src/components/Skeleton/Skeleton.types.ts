import { type TextVariant } from '@/enums';
import { type IressHTMLAttributes } from '@/interfaces';
import { type TextVariants } from '@/types';

export interface IressSkeletonProps
  extends Omit<IressHTMLAttributes, 'children'> {
  /**
   * Sets the height of the skeleton bones. If no unit is specified it will default to pixels. Will be ignored when in `text` mode.
   */
  height?: string;

  /**
   * Mode of the skeleton. `rect` and `circle` must have `width` and `height` specified. `text` works with `textVariant`.
   * @default text
   */
  mode?: SkeletonMode | SkeletonModes;

  /**
   * Use `textVariant` to specify what the Skeleton should emulate. If set to `h1` a non-break space with the same font-size and line-height of a h1 will be rendered.
   */
  textVariant?: TextVariant | TextVariants;

  /**
   * Sets the width of the skeleton bones. If no unit is specified it will default to pixels.
   */
  width?: string;
}

export interface SkeletonWithEnums extends React.FC<IressSkeletonProps> {
  /** @deprecated IressSkeleton.Mode enum is now deprecated and will be removed in a future version. Please use the SkeletonModes type instead. **/
  Mode: typeof SkeletonMode;

  /** @deprecated IressSkeleton.TextVariant enum is now deprecated and will be removed in a future version. Please use the TextVariants type instead. **/
  TextVariant: typeof TextVariant;
}

/** @deprecated SkeletonMode enum is now deprecated and will be removed in a future version. Please use the SkeletonModes type instead. **/
export enum SkeletonMode {
  Rect = 'rect',
  Circle = 'circle',
  Text = 'text',
}
export const SKELETON_MODES = ['rect', 'circle', 'text'] as const;
export type SkeletonModes = (typeof SKELETON_MODES)[number];

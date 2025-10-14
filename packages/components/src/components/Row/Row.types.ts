import {
  type GutterSize,
  type GutterSizes,
  type HorizontalAlign,
  type HorizontalAligns,
  type VerticalAlign,
  type VerticalAligns,
} from '@/main';
import { type IressHTMLAttributes, type ResponsiveSizing } from '@/interfaces';

export interface IressRowProps extends IressHTMLAttributes<HTMLDivElement> {
  /**
   * Any content you would like to be contained. Best used with `IressCol`.
   */
  children?: React.ReactNode;

  /**
   * The amount of space between columns. If a single value is provided, this will be applied to all viewport sizes. If multiple values are provided, the first will apply to the small viewport upwards, the second to the medium viewport upwards, the third (if set) to the large viewport upwards, and the fourth (if set) to the extra large viewport.
   */
  gutter?:
    | GutterSize
    | GutterSizes
    | ResponsiveSizing<GutterSize | GutterSizes>;

  /**
   * Horizontal alignment, follows flexbox justify-content
   * @default left
   */
  horizontalAlign?: HorizontalAlign | HorizontalAligns;

  /**
   * Remove negative gutter and uses column gap. This is useful for cases where you are not using `IressCol`.
   * @default false
   */
  useColGap?: boolean;

  /**
   * Vertical alignment, follows flexbox align-items
   * @default top
   */
  verticalAlign?: VerticalAlign | VerticalAligns;
}

export interface RowWithEnums extends React.FC<IressRowProps> {
  /** @deprecated IressRow.Gutter enum is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Gutter: typeof GutterSize;

  /** @deprecated IressRow.HorizontalAlign enum is now deprecated and will be removed in a future version. Please use the value directly instead. */
  HorizontalAlign: typeof HorizontalAlign;

  /** @deprecated IressRow.VerticalAlign enum is now deprecated and will be removed in a future version. Please use the value directly instead. */
  VerticalAlign: typeof VerticalAlign;
}

export enum RowCssClass {
  Base = 'iress-u-row',
  Gutter = 'iress--gutter',
  HorizontalAlign = 'iress--h-align',
  VerticalAlign = 'iress--v-align',
  UseColGap = 'iress--use-col-gap',
}

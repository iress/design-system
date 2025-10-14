import { type IressHTMLAttributes, type ResponsiveSizing } from '@/interfaces';

export interface IressColProps extends IressHTMLAttributes<HTMLDivElement> {
  /**
   * Individual alignment of column
   */
  alignSelf?: ColAlignSelf | ColAlignSelfs;

  /**
   * Any content you would like to be contained in a column.
   */
  children?: React.ReactNode;

  /**
   * Number of columns to offset.
   */
  offset?: ColOffset | ColOffsets | ResponsiveSizing<ColOffset | ColOffsets>;

  /**
   * Number of columns to span.
   * @default auto
   */
  span?: ColSpan | ColSpans | ResponsiveSizing<ColSpan | ColSpans>;
}

export interface ColWithEnums extends React.FC<IressColProps> {
  /** @deprecated IressCol.AlignSelf is now deprecated and will be removed in a future version. Please use the ColAlignSelfs type instead. */
  AlignSelf: typeof ColAlignSelf;

  /** @deprecated IressCol.Offset is now deprecated and will be removed in a future version. Please use the ColOffsets type instead. */
  Offset: typeof ColOffset;

  /** @deprecated IressCol.AlignSpanSelf is now deprecated and will be removed in a future version. Please use the ColSpans type instead. */
  Span: typeof ColSpan;
}

export enum ColCssClass {
  AlignSelf = 'iress--align-self',
  Base = 'iress-u-col',
  Offset = 'iress--offset',
  Span = 'iress--span',
}

/** @deprecated ColAlignSelf is now deprecated and will be removed in a future version. Please use the ColAlignSelfs type instead. */
export enum ColAlignSelf {
  Start = 'start',
  End = 'end',
  Center = 'center',
  Stretch = 'stretch',
}
export const COL_ALIGN_SELFS = ['start', 'end', 'center', 'stretch'] as const;
export type ColAlignSelfs = (typeof COL_ALIGN_SELFS)[number];

/** @deprecated ColSpan is now deprecated and will be removed in a future version. Please use the ColSpans type instead. */
export enum ColSpan {
  Auto = 'auto',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Eleven = '11',
  Twelve = '12',
}
export const COL_SPANS = [
  'auto',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
] as const;
export type ColSpans = (typeof COL_SPANS)[number];

/** @deprecated ColOffset is now deprecated and will be removed in a future version. Please use the ColOffsets type instead. */
export enum ColOffset {
  None = '0',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Eleven = '11',
}
export const COL_OFFSETS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
] as const;
export type ColOffsets = (typeof COL_OFFSETS)[number];

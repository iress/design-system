import { type ReactNode } from 'react';
import {
  type TextElement,
  type TextMode,
  type TextVariant,
  type TextAlign,
  type HeadingLevel,
} from '@/enums';
import { type IressHTMLAttributes } from '@/interfaces';
import {
  type HeadingLevels,
  type TextAligns,
  type TextModes,
  type TextVariants,
} from '@/main';

export interface IressTextProps extends IressHTMLAttributes<HTMLElement> {
  /**
   * The content to be rendered; can be a string or a ReactNode (e.g. IressIcon).
   */
  children?: ReactNode | string;

  /**
   * Text alignment.
   */
  align?: TextAlign | TextAligns;

  /**
   * The HTML element that should be rendered.
   * @default TextElement.Div
   */
  element?: TextElement | HeadingLevel | TextElements | HeadingLevels;

  /**
   * Allows control of the text color.
   *
   * **Note**: The body mode has been deprecated and will be removed in a future version. Please use the body variant instead.
   */
  mode?: TextMode | TextModes;

  /**
   * Removes bottom margin from last child of the text element if true.
   */
  noGutter?: boolean;

  /**
   * The typographic style to be rendered.
   */
  variant?: TextVariant | TextVariants;
}

export const TEXT_ELEMENTS = [
  'p',
  'div',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'code',
  'blockquote',
  'caption',
  'cite',
  'small',
] as const;
export type TextElements = (typeof TEXT_ELEMENTS)[number];

export interface TextWithEnums extends React.FC<IressTextProps> {
  /** @deprecated IressText.Mode is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Mode: typeof TextMode;

  /** @deprecated IressText.Element is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Element: typeof TextElement;

  /** @deprecated IressText.Align is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Align: typeof TextAlign;

  /** @deprecated IressText.Variant is now deprecated and will be removed in a future version. Please use the value directly instead. */
  Variant: typeof TextVariant;
}

import { type PaddingSizes } from '@/main';
import { type HeadingLevel, type PaddingSize } from '@/enums';
import {
  type IressButtonHTMLAttributes,
  type IressHTMLAttributes,
  type WithDataAttributes,
} from '@/interfaces';

export interface IressCardSlotsProps extends WithDataAttributes {
  /**
   * Main body of the card
   */
  children?: React.ReactNode;

  /**
   * Section that sticks to the bottom of the card
   */
  footer?: React.ReactNode;

  /**
   * Heading slot. Often used for a title or description.
   */
  heading?: React.ReactNode;

  /**
   * Text to be displayed in the card heading in the card header.
   * @deprecated Use `heading` instead.
   **/
  headingText?: string;

  /**
   * Level of heading for markup, to ensure correct hierarchy (H2 - H6).
   * @default h2
   * @deprecated Use `heading` instead.
   **/
  headingLevel?: HeadingLevel;

  /**
   * Section (often for an image, table or chart) that appears before the heading
   */
  media?: React.ReactNode;

  /**
   * Slot to the left of card content.
   */
  prepend?: React.ReactNode;

  /**
   * Slot positioned to the top right of the card, often used for an icon or action menu
   */
  topRight?: React.ReactNode;
}

export interface IressCardWrapperProps<T = HTMLDivElement>
  extends IressHTMLAttributes<T> {
  /**
   * Sets whether the card is clickable.
   */
  clickable?: boolean;

  /**
   * Sets the amount of padding for card. Inherits values from IressPanel
   */
  padding?: PaddingSize | PaddingSizes;

  /**
   * When set to true, card appears selected.
   */
  selected?: boolean;

  /**
   * When set to true, Card stretches to fill available height
   */
  stretch?: boolean;
}

export interface IressCardProps<T = HTMLDivElement>
  extends Omit<IressCardWrapperProps<T>, 'clickable'>,
    IressCardSlotsProps {
  /**
   * When set, the card will be clickable and will apply the selected style
   */
  onClick?: React.MouseEventHandler<T>;
}

export interface IressButtonCardProps
  extends IressCardProps<HTMLButtonElement>,
    React.DetailedHTMLProps<IressButtonHTMLAttributes, HTMLButtonElement> {}

export interface IressLinkCardProps
  extends IressCardProps<HTMLAnchorElement>,
    Omit<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      'media'
    > {}

export interface CardWithEnums extends React.FC<IressCardProps> {
  /** @deprecated IressCard.HeadingLevel enum is now deprecated and will be removed in a future version. Please use the HeadingLevels type instead. */
  HeadingLevel: typeof HeadingLevel;

  /** @deprecated IressCard.Padding enum is now deprecated and will be removed in a future version. Please use the PaddingSizes type instead. */
  Padding: typeof PaddingSize;
}

export enum CardCssClass {
  Base = 'iress-u-card',
  Padding = 'iress--padding',
  Clickable = 'iress--clickable',
  Selected = 'iress--selected',
  Stretch = 'iress--stretch',
}

export enum CardSlotClass {
  Prepend = 'iress-u-card__prepend',
  Heading = 'iress-u-card__heading',
  TopRight = 'iress-u-card__top-right',
  Media = 'iress-u-card__media',
  Children = 'iress-u-card__body',
  Footer = 'iress-u-card__footer',
}

export type CardCssModule = Partial<Record<keyof typeof CardCssClass, string>>;
export type CardCssSlotModule = Partial<
  Record<keyof typeof CardSlotClass, string>
>;

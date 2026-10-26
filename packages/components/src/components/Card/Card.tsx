import { splitCssProps } from '@/styled-system/jsx';
import { card } from './Card.styles';
import { css, cx } from '@/styled-system/css';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  useMemo,
  type ReactNode,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';
import { GlobalCSSClass } from '@/enums';
import { type IressCSSProps, type IressTestProps } from '@/interfaces';
import { IressText } from '../Text';

export interface InternalCardProps<E extends ElementType = 'div'>
  extends IressCSSProps, IressTestProps {
  /**
   * Main body of the card
   */
  children?: ReactNode;

  /**
   * Element type to render the Card as.
   */
  element?: E;

  /**
   * Section that sticks to the bottom of the card
   */
  footer?: ReactNode;

  /**
   * Heading slot. Often used for a title or description.
   */
  heading?: ReactNode;

  /**
   * Section (often for an image, table or chart) that appears before the heading
   */
  media?: ReactNode;

  /**
   * When set to true, the card will not have a border. This is useful to de-prioritise a card within another bordered container, such as a card within a sidebar.
   */
  noBorder?: boolean;

  /**
   * Slot to the left of card content.
   */
  prepend?: ReactNode;

  /**
   * When set to true, card appears selected.
   */
  selected?: boolean;

  /**
   * Slot positioned to the top right of the card, often used for an icon or action menu
   */
  topRight?: ReactNode;
}

type ElementProps<E extends ElementType = 'div'> = Omit<
  ComponentPropsWithoutRef<E>,
  keyof InternalCardProps<E>
>;

export type IressCardProps<E extends ElementType = 'div'> = ElementProps<E> &
  InternalCardProps<E>;

// Maintain backward compatibility with existing type definitions
export type IressButtonCardProps = IressCardProps<'button'>;
export type IressLinkCardProps = IressCardProps<'a'>;

/**
 * Groups related content and actions into a contained, visually distinct surface.
 *
 * @example
 * ```tsx
 * import { IressCard } from '@iress-oss/ids-components';
 *
 * <IressCard heading="Title">Card content goes here.</IressCard>
 * ```
 */
export const IressCard = <E extends ElementType = 'div'>({
  element,
  className,
  selected,
  children,
  footer,
  heading,
  media,
  noBorder,
  prepend,
  topRight,
  ...restProps
}: IressCardProps<E>) => {
  const headerElement =
    typeof heading === 'string' ? <h2>{heading}</h2> : heading;
  const hasPrepend = !!prepend;
  const hasSlots = !!(prepend ?? topRight ?? media ?? headerElement ?? footer);
  const hasHeading = !!headerElement;
  const hasMedia = !!media;
  const isInteractiveElement = element == 'button' || element == 'a';
  const clickable = isInteractiveElement || !!restProps.onClick;
  const [styleProps, nonStyleProps] = splitCssProps(restProps);
  const { stretch, ...otherStyleProps } = styleProps;

  const styles = card.raw({
    clickable,
    // Convert the element to a string for compatibility with the card.raw function
    element: String(element) as never,
    selected,
    stretch: !!stretch,
    hasSlots,
    hasHeading,
    hasMedia,
    hasPrepend,
    noBorder,
  });

  const testId = nonStyleProps['data-testid'];

  const StyledElement = useMemo(() => element ?? IressText, [element]);

  return (
    <StyledElement
      {...nonStyleProps}
      className={cx(
        css(styles.root, otherStyleProps),
        className,
        GlobalCSSClass.Card,
      )}
    >
      {hasSlots ? (
        <>
          {prepend && (
            <div
              className={css(styles.prepend, {
                p: otherStyleProps.p,
              })}
              data-testid={propagateTestid(testId, 'prepend')}
            >
              {prepend}
            </div>
          )}
          {topRight && (
            <div
              className={css(styles.topRight)}
              data-testid={propagateTestid(testId, 'topRight')}
            >
              {topRight}
            </div>
          )}
          {media && (
            <div
              className={css(styles.media)}
              data-testid={propagateTestid(testId, 'media')}
            >
              {media}
            </div>
          )}
          {headerElement && (
            <div
              className={css(styles.heading, {
                p: otherStyleProps.p,
              })}
              data-testid={propagateTestid(testId, 'heading')}
            >
              {headerElement}
            </div>
          )}
          {children && (
            <div
              className={css(styles.body, {
                p: otherStyleProps.p,
              })}
              data-testid={propagateTestid(testId, 'body')}
            >
              {children}
            </div>
          )}
          {footer && (
            <div
              className={css(styles.footer, {
                p: otherStyleProps.p,
              })}
              data-testid={propagateTestid(testId, 'footer')}
            >
              {footer}
            </div>
          )}
        </>
      ) : (
        children
      )}
    </StyledElement>
  );
};

IressCard.displayName = 'IressCard';

/**
 * A card rendered as a button element, making the entire card clickable.
 *
 * @example
 * ```tsx
 * import { IressButtonCard } from '@iress-oss/ids-components';
 *
 * <IressButtonCard heading="Settings" onClick={handleClick}>
 *   Card content
 * </IressButtonCard>
 * ```
 */
export const IressButtonCard = (props: IressButtonCardProps) => {
  const { type = 'button', ...restProps } = props;
  return <IressCard element="button" type={type} {...restProps} />;
};

IressButtonCard.displayName = 'IressButtonCard';

/**
 * A card rendered as an anchor element, making the entire card a navigable link.
 *
 * @example
 * ```tsx
 * import { IressLinkCard } from '@iress-oss/ids-components';
 *
 * <IressLinkCard heading="Documentation" href="/docs">
 *   Card content
 * </IressLinkCard>
 * ```
 */
export const IressLinkCard = (props: IressLinkCardProps) => {
  return <IressCard element="a" {...props} />;
};

IressLinkCard.displayName = 'IressLinkCard';

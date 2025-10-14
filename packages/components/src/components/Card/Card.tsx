import { splitCssProps } from '@/styled-system/jsx';
import { card } from './Card.styles';
import { css, cx } from '@/styled-system/css';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  useMemo,
  ReactNode,
  ElementType,
  ComponentPropsWithoutRef,
} from 'react';
import { GlobalCSSClass } from '@/enums';
import { IressCSSProps, IressTestProps } from '@/interfaces';

export interface InternalCardProps<E extends ElementType = 'div'>
  extends IressCSSProps,
    IressTestProps {
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

export const IressCard = <E extends ElementType = 'div'>({
  element,
  className,
  selected,
  stretch,
  children,
  footer,
  heading,
  media,
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

  const styles = card.raw({
    clickable,
    // Convert the element to a string for compatibility with the card.raw function
    element: String(element) as never,
    selected,
    stretch,
    hasSlots,
    hasHeading,
    hasMedia,
    hasPrepend,
  });

  const testId = restProps['data-testid'];
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const StyledElement = useMemo(() => element ?? 'div', [element]);

  return (
    <StyledElement
      {...nonStyleProps}
      className={cx(
        css(styles.root, styleProps),
        className,
        GlobalCSSClass.Card,
      )}
    >
      {hasSlots ? (
        <>
          {prepend && (
            <div
              className={css(styles.prepend)}
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
              className={css(styles.heading)}
              data-testid={propagateTestid(testId, 'heading')}
            >
              {headerElement}
            </div>
          )}
          {children && (
            <div
              className={css(styles.body)}
              data-testid={propagateTestid(testId, 'body')}
            >
              {children}
            </div>
          )}
          {footer && (
            <div
              className={css(styles.footer)}
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
export const IressButtonCard = (props: IressButtonCardProps) => {
  const { type = 'button', ...restProps } = props;
  return <IressCard element="button" type={type} {...restProps} />;
};

export const IressLinkCard = (props: IressLinkCardProps) => {
  return <IressCard element="a" {...props} />;
};

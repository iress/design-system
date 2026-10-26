import {
  type ElementType,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { type ButtonRef, IressButton, type IressButtonProps } from '../Button';
import { cx } from '@/styled-system/css';
import { skipLink } from './SkipLink.styles';
import { GlobalCSSClass } from '@/enums';

const skipLinkClass = skipLink();

export type IressSkipLinkProps<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> = IressButtonProps<C, THref> & {
  /**
   * Description of where the skip link jumps to.
   * @default 'Skip to content'
   */
  children?: ReactNode;

  /**
   * Contains a URL or a URL fragment that the skip link points to.
   * If this property is set, an anchor tag will be rendered.
   */
  href?: THref;
};

const SkipLink = <
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>(
  {
    children = 'Skip to content',
    className,
    ...restProps
  }: IressSkipLinkProps<C, THref>,
  ref: Ref<ButtonRef<C, THref>>,
) => (
  <IressButton
    {...(restProps as IressButtonProps<C, THref>)}
    className={cx(className, skipLinkClass, GlobalCSSClass.SkipLink)}
    ref={ref}
  >
    {children}
  </IressButton>
);

/**
 * Provides a keyboard-accessible link to skip to the main content area.
 *
 * @example
 * ```tsx
 * import { IressSkipLink } from '@iress-oss/ids-components';
 *
 * <IressSkipLink href="#main">Skip to content</IressSkipLink>
 * ```
 */
export const IressSkipLink = forwardRef(SkipLink) as (<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>(
  props: IressSkipLinkProps<C, THref> & {
    ref?: ButtonRef<C, THref>;
  },
) => ReactElement) & {
  displayName: 'IressSkipLink';
};

IressSkipLink.displayName = 'IressSkipLink';

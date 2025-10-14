import {
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
  forwardRef,
  useId,
  useMemo,
  type ElementType,
  type ComponentPropsWithoutRef,
  useCallback,
  type MouseEventHandler,
} from 'react';
import { IressSpinner } from '../Spinner';
import { splitCssProps } from '@/styled-system/jsx';
import { css, cx } from '@/styled-system/css';
import { link } from './Link.styles';
import {
  type ButtonElement,
  type ButtonInstance,
  type ButtonRef,
  type ButtonRenderProps,
} from '../Button';
import { type IressCSSProps, type IressTestProps } from '@/interfaces';
import { GlobalCSSClass } from '@/enums';

export type IressLinkProps<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> = IressCSSProps &
  IressTestProps &
  Omit<ComponentPropsWithoutRef<ButtonElement<C, THref>>, 'element'> & {
    /**
     * Sets the active state of the link, usually used to indicate the link has activated a modal, popover or slideout.
     */
    active?: boolean;

    /**
     * Content for the append slot.
     */
    append?: ReactNode;

    /**
     * Content is placed between prepend and append if provided. Used to describe the expected intention of this link.
     */
    children?: ReactNode;

    /**
     * Change the component that will be rendered as the link, used for third-party libraries that require a specific element type.
     * By default, it will render a button or an anchor tag based on the `href` prop.
     */
    element?: C;

    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href?: THref;

    /**
     * When true, button is in loading state. If provided a string, will be used as the loading text for screen readers.
     */
    loading?: boolean | string;

    /**
     * Emitted when the menu item is clicked.
     */
    onClick?: MouseEventHandler<ButtonInstance<C, THref>>;

    /**
     * Content for the prepend slot.
     */
    prepend?: ReactNode;
  };

const Link = <
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>(
  {
    active,
    append,
    children,
    className,
    element,
    loading = false,
    onClick,
    prepend,
    ...restProps
  }: IressLinkProps<C, THref>,
  ref: Ref<ButtonRef<C, THref>>,
) => {
  const spinnerId = useId();

  const styles = link.raw({
    active,
    loading: !!loading,
  });

  const [styleProps, nonStyleProps] = useMemo(
    () => splitCssProps(restProps),
    [restProps],
  );

  const handleClick = useCallback(
    (e: MouseEvent<ButtonInstance<C, THref>>) => {
      if (loading) return;
      onClick?.(e);
    },
    [loading, onClick],
  );

  const renderProps = useMemo<ButtonRenderProps<C, THref>>(
    () => ({
      children: (
        <>
          {prepend && !loading && (
            <span className={css(styles.prepend)}>{prepend}</span>
          )}
          {!!loading && (
            <IressSpinner
              className={css(styles.spinner)}
              fixedWidth
              id={spinnerId}
              screenreaderText={loading === true ? 'Loading' : loading}
            />
          )}
          {children && <span className={css(styles.content)}>{children}</span>}
          {append && <span className={css(styles.append)}>{append}</span>}
        </>
      ),
      className: cx(
        className,
        css(styles.root, styleProps),
        GlobalCSSClass.Group,
        GlobalCSSClass.Link,
      ),
      onClick: handleClick,
    }),
    [
      append,
      children,
      className,
      handleClick,
      loading,
      prepend,
      spinnerId,
      styleProps,
      styles.append,
      styles.content,
      styles.prepend,
      styles.root,
      styles.spinner,
    ],
  );

  const Component = useMemo(
    () => element ?? (nonStyleProps.href ? 'a' : 'button'),
    [element, nonStyleProps.href],
  );

  return (
    <Component
      aria-describedby={loading ? spinnerId : undefined}
      type={element || !nonStyleProps.href ? 'button' : undefined}
      {...renderProps}
      {...nonStyleProps}
      ref={ref}
    />
  );
};

export const IressLink = forwardRef(Link) as <
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>(
  props: IressLinkProps<C, THref> & {
    ref?: ButtonRef<C, THref>;
  },
) => ReactElement;

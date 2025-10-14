import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { IressSpinner } from '../Spinner';
import { GlobalCSSClass } from '@/enums';
import { Breakpoints } from '@/types';
import { ButtonGroupItemProps, useButtonGroupItem } from '../ButtonGroup';
import { splitCssProps } from '@/styled-system/jsx';
import { css, cx } from '@/styled-system/css';
import { button } from '@/styled-system/recipes';
import { PopoverContext } from '../Popover/hooks/usePopover';
import { IressCSSProps, IressTestProps } from '@/interfaces';

export type ButtonElement<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> = C extends ElementType ? C : THref extends string ? 'a' : 'button';
export type ButtonRef<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> = ComponentPropsWithRef<ButtonElement<C, THref>>['ref'];
export type ButtonInstance<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> = Exclude<Parameters<Exclude<ButtonRef<C, THref>, undefined>>[0], null>;

export interface ButtonRenderProps<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> {
  /**
   * Used to describe the expected action of this button.
   */
  children?: ReactNode;

  /**
   * The classes to be applied to the button.
   */
  className?: string;

  /**
   * Handles the selection of the menu item.
   */
  onClick?: MouseEventHandler<ButtonInstance<C, THref>>;
}

export interface InternalButtonProps<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> extends IressCSSProps,
    IressTestProps,
    ButtonGroupItemProps {
  /**
   * Sets the active state of the button, usually used to indicate the button has activated a modal, popover or slideout.
   */
  active?: boolean;

  /**
   * Content for the append slot.
   */
  append?: ReactNode;

  /**
   * Content is placed between prepend and append if provided. Used to describe the expected action of this button.
   */
  children?: ReactNode;

  /**
   * Change the component that will be rendered as the button, used for third-party libraries that require a specific element type.
   * By default, it will render a button or an anchor tag based on the `href` prop.
   */
  element?: C;

  /**
   * If `true`, the button will stretch to fill it's container. The prop is responsive, so you can set the breakpoint(s) at which the button will be fluid.
   *
   * All breakpoints: `fluid={true}`
   * Up to a specific breakpoint: `fluid={{ base: true, md: false }}`
   */
  fluid?: true | Breakpoints;

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
   * Style of the button.
   * - Primary: Used for the main action on a page. Usually only used once per screen.
   * - Secondary: Used for secondary actions on a page, often an action on multiple `IressPanel`s. Can used multiple times per screen.
   * - Tertiary: Used for tertiary actions on a page, often the secondary action on multiple `IressPanel`s. Can used multiple times per screen.
   *
   * **Migrating to version 6**
   * - `link` mode has been removed. If it is an action, use the `tertiary` mode. If it is a link inside a paragraph, use the new `IressLink` component instead.
   * - `danger` has been removed. Please use the `status` prop instead.
   * - `positive` and `success` have been removed. Please use the `status` prop instead.
   */
  mode?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Emitted when the menu item is clicked.
   */
  onClick?: MouseEventHandler<ButtonInstance<C, THref>>;

  /**
   * Content for the prepend slot.
   */
  prepend?: ReactNode;

  /**
   * Prevents text wrapping if set to true.
   */
  noWrap?: boolean;

  /**
   * An optional status to assign to the button.
   * - `success`: Indicates a successful or positive action.
   * - `danger`: Indicates a dangerous or potentially negative action.
   */
  status?: 'success' | 'danger';
}

export type IressButtonProps<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> = Omit<
  ComponentPropsWithoutRef<ButtonElement<C, THref>>,
  keyof InternalButtonProps<C, THref>
> &
  InternalButtonProps<C, THref>;

const Button = <
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>(
  {
    active,
    append,
    children,
    className,
    element,
    fluid,
    loading = false,
    mode = 'secondary',
    prepend,
    noWrap = false,
    onClick,
    status,
    value: valueProp,
    ...restProps
  }: IressButtonProps<C, THref>,
  ref: Ref<ButtonRef<C, THref>>,
) => {
  const spinnerId = useId();
  const value =
    valueProp ??
    (typeof children === 'string' ||
    typeof children === 'number' ||
    typeof children === 'boolean'
      ? children
      : undefined);
  const popover = useContext(PopoverContext);
  const elementRef = useRef<ButtonInstance<C, THref> | null>(null);
  const buttonGroupItem = useButtonGroupItem({ value });

  const buttonMode = useMemo(() => {
    if (!buttonGroupItem) return mode;
    return buttonGroupItem.active ? 'primary' : 'tertiary';
  }, [buttonGroupItem, mode]);

  const styles = button({
    active:
      active ?? popover?.isActiveActivator(elementRef.current as HTMLElement),
    fluid: fluid === true ? 'true' : fluid,
    inButtonGroup: !!buttonGroupItem,
    mode: buttonMode,
    loading: !!loading,
    noWrap,
    status,
  });

  const [styleProps, nonStyleProps] = useMemo(
    () => splitCssProps(restProps),
    [restProps],
  );

  const handleClick = useCallback(
    (e: MouseEvent<ButtonInstance<C, THref>>) => {
      if (loading) return;
      onClick?.(e);
      buttonGroupItem?.toggle();
    },
    [buttonGroupItem, loading, onClick],
  );

  const renderProps = useMemo<ButtonRenderProps<C, THref>>(
    () => ({
      children: (
        <>
          {prepend && !loading && (
            <span className={styles.prepend}>{prepend}</span>
          )}
          {!!loading && (
            <IressSpinner
              className={styles.spinner}
              fixedWidth
              id={spinnerId}
              screenreaderText={loading === true ? 'Loading' : loading}
            />
          )}
          {children}
          {append && <span className={styles.append}>{append}</span>}
        </>
      ),
      className: cx(
        className,
        GlobalCSSClass.FormElement,
        GlobalCSSClass.FormElementInner,
        styles.root,
        css(styleProps),
        GlobalCSSClass.Button,
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
      styles.prepend,
      styles.root,
      styles.spinner,
    ],
  );

  useImperativeHandle(ref, () => elementRef.current!);

  const Component = useMemo(
    () => element ?? (nonStyleProps.href ? 'a' : 'button'),
    [element, nonStyleProps.href],
  );

  return (
    <Component
      aria-describedby={loading ? spinnerId : undefined}
      type={element || !nonStyleProps.href ? 'button' : undefined}
      {...renderProps}
      {...buttonGroupItem?.props}
      {...nonStyleProps}
      ref={elementRef}
    />
  );
};

export const IressButton = forwardRef(Button) as <
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>(
  props: IressButtonProps<C, THref> & {
    ref?: ButtonRef<C, THref>;
  },
) => ReactElement;

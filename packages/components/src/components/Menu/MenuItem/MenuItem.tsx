import {
  forwardRef,
  type Ref,
  useContext,
  type ReactNode,
  type MouseEventHandler,
  type KeyboardEventHandler,
  type MouseEvent,
  type KeyboardEvent,
  useMemo,
  type HTMLAttributes,
  type ReactElement,
  useCallback,
  type FocusEventHandler,
  type FocusEvent,
  cloneElement,
  useRef,
  useImperativeHandle,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';
import { useMenuItemRole } from './hooks/useMenuItemRole';
import {
  type ButtonElement,
  type ButtonInstance,
  type ButtonRef,
} from '../../Button';
import { idsLogger } from '@helpers/utility/idsLogger';
import { type FormControlValue } from '@/types';
import { MenuContext } from '../Menu';
import { IressCheckboxMark } from '@/components/CheckboxMark';
import { propagateTestid } from '@/helpers/utility/propagateTestid';
import { css, cx } from '@/styled-system/css';
import { splitCssProps } from '@/styled-system/jsx';
import { menu as menuStyles } from '../Menu.styles';
import {
  type PopoverItemHookReturn,
  type PopoverVirtualNode,
  usePopoverItem,
} from '@/components/Popover';
import { CompositeItem } from '@floating-ui/react';
import { IressMenuDivider } from '../MenuDivider/MenuDivider';
import { type IressCSSProps, type IressTestProps } from '@/interfaces';
import { PopoverContext } from '@/components/Popover/hooks/usePopover';
import { GlobalCSSClass } from '@/enums';
import { spreadUnlessUndefined } from '@/helpers/utility/spreadUnlessUndefined';

export interface MenuItemRenderProps<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> extends Pick<Partial<PopoverItemHookReturn>, 'id' | 'ref' | 'tabIndex'> {
  /**
   * If the item is inside a menu with the role of `listbox` and is selected, this will be set to `true`.
   */
  'aria-current'?: HTMLAttributes<ButtonRef<C, THref>>['aria-current'];

  /**
   * If the item is inside a menu with the role of `menu` or `listbox` and is selected, this will be set to `true`.
   */
  'aria-selected'?: HTMLAttributes<ButtonRef<C, THref>>['aria-selected'];

  /**
   * The children to be rendered inside the menu item.
   */
  children?: ReactNode;

  /**
   * The classes to be applied to the menu item, styled appropriately based on the menu it is inside.
   */
  className?: string;

  /**
   * Handles the selection of the menu item.
   */
  onClick?: MouseEventHandler<ButtonInstance<C, THref>>;

  /**
   * Handles the selection of the menu item via keyboard.
   */
  onKeyDown?: KeyboardEventHandler<ButtonInstance<C, THref>>;

  /**
   * The role of the menu item based on the menu it is inside.
   */
  role?: HTMLAttributes<ButtonInstance<C, THref>>['role'];
}

export type IressMenuItemProps<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> = IressCSSProps &
  IressTestProps &
  Omit<
    ComponentPropsWithoutRef<ButtonElement<C, THref>>,
    'element' | 'value'
  > & {
    /**
     * Section after menu item content.
     */
    append?: ReactNode;

    /**
     * When true, the item can be toggled even in single-select mode.
     */
    canToggle?: boolean;

    /**
     * The children to be rendered inside the menu item, describing the action.
     */
    children?: ReactNode;

    /**
     * The class name to be applied to the menu item.
     */
    className?: string;

    /**
     * Adds a divider after any content.
     * If you would like to add content before the menu item, use a `<hr />` instead.
     */
    divider?: boolean;

    /**
     * Change the component that will be rendered as the menu item, used for third-party libraries that require a specific element type.
     * By default, it will render a button or an anchor tag based on the `href` prop.
     */
    element?: C;

    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set and no `element` was set, an anchor tag will be rendered. Otherwise, a button will be rendered.
     */
    href?: THref;

    /**
     * Emitted when the menu item is blurred.
     */
    onBlur?: FocusEventHandler<ButtonInstance<C, THref>>;

    /**
     * Emitted when the menu item is clicked.
     */
    onClick?: MouseEventHandler<ButtonInstance<C, THref>>;

    /**
     * Emitted when a key is pressed while focused on the menu item.
     */
    onKeyDown?: KeyboardEventHandler<ButtonInstance<C, THref>>;

    /**
     * When true, button is in loading state. If provided a string, will be used as the loading text for screen readers.
     */
    loading?: boolean | string;

    /**
     * Section before menu item content.
     */
    prepend?: ReactNode;

    /**
     * When true, shows the item in selected state.
     */
    selected?: boolean;

    /**
     * To be used when menu type is listbox.
     */
    value?: FormControlValue;
  };

const MenuItem = <
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>(
  {
    append,
    canToggle,
    children,
    className,
    'data-testid': dataTestId,
    divider,
    element,
    onBlur,
    onClick,
    onKeyDown,
    prepend: prependProp,
    selected: selectedProp,
    value,
    ...restProps
  }: IressMenuItemProps<C, THref>,
  ref: Ref<ButtonRef<C, THref>>,
) => {
  const menu = useContext(MenuContext);
  const popover = useContext(PopoverContext);
  const role = useMenuItemRole();
  const elementRef = useRef<ButtonInstance<C, THref> | null>(null);

  const selected = useMemo(() => {
    if (menu?.supportsSelection && selectedProp) {
      idsLogger(
        `IressMenuItem: The selected prop on IressMenuItem does not work when used inside an IressMenu with role=listbox or the multiSelect prop set to true. Use the selected prop on IressMenu instead.`,
      );
    }

    return menu?.supportsSelection ? menu.isSelected(value) : selectedProp;
  }, [menu, selectedProp, value]);

  const ariaProps = useMemo<
    Pick<HTMLAttributes<HTMLElement>, 'aria-current' | 'aria-selected'>
  >(
    () => ({
      'aria-current': menu?.supportsSelection ? undefined : selected,
      'aria-selected': menu?.supportsSelection ? selected : undefined,
    }),
    [menu?.supportsSelection, selected],
  );

  const handleClick = useCallback(
    (e: MouseEvent<ButtonRef<C, THref>>) => {
      onClick?.(e);

      if (e.defaultPrevented) {
        return;
      }

      if (menu?.supportsSelection) {
        menu.toggle(value, canToggle || menu?.multiSelect ? !selected : true);
      }

      if (menu?.hasArrowKeyNav && !menu?.multiSelect) {
        popover?.setShow?.(false);
        popover?.getFocusableActivator?.()?.focus();
        popover?.resetActiveIndex();
      }
    },
    [canToggle, menu, onClick, popover, selected, value],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<ButtonRef<C, THref>>) => {
      onKeyDown?.(e);

      if (e.defaultPrevented) {
        return;
      }

      if (e.key === 'Tab' && menu?.supportsSelection && menu?.changeOnBlur) {
        menu?.toggle(value, true);
      }
    },
    [menu, onKeyDown, value],
  );

  const popoverVirtualNode = useMemo<
    PopoverVirtualNode<HTMLElementTagNameMap[ButtonElement<undefined, THref>]>
  >(
    () => ({
      onBlur: (e) => {
        // Create a blur event to be virtualised.
        const blurEvent = new Event('blur', {
          bubbles: true,
        }) as unknown as FocusEvent<ButtonInstance<C, THref>>;

        Object.defineProperty(blurEvent, 'target', {
          writable: false,
          value: { value: '', ...e.target },
        });

        Object.defineProperty(blurEvent, 'relatedTarget', {
          writable: false,
          value: { value: '', ...e.target },
        });

        onBlur?.(blurEvent);

        if (blurEvent.defaultPrevented) {
          return;
        }

        if (!menu?.supportsSelection) return;

        if (menu?.changeOnBlur) {
          menu?.toggle(value, true);
        }
      },
      onKeyDown: (e) => {
        if (e.key === 'Enter') {
          // Create a click event to be virtualised.
          const clickEvent = new Event('click', {
            bubbles: true,
          }) as unknown as MouseEvent<ButtonInstance<C, THref>>;

          Object.defineProperty(clickEvent, 'target', {
            writable: false,
            value: { value: '', ...e.target },
          });

          onClick?.(clickEvent);

          if (clickEvent.defaultPrevented) {
            return;
          }

          e.preventDefault();

          menu?.toggle(
            value,
            canToggle || menu?.multiSelect ? !selected : true,
          );
        }

        onKeyDown?.(e as KeyboardEvent<ButtonInstance<C, THref>>);
      },
    }),
    [canToggle, menu, onBlur, onClick, onKeyDown, selected, value],
  );

  const { isActiveInPopover, ...popoverItem } = usePopoverItem(
    undefined,
    popoverVirtualNode,
  );

  const classes = useMemo(
    () =>
      menuStyles({
        hasAppendOrPrepend: !!(append ?? prependProp ?? menu?.multiSelect),
        isActiveInPopover,
        layout: menu?.layout,
        multiSelect: !!menu?.multiSelect,
        noWrap: menu?.noWrap,
        selected,
      }),
    [
      append,
      isActiveInPopover,
      menu?.layout,
      menu?.multiSelect,
      menu?.noWrap,
      prependProp,
      selected,
    ],
  );

  const prepend = useMemo(() => {
    if (menu?.multiSelect) {
      return (
        <IressCheckboxMark
          checked={selected}
          className={classes.checkboxMark}
          data-testid={propagateTestid(dataTestId, 'checkbox-mark')}
        />
      );
    }
    return prependProp;
  }, [
    classes.checkboxMark,
    dataTestId,
    menu?.multiSelect,
    prependProp,
    selected,
  ]);

  const [styleProps, nonStyleProps] = useMemo(
    () => splitCssProps(restProps),
    [restProps],
  );

  const renderProps = useMemo<MenuItemRenderProps<C, THref>>(
    () => ({
      ...ariaProps,
      children: (
        <>
          {prepend}
          {children && <span className={classes.contents}>{children}</span>}
          {append && <span className={classes.append}>{append}</span>}
        </>
      ),
      className: cx(
        className,
        classes.item,
        css(styleProps),
        GlobalCSSClass.MenuItem,
      ),
      'data-testid': dataTestId,
      id: popoverItem.id,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ref: (element) => {
        if (!menu?.isComposite) {
          popoverItem.ref?.(element);
        }

        if (element) {
          elementRef.current = element as ButtonInstance<C, THref>;
        }
      },
      role: role === 'listitem' ? undefined : role,
      tabIndex: menu?.hasArrowKeyNav ? popoverItem.tabIndex : undefined,
    }),
    [
      append,
      ariaProps,
      children,
      className,
      classes.append,
      classes.contents,
      classes.item,
      dataTestId,
      handleClick,
      handleKeyDown,
      menu?.hasArrowKeyNav,
      menu?.isComposite,
      popoverItem,
      prepend,
      role,
      styleProps,
    ],
  );

  const rendered = useMemo(() => {
    const Component = element ?? (nonStyleProps.href ? 'a' : 'button');
    const buttonProps = Component === 'button' ? { type: 'button' } : {};
    return (
      <Component
        // eslint-disable-next-line react-hooks/refs -- we are forwarding the ref
        {...spreadUnlessUndefined(renderProps, nonStyleProps as object)}
        {...buttonProps}
      />
    );
  }, [element, nonStyleProps, renderProps]);

  useImperativeHandle(ref, () => elementRef.current!);

  const node = useMemo(() => {
    if (role === 'listitem') {
      return <span role="listitem">{rendered}</span>;
    }

    return rendered;
  }, [rendered, role]);

  return (
    <>
      {menu?.isComposite ? (
        <CompositeItem render={(htmlProps) => cloneElement(node, htmlProps)} />
      ) : (
        node
      )}
      {divider && <IressMenuDivider mt="spacing.100" />}
    </>
  );
};

export const IressMenuItem = forwardRef(MenuItem) as <
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>(
  props: IressMenuItemProps<C, THref> & {
    ref?: ButtonRef<C, THref>;
  },
) => ReactElement;

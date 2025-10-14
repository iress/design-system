import {
  type Context,
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  type ControlledValue,
  useControlledState,
  useIdIfNeeded,
} from '../../hooks';
import { Composite } from '@floating-ui/react';
import { type FormControlValue, type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { toArray } from '@/helpers/formatting/toArray';
import { menu } from './Menu.styles';
import { cx } from '@/styled-system/css';
import { PopoverContext } from '../Popover/hooks/usePopover';
import { GlobalCSSClass } from '@/enums';

export interface IressMenuProps<
  T = FormControlValue,
  TMultiple extends boolean = false,
> extends Omit<IressStyledProps, 'defaultValue' | 'onChange' | 'value'> {
  /**
   * If set to true, change event will be fired with the correctly selected value.
   */
  changeOnBlur?: boolean;

  /**
   * Content of the menu, usually multiple `IressMenuItem`, `IressMenuHeading`, `IressMenuText` or `IressMenuDivider`.
   */
  children?: ReactNode;

  /**
   * Initially selected values of menu when `role` is listbox.
   * Used for uncontrolled menus.
   */
  defaultSelected?: ControlledValue<T, TMultiple>;

  /**
   * If set to true, menu will fill the width of its container.
   */
  fluid?: boolean;

  /**
   * Unique ID of the menu. If not provided, will be automatically generated.
   * Used to add aria attributes for accessibility.
   */
  id?: string;

  /**
   * Sets whether the layout is vertical (stack) or horizontal (inline/inline-equal-width).
   * @default stack
   */
  layout?: 'stack' | 'inline' | 'inline-equal-width';

  /**
   * If set to true, menu items will contain checkboxes.
   */
  multiSelect?: TMultiple;

  /**
   * If set to true, menu items will not wrap onto a separate line when space is exceeded.
   */
  noWrap?: boolean;

  /**
   * Emitted when the menu value changes
   */
  onChange?: (value?: ControlledValue<T, TMultiple> | null) => void;

  /**
   * Selected values of menu when `role` is listbox.
   * Used for controlled menus.
   */
  selected?: ControlledValue<T, TMultiple>;

  /**
   * Type of menu, corresponding to [aria-roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
   * Will be set automatically when used inside popover or when the `multiSelect` prop is set to true.
   */
  role?: 'menu' | 'list' | 'listbox';
}

export interface MenuContextValue<
  T = FormControlValue,
  TMultiple extends boolean = false,
> {
  /**
   * Whether the menu should change the selected value on blur.
   * This is used by components such as `IressMenuItem` to determine if it should change the selected value on blur.
   */
  changeOnBlur?: boolean;

  /**
   * Whether the menu supports arrow key navigation.
   * This is used by components such as `IressMenuItem` to determine if it should react to arrow key navigation.
   */
  hasArrowKeyNav?: boolean;

  /**
   * Whether the menu is considered composite by Floating UI.
   * This is used by components such as `IressMenuItem` to determine whether it needs to be wrapped in a CompositeItem component.
   */
  isComposite: boolean;

  /**
   * Checks if the provided value is selected in the menu.
   * This is used by components such as `IressMenuItem` to determine if it should be displayed as selected.
   */
  isSelected: (value?: T) => boolean;

  /**
   * Layout of the menu.
   * This is used by components such as `IressMenuDivider` to determine how to display itself inside certain layouts.
   */
  layout: IressMenuProps<T, TMultiple>['layout'];

  /**
   * Whether the menu supports multiple selection.
   * This is used by components such as `IressMenuItem` to determine if it should display a checkbox.
   */
  multiSelect?: boolean;

  /**
   * Whether the menu items should not wrap onto a separate line when space is exceeded.
   * This is used by components such as `IressMenuItem` to avoid wrapping.
   */
  noWrap?: boolean;

  /**
   * The role of the menu. This is used by components such as `IressMenuItem` to determine which role to use.
   * - `menu` means that sub-items should be `menuitem`
   * - `list` means that sub-items should be `listitem`
   * - `listbox` means that sub-items should be `option`
   */
  role?: IressMenuProps<T, TMultiple>['role'];

  /**
   * Whether the menu supports selection.
   * This is used by components such as `IressMenuItem` to determine how it should behave.
   */
  supportsSelection: boolean;

  /**
   * Toggles the selected value of the menu.
   * This is used by components such as `IressMenuItem` to change the selected value.
   */
  toggle: (value?: T, flag?: boolean) => void;
}

function createMenuContext<
  T = FormControlValue,
  TMultiple extends boolean = false,
>() {
  return createContext<MenuContextValue<T, TMultiple> | undefined>(undefined);
}

// TODO: Is there a way to do this without casting?
function getMenuContext<
  T = FormControlValue,
  TMultiple extends boolean = false,
>() {
  return MenuContext as unknown as Context<MenuContextValue<T, TMultiple>>;
}

export const MenuContext = createMenuContext();

export const IressMenu = <
  T = FormControlValue,
  TMultiple extends boolean = false,
>({
  changeOnBlur,
  className,
  defaultSelected,
  fluid,
  id: idProp,
  layout = 'stack',
  multiSelect,
  noWrap,
  onChange,
  role: roleProp = 'list',
  selected: selectedProp,
  ...restProps
}: IressMenuProps<T, TMultiple>) => {
  const id = useIdIfNeeded({ id: idProp });
  const popover = useContext(PopoverContext);

  const role = useMemo(() => {
    if (popover?.type === 'listbox' || popover?.type === 'menu') {
      popover.setHasInnerRole(true);
      return popover.type;
    }

    if (multiSelect) {
      return 'listbox';
    }

    return roleProp;
  }, [multiSelect, popover, roleProp]);

  const ariaProps: Pick<
    HTMLAttributes<HTMLElement>,
    'aria-multiselectable' | 'aria-orientation'
  > = useMemo(() => {
    const orientation = layout === 'stack' ? 'vertical' : 'horizontal';

    return {
      'aria-multiselectable':
        role === 'listbox' && multiSelect ? true : undefined,
      'aria-orientation': role === 'menu' ? orientation : undefined,
    };
  }, [layout, multiSelect, role]);

  const hasArrowKeyNav = useMemo(
    () => role && ['menu', 'listbox'].includes(role),
    [role],
  );

  const isComposite = useMemo(
    () => !popover && hasArrowKeyNav,
    [popover, hasArrowKeyNav],
  );

  const supportsSelection = useMemo(
    () => role === 'listbox' || !!multiSelect,
    [role, multiSelect],
  );

  const { toggleValue: toggle, value: selected } = useControlledState({
    component: 'IressMenu',
    defaultValue: defaultSelected,
    multiple: multiSelect,
    onChange,
    propName: 'selected',
    value: selectedProp,
  });

  const isSelected = useCallback(
    (value?: T) => {
      if (!supportsSelection || value === undefined) {
        return false;
      }

      if (multiSelect) {
        return toArray<T>(selected).includes(value);
      }

      return (selected as T) === value;
    },
    [multiSelect, selected, supportsSelection],
  );

  const context: MenuContextValue<T, TMultiple> = useMemo(
    () => ({
      changeOnBlur: changeOnBlur && role === 'listbox',
      hasArrowKeyNav,
      isComposite,
      isSelected,
      layout,
      multiSelect,
      noWrap,
      role,
      supportsSelection,
      toggle,
    }),
    [
      changeOnBlur,
      hasArrowKeyNav,
      isComposite,
      isSelected,
      layout,
      multiSelect,
      noWrap,
      role,
      supportsSelection,
      toggle,
    ],
  );

  useEffect(() => {
    if (popover?.toggleAriaControls && id) {
      popover.toggleAriaControls(id, true);
    }

    return () => {
      if (popover?.toggleAriaControls && id) {
        popover.toggleAriaControls(id, false);
      }
    };
  }, [id, popover]);

  const classes = menu({ fluid, layout, noWrap, insidePopover: !!popover });

  const props: IressStyledProps = {
    ...restProps,
    ...ariaProps,
    className: cx(className, classes.root, GlobalCSSClass.Menu),
    id,
    role,
  };

  const { Provider } = getMenuContext<T, TMultiple>();

  return (
    <Provider value={context}>
      {isComposite ? (
        <Composite loop={role === 'menu'} render={<styled.div {...props} />} />
      ) : (
        <styled.div {...props} />
      )}
    </Provider>
  );
};

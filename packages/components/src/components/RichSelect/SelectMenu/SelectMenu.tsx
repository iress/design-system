import {
  IressMenu,
  IressMenuHeading,
  IressMenuText,
  IressMenuItemProps,
  IressMenuProps,
} from '../../Menu';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { useCallback, useMemo, ReactNode } from 'react';
import { getValueFromLabelValues } from '@helpers/label-value/getValueFromLabelValues';
import { IressSelectMenuItem } from './SelectMenuItem';
import { ControlledValue, useIdIfNeeded } from '@/hooks';
import { FormattedLabelValueMeta, LabelValueMeta } from '@/interfaces';
import { selectMenu } from './SelectMenu.styles';
import { GlobalCSSClass } from '@/enums';
import { cx } from '@/styled-system/css';
import { FormControlValue } from '@/types';

export interface IressSelectMenuProps<TMultiple extends boolean = false>
  extends Omit<
    IressMenuProps<FormControlValue, TMultiple>,
    'children' | 'onChange' | 'selected' | 'type'
  > {
  /**
   * Heading slot. Often used for a title or description.
   * If a string, will automatically provide an id for aria-labelledby.
   */
  heading?: ReactNode;

  /**
   * Hide selected items from menu.
   * Useful for autocomplete scenarios.
   */
  hideSelectedItems?: boolean;

  /**
   * Items to be displayed in the menu, array of FormattedLabelValueMeta.
   */
  items?: FormattedLabelValueMeta[];

  /**
   * Maximum number of results displayed on mobile screen sizes (< 768).
   */
  limitMobile?: number;

  /**
   * Maximum number of results displayed on larger screen sizes (>= 768).
   */
  limitDesktop?: number;

  /**
   * No results text to display when no items are found.
   */
  noResults?: ReactNode;

  /**
   * Emitted when the value changes when item is selected from the menu
   */
  onChange?: (selected?: ControlledValue<LabelValueMeta, TMultiple>) => void;

  /**
   * Selected items.
   */
  selected?: ControlledValue<LabelValueMeta, TMultiple>;

  /**
   * Set whether to display selected items first in the menu.
   */
  selectedFirst?: boolean;
}

export interface IressSelectMenuItemProps
  extends Omit<IressMenuItemProps<'button'>, 'value'>,
    FormattedLabelValueMeta {
  /**
   * Set whether this item is hidden on mobile
   */
  hiddenOnMobile?: boolean;
}

export const IressSelectMenu = <TMultiple extends boolean = false>({
  heading,
  hideSelectedItems,
  items = [],
  limitDesktop,
  limitMobile,
  multiSelect,
  noResults,
  onChange,
  role = 'listbox',
  selected,
  selectedFirst,
  ...restProps
}: IressSelectMenuProps<TMultiple>) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const labelId = `${id}--label`;
  const menuSelected = useMemo(
    () => getValueFromLabelValues(selected, multiSelect),
    [multiSelect, selected],
  ) as ControlledValue<FormControlValue, TMultiple>;

  const menuItems = useMemo(() => {
    let itemsToShow = selectedFirst
      ? orderSelectedFirst(items, selected, menuSelected)
      : items;

    if (hideSelectedItems) {
      const menuSelectedArray = toArray(menuSelected);
      itemsToShow = itemsToShow.filter(
        (item) =>
          !menuSelectedArray.includes(
            getFormControlValueAsStringIfDefined(item.value) ?? item.label,
          ),
      );
    }

    return addLimitsToItems(itemsToShow, limitDesktop, limitMobile);
  }, [
    hideSelectedItems,
    items,
    limitDesktop,
    limitMobile,
    menuSelected,
    selected,
    selectedFirst,
  ]);
  const showNoResults = menuItems.length === 0;

  const handleMenuChange = useCallback(
    (newValue?: ControlledValue<FormControlValue, TMultiple> | null) => {
      const labelValueMeta = getLabelValueMetaFromMenuSelected(
        items,
        selected,
        newValue ?? undefined,
      );
      onChange?.(
        (multiSelect ? labelValueMeta : labelValueMeta[0]) as ControlledValue<
          LabelValueMeta,
          TMultiple
        >,
      );
    },
    [items, multiSelect, onChange, selected],
  );

  const classes = selectMenu();

  return (
    <IressMenu<FormControlValue, TMultiple>
      {...restProps}
      aria-labelledby={
        typeof heading === 'string' ? labelId : restProps['aria-labelledby']
      }
      multiSelect={multiSelect}
      onChange={handleMenuChange}
      role={role}
      selected={menuSelected}
      className={cx(
        classes.root,
        GlobalCSSClass.RichSelectMenu,
        restProps.className,
      )}
    >
      {typeof heading === 'string' ? (
        <IressMenuHeading id={labelId}>{heading}</IressMenuHeading>
      ) : (
        heading
      )}
      {menuItems.map((menuItem, index) => (
        <IressSelectMenuItem
          {...menuItem}
          data-testid={propagateTestid(restProps?.['data-testid'], 'menu-item')}
          key={`${getFormControlValueAsString(
            menuItem.value ?? menuItem.label,
          )}-${index}`}
        />
      ))}
      {showNoResults &&
        (typeof noResults === 'string' ? (
          <IressMenuText>{noResults}</IressMenuText>
        ) : (
          noResults
        ))}
    </IressMenu>
  );
};

const orderSelectedFirst = <TMultiple extends boolean = false>(
  items: LabelValueMeta[],
  selected?: IressSelectMenuProps<TMultiple>['selected'],
  menuSelected?: ControlledValue<FormControlValue, TMultiple>,
) => {
  const selectedArray = toArray(selected);
  const menuSelectedArray = toArray(menuSelected);

  const unselected = items.filter(
    (item) => !menuSelectedArray.includes(item.value ?? item.label),
  );

  return selectedArray.length && unselected.length
    ? selectedArray
        .concat([{ label: '', value: '', divider: true }])
        .concat(unselected)
    : selectedArray.concat(unselected);
};

const addLimitsToItems = (
  items: LabelValueMeta[],
  limitDesktop?: number,
  limitMobile?: number,
): IressSelectMenuItemProps[] => {
  return items
    .map((item, index) => ({
      ...item,
      hiddenOnMobile: limitMobile ? index > limitMobile - 1 : false,
    }))
    .slice(0, limitDesktop ?? items.length);
};

const getLabelValueMetaFromMenuSelected = <TMultiple extends boolean = false>(
  items: LabelValueMeta[],
  value?: IressSelectMenuProps<TMultiple>['selected'],
  newValues?: ControlledValue<FormControlValue, TMultiple>,
) => {
  const selected = toArray(value);

  return toArray(newValues)
    .map((newValue) => findNewValueInItemsOrSelected(items, selected, newValue))
    .filter((newValue) => newValue !== undefined);
};

const findNewValueInItemsOrSelected = (
  items: LabelValueMeta[],
  selected: LabelValueMeta[],
  newValue?: FormControlValue,
) => {
  const found = items?.find(
    (item) =>
      item.value === newValue ||
      (item.value === undefined && item.label === newValue),
  );
  return (
    found ??
    selected.find(
      (selectedItem) =>
        selectedItem.value === newValue ||
        (selectedItem.value === undefined && selectedItem.label === newValue),
    )
  );
};

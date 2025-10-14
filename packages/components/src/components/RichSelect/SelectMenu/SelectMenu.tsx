import {
  IressMenu,
  IressMenuHeading,
  IressMenuText,
  type MenuSelected,
} from '../../Menu';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { useCallback, useMemo } from 'react';
import { getValueFromLabelValues } from '@helpers/label-value/getValueFromLabelValues';
import { type FormControlValue, type LabelValueMeta } from '@/main';
import {
  type IressSelectMenuItemProps,
  type IressSelectMenuProps,
} from './SelectMenu.types';
import { IressSelectMenuItem } from './SelectMenuItem';
import { useIdIfNeeded } from '@/hooks';

export const IressSelectMenu = ({
  heading,
  hideSelectedItems,
  items = [],
  limitDesktop,
  limitMobile,
  multiSelect,
  noResults,
  onChange,
  selected,
  selectedFirst,
  ...restProps
}: IressSelectMenuProps) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const labelId = `${id}--label`;
  const menuSelected = useMemo(
    () => getValueFromLabelValues(selected, multiSelect),
    [multiSelect, selected],
  );

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
    (newValue?: MenuSelected | null) => {
      const labelValueMeta = getLabelValueMetaFromMenuSelected(
        items,
        selected,
        newValue,
      );
      onChange?.(multiSelect ? labelValueMeta : labelValueMeta[0]);
    },
    [items, multiSelect, onChange, selected],
  );

  return (
    <IressMenu
      {...restProps}
      aria-labelledby={
        typeof heading === 'string' ? labelId : restProps['aria-labelledby']
      }
      multiSelect={multiSelect}
      onChange={handleMenuChange}
      role="listbox"
      selected={menuSelected}
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

const orderSelectedFirst = (
  items: LabelValueMeta[],
  selected?: IressSelectMenuProps['selected'],
  menuSelected?: MenuSelected,
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

const getLabelValueMetaFromMenuSelected = (
  items: LabelValueMeta[],
  value?: IressSelectMenuProps['selected'],
  newValues?: MenuSelected,
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

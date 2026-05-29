import {
  IressMenu,
  IressMenuText,
  IressMenuGroup,
  type IressMenuItemProps,
  type IressMenuProps,
} from '../../Menu';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { useCallback, useMemo, type ReactNode } from 'react';
import { getValueFromLabelValues } from '@helpers/label-value/getValueFromLabelValues';
import { IressSelectMenuItem } from './SelectMenuItem';
import { type ControlledValue, useIdIfNeeded } from '@/hooks';
import {
  type FormattedLabelValueMeta,
  type LabelValueMeta,
} from '@/interfaces';
import { selectMenu } from './SelectMenu.styles';
import { GlobalCSSClass } from '@/enums';
import { cx } from '@/styled-system/css';
import { type FormControlValue } from '@/types';
import { IressSelectHeading } from '../SelectHeading/SelectHeading';

export interface IressSelectMenuProps<
  TMultiple extends boolean = false,
> extends Omit<
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
  extends
    Omit<IressMenuItemProps<'button'>, 'children' | 'value'>,
    FormattedLabelValueMeta {
  /**
   * Set whether this item is hidden on mobile
   */
  hiddenOnMobile?: boolean;
}

/**
 * Renders a list of selectable menu items within a select dropdown, with support for grouping, hiding selected items, and no-results messaging.
 *
 * @example
 * ```tsx
 * import { IressSelectMenu } from '@iress-oss/ids-components';
 *
 * <IressSelectMenu
 *   items={[{ label: 'Option 1', value: '1' }]}
 *   onChange={(selected) => {}}
 * />
 * ```
 */
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
      ? orderSelectedFirst(items, menuSelected)
      : items;

    if (hideSelectedItems) {
      const menuSelectedArray = toArray(menuSelected);
      itemsToShow = itemsToShow
        .map((item) => {
          // Handle grouped items
          if (item.children && item.children.length > 0) {
            const filteredChildren = item.children.filter(
              (child) =>
                !menuSelectedArray.includes(
                  getFormControlValueAsStringIfDefined(child.value) ??
                    child.label,
                ),
            );

            // Only include group if it has remaining children
            if (filteredChildren.length > 0) {
              return { ...item, children: filteredChildren };
            }
            return null;
          }

          // Handle flat items
          if (
            !menuSelectedArray.includes(
              getFormControlValueAsStringIfDefined(item.value) ?? item.label,
            )
          ) {
            return item;
          }
          return null;
        })
        .filter((item): item is LabelValueMeta => item !== null);
    }

    return addLimitsToItems(itemsToShow, limitDesktop, limitMobile);
  }, [
    hideSelectedItems,
    items,
    limitDesktop,
    limitMobile,
    menuSelected,
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
        GlobalCSSClass.SelectMenu,
        restProps.className,
      )}
    >
      {typeof heading === 'string' ? (
        <IressSelectHeading id={labelId}>{heading}</IressSelectHeading>
      ) : (
        heading
      )}
      {menuItems.map((menuItem, index) => {
        // Check if this item has children (is a group)
        if (menuItem.children && menuItem.children.length > 0) {
          return (
            <IressMenuGroup
              label={menuItem.label}
              key={`group-${getFormControlValueAsString(
                menuItem.value ?? menuItem.label,
              )}-${index}`}
              data-testid={propagateTestid(
                restProps?.['data-testid'],
                'menu-group',
              )}
              divider={menuItem.divider}
            >
              {menuItem.children.map((childItem, childIndex) => (
                <IressSelectMenuItem
                  {...childItem}
                  data-testid={propagateTestid(
                    restProps?.['data-testid'],
                    'menu-item',
                  )}
                  key={`${getFormControlValueAsString(
                    childItem.value ?? childItem.label,
                  )}-${childIndex}`}
                />
              ))}
            </IressMenuGroup>
          );
        }

        // Regular item without children
        return (
          <IressSelectMenuItem
            {...menuItem}
            data-testid={propagateTestid(
              restProps?.['data-testid'],
              'menu-item',
            )}
            key={`${getFormControlValueAsString(
              menuItem.value ?? menuItem.label,
            )}-${index}`}
          />
        );
      })}
      {showNoResults &&
        (typeof noResults === 'string' ? (
          <IressMenuText>{noResults}</IressMenuText>
        ) : (
          noResults
        ))}
    </IressMenu>
  );
};

IressSelectMenu.displayName = 'IressSelectMenu';

const orderSelectedFirst = <TMultiple extends boolean = false>(
  items: LabelValueMeta[],
  menuSelected?: ControlledValue<FormControlValue, TMultiple>,
) => {
  const menuSelectedArray = toArray(menuSelected);

  const selectedItems: LabelValueMeta[] = [];
  const unselectedItems: LabelValueMeta[] = [];

  for (const item of items) {
    if (item.children && item.children.length > 0) {
      // For grouped items, check if any child is selected
      const hasSelectedChild = item.children.some((child) =>
        menuSelectedArray.includes(child.value ?? child.label),
      );

      if (hasSelectedChild) {
        selectedItems.push(item);
      } else {
        unselectedItems.push(item);
      }
    } else {
      // For flat items, check if the item itself is selected
      if (menuSelectedArray.includes(item.value ?? item.label)) {
        selectedItems.push(item);
      } else {
        unselectedItems.push(item);
      }
    }
  }

  return selectedItems.length && unselectedItems.length
    ? selectedItems
        .concat([{ label: '', value: '', divider: true }])
        .concat(unselectedItems)
    : selectedItems.concat(unselectedItems);
};

const addLimitsToItems = (
  items: LabelValueMeta[],
  limitDesktop?: number,
  limitMobile?: number,
): IressSelectMenuItemProps[] => {
  const counts = { mobileCount: 0, desktopCount: 0 };
  const result: IressSelectMenuItemProps[] = [];

  for (const item of items) {
    const hasReachedDesktopLimit =
      limitDesktop && counts.desktopCount >= limitDesktop;
    if (hasReachedDesktopLimit) break;

    const isGrouped = item.children && item.children.length > 0;

    if (isGrouped) {
      const processedChildren = processGroupChildren(
        item.children!,
        counts,
        limitDesktop,
        limitMobile,
      );

      if (processedChildren.length > 0) {
        result.push({ ...item, children: processedChildren });
      }
    } else {
      result.push({
        ...item,
        hiddenOnMobile: limitMobile ? counts.mobileCount >= limitMobile : false,
      });
      counts.mobileCount++;
      counts.desktopCount++;
    }
  }

  return result;
};

const processGroupChildren = (
  children: LabelValueMeta[],
  counts: { mobileCount: number; desktopCount: number },
  limitDesktop?: number,
  limitMobile?: number,
): IressSelectMenuItemProps[] => {
  const processedChildren: IressSelectMenuItemProps[] = [];

  for (const child of children) {
    const hasReachedDesktopLimit =
      limitDesktop && counts.desktopCount >= limitDesktop;
    if (hasReachedDesktopLimit) break;

    processedChildren.push({
      ...child,
      hiddenOnMobile: limitMobile ? counts.mobileCount >= limitMobile : false,
    });

    counts.mobileCount++;
    counts.desktopCount++;
  }

  return processedChildren;
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
  // Search top-level items first
  let found = items?.find(
    (item) =>
      item.value === newValue ||
      (item.value === undefined && item.label === newValue),
  );

  // If not found, search within children of grouped items
  if (!found) {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        found = item.children.find(
          (child) =>
            child.value === newValue ||
            (child.value === undefined && child.label === newValue),
        );
        if (found) break;
      }
    }
  }

  // Fallback to searching in selected items
  return (
    found ??
    selected.find(
      (selectedItem) =>
        selectedItem.value === newValue ||
        (selectedItem.value === undefined && selectedItem.label === newValue),
    )
  );
};

import { useRef, type ReactNode } from 'react';
import { IressButton } from '@/components/Button';
import { IressMenu, IressMenuDivider } from '@/components/Menu';
import { IressMenuItem } from '@/components/Menu/MenuItem/MenuItem';
import { IressPopover, type PopoverRef } from '@/components/Popover';
import {
  IressTableFormattedValue,
  type TableCellFormats,
} from '../TableFormattedValue/TableFormattedValue';
import { table } from '../Table.styles';
import { IressIcon } from '@/components/Icon';
import { IressTooltip } from '@/main';

export interface TableFilterButtonProps<TValue = unknown> {
  filterableText?: string;
  filterFormat?: TableCellFormats | ((value: TValue) => ReactNode);
  filterValue: string[];
  footer?: ReactNode;
  setFilter: (values: string[]) => void;
  uniqueValues: TValue[];
}

export const TableFilterButton = <TValue,>({
  filterableText = 'filterable',
  filterFormat,
  filterValue,
  footer,
  setFilter,
  uniqueValues,
}: TableFilterButtonProps<TValue>) => {
  const isActive = filterValue.length > 0;
  const classes = table({ hasFilterButton: true, hasActiveFilter: isActive });
  const popoverRef = useRef<PopoverRef>(null);

  const tooltipText = isActive
    ? `${filterableText} (${filterValue.length} active)`
    : filterableText;

  return (
    <IressPopover
      activator={
        <IressTooltip tooltipText={tooltipText} align="top">
          <IressButton mode="muted" className={classes.filterButton}>
            <IressIcon name="filter_list" screenreaderText={filterableText} />
            {isActive && (
              <span
                className={classes.filterIndicator}
                aria-label={`(${filterValue.length} active)`}
              />
            )}
          </IressButton>
        </IressTooltip>
      }
      align="bottom-start"
      contentStyle={{ p: 'none' }}
      ref={popoverRef}
      type="listbox"
    >
      <IressMenu
        multiSelect
        aria-label={filterableText}
        selected={filterValue}
        onChange={(values) => setFilter(values ?? [])}
      >
        {uniqueValues.map((value) => {
          const stringValue = String(value);
          return (
            <IressMenuItem key={stringValue} value={stringValue}>
              {filterFormat ? (
                <IressTableFormattedValue<object, TValue>
                  format={filterFormat}
                  value={value}
                />
              ) : (
                stringValue
              )}
            </IressMenuItem>
          );
        })}
      </IressMenu>
      {isActive && (
        <>
          <IressMenuDivider />
          <IressMenuItem
            prepend={<IressIcon name="filter_list_off" />}
            onClick={() => {
              setFilter([]);
              popoverRef.current?.setShow(false);
            }}
          >
            Clear filter
          </IressMenuItem>
        </>
      )}
      {footer && (
        <>
          <IressMenuDivider />
          {footer}
        </>
      )}
    </IressPopover>
  );
};

TableFilterButton.displayName = 'TableFilterButton';

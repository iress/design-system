import { IressButton } from '@/components/Button';
import { IressMenu } from '@/components/Menu';
import { IressMenuItem } from '@/components/Menu/MenuItem/MenuItem';
import { IressPopover } from '@/components/Popover';
import { table } from '../Table.styles';

export interface TableFilterButtonProps {
  filterableText?: string;
  filterValue: string[];
  setFilter: (values: string[]) => void;
  uniqueValues: string[];
}

export const TableFilterButton = ({
  filterableText = 'filterable',
  filterValue,
  setFilter,
  uniqueValues,
}: TableFilterButtonProps) => {
  const isActive = filterValue.length > 0;
  const classes = table({ filterButtonActive: isActive });

  const ariaLabel = isActive ? `${filterableText} (active)` : filterableText;

  return (
    <IressPopover
      activator={
        <IressButton
          mode="muted"
          aria-label={ariaLabel}
          className={classes.filterButton}
        >
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.filterIcon}
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M3 5h14M5.5 10h9M8 15h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </IressButton>
      }
      align="bottom-start"
      type="listbox"
    >
      <IressMenu
        role="listbox"
        multiSelect
        aria-label={filterableText}
        selected={filterValue}
        onChange={(values) => setFilter(values ?? [])}
      >
        {uniqueValues.map((value) => (
          <IressMenuItem key={value} value={value}>
            {value}
          </IressMenuItem>
        ))}
      </IressMenu>
    </IressPopover>
  );
};

TableFilterButton.displayName = 'TableFilterButton';

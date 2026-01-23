import type { PropsWithChildren } from 'react';
import { IressIcon, type IressIconProps } from '../../Icon';
import { table } from '../Table.styles';
import type { ColumnSort } from '@tanstack/react-table';

export interface TableSortButtonProps extends PropsWithChildren {
  label?: string;
  noWrap?: boolean;
  sort?: ColumnSort;
  toggleSorting: () => void;
}

export const TableSortButton = ({
  children,
  label = 'sortable',
  noWrap = true,
  sort,
  toggleSorting,
}: TableSortButtonProps) => {
  const sortIcon: IressIconProps['name'] = sort?.desc
    ? 'arrow_drop_down'
    : 'arrow_drop_up';
  const classes = table({ sortButtonNoWrap: noWrap });

  return (
    <button
      type="button"
      className={classes.sortHeader}
      onClick={toggleSorting}
    >
      {children}
      <IressIcon
        name="sort"
        className={classes.sortIcon}
        screenreaderText={label}
      />
      {sort && (
        <IressIcon
          name={sortIcon}
          className={classes.sortIconActive}
          screenreaderText={
            sort.desc ? '(sorted descending)' : '(sorted ascending)'
          }
        />
      )}
    </button>
  );
};

TableSortButton.displayName = 'TableSortButton';

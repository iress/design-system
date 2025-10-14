import { type PropsWithChildren } from 'react';
import { IressIcon } from '../../Icon';
import { table } from '../Table.styles';
import { type ColumnSort } from '@tanstack/react-table';

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
  const icon = sort?.desc ? 'sort-down' : 'sort-up';
  const classes = table({ sortButtonNoWrap: noWrap });

  return (
    <button
      type="button"
      className={classes.sortHeader}
      onClick={toggleSorting}
    >
      {children}
      <IressIcon
        name={sort ? icon : 'sort'}
        className={classes.sortIcon}
        screenreaderText={label}
      />
    </button>
  );
};

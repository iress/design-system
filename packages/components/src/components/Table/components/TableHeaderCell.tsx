import { useTableColumnStyles } from '../hooks/useTableColumnStyles';
import { useTableColumnSort } from '../hooks/useTableColumnSort';
import { useTableColumnFilter } from '../hooks/useTableColumnFilter';
import { TableSortButton } from './TableSortButton';
import { TableFilterButton } from './TableFilterButton';
import { table } from '../Table.styles';
import { type PropsWithChildren, useContext } from 'react';
import { type IressTestProps } from '@/interfaces';
import { type Column } from '@tanstack/react-table';
import { TableContext } from '../TableProvider';

export interface TableHeaderCellProps
  extends PropsWithChildren, IressTestProps {
  additionalHeaders?: string;
  columnApi: Pick<
    Column<object, unknown>,
    | 'getCanSort'
    | 'toggleSorting'
    | 'id'
    | 'getCanFilter'
    | 'setFilterValue'
    | 'getFilterValue'
    | 'getFacetedUniqueValues'
  >;
  tableId: string;
}

export const TableHeaderCell = ({
  additionalHeaders,
  children,
  columnApi,
  tableId,
  ...restProps
}: TableHeaderCellProps) => {
  const columnSort = useTableColumnSort({
    columnApi,
    columnKey: columnApi.id,
  });
  const columnFilter = useTableColumnFilter({
    columnApi,
    columnKey: columnApi.id,
  });
  const columnStyles = useTableColumnStyles({ columnKey: columnApi.id });
  const columnNoWrap = useContext(TableContext)?.getColumnByKey(
    columnApi.id,
  )?.noWrap;

  const classes = table();
  const hasFilter = !!columnFilter;

  const headerContent =
    columnApi.getCanSort() && columnSort ? (
      <TableSortButton {...columnSort?.buttonProps} noWrap={columnNoWrap}>
        {children}
      </TableSortButton>
    ) : (
      children
    );

  return (
    <th
      {...restProps}
      id={`${tableId}__${columnApi.id}`}
      headers={additionalHeaders}
      {...columnSort?.columnProps}
      {...columnStyles}
    >
      {hasFilter ? (
        <div className={classes.headerContent}>
          <TableFilterButton {...columnFilter} />
          {headerContent}
        </div>
      ) : (
        headerContent
      )}
    </th>
  );
};

TableHeaderCell.displayName = 'TableHeaderCell';

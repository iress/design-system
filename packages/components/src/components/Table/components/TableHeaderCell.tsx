import { type TableHeaderCellProps } from '../Table.types';
import { useIDSTableColumnStyles } from '../hooks/useIDSTableColumnStyles';
import { useIDSTableColumnSort } from '../hooks/useIDSTableColumnSort';
import { TableSortButton } from './TableSortButton';
import { useTable } from '../hooks/useTable';

export const TableHeaderCell = ({
  additionalHeaders,
  children,
  columnApi,
  tableId,
  ...restProps
}: TableHeaderCellProps) => {
  const columnSort = useIDSTableColumnSort({
    columnApi,
    columnKey: columnApi.id,
  });
  const columnStyles = useIDSTableColumnStyles({ columnKey: columnApi.id });
  const columnNoWrap = useTable()?.getColumnByKey(columnApi.id)?.noWrap;

  return (
    <th
      {...restProps}
      id={`${tableId}__${columnApi.id}`}
      headers={additionalHeaders}
      {...columnSort?.columnProps}
      {...columnStyles}
    >
      {columnApi.getCanSort() && columnSort ? (
        <TableSortButton {...columnSort?.buttonProps} noWrap={columnNoWrap}>
          {children}
        </TableSortButton>
      ) : (
        children
      )}
    </th>
  );
};

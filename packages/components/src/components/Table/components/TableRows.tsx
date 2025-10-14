import { type TableRowsProps } from '../Table.types';
import { flexRender } from '@tanstack/react-table';
import { TableBodyCell } from './TableBodyCell';
import { useTable } from '../hooks/useTable';
import { propagateTestid } from '@helpers/utility/propagateTestid';

export const TableRows = <TRow extends object = never>({
  additionalHeaders,
  hiddenHeader,
  rowProps = {},
  setControlViaRef,
  scope = 'row',
  tableId,
  testId,
}: TableRowsProps<TRow>) => {
  const table = useTable<TRow>();
  const rows = table?.api.getSortedRowModel().rows;

  if (!rows?.length) return null;

  return rows.map((row) => (
    <tr
      key={row.id}
      data-testid={testId?.replace('tbody', 'row')}
      id={`${tableId}--rows--${row.id}`}
      ref={(element) => {
        const rowId = `${tableId}--rows--${row.id}`;
        setControlViaRef?.(rowId)(element);
      }}
      {...(typeof rowProps === 'function' ? rowProps(row) : rowProps)}
    >
      {row.getVisibleCells().map((cell, index) => (
        <TableBodyCell
          additionalHeaders={additionalHeaders}
          data-testid={propagateTestid(
            testId?.replace('tbody', 'cell'),
            `row_${row.id}__col_${cell.column.id}`,
          )}
          key={cell.id}
          cellApi={cell}
          hiddenHeader={hiddenHeader}
          index={index}
          scope={scope}
          tableId={tableId}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableBodyCell>
      ))}
    </tr>
  ));
};

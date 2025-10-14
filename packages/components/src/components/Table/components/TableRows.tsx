import { flexRender, Row } from '@tanstack/react-table';
import { TableBodyCell } from './TableBodyCell';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressStyledProps } from '@/types';
import { AriaRelationshipProps } from '@/hooks/useAriaRelationship';
import { useContext } from 'react';
import { getTableContext } from '../TableProvider';
import { styled } from '@/styled-system/jsx';

export interface TableRowsProps<TRow extends object = never>
  extends Partial<Pick<AriaRelationshipProps, 'setControlViaRef'>> {
  additionalHeaders?: string;
  hiddenHeader?: boolean;
  scope?: 'row' | 'col';
  rowProps?:
    | IressStyledProps<'tr'>
    | ((row: Row<TRow>) => IressStyledProps<'tr'>);
  tableId: string;
  testId?: string;
}

export const TableRows = <TRow extends object = never>({
  additionalHeaders,
  hiddenHeader,
  rowProps = {},
  setControlViaRef,
  scope = 'row',
  tableId,
  testId,
}: TableRowsProps<TRow>) => {
  const table = useContext(getTableContext<TRow>());
  const rows = table?.api.getSortedRowModel().rows;

  if (!rows?.length) return null;

  return rows.map((row) => (
    <styled.tr
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
    </styled.tr>
  ));
};

import { type Header } from '@tanstack/react-table';
import { TableFilterCell } from './TableFilterCell';
import { propagateTestid } from '@helpers/utility/propagateTestid';

export interface TableFilterRowProps {
  headers: Header<object, unknown>[];
  tableId: string;
  testId?: string;
}

export const TableFilterRow = ({
  headers,
  tableId,
  testId,
}: TableFilterRowProps) => {
  const hasFilterableColumn = headers.some((header) =>
    header.column.getCanFilter(),
  );

  if (!hasFilterableColumn) return null;

  return (
    <tr data-testid={propagateTestid(testId, 'filter-row', '-')}>
      {headers.map((header) => (
        <TableFilterCell
          key={header.id}
          column={header.column}
          tableId={tableId}
          data-testid={propagateTestid(
            testId?.replace('thead', 'filter'),
            header.column.id,
          )}
        />
      ))}
    </tr>
  );
};

TableFilterRow.displayName = 'TableFilterRow';

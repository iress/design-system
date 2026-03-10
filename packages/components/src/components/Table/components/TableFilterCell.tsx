import { type Column } from '@tanstack/react-table';
import { type IressTestProps } from '@/interfaces';
import { useContext } from 'react';
import { TableContext } from '../TableProvider';
import { styled } from '@/styled-system/jsx';

export interface TableFilterCellProps extends IressTestProps {
  column: Pick<
    Column<object, unknown>,
    'getCanFilter' | 'getFilterValue' | 'setFilterValue' | 'id'
  >;
  tableId: string;
}

export const TableFilterCell = ({
  column,
  tableId,
  'data-testid': dataTestId,
}: TableFilterCellProps) => {
  const context = useContext(TableContext);
  const columnDef = context?.getColumnByKey(column.id);

  if (!column.getCanFilter()) {
    return <th />;
  }

  const filterValue = (column.getFilterValue() ?? '') as string;

  return (
    <th data-testid={dataTestId}>
      <styled.input
        type="text"
        value={filterValue}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={columnDef?.filterPlaceholder ?? 'Filter...'}
        aria-describedby={`${tableId}__${column.id}`}
        aria-label="Filter"
        w="[100%]"
      />
    </th>
  );
};

TableFilterCell.displayName = 'TableFilterCell';

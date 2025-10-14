import { type IressTestProps } from '@/interfaces';
import { type PropsWithChildren } from 'react';
import { type Cell } from '@tanstack/react-table';
import { useTableColumnStyles } from '../hooks/useTableColumnStyles';

export interface TableBodyCellProps<TRow extends object = never>
  extends PropsWithChildren,
    IressTestProps {
  additionalHeaders?: string;
  cellApi: Pick<Cell<TRow, unknown>, 'column' | 'row' | 'id'>;
  hiddenHeader?: boolean;
  index: number;
  scope?: 'row' | 'col';
  tableId: string;
}

export const TableBodyCell = <TRow extends object = never>({
  additionalHeaders,
  cellApi,
  children,
  hiddenHeader,
  index,
  scope = 'row',
  tableId,
  ...restProps
}: TableBodyCellProps<TRow>) => {
  const columnStyles = useTableColumnStyles({
    columnKey: cellApi.column.id,
  });
  const isHeader = index === 0 && scope === 'row';

  const headers = hiddenHeader ? [] : [`${tableId}__${cellApi.column.id}`];
  if (!isHeader && scope === 'row')
    headers.push(`${tableId}__${cellApi.row.getVisibleCells()[0].id}`);

  if (additionalHeaders) headers.push(additionalHeaders);

  const Element = isHeader ? 'th' : 'td';

  return (
    <Element
      {...restProps}
      data-column={cellApi.column.id}
      headers={headers.length ? headers.join(' ') : undefined}
      id={`${tableId}__${cellApi.id}`}
      scope={isHeader ? 'row' : undefined}
      {...columnStyles}
    >
      {children}
    </Element>
  );
};

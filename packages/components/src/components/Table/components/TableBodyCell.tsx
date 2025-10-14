import { type TableBodyCellProps } from '../Table.types';
import { useIDSTableColumnStyles } from '../hooks/useIDSTableColumnStyles';

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
  const columnStyles = useIDSTableColumnStyles({
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

import { propagateTestid } from '@helpers/utility/propagateTestid';
import { flexRender } from '@tanstack/react-table';
import { TableHeaderCell } from './TableHeaderCell';
import { type AriaRelationshipProps } from '@/hooks/useAriaRelationship';
import { useContext } from 'react';
import { TableContext } from '../TableProvider';

export interface TableHeaderProps
  extends Partial<Pick<AriaRelationshipProps, 'setControlViaRef'>> {
  additionalHeaders?: string;
  className?: string;
  tableId: string;
  testId?: string;
}

export const TableHeader = ({
  additionalHeaders,
  className,
  setControlViaRef,
  tableId,
  testId,
}: TableHeaderProps) => {
  const table = useContext(TableContext);
  const headerGroups = table?.api.getHeaderGroups();

  if (!table?.api.getFlatHeaders()?.length) return null;

  return headerGroups?.map((headerGroup) => (
    <tr
      key={headerGroup.id}
      data-testid={propagateTestid(testId, 'row', '-')}
      className={className}
      id={`${tableId}--header--${headerGroup.id}`}
      ref={(element) => {
        const headerId = `${tableId}--header--${headerGroup.id}`;
        setControlViaRef?.(headerId)(element);
      }}
    >
      {headerGroup.headers.map((header) => (
        <TableHeaderCell
          additionalHeaders={additionalHeaders}
          columnApi={header.column}
          key={header.id}
          tableId={tableId}
          data-testid={propagateTestid(
            testId?.replace('thead', 'header'),
            header.id,
          )}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </TableHeaderCell>
      ))}
    </tr>
  ));
};

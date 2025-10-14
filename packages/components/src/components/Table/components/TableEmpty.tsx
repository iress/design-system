import { PropsWithChildren, useContext } from 'react';
import { TableContext } from '../TableProvider';

export const TableEmpty = ({ children }: PropsWithChildren) => {
  const table = useContext(TableContext);
  const rows = table?.api.getSortedRowModel().rows;

  if (rows?.length || !children) return null;

  const numberOfColumns = table?.api.getVisibleFlatColumns().length;
  if (!numberOfColumns) return null;

  return (
    <tr>
      <td colSpan={numberOfColumns}>{children}</td>
    </tr>
  );
};

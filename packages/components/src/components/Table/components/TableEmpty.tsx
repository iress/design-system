import { type PropsWithChildren } from 'react';
import styles from '../Table.module.scss';
import { useTable } from '../hooks/useTable';

export const TableEmpty = ({ children }: PropsWithChildren) => {
  const table = useTable();
  const rows = table?.api.getSortedRowModel().rows;

  if (rows?.length || !children) return null;

  const numberOfColumns = table?.api.getVisibleFlatColumns().length;
  if (!numberOfColumns) return null;

  return (
    <tr>
      <td className={styles.empty} colSpan={numberOfColumns}>
        {children}
      </td>
    </tr>
  );
};

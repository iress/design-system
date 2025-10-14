import {
  type TableColumnHookProps,
  type TableColumnSortHook,
} from '../Table.types';
import { useTable } from './useTable';

export const useIDSTableColumnSort = ({
  columnApi,
  columnKey,
}: TableColumnHookProps): TableColumnSortHook | undefined => {
  const table = useTable();
  const column = table?.getColumnByKey(columnKey);
  const canSort = column?.sort ?? column?.sortFn;

  if (!column || !canSort || !columnApi?.getCanSort()) return undefined;

  const currentSort = table.api
    .getState()
    .sorting.find((sort) => sort.id === columnKey);
  const ariaSort = currentSort?.desc ? 'descending' : 'ascending';

  return {
    buttonProps: {
      label: column.sortableText,
      sort: currentSort,
      toggleSorting: () => {
        columnApi.toggleSorting();
      },
    },
    columnProps: {
      'aria-sort': currentSort ? ariaSort : 'none',
    },
  };
};

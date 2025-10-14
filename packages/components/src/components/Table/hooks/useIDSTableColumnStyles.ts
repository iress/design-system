import styles from '../Table.module.scss';
import classNames from 'classnames';
import {
  type TableColumnHookProps,
  type TableColumnStylesHook,
} from '../Table.types';
import { useTable } from './useTable';

export const useIDSTableColumnStyles = ({
  columnKey,
}: TableColumnHookProps): TableColumnStylesHook | undefined => {
  const column = useTable()?.getColumnByKey(columnKey);

  if (!column) return undefined;

  return {
    className: classNames({
      [styles[`cell--${column?.align}`]]: column?.align,
      [styles.divider]: column?.divider,
      [styles[`cell--number`]]: column?.format === 'number',
      [styles[`cell--currency`]]: column?.format === 'currency',
    }),
    style: {
      width: column?.width,
      minWidth: column?.width,
    },
  };
};

import { IressIcon } from '../../Icon';
import { type TableSortButtonProps } from '../Table.types';
import styles from '../Table.module.scss';
import classNames from 'classnames';

export const TableSortButton = ({
  children,
  label = 'sortable',
  noWrap = true,
  sort,
  toggleSorting,
}: TableSortButtonProps) => {
  const icon = sort?.desc ? 'sort-down' : 'sort-up';

  return (
    <button
      type="button"
      className={classNames(styles.sortButton, {
        [styles.sortButtonNoWrap]: noWrap,
      })}
      onClick={toggleSorting}
    >
      {children}
      <IressIcon
        name={sort ? icon : 'sort'}
        className={styles.sortIcon}
        screenreaderText={label}
      />
    </button>
  );
};

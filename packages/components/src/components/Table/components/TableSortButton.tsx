import type { PropsWithChildren, FC } from 'react';
import { table } from '../Table.styles';
import type { ColumnSort } from '@tanstack/react-table';

export interface TableSortButtonProps extends PropsWithChildren {
  label?: string;
  noWrap?: boolean;
  sort?: ColumnSort;
  toggleSorting: () => void;
}

const Sort: FC<{
  className?: string;
  classNameUp?: string;
  classNameDown?: string;
  screenreaderText?: string;
}> = ({ className, classNameUp, classNameDown, screenreaderText }) => (
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={screenreaderText}
  >
    <path
      d="M10.0008 4.66322L7.87896 6.78509C7.75507 6.90898 7.60576 6.97232 7.43104 6.97509C7.25646 6.97773 7.10451 6.9144 6.97521 6.78509C6.8459 6.65579 6.78125 6.50516 6.78125 6.33322C6.78125 6.16127 6.8459 6.01065 6.97521 5.88134L9.47354 3.38301C9.5516 3.30496 9.63389 3.24989 9.72042 3.2178C9.80695 3.18572 9.90042 3.16968 10.0008 3.16968C10.1013 3.16968 10.1947 3.18572 10.2813 3.2178C10.3678 3.24989 10.4501 3.30496 10.5281 3.38301L13.0265 5.88134C13.1503 6.00523 13.2137 6.15454 13.2165 6.32926C13.2191 6.50384 13.1558 6.65579 13.0265 6.78509C12.8972 6.9144 12.7465 6.97905 12.5746 6.97905C12.4025 6.97905 12.2519 6.9144 12.1227 6.78509L10.0008 4.66322Z"
      className={classNameUp}
    />
    <path
      d="M10.0008 15.4159L7.87896 13.294C7.75507 13.1701 7.60576 13.1068 7.43104 13.104C7.25646 13.1014 7.10451 13.1647 6.97521 13.294C6.8459 13.4233 6.78125 13.5739 6.78125 13.7459C6.78125 13.9178 6.8459 14.0685 6.97521 14.1978L9.47354 16.6961C9.5516 16.7741 9.63389 16.8292 9.72042 16.8613C9.80695 16.8934 9.90042 16.9094 10.0008 16.9094C10.1013 16.9094 10.1947 16.8934 10.2813 16.8613C10.3678 16.8292 10.4501 16.7741 10.5281 16.6961L13.0265 14.1978C13.1503 14.0739 13.2137 13.9246 13.2165 13.7498C13.2191 13.5753 13.1558 13.4233 13.0265 13.294C12.8972 13.1647 12.7465 13.1 12.5746 13.1C12.4025 13.1 12.2519 13.1647 12.1227 13.294L10.0008 15.4159Z"
      className={classNameDown}
    />
  </svg>
);

export const TableSortButton = ({
  children,
  label: labelProp = 'sortable',
  noWrap = true,
  sort,
  toggleSorting,
}: TableSortButtonProps) => {
  const classes = table({ sortButtonNoWrap: noWrap });
  let sortDescription = sort?.desc === false ? ' (ascending)' : ' (descending)';

  if (!sort) {
    sortDescription = '';
  }

  const label = `${labelProp}${sortDescription}`;

  return (
    <button
      type="button"
      className={classes.sortHeader}
      onClick={toggleSorting}
    >
      {children}
      <Sort
        className={classes.sortIcon}
        classNameUp={sort?.desc === true ? classes.sortIconInactive : undefined}
        classNameDown={
          sort?.desc === false ? classes.sortIconInactive : undefined
        }
        screenreaderText={label}
      />
    </button>
  );
};

TableSortButton.displayName = 'TableSortButton';

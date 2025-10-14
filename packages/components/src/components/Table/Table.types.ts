import { type PropsWithChildren, type ReactNode } from 'react';
import type React from 'react';
import {
  type IressHTMLAttributes,
  type WithDataAttributes,
} from '@/interfaces';
import {
  type Cell,
  type Column,
  type ColumnSort,
  type Row,
  type SortDirection,
  type SortingFnOption,
  type Table,
} from '@tanstack/react-table';
import { type AriaRelationshipProps } from '@/hooks/useAriaRelationship';

export interface IressTableCommonProps<
  TRow extends object = never,
  TVal = never,
> {
  /**
   * Caption that describes the data in the table, required for accessibility.
   */
  caption: ReactNode;

  /**
   * Multiple table elements can be passed as children.
   * Used to create a static table, or add a `<tfoot />` element to a `rows` based table.
   */
  children?: ReactNode;

  /**
   * A mapping of columns to be displayed in the table.
   * If not provided, it will be automatically regenerated from the row data.
   */
  columns?:
    | Record<string, TableColumnNoKey<TRow, TVal> | undefined>
    | TableColumn<TRow, TVal>[];

  /**
   * Content to be show when there is no rowData (columns must also be provided).
   */
  empty?: ReactNode;

  /**
   * When set to true, the table caption will be visually hidden.
   */
  hiddenCaption?: boolean;

  /**
   * When set to true, the table header (`<thead></thead>`) will be not be rendered.
   * Only use with very simple tables.
   */
  hiddenHeader?: boolean;

  /**
   * Add additional props to the row element.
   * Can be a props map or a function that returns an props map. The function is called with the row data.
   */
  rowProps?:
    | IressHTMLAttributes<HTMLTableRowElement>
    | ((row: Row<TRow>) => IressHTMLAttributes<HTMLTableRowElement>);

  /**
   * Each object in the array contains the data for a row.
   * @default []
   */
  rows?: TRow[];

  /**
   * Defaults to 'row' - the first cell in the row is a `<th>`, otherwise it's a `<td>`.
   * @default 'row'
   */
  scope?: TableScope | TableScopes;
}

export interface IressTableProps<TRow extends object = never, TVal = never>
  extends IressHTMLAttributes<HTMLTableElement>,
    IressTableCommonProps<TRow, TVal> {
  /**
   * Compact view of the table, used for tables with a lot of data.
   */
  compact?: boolean;

  /**
   * When set to true, hovering over a row will trigger a UI change.
   */
  hover?: boolean;
}

export interface TableColumn<TRow extends object, TVal = never> {
  /**
   * Aligns the content of the cell.
   * @default left
   */
  align?: TableColumnAligns;

  /**
   * The currency code to prefix to the value if `format` is set to currency.
   * @default $
   */
  currencyCode?: string;

  /**
   * When set to true, a divider will be rendered after the column.
   */
  divider?: boolean;

  /**
   * Formats the cell content.
   * To use the in-built formatters, set this to: string, number, date, currency, percent.
   * Use a custom formatter by passing a function that returns a ReactNode.
   */
  format?: TableCellFormats | ((value: TVal, row?: TRow) => ReactNode);

  /**
   * The unique key for the column.
   */
  key: string;

  /**
   * The label for the column header.
   */
  label?: ReactNode;

  /**
   * Whether the column should wrap text or not. May need to be false if the column heading is long.
   * @default true
   */
  noWrap?: boolean;

  /**
   * When set to true, the column will be sortable.
   * Setting it to either `asc` or `desc` will set the initial sort order.
   */
  sort?: boolean | SortDirection;

  /**
   * The sorting function to use when sorting the column.
   * If not provided, the default sorting function will be used based on the original row data.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/sorting#sortingfn)
   + @link [Guide](https://tanstack.com/table/v8/docs/guide/sorting)
   */
  sortFn?: SortingFnOption<TRow>;

  /**
   * Text to be read by a screen reader when a column is sortable (but not currently sorted).
   * @default sortable
   */
  sortableText?: string;

  /**
   * The width of the column.
   */
  width?: string;
}

export type TableColumnNoKey<TRow extends object, TVal = unknown> = Omit<
  TableColumn<TRow, TVal>,
  'key'
>;

export interface IressTableProviderProps<TRow extends object, TVal = unknown>
  extends PropsWithChildren {
  columns?: IressTableProps<TRow, TVal>['columns'];
  rows: TRow[];
}

export interface TableContextValue<TRow extends object, TVal = unknown> {
  api: Table<TRow>;
  getColumnByKey: (key: string) => TableColumnNoKey<TRow, TVal> | undefined;
}

export interface TableHeaderProps
  extends Partial<Pick<AriaRelationshipProps, 'setControlViaRef'>> {
  additionalHeaders?: string;
  className?: string;
  tableId: string;
  testId?: string;
}

export interface TableHeaderCellProps
  extends PropsWithChildren,
    WithDataAttributes {
  additionalHeaders?: string;
  columnApi: Pick<
    Column<object, unknown>,
    'getCanSort' | 'toggleSorting' | 'id'
  >;
  tableId: string;
}

export interface TableRowsProps<TRow extends object = never>
  extends Partial<Pick<AriaRelationshipProps, 'setControlViaRef'>> {
  additionalHeaders?: string;
  hiddenHeader?: boolean;
  scope?: TableScopes;
  rowProps?: IressTableProps<TRow>['rowProps'];
  tableId: string;
  testId?: string;
}

export interface TableBodyCellProps<TRow extends object = never>
  extends PropsWithChildren,
    WithDataAttributes {
  additionalHeaders?: string;
  cellApi: Pick<Cell<TRow, unknown>, 'column' | 'row' | 'id'>;
  hiddenHeader?: boolean;
  index: number;
  scope?: TableScopes;
  tableId: string;
}

export interface TableSortButtonProps extends PropsWithChildren {
  label?: string;
  noWrap?: boolean;
  sort?: ColumnSort;
  toggleSorting: () => void;
}

export interface TableColumnHookProps {
  columnApi?: Pick<Column<object, unknown>, 'getCanSort' | 'toggleSorting'>;
  columnKey: string;
}

export interface TableColumnSortHook {
  buttonProps: TableSortButtonProps;
  columnProps: {
    'aria-sort'?: 'none' | 'ascending' | 'descending';
  };
}

export interface TableColumnStylesHook {
  className: string;
  style: React.CSSProperties;
}

export interface TableRef<TRow extends object> {
  api: Table<TRow>;
}

export interface TableExports {
  /**
   * Allows you to access the table context within a child of the `IressTable`.
   */
  useTable: <TRow extends object, TVal = never>() => TableContextValue<
    TRow,
    TVal
  >;
}

export interface TableEnums {
  /** @deprecated IressTable.Scope enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Scope: typeof TableScope;
}

/** @deprecated IressTable.Scope enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
export enum TableScope {
  Row = 'row',
  Col = 'col',
}
export const TABLE_SCOPES = ['row', 'col'] as const;
export type TableScopes = (typeof TABLE_SCOPES)[number];

/** @deprecated TableColumnAlign enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
export enum TableColumnAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}
export const TABLE_COLUMN_ALIGN = ['left', 'right', 'center'] as const;
export type TableColumnAligns = (typeof TABLE_COLUMN_ALIGN)[number];

/** @deprecated TableCellFormat enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
export enum TableCellFormat {
  String = 'string',
  Number = 'number',
  Date = 'date',
  Currency = 'currency',
  Percent = 'percent',
}
export const TABLE_CELL_FORMATS = [
  'string',
  'number',
  'date',
  'shortDate',
  'isoDateTime',
  'relativeTime',
  'currency',
  'percent',
] as const;
export type TableCellFormats = (typeof TABLE_CELL_FORMATS)[number];

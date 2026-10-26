export * from './Table';
export * from './Table.styles';

export * from './TableBody/TableBody';
export * from './TableFormattedValue/TableFormattedValue';
export type {
  IressTableColumn,
  IressTableColumnFilter,
  /** @deprecated Use `IressTableColumn` instead. */
  TableColumn,
  /** @deprecated Use `IressTableColumnFilter` instead. */
  TableColumnFilter,
} from './helpers/composeTableColumnDefs';

export * from './hooks/useTable';

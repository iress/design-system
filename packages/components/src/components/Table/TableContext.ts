import { createContext } from 'react';
import { type TableContextValue } from './Table.types';

function createTableContext<TRow extends object, TVal = unknown>() {
  return createContext<TableContextValue<TRow, TVal> | undefined>(undefined);
}

// TODO: Is there a way to do this without casting?
export function getTableContext<TRow extends object, TVal = unknown>() {
  return TableContext as unknown as React.Context<
    TableContextValue<TRow, TVal>
  >;
}

const TableContext = createTableContext();

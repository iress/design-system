import { useState, useCallback } from 'react';
import {
  IressTable,
  type IressTableProps,
  type TableActiveFilter,
} from '@/main';
import { IressPill } from '@/components/Pill';

type Props = Partial<IressTableProps<Row, never>>;

interface Row {
  investment_name: string;
  status: string;
  cost: number;
  investmentDate: string;
  totalPercentage: number;
}

const STATUS_MODES: Record<string, 'success' | 'info' | 'warning' | 'danger'> =
  {
    Current: 'success',
    Proposed: 'info',
    Alternative: 'warning',
    Archived: 'danger',
  };

const ALL_ROWS: Row[] = [
  {
    investment_name: 'Artemis Fund Managers Limited',
    status: 'Current',
    cost: 23898,
    investmentDate: '2019-09-23',
    totalPercentage: 24.8,
  },
  {
    investment_name: 'CASH.CASH',
    status: 'Proposed',
    cost: 49751.4,
    investmentDate: '2020-06-28',
    totalPercentage: 49,
  },
  {
    investment_name: 'VODAFONE GRP',
    status: 'Alternative',
    cost: 26382.456,
    investmentDate: '2019-02-05',
    totalPercentage: 26.2,
  },
  {
    investment_name: 'APPLE INC',
    status: 'Archived',
    cost: 12000,
    investmentDate: '2021-11-15',
    totalPercentage: 12.1,
  },
];

/**
 * Simulates a server-side filtered fetch. In a real application, replace this
 * with an API call that accepts filter parameters and returns matching rows.
 */
const simulateServerFetch = (filters: TableActiveFilter[]): Row[] =>
  ALL_ROWS.filter((row) =>
    filters.every((filter) => {
      const cellValue = String(row[filter.columnKey as keyof Row] ?? '');
      return filter.values.length === 0 || filter.values.includes(cellValue);
    }),
  );

export const TableFilteringServerSide = (args: Props) => {
  const [rows, setRows] = useState<Row[]>(ALL_ROWS);

  const handleFilterChange = useCallback((filters: TableActiveFilter[]) => {
    // In a real application you would make an async API call here, e.g.:
    //   const data = await api.getInvestments({ filters });
    //   setRows(data);
    setRows(simulateServerFetch(filters));
  }, []);

  return (
    <IressTable<Row>
      caption="My investments"
      compact
      rows={rows}
      manualFiltering
      onColumnFiltersChange={handleFilterChange}
      {...args}
      columns={[
        {
          key: 'investment_name',
          label: 'Investment',
          divider: true,
          // Provide explicit values so the dropdown always shows all options,
          // even when the current page of rows is already filtered.
          filter: {
            values: ALL_ROWS.map((r) => r.investment_name),
          },
        },
        {
          key: 'status',
          label: 'Status',
          filter: {
            // Explicit values ensure the full list is always visible.
            values: Object.keys(STATUS_MODES),
            format: (value: string) => (
              <IressPill mode={STATUS_MODES[value] ?? 'info'}>
                {value}
              </IressPill>
            ),
          },
          format: (value: string) => (
            <IressPill mode={STATUS_MODES[value] ?? 'info'}>{value}</IressPill>
          ),
        },
        {
          key: 'investmentDate',
          label: 'Date',
          format: 'date',
        },
        {
          key: 'totalPercentage',
          label: 'Share',
          format: 'percent',
        },
        {
          key: 'cost',
          label: 'Cost',
          textAlign: 'right',
          format: 'currency',
        },
      ]}
    />
  );
};

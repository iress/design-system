import { useState, useCallback, useRef } from 'react';
import { IressTable, type IressTableProps } from '@/main';
import { IressPill } from '@/components/Pill';
import { IressLoading } from '@/patterns/Loading';

type Props = Partial<IressTableProps<object, never>>;

const STATUS_MODES: Record<string, 'success' | 'info' | 'warning' | 'danger'> =
  {
    Current: 'success',
    Proposed: 'info',
    Alternative: 'warning',
    Archived: 'danger',
  };

const ALL_ROWS = [
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
 * Simulates a server-side fetch with a delay. In a real application,
 * replace this with an actual API call.
 */
const simulateServerFetch = (statusFilter: string[]): Promise<object[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const filtered =
        statusFilter.length === 0
          ? ALL_ROWS
          : ALL_ROWS.filter((row) => statusFilter.includes(row.status));
      resolve(filtered);
    }, 800);
  });

export const TableFilteringServerSide = (args: Props) => {
  const [rows, setRows] = useState<object[]>(ALL_ROWS);
  const [loaded, setLoaded] = useState(true);
  const [updating, setUpdating] = useState(false);
  const latestRequest = useRef(0);

  const handleStatusFilter = useCallback(async (selectedValues: string[]) => {
    const requestId = ++latestRequest.current;
    setUpdating(true);
    const data = await simulateServerFetch(selectedValues);
    // Only apply the result if this is still the latest request
    if (requestId === latestRequest.current) {
      setRows(data);
      setUpdating(false);
      setLoaded(true);
    }
  }, []);

  return (
    <IressLoading
      pattern="component"
      loaded={loaded}
      update={updating}
      width="12/12"
    >
      <IressTable<object>
        caption="My investments"
        compact
        rows={rows}
        {...args}
        columns={[
          {
            key: 'investment_name',
            label: 'Investment',
            divider: true,
          },
          {
            key: 'status',
            label: 'Status',
            filter: {
              // Provide all possible values so the dropdown is always complete,
              // even when the current rows are already filtered server-side.
              values: Object.keys(STATUS_MODES),
              // Disable client-side filtering — the server controls which rows
              // are shown.
              filterFn: false,
              // Fetch new data when the user changes the filter selection.
              onChange: (values: string[]) => void handleStatusFilter(values),
              format: (value: string) => (
                <IressPill mode={STATUS_MODES[value] ?? 'info'}>
                  {value}
                </IressPill>
              ),
            },
            format: (value: string) => (
              <IressPill mode={STATUS_MODES[value] ?? 'info'}>
                {value}
              </IressPill>
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
    </IressLoading>
  );
};

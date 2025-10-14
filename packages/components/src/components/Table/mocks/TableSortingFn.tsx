import {
  IressTable,
  IressTableFormattedValue,
  IressTableProps,
  TableColumn,
} from '@/main';

type Props = Partial<IressTableProps<Row, never>>;

interface Row {
  investment_name: string;
  cost: number;
  netCost?: number;
  investmentDate: string;
  totalPercentage: number;
}

const columns: TableColumn<Row>[] = [
  {
    key: 'investment_name',
    label: 'Investment',
    divider: true,
    sort: 'asc',
    sortFn: 'textCaseSensitive',
  },
  {
    key: 'investmentDate',
    label: 'Date',
    format: 'date',
    sort: true,
    sortFn: 'datetime',
  },
  {
    key: 'totalPercentage',
    label: 'Share',
    format: 'percent',
    sort: true,
    sortFn: 'alphanumeric',
  },
  {
    key: 'cost',
    label: 'Cost (sorts by net cost if available)',
    textAlign: 'right',
    format: (value: number, row) => {
      return (
        <>
          <IressTableFormattedValue value={value} format="currency" /> (net:{' '}
          {row?.netCost ? (
            <IressTableFormattedValue value={row.netCost} format="currency" />
          ) : (
            'N/A'
          )}
          )
        </>
      );
    },
    sortFn: (a, b) => {
      const aCost = a.original.netCost ?? a.original.cost;
      const bCost = b.original.netCost ?? b.original.cost;
      return aCost - bCost;
    },
  },
];

export const TableSortingFn = (args: Props) => (
  <IressTable<Row>
    caption="My investments"
    rows={[
      {
        investment_name: 'Artemis Fund Managers Limited',
        cost: 23898,
        investmentDate: '2019-09-23',
        totalPercentage: 24.8,
      },
      {
        investment_name: 'CASH.CASH',
        cost: 49751.4,
        netCost: 20000,
        investmentDate: '2020-06-28',
        totalPercentage: 49,
      },
      {
        investment_name: 'VODAFONE GRP',
        cost: 26382.456,
        investmentDate: '2019-02-05',
        totalPercentage: 26.2,
      },
    ]}
    {...args}
    columns={columns}
  />
);

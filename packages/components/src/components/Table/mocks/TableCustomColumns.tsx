import {
  IressBadge,
  IressTable,
  IressTableFormattedValue,
  IressTableProps,
} from '@/main';

type Props = Partial<IressTableProps<object, never>>;

const renderColumn = (value: number) => (
  <IressBadge mode={value > 30000 ? 'success' : 'danger'}>
    <IressTableFormattedValue value={value} format="currency" />
  </IressBadge>
);

export const TableCustomColumns = (args: Props) => (
  <IressTable
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
    columns={[
      {
        key: 'investment_name',
        label: 'Investment',
        divider: true,
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
        align: 'right',
        format: renderColumn,
      },
    ]}
  />
);

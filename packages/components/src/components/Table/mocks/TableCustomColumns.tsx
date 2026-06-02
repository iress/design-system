import {
  IressPill,
  IressTable,
  IressTableFormattedValue,
} from '@/main';

const renderColumn = (value: number) => (
  <IressPill mode={value > 30000 ? '70' : '10'}>
    <IressTableFormattedValue value={value} format="currency" />
  </IressPill>
);

export function TableCustomColumns() {
  return (
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
          textAlign: 'right',
          format: renderColumn,
        },
      ]}
    />
  );
}

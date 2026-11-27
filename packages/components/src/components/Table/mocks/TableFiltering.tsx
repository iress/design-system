import { IressTable } from '@/main';
import { IressPill } from '@/components/Pill';

const STATUS_MODES: Record<string, 'success' | 'info' | 'warning' | 'danger'> =
  {
    Current: 'success',
    Proposed: 'info',
    Alternative: 'warning',
    Archived: 'danger',
  };

export function TableFiltering() {
  return (
    <IressTable
      caption="My investments"
      compact
      rows={[
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
      ]}
      columns={[
        {
          key: 'investment_name',
          label: 'Investment',
          divider: true,
          filter: true,
          sort: true,
        },
        {
          key: 'status',
          label: 'Status',
          filter: {
            defaultValue: ['Current', 'Proposed'],
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
          filter: true,
        },
        {
          key: 'totalPercentage',
          label: 'Share',
          format: 'percent',
          sort: true,
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
}

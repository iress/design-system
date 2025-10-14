import {
  IressButton,
  IressIcon,
  IressTable,
  IressTableBody,
  TableColumn,
} from '@/main';

interface Liability {
  owner: string;
  type: string;
  provider?: string;
  status: string;
  outstanding: number;
  interestRate: number;
  repayment: number;
  frequency: string;
}

const currentLiabilities = [
  {
    owner: 'Client',
    type: 'Credit card',
    status: 'Current',
    outstanding: 5000,
    interestRate: 0,
    repayment: 300,
    frequency: 'Monthly',
  },
];

const longTermLiabilities = [
  {
    owner: 'Joint',
    type: 'Primary residence mortgage',
    provider: 'Other',
    status: 'Current',
    outstanding: 1000000,
    interestRate: 0,
    repayment: 0,
    frequency: 'Monthly',
  },
  {
    owner: 'Joint',
    type: 'Buy to let mortgage',
    status: 'Current',
    outstanding: 1000000,
    interestRate: 0,
    repayment: 0,
    frequency: 'Monthly',
  },
  {
    owner: 'Joint',
    type: 'Buy to let mortgage',
    status: 'Current',
    outstanding: 5000,
    interestRate: 0,
    repayment: 0,
    frequency: 'Monthly',
  },
];

const contingentLiabilities = [
  {
    owner: 'Partner',
    type: 'Limited',
    status: 'Current',
    outstanding: 1000,
    interestRate: 0,
    repayment: 100,
    frequency: 'Monthly',
  },
];

const columns: TableColumn<Liability>[] = [
  {
    key: 'owner',
    label: 'Owner',
    width: '75px',
  },
  {
    key: 'type',
    label: 'Type',
    width: '100px',
  },
  {
    key: 'provider',
    label: 'Provider',
  },
  {
    key: 'status',
    label: 'Status',
    divider: true,
  },
  {
    key: 'frequency',
    label: 'Frequency',
  },
  {
    key: 'outstanding',
    label: 'Outstanding (GBP)',
    format: 'currency',
    currencyCode: '',
    sort: true,
  },
  {
    key: 'interestRate',
    label: 'Interest rate p.a.',
    format: 'percent',
    align: 'right',
    sort: true,
  },
  {
    key: 'repayment',
    label: 'Repayment (GBP)',
    format: 'currency',
    currencyCode: '',
    sort: true,
  },
];

export const TableGroupedRows = () => (
  <IressTable caption="My liabilities">
    <IressTableBody
      rows={currentLiabilities}
      columns={columns}
      caption="Current liabilities"
      scope="col"
      open
    >
      <IressButton mode="tertiary" prepend={<IressIcon name="plus-circle" />}>
        Add current liability
      </IressButton>
    </IressTableBody>
    <IressTableBody
      rows={longTermLiabilities}
      columns={columns}
      caption="Long term liabilities"
      scope="col"
    >
      <IressButton mode="tertiary" prepend={<IressIcon name="plus-circle" />}>
        Add long term liability
      </IressButton>
    </IressTableBody>
    <IressTableBody
      rows={contingentLiabilities}
      columns={columns}
      caption="Contingent liabilities"
      scope="col"
    >
      <IressButton mode="tertiary" prepend={<IressIcon name="plus-circle" />}>
        Add contingent liability
      </IressButton>
    </IressTableBody>
  </IressTable>
);

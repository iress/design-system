import { IressTable } from '@/main';

export const CurrencyInTable = () => {
  return (
    <IressTable
      caption="My investments"
      columns={[
        {
          key: 'investmentName',
          label: 'Investment Name',
          format: 'string',
          width: '30%',
        },
        {
          key: 'investmentDate',
          label: 'Investment Date',
          format: 'date',
          width: '30%',
        },
        {
          key: 'totalPercentage',
          label: 'Total %',
          format: 'percent',
          width: '15%',
        },
        {
          key: 'amount',
          label: 'Investment Amount (AUD)',
          format: 'currency',
          currencyCode: '',
          width: '25%',
        },
      ]}
      rows={[
        {
          investmentName: 'US Stocks',
          investmentDate: '2019-09-23',
          totalPercentage: 24.8,
          amount: 23898,
        },
        {
          investmentName: 'US Bonds',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 26382.456,
        },
        {
          investmentName: 'AU Stocks',
          investmentDate: '2019-02-05',
          totalPercentage: 26.2,
          amount: 9342.1569,
        },
        {
          investmentName: 'UK Stocks',
          investmentDate: '2020-06-28',
          totalPercentage: 49,
          amount: 49751.4,
        },
      ]}
    />
  );
};

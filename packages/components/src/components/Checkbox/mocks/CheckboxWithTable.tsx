import { IressCheckbox, IressTable } from '@/main';

export function CheckboxWithTable() {
  return (
    <IressTable
      caption="List of investments"
      columns={[
        {
          format: (value: boolean) => (
            <IressCheckbox defaultChecked={value} hiddenLabel>
              Toggle row
            </IressCheckbox>
          ),
          key: 'select',
          label: 'Select',
          sort: true,
        },
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' },
        { key: 'cost', label: 'Cost' },
      ]}
      rows={[
        {
          select: false,
          name: 'Artemis Fund Managers Limited',
          date: '2019-09-23',
          cost: 23898.12,
        },
        {
          select: true,
          name: 'CASH.CASH',
          date: '2020-06-28',
          cost: 49751.43,
        },
      ]}
    />
  );
}

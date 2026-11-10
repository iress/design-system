import { IressTable, IressTableFormattedValue } from '@/main';

export function TableFormattedValueExample() {
  return (
    <IressTable
      caption="IressTableFormattedValue"
      rows={[
        {
          format: 'string',
          example: <IressTableFormattedValue value="Hello" format="string" />,
        },
        {
          format: 'number',
          example: <IressTableFormattedValue value={10000} format="number" />,
        },
        {
          format: 'date',
          example: (
            <IressTableFormattedValue value="2024-01-15" format="date" />
          ),
        },
        {
          format: 'currency',
          example: <IressTableFormattedValue value={10000} format="currency" />,
        },
        {
          format: 'percent',
          example: <IressTableFormattedValue value={50} format="percent" />,
        },
      ]}
    />
  );
}

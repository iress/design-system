import { IressPill, IressTable } from '@/main';

const renderColumn = (value: string) => <IressPill>{value}</IressPill>;

// https://blog.devgenius.io/javascript-date-subtract-seconds-83b3285b7959
const subtractSeconds = (date: Date, seconds: number) => {
  // make copy with Date() constructor
  const dateCopy = new Date(date);
  dateCopy.setSeconds(date.getSeconds() - seconds);
  return dateCopy;
};

const tenSecondsAgo = subtractSeconds(new Date(), 10);

export function TableFormats() {
  return (
    <IressTable
      caption="Available formats"
      compact
      rows={[
        {
          string: 'Hello, world!',
          number: 123456,
          date: '2020-06-28',
          shortDate: '2020-06-28',
          isoDateTime: '2020-06-28',
          relativeTime: tenSecondsAgo,
          currency: 123456.78,
          percent: 12,
          custom: 'Custom',
        },
      ]}
      columns={[
        { key: 'string', label: 'String', format: 'string' },
        { key: 'number', label: 'Number', format: 'number' },
        { key: 'date', label: 'Date', format: 'date' },
        { key: 'shortDate', label: 'Short date', format: 'shortDate' },
        { key: 'isoDateTime', label: 'ISO Date & Time', format: 'isoDateTime' },
        { key: 'relativeTime', label: 'Relative time', format: 'relativeTime' },
        {
          key: 'currency',
          label: 'Currency (AUD)',
          format: 'currency',
          currencyCode: '',
        },
        { key: 'percent', label: 'Percent', format: 'percent' },
        {
          key: 'custom',
          label: 'Custom',
          format: renderColumn,
        },
      ]}
    />
  );
}

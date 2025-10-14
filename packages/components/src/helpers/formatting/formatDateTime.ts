import { type DateValue, formatShortDate, getDateObj } from './formatDate';

export const formatISODateTime = (dateVal: DateValue): string => {
  const date = getDateObj(dateVal);
  const realDay = date.getDate();

  if (!realDay) return '';

  const year = date.toLocaleString('default', {
    year: 'numeric',
    timeZone: 'UTC',
  });
  const month = date.toLocaleString('default', {
    month: '2-digit',
    timeZone: 'UTC',
  });
  const day = date.toLocaleString('default', {
    day: '2-digit',
    timeZone: 'UTC',
  });

  const time = date.toLocaleString('default', {
    timeStyle: 'medium',
    hour12: false,
    timeZone: 'UTC',
  });
  let timeZone = date
    .toLocaleDateString('default', {
      day: '2-digit',
      timeZoneName: 'long',
      timeZone: 'UTC',
    })
    .substring(4)
    .match(/\b(\w)/g)
    ?.join('');

  if (timeZone === 'CUT') {
    timeZone = 'UTC';
  }

  return `${year}-${month}-${day} ${time} (${timeZone})`;
};

// https://www.builder.io/blog/relative-time
export const formatRelativeTime = (
  dateVal: DateValue,
  useShortDateAfter: Intl.RelativeTimeFormatUnit | null = 'week',
): string => {
  const date = getDateObj(dateVal);
  const timeMs = date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );

  // If useShortDateAfter is set and the relative time is greater than it, change to short date format
  if (
    unitIndex > 0 &&
    useShortDateAfter &&
    unitIndex >= units.indexOf(useShortDateAfter)
  ) {
    return formatShortDate(dateVal);
  }

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat('default', { numeric: 'auto' });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
};

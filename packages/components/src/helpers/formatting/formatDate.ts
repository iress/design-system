export const pad = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

export type DateValue = string | number | Date;

export const getDateObj = (value: DateValue): Date => {
  if (typeof value === 'object') return value;
  const dtVal =
    typeof value === 'string' && !value.includes('-')
      ? parseInt(value, 10)
      : value;
  return new Date(dtVal);
};

export const formatDate = (dateVal: DateValue): string => {
  const dtObj = getDateObj(dateVal);
  let day: number | string = dtObj.getDate();
  if (!day) return '';
  day = pad(day);
  const month = pad(dtObj.getMonth() + 1);
  const year = dtObj.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatShortDate = (dateVal: DateValue): string => {
  const date = getDateObj(dateVal);
  const day = date.getDate();

  if (!day) return '';

  const month = date.toLocaleString('default', { month: 'short' });

  return `${day} ${month} ${date.getFullYear()}`;
};

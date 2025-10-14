export const formatPercentage = (value: number | string): string => {
  const numValue = typeof value === 'number' ? value : Number(value);
  if (!numValue) return '0%';
  return `${numValue}%`;
};

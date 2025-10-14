export const timeStringToNumber = (timeStr: string): number => {
  if (timeStr.indexOf('s') !== timeStr.length - 1) return 0;
  if (timeStr.includes('ms')) {
    return parseInt(timeStr.replace('ms', ''), 10);
  }
  return parseFloat(timeStr.replace('s', '')) * 1000;
};

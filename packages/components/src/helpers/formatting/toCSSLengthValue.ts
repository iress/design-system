export const toCSSLengthValue = (val: string | number) => {
  const stringVal = String(val);

  if (/^\d+$/.test(stringVal)) {
    return `${stringVal}px`;
  }
  return stringVal;
};

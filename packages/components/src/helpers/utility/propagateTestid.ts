export const propagateTestid = (
  dataTestid: string | undefined,
  id: string,
  separator = '__',
): string | undefined => {
  return dataTestid ? `${dataTestid}${separator}${id}` : undefined;
};

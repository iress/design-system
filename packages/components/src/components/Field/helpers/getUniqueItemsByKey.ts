export const getUniqueItemsByKey = <T = Record<string, unknown>>(
  array: T[],
  key: keyof T,
) => {
  return [
    ...new Map(
      array
        .filter(Boolean)
        .reverse()
        .map((item) => [item[key], item]),
    ).values(),
  ].reverse();
};

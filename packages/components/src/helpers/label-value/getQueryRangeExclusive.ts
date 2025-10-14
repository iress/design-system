import fuzzysort from 'fuzzysort';

/**
 * Get the range of label where the query is not found.
 * This is useful for highlighting the area of the label that does not match the query.
 * @param query
 * @param label
 * @returns [start: number, end: number] | undefined
 */
export const getQueryRangeExclusive = (
  query: string,
  label: string,
): [start: number, end: number] | undefined => {
  const result = fuzzysort.single(query, label);

  if (!result) {
    return;
  }

  const indexes = result.indexes;

  if (indexes[0] !== 0) return [0, label.length];

  return [
    Math.max(...indexes.map((index) => index.valueOf())) + 1,
    label.length,
  ];
};

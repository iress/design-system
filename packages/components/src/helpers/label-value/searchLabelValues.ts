import { type FormattedLabelValueMeta, type LabelValue } from '@/interfaces';
import fuzzysort from 'fuzzysort';
import { highlightQueryInLabelValue } from '@helpers/label-value/highlightQueryInLabelValue';

export const searchLabelValues = (
  query: string,
  optionsData: LabelValue[],
  resultLimit?: number,
): FormattedLabelValueMeta[] => {
  const results = fuzzysort.go(query, optionsData, {
    key: 'label',
    limit: resultLimit,
    threshold: -5000,
  });

  return results.map((result) => highlightQueryInLabelValue(result.obj, query));
};

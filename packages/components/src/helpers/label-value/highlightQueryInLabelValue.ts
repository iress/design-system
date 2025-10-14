import { type ElementType } from 'react';
import {
  type FormattedLabelValueMeta,
  type LabelValueMeta,
} from '@/interfaces';
import { highlightQueryInLabel } from '@helpers/label-value/highlightQueryInLabel';

export const highlightQueryInLabelValue = (
  labelValueMeta: LabelValueMeta,
  query: string,
  Tag?: ElementType,
): FormattedLabelValueMeta => ({
  ...labelValueMeta,
  formattedLabel: highlightQueryInLabel(labelValueMeta.label, query, Tag),
  formattedMeta:
    typeof labelValueMeta.meta === 'string'
      ? highlightQueryInLabel(labelValueMeta.meta, query, Tag)
      : undefined,
});

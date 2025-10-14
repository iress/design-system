import { ElementType, ReactNode } from 'react';
import fuzzysort from 'fuzzysort';

export const highlightQueryInLabel = (
  label: string,
  query: string,
  Tag: ElementType = 'b',
): ReactNode => {
  return (
    fuzzysort
      .single(query, label)
      ?.highlight((match, i) => <Tag key={i}>{match}</Tag>) ?? label
  );
};

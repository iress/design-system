import { type AutocompleteNoResultsProps } from '../Autocomplete.types';
import defaultStyles from '../Autocomplete.module.scss';

export const AutocompleteNoResults = ({
  noResultsText,
  styles = defaultStyles,
}: AutocompleteNoResultsProps) => {
  if (typeof noResultsText === 'string') {
    return <div className={styles.noResults}>{noResultsText}</div>;
  }

  return noResultsText;
};

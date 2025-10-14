import { IressSelectMenu } from '@/components/RichSelect';
import { type ComboboxResultsProps } from '../Combobox.types';
import styles from '../Combobox.module.scss';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { AutocompleteNoResults } from '@/components/Autocomplete/components/AutocompleteNoResults';

export const ComboboxResults = ({
  append,
  dataTestId,
  noResultsText,
  prepend,
  showNoResults,
  showResults,
  ...restProps
}: ComboboxResultsProps) => (
  <>
    {showResults && (
      <>
        {prepend}
        <IressSelectMenu
          {...restProps}
          className={styles.optionList}
          data-testid={propagateTestid(dataTestId, 'menu')}
        />
        {append}
      </>
    )}
    {showNoResults && (
      <AutocompleteNoResults noResultsText={noResultsText} styles={styles} />
    )}
  </>
);

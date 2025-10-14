import { useMemo, type ReactNode } from 'react';
import { composeLabelValueDescriptor } from '@helpers/label-value/composeLabelValueDescriptor';

import { type IressHTMLAttributes, type LabelValueMeta } from '@/interfaces';
import { type AutocompleteSearchHookReturn } from '../../Autocomplete';
import { type IressPopoverProps } from '../../Popover';
import { css } from '@/styled-system/css';

export interface FilterResultsDescriptorProps
  extends Partial<Pick<AutocompleteSearchHookReturn, 'loading' | 'results'>>,
    Pick<IressPopoverProps, 'show'>,
    Omit<IressHTMLAttributes, 'children' | 'className' | 'results'> {
  /**
   * Text to be displayed when no results are found.
   */
  noResultsText?: ReactNode;

  /**
   * Value of selected option for controlled combobox.
   */
  value?: LabelValueMeta;
}

export const FilterResultsDescriptor = ({
  loading,
  noResultsText = 'No results',
  results = [],
  show,
  value,
  ...restProps
}: FilterResultsDescriptorProps) => {
  const resultsDescriptor = useMemo(() => {
    if (loading) return 'loading';
    if (show && !results.length) return noResultsText;
    if (show && results.length)
      return composeLabelValueDescriptor(results, '{{numOptions}} results');
    return composeLabelValueDescriptor(value) || 'None selected';
  }, [loading, noResultsText, results, show, value]);

  return (
    <div {...restProps} className={css({ srOnly: true })}>
      {resultsDescriptor}
    </div>
  );
};

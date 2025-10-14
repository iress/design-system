import { type ComboboxResultsDescriptorProps } from '../Combobox.types';
import { useMemo } from 'react';
import { GlobalCSSClass } from '@/main';
import { composeLabelValueDescriptor } from '@helpers/label-value/composeLabelValueDescriptor';

export const ComboboxResultsDescriptor = ({
  loading,
  noResultsText = 'No results',
  results = [],
  show,
  value,
  ...restProps
}: ComboboxResultsDescriptorProps) => {
  const resultsDescriptor = useMemo(() => {
    if (loading) return 'loading';
    if (show && !results.length) return noResultsText;
    if (show && results.length)
      return composeLabelValueDescriptor(results, '{{numOptions}} results');
    return composeLabelValueDescriptor(value) || 'None selected';
  }, [loading, noResultsText, results, show, value]);

  return (
    <div {...restProps} className={GlobalCSSClass.SROnly}>
      {resultsDescriptor}
    </div>
  );
};

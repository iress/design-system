import { IressCheckbox } from '..';
import { idsLogger } from '@helpers/utility/idsLogger';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';
import { type LabelValue } from '@/interfaces';

/**
 *  @deprecated This function has been deprecated and will be removed in a future version of IDS, please map and render the items array directly in your application instead
 */
export const mapCheckboxGroupOptions = (
  items: LabelValue[],
): React.ReactNode[] | null => {
  if (!items?.length) {
    return null;
  }

  idsLogger(
    'IressCheckboxGroup: mapCheckboxGroupOptions has been deprecated and will be removed in a future version of IDS, please map and render the items array directly in your application instead',
    'warn',
  );

  return items.map(({ label, testId, value }: LabelValue, index) => (
    <IressCheckbox
      value={value}
      key={label || getFormControlValueAsString(value) || index}
      data-testid={testId}
    >
      {label}
    </IressCheckbox>
  ));
};

import { type SelectOption } from '..';
import { idsLogger } from '@helpers/utility/idsLogger';
import { IressSelectOption } from '..';

export const mapSelectOptions = (
  items: SelectOption[],
): JSX.Element[] | null => {
  idsLogger(
    'IressSelect: mapSelectOptions has been deprecated and will be removed in a future version of IDS, please map and render the items array directly in your application instead.',
    'warn',
  );

  if (!items?.length) {
    return null;
  }

  return items.map((item, key) => renderOptionOrOptGroup(item, key));
};

export const renderOptionOrOptGroup = (
  { children, label, onClick, testId, value }: SelectOption,
  key?: number,
): JSX.Element => {
  if (children) {
    return (
      <optgroup label={String(label)} key={key}>
        {mapSelectOptions(children)}
      </optgroup>
    );
  }

  return (
    <IressSelectOption
      key={key}
      onClick={onClick}
      data-testid={testId ? `${testId}` : undefined}
      value={value}
    >
      {label}
    </IressSelectOption>
  );
};

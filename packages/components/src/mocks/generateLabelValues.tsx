import { IressText } from '@/main';
import { LabelValue, LabelValueMeta } from '../interfaces';

export const MOCK_LABEL_VALUES_LENGTH = 5;
export const MOCK_LABELS = generateLabels();
export const MOCK_LABEL_VALUES = generateLabelValues();
export const MOCK_LABEL_VALUE_META = generateLabelValueMeta();
export const MOCK_LARGE_LABEL_VALUES_DATASET = generateLabelValueMeta(15);

export function generateLabels(
  amount = MOCK_LABEL_VALUES_LENGTH,
): LabelValue[] {
  return [...Array(amount).keys()].map((number) => ({
    label: `Option ${number + 1}`,
  }));
}

export function generateLabelValues(
  amount = MOCK_LABEL_VALUES_LENGTH,
  valueAppend = '',
): LabelValue[] {
  return [...Array(amount).keys()].map((number) => ({
    label: `Option ${number + 1}`,
    value: `${valueAppend}${String(number + 1)}`,
  }));
}

export function generateLabelValueMeta(
  amount = MOCK_LABEL_VALUES_LENGTH,
  withMeta = true,
  label = 'Option',
  prepend: React.ReactNode = undefined,
): LabelValueMeta[] {
  return [...Array(amount).keys()].map((number) => {
    const item: LabelValueMeta = {
      label: `${label} ${number + 1}`,
      value: String(number + 1),
    };

    if (withMeta) {
      item.meta = [
        'Some',
        <IressText
          key={`${number}-active`}
          color="colour.system.success.text"
          textStyle="typography.body.sm"
        >
          Active
        </IressText>,
      ];
    }

    if (prepend) {
      item.prepend = prepend;
    }

    return item;
  });
}

export const mockAsyncSearchLabelValues = (
  items = MOCK_LABEL_VALUES,
): Promise<LabelValueMeta[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(items);
    }, 250);
  });

import { type LabelValue } from '@/interfaces';

export const MOCK_RADIO_OPTIONS_LENGTH = 3;
export const MOCK_RADIO_OPTIONS = generateRadioOptions();

export function generateRadioOptions(
  amount = MOCK_RADIO_OPTIONS_LENGTH,
  valueAppend = '',
): LabelValue[] {
  return [...Array(amount).keys()].map((number) => ({
    label: `Option ${number + 1}`,
    value: `${valueAppend}${String(number + 1)}`,
  }));
}

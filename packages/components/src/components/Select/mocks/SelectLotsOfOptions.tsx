import { IressSelect } from '@/main';
import type { LabelValueMeta } from '@/main';

const generateOptions = (count: number): LabelValueMeta[] =>
  Array.from({ length: count }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option-${i + 1}`,
  }));

const options = async () => Promise.resolve(generateOptions(200));

export function SelectLotsOfOptions() {
  return (
    <IressSelect
      options={options}
      placeholder="Select from 200 options"
      autoHighlight={false}
      container={document.body}
    />
  );
}

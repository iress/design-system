import { IressRichSelect } from '@/main';

const manyInitialOptions = Array.from({ length: 30 }, (_, i) => ({
  value: i + 1,
  label: `option ${i + 1}`,
}));

export const SelectManyInitialOptions = () => (
  <IressRichSelect
    container={document.body}
    initialOptions={manyInitialOptions}
    multiSelect
    options={(query) =>
      Promise.resolve(
        query
          ? manyInitialOptions.filter((option) =>
              option.label.toLowerCase().includes(query.toLowerCase()),
            )
          : [],
      )
    }
    virtualFocus={false}
  />
);

import { getUniqueItemsByKey } from './getUniqueItemsByKey';

describe('getUniqueItemsByKey', () => {
  it('returns only the first item if it finds duplicates', () => {
    const arrayWithDuplicates = [
      { value: '1' },
      { value: '1', label: 'other' },
      { value: '1', label: 'other 3' },
    ];

    expect(getUniqueItemsByKey(arrayWithDuplicates, 'value')).toEqual([
      arrayWithDuplicates[0],
    ]);
  });

  it('returns items in the correct order', () => {
    const arrayWithDuplicates = [
      { value: '1' },
      { value: '1', label: 'other' },
      { value: '2', label: 'other 3' },
    ];

    expect(getUniqueItemsByKey(arrayWithDuplicates, 'value')).toEqual([
      arrayWithDuplicates[0],
      arrayWithDuplicates[2],
    ]);
  });
});

import { getQueryRangeExclusive } from './getQueryRangeExclusive';

describe('getQueryRangeExclusive', () => {
  it('returns undefined if query not found in label', () => {
    expect(getQueryRangeExclusive('not', 'found')).toBe(undefined);
  });

  it('returns entire label range if found inside the label', () => {
    expect(getQueryRangeExclusive('not', 'found not')).toStrictEqual([0, 9]);
  });

  it('returns label range from after query if found at start of label', () => {
    expect(getQueryRangeExclusive('found', 'found and more')).toStrictEqual([
      5, 14,
    ]);
  });
});

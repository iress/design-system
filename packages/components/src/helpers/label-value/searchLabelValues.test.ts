import { searchLabelValues } from './searchLabelValues';
import { generateLabelValueMeta } from '@/mocks/generateLabelValues';

describe('searchLabelValues', () => {
  it('returns no items if query is empty', () => {
    const items = searchLabelValues('', generateLabelValueMeta());
    expect(items).toHaveLength(0);
  });

  it('returns no items if they do not match query', () => {
    const items = searchLabelValues('Query', generateLabelValueMeta());
    expect(items).toHaveLength(0);
  });

  it('returns matching items for query', () => {
    const items = searchLabelValues('2', generateLabelValueMeta());
    expect(items).toHaveLength(1);
  });
});

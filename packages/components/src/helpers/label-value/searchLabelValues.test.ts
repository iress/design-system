import { searchLabelValues } from './searchLabelValues';
import {
  generateLabelValueMeta,
  MOCK_LABEL_VALUES_LENGTH,
} from '@/mocks/generateLabelValues';

describe('searchLabelValues', () => {
  it('returns all items if query is empty', () => {
    const items = searchLabelValues('', generateLabelValueMeta());
    expect(items).toHaveLength(MOCK_LABEL_VALUES_LENGTH);
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

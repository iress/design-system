import { composeTableInitialColumnFilters } from './composeTableInitialColumnFilters';

describe('composeTableInitialColumnFilters', () => {
  it('returns empty array if no columns provided', () => {
    const filters = composeTableInitialColumnFilters();
    expect(filters).toEqual([]);
  });

  it('returns empty array if no column has defaultValue', () => {
    const filters = composeTableInitialColumnFilters([
      { key: 'name', filter: true },
      { key: 'status' },
    ]);
    expect(filters).toEqual([]);
  });

  it('ignores columns with an empty defaultValue array', () => {
    const filters = composeTableInitialColumnFilters([
      { key: 'status', filter: { defaultValue: [] } },
    ]);
    expect(filters).toEqual([]);
  });

  it('returns a column filter entry for a column with defaultValue', () => {
    const filters = composeTableInitialColumnFilters([
      { key: 'status', filter: { defaultValue: ['Current', 'Proposed'] } },
    ]);
    expect(filters).toEqual([{ id: 'status', value: ['Current', 'Proposed'] }]);
  });

  it('returns multiple column filter entries when multiple columns have defaultValue', () => {
    const filters = composeTableInitialColumnFilters([
      { key: 'status', filter: { defaultValue: ['Current'] } },
      { key: 'name' },
      { key: 'type', filter: { defaultValue: ['A', 'B'] } },
    ]);
    expect(filters).toEqual([
      { id: 'status', value: ['Current'] },
      { id: 'type', value: ['A', 'B'] },
    ]);
  });
});

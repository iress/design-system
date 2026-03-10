import { composeTableInitialColumnFilters } from './composeTableInitialColumnFilters';

describe('composeTableInitialColumnFilters', () => {
  it('returns empty array if no columns provided', () => {
    const filters = composeTableInitialColumnFilters();
    expect(filters).toEqual([]);
  });

  it('returns empty array if no column has defaultFilter', () => {
    const filters = composeTableInitialColumnFilters([
      { key: 'name', filter: true },
      { key: 'status' },
    ]);
    expect(filters).toEqual([]);
  });

  it('ignores columns with an empty defaultFilter array', () => {
    const filters = composeTableInitialColumnFilters([
      { key: 'status', filter: true, defaultFilter: [] },
    ]);
    expect(filters).toEqual([]);
  });

  it('returns a column filter entry for a column with defaultFilter', () => {
    const filters = composeTableInitialColumnFilters([
      { key: 'status', filter: true, defaultFilter: ['Current', 'Proposed'] },
    ]);
    expect(filters).toEqual([{ id: 'status', value: ['Current', 'Proposed'] }]);
  });

  it('returns multiple column filter entries when multiple columns have defaultFilter', () => {
    const filters = composeTableInitialColumnFilters([
      { key: 'status', defaultFilter: ['Current'] },
      { key: 'name' },
      { key: 'type', defaultFilter: ['A', 'B'] },
    ]);
    expect(filters).toEqual([
      { id: 'status', value: ['Current'] },
      { id: 'type', value: ['A', 'B'] },
    ]);
  });
});

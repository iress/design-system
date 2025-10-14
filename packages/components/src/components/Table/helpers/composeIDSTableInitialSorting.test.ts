import { composeIDSTableInitialSorting } from './composeIDSTableInitialSorting';

describe('composeIDSTableInitialSorting', () => {
  it('returns empty array if no columns provided', () => {
    const sorting = composeIDSTableInitialSorting();
    expect(sorting).toEqual([]);
  });

  it('ignores elements that have a sort boolean', () => {
    const sorting = composeIDSTableInitialSorting({
      test: {
        sort: true,
      },
    });
    expect(sorting).toEqual([]);
  });

  it('adds elements with their direction sorting', () => {
    const sorting = composeIDSTableInitialSorting({
      test: {
        sort: 'desc',
      },
      test2: {
        sort: 'asc',
      },
    });
    expect(sorting).toEqual([
      { id: 'test', desc: true },
      { id: 'test2', desc: false },
    ]);
  });

  it('works with an array of columns', () => {
    const sorting = composeIDSTableInitialSorting([
      {
        key: 'test',
        sort: 'desc',
      },
      {
        key: 'test2',
        sort: 'asc',
      },
    ]);
    expect(sorting).toEqual([
      { id: 'test', desc: true },
      { id: 'test2', desc: false },
    ]);
  });
});

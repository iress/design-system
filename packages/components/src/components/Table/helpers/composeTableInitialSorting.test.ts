import { composeTableInitialSorting } from './composeTableInitialSorting';

describe('composeTableInitialSorting', () => {
  it('returns empty array if no columns provided', () => {
    const sorting = composeTableInitialSorting();
    expect(sorting).toEqual([]);
  });

  it('ignores elements that have a sort boolean', () => {
    const sorting = composeTableInitialSorting([
      {
        key: 'test',
        sort: true,
      },
    ]);
    expect(sorting).toEqual([]);
  });

  it('adds elements with their direction sorting', () => {
    const sorting = composeTableInitialSorting([
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

  it('works with an array of columns', () => {
    const sorting = composeTableInitialSorting([
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

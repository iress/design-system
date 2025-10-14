import { hasColumns } from './hasColumns';

describe('hasColumns', () => {
  it('returns false if no columns provided', () => {
    const result = hasColumns(undefined);
    expect(result).toEqual(false);
  });

  it('returns true if array of columns provided', () => {
    const result = hasColumns([{ key: 'test' }]);
    expect(result).toEqual(true);
  });

  it('returns true if object mapped columns provided', () => {
    const result = hasColumns({ test: {} });
    expect(result).toEqual(true);
  });
});

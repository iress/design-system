import { findColumnByKey } from './findColumnByKey';

describe('findColumnByKey', () => {
  it('returns column by key from an array of columns', () => {
    const columns = [{ key: 'test' }];
    const result = findColumnByKey('test', columns);

    expect(result).toEqual(columns[0]);
  });

  it('returns column by key from an object map of columns', () => {
    const columns = { test: {} };
    const result = findColumnByKey('test', columns);

    expect(result).toEqual(columns.test);
  });
});

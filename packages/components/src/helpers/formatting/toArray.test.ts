import { toArray } from './toArray';

describe('toArray', () => {
  it('array is passed in => returns array', () => {
    const item: never[] = [];
    const itemArray = toArray(item);
    expect(itemArray).toBe(item);
  });

  it('truthy or null item passed in => returns an array with the single truthy item', () => {
    expect(toArray('hello')).toEqual(['hello']);
    expect(toArray(null)).toEqual([null]);
  });

  it('undefined item passed in => returns an empty array', () => {
    const item = undefined;
    const itemArray = toArray(item);
    expect(itemArray).toEqual([]);
  });
});

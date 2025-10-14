import { propagateTestid } from './propagateTestid';

describe('propagateTestid', () => {
  it('creates a testid if string passed', () => {
    expect(propagateTestid('hello', 'there')).toBe('hello__there');
  });

  it('changes the separator if passed', () => {
    expect(propagateTestid('hello', 'there', '-')).toBe('hello-there');
  });

  it('does not create a testid if data-testid is not in props', () => {
    expect(propagateTestid(undefined, 'there')).toBe(undefined);
  });
});

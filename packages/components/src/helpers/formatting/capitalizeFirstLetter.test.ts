import { capitalizeFirstLetter } from './capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('capitalises the first letter', () => {
    const capitalised = capitalizeFirstLetter('hello');
    expect(capitalised).toEqual('Hello');
  });

  it('returns empty string if passed an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});

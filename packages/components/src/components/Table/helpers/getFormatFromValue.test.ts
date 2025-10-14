import { getFormatFromValue } from './getFormatFromValue';

describe('getFormatFromValue', () => {
  it('returns the correct formats based on the value', () => {
    expect(getFormatFromValue(9)).toBe('number');
    expect(getFormatFromValue('9')).toBe('string');
    expect(getFormatFromValue(new Date())).toEqual('date');
  });
});

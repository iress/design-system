import { timeStringToNumber } from './timeStringToNumber';

describe('timeStringToNumber', () => {
  it('returns milliseconds from seconds', () => {
    expect(timeStringToNumber('1s')).toBe(1000);
    expect(timeStringToNumber('0.3s')).toBe(300);
    expect(timeStringToNumber('.3s')).toBe(300);
  });

  it('returns milliseconds from ms', () => {
    expect(timeStringToNumber('1ms')).toBe(1);
  });

  it('returns 0 for any other unit', () => {
    expect(timeStringToNumber('1unit')).toBe(0);
  });
});

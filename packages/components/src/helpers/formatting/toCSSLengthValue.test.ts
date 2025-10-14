import { toCSSLengthValue } from './toCSSLengthValue';

describe('toCSSLengthValue', () => {
  it('Converts a string with only number to a pixel value', () => {
    expect(toCSSLengthValue('3')).toBe('3px');
  });

  it('Converts a number to a pixel value', () => {
    expect(toCSSLengthValue(3)).toBe('3px');
  });

  it('Uses a string that is not only numbers directly', () => {
    expect(toCSSLengthValue('3%')).toBe('3%');
  });
});

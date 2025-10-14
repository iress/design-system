import { getFormControlValueAsString } from './getFormControlValueAsString';

describe('getFormControlValueAsString', () => {
  it('returns an empty string if undefined or null passed', () => {
    expect(getFormControlValueAsString()).toBe('');
    expect(getFormControlValueAsString(null)).toBe('');
  });

  it('returns stringified value if non-string passed', () => {
    expect(getFormControlValueAsString(9)).toBe('9');
    expect(getFormControlValueAsString(true)).toBe('true');
  });

  it('returns string if string passed', () => {
    expect(getFormControlValueAsString('string')).toBe('string');
  });
});

import { getFormControlValueAsStringIfDefined } from './getFormControlValueAsStringIfDefined';

describe('getFormControlValueAsStringIfDefined', () => {
  it('returns undefined if undefined passed', () => {
    expect(getFormControlValueAsStringIfDefined()).toBe(undefined);
  });

  it('returns empty string if null passed', () => {
    expect(getFormControlValueAsStringIfDefined(null)).toBe('');
  });

  it('returns stringified value if non-string passed', () => {
    expect(getFormControlValueAsStringIfDefined(9)).toBe('9');
    expect(getFormControlValueAsStringIfDefined(true)).toBe('true');
  });

  it('returns string if string passed', () => {
    expect(getFormControlValueAsStringIfDefined('string')).toBe('string');
  });
});

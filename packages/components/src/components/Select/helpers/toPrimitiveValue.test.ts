import { toPrimitiveValue } from './toPrimitiveValue';

describe('toPrimitiveValue', () => {
  it('returns undefined for undefined', () => {
    expect(toPrimitiveValue(undefined)).toBeUndefined();
  });

  it('extracts value from a single LabelValueMeta', () => {
    expect(toPrimitiveValue({ label: 'One', value: '1' })).toBe('1');
    expect(toPrimitiveValue({ label: 'Two', value: 2 })).toBe(2);
    expect(toPrimitiveValue({ label: 'Bool', value: true })).toBe(true);
  });

  it('returns null when value is undefined on a single LabelValueMeta', () => {
    expect(toPrimitiveValue({ label: 'No value' })).toBeNull();
  });

  it('extracts values from an array of LabelValueMeta', () => {
    expect(
      toPrimitiveValue<true>([
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
      ]),
    ).toStrictEqual(['1', '2']);
  });

  it('returns null for items without value in an array', () => {
    expect(
      toPrimitiveValue<true>([{ label: 'A', value: 'a' }, { label: 'B' }]),
    ).toStrictEqual(['a', null]);
  });

  it('returns empty array for empty array', () => {
    expect(toPrimitiveValue<true>([])).toStrictEqual([]);
  });
});

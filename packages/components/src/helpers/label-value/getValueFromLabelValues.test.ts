import { getValueFromLabelValues } from './getValueFromLabelValues';

describe('getValueFromLabelValues', () => {
  it('returns undefined if no label values passed in', () => {
    expect(getValueFromLabelValues()).toBe(undefined);
  });

  it('returns single value if label value passed in', () => {
    expect(getValueFromLabelValues({ label: 'label' })).toBe('label');
    expect(getValueFromLabelValues({ label: 'label', value: 'value' })).toBe(
      'value',
    );
    expect(getValueFromLabelValues([{ label: 'label', value: 9 }])).toBe(9);
  });

  it('returns array of values if label value passed in, and array is true', () => {
    expect(getValueFromLabelValues({ label: 'label' }, true)).toStrictEqual([
      'label',
    ]);
    expect(
      getValueFromLabelValues({ label: 'label', value: 'value' }, true),
    ).toStrictEqual(['value']);
    expect(
      getValueFromLabelValues([{ label: 'label', value: 9 }], true),
    ).toStrictEqual([9]);
  });
});

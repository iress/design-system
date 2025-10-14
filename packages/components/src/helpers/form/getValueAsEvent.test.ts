import { getValueAsEvent } from './getValueAsEvent';

describe('getValueAsEvent', () => {
  it('returns value as a target.value object', () => {
    expect(getValueAsEvent(undefined)).toStrictEqual({
      currentTarget: { value: undefined },
      target: { value: undefined },
    });
    expect(getValueAsEvent(1)).toStrictEqual({
      currentTarget: { value: 1 },
      target: { value: 1 },
    });
    expect(getValueAsEvent('One')).toStrictEqual({
      currentTarget: { value: 'One' },
      target: { value: 'One' },
    });
  });
});

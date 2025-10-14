import { composeLabelValueDescriptor } from './composeLabelValueDescriptor';

describe('composeLabelValueDescriptor', () => {
  it('returns empty string or if nothing or empty array provided', () => {
    expect(composeLabelValueDescriptor()).toEqual('');
    expect(composeLabelValueDescriptor([])).toEqual('');
  });

  it('returns the label if a single item provided', () => {
    expect(composeLabelValueDescriptor({ label: 'Hello' })).toEqual('Hello');
    expect(composeLabelValueDescriptor([{ label: 'Hello' }])).toEqual('Hello');
  });

  it('returns the number of its if more than one item provided', () => {
    const items = [{ label: 'Hello' }, { label: 'There' }];
    expect(composeLabelValueDescriptor(items)).toEqual('2 selected');
    expect(composeLabelValueDescriptor(items, '{{numOptions}} active')).toEqual(
      '2 active',
    );
  });
});

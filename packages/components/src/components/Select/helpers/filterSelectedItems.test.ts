import { countItems, filterSelectedItems } from './filterSelectedItems';

const ITEMS = [
  { label: 'Leia', value: 'leia' },
  { label: 'Luke', value: 'luke' },
  { label: 'Han', value: 'han' },
  { label: 'No value' },
];

const GROUPED_ITEMS = [
  {
    label: 'Rebels',
    children: [
      { label: 'Leia', value: 'leia' },
      { label: 'Luke', value: 'luke' },
    ],
  },
  {
    label: 'Bounty hunters',
    children: [
      { label: 'Bossk', value: 'bossk' },
      { label: 'Boba', value: 'boba' },
    ],
  },
  { label: 'Han', value: 'han' },
];

describe('filterSelectedItems', () => {
  it('returns all items when nothing is selected', () => {
    expect(filterSelectedItems(ITEMS)).toStrictEqual(ITEMS);
    expect(filterSelectedItems(ITEMS, [])).toStrictEqual(ITEMS);
  });

  it('removes selected flat items by value or label', () => {
    expect(filterSelectedItems(ITEMS, ['leia', 'No value'])).toStrictEqual([
      { label: 'Luke', value: 'luke' },
      { label: 'Han', value: 'han' },
    ]);
  });

  it('supports a single selected value', () => {
    expect(filterSelectedItems(ITEMS, 'han')).toHaveLength(3);
  });

  it('removes selected children and empty groups', () => {
    expect(
      filterSelectedItems(GROUPED_ITEMS, ['leia', 'luke', 'bossk']),
    ).toStrictEqual([
      {
        label: 'Bounty hunters',
        children: [{ label: 'Boba', value: 'boba' }],
      },
      { label: 'Han', value: 'han' },
    ]);
  });
});

describe('countItems', () => {
  it('counts flat items', () => {
    expect(countItems(ITEMS)).toBe(4);
  });

  it('counts children of grouped items rather than groups', () => {
    expect(countItems(GROUPED_ITEMS)).toBe(5);
  });

  it('returns 0 for no items', () => {
    expect(countItems([])).toBe(0);
  });
});

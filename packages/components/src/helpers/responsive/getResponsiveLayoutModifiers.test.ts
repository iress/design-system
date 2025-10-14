import { getResponsiveLayoutModifiers } from './getResponsiveLayoutModifiers';

describe('getResponsiveLayoutModifiers', () => {
  it('returns an empty array if no values sent in', () => {
    expect(getResponsiveLayoutModifiers('modifier')).toStrictEqual([]);
  });

  it('returns fallback if no values sent in but fallback available', () => {
    expect(
      getResponsiveLayoutModifiers('modifier', undefined, 'fallback'),
    ).toStrictEqual(['modifier--fallback']);
  });

  it('returns modifier type and value if a string is passed in', () => {
    expect(getResponsiveLayoutModifiers('modifier', 'value')).toStrictEqual([
      'modifier--value',
    ]);
  });

  it('returns modifier type and value if a number is passed in', () => {
    expect(getResponsiveLayoutModifiers('modifier', 9)).toStrictEqual([
      'modifier--9',
    ]);
  });

  it('returns an array of modifier type and value if a ResponsiveSizing object is passed in', () => {
    expect(
      getResponsiveLayoutModifiers('modifier', { xs: 'lg', lg: 'sm' }),
    ).toStrictEqual(['modifier-xs--lg', 'modifier-lg--sm']);
  });

  it('returns an array of modifier type and value if a ResponsiveSizing object is passed in, and adds fallback if set', () => {
    expect(
      getResponsiveLayoutModifiers(
        'modifier',
        { sm: 'lg', lg: 'sm' },
        'fallback',
      ),
    ).toStrictEqual([
      'modifier-xs--fallback',
      'modifier-sm--lg',
      'modifier-lg--sm',
    ]);
  });
});

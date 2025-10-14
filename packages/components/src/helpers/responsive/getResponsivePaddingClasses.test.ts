import { getResponsivePaddingClasses } from './getResponsivePaddingClasses';

describe('getResponsivePaddingClasses', () => {
  it('returns an empty array if value is null', () => {
    expect(getResponsivePaddingClasses(null)).toStrictEqual([]);
  });

  it('returns an array with the correct utility class if value is a string', () => {
    expect(getResponsivePaddingClasses('xs')).toStrictEqual(['iress-p--xs']);
  });

  describe('value as an object', () => {
    it('returns an array of correct utility classes if value is a flat object of responsive values', () => {
      expect(getResponsivePaddingClasses({ xs: 'lg', lg: 'sm' })).toStrictEqual(
        ['iress-p-xs--lg', 'iress-p-lg--sm'],
      );
    });

    it('returns an array of correct utility classes if value is a flat object of axis values', () => {
      expect(getResponsivePaddingClasses({ x: 'lg', y: 'sm' })).toStrictEqual([
        'iress-px--lg',
        'iress-py--sm',
      ]);
    });

    it('returns an array of utility classes if value is a nested object', () => {
      expect(
        getResponsivePaddingClasses({
          xs: { x: 'lg', y: 'sm' },
          lg: { t: 'sm', b: 'lg' },
        }),
      ).toStrictEqual([
        'iress-px-xs--lg',
        'iress-py-xs--sm',
        'iress-pt-lg--sm',
        'iress-pb-lg--lg',
      ]);
    });
  });
});

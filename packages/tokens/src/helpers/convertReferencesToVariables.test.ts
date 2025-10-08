import { convertReferencesToVariables } from './convertReferencesToVariables';

describe('convertReferencesToVariables', () => {
  it('returns undefined if no value', async () => {
    expect(convertReferencesToVariables()).toBe(undefined);
  });

  it('returns value as-is if not a reference', async () => {
    expect(convertReferencesToVariables('14px')).toBe('14px');
  });

  it('transforms references into CSS variables', async () => {
    expect(convertReferencesToVariables('{typography.heading.1}')).toBe(
      'var(--iress-typography-heading-1)',
    );

    expect(
      convertReferencesToVariables('{typography.heading.1 || sans-serif}'),
    ).toBe('var(--iress-typography-heading-1, sans-serif)');

    expect(
      convertReferencesToVariables(
        'calc({typography.heading.1} + {typography.heading.2 || 0rem})',
      ),
    ).toBe(
      'calc(var(--iress-typography-heading-1) + var(--iress-typography-heading-2, 0rem))',
    );
  });
});

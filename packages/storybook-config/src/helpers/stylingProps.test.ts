import {
  stylingProps,
  omitStylingProps,
  reactNodeArgType,
  reactElementArgType,
  jsxElementArgType,
  componentTypeArgType,
  customTypeArgType,
} from './stylingProps';

describe('stylingProps', () => {
  it('exports stylingProps with a toggle control', () => {
    expect(stylingProps.stylingProps.control).toBe('boolean');
  });

  it('includes styling prop entries with conditional visibility', () => {
    expect((stylingProps as Record<string, unknown>).m).toEqual(
      expect.objectContaining({ if: { arg: 'stylingProps' } }),
    );
  });
});

describe('omitStylingProps', () => {
  it('excludes specified props', () => {
    const result = omitStylingProps(['m', 'p']);
    expect(result).not.toHaveProperty('m');
    expect(result).not.toHaveProperty('p');
    expect(result).toHaveProperty('mt');
  });
});

describe('arg type helpers', () => {
  it.each([
    ['reactNodeArgType', reactNodeArgType, 'ReactNode'],
    ['reactElementArgType', reactElementArgType, 'ReactElement'],
    ['jsxElementArgType', jsxElementArgType, 'JSX.Element'],
    ['componentTypeArgType', componentTypeArgType, 'ComponentType'],
  ])('%s has correct summary', (_, argType, expected) => {
    expect(argType.table?.type?.summary).toBe(expected);
  });

  it('customTypeArgType creates a custom summary', () => {
    const result = customTypeArgType('string | number');
    expect(result.table?.type?.summary).toBe('string | number');
  });
});

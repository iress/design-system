import { vi } from 'vitest';
import { type Config, type TransformedToken } from 'style-dictionary';
import { Type } from '../enums';
import { type CompositeValue, type IressDesignToken } from '../interfaces';
import { typographyCssShorthand } from './typographyCssShorthand';

vi.mock(import('../schema'), async (importOriginal) => {
  const mod = await importOriginal();

  return {
    ...mod,
    typography: {
      heading: {
        1: {
          $description: 'Some random typography token',
          $type: Type.Typography,
          $value: {
            fontFamily: `{typography.base.headingFont || Ubuntu, sans-serif}`,
            fontSize: `14px`,
            fontWeight: 700,
            lineHeight: 1.3,
          },
        },
      },
    } as unknown as typeof mod.typography,
  };
});

const token: IressDesignToken<CompositeValue['typography']> = {
  $description: 'Some random typography token',
  $type: Type.Typography,
  $value: {
    fontSize: `16px`,
  },
};

const invalidToken: IressDesignToken = {
  $description: 'Some random color token',
  $type: Type.Color,
  $value: 'red',
};

const transformedToken: TransformedToken = {
  ...token,
  name: 'typography.heading.1',
  path: ['typography', 'heading', '1'],
  original: token,
  filePath: '',
  isSource: false,
};

const transformedInvalidToken: TransformedToken = {
  ...invalidToken,
  name: 'color.primary',
  path: ['color', 'primary'],
  original: invalidToken,
  filePath: '',
  isSource: false,
};

const options: Config = {
  usesDtcg: true,
  tokens: {
    typography: {
      heading: {
        1: {
          $description: 'Some random typography token',
          $type: Type.Typography,
          $value: {
            fontFamily: `{typography.base.headingFont || Ubuntu, sans-serif}`,
            fontSize: `14px`,
            fontWeight: 700,
            lineHeight: 1.3,
          },
        },
      },
    },
  },
};

const optionsWithTokens: Config = {
  usesDtcg: true,
  tokens: {
    typography: {
      heading: {
        1: {
          $description: 'Some random typography token',
          $type: Type.Typography,
          $value: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: 1.3,
          },
        },
      },
    },
  },
};

describe('typographyCssShorthand', () => {
  it('only applies to typography tokens', () => {
    const transform = typographyCssShorthand;
    expect(transform.filter?.(transformedToken, options)).toBe(true);
    expect(transform.filter?.(transformedInvalidToken, options)).toBe(false);
  });

  it('uses fallback lookup when token type is undefined', () => {
    const transform = typographyCssShorthand;
    const tokenWithoutType = {
      ...transformedToken,
      $type: undefined,
    };

    expect(transform.filter?.(tokenWithoutType, optionsWithTokens)).toBe(true);

    const invalidTokenWithoutType = {
      ...transformedInvalidToken,
      $type: undefined,
    };

    expect(transform.filter?.(invalidTokenWithoutType, optionsWithTokens)).toBe(
      false,
    );
  });

  it('does not transform a string token', () => {
    const transform = typographyCssShorthand;
    expect(
      transform.transform?.(
        {
          ...transformedToken,
          $value: '14px',
        },
        {},
        options,
      ),
    ).toBe('14px');
  });

  it('returns string value when schema is undefined', () => {
    const transform = typographyCssShorthand;
    const optionsWithoutSchema = { usesDtcg: true };

    expect(
      transform.transform?.(
        {
          ...transformedToken,
          $value: {
            fontSize: '16px',
          },
        },
        {},
        optionsWithoutSchema,
      ),
    ).toBe('[object Object]');
  });

  it('transforms a typography token that is fully defined', () => {
    const transform = typographyCssShorthand;

    expect(
      transform.transform?.(
        {
          ...transformedToken,
          $value: {
            fontFamily: `sans-serif`,
            fontSize: `12px`,
            fontWeight: 100,
            lineHeight: 1,
          },
        },
        {},
        options,
      ),
    ).toBe('100 12px / 1 sans-serif');
  });

  it('transforms a typography token with fontVariant and fontWidth', () => {
    const transform = typographyCssShorthand;

    expect(
      transform.transform?.(
        {
          ...transformedToken,
          $value: {
            fontFamily: 'Arial',
            fontSize: '14px',
            fontWeight: 400,
            fontVariant: 'small-caps',
            fontWidth: 'condensed',
            lineHeight: 1.2,
          },
        },
        {},
        options,
      ),
    ).toBe('small-caps 400 condensed 14px / 1.2 Arial');
  });

  it('transforms a typography token with fontStyle', () => {
    const transform = typographyCssShorthand;

    expect(
      transform.transform?.(
        {
          ...transformedToken,
          $value: {
            fontFamily: 'serif',
            fontSize: '18px',
            fontWeight: 600,
            fontStyle: 'italic',
            lineHeight: 1.4,
          },
        },
        {},
        options,
      ),
    ).toBe('italic 600 18px / 1.4 serif');
  });

  it('transforms a typography token that is partially defined, with the default replacements', () => {
    const transform = typographyCssShorthand;

    expect(transform.transform?.(transformedToken, {}, options)).toBe(
      '700 16px / 1.3 var(--iress-typography-base-heading-font, Ubuntu, sans-serif)',
    );
  });

  it('filters out falsy values from the typography shorthand', () => {
    const transform = typographyCssShorthand;

    expect(
      transform.transform?.(
        {
          ...transformedToken,
          $value: {
            fontFamily: 'monospace',
            fontSize: '13px',
            fontWeight: 500,
            fontStyle: '', // falsy value should be filtered out
            fontVariant: undefined, // undefined should be filtered out
            lineHeight: 1.1,
          },
        },
        {},
        options,
      ),
    ).toBe('500 13px / 1.1 monospace');
  });

  it('transforms a sub-theme token with the correct replacements (removing sub theme from the token reference)', () => {
    const transform = typographyCssShorthand;
    const subThemeToken = {
      ...transformedToken,
      path: ['subThemes', 'touch', 'typography', 'heading', '1'],
      name: 'subThemes.touch.typography.heading.1',
    };
    const transformed = transform.transform?.(subThemeToken, {}, options);

    expect(transformed).toBe(
      '700 16px / 1.3 var(--iress-typography-base-heading-font, Ubuntu, sans-serif)',
    );

    expect(transformed).not.toBe(
      '700 16px / 1.3 var(--iress-sub-themes-touch-typography-base-heading-font, Ubuntu, sans-serif)',
    );
  });

  it('handles empty typography object', () => {
    const transform = typographyCssShorthand;

    expect(
      transform.transform?.(
        {
          ...transformedToken,
          $value: {},
        },
        {},
        options,
      ),
    ).toBe(
      '700 14px / 1.3 var(--iress-typography-base-heading-font, Ubuntu, sans-serif)',
    );
  });

  it('handles typography object with only fontSize and lineHeight', () => {
    const transform = typographyCssShorthand;

    expect(
      transform.transform?.(
        {
          ...transformedToken,
          $value: {
            fontSize: '20px',
            lineHeight: 1.5,
          },
        },
        {},
        options,
      ),
    ).toBe(
      '700 20px / 1.5 var(--iress-typography-base-heading-font, Ubuntu, sans-serif)',
    );
  });

  it('handles undefined default token gracefully', () => {
    const transform = typographyCssShorthand;
    const tokenWithInvalidPath = {
      ...transformedToken,
      path: ['nonexistent', 'path'],
      name: 'nonexistent.path',
    };
    const optionsWithoutTokens = { usesDtcg: true };

    expect(
      transform.transform?.(tokenWithInvalidPath, {}, optionsWithoutTokens),
    ).toBe('[object Object]');
  });
});

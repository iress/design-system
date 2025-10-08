import { type Config, type TransformedToken } from 'style-dictionary';
import { borderCssShorthand } from './borderCssShorthand';
import { Type } from '../enums';
import { type CompositeValue, type IressDesignToken } from '../interfaces';

// Test data and constants
const baseToken: IressDesignToken<CompositeValue['border']> = {
  $description: 'Some random border token',
  $type: Type.Border,
  $value: {
    color: '#000000',
    width: '1px',
    style: 'solid',
  },
};

const nonBorderToken: IressDesignToken = {
  $description: 'Some random color token',
  $type: Type.Color,
  $value: 'red',
};

const transformedToken: TransformedToken = {
  ...baseToken,
  name: 'border.default',
  path: ['border', 'default'],
  original: baseToken,
  filePath: '',
  isSource: false,
};

const transformedNonBorderToken: TransformedToken = {
  ...nonBorderToken,
  name: 'color.primary',
  path: ['color', 'primary'],
  original: nonBorderToken,
  filePath: '',
  isSource: false,
};

const options: Config = {
  usesDtcg: true,
  tokens: {
    'border.default': baseToken,
  },
};

const optionsWithoutDtcg: Config = {
  usesDtcg: false,
};

const optionsWithoutTokens: Config = {
  usesDtcg: true,
};

// Helper functions
const createTransformedToken = (
  value: CompositeValue['border'],
  path: string[] = ['test', 'border'],
): TransformedToken => ({
  ...baseToken,
  $value: value,
  name: path.join('.'),
  path,
  original: { ...baseToken, $value: value },
  filePath: '',
  isSource: false,
});

const createLegacyToken = (
  value: CompositeValue['border'],
  type?: string,
): TransformedToken => ({
  ...transformedToken,
  $type: undefined,
  type,
  value,
  original: { ...baseToken, $value: value, $type: undefined },
});

// Test suites
describe('borderCssShorthand', () => {
  it('should exist', () => {
    expect(borderCssShorthand).toBeDefined();
  });

  describe('filter function', () => {
    it('only applies to border tokens with DTCG enabled', () => {
      const transform = borderCssShorthand;
      expect(transform.filter?.(transformedToken, options)).toBe(true);
      expect(transform.filter?.(transformedNonBorderToken, options)).toBe(
        false,
      );
    });

    it('rejects tokens with undefined type when no tokens lookup available', () => {
      const transform = borderCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
      };

      expect(transform.filter?.(tokenWithoutType, optionsWithoutTokens)).toBe(
        false,
      );
    });

    it('looks up token type from schema when type is undefined', () => {
      const transform = borderCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
        path: ['border', 'default'],
      };

      expect(transform.filter?.(tokenWithoutType, options)).toBe(true);
    });

    it('filters legacy tokens without DTCG', () => {
      const transform = borderCssShorthand;
      const legacyBorderToken = createLegacyToken(
        { color: '#000000', width: '2px', style: 'dashed' },
        Type.Border,
      );

      expect(transform.filter?.(legacyBorderToken, optionsWithoutDtcg)).toBe(
        true,
      );
    });

    it('rejects non-border tokens from schema lookup', () => {
      const transform = borderCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
        path: ['color', 'primary'],
      };
      const optionsWithNonBorderToken = {
        ...options,
        tokens: {
          'color.primary': nonBorderToken,
        },
      };

      expect(
        transform.filter?.(tokenWithoutType, optionsWithNonBorderToken),
      ).toBe(false);
    });
  });

  describe('transform function', () => {
    it('does not transform a string token', () => {
      const transform = borderCssShorthand;
      expect(
        transform.transform?.(transformedNonBorderToken, {}, options),
      ).toBe(nonBorderToken.$value);
    });

    it('transforms a border token with all properties', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '#FF0000',
        width: '2px',
        style: 'solid',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        '2px solid #FF0000',
      );
    });

    it('transforms a border token with only color', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '#00FF00',
      });

      expect(transform.transform?.(token, {}, options)).toBe('#00FF00');
    });

    it('transforms a border token with color and width', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '#0000FF',
        width: '3px',
      });

      expect(transform.transform?.(token, {}, options)).toBe('3px #0000FF');
    });

    it('uses fallbacks from default token for missing properties', () => {
      const transform = borderCssShorthand;
      const optionsWithCustomDefault = {
        usesDtcg: true,
        tokens: {
          border: {
            custom: {
              ...baseToken,
              $value: {
                color: '#000000',
                width: '1px',
                style: 'solid',
              },
            },
          },
        },
      };
      const token = createTransformedToken({ color: '#FF0000' }, [
        'border',
        'custom',
      ]);

      expect(transform.transform?.(token, {}, optionsWithCustomDefault)).toBe(
        '1px solid #FF0000',
      );
    });

    it('handles empty optional properties gracefully', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        width: '',
        style: '',
      });

      expect(transform.transform?.(token, {}, options)).toBe('#FFFFFF');
    });

    it('handles undefined optional properties', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        width: undefined,
        style: undefined,
      });

      expect(transform.transform?.(token, {}, options)).toBe('#FFFFFF');
    });

    it('filters out falsy values and trims result', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        width: '0px',
        style: '',
      });

      expect(transform.transform?.(token, {}, options)).toBe('0px #FFFFFF');
    });

    it('transforms legacy tokens without DTCG', () => {
      const transform = borderCssShorthand;
      const legacyToken = createLegacyToken(
        {
          color: '#00FF00',
          width: '4px',
          style: 'double',
        },
        Type.Border,
      );

      expect(transform.transform?.(legacyToken, {}, optionsWithoutDtcg)).toBe(
        '4px double #00FF00',
      );
    });

    it('converts token references to CSS variables', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '{color.primary}',
        width: '{spacing.small}',
        style: 'solid',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        '{spacing.small} solid {color.primary}',
      );
    });

    it('handles references with fallbacks', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '{color.primary, #000000}',
        width: '2px',
        style: 'solid',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        '2px solid {color.primary, #000000}',
      );
    });

    it('returns string value when already transformed', () => {
      const transform = borderCssShorthand;
      // Create a token that simulates an already transformed string value
      const stringToken: TransformedToken = {
        ...baseToken,
        $value: '2px solid #FFFFFF' as unknown as CompositeValue['border'],
        name: 'test.border',
        path: ['test', 'border'],
        original: {
          ...baseToken,
          $value: '2px solid #FFFFFF' as unknown as CompositeValue['border'],
        },
        filePath: '',
        isSource: false,
      };

      expect(transform.transform?.(stringToken, {}, options)).toBe(
        '2px solid #FFFFFF',
      );
    });

    it('handles missing schema gracefully', () => {
      const transform = borderCssShorthand;
      const token = createTransformedToken({
        color: '#FF0000',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '#FF0000',
      );
    });

    it('handles sub-theme tokens by looking up defaults at base path', () => {
      const transform = borderCssShorthand;
      const optionsWithPrimaryDefault = {
        usesDtcg: true,
        tokens: {
          border: {
            primary: {
              ...baseToken,
              $value: {
                color: '#000000',
                width: '1px',
                style: 'solid',
              },
            },
          },
        },
      };
      const token = createTransformedToken({ color: '#FF0000' }, [
        'subThemes',
        'dark',
        'border',
        'primary',
      ]);

      expect(transform.transform?.(token, {}, optionsWithPrimaryDefault)).toBe(
        '1px solid #FF0000',
      );
    });
  });
});

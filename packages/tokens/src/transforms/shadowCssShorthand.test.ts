import { type Config, type TransformedToken } from 'style-dictionary';
import { shadowCssShorthand } from './shadowCssShorthand';
import { Type } from '../enums';
import { type CompositeValue, type IressDesignToken } from '../interfaces';

// Test data and constants
const baseShadowToken: IressDesignToken<CompositeValue['shadow']> = {
  $description: 'Some random shadow token',
  $type: Type.Shadow,
  $value: {
    color: '#000000',
    offsetX: '0px',
    offsetY: '2px',
    blur: '4px',
    spread: '0px',
  },
};

const nonShadowToken: IressDesignToken = {
  $description: 'Some random color token',
  $type: Type.Color,
  $value: 'red',
};

const transformedToken: TransformedToken = {
  ...baseShadowToken,
  name: 'shadow.default',
  path: ['shadow', 'default'],
  original: baseShadowToken,
  filePath: '',
  isSource: false,
};

const transformedNonShadowToken: TransformedToken = {
  ...nonShadowToken,
  name: 'color.primary',
  path: ['color', 'primary'],
  original: nonShadowToken,
  filePath: '',
  isSource: false,
};

const options: Config = {
  usesDtcg: true,
  tokens: {
    shadow: {
      default: baseShadowToken,
    },
    test: {
      shadow: baseShadowToken,
    },
    border: {
      default: baseShadowToken,
    },
  },
};

const optionsWithoutDtcg: Config = {
  usesDtcg: false,
  tokens: {
    'shadow.default': baseShadowToken,
  },
};

const optionsWithoutTokens: Config = {
  usesDtcg: true,
};

// Helper functions
const createTransformedToken = (
  value: CompositeValue['shadow'] | CompositeValue['shadow'][],
  path: string[] = ['test', 'shadow'],
): TransformedToken => ({
  ...baseShadowToken,
  $value: value,
  name: path.join('.'),
  path,
  original: { ...baseShadowToken, $value: value },
  filePath: '',
  isSource: false,
});

const createLegacyToken = (
  value: CompositeValue['shadow'] | CompositeValue['shadow'][],
  type?: string,
): TransformedToken => ({
  ...transformedToken,
  $type: undefined,
  type,
  value,
  original: { ...baseShadowToken, $value: value, $type: undefined },
});

// Test suites
describe('shadowCssShorthand', () => {
  it('should exist', () => {
    expect(shadowCssShorthand).toBeDefined();
  });

  describe('filter function', () => {
    it('only applies to shadow tokens with DTCG enabled', () => {
      const transform = shadowCssShorthand;
      expect(transform.filter?.(transformedToken, options)).toBe(true);
      expect(transform.filter?.(transformedNonShadowToken, options)).toBe(
        false,
      );
    });

    it('rejects tokens with undefined type when no tokens lookup available', () => {
      const transform = shadowCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
      };

      expect(transform.filter?.(tokenWithoutType, optionsWithoutTokens)).toBe(
        false,
      );
    });

    it('looks up token type from schema when type is undefined', () => {
      const transform = shadowCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
        path: ['shadow', 'default'],
      };

      expect(transform.filter?.(tokenWithoutType, options)).toBe(true);
    });

    it('filters legacy tokens without DTCG', () => {
      const transform = shadowCssShorthand;
      const legacyShadowToken = createLegacyToken(
        { color: '#000000', offsetX: '2px', offsetY: '4px' },
        Type.Shadow,
      );

      expect(transform.filter?.(legacyShadowToken, optionsWithoutDtcg)).toBe(
        true,
      );
    });

    it('rejects non-shadow tokens from schema lookup', () => {
      const transform = shadowCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
        path: ['color', 'primary'],
      };
      const optionsWithNonShadowToken = {
        ...options,
        tokens: {
          'color.primary': nonShadowToken,
        },
      };

      expect(
        transform.filter?.(tokenWithoutType, optionsWithNonShadowToken),
      ).toBe(false);
    });
  });

  describe('transform function', () => {
    it('does not transform a string token', () => {
      const transform = shadowCssShorthand;
      expect(
        transform.transform?.(transformedNonShadowToken, {}, options),
      ).toBe(nonShadowToken.$value);
    });

    it('transforms a shadow token with all properties', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '#FF0000',
        offsetX: '2px',
        offsetY: '4px',
        blur: '8px',
        spread: '1px',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        '2px 4px 8px 1px #FF0000',
      );
    });

    it('transforms a shadow token with inset type', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        type: 'inset',
        color: '#000000',
        offsetX: '0px',
        offsetY: '2px',
        blur: '4px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        'inset 0px 2px 4px #000000',
      );
    });

    it('transforms a shadow token with minimal properties', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '#00FF00',
        offsetX: '1px',
        offsetY: '1px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '1px 1px #00FF00',
      );
    });

    it('uses fallbacks from default token for missing properties', () => {
      const transform = shadowCssShorthand;
      const optionsWithCustomDefault = {
        usesDtcg: true,
        tokens: {
          shadow: {
            custom: {
              ...baseShadowToken,
              $value: {
                color: '#000000',
                offsetX: '0px',
                offsetY: '2px',
                blur: '4px',
                spread: '0px',
              },
            },
          },
        },
      };
      const token = createTransformedToken({ color: '#FF0000' }, [
        'shadow',
        'custom',
      ]);

      expect(transform.transform?.(token, {}, optionsWithCustomDefault)).toBe(
        '0px 2px 4px 0px #FF0000',
      );
    });

    it('handles empty optional properties gracefully', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        offsetX: '0px',
        offsetY: '0px',
        blur: '',
        spread: '',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '0px 0px #FFFFFF',
      );
    });

    it('handles undefined optional properties', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        offsetX: '0px',
        offsetY: '0px',
        blur: undefined,
        spread: undefined,
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '0px 0px #FFFFFF',
      );
    });

    it('filters out falsy values and trims result', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        offsetX: '0px',
        offsetY: '0px',
        blur: '0px',
        spread: '',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '0px 0px 0px #FFFFFF',
      );
    });

    it('transforms legacy tokens without DTCG', () => {
      const transform = shadowCssShorthand;
      const legacyToken = createLegacyToken(
        {
          color: '#00FF00',
          offsetX: '4px',
          offsetY: '6px',
          blur: '10px',
          spread: '2px',
        },
        Type.Shadow,
      );

      expect(transform.transform?.(legacyToken, {}, optionsWithoutDtcg)).toBe(
        '4px 6px 10px 2px #00FF00',
      );
    });

    it('converts token references to CSS variables', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '{color.primary}',
        offsetX: '{spacing.small}',
        offsetY: '2px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '{spacing.small} 2px {color.primary}',
      );
    });

    it('handles references with fallbacks', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '{color.primary, #000000}',
        offsetX: '2px',
        offsetY: '4px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '2px 4px {color.primary, #000000}',
      );
    });

    it('returns string value when already transformed', () => {
      const transform = shadowCssShorthand;
      // Create a token that simulates an already transformed string value
      const stringToken: TransformedToken = {
        ...baseShadowToken,
        $value: '0px 2px 4px #000000' as unknown as CompositeValue['shadow'],
        name: 'test.shadow',
        path: ['test', 'shadow'],
        original: {
          ...baseShadowToken,
          $value: '0px 2px 4px #000000' as unknown as CompositeValue['shadow'],
        },
        filePath: '',
        isSource: false,
      };

      expect(transform.transform?.(stringToken, {}, options)).toBe(
        '0px 2px 4px #000000',
      );
    });

    it('handles missing schema gracefully', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '#FF0000',
        offsetX: '1px',
        offsetY: '1px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '1px 1px #FF0000',
      );
    });

    it('handles sub-theme tokens by looking up defaults at base path', () => {
      const transform = shadowCssShorthand;
      const optionsWithPrimaryDefault = {
        usesDtcg: true,
        tokens: {
          shadow: {
            primary: {
              ...baseShadowToken,
              $value: {
                color: '#000000',
                offsetX: '0px',
                offsetY: '2px',
                blur: '4px',
              },
            },
          },
        },
      };
      const token = createTransformedToken({ color: '#FF0000' }, [
        'subThemes',
        'dark',
        'shadow',
        'primary',
      ]);

      expect(transform.transform?.(token, {}, optionsWithPrimaryDefault)).toBe(
        '0px 2px 4px #FF0000',
      );
    });

    it('transforms array of shadow tokens', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken(
        [
          {
            color: '#000000',
            offsetX: '0px',
            offsetY: '2px',
            blur: '4px',
          },
          {
            color: '#FF0000',
            offsetX: '1px',
            offsetY: '3px',
            blur: '6px',
            spread: '2px',
          },
        ],
        ['other', 'shadow'],
      );

      expect(transform.transform?.(token, {}, options)).toBe(
        '0px 2px 4px #000000, 1px 3px 6px 2px #FF0000',
      );
    });

    it('transforms array of shadow tokens with fallbacks', () => {
      const transform = shadowCssShorthand;
      const optionsWithArrayDefault = {
        usesDtcg: true,
        tokens: {
          shadow: {
            multiple: {
              ...baseShadowToken,
              $value: [
                {
                  color: '#000000',
                  offsetX: '0px',
                  offsetY: '2px',
                  blur: '4px',
                },
                {
                  color: '#333333',
                  offsetX: '1px',
                  offsetY: '3px',
                  blur: '5px',
                },
              ],
            },
          },
        },
      };
      const token = createTransformedToken(
        [{ color: '#FF0000' }, { color: '#00FF00', offsetX: '2px' }],
        ['shadow', 'multiple'],
      );

      expect(transform.transform?.(token, {}, optionsWithArrayDefault)).toBe(
        '0px 2px 4px #FF0000, 2px 3px 5px #00FF00',
      );
    });

    it('handles array with already transformed string shadows', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken(
        [
          '0px 2px 4px #000000' as unknown as CompositeValue['shadow'],
          {
            color: '#FF0000',
            offsetX: '1px',
            offsetY: '1px',
          },
        ],
        ['other', 'shadow'],
      );

      expect(transform.transform?.(token, {}, options)).toBe(
        '0px 2px 4px #000000, 1px 1px #FF0000',
      );
    });

    it('handles default values for missing properties in single shadow', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '#FF0000',
        // Missing offsetX, offsetY, blur, spread
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '0 0 #FF0000',
      );
    });

    it('handles default color fallback when missing', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        color: '#FF0000',
        offsetX: '2px',
        offsetY: '4px',
        blur: '6px',
        // Missing spread - should use default
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '2px 4px 6px #FF0000',
      );
    });

    it('handles complex shadow with all optional properties', () => {
      const transform = shadowCssShorthand;
      const token = createTransformedToken({
        type: 'inset',
        offsetX: '5px',
        offsetY: '10px',
        blur: '15px',
        spread: '3px',
        color: '#3366CC',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        'inset 5px 10px 15px 3px #3366CC',
      );
    });
  });
});

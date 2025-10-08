import { type Config, type TransformedToken } from 'style-dictionary';
import { Type } from '../enums';
import { type CompositeValue, type IressDesignToken } from '../interfaces';
import { radiusCssShorthand } from './radiusCssShorthand';
import { set } from 'radash';

// Test data and constants
const baseToken: IressDesignToken<CompositeValue['radius']> = {
  $description: 'Some random radius token',
  $type: Type.Radius,
  $value: {
    topLeft: '{radius.075}',
    topRight: '{radius.075}',
    bottomRight: '{radius.075}',
    bottomLeft: '{radius.075}',
  },
};

const nonRadiusToken: IressDesignToken = {
  $description: 'Some random color token',
  $type: Type.Color,
  $value: 'red',
};

const transformedToken: TransformedToken = {
  ...baseToken,
  name: 'radius.system.button',
  path: ['radius', 'system', 'button'],
  original: baseToken,
  filePath: '',
  isSource: false,
};

const transformedNonRadiusToken: TransformedToken = {
  ...nonRadiusToken,
  name: 'color.primary',
  path: ['color', 'primary'],
  original: nonRadiusToken,
  filePath: '',
  isSource: false,
};

const options: Config = {
  usesDtcg: true,
  tokens: {
    radius: {
      system: {
        button: baseToken,
      },
    },
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
  value: CompositeValue['radius'],
  path: string[] = ['test', 'radius'],
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
  value: CompositeValue['radius'],
  type?: string,
): TransformedToken => ({
  ...transformedToken,
  $type: undefined,
  type,
  value,
  original: { ...baseToken, $value: value, $type: undefined },
});

const createSchemaWithDefault = (
  defaultValue: CompositeValue['radius'],
  path: string[] = ['radius', 'default'],
): Record<string, IressDesignToken<CompositeValue['radius']>> => {
  return set({}, path.join('.'), {
    ...baseToken,
    $value: defaultValue,
  });
};

// Test suites
describe('radiusCssShorthand', () => {
  it('should exist', () => {
    expect(radiusCssShorthand).toBeDefined();
  });

  describe('filter function', () => {
    it('only applies to radius tokens with DTCG enabled', () => {
      const transform = radiusCssShorthand;
      expect(transform.filter?.(transformedToken, options)).toBe(true);
      expect(transform.filter?.(transformedNonRadiusToken, options)).toBe(
        false,
      );
    });

    it('rejects tokens with undefined type when no tokens lookup available', () => {
      const transform = radiusCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
      };

      expect(transform.filter?.(tokenWithoutType, optionsWithoutTokens)).toBe(
        false,
      );
    });

    it('looks up token type from schema when type is undefined', () => {
      const transform = radiusCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
        path: ['radius', 'system', 'button'],
      };

      expect(transform.filter?.(tokenWithoutType, options)).toBe(true);
    });

    it('filters legacy tokens without DTCG', () => {
      const transform = radiusCssShorthand;
      const legacyRadiusToken = createLegacyToken(
        {
          topLeft: '4px',
          topRight: '4px',
          bottomRight: '4px',
          bottomLeft: '4px',
        },
        Type.Radius,
      );

      expect(transform.filter?.(legacyRadiusToken, optionsWithoutDtcg)).toBe(
        true,
      );
    });

    it('rejects non-radius tokens from schema lookup', () => {
      const transform = radiusCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
        path: ['color', 'primary'],
      };
      const optionsWithNonRadiusToken = {
        ...options,
        tokens: {
          'color.primary': nonRadiusToken,
        },
      };

      expect(
        transform.filter?.(tokenWithoutType, optionsWithNonRadiusToken),
      ).toBe(false);
    });
  });

  describe('transform function', () => {
    it('does not transform a string token', () => {
      const transform = radiusCssShorthand;
      expect(
        transform.transform?.(transformedNonRadiusToken, {}, options),
      ).toBe(nonRadiusToken.$value);
    });

    it('transforms a radius token with all corners the same', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '4px',
        topRight: '4px',
        bottomRight: '4px',
        bottomLeft: '4px',
      });

      expect(transform.transform?.(token, {}, options)).toBe('4px 4px 4px 4px');
    });

    it('transforms a radius token with all corners different', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '1px',
        topRight: '2px',
        bottomRight: '3px',
        bottomLeft: '4px',
      });

      expect(transform.transform?.(token, {}, options)).toBe('1px 2px 3px 4px');
    });

    it('transforms a radius token with some corners missing', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '5px',
        topRight: '10px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '5px 10px',
      );
    });

    it('uses fallbacks from default token for missing properties', () => {
      const transform = radiusCssShorthand;
      const schema = createSchemaWithDefault(
        {
          topLeft: '2px',
          topRight: '2px',
          bottomRight: '2px',
          bottomLeft: '2px',
        },
        ['radius', 'custom'],
      );
      const token = createTransformedToken({ topLeft: '8px' }, [
        'radius',
        'custom',
      ]);
      const optionsWithSchema = { ...options, tokens: schema };

      expect(transform.transform?.(token, {}, optionsWithSchema)).toBe(
        '8px 2px 2px 2px',
      );
    });

    it('handles empty optional properties gracefully', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '6px',
        topRight: '',
        bottomRight: '6px',
        bottomLeft: '',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '6px 6px',
      );
    });

    it('handles undefined optional properties', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '7px',
        topRight: undefined,
        bottomRight: '7px',
        bottomLeft: undefined,
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '7px 7px',
      );
    });

    it('filters out falsy values and trims result', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '0px',
        topRight: '',
        bottomRight: '8px',
        bottomLeft: null as unknown as string,
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '0px 8px',
      );
    });

    it('transforms legacy tokens without DTCG', () => {
      const transform = radiusCssShorthand;
      const legacyToken = createLegacyToken(
        {
          topLeft: '12px',
          topRight: '8px',
          bottomRight: '4px',
          bottomLeft: '16px',
        },
        Type.Radius,
      );

      expect(transform.transform?.(legacyToken, {}, optionsWithoutDtcg)).toBe(
        '12px 8px 4px 16px',
      );
    });

    it('returns string value when already transformed', () => {
      const transform = radiusCssShorthand;
      // Create a token that simulates an already transformed string value
      const stringToken: TransformedToken = {
        ...baseToken,
        $value: '5px 10px 15px 20px' as unknown as CompositeValue['radius'],
        name: 'test.radius',
        path: ['test', 'radius'],
        original: {
          ...baseToken,
          $value: '5px 10px 15px 20px' as unknown as CompositeValue['radius'],
        },
        filePath: '',
        isSource: false,
      };

      expect(transform.transform?.(stringToken, {}, options)).toBe(
        '5px 10px 15px 20px',
      );
    });

    it('handles missing schema gracefully', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '3px',
        topRight: '6px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '3px 6px',
      );
    });

    it('handles completely empty radius object', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({});

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe('');
    });

    it('handles radius with only one corner defined', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '9px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '9px',
      );
    });

    it('preserves order of corners in CSS shorthand', () => {
      const transform = radiusCssShorthand;
      const token = createTransformedToken({
        topLeft: '1px',
        bottomLeft: '2px',
        topRight: '3px',
        bottomRight: '4px',
      });

      expect(transform.transform?.(token, {}, optionsWithoutTokens)).toBe(
        '1px 3px 4px 2px',
      );
    });
  });
});

import { type Config, type TransformedToken } from 'style-dictionary';
import { backgroundCssShorthand } from './backgroundCssShorthand';
import { Type } from '../enums';
import { type CompositeValue, type IressDesignToken } from '../interfaces';

// Test data and constants
const baseToken: IressDesignToken<CompositeValue['background']> = {
  $description: 'Some random background token',
  $type: Type.Background,
  $value: {
    color: '#FFFFFF',
  },
};

const nonBackgroundToken: IressDesignToken = {
  $description: 'Some random color token',
  $type: Type.Color,
  $value: 'red',
};

const transformedToken: TransformedToken = {
  ...baseToken,
  name: 'elevation.background.default',
  path: ['elevation', 'background', 'default'],
  original: baseToken,
  filePath: '',
  isSource: false,
};

const transformedNonBackgroundToken: TransformedToken = {
  ...nonBackgroundToken,
  name: 'color.primary',
  path: ['color', 'primary'],
  original: nonBackgroundToken,
  filePath: '',
  isSource: false,
};

const options: Config = {
  usesDtcg: true,
};

const optionsWithoutDtcg: Config = {
  usesDtcg: false,
};

// Helper functions
const createTransformedToken = (
  value: CompositeValue['background'],
  path: string[] = ['test', 'background'],
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
  value: CompositeValue['background'],
  type?: string,
): TransformedToken => ({
  ...transformedToken,
  $type: undefined,
  type,
  value,
  original: { ...baseToken, $value: value, $type: undefined },
});

// Test suites
describe('backgroundCssShorthand', () => {
  describe('filter function', () => {
    it('only applies to background tokens with DTCG enabled', () => {
      const transform = backgroundCssShorthand;
      expect(transform.filter?.(transformedToken, options)).toBe(true);
      expect(transform.filter?.(transformedNonBackgroundToken, options)).toBe(
        false,
      );
    });

    it('rejects tokens with undefined type when no tokens lookup available', () => {
      const transform = backgroundCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
      };

      expect(transform.filter?.(tokenWithoutType, options)).toBe(false);
    });

    it('filters legacy tokens without DTCG', () => {
      const transform = backgroundCssShorthand;
      const legacyBackgroundToken = createLegacyToken(
        { color: '#000000' },
        Type.Background,
      );

      expect(
        transform.filter?.(legacyBackgroundToken, optionsWithoutDtcg),
      ).toBe(true);
    });

    it('rejects tokens with undefined type', () => {
      const transform = backgroundCssShorthand;
      const tokenWithoutType = {
        ...transformedToken,
        $type: undefined,
      };

      expect(transform.filter?.(tokenWithoutType, options)).toBe(false);
    });
  });

  describe('transform function', () => {
    it('does not transform a string token', () => {
      const transform = backgroundCssShorthand;
      expect(
        transform.transform?.(transformedNonBackgroundToken, {}, options),
      ).toBe(nonBackgroundToken.$value);
    });

    it('transforms a background token with only color', () => {
      const transform = backgroundCssShorthand;
      const token = createTransformedToken({ color: '#FF0000' });

      expect(transform.transform?.(token, {}, options)).toBe('#FF0000');
    });

    it('transforms a background token with color and image', () => {
      const transform = backgroundCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        image: 'https://example.com/image.jpg',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        '#FFFFFF url(https://example.com/image.jpg)',
      );
    });

    it('transforms a background token with position but no size', () => {
      const transform = backgroundCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        position: 'center',
      });

      expect(transform.transform?.(token, {}, options)).toBe('#FFFFFF center');
    });

    it('transforms a background token with position and size', () => {
      const transform = backgroundCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        position: 'center',
        size: 'cover',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        '#FFFFFF center / cover',
      );
    });

    it('transforms a background token with all properties', () => {
      const transform = backgroundCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        image: 'https://example.com/image.jpg',
        position: 'center',
        size: 'cover',
        repeat: 'no-repeat',
        attachment: 'fixed',
        origin: 'border-box',
        clip: 'border-box',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        '#FFFFFF url(https://example.com/image.jpg) center / cover no-repeat fixed border-box border-box',
      );
    });

    it('transforms a background token with partial properties', () => {
      const transform = backgroundCssShorthand;
      const token = createTransformedToken({
        color: '#000000',
        repeat: 'repeat-x',
        attachment: 'scroll',
      });

      expect(transform.transform?.(token, {}, options)).toBe(
        '#000000 repeat-x scroll',
      );
    });

    it('handles empty optional properties gracefully', () => {
      const transform = backgroundCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        image: '',
        position: '',
        size: '',
        repeat: '',
        attachment: '',
        origin: '',
        clip: '',
      });

      expect(transform.transform?.(token, {}, options)).toBe('#FFFFFF');
    });

    it('transforms legacy tokens without DTCG', () => {
      const transform = backgroundCssShorthand;
      const legacyToken = createLegacyToken(
        {
          color: '#00FF00',
          image: 'test.jpg',
        },
        Type.Background,
      );

      expect(transform.transform?.(legacyToken, {}, optionsWithoutDtcg)).toBe(
        '#00FF00 url(test.jpg)',
      );
    });

    it('returns string value when already transformed', () => {
      const transform = backgroundCssShorthand;
      // Create a token that simulates an already transformed string value
      const stringToken: TransformedToken = {
        ...baseToken,
        $value: '#FFFFFF' as unknown as CompositeValue['background'],
        name: 'test.background',
        path: ['test', 'background'],
        original: {
          ...baseToken,
          $value: '#FFFFFF' as unknown as CompositeValue['background'],
        },
        filePath: '',
        isSource: false,
      };

      expect(transform.transform?.(stringToken, {}, options)).toBe('#FFFFFF');
    });

    it('handles undefined optional properties', () => {
      const transform = backgroundCssShorthand;
      const token = createTransformedToken({
        color: '#FFFFFF',
        image: undefined,
        position: undefined,
        size: undefined,
        repeat: undefined,
        attachment: undefined,
        origin: undefined,
        clip: undefined,
      });

      expect(transform.transform?.(token, {}, options)).toBe('#FFFFFF');
    });
  });
});

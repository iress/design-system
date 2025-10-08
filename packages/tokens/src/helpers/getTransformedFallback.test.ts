import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTransformedFallback } from './getTransformedFallback';
import { Type } from '../enums';
import { type IressDesignToken } from '../interfaces';

// Mock dependencies
vi.mock('./convertReferencesToVariables', () => ({
  convertReferencesToVariables: vi.fn(),
}));

vi.mock('../transforms/backgroundCssShorthand', () => ({
  backgroundCssShorthand: {
    transform: vi.fn(),
  },
}));

vi.mock('../transforms/borderCssShorthand', () => ({
  borderCssShorthand: {
    transform: vi.fn(),
  },
}));

vi.mock('../transforms/radiusCssShorthand', () => ({
  radiusCssShorthand: {
    transform: vi.fn(),
  },
}));

vi.mock('../transforms/shadowCssShorthand', () => ({
  shadowCssShorthand: {
    transform: vi.fn(),
  },
}));

vi.mock('../transforms/typographyCssShorthand', () => ({
  typographyCssShorthand: {
    transform: vi.fn(),
  },
}));

vi.mock('radash', () => ({
  isPrimitive: vi.fn(),
}));

import { convertReferencesToVariables } from './convertReferencesToVariables';
import { backgroundCssShorthand } from '../transforms/backgroundCssShorthand';
import { borderCssShorthand } from '../transforms/borderCssShorthand';
import { radiusCssShorthand } from '../transforms/radiusCssShorthand';
import { shadowCssShorthand } from '../transforms/shadowCssShorthand';
import { typographyCssShorthand } from '../transforms/typographyCssShorthand';
import { isPrimitive } from 'radash';

const mockConvertReferencesToVariables = vi.mocked(
  convertReferencesToVariables,
);
const mockIsPrimitive = vi.mocked(isPrimitive);
const mockBackgroundTransform = vi.mocked(backgroundCssShorthand.transform);
const mockBorderTransform = vi.mocked(borderCssShorthand.transform);
const mockRadiusTransform = vi.mocked(radiusCssShorthand.transform);
const mockShadowTransform = vi.mocked(shadowCssShorthand.transform);
const mockTypographyTransform = vi.mocked(typographyCssShorthand.transform);

describe('getTransformedFallback', () => {
  const mockSchema = {};
  const mockPath = ['color', 'primary'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when fallback is undefined', () => {
    it('returns undefined', () => {
      const token = {
        $type: Type.Color,
        $value: undefined,
        $description: 'Test token',
      } as unknown as IressDesignToken;

      const result = getTransformedFallback(mockSchema, token, mockPath);

      expect(result).toBeUndefined();
    });
  });

  describe('when fallback is a primitive', () => {
    beforeEach(() => {
      mockIsPrimitive.mockReturnValue(true);
    });

    it('returns string value as-is when not a number', () => {
      mockConvertReferencesToVariables.mockReturnValue('14px');

      const token = {
        $type: Type.Color,
        $value: '14px',
        $description: 'Test token',
      } as unknown as IressDesignToken;

      const result = getTransformedFallback(mockSchema, token, mockPath);

      expect(mockConvertReferencesToVariables).toHaveBeenCalledWith(
        '14px',
        undefined,
      );
      expect(result).toBe('14px');
    });

    it('returns numeric value when string represents a number', () => {
      mockConvertReferencesToVariables.mockReturnValue('42');

      const token = {
        $type: Type.Color,
        $value: '42',
        $description: 'Test token',
      } as unknown as IressDesignToken;

      const result = getTransformedFallback(mockSchema, token, mockPath);

      expect(mockConvertReferencesToVariables).toHaveBeenCalledWith(
        '42',
        undefined,
      );
      expect(result).toBe(42);
    });

    it('returns string value when converted value is NaN', () => {
      mockConvertReferencesToVariables.mockReturnValue('not-a-number');

      const token = {
        $type: Type.Color,
        $value: 'not-a-number',
        $description: 'Test token',
      } as unknown as IressDesignToken;

      const result = getTransformedFallback(mockSchema, token, mockPath);

      expect(mockConvertReferencesToVariables).toHaveBeenCalledWith(
        'not-a-number',
        undefined,
      );
      expect(result).toBe('not-a-number');
    });

    it('handles boolean values', () => {
      mockConvertReferencesToVariables.mockReturnValue('true');

      const token = {
        $type: Type.Color,
        $value: true,
        $description: 'Test token',
      } as unknown as IressDesignToken;

      const result = getTransformedFallback(mockSchema, token, mockPath);

      expect(mockConvertReferencesToVariables).toHaveBeenCalledWith(
        'true',
        undefined,
      );
      expect(result).toBe('true');
    });

    it('handles numeric values', () => {
      mockConvertReferencesToVariables.mockReturnValue('123');

      const token = {
        $type: Type.Color,
        $value: 123,
        $description: 'Test token',
      } as unknown as IressDesignToken;

      const result = getTransformedFallback(mockSchema, token, mockPath);

      expect(mockConvertReferencesToVariables).toHaveBeenCalledWith(
        '123',
        undefined,
      );
      expect(result).toBe(123);
    });
  });

  describe('when fallback is not a primitive', () => {
    beforeEach(() => {
      mockIsPrimitive.mockReturnValue(false);
    });

    describe('Background tokens', () => {
      const backgroundToken = {
        $type: Type.Background,
        $value: {
          color: '#ffffff',
          image: 'none',
        },
        $description: 'Test background token',
      } as unknown as IressDesignToken;

      it('applies background transform and returns result', () => {
        mockBackgroundTransform.mockReturnValue(
          'linear-gradient(to right, #ffffff, #000000)' as string &
            Record<string, unknown>,
        );
        mockConvertReferencesToVariables.mockReturnValue(
          'linear-gradient(to right, var(--color-white), var(--color-black))',
        );

        const result = getTransformedFallback(
          mockSchema,
          backgroundToken,
          mockPath,
        );

        expect(mockBackgroundTransform).toHaveBeenCalledWith(
          {
            ...backgroundToken,
            name: 'color.primary',
            path: mockPath,
            original: backgroundToken,
            filePath: '',
            isSource: false,
          },
          {},
          { usesDtcg: true, tokens: mockSchema },
        );
        expect(mockConvertReferencesToVariables).toHaveBeenCalledWith(
          'linear-gradient(to right, #ffffff, #000000)',
          undefined,
        );
        expect(result).toBe(
          'linear-gradient(to right, var(--color-white), var(--color-black))',
        );
      });

      it('returns numeric value when transform result is a number string', () => {
        mockBackgroundTransform.mockReturnValue(
          '42' as string & Record<string, unknown>,
        );
        mockConvertReferencesToVariables.mockReturnValue('42');

        const result = getTransformedFallback(
          mockSchema,
          backgroundToken,
          mockPath,
        );

        expect(result).toBe(42);
      });
    });

    describe('Border tokens', () => {
      const borderToken = {
        $type: Type.Border,
        $value: {
          color: '#000000',
          width: '1px',
          style: 'solid',
        },
        $description: 'Test border token',
      } as unknown as IressDesignToken;

      it('applies border transform and returns result', () => {
        mockBorderTransform.mockReturnValue(
          '1px solid #000000' as string & Record<string, unknown>,
        );
        mockConvertReferencesToVariables.mockReturnValue(
          '1px solid var(--color-black)',
        );

        const result = getTransformedFallback(
          mockSchema,
          borderToken,
          mockPath,
        );

        expect(mockBorderTransform).toHaveBeenCalledWith(
          {
            ...borderToken,
            name: 'color.primary',
            path: mockPath,
            original: borderToken,
            filePath: '',
            isSource: false,
          },
          {},
          { usesDtcg: true, tokens: mockSchema },
        );
        expect(result).toBe('1px solid var(--color-black)');
      });
    });

    describe('Radius tokens', () => {
      const radiusToken = {
        $type: Type.Radius,
        $value: {
          topLeft: '4px',
          topRight: '4px',
          bottomRight: '4px',
          bottomLeft: '4px',
        },
        $description: 'Test radius token',
      } as unknown as IressDesignToken;

      it('applies radius transform and returns result', () => {
        mockRadiusTransform.mockReturnValue(
          '4px' as string & Record<string, unknown>,
        );
        mockConvertReferencesToVariables.mockReturnValue('4px');

        const result = getTransformedFallback(
          mockSchema,
          radiusToken,
          mockPath,
        );

        expect(mockRadiusTransform).toHaveBeenCalledWith(
          {
            ...radiusToken,
            name: 'color.primary',
            path: mockPath,
            original: radiusToken,
            filePath: '',
            isSource: false,
          },
          {},
          { usesDtcg: true, tokens: mockSchema },
        );
        expect(result).toBe('4px');
      });
    });

    describe('Shadow tokens', () => {
      const shadowToken = {
        $type: Type.Shadow,
        $value: {
          color: '#000000',
          offsetX: '2px',
          offsetY: '4px',
          blur: '8px',
        },
        $description: 'Test shadow token',
      } as unknown as IressDesignToken;

      it('applies shadow transform and returns result', () => {
        mockShadowTransform.mockReturnValue(
          '2px 4px 8px #000000' as string & Record<string, unknown>,
        );
        mockConvertReferencesToVariables.mockReturnValue(
          '2px 4px 8px var(--color-black)',
        );

        const result = getTransformedFallback(
          mockSchema,
          shadowToken,
          mockPath,
        );

        expect(mockShadowTransform).toHaveBeenCalledWith(
          {
            ...shadowToken,
            name: 'color.primary',
            path: mockPath,
            original: shadowToken,
            filePath: '',
            isSource: false,
          },
          {},
          { usesDtcg: true, tokens: mockSchema },
        );
        expect(result).toBe('2px 4px 8px var(--color-black)');
      });
    });

    describe('Typography tokens', () => {
      const typographyToken = {
        $type: Type.Typography,
        $value: {
          fontSize: '14px',
          fontFamily: 'Arial',
          fontWeight: '400',
        },
        $description: 'Test typography token',
      } as unknown as IressDesignToken;

      it('applies typography transform and returns result', () => {
        mockTypographyTransform.mockReturnValue(
          '400 14px Arial' as string & Record<string, unknown>,
        );
        mockConvertReferencesToVariables.mockReturnValue(
          '400 14px var(--font-family-primary)',
        );

        const result = getTransformedFallback(
          mockSchema,
          typographyToken,
          mockPath,
        );

        expect(mockTypographyTransform).toHaveBeenCalledWith(
          {
            ...typographyToken,
            name: 'color.primary',
            path: mockPath,
            original: typographyToken,
            filePath: '',
            isSource: false,
          },
          {},
          { usesDtcg: true, tokens: mockSchema },
        );
        expect(result).toBe('400 14px var(--font-family-primary)');
      });
    });

    describe('Unsupported token types', () => {
      it('returns undefined for unsupported token types', () => {
        const colorToken = {
          $type: Type.Color,
          $value: {
            some: 'object',
          },
          $description: 'Test color token',
        } as unknown as IressDesignToken;

        const result = getTransformedFallback(mockSchema, colorToken, mockPath);

        expect(result).toBeUndefined();
        expect(mockBackgroundTransform).not.toHaveBeenCalled();
        expect(mockBorderTransform).not.toHaveBeenCalled();
        expect(mockRadiusTransform).not.toHaveBeenCalled();
        expect(mockShadowTransform).not.toHaveBeenCalled();
        expect(mockTypographyTransform).not.toHaveBeenCalled();
      });
    });
  });

  describe('transformed token creation', () => {
    it('creates transformed token with correct properties', () => {
      mockIsPrimitive.mockReturnValue(false);

      const token = {
        $type: Type.Background,
        $value: { color: '#fff' },
        $description: 'Test token',
      } as unknown as IressDesignToken;

      const customPath = ['custom', 'path', 'deep'];
      mockBackgroundTransform.mockReturnValue(
        'result' as string & Record<string, unknown>,
      );

      getTransformedFallback(mockSchema, token, customPath);

      expect(mockBackgroundTransform).toHaveBeenCalledWith(
        expect.objectContaining({
          ...token,
          name: 'custom.path.deep',
          path: customPath,
          original: token,
          filePath: '',
          isSource: false,
        }),
        {},
        expect.any(Object),
      );
    });
  });

  describe('edge cases', () => {
    it('handles empty path array', () => {
      mockIsPrimitive.mockReturnValue(false);

      const token = {
        $type: Type.Background,
        $value: { color: '#fff' },
        $description: 'Test token',
      } as unknown as IressDesignToken;

      mockBackgroundTransform.mockReturnValue(
        'result' as string & Record<string, unknown>,
      );

      getTransformedFallback(mockSchema, token, []);

      expect(mockBackgroundTransform).toHaveBeenCalledWith(
        expect.objectContaining({
          name: '',
          path: [],
        }),
        {},
        expect.any(Object),
      );
    });

    it('handles null fallback value', () => {
      const token = {
        $type: Type.Color,
        $value: null,
        $description: 'Test token',
      } as unknown as IressDesignToken;

      const result = getTransformedFallback(mockSchema, token, mockPath);

      expect(result).toBeUndefined();
    });
  });
});

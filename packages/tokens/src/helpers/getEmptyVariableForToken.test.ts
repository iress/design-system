import { describe, it, expect } from 'vitest';
import { getEmptyVariableForToken } from './getEmptyVariableForToken';
import { Type } from '../enums';
import { type IressDesignToken } from '../interfaces';

describe('getEmptyVariableForToken', () => {
  describe('Color tokens', () => {
    it('returns empty string for color tokens', () => {
      const colorToken = {
        $type: Type.Color,
        $value: '#ff0000',
        $description: 'A color token',
      } as IressDesignToken;

      const result = getEmptyVariableForToken(colorToken);

      expect(result).toBe('');
    });
  });

  describe('Dimension tokens', () => {
    it('returns "0" for dimension tokens', () => {
      const dimensionToken = {
        $type: Type.Dimension,
        $value: '16px',
        $description: 'A dimension token',
      } as IressDesignToken;

      const result = getEmptyVariableForToken(dimensionToken);

      expect(result).toBe('0');
    });
  });

  describe('FontFamily tokens', () => {
    it('returns empty string for font family tokens', () => {
      const fontFamilyToken = {
        $type: Type.FontFamily,
        $value: 'Arial, sans-serif',
        $description: 'A font family token',
      } as IressDesignToken;

      const result = getEmptyVariableForToken(fontFamilyToken);

      expect(result).toBe('');
    });
  });

  describe('FontSize tokens', () => {
    it('returns 0 for font size tokens', () => {
      const fontSizeToken = {
        $type: Type.FontSize,
        $value: '16px',
        $description: 'A font size token',
      } as IressDesignToken;

      const result = getEmptyVariableForToken(fontSizeToken);

      expect(result).toBe(0);
    });
  });

  describe('Border tokens', () => {
    it('returns empty object for border tokens', () => {
      const borderToken = {
        $type: Type.Border,
        $value: {
          color: '#000000',
          width: '1px',
          style: 'solid',
        },
        $description: 'A border token',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(borderToken);

      expect(result).toEqual({});
    });
  });

  describe('Radius tokens', () => {
    it('returns empty object for radius tokens', () => {
      const radiusToken = {
        $type: Type.Radius,
        $value: {
          topLeft: '4px',
          topRight: '4px',
          bottomRight: '4px',
          bottomLeft: '4px',
        },
        $description: 'A radius token',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(radiusToken);

      expect(result).toEqual({});
    });
  });

  describe('Shadow tokens', () => {
    it('returns empty object for single shadow tokens', () => {
      const shadowToken = {
        $type: Type.Shadow,
        $value: {
          color: '#000000',
          offsetX: '2px',
          offsetY: '4px',
          blur: '8px',
          spread: '1px',
        },
        $description: 'A shadow token',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(shadowToken);

      expect(result).toEqual({});
    });

    it('returns empty array for shadow array tokens', () => {
      const shadowArrayToken = {
        $type: Type.Shadow,
        $value: [
          {
            color: '#000000',
            offsetX: '2px',
            offsetY: '4px',
            blur: '8px',
            spread: '1px',
          },
          {
            color: '#ffffff',
            offsetX: '1px',
            offsetY: '2px',
            blur: '4px',
            spread: '0px',
          },
        ],
        $description: 'A shadow array token',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(shadowArrayToken);

      expect(result).toEqual([]);
    });

    it('returns empty array for empty shadow array tokens', () => {
      const emptyShadowArrayToken = {
        $type: Type.Shadow,
        $value: [],
        $description: 'An empty shadow array token',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(emptyShadowArrayToken);

      expect(result).toEqual([]);
    });
  });

  describe('Typography tokens', () => {
    it('returns empty object for typography tokens', () => {
      const typographyToken = {
        $type: Type.Typography,
        $value: {
          fontFamily: 'Arial',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.5',
        },
        $description: 'A typography token',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(typographyToken);

      expect(result).toEqual({});
    });
  });

  describe('Background tokens', () => {
    it('returns empty object for background tokens', () => {
      const backgroundToken = {
        $type: Type.Background,
        $value: {
          color: '#ffffff',
          image: 'none',
          position: 'center',
          size: 'cover',
        },
        $description: 'A background token',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(backgroundToken);

      expect(result).toEqual({});
    });
  });

  describe('Unknown token types', () => {
    it('returns empty string for unknown token types', () => {
      const unknownToken = {
        $type: 'unknown' as Type,
        $value: 'some value',
        $description: 'An unknown token type',
      } as IressDesignToken;

      const result = getEmptyVariableForToken(unknownToken);

      expect(result).toBe('');
    });
  });

  describe('Edge cases', () => {
    it('handles tokens with undefined values', () => {
      const tokenWithUndefinedValue = {
        $type: Type.Color,
        $value: undefined,
        $description: 'A token with undefined value',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(tokenWithUndefinedValue);

      expect(result).toBe('');
    });

    it('handles tokens with null values', () => {
      const tokenWithNullValue = {
        $type: Type.Dimension,
        $value: null,
        $description: 'A token with null value',
      } as unknown as IressDesignToken;

      const result = getEmptyVariableForToken(tokenWithNullValue);

      expect(result).toBe('0');
    });
  });
});

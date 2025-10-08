import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCompositeValueFromToken } from './getCompositeValueFromToken';
import { Type } from '../enums';
import { type IressDesignToken, type CompositeValue } from '../interfaces';

// Mock dependencies
vi.mock('./getTransformedFallback', () => ({
  getTransformedFallback: vi.fn(),
}));

vi.mock('./getCssVariable', () => ({
  getCssVariable: vi.fn(),
}));

vi.mock('radash', () => ({
  dash: vi.fn((str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase()),
}));

import { getTransformedFallback } from './getTransformedFallback';
import { getCssVariable } from './getCssVariable';

const mockGetTransformedFallback = vi.mocked(getTransformedFallback);
const mockGetCssVariable = vi.mocked(getCssVariable);

describe('getCompositeValueFromToken', () => {
  const mockSchema = {};
  const mockPath = ['color', 'primary'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Shadow tokens', () => {
    const shadowValue: CompositeValue['shadow'] = {
      color: '#000000',
      offsetX: '2px',
      offsetY: '4px',
      blur: '8px',
      spread: '1px',
    };

    const shadowToken = {
      $type: Type.Shadow,
      $value: shadowValue,
      $description: 'A shadow token',
    } as unknown as IressDesignToken;

    beforeEach(() => {
      mockGetTransformedFallback.mockImplementation((schema, token, path) => {
        const lastSegment = path[path.length - 1];

        // Handle array indices - check for index in path
        const hasIndex1 = path.some((segment) => segment === '1');
        if (hasIndex1 && lastSegment === 'color') {
          return '#ffffff'; // Second shadow has different color
        }

        if (lastSegment === 'color') return '#000000';
        if (lastSegment === 'offsetX') return '2px';
        if (lastSegment === 'offsetY') return '4px';
        if (lastSegment === 'blur') return '8px';
        if (lastSegment === 'spread') return '1px';
        return '#000000'; // fallback
      });
    });

    describe('single shadow', () => {
      it('returns CSS variables when readonly is false', () => {
        mockGetCssVariable.mockImplementation(
          (path, fallback) => `var(--${path.join('-')}, ${fallback})`,
        );

        const result = getCompositeValueFromToken(
          mockSchema,
          shadowToken,
          mockPath,
          false,
        );

        expect(result).toEqual({
          color: 'var(--color-_primary-color, #000000)',
          offsetX: 'var(--color-_primary-offsetX, 2px)',
          offsetY: 'var(--color-_primary-offsetY, 4px)',
          blur: 'var(--color-_primary-blur, 8px)',
          spread: 'var(--color-_primary-spread, 1px)',
        });

        expect(mockGetCssVariable).toHaveBeenCalledTimes(5);
      });

      it('returns raw values when readonly is true', () => {
        const result = getCompositeValueFromToken(
          mockSchema,
          shadowToken,
          mockPath,
          true,
        );

        expect(result).toEqual({
          color: '#000000',
          offsetX: '2px',
          offsetY: '4px',
          blur: '8px',
          spread: '1px',
        });

        expect(mockGetCssVariable).not.toHaveBeenCalled();
      });
    });

    describe('shadow array', () => {
      const shadowArrayToken = {
        $type: Type.Shadow,
        $value: [shadowValue, { ...shadowValue, color: '#ffffff' }],
        $description: 'A shadow array token',
      } as unknown as IressDesignToken;

      it('returns CSS variables map for array when readonly is false', () => {
        mockGetCssVariable.mockImplementation(
          (path, fallback) => `var(--${path.join('-')}, ${fallback})`,
        );

        const result = getCompositeValueFromToken(
          mockSchema,
          shadowArrayToken,
          mockPath,
          false,
        );

        expect(result).toEqual({
          0: {
            color: 'var(--color-_primary-0-color, #000000)',
            offsetX: 'var(--color-_primary-0-offsetX, 2px)',
            offsetY: 'var(--color-_primary-0-offsetY, 4px)',
            blur: 'var(--color-_primary-0-blur, 8px)',
            spread: 'var(--color-_primary-0-spread, 1px)',
          },
          1: {
            color: 'var(--color-_primary-1-color, #ffffff)',
            offsetX: 'var(--color-_primary-1-offsetX, 2px)',
            offsetY: 'var(--color-_primary-1-offsetY, 4px)',
            blur: 'var(--color-_primary-1-blur, 8px)',
            spread: 'var(--color-_primary-1-spread, 1px)',
          },
        });
      });

      it('returns raw values map for array when readonly is true', () => {
        const result = getCompositeValueFromToken(
          mockSchema,
          shadowArrayToken,
          mockPath,
          true,
        );

        expect(result).toEqual({
          0: {
            color: '#000000',
            offsetX: '2px',
            offsetY: '4px',
            blur: '8px',
            spread: '1px',
          },
          1: {
            color: '#ffffff',
            offsetX: '2px',
            offsetY: '4px',
            blur: '8px',
            spread: '1px',
          },
        });
      });
    });
  });

  describe('Border tokens', () => {
    const borderValue: CompositeValue['border'] = {
      color: '#ff0000',
      width: '2px',
      style: 'solid',
    };

    const borderToken = {
      $type: Type.Border,
      $value: borderValue,
      $description: 'A border token',
    } as unknown as IressDesignToken;

    beforeEach(() => {
      mockGetTransformedFallback.mockImplementation((schema, token, path) => {
        const lastSegment = path[path.length - 1];
        if (lastSegment === 'color') return '#ff0000';
        if (lastSegment === 'width') return '2px';
        if (lastSegment === 'style') return 'solid';
        return '#ff0000'; // fallback
      });
    });

    it('returns CSS variables when readonly is false', () => {
      mockGetCssVariable.mockImplementation(
        (path, fallback) => `var(--${path.join('-')}, ${fallback})`,
      );

      const result = getCompositeValueFromToken(
        mockSchema,
        borderToken,
        mockPath,
        false,
      );

      expect(result).toEqual({
        color: 'var(--color-_primary-color, #ff0000)',
        width: 'var(--color-_primary-width, 2px)',
        style: 'var(--color-_primary-style, solid)',
      });
    });

    it('returns raw values when readonly is true', () => {
      const result = getCompositeValueFromToken(
        mockSchema,
        borderToken,
        mockPath,
        true,
      );

      expect(result).toEqual({
        color: '#ff0000',
        width: '2px',
        style: 'solid',
      });
    });
  });

  describe('Radius tokens', () => {
    const radiusValue: CompositeValue['radius'] = {
      topLeft: '4px',
      topRight: '8px',
      bottomRight: '4px',
      bottomLeft: '8px',
    };

    const radiusToken = {
      $type: Type.Radius,
      $value: radiusValue,
      $description: 'A radius token',
    } as unknown as IressDesignToken;

    beforeEach(() => {
      mockGetTransformedFallback.mockImplementation((schema, token, path) => {
        const lastSegment = path[path.length - 1];
        if (lastSegment === 'topLeft') return '4px';
        if (lastSegment === 'topRight') return '8px';
        if (lastSegment === 'bottomRight') return '4px';
        if (lastSegment === 'bottomLeft') return '8px';
        return '4px'; // fallback
      });
    });

    it('returns CSS variables when readonly is false', () => {
      mockGetCssVariable.mockImplementation(
        (path, fallback) => `var(--${path.join('-')}, ${fallback})`,
      );

      const result = getCompositeValueFromToken(
        mockSchema,
        radiusToken,
        mockPath,
        false,
      );

      expect(result).toEqual({
        topLeft: 'var(--color-_primary-topLeft, 4px)',
        topRight: 'var(--color-_primary-topRight, 8px)',
        bottomRight: 'var(--color-_primary-bottomRight, 4px)',
        bottomLeft: 'var(--color-_primary-bottomLeft, 8px)',
      });
    });

    it('returns raw values when readonly is true', () => {
      const result = getCompositeValueFromToken(
        mockSchema,
        radiusToken,
        mockPath,
        true,
      );

      expect(result).toEqual({
        topLeft: '4px',
        topRight: '8px',
        bottomRight: '4px',
        bottomLeft: '8px',
      });
    });
  });

  describe('Typography tokens', () => {
    const typographyValue: CompositeValue['typography'] = {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: '400',
      fontWidth: 'normal',
      lineHeight: '1.5',
    };

    const typographyToken = {
      $type: Type.Typography,
      $value: typographyValue,
      $description: 'A typography token',
    } as unknown as IressDesignToken;

    beforeEach(() => {
      mockGetTransformedFallback.mockImplementation((schema, token, path) => {
        const lastSegment = path[path.length - 1];
        if (lastSegment === 'fontFamily') return 'Arial, sans-serif';
        if (lastSegment === 'fontSize') return '16px';
        if (lastSegment === 'fontStyle') return 'normal';
        if (lastSegment === 'fontVariant') return 'normal';
        if (lastSegment === 'fontWeight') return '400';
        if (lastSegment === 'fontWidth') return 'normal';
        if (lastSegment === 'lineHeight') return '1.5';
        return 'Arial, sans-serif'; // fallback
      });
    });

    it('returns CSS variables when readonly is false', () => {
      mockGetCssVariable.mockImplementation(
        (path, fallback) => `var(--${path.join('-')}, ${fallback})`,
      );

      const result = getCompositeValueFromToken(
        mockSchema,
        typographyToken,
        mockPath,
        false,
      );

      expect(result).toEqual({
        fontFamily: 'var(--color-_primary-fontFamily, Arial, sans-serif)',
        fontSize: 'var(--color-_primary-fontSize, 16px)',
        fontStyle: 'var(--color-_primary-fontStyle, normal)',
        fontVariant: 'var(--color-_primary-fontVariant, normal)',
        fontWeight: 'var(--color-_primary-fontWeight, 400)',
        fontWidth: 'var(--color-_primary-fontWidth, normal)',
        lineHeight: 'var(--color-_primary-lineHeight, 1.5)',
      });

      expect(mockGetCssVariable).toHaveBeenCalledTimes(7);
    });

    it('returns raw values when readonly is true', () => {
      const result = getCompositeValueFromToken(
        mockSchema,
        typographyToken,
        mockPath,
        true,
      );

      expect(result).toEqual({
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: '400',
        fontWidth: 'normal',
        lineHeight: '1.5',
      });

      expect(mockGetCssVariable).not.toHaveBeenCalled();
    });
  });

  describe('Unsupported token types', () => {
    const unsupportedToken = {
      $type: Type.Color,
      $value: '#000000',
      $description: 'A color token',
    } as unknown as IressDesignToken;

    it('returns empty object for unsupported token types', () => {
      const result = getCompositeValueFromToken(
        mockSchema,
        unsupportedToken,
        mockPath,
      );

      expect(result).toEqual({});
      expect(mockGetTransformedFallback).not.toHaveBeenCalled();
      expect(mockGetCssVariable).not.toHaveBeenCalled();
    });
  });

  describe('Path transformation', () => {
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

    it('transforms path correctly by prefixing last segment with underscore', () => {
      mockGetTransformedFallback.mockReturnValue('#000000');
      mockGetCssVariable.mockReturnValue('var(--test)');

      getCompositeValueFromToken(
        mockSchema,
        shadowToken,
        ['spacing', 'small'],
        false,
      );

      expect(mockGetCssVariable).toHaveBeenCalledWith(
        ['spacing', '_small', 'color'],
        '#000000',
        undefined,
      );
    });
  });

  describe('Edge cases', () => {
    it('handles undefined values gracefully', () => {
      const shadowToken = {
        $type: Type.Shadow,
        $value: {
          color: '#000000',
          offsetX: undefined,
          offsetY: undefined,
          blur: undefined,
          spread: undefined,
        },
        $description: 'A shadow token with undefined values',
      } as unknown as IressDesignToken;

      mockGetTransformedFallback.mockReturnValue('');

      const result = getCompositeValueFromToken(
        mockSchema,
        shadowToken,
        mockPath,
        true,
      );

      expect(result).toEqual({
        color: '',
        offsetX: '',
        offsetY: '',
        blur: '',
        spread: '',
      });
    });

    it('handles empty shadow array', () => {
      const shadowArrayToken = {
        $type: Type.Shadow,
        $value: [],
        $description: 'An empty shadow array token',
      } as unknown as IressDesignToken;

      const result = getCompositeValueFromToken(
        mockSchema,
        shadowArrayToken,
        mockPath,
        true,
      );

      expect(result).toEqual({});
    });
  });
});

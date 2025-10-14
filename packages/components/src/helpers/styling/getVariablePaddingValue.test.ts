import { describe, it, expect } from 'vitest';
import { getVariablePaddingValue, PanelPadding } from './getVariablePadding';

describe('getVariablePaddingValue', () => {
  describe('with string padding', () => {
    it('should return the string padding value', () => {
      expect(getVariablePaddingValue('sm', 'md')).toBe('sm');
      expect(getVariablePaddingValue('lg', 'xs')).toBe('lg');
    });
  });

  describe('with non-responsive object padding', () => {
    it('should return the value for the specified key', () => {
      const padding = { t: 'sm', b: 'md', l: 'lg', r: 'none' } as PanelPadding;
      expect(getVariablePaddingValue(padding, 'md', 't')).toBe('sm');
      expect(getVariablePaddingValue(padding, 'xs', 'b')).toBe('md');
      expect(getVariablePaddingValue(padding, 'lg', 'l')).toBe('lg');
      expect(getVariablePaddingValue(padding, 'xl', 'r')).toBe('none');
    });

    it('should return undefined when key is not provided', () => {
      const padding = { t: 'sm', b: 'md' } as PanelPadding;
      expect(getVariablePaddingValue(padding, 'md')).toStrictEqual({
        t: 'sm',
        b: 'md',
      });
    });

    it('should return undefined when key does not exist', () => {
      const padding = { t: 'sm', b: 'md' } as PanelPadding;
      expect(getVariablePaddingValue(padding, 'md', 'l')).toStrictEqual({
        t: 'sm',
        b: 'md',
      });
    });
  });

  describe('with responsive object padding', () => {
    it('should return value from the exact matching breakpoint', () => {
      const padding = {
        xs: 'sm',
        md: 'lg',
        xl: 'none',
      } as PanelPadding;
      expect(getVariablePaddingValue(padding, 'xs')).toBe('sm');
      expect(getVariablePaddingValue(padding, 'md')).toBe('lg');
      expect(getVariablePaddingValue(padding, 'xl')).toBe('none');
    });

    it('should fallback to the closest smaller breakpoint', () => {
      const padding = {
        xs: 'sm',
        md: 'lg',
        xl: 'none',
      } as PanelPadding;
      expect(getVariablePaddingValue(padding, 'sm')).toBe('sm');
      expect(getVariablePaddingValue(padding, 'lg')).toBe('lg');
    });

    it('should handle complex responsive padding with keys', () => {
      const padding = {
        xs: { t: 'sm', b: 'lg', l: 'md', r: 'sm' },
        md: { t: 'lg', r: 'none' },
        xl: { b: 'none', l: 'sm' },
      } as PanelPadding;

      expect(getVariablePaddingValue(padding, 'xs', 't')).toBe('sm');
      expect(getVariablePaddingValue(padding, 'sm', 'b')).toBe('lg');
      expect(getVariablePaddingValue(padding, 'md', 't')).toBe('lg');
      expect(getVariablePaddingValue(padding, 'md', 'b')).toBe(undefined);
      expect(getVariablePaddingValue(padding, 'lg', 'r')).toBe('none');
      expect(getVariablePaddingValue(padding, 'xl', 'b')).toBe('none');
      expect(getVariablePaddingValue(padding, 'xl', 't')).toBe(undefined);
    });

    it('should return undefined for invalid breakpoints', () => {
      const padding = { xs: 'sm', md: 'lg' } as PanelPadding;
      expect(getVariablePaddingValue(padding, 'invalid')).toBeUndefined();
    });

    it('should handle null values in responsive objects', () => {
      const padding = {
        xs: { t: 'sm', b: 'lg' },
        md: null,
        xl: { t: 'none' },
      } as PanelPadding;

      expect(getVariablePaddingValue(padding, 'md', 't')).toBe('sm');
      expect(getVariablePaddingValue(padding, 'lg', 'b')).toBe('lg');
      expect(getVariablePaddingValue(padding, 'xl', 't')).toBe('none');
      expect(getVariablePaddingValue(padding, 'xl', 'b')).toBe(undefined);
    });
  });
});

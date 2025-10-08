import { describe, it, expect } from 'vitest';
import { getCssVariable } from './getCssVariable';

describe('getCssVariable', () => {
  it('converts a simple path array to CSS variable without fallback', () => {
    const result = getCssVariable(['color', 'primary']);
    expect(result).toBe('var(--iress-color-primary)');
  });

  it('converts a nested path array to CSS variable without fallback', () => {
    const result = getCssVariable(['color', 'primary', 'blue']);
    expect(result).toBe('var(--iress-color-primary-blue)');
  });

  it('converts a path array with numbers to CSS variable', () => {
    const result = getCssVariable(['spacing', '4']);
    expect(result).toBe('var(--iress-spacing-4)');
  });

  it('converts a single element path array to CSS variable', () => {
    const result = getCssVariable(['primary']);
    expect(result).toBe('var(--iress-primary)');
  });

  it('handles empty path array', () => {
    const result = getCssVariable([]);
    expect(result).toBe('var(--iress-)');
  });

  it('adds string fallback value', () => {
    const result = getCssVariable(['color', 'primary'], '#000000');
    expect(result).toBe('var(--iress-color-primary, #000000)');
  });

  it('adds numeric fallback value', () => {
    const result = getCssVariable(['spacing', 'base'], 16);
    expect(result).toBe('var(--iress-spacing-base, 16)');
  });

  it('adds fallback with special characters', () => {
    const result = getCssVariable(
      ['shadow', 'default'],
      '0 2px 4px rgba(0,0,0,0.1)',
    );
    expect(result).toBe(
      'var(--iress-shadow-default, 0 2px 4px rgba(0,0,0,0.1))',
    );
  });

  it('handles camelCase to dash conversion', () => {
    const result = getCssVariable(['borderRadius', 'small']);
    expect(result).toBe('var(--iress-border-radius-small)');
  });

  it('handles multiple camelCase conversions', () => {
    const result = getCssVariable(['fontSize', 'extraSmall']);
    expect(result).toBe('var(--iress-font-size-extra-small)');
  });

  it('handles mixed camelCase and regular strings', () => {
    const result = getCssVariable(['backgroundColor', 'primary', 'hover']);
    expect(result).toBe('var(--iress-background-color-primary-hover)');
  });

  it('handles path with underscores', () => {
    const result = getCssVariable(['color_primary_blue']);
    expect(result).toBe('var(--iress-color-primary-blue)');
  });

  it('handles complex nested path with fallback', () => {
    const result = getCssVariable(
      ['component', 'button', 'primary', 'background'],
      'var(--iress-color-blue-500)',
    );
    expect(result).toBe(
      'var(--iress-component-button-primary-background, var(--iress-color-blue-500))',
    );
  });

  it('returns correct type - always a string', () => {
    const result = getCssVariable(['test']);
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^var\(--iress-/);
  });
});

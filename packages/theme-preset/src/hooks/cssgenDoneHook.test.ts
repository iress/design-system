import { describe, it, expect } from 'vitest';
import { cssgenDoneHook } from './cssgenDoneHook';

describe('cssgenDoneHook', () => {
  it('ignores non-styles.css artifacts', () => {
    const result = cssgenDoneHook('tokens', '.gap_sm{gap:var(--spacing-sm)}');
    expect(result).toBeUndefined();
  });

  it('removes alias utility classes that reference alias vars', () => {
    const css =
      '.gap_spacing\\.2{gap:var(--spacing-spacing\\.2)}' +
      '.gap_sm{gap:var(--spacing-sm)}' +
      '.p_xs{padding:var(--spacing-xs)}';

    const result = cssgenDoneHook('styles.css', css);
    expect(result).toContain(
      '.gap_spacing\\.2{gap:var(--spacing-spacing\\.2)}',
    );
    expect(result).not.toContain('.gap_sm{');
    expect(result).not.toContain('.p_xs{');
  });

  it('removes negative alias utility classes', () => {
    const css = '.mt_-sm{margin-top:calc(var(--spacing-sm) * -1)}';
    const result = cssgenDoneHook('styles.css', css);
    expect(result).not.toContain('.mt_-sm{');
  });

  it('removes alias :root variable definitions', () => {
    const css =
      ':root{--spacing-sm:var(--spacing-spacing\\.2);--spacing-spacing\\.2:0.5rem}';
    const result = cssgenDoneHook('styles.css', css);
    expect(result).not.toContain('--spacing-sm:');
    expect(result).toContain('--spacing-spacing\\.2:0.5rem');
  });

  it('preserves canonical classes untouched', () => {
    const css =
      '.gap_spacing\\.2{gap:var(--spacing-spacing\\.2)}' +
      '.mt_spacing\\.0{margin-top:var(--spacing-spacing\\.0)}';
    const result = cssgenDoneHook('styles.css', css);
    expect(result).toBe(css);
  });

  it('handles all six aliases', () => {
    const aliases = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
    const css = aliases
      .map((a) => `.gap_${a}{gap:var(--spacing-${a})}`)
      .join('');

    const result = cssgenDoneHook('styles.css', css);
    for (const alias of aliases) {
      expect(result).not.toContain(`.gap_${alias}{`);
    }
  });
});

import { describe, expect, it, vi } from 'vitest';
import { cssVars } from '@iress-oss/ids-tokens';
import { focusable } from './focusable';

describe('focusable select-activator', () => {
  const styles = focusable.transform?.('select-activator', {
    token: Object.assign(vi.fn(), { raw: vi.fn() }),
    raw: 'select-activator',
    utils: { colorMix: vi.fn() },
  });

  it('uses the validation border colour even when unfocused', () => {
    expect(styles).toHaveProperty(
      'borderColor',
      `var(--iress-border-color, ${cssVars.colour.neutral[70]})`,
    );
  });

  it('keeps the validation border colour while focused, active or expanded', () => {
    expect(styles).toHaveProperty(
      '&:focus-within, &:active, &[aria-expanded="true"]',
      expect.objectContaining({
        borderColor: `var(--iress-border-color, ${cssVars.colour.neutral[80]})`,
        boxShadow: `0 0 0 1px var(--iress-border-color, ${cssVars.colour.neutral[80]})`,
      }),
    );
  });
});

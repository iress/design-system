import { describe, it, expect } from 'vitest';
import { SPACING_ALIAS_MAP } from './spacingAliasMap';

describe('spacingAliasMap', () => {
  it('derives all aliases from ids-tokens schema', () => {
    expect(SPACING_ALIAS_MAP).toEqual({
      none: 'spacing.0',
      xs: 'spacing.1',
      sm: 'spacing.2',
      md: 'spacing.4',
      lg: 'spacing.6',
      xl: 'spacing.10',
    });
  });
});

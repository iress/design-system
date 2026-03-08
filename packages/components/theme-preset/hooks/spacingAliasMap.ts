import { spacing } from '@iress-oss/ids-tokens';

/**
 * Derives the alias-to-canonical spacing map from the ids-tokens schema.
 * e.g. { none: 'spacing.0', xs: 'spacing.1', sm: 'spacing.2', ... }
 */
export const SPACING_ALIAS_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(spacing).flatMap(([key, token]) => {
    const aliases = (token as { $extensions?: { 'iress.aliases'?: string[] } })
      .$extensions?.['iress.aliases'];
    return aliases ? aliases.map((alias) => [alias, `spacing.${key}`]) : [];
  }),
);

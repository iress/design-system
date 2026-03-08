import { defineUtility } from '@pandacss/dev';
import { spacing, SPACING_TOKENS } from '../tokens/spacing';
import { cssVars } from '@iress-oss/ids-tokens';

export const gutter = defineUtility({
  className: 'gutter',
  values: SPACING_TOKENS,
  transform: (value: keyof typeof spacing) => {
    if (!value || !(value in spacing)) {
      return {};
    }

    return {
      '--col-gap': spacing[value].value,
      marginInline: `calc(-1 * var(--col-gap) / 2)`,
      columnGap: cssVars.spacing[0],
      rowGap: `var(--col-gap)`,
    };
  },
});

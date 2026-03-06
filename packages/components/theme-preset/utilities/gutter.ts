import { defineUtility } from '@pandacss/dev';
import { spacing, SPACING_TOKENS } from '../tokens/spacing';

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
      columnGap: spacing['spacing.0'].value,
      rowGap: `var(--col-gap)`,
    };
  },
});

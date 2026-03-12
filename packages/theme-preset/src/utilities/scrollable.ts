import { defineUtility } from '@pandacss/dev';
import type { NestedCssProperties } from '@pandacss/types';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { sizes } from '../tokens/sizes';

export const scrollable = defineUtility({
  className: 'scrollable',
  values: ['x', 'y', 'true'],
  transform: (direction: 'x' | 'y' | 'true' | boolean = true) => {
    if (direction === false) {
      return {};
    }

    let overflowProp: keyof NestedCssProperties = 'overflow';

    if (direction === 'x') {
      overflowProp = 'overflowX';
    } else if (direction === 'y') {
      overflowProp = 'overflowY';
    }

    return {
      [overflowProp]: 'auto',

      '&::-webkit-scrollbar': {
        width: sizes['typography.base'].value,
        height: sizes['typography.base'].value,
      },

      '&::-webkit-scrollbar-track': {
        background: colors.page.value,
        borderRadius: radii['radius.system.layout'].value,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: colors['colour.neutral.50'].value,
        borderRadius: radii['radius.system.form'].value,
      },

      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: colors['colour.primary.fill'].value,
      },

      '&::-webkit-scrollbar-corner': {
        background: colors.transparent.value,
      },

      scrollbarWidth: 'thin',
      scrollbarColor: `${colors['colour.neutral.50'].value} ${colors.page.value}`,
    } as NestedCssProperties;
  },
});

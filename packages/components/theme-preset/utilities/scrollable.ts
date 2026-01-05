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
      scrollbarGutter: 'stable',

      '&::-webkit-scrollbar': {
        width: sizes['typography.base'].value,
        height: sizes['typography.base'].value,
      },

      '&::-webkit-scrollbar-track': {
        background: colors.alt.value,
        borderRadius: radii['radius.100'].value,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: colors['colour.neutral.60'].value,
        borderRadius: radii['radius.025'].value,
      },

      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: colors['colour.primary.fill'].value,
      },

      '&::-webkit-scrollbar-corner': {
        background: colors.transparent.value,
      },

      scrollbarWidth: 'thin',
      scrollbarColor: `${colors['colour.neutral.60'].value} ${colors.alt.value}`,
    } as NestedCssProperties;
  },
});

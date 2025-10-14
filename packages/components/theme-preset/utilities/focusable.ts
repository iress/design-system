import { cssVars } from '@iress-oss/ids-tokens';
import { defineUtility } from '@pandacss/dev';

export const focusable = defineUtility({
  className: 'focusable',
  values: ['true', 'within'],
  transform: (value) => {
    if (value === 'within') {
      return {
        '&:focus-visible, & :focus': {
          outline: 'none',
        },
        '&:focus-within': {
          boxShadow: cssVars.elevation.focus.shadow,
        },
      };
    }
    return {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: cssVars.elevation.focus.shadow,
      },
    };
  },
});

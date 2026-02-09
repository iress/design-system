import { sva } from '@/styled-system/css';

export const selectSearchInput = sva({
  slots: ['root'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style paint',
      borderWidth: '0px',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'colour.neutral.70',
      zIndex: '[100]',
      overflow: 'hidden',
      focusable: 'has-input-compact',

      '&&': {
        borderRadius: 'radius.0',
      },

      '& div:first-child': {
        borderBottomColor: 'transparent',
        borderRadius: 'radius.0',
      },

      '&:has(input:focus, textarea:focus) > *': {
        backgroundColor: 'transparent',
      },
    },
  },
  variants: {},
});

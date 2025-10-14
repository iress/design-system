import { sva } from '@/styled-system/css';

export const selectSearchInput = sva({
  slots: ['root'],
  base: {
    root: {
      borderWidth: '0px',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'colour.neutral.70',
      zIndex: '[100]',
      overflow: 'hidden',

      '&&': {
        borderRadius: 'radius.000',
      },

      '& div:first-child': {
        borderBottomColor: 'transparent',
        borderRadius: 'radius.000',
      },

      '&:has(input:focus, textarea:focus)': {
        border: '[none]',
        layerStyle: 'elevation.focusCompact',
      },

      '&:has(input:focus, textarea:focus) > *': {
        backgroundColor: 'transparent',
      },
    },
  },
  variants: {},
});

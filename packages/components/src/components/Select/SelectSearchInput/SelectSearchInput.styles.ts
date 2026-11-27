import { sva } from '@/styled-system/css';

export const selectSearchInput = sva({
  slots: ['root'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style paint',
      zIndex: '[100]',
      // `clip` (not `hidden`) so the browser can't scroll this element when the
      // input is focused in a narrow popover, which would push the icon out.
      overflow: 'clip',

      '& > div:first-child': {
        borderRadius: 'radius.0',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        '--iress-shadow-focus': 'inset 0 -1px 0 0 {colors.colour.neutral.80}',
      },

      '&:has(input:focus, textarea:focus) > *': {
        backgroundColor: 'transparent',
      },
    },
  },
  variants: {},
});

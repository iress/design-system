import { sva } from '@/styled-system/css';

export const autoComplete = sva({
  slots: ['root', 'popoverContent', 'optionList'],
  base: {
    root: {},
    popoverContent: {},
    optionList: {
      _empty: {
        display: 'none',
      },
    },
  },
  variants: {
    isEmpty: {
      true: {
        popoverContent: {
          display: 'none',
        },
      },
    },
  },
});

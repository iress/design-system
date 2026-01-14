import { sva } from '@/styled-system/css';

export const autoComplete = sva({
  slots: ['root', 'popoverContent', 'optionList'],
  base: {
    root: {},
    popoverContent: {
      _empty: {
        display: 'none',
      },
    },
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

import { sva } from '@/styled-system/css';

export const tagInput = sva({
  slots: ['input', 'tag'],
  base: {
    input: {
      flexWrap: 'wrap',
      pl: 'spacing.1',

      '& > :first-child': {
        display: 'contents',
        minHeight: '[0px]',
      },

      '& > input': {
        width: 'auto',
      },
    },
  },
});

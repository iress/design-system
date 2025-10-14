import { sva } from '@/styled-system/css';

export const tagInput = sva({
  slots: ['input', 'tag'],
  base: {
    input: {
      flexWrap: 'wrap',
      rowGap: 'xs',
      py: 'xs',

      '& > :first-child': {
        display: 'contents',
        minHeight: '[0px]',
      },

      '& > input': {
        width: 'auto',
        minHeight: '[calc({sizes.input.height} - {spacing.xs} * 2.5)]',
        py: 'none',
      },
    },
    tag: {
      marginLeft: 'xs',
    },
  },
});

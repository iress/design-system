import { sva } from '@/styled-system/css';

export const tagInput = sva({
  slots: ['input', 'tag'],
  base: {
    input: {
      '& > .iress-form-element__inner': {
        flexWrap: 'wrap',
        pl: 'spacing.1',
      },

      '& > .iress-form-element__inner > :first-child': {
        display: 'contents',
        minHeight: '[0px]',
      },

      '& > .iress-form-element__inner > input': {
        width: 'auto',
        pl: 'spacing.1',
      },
    },
  },
});

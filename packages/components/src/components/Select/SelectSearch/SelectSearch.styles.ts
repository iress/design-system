import { sva } from '@/styled-system/css';

export const selectSearch = sva({
  slots: ['root', 'content'],
  base: {
    root: {
      borderWidth: '0',
      '&&': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    content: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '[none]',

      '&:has(.ids-select-body)': {
        overflow: 'hidden',

        '& .ids-select-body': {
          maxHeight: '[none]',
        },
      },
    },
  },
});

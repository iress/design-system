import { sva } from '@/styled-system/css';

export const selectBody = sva({
  slots: ['selectBody', 'children'],
  base: {
    selectBody: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '[30rem]',
      flex: '1',
      width: '[100%]',
      overflowY: 'auto',
    },
    children: {
      flex: '1',
      overflowX: 'hidden',
    },
  },
});

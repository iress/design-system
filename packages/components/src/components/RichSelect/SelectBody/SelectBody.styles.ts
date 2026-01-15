import { sva } from '@/styled-system/css';

export const selectBody = sva({
  slots: ['selectBody', 'children'],
  base: {
    selectBody: {
      // Performance: CSS containment (no paint due to overflow)
      contain: 'layout style',
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

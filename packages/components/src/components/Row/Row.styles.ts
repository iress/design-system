import { cva } from '@/styled-system/css';

export const row = cva({
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
});

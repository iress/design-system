import { cva } from '@/styled-system/css';

export const col = cva({
  base: {
    display: 'block',
    boxSizing: 'border-box',
    span: 'auto',
  },
  variants: {
    alignSelf: {
      start: {
        alignSelf: 'start',
      },
      end: {
        alignSelf: 'end',
      },
      center: {
        alignSelf: 'center',
      },
      stretch: {
        alignSelf: 'stretch',
      },
    },
  },
  defaultVariants: {},
});

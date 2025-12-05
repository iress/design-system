import { cva } from '@/styled-system/css';

export const stack = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '& > :not(.ids-field)': {
      marginBlock: 'spacing.0', // If you stick it in a stack, you should be using gap instead of margin to space the items inside the stack
    },
  },
  variants: {
    horizontalAlign: {
      center: {
        alignItems: 'center',
      },
      left: {
        alignItems: 'flex-start',
      },
      right: {
        alignItems: 'flex-end',
      },
    },
  },
});

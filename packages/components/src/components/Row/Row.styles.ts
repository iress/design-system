import { cva } from '@/styled-system/css';

export const row = cva({
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  variants: {
    horizontalAlign: {
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'flex-end',
      },
      around: {
        justifyContent: 'space-around',
      },
      between: {
        justifyContent: 'space-between',
      },
      evenly: {
        justifyContent: 'space-evenly',
      },
    },
    verticalAlign: {
      top: {
        alignItems: 'flex-start',
      },
      middle: {
        alignItems: 'center',
      },
      bottom: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },
  },
  defaultVariants: {
    horizontalAlign: 'left',
    verticalAlign: 'top',
  },
});

import { cva } from '@/styled-system/css';

export const icon = cva({
  variants: {
    flip: {
      horizontal: {
        transform: 'scaleX(-1)',
      },
      vertical: {
        transform: 'scaleY(-1)',
      },
      both: {
        transform: 'scale(-1)',
      },
    },
    rotate: {
      90: {
        transform: 'rotate(90deg)',
      },
      180: {
        transform: 'rotate(180deg)',
      },
      270: {
        transform: 'rotate(270deg)',
      },
    },
    spin: {
      half: {
        animationStyle: 'icon-spin-half',
      },
      1: {
        animationStyle: 'icon-spin-1',
      },
      2: {
        animationStyle: 'icon-spin-2',
      },
      3: {
        animationStyle: 'icon-spin-3',
      },
    },
  },
});

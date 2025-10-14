import { cva } from '@/styled-system/css';

export const panel = cva({
  base: {
    display: 'block',
    boxSizing: 'border-box',
    borderRadius: 'radius.system.layout',
    padding: 'md',
    bg: 'colour.neutral.10',
  },
  variants: {
    noBorderRadius: {
      true: {
        borderRadius: 'radius.000',
      },
    },
  },
  defaultVariants: {
    noBorderRadius: false,
  },
});

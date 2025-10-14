import { cva } from '@/styled-system/css';

export const image = cva({
  base: {
    display: 'block',
    height: 'auto',
    objectFit: 'contain',
  },
  variants: {},
  defaultVariants: {},
});

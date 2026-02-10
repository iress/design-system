import { cva } from '@/styled-system/css';

export const panel = cva({
  base: {
    // Performance: CSS containment (no paint to allow overflow)
    contain: 'style',
    display: 'block',
    boxSizing: 'border-box',
    borderRadius: 'radius.system.layout',
    padding: 'md',
    bg: 'colour.neutral.10',
  },
  variants: {
    noBorderRadius: {
      true: {
        borderRadius: 'radius.0',
      },
    },
  },
  defaultVariants: {
    noBorderRadius: false,
  },
});

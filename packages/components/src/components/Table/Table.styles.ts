import { cva } from '@/styled-system/css';
export { table } from '@/styled-system/recipes';

export const tableCell = cva({
  base: {
    textAlign: 'start',
  },
  variants: {
    format: {
      default: { textAlign: 'start' },
      number: { '&&': { textAlign: 'end' } },
      currency: { '&&': { textAlign: 'end' } },
    },
    divider: {
      true: {
        borderInlineEnd: 'table',
      },
    },
  },
  defaultVariants: {
    format: 'default',
    divider: false,
  },
});

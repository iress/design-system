import { cva } from '@/styled-system/css';

export const divider = cva({
  base: {
    display: 'block',
    color: 'colour.neutral.30',
    borderColor: '[currentColor]',
    m: 'spacing.0',
  },
  variants: {
    vertical: {
      true: {
        display: 'inline-block',
        alignSelf: 'stretch',
        borderInlineStartWidth: '1px',
        borderInlineStartStyle: 'solid',
        height: 'auto',
        minHeight: '[1em]',
        verticalAlign: 'middle',
      },
      false: {
        display: 'block',
        borderBlockStartWidth: '1px',
        borderBlockStartStyle: 'solid',
      },
    },
  },
  defaultVariants: {
    vertical: false,
  },
});

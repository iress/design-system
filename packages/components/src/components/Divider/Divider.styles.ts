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
        minHeight: '[1em]',
        verticalAlign: 'middle',
      },
      false: {
        display: 'block',
        borderBlockStartWidth: '1px',
        borderBlockStartStyle: 'solid',
      },
    },
    verticalStretch: {
      true: {
        height: '[100%]',
        alignSelf: 'center',
      },
    },
  },
  compoundVariants: [
    {
      vertical: true,
      verticalStretch: false,
      css: {
        height: 'auto',
      },
    },
  ],
  defaultVariants: {
    vertical: false,
  },
});

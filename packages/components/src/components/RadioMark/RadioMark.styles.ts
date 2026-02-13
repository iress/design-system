import { cva } from '@/styled-system/css';

export const radioMark = cva({
  base: {
    boxSizing: 'border-box',
    position: 'relative',
    border: 'input',
    borderColor: 'var(--iress-border-color, {colors.colour.neutral.70})',
    backgroundColor: 'colour.neutral.10',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '[1.4em]',
    height: '[1.4em]',
    borderRadius: '[100%]',
    marginInlineEnd: 'spacing.2',
    flexShrink: 0,
    color: '[currentColor]',
    '& circle': {
      fill: '[currentColor]',
      display: 'none',
    },
    focusable: 'group',
  },
  variants: {
    checked: {
      true: {
        '--iress-border-color': 'currentColor',

        '& circle': {
          display: 'block',
        },
      },
      false: {
        _hover: {
          backgroundColor: 'colour.primary.surfaceHover',
        },
      },
    },
  },
  defaultVariants: {
    checked: false,
  },
});

import { cva } from '@/styled-system/css';

export const radioMark = cva({
  base: {
    boxSizing: 'border-box',
    position: 'relative',
    border: 'input',
    borderColor: 'var(--iress-border-color, currentColor)',
    color: 'colour.neutral.70',
    backgroundColor: 'colour.neutral.10',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'mark.size',
    minWidth: 'mark.size',
    height: 'mark.size',
    borderRadius: '50%',
    marginInlineEnd: 'spacing.2',
    flexShrink: 0,
    '& circle': {
      fill: '[currentColor]',
      display: 'none',
    },
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

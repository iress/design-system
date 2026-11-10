import { cva } from '@/styled-system/css';

export const icon = cva({
  base: {},
  variants: {
    type: {
      fontawesome: {},
      material: {
        lineHeight: 'inherit',
        materialSymbols: 'true',
        scale: '[1.5]',
        textTransform: 'none',
        '&:not([class*="textStyle_typography"])': {
          fontSize: 'inherit',
        },
      },
    },
    filled: {
      true: {
        materialSymbols: 'filled',
      },
    },
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
    loading: {
      true: {
        visibility: 'hidden',
        width: 'icon.sm',
        height: 'icon.sm',
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
  compoundVariants: [
    {
      type: 'material',
      filled: true,
      css: {
        materialSymbols: 'filled',
      },
    },
  ],
});

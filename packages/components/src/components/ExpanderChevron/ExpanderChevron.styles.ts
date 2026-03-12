import { cva } from '@/styled-system/css';

export const expanderChevron = cva({
  base: {
    width: 'icon.md',
    height: 'icon.md',
    color: '[currentColor]',
    bg: 'colour.neutral.30',
    borderRadius: '50%',
    transition: '[all 0.3s ease-in-out]',
    flexShrink: 0,
  },
  variants: {
    open: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
    inline: {
      true: {
        bg: 'transparent',
        fill: '[currentColor]',
      },
    },
  },
});

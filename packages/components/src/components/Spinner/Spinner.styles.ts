import { cva, sva } from '@/styled-system/css';

export const spinner = cva({
  base: {
    boxSizing: 'border-box',
  },
  variants: {},
});

export const chatty = sva({
  slots: ['root', 'dot'],
  base: {
    root: {
      // Performance: CSS containment (no paint to allow animation effects)
      contain: 'layout style',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'spacing.1',
    },
    dot: {
      width: '[0.5em]',
      height: '[0.5em]',
      borderRadius: '50%',
      bg: 'colour.neutral.50',
      animation: 'chatty 1.4s infinite ease-in-out',
      '&:nth-child(1)': {
        animationDelay: '0s',
      },
      '&:nth-child(2)': {
        animationDelay: '0.2s',
      },
      '&:nth-child(3)': {
        animationDelay: '0.4s',
      },
    },
  },
});

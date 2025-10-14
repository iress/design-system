import { sva } from '@/styled-system/css';

export const form = sva({
  slots: ['root', 'actions', 'header', 'footer', 'children'],
  base: {
    root: {},
  },
  variants: {
    pattern: {
      long: {
        actions: {
          ml: 'auto',
          textAlign: 'right',
        },
        footer: {
          mt: 'md',
        },
        header: {
          position: 'sticky',
          top: 'none',
          bg: 'colour.neutral.10',
          zIndex: '100',
          py: 'md',
        },
      },
      short: {},
    },
    sticky: {
      true: {
        header: {
          position: 'sticky',
          top: '[0]',
          zIndex: '200',
        },
      },
    },
  },
  defaultVariants: {
    pattern: 'short',
  },
});

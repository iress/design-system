import { sva } from '@/styled-system/css';

export const toaster = sva({
  slots: ['root'],
  base: {
    root: {
      display: 'flex',
      position: 'fixed',
      width: '[500px]',
      maxWidth: '12/12',
      zIndex: '500',
      padding: 'spacing.7',
      boxSizing: 'border-box',
      '&:empty': {
        display: 'none',
      },
    },
  },
  variants: {
    position: {
      'bottom-end': {
        root: {
          insetBlockEnd: '[var(--iress-toaster-offset, 0px)]',
          insetInlineEnd: '[0]',
        },
      },
      'bottom-start': {
        root: {
          insetBlockEnd: '[var(--iress-toaster-offset, 0px)]',
          insetInlineStart: '[0]',
        },
      },
      'bottom-center': {
        root: {
          insetBlockEnd: '[var(--iress-toaster-offset, 0px)]',
          insetInlineStart: '[50%]',
          transform: 'translateX(-50%)',
        },
      },
      'top-end': {
        root: {
          insetBlockStart: '[var(--iress-toaster-offset, 0px)]',
          insetInlineEnd: '[0]',
        },
      },
      'top-start': {
        root: {
          insetBlockStart: '[var(--iress-toaster-offset, 0px)]',
          insetInlineStart: '[0]',
        },
      },
      'top-center': {
        root: {
          insetBlockStart: '[var(--iress-toaster-offset, 0px)]',
          insetInlineStart: '[50%]',
          transform: 'translateX(-50%)',
        },
      },
    },
  },
  defaultVariants: {
    position: 'top-end',
  },
});

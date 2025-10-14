import { sva } from '@/styled-system/css';

export const toaster = sva({
  slots: ['root'],
  base: {
    root: {
      display: 'flex',
      position: 'fixed',
      width: '[500px]',
      maxWidth: '[100%]',
      zIndex: '500',
      padding: 'spacing.700',
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
          insetBlockEnd: '[0]',
          insetInlineEnd: '[0]',
        },
      },
      'bottom-start': {
        root: {
          insetBlockEnd: '[0]',
          insetInlineStart: '[0]',
        },
      },
      'bottom-center': {
        root: {
          insetBlockEnd: '[0]',
          insetInlineStart: '[50%]',
          transform: 'translateX(-50%)',
        },
      },
      'top-end': {
        root: {
          insetBlockStart: '[0]',
          insetInlineEnd: '[0]',
        },
      },
      'top-start': {
        root: {
          insetBlockStart: '[0]',
          insetInlineStart: '[0]',
        },
      },
      'top-center': {
        root: {
          insetBlockStart: '[0]',
          insetInlineStart: '[50%]',
          transform: 'translateX(-50%)',
        },
      },
    },
  },
  defaultVariants: {
    position: 'bottom-end',
  },
});

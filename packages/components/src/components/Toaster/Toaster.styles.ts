import { sva } from '@/styled-system/css';

// Note: this string must stay in sync with TOASTER_OFFSET_VAR in @/constants.
// Template literals with imported constants cannot be statically analysed by
// Panda CSS, so the literal CSS variable reference is used here to ensure the
// correct utility classes are emitted during code-generation.
const TOASTER_OFFSET_CSS_VAR = 'var(--iress-toaster-offset, 0px)';

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
          insetBlockEnd: TOASTER_OFFSET_CSS_VAR,
          insetInlineEnd: '[0]',
        },
      },
      'bottom-start': {
        root: {
          insetBlockEnd: TOASTER_OFFSET_CSS_VAR,
          insetInlineStart: '[0]',
        },
      },
      'bottom-center': {
        root: {
          insetBlockEnd: TOASTER_OFFSET_CSS_VAR,
          insetInlineStart: '[50%]',
          transform: 'translateX(-50%)',
        },
      },
      'top-end': {
        root: {
          insetBlockStart: TOASTER_OFFSET_CSS_VAR,
          insetInlineEnd: '[0]',
        },
      },
      'top-start': {
        root: {
          insetBlockStart: TOASTER_OFFSET_CSS_VAR,
          insetInlineStart: '[0]',
        },
      },
      'top-center': {
        root: {
          insetBlockStart: TOASTER_OFFSET_CSS_VAR,
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

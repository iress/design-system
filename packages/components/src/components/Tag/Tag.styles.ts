import { sva } from '@/styled-system/css';

export const tag = sva({
  slots: ['root', 'content', 'deleteButton'],
  base: {
    root: {
      alignItems: 'center',
      bg: 'colour.neutral.20',
      border: 'divider',
      borderRadius: 'radius.system.badge',
      display: 'inline-flex',
      gap: 'spacing.1',
      px: 'xs',
      transition: 'colors',
    },
    content: {
      lineHeight: 1,
    },
    deleteButton: {
      '& button': {
        color: '[inherit]',
        fontSize: 'inherit',
        minWidth: '[0]',
        minHeight: '[0]',
        py: 'spacing.0',
        px: 'spacing.0',
        mx: 'spacing.1',

        _after: {
          display: 'none',
        },
      },
    },
  },
  variants: {
    active: {
      true: {
        root: {
          bg: 'colour.primary.surface',
          borderColor: 'colour.primary.fill',
          color: 'colour.primary.text',
        },
      },
    },
    customDeleteButton: {
      true: {
        root: {
          '&:has(button:hover)': {
            bg: 'colour.primary.surface',
            borderColor: 'colour.primary.fill',
            color: 'colour.primary.text',
          },
        },
      },
      false: {
        root: {
          '&:has(button:hover)': {
            bg: 'colour.system.danger.surface',
            borderColor: 'colour.system.danger.fill',
            color: 'colour.system.danger.text',
          },
        },
      },
    },
  },
  defaultVariants: {
    customDeleteButton: false,
  },
});

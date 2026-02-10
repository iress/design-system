import { sva } from '@/styled-system/css';

export const tag = sva({
  slots: ['root', 'content', 'deleteButton'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style',
      alignItems: 'center',
      bg: 'colour.neutral.20',
      borderRadius: 'radius.system.tag',
      border: 'divider',
      color: 'colour.neutral.80',
      display: 'inline-flex',
      gap: 'spacing.1',
      p: 'spacing.1',
      transition: '[all .2s]',
      textStyle: 'typography.body.sm',
    },
    deleteButton: {
      my: '-spacing.1',
      mr: '-spacing.1',

      '& button': {
        color: '[inherit]',
        fontSize: 'inherit',
        minWidth: '[0]',
        minHeight: '[0]',
        p: 'spacing.1',
        m: 'spacing.0',

        _hover: {
          bg: 'transparent',
          borderColor: 'transparent',
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
    clickable: {
      true: {
        root: {
          focusable: 'true',

          _hover: {
            bg: 'colour.primary.surface',
            borderColor: 'colour.primary.fill',
            color: 'colour.primary.text',
            cursor: 'pointer',
          },

          _active: {
            boxShadow:
              'color-mix(in srgb, {colors.colour.primary.surface}, transparent 60%) 0px 0px 0px 3px',
          },
        },
      },
    },
    compact: {
      true: {
        root: {
          py: 'spacing.0',
          height: '[calc({sizes.input.height} - {spacing.spacing.2} - 2px)]',
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
    mode: {
      '10': {
        root: {
          bg: 'colour.data.subtle.10',
          borderColor: 'colour.data.subtle.10',
          color: 'colour.data.bold.10',
        },
      },
      '20': {
        root: {
          bg: 'colour.data.subtle.20',
          borderColor: 'colour.data.subtle.20',
          color: 'colour.data.bold.20',
        },
      },
      '30': {
        root: {
          bg: 'colour.data.subtle.30',
          borderColor: 'colour.data.subtle.30',
          color: 'colour.data.bold.30',
        },
      },
      '40': {
        root: {
          bg: 'colour.data.subtle.40',
          borderColor: 'colour.data.subtle.40',
          color: 'colour.data.bold.40',
        },
      },
      '50': {
        root: {
          bg: 'colour.data.subtle.50',
          borderColor: 'colour.data.subtle.50',
          color: 'colour.data.bold.50',
        },
      },
      '60': {
        root: {
          bg: 'colour.data.subtle.60',
          borderColor: 'colour.data.subtle.60',
          color: 'colour.data.bold.60',
        },
      },
      '70': {
        root: {
          bg: 'colour.data.subtle.70',
          borderColor: 'colour.data.subtle.70',
          color: 'colour.data.bold.70',
        },
      },
      '80': {
        root: {
          bg: 'colour.data.subtle.80',
          borderColor: 'colour.data.subtle.80',
          color: 'colour.data.bold.80',
        },
      },
      '90': {
        root: {
          bg: 'colour.data.subtle.90',
          borderColor: 'colour.data.subtle.90',
          color: 'colour.data.bold.90',
        },
      },
    },
  },
  defaultVariants: {
    customDeleteButton: false,
    mode: '90',
  },
});

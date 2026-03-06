import { sva } from '@/styled-system/css';

export const tag = sva({
  slots: ['root', 'content', 'deleteButton'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style',
      alignItems: 'center',
      bg: '[var(--tag-bg, {colors.colour.neutral.20})]',
      borderRadius: 'radius.system.tag',
      border: 'divider',
      borderColor: '[var(--tag-border)]',
      color: '[var(--tag-color, {colors.colour.neutral.80})]',
      display: 'inline-flex',
      gap: 'spacing.1',
      p: 'spacing.1',
      transition: '[all 0.2s ease-in-out]',
      textStyle: 'typography.body.sm',
      focusable: 'has-button',
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
          '--tag-bg': '{colors.colour.data.subtle.10}',
          '--tag-border': '{colors.colour.data.subtle.10}',
          '--tag-color': '{colors.colour.data.bold.10}',
        },
      },
      '20': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.20}',
          '--tag-border': '{colors.colour.data.subtle.20}',
          '--tag-color': '{colors.colour.data.bold.20}',
        },
      },
      '30': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.30}',
          '--tag-border': '{colors.colour.data.subtle.30}',
          '--tag-color': '{colors.colour.data.bold.30}',
        },
      },
      '40': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.40}',
          '--tag-border': '{colors.colour.data.subtle.40}',
          '--tag-color': '{colors.colour.data.bold.40}',
        },
      },
      '50': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.50}',
          '--tag-border': '{colors.colour.data.subtle.50}',
          '--tag-color': '{colors.colour.data.bold.50}',
        },
      },
      '60': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.60}',
          '--tag-border': '{colors.colour.data.subtle.60}',
          '--tag-color': '{colors.colour.data.bold.60}',
        },
      },
      '70': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.70}',
          '--tag-border': '{colors.colour.data.subtle.70}',
          '--tag-color': '{colors.colour.data.bold.70}',
        },
      },
      '80': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.80}',
          '--tag-border': '{colors.colour.data.subtle.80}',
          '--tag-color': '{colors.colour.data.bold.80}',
        },
      },
      '90': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.90}',
          '--tag-border': '{colors.colour.data.subtle.90}',
          '--tag-color': '{colors.colour.data.bold.90}',
        },
      },
    },
  },
  defaultVariants: {
    customDeleteButton: false,
    mode: '90',
  },
});

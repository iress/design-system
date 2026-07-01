import { sva } from '@/styled-system/css';

export const tag = sva({
  slots: ['root', 'content', 'deleteButton'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style',
      alignItems: 'center',
      bg: '[var(--tag-bg, {colors.colour.neutral.30})]',
      borderRadius: 'radius.system.tag',
      border: 'divider',
      borderColor: '[var(--tag-bg, {colors.colour.neutral.30})]',
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
          cursor: 'pointer',
          focusable: 'true',
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
          '--tag-border': '{colors.colour.data.bold.10}',
          '--tag-color': '{colors.colour.data.bold.10}',
        },
      },
      '20': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.20}',
          '--tag-border': '{colors.colour.data.bold.20}',
          '--tag-color': '{colors.colour.data.bold.20}',
        },
      },
      '30': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.30}',
          '--tag-border': '{colors.colour.data.bold.30}',
          '--tag-color': '{colors.colour.data.bold.30}',
        },
      },
      '40': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.40}',
          '--tag-border': '{colors.colour.data.bold.40}',
          '--tag-color': '{colors.colour.data.bold.40}',
        },
      },
      '50': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.50}',
          '--tag-border': '{colors.colour.data.bold.50}',
          '--tag-color': '{colors.colour.data.bold.50}',
        },
      },
      '60': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.60}',
          '--tag-border': '{colors.colour.data.bold.60}',
          '--tag-color': '{colors.colour.data.bold.60}',
        },
      },
      '70': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.70}',
          '--tag-border': '{colors.colour.data.bold.70}',
          '--tag-color': '{colors.colour.data.bold.70}',
        },
      },
      '80': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.80}',
          '--tag-border': '{colors.colour.data.bold.80}',
          '--tag-color': '{colors.colour.data.bold.80}',
        },
      },
      '90': {
        root: {
          '--tag-bg': '{colors.colour.data.subtle.90}',
          '--tag-border': '{colors.colour.data.bold.90}',
          '--tag-color': '{colors.colour.data.bold.90}',
        },
      },
      danger: {
        root: {
          '--tag-bg': '{colors.colour.system.danger.surface}',
          '--tag-border': '{colors.colour.system.danger.text}',
          '--tag-color': '{colors.colour.system.danger.text}',
        },
      },
      info: {
        root: {
          '--tag-bg': '{colors.colour.system.info.surface}',
          '--tag-border': '{colors.colour.system.info.text}',
          '--tag-color': '{colors.colour.system.info.text}',
        },
      },
      success: {
        root: {
          '--tag-bg': '{colors.colour.system.success.surface}',
          '--tag-border': '{colors.colour.system.success.text}',
          '--tag-color': '{colors.colour.system.success.text}',
        },
      },
      warning: {
        root: {
          '--tag-bg': '{colors.colour.system.warning.surface}',
          '--tag-border': '{colors.colour.system.warning.text}',
          '--tag-color': '{colors.colour.system.warning.text}',
        },
      },
    },
    bordered: {
      true: {
        root: {
          borderColor: '[var(--tag-border, {colors.colour.neutral.70})]',
        },
      },
    },
  },
  compoundVariants: [
    {
      bordered: true,
      clickable: true,
      css: {
        root: {
          _hover: {
            boxShadow: '[0 0 0 1px currentColor]',
          },
          _active: {
            boxShadow:
              '[0 0 0 1px currentColor, 0px 0px 0px 4px color-mix(in srgb, currentColor, transparent 60%)]',
          },
        },
      },
    },
    {
      bordered: false,
      clickable: true,
      css: {
        root: {
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
  ],
  defaultVariants: {
    customDeleteButton: false,
  },
});

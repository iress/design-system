import { sva } from '@/styled-system/css';

export const tag = sva({
  slots: ['root', 'content', 'deleteButton'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style',
      alignItems: 'center',
      bg: 'colour.neutral.20',
      border: 'divider',
      borderRadius: 'radius.system.badge',
      color: 'colour.neutral.80',
      display: 'inline-flex',
      gap: 'spacing.1',
      py: 'xs',
      px: 'sm',
      transition: '[all .2s]',
      textStyle: 'typography.body.md',
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

          _focus: {
            outline: '[none]',
          },

          _focusVisible: {
            layerStyle: 'elevation.focus',
          },
        },
      },
    },
    compact: {
      true: {
        root: {
          height: '[calc({sizes.input.height} - {spacing.spacing.2} - 2px)]',
          py: 'none',
          px: 'xs',
          textStyle: 'typography.body.sm',
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

import { sva } from '@/styled-system/css';

export const contextualMenu = sva({
  slots: ['root', 'trigger', 'menu', 'item'],
  base: {
    root: {
      display: 'inline-flex',
      position: 'relative',
    },
    trigger: {
      color: 'colour.neutral.90',
      transition: 'all',
    },
    menu: {
      '&&': {
        border: 'table',
        borderRadius: 'radius.3',
      },
    },
    item: {
      color: 'colour.neutral.70',
      '&&': {
        px: 'spacing.3',
        py: 'spacing.1',
        gap: 'spacing.2',
        textStyle: 'typography.body.sm',
      },
      '&:first-child': {
        borderTopRadius: 'radius.3',
      },
      '&:last-child': {
        borderBottomRadius: 'radius.3',
      },
      '& .ids-icon': {
        scale: '[1.25]',
      },
    },
  },
  variants: {
    size: {
      small: {
        trigger: {
          textStyle: 'typography.body.sm.medium',
          minWidth: 'input.height.sm',
          minHeight: 'input.height.sm',
          px: 'spacing.1',
        },
      },
      medium: {
        trigger: {
          textStyle: 'typography.body.md.medium',
        },
      },
    },
    bordered: {
      true: {
        trigger: {
          border: 'table',

          '&[aria-expanded="true"]': {
            bg: 'colour.neutral.30',
            borderColor: 'colour.neutral.40',

            _hover: {
              borderColor: 'colour.neutral.40',
            },
          },
        },
      },
      false: {
        trigger: {
          border: 'transparent',

          '&[aria-expanded="true"]': {
            bg: 'colour.neutral.30',
            borderColor: 'colour.neutral.30',

            _hover: {
              borderColor: 'colour.neutral.20',
            },
          },
        },
      },
    },
    theme: {
      light: {
        trigger: {
          _hover: {
            bg: 'colour.neutral.20',
          },
        },
      },
      dark: {
        trigger: {
          _hover: {
            bg: 'colour.neutral.10',
          },
        },
      },
    },
  },
});

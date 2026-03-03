import { sva } from '@/styled-system/css';

export const radio = sva({
  slots: ['root', 'input', 'label', 'content', 'mark', 'heading'],
  base: {
    root: {
      // Performance: CSS containment (no paint to allow focus ring/shadow)
      contain: 'layout style',
      color: 'colour.primary.fill',
      display: 'flex',
      position: 'relative',
      textStyle: 'typography.body.md.medium',
      '&:has(input:disabled)': {
        opacity: '[0.5]',
        cursor: 'not-allowed',
        '& label': {
          pointerEvents: 'none',
        },
      },
    },
    input: {
      srOnly: true,
    },
    label: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 'radius.system.form',
      lineHeight: '1.5',
      margin: 'none',
      cursor: 'pointer',
    },
    content: {
      font: 'inherit',
      color: 'colour.neutral.90',
    },
    heading: {
      display: 'block',
    },
    mark: {
      focusable: 'group',
      color: '[currentColor]',
      flexShrink: 0,
    },
  },
  variants: {
    checked: {
      true: {
        label: {
          borderColor: '[currentColor]',
        },
      },
    },
    variant: {
      card: {
        root: {
          textStyle: 'typography.body.md',
        },
        label: {
          p: 'spacing.4',
          width: '12/12',
          cursor: 'pointer',
          borderRadius: 'radius.system.layout',
          border: 'table',
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'start',
          _hover: {
            backgroundColor: 'colour.neutral.20',
          },
        },
        content: {
          flex: '1',
        },
        mark: {
          flex: '[0]',
          mr: 'none',
          focusable: 'true',
        },
        input: {
          focusable: 'label-after',
        },
      },
      touch: {
        label: {
          border: 'table',
          borderRadius: 'radius.system.form',
          p: 'spacing.3',

          _hover: {
            bg: 'colour.neutral.20',
          },
        },
        mark: {
          focusable: 'true',
        },
        input: {
          focusable: 'label-after',
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: ['card', 'touch'],
      checked: true,
      css: {
        label: {
          borderWidth: '2px',
        },
      },
    },
  ],
});

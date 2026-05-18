import { sva } from '@/styled-system/css';

export const checkbox = sva({
  slots: ['root', 'label', 'content', 'mark', 'heading', 'input'],
  base: {
    root: {
      // Performance: CSS containment (no paint to allow focus ring/shadow)
      contain: 'layout style',
      color: 'colour.primary.fill',
      display: 'flex',
      position: 'relative',
      textStyle: 'typography.body.md',
      '&:has(input:disabled)': {
        cursor: 'not-allowed',
        '& label': {
          pointerEvents: 'none',
        },
      },
    },
    label: {
      lineHeight: '1.5',
      margin: 'spacing.0',
      display: 'inline-flex',
      cursor: 'pointer',
    },
    heading: {
      display: 'block',
    },
    content: {
      font: 'inherit',
      color: 'colour.neutral.80',
    },
    mark: {
      color: '[currentColor]',
      marginInlineEnd: 'spacing.2',
      flexShrink: 0,
      focusable: 'group',
      '.group:has(input:disabled) &': {
        opacity: '[0.5]',
      },
    },
    input: {
      srOnly: true,
    },
  },
  variants: {
    hiddenLabel: {
      true: {
        label: {
          display: 'inline-block',
        },
        mark: {
          marginInlineEnd: 'spacing.0',
        },
        content: {
          srOnly: true,
        },
      },
    },
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

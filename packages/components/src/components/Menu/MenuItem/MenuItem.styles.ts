import { sva } from '@/styled-system/css';

export const menuItem = sva({
  slots: ['root', 'checkboxMark', 'append', 'contents'],
  base: {
    root: {
      color: 'colour.neutral.70',
      cursor: 'pointer',
      display: 'flex',
      width: '[100%]',
      px: 'spacing.3',
      py: 'spacing.2',
      textAlign: 'left',
      textDecoration: 'none',
      textStyle: 'typography.body.md',
      transition: '[all 0.2s ease-in-out]',

      _hover: {
        bg: 'colour.neutral.20',
      },

      '&:active': {
        bg: 'colour.neutral.30',
        color: 'colour.neutral.90',
      },
    },
    contents: {
      m: 'none',
    },
    append: {
      marginInlineStart: 'auto',
    },
  },
  variants: {
    active: {
      true: {
        root: {
          bg: 'colour.neutral.20',
        },
      },
    },
    hasAppendOrPrepend: {
      true: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: 'spacing.2',
        },
      },
    },
    insidePopover: {
      true: {
        root: {},
      },
    },
    isActiveInPopover: {
      true: {
        root: {
          bg: 'colour.neutral.20',
        },
      },
    },
    isHeading: {
      true: {
        root: {
          pb: 'spacing.1',

          '&:not(:first-child)': {
            pt: 'spacing.4',
          },
        },
      },
    },
    layout: {
      stack: {},
      inline: {
        root: {
          alignItems: 'center',
          justifyContent: 'center',
          height: '[100%]',
          py: 'spacing.4',
        },
      },
      'inline-equal-width': {
        root: {
          alignItems: 'center',
          justifyContent: 'center',
          height: '[100%]',
          textAlign: 'center',
          py: 'spacing.4',
        },
        contents: {
          flex: '1',
        },
      },
    },
    multiSelect: {
      true: {},
    },
    numbered: {
      true: {
        root: {
          _before: {
            content: 'counter(menu-step, decimal-leading-zero)',
            aspectRatio: '1',
            borderRadius: '50%',
            border: '[2px solid currentColor]',
            width: '[2em]',
            height: '[2em]',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '[0]',
          },

          '&:not(.ids-menu__group-activator, .ids-menu__group *)': {
            counterIncrement: 'menu-step',
          },

          '.ids-menu__group &': {
            _before: {
              display: 'none',
            },
          },
        },
      },
    },
    noWrap: {
      true: {
        root: {
          overflow: 'hidden',
        },
        contents: {
          whiteSpace: 'nowrap',
        },
      },
    },
    role: {
      listitem: {
        root: {
          focusable: 'inset',
        },
      },
      menuitem: {
        root: {
          focusable: 'inset',
        },
      },
      option: {
        root: {
          _focusVisible: {
            bg: 'colour.neutral.30',
            color: 'colour.neutral.90',
            outline: '[0]',
          },
        },
      },
    },
    selected: {
      true: {
        root: {
          color: 'colour.neutral.90',
          position: 'relative',

          _after: {
            content: '""',
            position: 'absolute',
            top: 'spacing.0',
            left: 'spacing.0',
            bottom: 'spacing.0',
            width: '[2px]',
            bg: 'colour.primary.fill',
          },
        },
      },
    },
    variant: {
      side: {
        root: {
          color: 'colour.neutral.70',
          textStyle: 'typography.heading.4',
          px: 'spacing.4',
          borderTop: 'table',

          _hover: {
            bg: 'colour.neutral.30',
            color: 'colour.primary.text',
          },

          '.ids-menu__group &': {
            textStyle: 'typography.body.md.regular',
            borderTop: '[none]',
          },
        },
      },
      rail: {
        root: {
          color: 'colour.primary.onFill',
          borderRadius: 'radius.system.button',

          _hover: {
            bg: 'colour.primary.surface',
            color: 'colour.primary.text',
          },
        },
      },
      radio: {},
      subdraw: {},
    },
  },
  compoundVariants: [
    {
      layout: 'stack',
      multiSelect: false,
      selected: true,
      css: {
        root: {
          _after: {
            content: '""',
            position: 'absolute',
            top: 'spacing.0',
            left: 'spacing.0',
            bottom: 'spacing.0',
            width: '[2px]',
            bg: 'colour.primary.fill',
            borderRadius: 'radius.system.button',
          },
        },
      },
    },
    {
      layout: ['inline', 'inline-equal-width'],
      multiSelect: false,
      selected: true,
      css: {
        root: {
          _after: {
            position: 'absolute',
            left: 'spacing.0',
            right: 'spacing.0',
            bottom: 'spacing.0',
            top: '[auto]',
            width: 'auto',
            height: '[2px]',
          },
        },
      },
    },
    {
      selected: true,
      isActiveInPopover: true,
      css: {
        root: {
          bg: 'colour.neutral.30',
        },
      },
    },
    {
      role: 'menuitem',
      isActiveInPopover: true,
      css: {
        root: {
          bg: 'colour.neutral.10',
        },
      },
    },
    {
      variant: 'rail',
      selected: true,
      css: {
        root: {
          color: 'colour.primary.fill',
          bg: 'colour.primary.onFill',

          _after: {
            display: 'none',
          },
        },
      },
    },
    {
      variant: 'rail',
      role: ['listitem', 'menuitem', 'option'],
      css: {
        root: {
          focusable: 'colour.primary.onFill',
        },
      },
    },
  ],
  defaultVariants: {
    layout: 'stack',
  },
});

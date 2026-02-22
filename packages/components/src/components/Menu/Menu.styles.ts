import { sva } from '@/styled-system/css';

export const menu = sva({
  slots: ['root', 'item', 'checkboxMark', 'append', 'contents', 'text'],
  base: {
    root: {
      maxWidth: '[100%]',
    },
    contents: {
      m: 'none',
    },
    item: {
      color: 'colour.neutral.70',
      cursor: 'pointer',
      display: 'flex',
      width: '[100%]',
      px: 'spacing.3',
      py: 'spacing.2',
      textAlign: 'left',
      textDecoration: 'none',
      textStyle: 'typography.body.md',
      transition: '[0.2s all ease-in-out]',

      _hover: {
        bg: 'colour.neutral.20',
      },

      '&:active': {
        bg: 'colour.neutral.30',
        color: 'colour.neutral.90',
      },
    },
    text: {
      px: 'spacing.3',
      py: 'spacing.2',
    },
    append: {
      marginInlineStart: 'auto',
    },
  },
  variants: {
    active: {
      true: {
        item: {
          bg: 'colour.primary.surface',
          borderColor: 'colour.primary.text',
          color: 'colour.primary.text',
        },
      },
    },
    fluid: {
      true: {
        root: {
          width: '[100%]',
        },
      },
    },
    hasAppendOrPrepend: {
      true: {
        item: {
          display: 'flex',
          alignItems: 'center',
          gap: 'spacing.2',
        },
        text: {
          display: 'flex',
          alignItems: 'center',
          gap: 'spacing.2',
        },
      },
    },
    heading: {
      true: {
        text: {
          pb: 'spacing.1',

          '&:not(:first-child)': {
            pt: 'spacing.4',
          },
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
        item: {
          bg: 'colour.neutral.20',
        },
      },
    },
    layout: {
      stack: {
        root: {
          display: 'inline-flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
        },
      },
      inline: {
        root: {
          display: 'inline-flex',
          columnGap: 'spacing.1',
          flexWrap: 'wrap',
        },
        item: {
          alignItems: 'center',
          justifyContent: 'center',
          height: '[100%]',
          py: 'spacing.4',
        },
      },
      'inline-equal-width': {
        root: {
          display: 'flex',
          flexDirection: 'row',
          columnGap: 'spacing.1',

          '& > :not(hr)': {
            flex: '1',
            textAlign: 'center',
          },
        },
        item: {
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
    noWrap: {
      true: {
        root: {
          '& > *': {
            maxWidth: '[100%]',
          },
        },
        item: {
          overflow: 'hidden',
        },
        text: {
          overflow: 'hidden',
        },
        contents: {
          whiteSpace: 'nowrap',
        },
      },
    },
    role: {
      listitem: {
        item: {
          focusable: 'inset',
        },
      },
      menuitem: {
        item: {
          focusable: 'inset',
        },
      },
      option: {
        item: {
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
        item: {
          color: 'colour.neutral.90',
          position: 'relative',

          _before: {
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
  },
  compoundVariants: [
    {
      layout: 'stack',
      multiSelect: false,
      selected: true,
      css: {
        item: {
          _after: {
            content: '""',
            position: 'absolute',
            top: 'spacing.0',
            left: 'spacing.0',
            bottom: 'spacing.0',
            width: '[{radii.radius.system.button}]',
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
        item: {
          _before: {
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
      layout: 'stack',
      insidePopover: true,
      css: {
        root: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    {
      selected: true,
      isActiveInPopover: true,
      css: {
        item: {
          bg: 'colour.neutral.30',
        },
      },
    },
    {
      role: 'menuitem',
      isActiveInPopover: true,
      css: {
        item: {
          bg: 'colour.neutral.10',
        },
      },
    },
  ],
  defaultVariants: {
    layout: 'stack',
  },
});

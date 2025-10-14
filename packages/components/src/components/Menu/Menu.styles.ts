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
      borderRadius: 'radius.system.badge',
      color: 'colour.neutral.80',
      cursor: 'pointer',
      display: 'flex',
      width: '[100%]',
      px: 'md',
      py: 'sm',
      textAlign: 'left',
      textDecoration: 'none',
      textStyle: 'typography.body.md',
      transition: '[0.2s all ease-in-out]',

      _focus: {
        outline: '[none]',
        bg: 'colour.primary.surface',
        color: 'colour.primary.text',
      },

      _focusVisible: {
        layerStyle: 'elevation.focus',
        zIndex: '[1]',
      },

      _hover: {
        bg: 'colour.primary.surface',
        color: 'colour.primary.text',
      },
    },
    text: {
      px: 'md',
      py: 'sm',
    },
    append: {
      marginInlineStart: 'auto',
    },
  },
  variants: {
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
          gap: 'sm',
        },
        text: {
          display: 'flex',
          alignItems: 'center',
          gap: 'sm',
        },
      },
    },
    heading: {
      true: {
        text: {
          pb: 'xs',

          '&:not(:first-child)': {
            pt: 'md',
          },
        },
      },
    },
    insidePopover: {
      true: {
        root: {
          my: 'spacing.200',
          px: 'spacing.200',
        },
      },
    },
    isActiveInPopover: {
      true: {
        item: {
          bg: 'colour.primary.surface',
          color: 'colour.primary.text',
        },
      },
    },
    layout: {
      stack: {
        root: {
          display: 'inline-flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          rowGap: 'spacing.100',
        },
      },
      inline: {
        root: {
          display: 'inline-flex',
          columnGap: 'spacing.100',
          flexWrap: 'wrap',
        },
        item: {
          alignItems: 'center',
          justifyContent: 'center',
          height: '[100%]',
        },
      },
      'inline-equal-width': {
        root: {
          display: 'flex',
          flexDirection: 'row',
          columnGap: 'spacing.100',

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
    selected: {
      true: {
        item: {
          bg: 'colour.neutral.20',
          color: 'colour.primary.text',
          position: 'relative',
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
            top: 'spacing.000',
            left: 'spacing.000',
            bottom: 'spacing.000',
            width: '[{radii.radius.025}]',
            bg: 'colour.primary.fill',
            borderRadius: 'radius.system.badge',
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
          _after: {
            content: '""',
            position: 'absolute',
            left: 'spacing.000',
            right: 'spacing.000',
            bottom: 'spacing.000',
            height: '[{radii.radius.025}]',
            bg: 'colour.primary.fill',
            borderRadius: 'radius.system.badge',
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
          bg: 'colour.primary.surfaceHover',
        },
      },
    },
  ],
  defaultVariants: {
    layout: 'stack',
  },
});

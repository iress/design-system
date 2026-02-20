import { sva } from '@/styled-system/css';

export const card = sva({
  slots: ['root', 'prepend', 'heading', 'topRight', 'media', 'body', 'footer'],
  base: {
    root: {
      // Performance: CSS containment (no paint to allow overflow)
      contain: 'layout style',
      position: 'relative',
      borderRadius: 'radius.system.layout',
      bg: 'colour.neutral.10',
      color: 'colour.neutral.80',
      border: 'table',
      textStyle: 'typography.body.md',
      textAlign: 'start',
      noGutter: true,
      padding: 'spacing.4',
      transition: 'all',
      focusable: 'true',
    },
    prepend: {
      gridArea: 'prepend',
      padding: 'spacing.4',
    },
    heading: {
      gridArea: 'heading',
      padding: 'spacing.4',
      '& > h1:not([class]), & > h2:not([class]), & > h3:not([class]), & > h4:not([class]), & > h5:not([class]), & > h6:not([class])':
        {
          textStyle: 'typography.heading.3',
          mb: 'spacing.0',
        },
      '& a': {
        color: 'colour.primary.text',
        textDecoration: 'underline',
        _hover: {
          textDecoration: 'none',
        },
      },
    },
    topRight: {
      gridArea: 'topRight',
      padding: 'spacing.2',
    },
    media: {
      gridArea: 'media',
      padding: 'spacing.0',
      borderRadius: 'radius.system.layout',
      overflow: 'hidden',
      '& img': {
        display: 'block',
        width: '[100%]',
        height: 'auto',
        maxWidth: '[100%]',
      },
      '&:not(:last-child)': {
        borderBottomRadius: 'radius.0',
        borderBottomLeftRadius: 'radius.0',
      },
    },
    body: {
      gridArea: 'body',
      padding: 'spacing.4',
    },
    footer: {
      gridArea: 'footer',
      padding: 'spacing.4',
      borderBlockStart: 'divider',
    },
  },
  variants: {
    clickable: {
      true: {
        root: {
          cursor: 'pointer',
          focusable: 'true',
          _hover: {
            borderColor: 'colour.primary.fill',
          },
        },
      },
    },
    element: {
      a: {},
      button: {
        root: {
          width: '[100%]',
        },
      },
      div: {},
    },
    selected: {
      true: {
        root: {
          borderWidth: '[0px]',
          borderColor: 'colour.primary.fill',
          _after: {
            content: '""',
            position: 'absolute',
            inset: '[0]',
            borderColor: 'colour.primary.fill',
            borderStyle: 'solid',
            borderWidth: '[2px]',
            borderRadius: 'radius.system.layout',
            pointerEvents: '[none]',
          },
        },
      },
    },
    stretch: {
      true: {
        root: {
          flex: '1',
          width: '[100%]',
          stretch: true,
        },
      },
    },
    hasSlots: {
      true: {
        root: {
          display: 'grid',
          gridTemplateAreas: '"prepend body topRight" "footer footer footer"',
          gridAutoColumns: '[minmax(0, min-content) auto min-content]',
          gridAutoRows: '[auto min-content]',
          padding: 'spacing.0',
        },
      },
    },
    hasPrepend: {
      true: {},
    },
    hasHeading: {
      true: {},
    },
    hasMedia: {
      true: {
        root: {
          padding: 'spacing.0',
        },
      },
    },
    noBorder: {
      true: {
        root: {
          border: '[none]',
        },
      },
    },
  },
  compoundVariants: [
    {
      hasSlots: true,
      hasHeading: true,
      css: {
        root: {
          gridTemplateAreas:
            '"prepend heading topRight" "prepend body body" "footer footer footer"',
          gridAutoColumns: '[minmax(0, min-content) auto min-content]',
          gridAutoRows: '[min-content auto min-content]',
        },
        heading: {
          '&:not(:last-child)': {
            paddingBlockEnd: 'spacing.2',
          },
        },
        body: {
          paddingBlockStart: 'spacing.0',
        },
      },
    },
    {
      hasSlots: true,
      hasMedia: true,
      css: {
        root: {
          gridTemplateAreas:
            '"prepend media media" "prepend body topRight" "footer footer footer"',
          gridAutoColumns: '[minmax(0, min-content) auto]',
          gridAutoRows: '[min-content auto min-content]',
          position: 'relative',
          padding: 'spacing.0',
        },
      },
    },
    {
      hasSlots: true,
      hasHeading: true,
      hasMedia: true,
      css: {
        root: {
          gridTemplateAreas:
            '"prepend media media" "prepend heading topRight" "prepend body body" "footer footer footer"',
          gridAutoColumns: '[minmax(0, min-content) auto]',
          gridAutoRows: '[min-content min-content auto min-content]',
        },
        topRight: {
          pt: 'spacing.3',
        },
      },
    },
    {
      hasSlots: true,
      hasPrepend: true,
      css: {
        heading: {
          paddingInlineStart: 'spacing.0',
        },
        body: {
          paddingInlineStart: 'spacing.0',
        },
      },
    },
  ],
  defaultVariants: {},
});

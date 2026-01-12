import { sva } from '@/styled-system/css';

export const expander = sva({
  slots: [
    'root',
    'activator',
    'chevron',
    'content',
    'container',
    'containerInner',
  ],
  base: {
    root: {
      display: 'block',

      '&:has([aria-controls]:focus-visible)': {
        layerStyle: 'elevation.focusNoBorder',
      },
    },
    activator: {
      display: 'inline-block',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'auto',
      bg: 'transparent',
      cursor: 'pointer',
      position: 'relative',

      _focusVisible: {
        outline: '[none]',
      },
    },
    chevron: {
      width: '[1.5em]',
      height: '[1.5em]',
      color: 'colour.neutral.90',
      transition: '[all 0.3s ease-in-out]',
    },
    container: {
      display: 'grid',
      gridTemplateRows: '0fr',
      transition: '[grid-template-rows 0.3s ease-in-out]',
    },
    containerInner: {
      overflow: 'hidden',
    },
    content: {
      py: 'spacing.2',
    },
  },
  variants: {
    mode: {
      section: {
        root: {
          border: 'table',
          borderRadius: 'radius.system.layout',
          p: 'spacing.4',
          transition: 'colors',

          '&:has([aria-controls]:hover)': {
            borderColor: 'colour.primary.fill',
          },
        },
        activator: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '[100%]',
          textStyle: 'typography.heading.3',

          _hover: {
            color: 'colour.primary.text',
          },
        },
        chevron: {
          bg: 'colour.neutral.30',
          borderRadius: '50%',

          _groupHover: {
            bg: 'colour.primary.surfaceHover',
          },
        },
      },
      link: {
        activator: {
          color: 'colour.primary.text',
          textDecoration: 'underline',

          _before: {
            borderRadius: 'radius.system.badge',
          },

          _hover: {
            textDecoration: 'none',
          },
        },
        chevron: {
          display: 'inline',
        },
      },
    },
    open: {
      true: {
        chevron: {
          transform: 'rotate(180deg)',
        },
        container: {
          gridTemplateRows: '1fr',
        },
      },
    },
  },
  defaultVariants: {
    mode: 'section',
    open: false,
  },
});

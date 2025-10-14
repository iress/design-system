import { sva } from '@/styled-system/css';

export const expander = sva({
  slots: ['root', 'activator', 'content', 'container', 'containerInner'],
  base: {
    root: {
      display: 'block',
    },
    activator: {
      display: 'inline-block',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'auto',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      tableChevron: true,
      position: 'relative',

      _before: {
        content: '""',
        position: 'absolute',
        top: '[-1.5px]',
        left: '[-1.5px]',
        right: '[-1.5px]',
        bottom: '[-1.5px]',
        pointerEvents: 'none',
        zIndex: '[-1]',
        borderRadius: 'radius.system.badge',
      },

      _focusVisible: {
        outline: '[none]',
        _before: {
          layerStyle: 'elevation.focus',
        },
      },
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
      py: 'spacing.200',
    },
  },
  variants: {
    mode: {
      section: {
        activator: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '[100%]',
          textStyle: 'typography.heading.4',
          py: 'spacing.300',
          borderBottom: 'divider',
          transition: '[all 0.2s ease-in-out]',

          _after: {
            mr: 'spacing.200',
          },

          _hover: {
            color: 'colour.primary.text',
            borderBottom: 'hover',
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
      },
    },
    open: {
      true: {
        activator: {
          tableChevron: false,
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

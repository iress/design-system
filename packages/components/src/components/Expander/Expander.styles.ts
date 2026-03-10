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
      // Performance: CSS containment (no paint to allow overflow)
      contain: 'layout style',
      display: 'block',
    },
    activator: {
      display: 'inline-block',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'auto',
      bg: 'transparent',
      cursor: 'pointer',
      position: 'relative',
      focusable: 'true',
    },
    chevron: {},
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
        },
        activator: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '12/12',
          textStyle: 'typography.heading.3',
          px: 'spacing.4',
          py: 'spacing.3',
          borderRadius: 'radius.system.layout',
          transition: '[all 0.3s linear]',
          focusable: 'expander-activator',

          _hover: {
            bg: 'colour.neutral.20',
          },

          '&[aria-expanded="true"]': {
            borderBottomRadius: 'radius.0',
          },
        },
        content: {
          px: 'spacing.4',
          pb: 'spacing.4',
          pt: 'spacing.3',
        },
      },
      link: {
        activator: {
          color: 'colour.primary.text',
          textDecoration: 'underline',
          borderRadius: 'radius.system.button',

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

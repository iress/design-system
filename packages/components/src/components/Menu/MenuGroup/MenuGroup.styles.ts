import { sva } from '@/styled-system/css';

export const menuGroup = sva({
  slots: ['root', 'activator', 'content', 'wrapper'],
  base: {
    root: {
      position: 'relative',

      _before: {
        content: '""',
        position: 'absolute',
        left: 'spacing.0',
        top: 'spacing.0',
        bottom: 'spacing.0',
        width: '[4px]',
        bg: 'colour.primary.fill',
        pointerEvents: 'none',
        transform: 'scaleX(0)',
        transition: '[transform 150ms ease-in-out]',
        transformOrigin: 'top left',
        transitionDelay: '300ms',
      },
    },
    activator: {
      focusable: 'inset',
      appearance: 'none',
      transition: 'common',
      width: '12/12',
      display: 'flex',
      alignItems: 'center',
      gap: 'spacing.3',
      px: 'spacing.4',
      py: 'spacing.3',
      color: 'colour.neutral.70',
      cursor: 'pointer',

      '&&': {
        textStyle: 'typography.heading.4',
      },

      _hover: {
        bg: 'colour.neutral.20',
      },
    },
    content: {
      overflow: 'hidden',
      width: '12/12',
      bg: 'colour.neutral.20',
    },
    wrapper: {
      display: 'grid',
      gridTemplateRows: '0fr',
      transition: '[grid-template-rows 0.3s ease-in-out]',
    },
  },
  variants: {
    numbered: {
      true: {
        root: {
          counterIncrement: 'menu-step',
        },
        activator: {
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
        },
      },
    },
    open: {
      true: {
        root: {
          _before: {
            transform: 'scaleX(1)',
          },
        },

        activator: {
          color: 'colour.primary.text',
          bg: 'colour.neutral.20',
        },

        wrapper: {
          gridTemplateRows: '1fr',
        },
      },
    },
  },
});

import { sva } from '@/styled-system/css';

export const tabSet = sva({
  slots: [
    'root',
    'list',
    'listHolder',
    'panel',
    'activeIndicator',
    'hoverIndicator',
  ],
  base: {
    root: {
      bg: 'colour.neutral.10',
      borderRadius: 'radius.system.layout',
    },
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      borderBottom: 'divider',

      '& > :has(.ids-badge)': {
        mr: 'spacing.350',
      },
    },
    listHolder: {
      position: 'relative',
    },
    panel: {
      pt: 'md',

      _focusVisible: {
        layerStyle: 'elevation.focus',
        outline: '[none]',
      },
    },
    activeIndicator: {
      position: 'absolute',
      bottom: '[0]',
      left: '[0]',
      height: '[2px]',
      bg: 'colour.primary.text',
      transition: 'all',
    },
    hoverIndicator: {
      position: 'absolute',
      top: 'spacing.150',
      bottom: 'spacing.150',
      left: '[0]',
      bg: 'colour.primary.surfaceHover',
      transition: 'all',
      borderRadius: 'radius.system.button',
      pointerEvents: 'none',
    },
  },
  variants: {
    layout: {
      'top-left': {
        list: {
          justifyContent: 'flex-start',
        },
      },
      'top-center': {
        list: {
          justifyContent: 'center',
        },
        activeIndicator: {
          left: '[50%]',
        },
      },
      'top-right': {
        list: {
          justifyContent: 'flex-end',
        },
        activeIndicator: {
          left: '[100%]',
        },
      },
    },
  },
  defaultVariants: {
    layout: 'top-left',
  },
});

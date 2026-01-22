import { sva } from '@/styled-system/css';

export const tabSet = sva({
  slots: [
    'root',
    'list',
    'listHolder',
    'panel',
    'activeIndicator',
    'hoverIndicator',
    'overflowEndIndicator',
    'overflowStartIndicator',
  ],
  base: {
    root: {
      // Performance: CSS containment (no paint to allow overflow)
      contain: 'layout style',
      bg: 'colour.neutral.10',
      borderRadius: 'radius.system.layout',
    },
    listHolder: {
      position: 'relative',
      overflowX: 'clip',
      overflowY: 'visible',
      pt: 'spacing.2',

      _after: {
        content: '""',
        position: 'absolute',
        bottom: 'spacing.1',
        left: 'spacing.0',
        right: 'spacing.0',
        borderBottom: 'divider',
        pointerEvents: 'none',
      },
    },
    list: {
      display: 'flex',
      flexWrap: 'nowrap',
      scrollable: 'x',
      overflowY: 'visible',
      scrollSnapType: '[x proximity]',
      position: 'relative',
    },
    panel: {
      textStyle: 'typography.body.md',

      _focusVisible: {
        layerStyle: 'elevation.focus',
        outline: '[none]',
      },

      '& > :not([hidden])': {
        pt: 'sm',
      },
    },
    activeIndicator: {
      position: 'absolute',
      top: 'spacing.1',
      bottom: 'spacing.1',
      left: '[0]',
      bg: 'colour.neutral.20',
      transition: 'all',
      borderRadius: 'radius.075',
      borderBottomRadius: 'none',
      pointerEvents: 'none',

      _after: {
        content: '""',
        position: 'absolute',
        bottom: 'spacing.0',
        left: 'spacing.0',
        right: 'spacing.0',
        height: '[2px]',
        bg: 'colour.primary.text',
        transition: 'all',
        zIndex: '[2]',
      },
    },
    hoverIndicator: {
      position: 'absolute',
      top: 'spacing.1',
      bottom: 'spacing.1',
      left: '[0]',
      bg: 'colour.primary.surfaceHover',
      transition: 'all',
      borderRadius: 'radius.075',
      borderBottomRadius: 'none',
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
    overflowEnd: {
      true: {
        overflowEndIndicator: {
          layerStyle: 'elevation.overflow',
          position: 'absolute',
          top: 'spacing.0',
          bottom: 'spacing.1',
          right: 'spacing.0',
          width: 'input.4',
          pointerEvents: '[none]',
          maskImage: `[linear-gradient(to right, transparent 30%, black 100%)]`,
        },
      },
    },
    overflowStart: {
      true: {
        overflowStartIndicator: {
          layerStyle: 'elevation.overflow',
          position: 'absolute',
          top: 'spacing.0',
          bottom: 'spacing.1',
          left: 'spacing.0',
          width: 'input.4',
          pointerEvents: '[none]',
          maskImage: `[linear-gradient(to right, transparent 30%, black 100%)]`,
          transform: '[rotate(180deg)]',
        },
      },
    },
  },
  defaultVariants: {
    layout: 'top-left',
  },
});

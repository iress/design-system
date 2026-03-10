import { sva } from '@/styled-system/css';

export const slideout = sva({
  slots: ['root', 'content', 'footer', 'closeButton'],
  base: {
    root: {
      // Performance: CSS containment (no paint due to fixed positioning)
      contain: 'style',
      textStyle: 'typography.body.md',
      position: 'fixed',
      insetBlockStart: 'spacing.0',
      height: '12/12',
      maxWidth: '12/12',
      overflowY: 'auto',
      transition: '[all 0.3s ease-out]',
      layerStyle: 'floating',
      backgroundColor: 'colour.neutral.10',
      zIndex: '300',
      display: 'flex',
      flexDirection: 'column',
      _motionReduce: {
        transition: '[none]',
      },
      smDown: {
        width: '12/12',
      },
    },
    content: {
      overflow: 'auto',
      flex: '[1 1 auto]',
      scrollable: 'y',
    },
    footer: {
      borderBlockStart: 'divider',
    },
    closeButton: {
      position: 'absolute',
      insetInlineEnd: 'spacing.1',
      insetBlockStart: 'spacing.1',
    },
  },
  variants: {
    position: {
      right: {
        root: {
          insetInlineEnd: 'spacing.0',
          borderRadius: 'radius.system.layout',
          borderStartEndRadius: 'radius.0',
          borderEndEndRadius: 'radius.0',

          _motionReduce: {
            transition: '[none]',
          },
        },
      },
      left: {
        root: {
          insetInlineStart: 'spacing.0',
          borderRadius: 'radius.system.layout',
          borderStartStartRadius: 'radius.0',
          borderEndStartRadius: 'radius.0',

          _motionReduce: {
            transition: '[none]',
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          width: 'overlay.sm',
        },
      },
      md: {
        root: {
          width: 'overlay.md',
        },
      },
    },
    status: {
      initial: {
        root: {},
      },
      open: {
        root: {},
      },
      close: {
        root: {},
      },
      unmounted: {
        root: {
          display: 'none',
        },
      },
    },
    mode: {
      overlay: {},
      push: {
        root: {
          xl: {
            borderRadius: 'radius.0',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      position: 'right',
      size: 'sm',
      css: {
        root: {
          insetInlineEnd: '[calc({sizes.overlay.sm} * -1)]',
        },
      },
    },
    {
      position: 'right',
      size: 'md',
      css: {
        root: {
          insetInlineEnd: '[calc({sizes.overlay.md} * -1)]',
        },
      },
    },
    {
      position: 'left',
      size: 'sm',
      css: {
        root: {
          insetInlineStart: '[calc({sizes.overlay.sm} * -1)]',
        },
      },
    },
    {
      position: 'left',
      size: 'md',
      css: {
        root: {
          insetInlineStart: '[calc({sizes.overlay.md} * -1)]',
        },
      },
    },
    {
      status: 'open',
      position: 'right',
      css: {
        root: {
          insetInlineEnd: 'spacing.0',
        },
      },
    },
    {
      status: 'open',
      position: 'left',
      css: {
        root: {
          insetInlineStart: 'spacing.0',
        },
      },
    },
  ],
  defaultVariants: {
    position: 'right',
    size: 'sm',
    status: 'initial',
    mode: 'overlay',
  },
});

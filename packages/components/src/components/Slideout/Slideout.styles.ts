import { sva } from '@/styled-system/css';

export const slideout = sva({
  slots: ['root', 'content', 'footer', 'closeButton'],
  base: {
    root: {
      textStyle: 'typography.body.md',
      position: 'fixed',
      insetBlockStart: 'spacing.0',
      height: '[100%]',
      maxWidth: '[100%]',
      overflowY: 'auto',
      transition: '[all 0.3s ease-out]',
      layerStyle: 'elevation.floating',
      backgroundColor: 'colour.neutral.10',
      zIndex: '300',
      display: 'flex',
      flexDirection: 'column',
      _motionReduce: {
        transition: '[none]',
      },
      smDown: {
        width: '[100%]',
      },
    },
    content: {
      overflow: 'auto',
      flex: '[1 1 auto]',
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
          borderStartStartRadius: 'radius.050',
          borderEndStartRadius: 'radius.050',
          borderStartEndRadius: 'radius.000',
          borderEndEndRadius: 'radius.000',

          _motionReduce: {
            transition: '[none]',
          },
        },
      },
      left: {
        root: {
          insetInlineStart: 'spacing.0',
          borderStartStartRadius: 'radius.000',
          borderEndStartRadius: 'radius.000',
          borderStartEndRadius: 'radius.050',
          borderEndEndRadius: 'radius.050',

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
            borderRadius: 'radius.000',
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

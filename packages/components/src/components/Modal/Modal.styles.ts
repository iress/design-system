import { sva } from '@/styled-system/css';

const slots = [
  'modal',
  'backdrop',
  'closeButton',
  'header',
  'content',
  'footer',
  'pushElement',
] as const;

/**
 * The atomic recipe is a function that takes a variant and returns a class name object. It can be used to create a component without JSX (eg. as a utility class).
 *
 * [Learn more](https://panda-css.com/docs/concepts/recipes#atomic-recipe-or-cva)
 */
export const modal = sva({
  slots,
  base: {
    backdrop: {
      transition: '[all 0.3s ease-in-out]',
      zIndex: '400',
    },
    closeButton: {
      position: 'absolute',
      top: 'spacing.200',
      right: 'spacing.200',
    },
    header: {
      mb: 'spacing.400',
    },
    footer: {
      borderBlockStart: 'divider',
    },
    modal: {
      position: 'relative',
      borderRadius: 'radius.system.layout',
      padding: 'spacing.000',
      width: 'overlay.md',
      maxWidth: '[calc(100vw - ({spacing.spacing.700}))]',
      minHeight: 'auto',
      layerStyle: 'elevation.floating',
      background: 'colour.neutral.10',
      outline: '[0]',
      opacity: 0,
      transition: '[all 0.3s ease-in-out]',
      marginBlock: 'spacing.700',
      '@media (min-height: 600px)': {
        marginBlock: '[100px]',
      },
      marginInline: 'auto',
    },
  },
  variants: {
    /**
     * When set to `true` the modal's footer will always be visible and fixed to the bottom of the modal.
     */
    fixedFooter: {
      true: {
        modal: {
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '[calc(100vh - ({spacing.spacing.700} * 2))]',
          '@media (min-height: 600px)': {
            maxHeight: '[calc(100vh - (100px * 2))]',
          },
          overflow: 'clip',
        },
        content: {
          flex: '[1]',
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: '[calc(100vh - ({spacing.spacing.700} * 2))]',
          '@media (min-height: 600px)': {
            maxHeight: '[calc(100vh - (100px * 2))]',
          },
        },
        footer: {
          flex: '[0]',
        },
      },
    },
    /**
     * The state of the modal.
     */
    status: {
      initial: {
        backdrop: {
          bg: 'transparent',
        },
        modal: {
          opacity: 0,
        },
      },
      close: {
        backdrop: {
          bg: 'transparent',
        },
        modal: {
          opacity: 0,
        },
      },
      open: {
        backdrop: {
          bg: 'colour.system.backdrop.fill',
        },
        modal: {
          opacity: 1,
        },
      },
      unmounted: {
        backdrop: {
          display: 'none',
        },
        modal: {
          display: 'none',
        },
      },
    },
    /**
     * When set to `true`, the modal will act like a static element when open.
     * This means it will not lock scroll or focus within the modal.
     * Note: This is used internally to display modals in Styler. It is not recommended to use this prop in your own applications.
     */
    static: {
      true: {
        backdrop: {
          position: 'static !important',
        },
        modal: {
          position: 'relative',
        },
      },
    },
  },
});

import { sva } from '@/styled-system/css';

const slots = [
  'modal',
  'backdrop',
  'closeButton',
  'header',
  'content',
  'footer',
  'footerActions',
  'action',
  'pushElement',
  'statusIcon',
  'statusHeader',
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
      top: 'spacing.2',
      right: 'spacing.2',
    },
    content: {
      scrollable: 'y',
    },
    header: {
      textStyle: 'typography.heading.3',
      mb: 'spacing.4',
      color: 'colour.neutral.90',
    },
    action: {
      flex: '1',
    },
    footer: {
      textAlign: 'right',
    },
    footerActions: {
      display: 'flex',
      flexDirection: 'row',
      gap: 'spacing.3',
      justifyContent: 'flex-end',
    },
    statusIcon: {
      flexShrink: 0,
      fontSize: '[2em]',
      width: '[1.5em]',
      textAlign: 'center',
      borderRadius: '50%',
      aspectRatio: '1 / 1',
      scale: '[1]',
    },
    statusHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 'spacing.2',
      pt: 'spacing.4',
      mb: 'spacing.2',
    },
    modal: {
      // Performance: CSS containment (no paint due to fixed positioning)
      contain: 'layout style',
      position: 'relative',
      borderRadius: 'radius.system.layout',
      border: 'table',
      padding: 'spacing.0',
      width: 'overlay.md',
      maxWidth: '[calc(100vw - ({spacing.spacing.7}))]',
      minHeight: 'auto',
      background: 'colour.neutral.10',
      outline: '[0]',
      opacity: 0,
      transition: '[all 0.3s ease-in-out]',
      marginBlock: 'spacing.7',
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
          maxHeight: '[calc(100vh - ({spacing.spacing.7} * 2))]',
          '@media (min-height: 600px)': {
            maxHeight: '[calc(100vh - (100px * 2))]',
          },
          overflow: 'clip',
        },
        content: {
          flex: '[1]',
          overflowX: 'hidden',
          maxHeight: '[calc(100vh - ({spacing.spacing.7} * 2))]',
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
     * Size of the modal
     * - `sm`: Small modals communicate the outcome of an irreversible action. They should be concise and straightforward, containing a single action and, in some cases, a single input field.
     * - `md`: Medium modals provide optional supporting information to help users understand the context of a word or screen. They may contain a single action and, in some cases, a larger input such as a textarea.
     * - `lg`: Large modals are used for more complex tasks that require multiple steps or a lot of information as well as media such as video and PDF documents. They can contain multiple actions, inputs, and supporting information.
     */
    size: {
      sm: {
        modal: {
          width: 'overlay.sm',
        },
      },
      md: {
        modal: {
          width: 'overlay.md',
        },
      },
      lg: {
        modal: {
          width: 'overlay.lg',
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
          bg: 'colour.globalInteractions.backdrop',
          'backdrop-filter': '[blur(2px)]',
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
     * Sets the status style of the modal with an accompanying status icon.
     */
    alertStatus: {
      danger: {
        statusIcon: {
          color: 'colour.system.danger.onFill',
          bg: 'colour.system.danger.fill',
        },
      },
      success: {
        statusIcon: {
          color: 'colour.system.success.onFill',
          bg: 'colour.system.success.fill',
        },
      },
      warning: {
        statusIcon: {
          color: 'colour.system.warning.onFill',
          bg: 'colour.system.warning.fill',
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
  compoundVariants: [
    {
      alertStatus: ['danger', 'success', 'warning'],
      size: 'sm',
      css: {
        header: {
          textAlign: 'center',
        },
        statusHeader: {
          flexDirection: 'column',
        },
      },
    },
    {
      alertStatus: ['danger', 'success', 'warning'],
      css: {
        header: {
          mb: 'spacing.0',
        },
      },
    },
    {
      alertStatus: ['danger', 'success', 'warning'],
      status: 'open',
      css: {
        statusIcon: {
          animation: 'modalStatusIcon 0.7s linear .1s',
        },
      },
    },
  ],
});

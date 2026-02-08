import { sva } from '@/styled-system/css';

export const toast = sva({
  slots: [
    'root',
    'action',
    'panel',
    'wrapper',
    'heading',
    'content',
    'closeButton',
  ],
  base: {
    root: {
      display: 'block',
      position: 'relative',
      zIndex: '500',
      transition: '[all 0.3s ease-in-out]',
      layerStyle: 'floating',
      _motionReduce: {
        transform: 'none',
        transition: '[opacity 0.3s ease-in-out]',
        visibility: 'hidden',
      },
    },
    panel: {
      borderWidth: '1px',
      borderRadius: 'radius.system.form',
      padding: 'spacing.4',
      textStyle: 'typography.body.md.regular',
    },
    wrapper: {
      lineHeight: '1.5',
      paddingRight: 'spacing.6',
    },
    heading: {
      display: 'inline-block',
      marginBottom: 'spacing.1',
      marginRight: 'spacing.1',
      '&:empty': {
        display: 'none',
      },
      '& > h2, & > h3, & > h4, & > h5, & > h6': {
        marginBlock: 'spacing.0',
        textStyle: 'typography.body.md.strong',
      },
    },
    content: {
      noGutter: true,
    },
    closeButton: {
      position: 'absolute',
      top: 'spacing.1',
      right: 'spacing.1',
    },
  },
  variants: {
    status: {
      error: {
        panel: {
          backgroundColor: 'colour.system.danger.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.danger.fill',
        },
        heading: {
          color: 'colour.system.danger.text',
        },
        action: {
          bg: 'colour.system.danger.fill',
          borderColor: 'colour.system.danger.fill',
          color: 'colour.system.danger.onFill',
          _hover: {
            bg: 'colour.system.danger.fillHover',
            borderColor: 'colour.system.danger.fillHover',
            color: 'colour.system.danger.onFill',
          },
        },
      },
      success: {
        panel: {
          backgroundColor: 'colour.system.success.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.success.fill',
        },
        heading: {
          color: 'colour.system.success.text',
        },
        action: {
          bg: 'colour.system.success.fill',
          borderColor: 'colour.system.success.fill',
          color: 'colour.system.success.onFill',
          _hover: {
            bg: 'colour.system.success.fillHover',
            borderColor: 'colour.system.success.fillHover',
            color: 'colour.system.success.onFill',
          },
        },
      },
      info: {
        panel: {
          backgroundColor: 'colour.system.info.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.info.fill',
        },
        heading: {
          color: 'colour.system.info.text',
        },
        action: {
          bg: 'colour.system.info.fill',
          borderColor: 'colour.system.info.fill',
          color: 'colour.system.info.onFill',
          _hover: {
            bg: 'colour.system.info.fillHover',
            borderColor: 'colour.system.info.fillHover',
            color: 'colour.system.info.onFill',
          },
        },
      },
    },
    animation: {
      'start-x': {
        root: {
          insetInlineStart: '[-100%]',
          ms: 'spacing.4',
        },
      },
      'end-x': {
        root: {
          insetInlineEnd: '[-100%]',
          me: 'spacing.4',
        },
      },
      'start-y': {
        root: {
          mt: 'spacing.4',
          transform: '[translateY(-100%)]',
        },
      },
      'end-y': {
        root: {
          mb: 'spacing.4',
          transform: '[translateY(100%)]',
        },
      },
      fade: {
        root: {
          opacity: '0',
        },
      },
    },
    transitionState: {
      initial: {
        root: {
          opacity: '0',
        },
      },
      open: {
        root: {
          opacity: '1',
          _motionReduce: {
            visibility: 'visible',
          },
        },
      },
      closed: {
        root: {
          opacity: '0',
        },
      },
      unmounted: {
        root: {
          display: 'none',
        },
      },
    },
  },
  compoundVariants: [
    {
      animation: 'start-x',
      transitionState: 'open',
      css: {
        root: {
          insetInlineStart: '[0%]',
        },
      },
    },
    {
      animation: 'end-x',
      transitionState: 'open',
      css: {
        root: {
          insetInlineEnd: '[0%]',
        },
      },
    },
    {
      animation: ['start-y', 'end-y'],
      transitionState: 'open',
      css: {
        root: {
          transform: '[translateY(0%)]',
        },
      },
    },
    {
      animation: 'fade',
      transitionState: 'open',
      css: {
        root: {
          opacity: '1',
        },
      },
    },
  ],
  defaultVariants: {
    status: 'info',
  },
});

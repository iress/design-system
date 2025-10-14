import { sva } from '@/styled-system/css';

export const loading = sva({
  slots: ['root', 'message', 'critical', 'overlay'],
  variants: {
    error: {
      true: {
        root: {
          bg: 'colour.system.danger.surface',
          color: 'colour.system.danger.text',
          opacity: '[1 !important]',
        },
      },
    },
    instant: {
      true: {},
    },
    loaded: {
      true: {},
    },
    pattern: {
      component: {
        root: {
          position: 'relative',
          opacity: 0,
          transition: '[opacity 0.3s ease-in-out]',
        },
        message: {
          position: 'absolute',
          top: '[50%]',
          left: '[50%]',
          transform: 'translate(-50%, -50%)',
          width: '[fit-content]',
          px: 'spacing.200',
          py: 'spacing.100',
          textStyle: 'typography.body.sm',
          bg: 'colour.neutral.20',
          color: 'colour.neutral.70',
          border: 'divider',
          borderRadius: 'radius.system.badge',
          opacity: 0,
          transition: '[opacity 0.3s ease-in-out]',
          zIndex: '100',
        },
        overlay: {
          position: 'absolute',
          inset: '[0]',
          opacity: 0.75,
          bg: 'colour.neutral.10',
          transition: '[opacity 0.3s ease-in-out]',
          zIndex: '100',
        },
      },
      default: {
        root: {
          position: 'absolute',
          top: '[0]',
          left: '[50%]',
          transform: 'translateX(-50%)',
          opacity: 0,
          transition: '[opacity 0.3s ease-in-out]',
          zIndex: '600',
        },
        message: {
          px: 'spacing.400',
          py: 'spacing.200',
          bg: 'colour.neutral.20',
          color: 'colour.neutral.70',
          border: 'divider',
          borderTopWidth: '0',
          borderRadius: 'radius.system.badge',
          transition: '[transform 0.3s ease-in-out]',
          transform: 'translateY(-100%)',
        },
      },
      long: {
        root: {
          borderRadius: 'radius.system.layout',
          bg: 'colour.neutral.20',
          mx: 'auto',
          opacity: 0,
          transition: '[opacity 0.3s ease-in-out]',
          width: 'overlay.sm',
        },
        message: {
          p: 'spacing.1200',
        },
      },
      page: {
        root: {
          position: 'relative',
          opacity: 0,
          transition: '[opacity 0.2s linear]',
        },
        critical: {
          opacity: 0,
          transition: '[opacity 0.2s linear]',
          position: 'absolute',
          top: 'spacing.000',
          left: 'spacing.000',
        },
        message: {
          opacity: 1,
          transition: '[opacity 0.2s linear]',
        },
      },
      'start-up': {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: '[opacity 0.3s ease-in-out]',
          position: 'fixed',
          top: '[0]',
          left: '[0]',
          right: '[0]',
          bottom: '[0]',
          zIndex: '600',
          bg: 'colour.neutral.10',
        },
        message: {
          width: 'overlay.sm',
          maxWidth: '[75vw]',
          opacity: 0,
          transition: '[opacity 0.3s ease-in-out]',
        },
      },
      validate: {
        root: {
          position: 'relative',
        },
        message: {
          position: 'absolute',
          left: 'spacing.000',
          width: '[max-content]',
          color: 'colour.neutral.70',
          padding: 'spacing.200',
          bg: 'colour.neutral.10',
          textStyle: 'typography.body.md',
          animationStyle: 'loading-fade-next',
          display: 'inline-grid',
        },
      },
    },
    position: {
      bottom: {
        message: {
          top: '[100%]',
        },
      },
      top: {
        message: {
          bottom: '[100%]',
        },
      },
      right: {
        message: {
          position: 'static',
        },
      },
    },
    showCritical: {
      true: {},
    },
    showIndicator: {
      true: {},
    },
    showMessage: {
      true: {},
    },
  },
  compoundVariants: [
    {
      pattern: 'component',
      showIndicator: true,
      css: {
        root: {
          opacity: 1,
        },
      },
    },
    {
      pattern: 'component',
      loaded: true,
      css: {
        root: {
          width: '[fit-content]',
          opacity: 1,
        },
      },
    },
    {
      pattern: 'component',
      showMessage: true,
      css: {
        message: {
          opacity: 1,
        },
        overlay: {
          opacity: 0.9,
        },
      },
    },
    {
      pattern: 'default',
      showIndicator: true,
      css: {
        root: {
          opacity: 1,
        },
        message: {
          transform: 'none',
        },
      },
    },
    {
      pattern: 'long',
      showIndicator: true,
      css: {
        root: {
          opacity: 1,
        },
      },
    },
    {
      pattern: 'page',
      showIndicator: true,
      css: {
        root: {
          opacity: 1,
        },
      },
    },
    {
      pattern: 'page',
      showCritical: true,
      showIndicator: true,
      css: {
        message: {
          opacity: 0,
        },
      },
    },
    {
      pattern: 'page',
      showCritical: true,
      showIndicator: false,
      css: {
        root: {
          opacity: 1,
        },
        critical: {
          position: 'static',
          opacity: 1,
        },
      },
    },
    {
      pattern: 'page',
      error: true,
      css: {
        root: {
          borderRadius: 'radius.system.layout',
          py: 'xl',
        },
      },
    },
    {
      pattern: 'start-up',
      showIndicator: true,
      css: {
        root: {
          opacity: 1,
        },
      },
    },
    {
      pattern: 'start-up',
      showMessage: true,
      css: {
        message: {
          opacity: 1,
        },
      },
    },
    {
      pattern: 'start-up',
      instant: true,
      css: {
        root: {
          transition: '[none]',
          opacity: 1,
        },
      },
    },
    {
      pattern: 'start-up',
      showMessage: true,
      instant: true,
      css: {
        root: {
          transition: '[opacity 0.3s ease-in-out]',
        },
      },
    },
  ],
  defaultVariants: {
    pattern: 'default',
  },
});

export const loadingList = sva({
  slots: ['root', 'item', 'dots', 'svg', 'circle', 'tick', 'marker'],
  base: {
    root: {
      pl: 'spacing.600',
      listStyle: 'none',
    },
    item: {
      position: 'relative',
      transition: 'all',
      transitionDelay: '1.2s',
      pl: 'spacing.100',
    },
    dots: {
      display: 'inline-block',
      width: '[0.7em]',
      aspectRatio: 6,
      clipPath: 'inset(0 100% 0 0)',
      animation: 'loadingDots 1s steps(4) infinite',
      animationDelay: '0.5s',
      layerStyle: 'dots',
    },
    svg: {
      width: '[1em]',
      height: '[1em]',
      borderRadius: '[50%]',
      display: 'block',
      position: 'absolute',
      top: 'spacing.100',
      right: '[100%]',
      mr: 'spacing.050',
    },
    marker: {
      fill: 'colour.neutral.80',
    },
    circle: {
      strokeDasharray: 166,
      strokeDashoffset: 166,
      strokeWidth: 2,
      strokeMiterlimit: 10,
      stroke: '[currentColor]',
      animation:
        'loadingItemStroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
    },
    tick: {
      transformOrigin: '50% 50%',
      strokeDasharray: 48,
      strokeDashoffset: 48,
      animation:
        'loadingItemStroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
    },
  },
  variants: {
    finished: {
      true: {
        svg: {
          strokeWidth: 2,
          color: 'colour.system.success.fill',
          stroke: 'colour.system.success.onFill',
          strokeMiterlimit: 10,
          animation:
            'loadingItemFill 0.4s ease-in-out 0.4s forwards, loadingItemScale 0.3s ease-in-out 0.9s both',
        },
        item: {
          opacity: 0.5,
          filter: '[grayscale(1)]',
        },
      },
    },
  },
});

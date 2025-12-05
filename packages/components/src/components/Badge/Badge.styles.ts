import { sva } from '@/styled-system/css';

export const badge = sva({
  slots: ['root', 'badge', 'host'],
  base: {
    root: {
      display: 'inline-block',
      overflow: 'visible',
      textStyle: 'typography.body.sm.regular',
      boxSizing: 'border-box',
      lineHeight: 1,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      minHeight: '[1.35em]',
      minWidth: '[1.35em]',
      alignSelf: 'flex-start',
    },
    badge: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'radius.system.badge',
      paddingBlock: 'spacing.1',
      paddingInline: 'spacing.1',
      '& > span': {
        lineHeight: 1,
        display: 'inline-block',
      },
    },
    host: {
      position: 'relative',
      height: 'auto',
    },
  },
  variants: {
    host: {
      true: {
        badge: {
          position: 'absolute',
          insetBlockStart: 'spacing.0',
          insetInlineEnd: 'spacing.0',
          zIndex: '100',
          transformOrigin: '100% 0',
          borderRadius: 'radius.100',
          transform: {
            base: 'translate(50%, -50%)',
            _rtl: 'translate(-50%, -50%)',
          },
        },
      },
    },
    pill: {
      true: {
        badge: {
          borderRadius: 'radius.100',
        },
      },
    },
    mode: {
      primary: {
        root: {
          bg: 'colour.primary.fill',
          color: 'colour.primary.onFill',
        },
      },
      success: {
        root: {
          bg: 'colour.system.success.fill',
          color: 'colour.system.success.onFill',
        },
      },
      warning: {
        root: {
          bg: 'colour.system.warning.fill',
          color: 'colour.system.warning.onFill',
        },
      },
      danger: {
        root: {
          bg: 'colour.system.danger.fill',
          color: 'colour.system.danger.onFill',
        },
      },
      info: {
        root: {
          bg: 'colour.system.info.fill',
          color: 'colour.system.info.onFill',
        },
      },
      neutral: {
        root: {
          bg: 'colour.neutral.20',
          color: 'colour.neutral.80',
        },
      },
    },
  },
  defaultVariants: {
    mode: 'neutral',
    pill: false,
    host: false,
  },
});

import { sva } from '@/styled-system/css';

export const badge = sva({
  slots: ['root', 'badge'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style paint',
      display: 'inline-block',
      overflow: 'visible',
      textStyle: 'typography.body.sm.regular',
      boxSizing: 'border-box',
      lineHeight: 1,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      minHeight: '[1.35em]',
      minWidth: '[1.5em]',
      verticalAlign: 'middle',
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
  },
  variants: {
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
      '10': {
        root: {
          bg: 'colour.data.subtle.10',
          color: 'colour.data.bold.10',
        },
      },
      '20': {
        root: {
          bg: 'colour.data.subtle.20',
          color: 'colour.data.bold.20',
        },
      },
      '30': {
        root: {
          bg: 'colour.data.subtle.30',
          color: 'colour.data.bold.30',
        },
      },
      '40': {
        root: {
          bg: 'colour.data.subtle.40',
          color: 'colour.data.bold.40',
        },
      },
      '50': {
        root: {
          bg: 'colour.data.subtle.50',
          color: 'colour.data.bold.50',
        },
      },
      '60': {
        root: {
          bg: 'colour.data.subtle.60',
          color: 'colour.data.bold.60',
        },
      },
      '70': {
        root: {
          bg: 'colour.data.subtle.70',
          color: 'colour.data.bold.70',
        },
      },
      '80': {
        root: {
          bg: 'colour.data.subtle.80',
          color: 'colour.data.bold.80',
        },
      },
      '90': {
        root: {
          bg: 'colour.data.subtle.90',
          color: 'colour.data.bold.90',
        },
      },
    },
  },
  defaultVariants: {
    mode: 'neutral',
    pill: false,
  },
});

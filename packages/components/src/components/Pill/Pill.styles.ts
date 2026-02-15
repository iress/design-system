import { cva } from '@/styled-system/css';

export const pill = cva({
  base: {
    // Performance: CSS containment limits style recalculation scope
    contain: 'layout style paint',
    display: 'inline-block',
    overflow: 'visible',
    textStyle: 'typography.body.sm',
    borderRadius: 'radius.system.pill',
    boxSizing: 'border-box',
    lineHeight: 1,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    minHeight: '[1.35em]',
    minWidth: '[1.5em]',
    p: 'spacing.1',
    verticalAlign: 'middle',
  },
  variants: {
    mode: {
      '10': {
        bg: 'colour.data.bold.10',
        color: 'colour.data.subtle.10',
      },
      '20': {
        bg: 'colour.data.bold.20',
        color: 'colour.data.subtle.20',
      },
      '30': {
        bg: 'colour.data.bold.30',
        color: 'colour.data.subtle.30',
      },
      '40': {
        bg: 'colour.data.bold.40',
        color: 'colour.data.subtle.40',
      },
      '50': {
        bg: 'colour.data.bold.50',
        color: 'colour.data.subtle.50',
      },
      '60': {
        bg: 'colour.data.bold.60',
        color: 'colour.data.subtle.60',
      },
      '70': {
        bg: 'colour.data.bold.70',
        color: 'colour.data.subtle.70',
      },
      '80': {
        bg: 'colour.data.bold.80',
        color: 'colour.data.subtle.80',
      },
      '90': {
        bg: 'colour.data.bold.90',
        color: 'colour.data.subtle.90',
      },
    },
  },
  defaultVariants: {
    mode: '90',
  },
});

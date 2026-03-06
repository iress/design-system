import { cva } from '@/styled-system/css';

export const pill = cva({
  base: {
    // Performance: CSS containment limits style recalculation scope
    contain: 'layout style',
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
    py: 'spacing.1',
    px: 'spacing.2',
    verticalAlign: 'middle',
    bg: '[var(--pill-bg)]',
    color: '[var(--pill-color)]',
  },
  variants: {
    mode: {
      '10': {
        '--pill-bg': '{colors.colour.data.bold.10}',
        '--pill-color': '{colors.colour.data.subtle.10}',
      },
      '20': {
        '--pill-bg': '{colors.colour.data.bold.20}',
        '--pill-color': '{colors.colour.data.subtle.20}',
      },
      '30': {
        '--pill-bg': '{colors.colour.data.bold.30}',
        '--pill-color': '{colors.colour.data.subtle.30}',
      },
      '40': {
        '--pill-bg': '{colors.colour.data.bold.40}',
        '--pill-color': '{colors.colour.data.subtle.40}',
      },
      '50': {
        '--pill-bg': '{colors.colour.data.bold.50}',
        '--pill-color': '{colors.colour.data.subtle.50}',
      },
      '60': {
        '--pill-bg': '{colors.colour.data.bold.60}',
        '--pill-color': '{colors.colour.data.subtle.60}',
      },
      '70': {
        '--pill-bg': '{colors.colour.data.bold.70}',
        '--pill-color': '{colors.colour.data.subtle.70}',
      },
      '80': {
        '--pill-bg': '{colors.colour.data.bold.80}',
        '--pill-color': '{colors.colour.data.subtle.80}',
      },
      '90': {
        '--pill-bg': '{colors.colour.data.bold.90}',
        '--pill-color': '{colors.colour.data.subtle.90}',
      },
      danger: {
        '--pill-bg': '{colors.colour.system.danger.fill}',
        '--pill-color': '{colors.colour.system.danger.onFill}',
      },
      info: {
        '--pill-bg': '{colors.colour.system.info.fill}',
        '--pill-color': '{colors.colour.system.info.onFill}',
      },
      success: {
        '--pill-bg': '{colors.colour.system.success.fill}',
        '--pill-color': '{colors.colour.system.success.onFill}',
      },
      warning: {
        '--pill-bg': '{colors.colour.system.warning.fill}',
        '--pill-color': '{colors.colour.system.warning.onFill}',
      },
    },
  },
  defaultVariants: {
    mode: '90',
  },
});

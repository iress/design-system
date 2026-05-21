import { sva } from '@/styled-system/css';

export const avatar = sva({
  slots: ['root', 'initials', 'badge', 'type'],
  base: {
    root: {
      contain: 'layout style',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      position: 'relative',
      aspectRatio: '1',
      width: '[2.5em]',
      height: '[2.5em]',
      p: 'spacing.2',
      bg: '[var(--avatar-bg, {colors.colour.data.subtle.10})]',
      border: '[2px solid {colors.colour.neutral.10}]',
    },
    initials: {
      textStyle: 'typography.heading.4',
      textAlign: 'center',
      color: '[var(--avatar-color, {colors.colour.data.bold.10})]',
    },
    badge: {
      position: 'absolute',
      top: 'spacing.0',
      right: '[var(--avatar-badge-right, calc({spacing.spacing.1} * -1))]',
      borderRadius: '50%',
      aspectRatio: '1',
      width: '[var(--avatar-badge-size, .9em)]',
      height: '[var(--avatar-badge-size, .9em)]',
      bg: '[var(--avatar-badge-bg, {colors.colour.accent.fill})]',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '[var(--avatar-badge-color, {colors.colour.accent.onFill})]',

      '& > *': {
        fontSize: '[8px]',
      },
    },
    type: {
      position: 'absolute',
      bottom: 'spacing.0',
      right: '-spacing.1',
      aspectRatio: '1',
      width: '[1em]',
      height: '[1em]',
      borderRadius: '50%',
      bg: '[var(--avatar-color, {colors.colour.data.bold.10})]',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '[var(--avatar-bg, {colors.colour.data.subtle.10})]',

      '& > *': {
        fontSize: '[8px]',
      },
    },
  },
  variants: {
    compact: {
      true: {
        root: {
          width: '[2.25em]',
          height: '[2.25em]',
          p: 'spacing.0',
        },
        initials: {
          textStyle: 'typography.body.md.strong',
        },
      },
    },
    mode: {
      '10': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.10}',
          '--avatar-color': '{colors.colour.data.bold.10}',
        },
      },
      '20': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.20}',
          '--avatar-color': '{colors.colour.data.bold.20}',
        },
      },
      '30': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.30}',
          '--avatar-color': '{colors.colour.data.bold.30}',
        },
      },
      '40': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.40}',
          '--avatar-color': '{colors.colour.data.bold.40}',
        },
      },
      '50': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.50}',
          '--avatar-color': '{colors.colour.data.bold.50}',
        },
      },
      '60': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.60}',
          '--avatar-color': '{colors.colour.data.bold.60}',
        },
      },
      '70': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.70}',
          '--avatar-color': '{colors.colour.data.bold.70}',
        },
      },
      '80': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.80}',
          '--avatar-color': '{colors.colour.data.bold.80}',
        },
      },
      '90': {
        root: {
          '--avatar-bg': '{colors.colour.data.subtle.90}',
          '--avatar-color': '{colors.colour.data.bold.90}',
        },
      },
      danger: {
        root: {
          '--avatar-bg': '{colors.colour.system.danger.surface}',
          '--avatar-color': '{colors.colour.system.danger.text}',
        },
      },
      info: {
        root: {
          '--avatar-bg': '{colors.colour.system.info.surface}',
          '--avatar-color': '{colors.colour.system.info.text}',
        },
      },
      success: {
        root: {
          '--avatar-bg': '{colors.colour.system.success.surface}',
          '--avatar-color': '{colors.colour.system.success.text}',
        },
      },
      warning: {
        root: {
          '--avatar-bg': '{colors.colour.system.warning.surface}',
          '--avatar-color': '{colors.colour.system.warning.text}',
        },
      },
    },
    badgeMode: {
      '10': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.10}',
          '--avatar-badge-color': '{colors.colour.data.subtle.10}',
        },
      },
      '20': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.20}',
          '--avatar-badge-color': '{colors.colour.data.subtle.20}',
        },
      },
      '30': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.30}',
          '--avatar-badge-color': '{colors.colour.data.subtle.30}',
        },
      },
      '40': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.40}',
          '--avatar-badge-color': '{colors.colour.data.subtle.40}',
        },
      },
      '50': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.50}',
          '--avatar-badge-color': '{colors.colour.data.subtle.50}',
        },
      },
      '60': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.60}',
          '--avatar-badge-color': '{colors.colour.data.subtle.60}',
        },
      },
      '70': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.70}',
          '--avatar-badge-color': '{colors.colour.data.subtle.70}',
        },
      },
      '80': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.80}',
          '--avatar-badge-color': '{colors.colour.data.subtle.80}',
        },
      },
      '90': {
        root: {
          '--avatar-badge-bg': '{colors.colour.data.bold.90}',
          '--avatar-badge-color': '{colors.colour.data.subtle.90}',
        },
      },
      danger: {
        root: {
          '--avatar-badge-bg': '{colors.colour.system.danger.fill}',
          '--avatar-badge-color': '{colors.colour.system.danger.onFill}',
        },
      },
      info: {
        root: {
          '--avatar-badge-bg': '{colors.colour.system.info.fill}',
          '--avatar-badge-color': '{colors.colour.system.info.onFill}',
        },
      },
      success: {
        root: {
          '--avatar-badge-bg': '{colors.colour.system.success.fill}',
          '--avatar-badge-color': '{colors.colour.system.success.onFill}',
        },
      },
      warning: {
        root: {
          '--avatar-badge-bg': '{colors.colour.system.warning.fill}',
          '--avatar-badge-color': '{colors.colour.system.warning.onFill}',
        },
      },
    },
    noBadgeIcon: {
      true: {
        root: {
          '--avatar-badge-size': '0.5em',
          '--avatar-badge-right': '{spacing.spacing.0}',
        },
      },
    },
  },
});

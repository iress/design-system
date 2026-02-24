import { sva } from '@/styled-system/css';

export const sideNav = sva({
  slots: [
    'root',
    'rail',
    'panel',
    'panelContent',
    'panelContentInner',
    'panelHeading',
    'header',
    'footer',
    'toggle',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      height: '12/12',
      gap: 'spacing.3',
    },
    rail: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
    },
    panel: {
      maxWidth: '[0]',
      overflow: 'hidden',
      transition: '[max-width 0.3s ease-in-out]',
    },
    panelContent: {
      width: 'var(--iress-width, 260px)',
    },
    panelContentInner: {
      display: 'flex',
      flexDirection: 'column',
      border: 'table',
      borderRadius: 'radius.system.layout',
      m: 'spacing.4',
      boxShadow: '0 4px 20px #00327126',
      pb: 'spacing.2',
    },
    panelHeading: {
      flexShrink: 0,
      px: 'spacing.4',
      pt: 'spacing.4',
      pb: 'spacing.2',
      color: 'colour.primary.text',
    },
    header: {
      flexShrink: 0,
      px: 'spacing.4',
      pt: 'spacing.4',
    },
    footer: {
      flexShrink: 0,
      px: 'spacing.4',
      py: 'spacing.2',
      borderTop: 'table',
      mt: 'auto',
    },
    toggle: {
      mt: 'auto',
    },
  },
  variants: {
    expanded: {
      true: {
        panel: {
          maxWidth: 'var(--iress-width, 260px)',
        },
      },
      false: {
        panel: {
          maxWidth: '[0]',
        },
      },
    },
  },
  defaultVariants: {
    expanded: false,
  },
});

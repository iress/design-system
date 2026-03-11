import { sva } from '@/styled-system/css';

export const breadcrumbs = sva({
  slots: ['root', 'list', 'item', 'link', 'current', 'overflowItem'],
  base: {
    root: {
      // Performance: CSS containment
      contain: 'layout style',
      display: 'block',
    },
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 'spacing.2', // 4px
      listStyle: 'none',
      margin: 'spacing.0',
      padding: 'spacing.0',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: 'spacing.2', // 4px

      '&:not(:last-child):after': {
        content: `''`,
        display: 'inline-block',
        mask: `no-repeat center / contain url('data:image/svg+xml,<svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L4.5 4.5L0.5 8.5" stroke="%23000" stroke-linecap="round" stroke-linejoin="round"/></svg>')`,
        bg: 'colour.neutral.70',
        width: 'chevron.select',
        height: 'chevron.select',
      },
    },
    link: {
      '&&': {
        color: 'colour.neutral.70',
        textStyle: 'typography.body.sm.medium',
        textDecoration: 'none',
        borderRadius: 'radius.1',

        '& > span': {
          textDecoration: 'none',
        },

        '&:hover, &[aria-expanded="true"]': {
          color: 'colour.neutral.80',
          textDecoration: 'underline',
        },
      },
    },
    current: {
      color: 'colour.neutral.90',
      textStyle: 'typography.body.sm.strong',
    },
    overflowItem: {
      '&&': {
        textStyle: 'typography.body.sm.medium',
      },
    },
  },
});

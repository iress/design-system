import { sva } from '@/styled-system/css';

export const avatarGroup = sva({
  slots: ['root', 'item', 'overflow'],
  base: {
    root: {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    item: {
      marginInlineStart: '-spacing.4',
      display: 'flex',
      alignItems: 'center',

      '&:first-child': {
        marginInlineStart: 'spacing.0',
      },
    },
    overflow: {
      textStyle: 'typography.body.md',
      color: 'colour.neutral.70',
      marginInlineStart: 'spacing.1',
      zIndex: '000',
    },
  },
});

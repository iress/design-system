import { sva } from '@/styled-system/css';

export const buttonGroup = sva({
  slots: ['root', 'label', 'values'],
  base: {
    root: {
      display: 'contents',
    },
    label: {
      marginBlockEnd: 'sm',
      textStyle: 'typography.body.md.strong',
    },
    values: {
      bg: 'colour.neutral.20',
      border: 'divider',
      borderRadius: 'radius.system.button',
      display: 'inline-flex',
      flexWrap: 'wrap',
      p: 'xs',
      gap: 'xs',
    },
  },
  variants: {
    hiddenLabel: {
      true: {
        label: {
          srOnly: true,
        },
      },
    },
  },
});

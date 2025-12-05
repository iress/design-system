import { sva } from '@/styled-system/css';

export const label = sva({
  slots: ['root', 'required', 'text'],
  base: {
    root: {
      display: 'block',
    },
    required: {
      color: 'colour.system.danger.text',
      display: 'inline-block',
      position: 'relative',
      textStyle: 'typography.body.sm.strong',
      top: '-spacing.1',
      mr: 'spacing.1',
    },
    text: {
      textStyle: 'typography.body.md.strong',
    },
  },
  compoundVariants: [
    {
      hasAppend: true,
      hiddenLabel: true,
      css: {
        root: {
          mb: 'spacing.0',
        },
      },
    },
  ],
});

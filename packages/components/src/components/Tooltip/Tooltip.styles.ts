import { sva } from '@/styled-system/css';

export const tooltip = sva({
  slots: ['root', 'activator', 'content'],
  base: {
    root: {
      display: 'inline-block',
      position: 'relative',
    },
    activator: {},
    content: {
      zIndex: '600',
      width: '[max-content]',
      maxWidth: '[20em]',
      padding: 'spacing.2',
      borderRadius: 'radius.system.form',
      borderStyle: 'solid',
      layerStyle: 'elevation.floating',
      textStyle: 'typography.body.sm.regular',
      color: 'colour.neutral.10',
      bg: 'colour.neutral.80',
    },
  },
  variants: {},
  compoundVariants: [],
});

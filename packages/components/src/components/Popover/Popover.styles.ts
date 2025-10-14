import { sva } from '@/styled-system/css';

export const popover = sva({
  slots: ['root', 'activator', 'content'],
  base: {
    activator: {
      display: 'block',
    },
    root: {
      display: 'inline-block',
    },
    content: {
      bg: 'colour.neutral.10',
      border: 'divider',
      borderRadius: 'radius.system.form',
      layerStyle: 'elevation.floating',
      maxWidth: 'input.16',
    },
  },
  variants: {
    fluid: {
      true: {
        root: {
          display: 'block',
        },
      },
    },
    hasInputActivator: {
      true: {
        root: {
          display: 'block',
        },
        content: {
          minWidth: 'input.12',
          maxWidth: 'auto',
        },
      },
    },
    matchActivatorWidth: {
      false: {
        content: {
          maxWidth: '[none]',
        },
      },
    },
  },
});

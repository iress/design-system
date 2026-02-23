import { sva } from '@/styled-system/css';

export const menu = sva({
  slots: ['root'],
  variants: {
    fluid: {
      true: {
        root: {
          width: '12/12',
        },
      },
    },
    insidePopover: {
      true: {
        root: {},
      },
    },
    layout: {
      stack: {
        root: {
          display: 'inline-flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
        },
      },
      inline: {
        root: {
          display: 'inline-flex',
          columnGap: 'spacing.1',
          flexWrap: 'wrap',
        },
      },
      'inline-equal-width': {
        root: {
          display: 'flex',
          flexDirection: 'row',
          columnGap: 'spacing.1',

          '& > :not(hr)': {
            flex: '1',
            textAlign: 'center',
          },
        },
      },
    },
    multiSelect: {
      true: {},
    },
    noWrap: {
      true: {
        root: {
          '& > *': {
            maxWidth: '[100%]',
          },
        },
      },
    },
    variant: {
      side: {},
      rail: {
        root: {
          bg: 'colour.primary.fill',
          px: 'spacing.1',
          py: 'spacing.4',
          gap: 'spacing.2',
          width: '[fit-content]',

          '& .ids-divider--menu': {
            opacity: 0.25,
          },
        },
      },
      radio: {},
      subdraw: {},
    },
  },
  compoundVariants: [
    {
      layout: 'stack',
      insidePopover: true,
      css: {
        root: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  ],
  defaultVariants: {
    layout: 'stack',
  },
});

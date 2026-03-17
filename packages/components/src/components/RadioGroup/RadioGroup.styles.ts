import { cva } from '@/styled-system/css';

export const radioGroup = cva({
  base: {},
  variants: {
    layout: {
      stack: {
        display: 'inline-flex',
        flexFlow: 'column wrap',
        rowGap: 'spacing.2',
        '& > *': {
          flexBasis: '[0]',
        },
      },
      block: {
        display: 'flex',
        flexFlow: 'column wrap',
        rowGap: 'spacing.2',
        '& label': {
          flexBasis: '12/12',
        },
      },
      inline: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '12/12',
        gap: 'spacing.6',
        '& label': {
          flexBasis: '[auto]',
          flexGrow: '[0]',
        },
      },
      inlineFlex: {
        display: 'inline-flex',
        gap: 'spacing.6',
      },
      inlineEqualWidth: {
        display: 'flex',
        width: '12/12',
        '& > *': {
          flex: '[1 1 auto]',
        },
      },
    },
  },
  defaultVariants: {
    layout: 'stack',
  },
});

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
          flexBasis: '[100%]',
        },
      },
      inline: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '[100%]',
        gap: 'spacing.2',
        '& label': {
          flexBasis: '[auto]',
          flexGrow: '[0]',
        },
      },
      inlineFlex: {
        display: 'inline-flex',
        gap: 'spacing.2',
      },
      inlineEqualWidth: {
        display: 'flex',
        width: '[100%]',
        '& > *': {
          flex: '[1 1 auto]',
        },
      },
    },
    hiddenRadio: {
      true: {
        '& label': {
          _hover: {
            backgroundColor: 'colour.primary.surfaceHover',
          },
        },
      },
    },
  },
  defaultVariants: {
    layout: 'stack',
  },
});

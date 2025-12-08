import { cva } from '@/styled-system/css';

export const checkboxGroup = cva({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: 'spacing.2',
  },
  variants: {
    layout: {
      block: {
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: 'spacing.2',
        '& label': {
          display: 'flex',
          flexBasis: '[100%]',
        },
        '& label span': {
          flexBasis: '[100%]',
        },
        '& > *': {
          flexBasis: '[100%]',
        },
      },
      stack: {
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: 'spacing.2',
        '& > *': {
          flexBasis: '[100%]',
        },
      },
      inline: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '[100%]',
        rowGap: 'spacing.2',
        columnGap: 'spacing.4',
      },
    },
    readOnly: {
      true: {},
    },
  },
  compoundVariants: [
    {
      readOnly: true,
      layout: 'stack',
      css: {
        paddingInlineStart: 'spacing.4',
        '& > *': {
          display: 'list-item',
        },
      },
    },
    {
      readOnly: true,
      layout: 'block',
      css: {
        paddingInlineStart: 'spacing.4',
        '& > *': {
          display: 'list-item',
        },
      },
    },
    {
      readOnly: true,
      layout: 'inline',
      css: {
        paddingInlineStart: 'spacing.4',
        '& > *': {
          display: 'list-item',
          marginInlineEnd: 'spacing.6',
        },
        '& > *:last-child': {
          marginInlineEnd: 'spacing.0',
        },
      },
    },
  ],
  defaultVariants: {
    layout: 'stack',
  },
});

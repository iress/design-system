import { cva } from '@/styled-system/css';

export const checkboxGroup = cva({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: 'spacing.200',
  },
  variants: {
    layout: {
      block: {
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: 'spacing.200',
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
        rowGap: 'spacing.200',
        '& > *': {
          flexBasis: '[100%]',
        },
      },
      inline: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '[100%]',
        rowGap: 'spacing.200',
        columnGap: 'spacing.400',
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
        paddingInlineStart: 'spacing.400',
        '& > *': {
          display: 'list-item',
        },
      },
    },
    {
      readOnly: true,
      layout: 'block',
      css: {
        paddingInlineStart: 'spacing.400',
        '& > *': {
          display: 'list-item',
        },
      },
    },
    {
      readOnly: true,
      layout: 'inline',
      css: {
        paddingInlineStart: 'spacing.400',
        '& > *': {
          display: 'list-item',
          marginInlineEnd: 'spacing.600',
        },
        '& > *:last-child': {
          marginInlineEnd: 'spacing.000',
        },
      },
    },
  ],
  defaultVariants: {
    layout: 'stack',
  },
});

import { sva } from '@/styled-system/css';

export const selectTags = sva({
  slots: ['root', 'placeholder', 'prepend', 'append', 'tag', 'tagsList'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '[100%]',
      paddingBlock: 'spacing.050',
      paddingInline: 'spacing.200',
      minHeight: 'input.height',
      alignSelf: 'auto',
      backgroundColor: 'colour.neutral.10',
      border: 'input',
      borderRadius: 'radius.system.form',
      color: 'colour.neutral.80',
      textAlign: 'left',
      fontWeight: 'normal',
      cursor: 'pointer',

      transition: '[all 0.3s ease]',

      '&:hover': {
        backgroundColor: 'colour.neutral.10',
        color: 'colour.neutral.80',
      },

      '&:focus': {
        backgroundColor: 'colour.neutral.10',
        borderColor: 'colour.primary.fill',
        layerStyle: 'elevation.focus',
        outline: '[none]',
      },

      '&:focus-within': {
        backgroundColor: 'colour.neutral.10',
        borderColor: 'colour.primary.fill',
        layerStyle: 'elevation.focus',
        outline: '[none]',
      },

      '&:has(.tag)': {
        cursor: 'inherit',

        '& .append': {
          cursor: 'pointer',
        },
      },
    },
    placeholder: {
      color: 'colour.neutral.60',
      textAlign: 'left',
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      textStyle: 'typography.body.md',
    },
    prepend: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'spacing.000',
      color: 'colour.neutral.70',
    },
    append: {},
    tag: {
      display: 'inline-flex',
    },
    tagsList: {
      overflow: 'hidden',
      height: '[100%]',
    },
  },
  variants: {
    showDefaultChevron: {
      true: {
        root: {
          alignSelf: 'center',
          position: 'relative',
        },
        append: {
          selectChevron: true,
        },
      },
      false: {
        append: {},
      },
    },
  },
});

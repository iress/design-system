import { sva } from '@/styled-system/css';

const slots = ['root', 'content', 'prepend', 'append', 'spinner'] as const;

/**
 * The atomic recipe is a function that takes a variant and returns a class name object. It can be used to create a component without JSX (eg. as a utility class).
 *
 * [Learn more](https://panda-css.com/docs/concepts/recipes#atomic-recipe-or-cva)
 */
export const link = sva({
  slots,
  base: {
    append: {
      display: 'contents',
    },
    content: {
      cursor: 'pointer',
      textDecoration: 'underline',

      _groupHover: {
        textDecoration: 'none',
      },
    },
    root: {
      alignItems: 'baseline',
      alignSelf: 'flex-start',
      cursor: 'pointer',
      display: 'inline-flex',
      fontKerning: 'none',
      gap: 'spacing.1',
      pointerEvents: 'auto',
      textStyle: 'typography.body.md',
      whiteSpace: 'normal',
      width: 'auto',
      color: 'colour.primary.text',
      borderRadius: 'radius.025',

      _focus: {
        outline: '[none]',
      },

      _focusVisible: {
        layerStyle: 'elevation.focus',
      },
    },
    prepend: {
      display: 'contents',
    },
  },
  variants: {
    active: {
      true: {
        root: {
          borderBottom: '[1px dashed currentColor]',
        },
      },
    },
    loading: {
      true: {
        content: {
          _groupHover: {
            textDecoration: 'underline',
          },
        },
        root: {
          cursor: 'not-allowed',
          filter: '[saturate(0.25)]',
          opacity: 0.5,
          boxShadow: 'none',
        },
      },
    },
  },
});

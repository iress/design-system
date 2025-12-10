import { sva } from '@/styled-system/css';

const slots = ['wrapper', 'control', 'element'] as const;

/**
 * The atomic recipe is a function that takes a variant and returns a class name object. It can be used to create a component without JSX (eg. as a utility class).
 *
 * [Learn more](https://panda-css.com/docs/concepts/recipes#atomic-recipe-or-cva)
 */
export const select = sva({
  slots,
  base: {
    wrapper: {
      display: 'block',
      position: 'relative',
      lineHeight: 1,
      '&:has(select:focus)': {
        layerStyle: 'elevation.focus',
      },
    },
    control: {
      position: 'relative',
      selectChevron: true,
    },
    element: {
      textStyle: 'typography.body.md',
      display: 'block',
      width: '[100%]',
      height: '[calc({sizes.input.height} - 2px)]',
      paddingInline: 'spacing.2',
      appearance: 'none',
      border: '[0]',
      background: '[transparent]',

      _focus: {
        outline: '[none]',
      },

      '& option, & optgroup': {
        color: 'colour.neutral.80',
      },
    },
  },
  variants: {
    width: {
      '2': {
        wrapper: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.2})]',
        },
        element: {
          width: 'auto',
        },
      },
      '4': {
        wrapper: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.4})]',
        },
        element: {
          width: 'auto',
        },
      },
      '6': {
        wrapper: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.6})]',
        },
        element: {
          width: 'auto',
        },
      },
      '8': {
        wrapper: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.8})]',
        },
        element: {
          width: 'auto',
        },
      },
      '10': {
        wrapper: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.10})]',
        },
        element: {
          width: 'auto',
        },
      },
      '12': {
        wrapper: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.12})]',
        },
      },
      '16': {
        wrapper: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.16})]',
        },
        element: {
          width: 'auto',
        },
      },
      '25perc': {
        wrapper: {
          width: 'input.25perc',
        },
        element: {
          width: 'auto',
        },
      },
      '50perc': {
        wrapper: {
          width: 'input.50perc',
        },
        element: {
          width: 'auto',
        },
      },
      '75perc': {
        wrapper: {
          width: 'input.75perc',
        },
        element: {
          width: 'auto',
        },
      },
      '100perc': {
        wrapper: {
          width: 'input.100perc',
        },
        element: {
          width: 'auto',
        },
      },
    },
  },
});

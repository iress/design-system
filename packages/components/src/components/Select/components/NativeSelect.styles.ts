import { sva } from '@/styled-system/css';

const slots = ['wrapper', 'control', 'element'] as const;

/**
 * The atomic recipe is a function that takes a variant and returns a class name object. It can be used to create a component without JSX (eg. as a utility class).
 *
 * [Learn more](https://panda-css.com/docs/concepts/recipes#atomic-recipe-or-cva)
 */
export const nativeSelect = sva({
  slots,
  base: {
    wrapper: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style',
      display: 'block',
      position: 'relative',
      lineHeight: 1,
      focusable: 'has-input',
      selectChevron: true,
      '--iress-background--disabled': '{colors.colour.neutral.30}',
    },
    element: {
      textStyle: 'typography.body.md',
      color: 'colour.neutral.90',
      display: 'block',
      width: '[100%]',
      height: '[calc({sizes.input.height} - 2px)]',
      paddingInline: 'spacing.2',
      appearance: 'none',
      border: '[0]',
      bg: 'transparent',

      '&:disabled': {
        color: 'colour.neutral.70',
        cursor: 'not-allowed',
      },

      '& option, & optgroup': {
        color: 'colour.neutral.70',
      },
    },
  },
  variants: {
    showingPlaceholder: {
      true: {
        element: {
          color: 'colour.neutral.70',
        },
      },
    },
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
      '25%': {
        wrapper: {
          width: 'input.25%',
        },
        element: {
          width: 'auto',
        },
      },
      '50%': {
        wrapper: {
          width: 'input.50%',
        },
        element: {
          width: 'auto',
        },
      },
      '75%': {
        wrapper: {
          width: 'input.75%',
        },
        element: {
          width: 'auto',
        },
      },
      '100%': {
        wrapper: {
          width: 'input.100%',
        },
        element: {
          width: 'auto',
        },
      },
    },
  },
});

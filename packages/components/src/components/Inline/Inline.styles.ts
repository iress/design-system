import { cva } from '@/styled-system/css';

/**
 * The atomic recipe is a function that takes a variant and returns a class name object. It can be used to create a component without JSX (eg. as a utility class).
 *
 * [Learn more](https://panda-css.com/docs/concepts/recipes#atomic-recipe-or-cva)
 */
export const inline = cva({
  base: {
    display: 'flex',
    flexDirection: 'row',
    gap: 'spacing.000',
  },
  variants: {
    horizontalAlign: {
      around: {
        justifyContent: 'space-around',
      },
      between: {
        justifyContent: 'space-between',
      },
      center: {
        justifyContent: 'center',
      },
      evenly: {
        justifyContent: 'space-evenly',
      },
      left: {
        justifyContent: 'flex-start',
      },
      right: {
        justifyContent: 'flex-end',
      },
    },
    verticalAlign: {
      bottom: {
        alignItems: 'flex-end',
      },
      middle: {
        alignItems: 'center',
      },
      top: {
        alignItems: 'flex-start',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },
    noWrap: {
      true: {
        flexWrap: 'nowrap',
      },
      false: {
        flexWrap: 'wrap',
      },
    },
  },
  defaultVariants: {
    horizontalAlign: 'left',
    verticalAlign: 'top',
    noWrap: false,
  },
});

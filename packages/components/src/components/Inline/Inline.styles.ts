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
    gap: 'spacing.0',
  },
  variants: {
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
    noWrap: false,
  },
});

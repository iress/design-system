import { cva } from '@/styled-system/css';

/**
 * The atomic recipe is a function that takes a variant and returns a class name object. It can be used to create a component without JSX (eg. as a utility class).
 *
 * [Learn more](https://panda-css.com/docs/concepts/recipes#atomic-recipe-or-cva)
 */
export const container = cva({
  base: {
    borderRadius: 'radius.system.layout',
    px: 'spacing.4',
    mx: 'auto',
    width: '12/12',
  },
  variants: {
    /**
     * Container stretches to fill the width of the browser window if true.
     */
    fluid: {
      true: {
        maxWidth: '12/12',
      },
      false: {
        xs: {
          maxWidth: 'container.xs',
        },
        sm: {
          maxWidth: 'container.sm',
        },
        md: {
          maxWidth: 'container.md',
          px: 'spacing.6',
        },
        lg: {
          maxWidth: 'container.lg',
          px: 'spacing.6',
        },
        xl: {
          maxWidth: 'container.xl',
          px: 'spacing.8',
        },
        xxl: {
          maxWidth: 'container.xxl',
          px: 'spacing.8',
        },
      },
    },
  },
  defaultVariants: {
    fluid: false,
  },
});

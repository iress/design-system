import { cva } from '@/styled-system/css';

/**
 * The atomic recipe is a function that takes a variant and returns a class name object. It can be used to create a component without JSX (eg. as a utility class).
 *
 * [Learn more](https://panda-css.com/docs/concepts/recipes#atomic-recipe-or-cva)
 */
export const container = cva({
  base: {
    borderRadius: 'radius.system.layout',
    paddingBlock: undefined,
    paddingInline: 'spacing.4',
    marginInline: 'auto',
    width: '[100%]',
  },
  variants: {
    /**
     * Container stretches to fill the width of the browser window if true.
     */
    fluid: {
      true: {
        maxWidth: '[100%]',
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
        },
        lg: {
          maxWidth: 'container.lg',
        },
        xl: {
          maxWidth: 'container.xl',
        },
        xxl: {
          maxWidth: 'container.xxl',
        },
      },
    },
  },
  defaultVariants: {
    fluid: false,
  },
});

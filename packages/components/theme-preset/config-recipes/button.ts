import { type SystemStyleObject } from '@/styled-system/types';
import { defineSlotRecipe } from '@pandacss/dev';

const slots = ['root', 'prepend', 'append', 'spinner'] as const;

const fluidStyles: SystemStyleObject = {
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  justifyContent: 'center',
  marginInlineEnd: 'spacing.0',
  width: '[100%]',
};

/**
 * The atomic recipe is a function that takes a variant and returns a class name object. It can be used to create a component without JSX (eg. as a utility class).
 *
 * [Learn more](https://panda-css.com/docs/concepts/recipes#atomic-recipe-or-cva)
 */
export const buttonRecipe = defineSlotRecipe({
  className: 'button',
  description: 'Button styles',
  slots,
  base: {
    append: {
      display: 'contents',
    },
    root: {
      alignItems: 'center',
      borderRadius: 'radius.system.button',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'inline-flex',
      fontKerning: 'none',
      gap: 'spacing.2',
      justifyContent: 'center',
      maxWidth: '[100%]',
      minWidth: 'input.height',
      minHeight: 'input.height',
      my: 'spacing.0',
      pointerEvents: 'auto',
      px: 'button.inline',
      py: 'button.block',
      textAlign: 'center',
      textDecoration: 'none',
      textStyle: 'typography.body.md.medium',
      transition: 'all',
      transformStyle: 'preserve-3d',
      userSelect: 'none',
      whiteSpace: 'normal',
      width: 'auto',
      verticalAlign: 'middle',

      _focusVisible: {
        outline: 'none',
        layerStyle: 'elevation.focus',
      },

      _before: {
        position: 'absolute',
        top: '[0]',
        left: '[0]',
        right: '[0]',
        bottom: '[0]',
        transform: 'translateZ(-2px)',
        borderRadius: 'radius.system.button',
        borderStyle: 'solid',
        borderWidth: '[1px]',
        transition: 'all',
      },

      _after: {
        position: 'absolute',
        top: '[0]',
        left: '[0]',
        right: '[0]',
        bottom: '[0]',
        transform: 'translateZ(-1px)',
        opacity: 0,
        transformOrigin: 'bottom',
        borderRadius: 'radius.system.button',
        borderStyle: 'solid',
        borderWidth: '[1px]',
        transition: '.2s',
      },

      '&[data-active="true"]': {
        bg: 'colour.primary.surface',
        border: '[0.5px solid {colors.colour.primary.fill}]',
        color: 'colour.primary.text',
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
          bg: 'colour.primary.surface',
          border: '[0.5px solid {colors.colour.primary.fill}]',
          color: 'colour.primary.text',
        },
      },
    },
    fluid: {
      true: {
        root: {
          alignItems: 'center',
          alignSelf: 'stretch',
          display: 'flex',
          justifyContent: 'center',
          marginInlineEnd: 'spacing.0',
          width: '[100%]',
        },
      },
      xs: {
        root: {
          xsOnly: { ...fluidStyles },
        },
      },
      sm: {
        root: {
          xsToSm: { ...fluidStyles },
        },
      },
      md: {
        root: {
          xsToMd: { ...fluidStyles },
        },
      },
      lg: {
        root: {
          xsToLg: { ...fluidStyles },
        },
      },
      xl: {
        root: {
          xsToXl: { ...fluidStyles },
        },
      },
      xxl: {
        root: {
          xsToXl: { ...fluidStyles },
        },
      },
    },
    inButtonGroup: {
      true: {
        root: {
          py: 'spacing.0',

          _before: {
            transition: 'none',
          },
        },
      },
    },
    loading: {
      true: {
        root: {
          cursor: 'not-allowed',
          bg: 'colour.neutral.30',
          color: 'colour.neutral.60',
          border: '1px solid {colors.colour.neutral.30}',

          _before: {
            display: 'none',
          },

          _after: {
            display: 'none',
          },
        },
        spinner: {
          color: 'colour.neutral.60',
        },
      },
    },
    mode: {
      primary: {
        root: {
          color: 'colour.primary.onFill',

          _before: {
            content: `''`,
            bg: 'colour.primary.fill',
            borderColor: 'colour.primary.fill',
          },

          _after: {
            content: `''`,
            bg: 'colour.primary.fillHover',
            borderColor: 'colour.primary.fillHover',
          },

          _hover: {
            _after: {
              opacity: 1,
            },
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.primary.fill}, transparent 80%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.primary.onFill',
        },
      },
      secondary: {
        root: {
          color: 'colour.primary.text',

          _before: {
            content: `''`,
            bg: 'colour.primary.surface',
            borderColor:
              '[color-mix(in srgb, {colors.colour.primary.surface}, black 5%)]',
          },

          _after: {
            content: `''`,
            bg: 'colour.primary.surfaceHover',
            borderColor:
              '[color-mix(in srgb, {colors.colour.primary.surfaceHover}, black 5%)]',
          },

          _hover: {
            _after: {
              opacity: 1,
            },
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.primary.surface}, transparent 60%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.primary.text',
        },
      },
      tertiary: {
        root: {
          color: 'colour.primary.text',

          _before: {
            borderColor: 'colour.primary.text',
            content: `''`,
          },

          _after: {
            bg: 'colour.neutral.20',
            borderColor: 'colour.primary.text',
            content: `''`,
          },

          _hover: {
            _after: {
              opacity: 1,
            },
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.neutral.80}, transparent 90%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.primary.text',
        },
      },
      muted: {
        root: {
          color: 'colour.neutral.70',

          _before: {
            display: 'none',
          },

          _after: {
            bg: 'colour.neutral.20',
            borderColor: 'colour.neutral.20',
            content: `''`,
          },

          _hover: {
            color: 'colour.primary.text',
            _after: {
              opacity: 1,
            },
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.neutral.70}, transparent 90%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.neutral.70',
        },
      },
    },
    noWrap: {
      true: {
        root: {
          minWidth: '[fit-content]',
          whiteSpace: 'nowrap',
        },
      },
    },
    status: {
      success: {
        root: {
          color: 'colour.system.success.onFill',
        },
      },
      danger: {
        root: {
          color: 'colour.system.danger.onFill',
        },
      },
    },
  },
  compoundVariants: [
    {
      mode: 'primary',
      status: 'danger',
      css: {
        root: {
          color: 'colour.system.danger.onFill',

          _before: {
            content: `''`,
            bg: 'colour.system.danger.fill',
            borderColor: 'colour.system.danger.fill',
          },

          _after: {
            content: `''`,
            bg: 'colour.system.danger.fillHover',
            borderColor: 'colour.system.danger.fillHover',
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.danger.fill}, transparent 80%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.system.danger.onFill',
        },
      },
    },
    {
      mode: 'secondary',
      status: 'danger',
      css: {
        root: {
          color: 'colour.system.danger.text',

          _before: {
            content: `''`,
            bg: 'colour.system.danger.surface',
            borderColor:
              '[color-mix(in srgb, {colors.colour.system.danger.surface}, black 5%)]',
          },

          _after: {
            content: `''`,
            bg: 'colour.system.danger.surfaceHover',
            borderColor:
              '[color-mix(in srgb, {colors.colour.system.danger.surfaceHover}, black 5%)]',
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.danger.surface}, transparent 60%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.system.danger.text',
        },
      },
    },
    {
      mode: 'tertiary',
      status: 'danger',
      css: {
        root: {
          color: 'colour.system.danger.text',

          _before: {
            borderColor: 'colour.system.danger.fill',
          },

          _after: {
            bg: 'colour.system.danger.surfaceHover',
            borderColor: 'colour.system.danger.fill',
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.danger.surface}, transparent 60%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.system.danger.text',
        },
      },
    },
    {
      mode: 'muted',
      status: 'danger',
      css: {
        root: {
          color: 'colour.system.danger.text',

          _after: {
            bg: 'colour.system.danger.surfaceHover',
            borderColor: 'colour.system.danger.surfaceHover',
          },
        },
        spinner: {
          color: 'colour.system.danger.text',
        },
      },
    },
    {
      mode: 'primary',
      status: 'success',
      css: {
        root: {
          color: 'colour.system.success.onFill',

          _before: {
            bg: 'colour.system.success.fill',
            borderColor: 'colour.system.success.fill',
          },

          _after: {
            bg: 'colour.system.success.fillHover',
            borderColor: 'colour.system.success.fill',
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.success.fill}, transparent 80%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.system.success.onFill',
        },
      },
    },
    {
      mode: 'secondary',
      status: 'success',
      css: {
        root: {
          color: 'colour.system.success.text',

          _before: {
            bg: 'colour.system.success.surface',
            borderColor:
              '[color-mix(in srgb, {colors.colour.system.success.surface}, black 5%)]',
          },

          _after: {
            bg: 'colour.system.success.surfaceHover',
            borderColor:
              '[color-mix(in srgb, {colors.colour.system.success.surfaceHover}, black 5%)]',
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.success.surface}, transparent 60%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.system.success.text',
        },
      },
    },
    {
      mode: 'tertiary',
      status: 'success',
      css: {
        root: {
          color: 'colour.system.success.text',

          _before: {
            borderColor: 'colour.system.success.fill',
          },

          _after: {
            bg: 'colour.system.success.surfaceHover',
            borderColor: 'colour.system.success.fill',
          },

          _active: {
            _after: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.success.surface}, transparent 60%) 0px 0px 0px 3px',
            },
          },
        },
        spinner: {
          color: 'colour.system.success.text',
        },
      },
    },
    {
      mode: 'muted',
      status: 'success',
      css: {
        root: {
          color: 'colour.system.success.text',

          _after: {
            bg: 'colour.system.success.surfaceHover',
            borderColor: 'colour.system.success.surfaceHover',
          },
        },
        spinner: {
          color: 'colour.system.success.text',
        },
      },
    },
    {
      mode: 'primary',
      loading: true,
      css: {
        root: {
          color: 'colour.neutral.60',
        },
        spinner: {
          color: 'colour.neutral.60',
        },
      },
    },
    {
      mode: 'secondary',
      loading: true,
      css: {
        root: {
          borderColor: 'colour.neutral.60',
          color: 'colour.neutral.60',
        },
        spinner: {
          color: 'colour.neutral.60',
        },
      },
    },
    {
      mode: 'tertiary',
      loading: true,
      css: {
        root: {
          borderColor: 'colour.neutral.60',
          color: 'colour.neutral.60',
        },
        spinner: {
          color: 'colour.neutral.60',
        },
      },
    },
    {
      mode: 'muted',
      loading: true,
      css: {
        root: {
          bg: 'transparent',
          borderColor: 'transparent',
          color: 'colour.neutral.60',
        },
        spinner: {
          color: 'colour.neutral.60',
        },
      },
    },
    {
      mode: 'tertiary',
      inButtonGroup: true,
      css: {
        root: {
          color: 'colour.neutral.80',

          _after: {
            bg: 'colour.primary.surfaceHover',
          },
        },
      },
    },
    {
      mode: ['primary', 'muted'],
      active: true,
      css: {
        root: {
          color: 'colour.primary.text',
        },
      },
    },
  ],
  staticCss: ['*'],
});

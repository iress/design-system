import { SystemStyleObject } from '@/styled-system/types';
import { defineSlotRecipe } from '@pandacss/dev';

const slots = ['root', 'prepend', 'append', 'spinner'] as const;

const fluidStyles: SystemStyleObject = {
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  justifyContent: 'center',
  marginInlineEnd: 'spacing.000',
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
      alignSelf: 'flex-start',
      borderRadius: 'radius.system.button',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'inline-flex',
      fontKerning: 'none',
      gap: 'spacing.200',
      justifyContent: 'center',
      maxWidth: '[100%]',
      minWidth: 'input.height',
      minHeight: 'input.height',
      my: 'spacing.000',
      pointerEvents: 'auto',
      px: 'button.inline',
      py: 'button.block',
      textAlign: 'center',
      textDecoration: 'none',
      textStyle: 'typography.body.md',
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
        transition: 'all',
      },

      _after: {
        position: 'absolute',
        top: '[0]',
        left: '[0]',
        right: '[0]',
        bottom: '[0]',
        transform: 'translateZ(-1px) scaleY(0) scaleX(0.3)',
        transformOrigin: 'bottom',
        borderRadius: '[50%]',
        transition: '.2s',
      },

      '&[data-active="true"]': {
        bg: 'colour.primary.surface',
        boxShadow: 'inset 0 0 0 1px {colors.colour.primary.text}',
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
          boxShadow: 'inset 0 0 0 1px {colors.colour.primary.text}',
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
          marginInlineEnd: 'spacing.000',
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
          py: 'spacing.000',

          _before: {
            transition: 'none',
          },

          _after: {
            transform: 'translateZ(-1px) scale(1)',
            transformOrigin: 'center',
            borderRadius: 'radius.system.button',
          },
        },
      },
    },
    loading: {
      true: {
        root: {
          cursor: 'not-allowed',
          filter: '[saturate(0.25)]',
          opacity: 0.5,

          _before: {
            display: 'none',
          },

          _after: {
            display: 'none',
          },
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
          },

          _after: {
            content: `''`,
            bg: 'colour.primary.fillHover',
          },

          _hover: {
            _after: {
              borderRadius: 'radius.system.button',
              transform: 'translateZ(-1px)',
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
          },

          _after: {
            content: `''`,
            bg: 'colour.primary.surfaceHover',
          },

          _hover: {
            _after: {
              borderRadius: 'radius.system.button',
              transform: 'translateZ(-1px)',
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

          _after: {
            borderRadius: 'radius.system.button',
            bg: 'colour.neutral.20',
            content: `''`,
            opacity: 0,
            transform: 'translateZ(-1px)',
          },

          _hover: {
            _after: {
              opacity: 1,
              transform: 'translateZ(-1px)',
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
          },

          _after: {
            content: `''`,
            bg: 'colour.system.danger.fillHover',
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
          },

          _after: {
            content: `''`,
            bg: 'colour.system.danger.surfaceHover',
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

          _after: {
            content: `''`,
            bg: 'colour.system.danger.surfaceHover',
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
      mode: 'primary',
      status: 'success',
      css: {
        root: {
          color: 'colour.system.success.onFill',

          _before: {
            content: `''`,
            bg: 'colour.system.success.fill',
          },

          _after: {
            content: `''`,
            bg: 'colour.system.success.fillHover',
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
            content: `''`,
            bg: 'colour.system.success.surface',
          },

          _after: {
            content: `''`,
            bg: 'colour.system.success.surfaceHover',
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

          _after: {
            content: `''`,
            bg: 'colour.system.success.surfaceHover',
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
      mode: 'primary',
      loading: true,
      css: {
        root: {
          bg: 'colour.primary.fill',
        },
      },
    },
    {
      mode: 'secondary',
      loading: true,
      css: {
        root: {
          bg: 'colour.primary.surface',
        },
      },
    },
    {
      mode: 'primary',
      inButtonGroup: true,
      css: {
        root: {
          boxShadow: 'none',
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
  ],
  staticCss: ['*'],
});

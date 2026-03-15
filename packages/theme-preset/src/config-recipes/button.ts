import { type SystemStyleObject } from '@pandacss/dev';
import { defineSlotRecipe } from '@pandacss/dev';

const slots = ['root', 'prepend', 'append', 'spinner'] as const;

const fluidStyles: SystemStyleObject = {
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  justifyContent: 'center',
  marginInlineEnd: 'spacing.0',
  width: '12/12',
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
      borderStyle: 'solid',
      borderWidth: '[1px]',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'inline-flex',
      fontKerning: '[none]',
      gap: 'spacing.2',
      justifyContent: 'center',
      maxWidth: '12/12',
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
      '--transition-easing': 'linear',
      '--transition-duration': '0.2s',
      userSelect: 'none',
      whiteSpace: 'normal',
      width: 'auto',
      verticalAlign: 'middle',

      _focusVisible: {
        outline: 'none',
        focusable: 'true',
      },

      '&[data-active="true"]': {
        bg: 'colour.primary.surface',
        borderColor: 'colour.primary.fill',
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
          borderColor: 'colour.primary.text',
          color: 'colour.primary.text',
        },
      },
    },
    compact: {
      true: {
        root: {
          textStyle: 'typography.body.sm.medium',
          minWidth: 'input.height.sm',
          minHeight: 'input.height.sm',
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
          width: '12/12',
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
          borderWidth: '[0px]',
        },
      },
    },
    iconOnly: {
      true: {
        root: {
          paddingInline: 'button.iconInline',
        },
      },
    },
    loading: {
      true: {
        root: {
          cursor: 'not-allowed',
          bg: 'colour.neutral.30',
          color: 'colour.neutral.60',
          borderColor: 'colour.neutral.30',
        },
        spinner: {
          color: 'colour.neutral.60',
        },
      },
    },
    mode: {
      primary: {
        root: {
          bg: 'colour.primary.fill',
          borderColor: 'colour.primary.fill',
          color: 'colour.primary.onFill',

          _hover: {
            bg: 'colour.primary.fillHover',
            borderColor: 'colour.primary.fillHover',
          },

          _active: {
            layerStyle: 'focusRing.primary.sm',
          },

          '&[data-active="true"]': {
            bg: 'colour.primary.surface',
            borderColor: 'colour.primary.fill',
            color: 'colour.primary.text',
          },
        },
        spinner: {
          color: 'colour.primary.onFill',
        },
      },
      secondary: {
        root: {
          bg: 'colour.primary.surface',
          borderColor: 'colour.neutral.40',
          color: 'colour.primary.text',

          _hover: {
            bg: 'colour.primary.surfaceHover',
            boxShadow: '{colors.colour.neutral.40} 0px 0px 0px 1px',
          },

          _active: {
            layerStyle: 'focusRing.primary.subtle',
          },

          '&[data-active="true"]': {
            bg: 'colour.primary.surface',
            borderColor: 'colour.primary.fill',
            color: 'colour.primary.text',
          },
        },
        spinner: {
          color: 'colour.primary.text',
        },
      },
      tertiary: {
        root: {
          bg: 'transparent',
          borderColor: 'colour.primary.text',
          color: 'colour.primary.text',

          _hover: {
            bg: 'colour.primary.surfaceHover',
          },

          _active: {
            layerStyle: 'focusRing.primary.sm',
          },

          '&[data-active="true"]': {
            bg: 'colour.primary.surface',
            borderColor: 'colour.primary.fill',
            color: 'colour.primary.text',
          },
        },
        spinner: {
          color: 'colour.primary.text',
        },
      },
      quaternary: {
        root: {
          bg: 'transparent',
          borderColor: 'colour.neutral.40',
          color: 'colour.primary.text',

          _hover: {
            bg: 'colour.neutral.20',
          },

          _active: {
            layerStyle: 'focusRing.primary.subtle',
          },

          '&[data-active="true"]': {
            bg: 'colour.primary.surface',
            borderColor: 'colour.primary.fill',
            color: 'colour.primary.text',
          },
        },
        spinner: {
          color: 'colour.primary.text',
        },
      },
      muted: {
        root: {
          bg: 'transparent',
          borderColor: 'transparent',
          color: 'colour.neutral.70',

          _hover: {
            bg: 'colour.neutral.20',
            borderColor: 'colour.neutral.20',
            color: 'colour.primary.text',
          },

          _active: {
            layerStyle: 'focusRing.primary.subtle',
          },

          '&[data-active="true"]': {
            bg: 'colour.primary.surface',
            borderColor: 'colour.primary.fill',
            color: 'colour.primary.text',
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
      info: {
        root: {
          color: 'colour.system.info.onFill',
        },
      },
      warning: {
        root: {
          color: 'colour.system.warning.onFill',
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
          bg: 'colour.system.danger.fill',
          borderColor: 'colour.system.danger.fill',
          color: 'colour.system.danger.onFill',

          _hover: {
            bg: 'colour.system.danger.fillHover',
            borderColor: 'colour.system.danger.fillHover',
          },

          _active: {
            layerStyle: 'focusRing.danger.md',
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
          bg: 'colour.system.danger.surface',
          borderColor:
            '[color-mix(in srgb, {colors.colour.system.danger.surface}, black 5%)]',
          color: 'colour.system.danger.text',

          _hover: {
            bg: 'colour.system.danger.surfaceHover',
            borderColor:
              '[color-mix(in srgb, {colors.colour.system.danger.surfaceHover}, black 5%)]',
          },

          _active: {
            layerStyle: 'focusRing.danger.surface',
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
          borderColor: 'colour.system.danger.fill',
          color: 'colour.system.danger.text',

          _hover: {
            bg: 'colour.system.danger.surfaceHover',
          },

          _active: {
            layerStyle: 'focusRing.danger.surface',
          },
        },
        spinner: {
          color: 'colour.system.danger.text',
        },
      },
    },
    {
      mode: 'quaternary',
      status: 'danger',
      css: {
        root: {
          borderColor: 'colour.system.danger.surface',
          color: 'colour.system.danger.text',

          _hover: {
            bg: 'colour.system.danger.surfaceHover',
          },

          _active: {
            layerStyle: 'focusRing.danger.surface',
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

          _hover: {
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
          bg: 'colour.system.success.fill',
          borderColor: 'colour.system.success.fill',
          color: 'colour.system.success.onFill',

          _hover: {
            bg: 'colour.system.success.fillHover',
          },

          _active: {
            layerStyle: 'focusRing.success.md',
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
          bg: 'colour.system.success.surface',
          borderColor:
            '[color-mix(in srgb, {colors.colour.system.success.surface}, black 5%)]',
          color: 'colour.system.success.text',

          _hover: {
            bg: 'colour.system.success.surfaceHover',
            borderColor:
              '[color-mix(in srgb, {colors.colour.system.success.surfaceHover}, black 5%)]',
          },

          _active: {
            layerStyle: 'focusRing.success.surface',
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
          borderColor: 'colour.system.success.fill',
          color: 'colour.system.success.text',

          _hover: {
            bg: 'colour.system.success.surfaceHover',
          },

          _active: {
            layerStyle: 'focusRing.success.surface',
          },
        },
        spinner: {
          color: 'colour.system.success.text',
        },
      },
    },
    {
      mode: 'quaternary',
      status: 'success',
      css: {
        root: {
          borderColor: 'colour.system.success.surface',
          color: 'colour.system.success.text',

          _hover: {
            bg: 'colour.system.success.surfaceHover',
          },

          _active: {
            layerStyle: 'focusRing.success.surface',
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

          _hover: {
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
      mode: 'secondary',
      status: 'info',
      css: {
        root: {
          bg: 'colour.system.info.surface',
          borderColor:
            '[color-mix(in srgb, {colors.colour.system.info.surface}, black 5%)]',
          color: 'colour.system.info.text',

          _hover: {
            bg: 'colour.system.info.surfaceHover',
            borderColor:
              '[color-mix(in srgb, {colors.colour.system.info.surfaceHover}, black 5%)]',
          },

          _active: {
            layerStyle: 'focusRing.info.surface',
          },
        },
        spinner: {
          color: 'colour.system.info.text',
        },
      },
    },
    {
      mode: 'tertiary',
      status: 'info',
      css: {
        root: {
          borderColor: 'colour.system.info.fill',
          color: 'colour.system.info.text',

          _hover: {
            bg: 'colour.system.info.surfaceHover',
          },

          _active: {
            layerStyle: 'focusRing.info.surface',
          },
        },
        spinner: {
          color: 'colour.system.info.text',
        },
      },
    },
    {
      mode: 'secondary',
      status: 'warning',
      css: {
        root: {
          bg: 'colour.system.warning.surface',
          borderColor:
            '[color-mix(in srgb, {colors.colour.system.warning.surface}, black 5%)]',
          color: 'colour.system.warning.text',

          _hover: {
            bg: 'colour.system.warning.surfaceHover',
            borderColor:
              '[color-mix(in srgb, {colors.colour.system.warning.surfaceHover}, black 5%)]',
          },

          _active: {
            layerStyle: 'focusRing.warning.surface',
          },
        },
        spinner: {
          color: 'colour.system.warning.text',
        },
      },
    },
    {
      mode: 'tertiary',
      status: 'warning',
      css: {
        root: {
          borderColor: 'colour.system.warning.fill',
          color: 'colour.system.warning.text',

          _hover: {
            bg: 'colour.system.warning.surfaceHover',
          },

          _active: {
            layerStyle: 'focusRing.warning.surface',
          },
        },
        spinner: {
          color: 'colour.system.warning.text',
        },
      },
    },
    {
      mode: 'primary',
      loading: true,
      css: {
        root: {
          bg: 'colour.neutral.20',
          borderColor: 'colour.neutral.20',
          color: 'colour.neutral.70',
        },
        spinner: {
          color: 'colour.neutral.70',
        },
      },
    },
    {
      mode: ['secondary', 'quaternary'],
      loading: true,
      css: {
        root: {
          bg: 'colour.neutral.20',
          borderColor: 'colour.neutral.40',
          color: 'colour.neutral.70',

          _hover: {
            boxShadow: 'none',
          },
        },
        spinner: {
          color: 'colour.neutral.70',
        },
      },
    },
    {
      mode: 'tertiary',
      loading: true,
      css: {
        root: {
          bg: 'colour.neutral.20',
          borderColor: 'colour.neutral.70',
          color: 'colour.neutral.70',
        },
        spinner: {
          color: 'colour.neutral.70',
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

          _hover: {
            bg: 'colour.primary.surfaceHover',
          },
        },
      },
    },
    {
      mode: ['primary', 'secondary', 'tertiary', 'quaternary', 'muted'],
      active: true,
      css: {
        root: {
          bg: 'colour.primary.surface',
          borderColor: 'colour.primary.text',
          color: 'colour.primary.text',
        },
      },
    },
  ],
  staticCss: [
    { mode: ['*'] },
    { status: ['*'] },
    { compact: ['*'] },
    { fluid: ['true'] },
    { loading: ['*'] },
    { iconOnly: ['*'] },
    { noWrap: ['*'] },
    { inButtonGroup: ['*'] },
    { active: ['*'] },
    {
      mode: ['primary', 'secondary', 'tertiary', 'quaternary', 'muted'],
      status: ['danger'],
    },
    {
      mode: ['primary', 'secondary', 'tertiary', 'quaternary', 'muted'],
      status: ['success'],
    },
    { mode: ['secondary', 'tertiary'], status: ['info'] },
    { mode: ['secondary', 'tertiary'], status: ['warning'] },
    {
      mode: ['primary', 'secondary', 'tertiary', 'quaternary', 'muted'],
      loading: ['true'],
    },
    { mode: ['tertiary'], inButtonGroup: ['true'] },
    {
      mode: ['primary', 'secondary', 'tertiary', 'quaternary', 'muted'],
      active: ['true'],
    },
  ],
});

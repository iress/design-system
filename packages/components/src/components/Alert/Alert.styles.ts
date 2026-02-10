import { sva } from '@/styled-system/css';

export const alert = sva({
  slots: [
    'alert',
    'icon',
    'wrapper',
    'heading',
    'children',
    'footer',
    'footerActions',
    'action',
    'dismiss',
  ],
  base: {
    alert: {
      display: 'flex',
      flexWrap: 'nowrap',
      gap: 'spacing.3',
      boxSizing: 'border-box',
      marginBottom: 'spacing.4',
      borderRadius: 'radius.system.layout',
      padding: 'spacing.3',
      textStyle: 'typography.body.md',
      border: 'alert',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'spacing.1',
      flex: '1',
      noGutter: true,

      md: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
      },
    },
    heading: {
      display: 'inline-block',
      marginRight: 'spacing.1',
      whiteSpace: 'nowrap',
      _empty: {
        display: 'none',
      },
      _directNestedHeadings: {
        marginBlock: 'spacing.0',
        textStyle: 'typography.body.md.medium',
      },
    },
    children: {
      marginBlock: 'spacing.0',
      '& > p': { marginBlock: 'spacing.0' },
    },
    footer: {
      pt: 'spacing.1',

      md: {
        pt: 'spacing.0',
        ml: 'auto',
      },
    },
    footerActions: {
      display: 'flex',
      flexDirection: 'row',
      gap: 'spacing.2',
    },
    action: {
      minHeight: '[0]',
      py: 'spacing.1',
      textStyle: 'typography.body.sm.medium',

      '&.button__root--mode_tertiary:not(:hover)': {
        bg: 'colour.neutral.10',
      },
    },
    dismiss: {
      marginLeft: 'auto',
      my: '-spacing.2',
    },
  },
  variants: {
    hasFooter: {
      true: {
        dismiss: {
          my: '-spacing.1',
        },
      },
    },
    multiLine: {
      true: {
        wrapper: {
          md: {
            flexDirection: 'column',
          },
        },
        footer: {
          md: {
            pt: 'spacing.1',
            ml: 'spacing.0',
          },
        },
        action: {
          textStyle: 'typography.body.md.medium',
        },
      },
    },
    status: {
      danger: {
        alert: {
          backgroundColor: 'colour.system.danger.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.danger.text',
        },
        heading: {
          color: 'colour.system.danger.text',
        },
        children: {
          color: 'colour.system.danger.text',
        },
        icon: {
          color: 'colour.system.danger.text',
        },
        dismiss: {
          color: 'colour.system.danger.text',

          _hover: {
            bg: 'colour.system.danger.surfaceHover',
            borderColor: 'colour.system.danger.surfaceHover',
          },
        },
        action: {
          '&.button__root--mode_secondary': {
            bg: 'colour.system.danger.fill',
            borderColor: 'colour.system.danger.fill',
            color: 'colour.system.danger.onFill',

            _hover: {
              bg: 'colour.system.danger.fillHover',
              borderColor: 'colour.system.danger.fillHover',
            },

            _active: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.danger.fill}, transparent 80%) 0px 0px 0px 3px',
            },
          },
        },
      },
      info: {
        alert: {
          backgroundColor: 'colour.system.info.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.info.text',
        },
        heading: {
          color: 'colour.system.info.text',
        },
        children: {
          color: 'colour.system.info.text',
        },
        icon: {
          color: 'colour.system.info.text',
        },
        dismiss: {
          color: 'colour.system.info.text',

          _hover: {
            bg: 'colour.system.info.surfaceHover',
            borderColor: 'colour.system.info.surfaceHover',
          },
        },
        action: {
          '&.button__root--mode_secondary': {
            bg: 'colour.system.info.fill',
            borderColor: 'colour.system.info.fill',
            color: 'colour.system.info.onFill',

            _hover: {
              bg: 'colour.system.info.fillHover',
              borderColor: 'colour.system.info.fillHover',
            },

            _active: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.info.fill}, transparent 80%) 0px 0px 0px 3px',
            },
          },
        },
      },
      success: {
        alert: {
          backgroundColor: 'colour.system.success.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.success.text',
        },
        heading: {
          color: 'colour.system.success.text',
        },
        children: {
          color: 'colour.system.success.text',
        },
        icon: {
          color: 'colour.system.success.text',
        },
        dismiss: {
          color: 'colour.system.success.text',

          _hover: {
            bg: 'colour.system.success.surfaceHover',
            borderColor: 'colour.system.success.surfaceHover',
          },
        },
        action: {
          '&.button__root--mode_secondary': {
            bg: 'colour.system.success.fill',
            borderColor: 'colour.system.success.fill',
            color: 'colour.system.success.onFill',

            _hover: {
              bg: 'colour.system.success.fillHover',
              borderColor: 'colour.system.success.fillHover',
            },

            _active: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.success.fill}, transparent 80%) 0px 0px 0px 3px',
            },
          },
        },
      },
      warning: {
        alert: {
          backgroundColor: 'colour.system.warning.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.warning.text',
        },
        heading: {
          color: 'colour.system.warning.text',
        },
        children: {
          color: 'colour.system.warning.text',
        },
        icon: {
          color: 'colour.system.warning.text',
        },
        dismiss: {
          color: 'colour.system.warning.text',

          _hover: {
            bg: 'colour.system.warning.surfaceHover',
            borderColor: 'colour.system.warning.surfaceHover',
          },
        },
        action: {
          '&.button__root--mode_secondary': {
            bg: 'colour.system.warning.fill',
            borderColor: 'colour.system.warning.fill',
            color: 'colour.system.warning.onFill',

            _hover: {
              bg: 'colour.system.warning.fillHover',
              borderColor: 'colour.system.warning.fillHover',
            },

            _active: {
              boxShadow:
                'color-mix(in srgb, {colors.colour.system.warning.fill}, transparent 80%) 0px 0px 0px 3px',
            },
          },
        },
      },
    },
    variant: {
      sidebar: {
        alert: {
          borderTopLeftRadius: 'none',
          borderBottomLeftRadius: 'none',
          borderWidth: '[0]',
          borderLeftWidth: '[2.5px]',
          paddingBlock: 'spacing.4',
        },
      },
      'full-width': {
        alert: {
          borderRadius: 'none',
          borderWidth: '[0]',
          borderTopWidth: '[1px]',
          borderBottomWidth: '[1px]',
        },
      },
    },
  },
  compoundVariants: [
    {
      hasFooter: true,
      multiLine: false,
      css: {
        icon: {
          mt: 'spacing.1',
        },
        heading: {
          mt: 'spacing.1',
        },
        children: {
          mt: 'spacing.1',
        },
      },
    },
  ],
});

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
      backgroundColor: '[var(--alert-surface)]',
      color: 'colour.neutral.80',
      borderColor: '[var(--alert-text)]',
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
      color: '[var(--alert-text)]',
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
      color: '[var(--alert-text)]',
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

      '&.button__root--mode_secondary': {
        bg: '[var(--alert-fill)]',
        borderColor: '[var(--alert-fill)]',
        color: '[var(--alert-onFill)]',

        _hover: {
          bg: '[var(--alert-fillHover)]',
          borderColor: '[var(--alert-fillHover)]',
        },

        _active: {
          boxShadow:
            '[color-mix(in srgb, var(--alert-fill), transparent 80%) 0px 0px 0px 3px]',
        },
      },
    },
    icon: {
      color: '[var(--alert-text)]',
    },
    dismiss: {
      marginLeft: 'auto',
      my: '-spacing.2',
      mr: '-spacing.1',
      color: '[var(--alert-text)]',

      _hover: {
        bg: '[var(--alert-surfaceHover)]',
        borderColor: '[var(--alert-surfaceHover)]',
      },
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
          '--alert-surface': '{colors.colour.system.danger.surface}',
          '--alert-surfaceHover': '{colors.colour.system.danger.surfaceHover}',
          '--alert-text': '{colors.colour.system.danger.text}',
          '--alert-fill': '{colors.colour.system.danger.fill}',
          '--alert-fillHover': '{colors.colour.system.danger.fillHover}',
          '--alert-onFill': '{colors.colour.system.danger.onFill}',
        },
      },
      info: {
        alert: {
          '--alert-surface': '{colors.colour.system.info.surface}',
          '--alert-surfaceHover': '{colors.colour.system.info.surfaceHover}',
          '--alert-text': '{colors.colour.system.info.text}',
          '--alert-fill': '{colors.colour.system.info.fill}',
          '--alert-fillHover': '{colors.colour.system.info.fillHover}',
          '--alert-onFill': '{colors.colour.system.info.onFill}',
        },
      },
      success: {
        alert: {
          '--alert-surface': '{colors.colour.system.success.surface}',
          '--alert-surfaceHover': '{colors.colour.system.success.surfaceHover}',
          '--alert-text': '{colors.colour.system.success.text}',
          '--alert-fill': '{colors.colour.system.success.fill}',
          '--alert-fillHover': '{colors.colour.system.success.fillHover}',
          '--alert-onFill': '{colors.colour.system.success.onFill}',
        },
      },
      warning: {
        alert: {
          '--alert-surface': '{colors.colour.system.warning.surface}',
          '--alert-surfaceHover': '{colors.colour.system.warning.surfaceHover}',
          '--alert-text': '{colors.colour.system.warning.text}',
          '--alert-fill': '{colors.colour.system.warning.fill}',
          '--alert-fillHover': '{colors.colour.system.warning.fillHover}',
          '--alert-onFill': '{colors.colour.system.warning.onFill}',
        },
      },
      neutral: {
        alert: {
          '--alert-surface': '{colors.colour.neutral.20}',
          '--alert-surfaceHover': '{colors.colour.neutral.30}',
          '--alert-text': '{colors.colour.neutral.90}',
          '--alert-fill': '{colors.colour.neutral.70}',
          '--alert-fillHover': '{colors.colour.neutral.80}',
          '--alert-onFill': '{colors.colour.neutral.20}',
        },
        action: {
          '&.button__root--mode_tertiary': {
            _hover: {
              bg: 'colour.neutral.30',
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

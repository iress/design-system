import { sva } from '@/styled-system/css';

export const alert = sva({
  slots: [
    'alert',
    'icon',
    'wrapper',
    'heading',
    'children',
    'footer',
    'action',
    'dismiss',
  ],
  base: {
    alert: {
      display: 'flex',
      flexWrap: 'nowrap',
      gap: 'spacing.2',
      boxSizing: 'border-box',
      marginBottom: 'spacing.4',
      borderRadius: 'radius.system.form',
      paddingBlock: 'spacing.2',
      paddingInline: 'spacing.3',
      textStyle: 'typography.body.md',
      border: 'alert',
      height: 'auto',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    wrapper: {
      noGutter: true,
    },
    icon: {
      lineHeight: 'inherit !important', // Needs important as the line-height is set inside the icon CSS file
    },
    heading: {
      display: 'inline-block',
      marginRight: 'spacing.1',
      _empty: {
        display: 'none',
      },
      _directNestedHeadings: {
        marginBlock: 'spacing.0',
        textStyle: 'typography.body.md.strong',
      },
    },
    children: {
      marginBlock: 'spacing.0',
      '& > p': { marginBlock: 'spacing.0' },
    },
    footer: {
      paddingBlockStart: 'spacing.1',
    },
    action: {
      minHeight: '[0]',
      py: 'spacing.1',
      _before: {
        bg: 'transparent',
        border: 'divider',
        borderRadius: 'radius.system.badge',
      },
      _after: {
        transform: 'translateZ(-1px)',
        opacity: 0,
        borderRadius: 'radius.system.badge',
      },
      _hover: {
        _after: {
          opacity: 1,
        },
      },
    },
    dismiss: {
      marginLeft: 'auto',
      marginTop: '-spacing.2',
      marginRight: '-spacing.3',
      marginBottom: '-spacing.2',
    },
  },
  variants: {
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
        icon: {
          color: 'colour.system.danger.text',
        },
        action: {
          bg: 'colour.system.danger.fill',
          borderColor: 'colour.system.danger.fill',
          color: 'colour.system.danger.onFill',
          _hover: {
            bg: 'colour.system.danger.fillHover',
            borderColor: 'colour.system.danger.fillHover',
            color: 'colour.system.danger.onFill',
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
        icon: {
          color: 'colour.system.info.text',
        },
        action: {
          bg: 'colour.system.info.fill',
          borderColor: 'colour.system.info.fill',
          color: 'colour.system.info.onFill',
          _hover: {
            bg: 'colour.system.info.fillHover',
            borderColor: 'colour.system.info.fillHover',
            color: 'colour.system.info.onFill',
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
        icon: {
          color: 'colour.system.success.text',
        },
        action: {
          bg: 'colour.system.success.fill',
          borderColor: 'colour.system.success.fill',
          color: 'colour.system.success.onFill',
          _hover: {
            bg: 'colour.system.success.fillHover',
            borderColor: 'colour.system.success.fillHover',
            color: 'colour.system.success.onFill',
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
        icon: {
          color: 'colour.system.warning.text',
        },
        action: {
          bg: 'colour.system.warning.fill',
          borderColor: 'colour.system.warning.fill',
          color: 'colour.system.warning.onFill',
          _hover: {
            bg: 'colour.system.warning.fillHover',
            borderColor: 'colour.system.warning.fillHover',
            color: 'colour.system.warning.onFill',
          },
        },
      },
    },
    variant: {
      sidebar: {
        alert: {
          borderTopLeftRadius: 'radius.000',
          borderBottomLeftRadius: 'radius.000',
          borderWidth: '[0]',
          borderLeftWidth: '[2.5px]',
          paddingBlock: 'spacing.4',
        },
      },
      'site-wide': {
        alert: {
          borderRadius: 'radius.000',
          borderWidth: '[0]',
          borderBottomWidth: '[0.5px]',
        },
        heading: {
          display: 'inline',
        },
        children: {
          display: 'inline',
        },
      },
    },
  },
});

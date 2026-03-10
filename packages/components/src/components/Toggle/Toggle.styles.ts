import { sva } from '@/styled-system/css';

export const toggle = sva({
  slots: [
    'toggleBase',
    'toggleButtonContainer',
    'toggleButton',
    'buttonChecked',
    'checkboxMark',
    'label',
  ],
  base: {
    toggleBase: {
      // Performance: CSS containment (no paint to allow focus ring/shadow)
      contain: 'layout style',
      display: 'inline-flex',
      gap: 'spacing.1',
      color: 'colour.primary.fill',
      textStyle: 'typography.body.md.strong',
      '&:has(button:disabled)': {
        cursor: 'not-allowed',
      },
    },
    toggleButtonContainer: {
      position: 'relative',
      width: 'toggle.width',
      height: 'toggle.thumb',
      lineHeight: '0',
      bg: '[currentColor]',
      '&:has(button:disabled)': {
        opacity: '[0.5]',
        pointerEvents: 'none',
      },
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '[currentColor]',
      borderRadius: '[{sizes.toggle.thumb}]',
      transition: '[background-color 0.3s ease-out]',
      focusable: 'has-switch',
      _hover: {
        color: 'colour.neutral.80',
      },
    },
    toggleButton: {
      height: '12/12',
      width: '12/12',
      position: 'relative',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 'spacing.0',
      cursor: 'pointer',
      border: '[none]',
      backgroundColor: 'transparent',
      display: 'flex',
      _focus: {
        outline: '[none]',
      },
      '&>svg': {
        border: '[none]',
      },
      _before: {
        content: '""',
        top: 'spacing.0',
        left: 'spacing.0',
        right: 'spacing.0',
        bottom: 'spacing.0',
        position: 'absolute',
        borderRadius: '[{sizes.toggle.thumb}]',
        pointerEvents: 'none',
        backgroundColor:
          '[color-mix(in srgb, {colors.colour.primary.fill}, transparent 90%)]',
        opacity: 0,
        transform: 'scale(0.5)',
        transformOrigin: 'center',
      },
      _after: {
        content: '""',
        width: 'toggle.thumb',
        height: 'toggle.thumb',
        borderRadius: '[50%]',
        backgroundColor: 'colour.neutral.10',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '[currentColor]',
        position: 'absolute',
        top: '[-2px]',
        left: '[-2px]',
        transition: '[transform 0.3s ease-out]',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      },
    },
    checkboxMark: {
      opacity: 0,
      marginInlineStart: '[calc({spacing.spacing.1} * 0.5)]',
      textStyle: 'typography.body.md',
      '&&:hover': {
        bg: 'transparent',
      },
    },
    label: {
      display: 'inline-block',
      marginInlineEnd: 'spacing.1',
      color: 'colour.neutral.80',
      lineHeight: '1.5rem',
    },
  },
  variants: {
    layout: {
      inline: {
        toggleBase: {
          display: 'inline-flex',
          alignItems: 'center',
        },
      },
      'inline-reverse': {
        toggleBase: {
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
        },
        label: {
          marginInlineStart: 'spacing.1',
          marginInlineEnd: 'spacing.0',
        },
      },
      'inline-between': {
        toggleBase: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
      stack: {
        toggleBase: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '12/12',
        },
        label: {
          display: 'block',
          marginBlockEnd: 'spacing.1',
        },
      },
    },
    hiddenLabel: {
      true: {
        label: {
          srOnly: true,
          display: 'inline-block',
        },
        checkboxMark: {
          marginInlineEnd: 'spacing.1',
        },
      },
    },
    checked: {
      true: {
        toggleButtonContainer: {
          _hover: {
            bg: 'colour.primary.fillHover',
            borderColor: 'colour.primary.fillHover',
          },
        },
        checkboxMark: {
          opacity: 1,
        },
        toggleButton: {
          _after: {
            transform:
              'translateX(calc({sizes.toggle.width} - {sizes.toggle.thumb}))',
            borderColor: '[currentColor]',
          },

          _hover: {
            _after: {
              borderColor: 'colour.primary.fillHover',
            },
          },
        },
      },
      false: {
        toggleButtonContainer: {
          color: 'colour.neutral.70',
        },
      },
    },
  },
  defaultVariants: {
    layout: 'inline',
  },
});

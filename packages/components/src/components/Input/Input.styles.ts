import { sva } from '@/styled-system/css';

export const input = sva({
  slots: [
    'root',
    'wrapper',
    'inline',
    'addon',
    'internal',
    'formControl',
    'action',
  ],
  base: {
    root: {
      contain: 'style',
      display: 'flex',
      alignItems: 'stretch',
      flexGrow: '1',
      margin: 'spacing.0',
      gap: 'spacing.2',
    },
    wrapper: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'style',
      display: 'flex',
      alignItems: 'stretch',
      flexGrow: '1',
      borderRadius: 'radius.system.form',
      backgroundColor: 'colour.neutral.10',
      minHeight: '[calc({sizes.input.height} - 2px)]',
      border: 'input',
      focusable: 'has-input',
    },
    addon: {
      borderRadius: 'radius.system.form',
      minHeight: '[calc({sizes.input.height} - 2px)]',
      color: 'colour.neutral.60',
      lineHeight: '1',
      fontWeight: '300',
      display: 'inline-flex',
      alignItems: 'center',
      py: 'none',
      _empty: {
        display: 'none',
      },
      _first: {
        pl: 'spacing.3',
      },
      _last: {
        px: 'spacing.3',
      },
      '&:not(:empty):has(button)': {
        px: 'none',
      },
    },
    internal: {
      display: 'flex',
      alignItems: 'center',
      '& > *': {
        padding: '[0 {spacing.spacing.3}]',
      },
      _empty: {
        display: 'none',
      },
    },
    formControl: {
      borderWidth: 0,
      borderRadius: 'radius.system.form',
      paddingInline: 'spacing.3',
      paddingBlock: 'spacing.1',
      textStyle: 'typography.body.md',
      color: 'colour.neutral.90',
      display: 'block',
      boxSizing: 'border-box',
      flex: 'auto',
      maxWidth: '[100%]',
      minHeight: '[calc({sizes.input.height} - 2px)]',
      lineHeight: 1,
      bg: 'transparent',

      _placeholder: {
        color: 'colour.neutral.60',
      },

      _disabled: {
        color: 'colour.neutral.70',
        cursor: 'not-allowed',
      },

      '&::file-selector-button': {
        backgroundColor: 'colour.primary.surface',
        color: 'colour.primary.text',
        borderRadius: 'radius.system.form',
        py: 'spacing.2',
        px: 'spacing.2',
        ml: '-spacing.1',
        mr: 'spacing.2',
        cursor: 'pointer',
        _hover: {
          backgroundColor: 'colour.primary.surfaceHover',
        },
      },
    },
    action: {
      border: 'input',
      color: 'colour.neutral.70',
      bg: 'colour.neutral.10',

      _hover: {
        bg: 'colour.neutral.20',
        boxShadow: '{colors.colour.neutral.70} 0px 0px 0px 1px',
      },

      _active: {
        bg: 'colour.neutral.10',
        borderColor: 'colour.neutral.90',
        boxShadow: '{colors.colour.neutral.90} 0px 0px 0px 1px',
      },
    },
  },
  variants: {
    alignRight: {
      true: {
        formControl: {
          textAlign: 'right',
        },
      },
    },
    autoGrow: {
      true: {
        formControl: {
          resize: 'none',
        },
      },
    },
    inline: {
      true: {
        wrapper: {
          display: 'inline-flex',
        },
      },
    },
    isTextarea: {
      true: {
        wrapper: {
          alignItems: 'end',
        },
        formControl: {
          lineHeight: 1.5,
          height: 'auto',
          scrollable: 'y',
        },
      },
    },
    readOnly: {
      true: {
        wrapper: {
          border: '[none]',

          _hover: {
            boxShadow: 'none',
          },
        },
      },
    },
    width: {
      '2': {
        wrapper: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.2',
        },
      },
      '4': {
        wrapper: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.4',
        },
      },
      '6': {
        wrapper: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.6',
        },
      },
      '8': {
        wrapper: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.8',
        },
      },
      '10': {
        wrapper: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.10',
        },
      },
      '12': {
        wrapper: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.12',
        },
      },
      '16': {
        wrapper: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.16',
        },
      },
      '25%': {
        wrapper: {
          width: 'input.25%',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '50%': {
        wrapper: {
          width: 'input.50%',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '75%': {
        wrapper: {
          width: 'input.75%',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '100%': {
        wrapper: {
          width: 'input.100%',
        },
        formControl: {
          width: '[100%]',
        },
      },
    },
    variant: {
      search: {
        wrapper: {
          '--iress-border-color--default': '{colors.colour.neutral.40}',
          '--iress-border-color--hover': '{colors.colour.neutral.40}',
          borderRadius: 'radius.4',
        },
      },
    },
    stretched: {
      true: {
        formControl: {
          height: '[100%]',
        },
      },
    },
  },
  compoundVariants: [
    {
      isTextarea: true,
      stretched: true,
      css: {
        formControl: {
          height: '[100%]',
        },
      },
    },
  ],
  defaultVariants: {},
});

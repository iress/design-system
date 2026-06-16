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
      minHeight: 'input.innerHeight',
      border: 'input',
      focusable: 'has-input',
    },
    addon: {
      borderRadius: 'radius.system.form',
      minHeight: 'input.innerHeight',
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
      '& > :not(.ids-button)': {
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
      color: 'colour.neutral.80',
      display: 'block',
      boxSizing: 'border-box',
      flex: 'auto',
      maxWidth: '12/12',
      minHeight: 'input.innerHeight',
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
        borderColor: 'colour.neutral.80',
        boxShadow: '{colors.colour.neutral.80} 0px 0px 0px 1px',
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
          maxWidth: '3/12',
        },
        formControl: {
          width: '12/12',
        },
      },
      '50%': {
        wrapper: {
          maxWidth: '6/12',
        },
        formControl: {
          width: '12/12',
        },
      },
      '75%': {
        wrapper: {
          maxWidth: '9/12',
        },
        formControl: {
          width: '12/12',
        },
      },
      '100%': {
        wrapper: {
          maxWidth: '12/12',
        },
        formControl: {
          width: '12/12',
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
          height: '12/12',
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
          height: '12/12',
        },
      },
    },
  ],
  defaultVariants: {},
});

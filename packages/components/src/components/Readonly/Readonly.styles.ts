import { sva } from '@/styled-system/css';

export const readonly = sva({
  slots: ['root', 'wrapper', 'addon', 'internal', 'formControl', 'action'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'stretch',
      flexGrow: '1',
      margin: 'spacing.0',
      gap: 'spacing.2',
    },
    wrapper: {
      display: 'flex',
      backgroundColor: 'colour.neutral.10',
      minHeight: 'input.height',
      flexGrow: '1',
      textStyle: 'typography.body.md',
      alignItems: 'center',
      height: 'auto',
      lineHeight: 'inherit',
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
    addon: {
      borderRadius: 'radius.system.form',
      backgroundColor: 'colour.neutral.10',
      minHeight: 'input.height',
      color: 'colour.neutral.70',
      lineHeight: '1',
      fontWeight: '300',
      display: 'inline-flex',
      alignItems: 'center',
      _empty: {
        display: 'none',
      },
      '& > *': {
        px: 'spacing.3',
      },
      _first: {
        '& > *': {
          pl: 'spacing.0',
        },
      },
      _last: {
        '& > *': {
          pr: 'spacing.0',
        },
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
      backgroundColor: 'colour.neutral.10',
      color: 'colour.neutral.90',
      display: 'inline-flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      flex: 'auto',
      maxWidth: '12/12',
      minHeight: 'input.height',
      height: 'auto',
      lineHeight: 'inherit',
      _focus: {
        outline: '[none]',
      },
      _placeholder: {
        color: 'colour.neutral.60',
      },
    },
  },
  variants: {
    inline: {
      true: {
        wrapper: {
          display: 'inline-flex',
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
          width: '3/12',
        },
        formControl: {
          width: '12/12',
        },
      },
      '50%': {
        wrapper: {
          width: '6/12',
        },
        formControl: {
          width: '12/12',
        },
      },
      '75%': {
        wrapper: {
          width: '9/12',
        },
        formControl: {
          width: '12/12',
        },
      },
      '100%': {
        wrapper: {
          width: '12/12',
        },
        formControl: {
          width: '12/12',
        },
      },
    },
    alignRight: {
      true: {
        formControl: {
          justifyContent: 'flex-end',
        },
      },
    },
  },
  defaultVariants: {},
});

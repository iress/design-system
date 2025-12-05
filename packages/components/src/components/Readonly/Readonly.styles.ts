import { sva } from '@/styled-system/css';

export const readonly = sva({
  slots: ['root', 'wrapper', 'addon', 'internal', 'formControl'],
  base: {
    root: {
      display: 'flex',
      backgroundColor: 'colour.neutral.10',
      minHeight: 'input.height',
      margin: '[0]',
      flexGrow: '1',
      textStyle: 'typography.body.md',
      alignItems: 'center',
      height: 'auto',
      lineHeight: 'inherit',
    },
    addon: {
      borderRadius: 'radius.100',
      backgroundColor: 'colour.neutral.10',
      minHeight: 'input.height',
      color: 'colour.neutral.80',
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
      color: 'colour.neutral.80',
      display: 'inline-flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      flex: 'auto',
      maxWidth: '[100%]',
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
        root: {
          display: 'inline-flex',
        },
      },
    },
    width: {
      '2': {
        root: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.2',
        },
      },
      '4': {
        root: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.4',
        },
      },
      '6': {
        root: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.6',
        },
      },
      '8': {
        root: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.8',
        },
      },
      '10': {
        root: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.10',
        },
      },
      '12': {
        root: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.12',
        },
      },
      '16': {
        root: {
          maxWidth: '[fit-content]',
        },
        formControl: {
          width: 'input.16',
        },
      },
      '25perc': {
        root: {
          width: 'input.25perc',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '50perc': {
        root: {
          width: 'input.50perc',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '75perc': {
        root: {
          width: 'input.75perc',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '100perc': {
        root: {
          width: 'input.100perc',
        },
        formControl: {
          width: '[100%]',
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

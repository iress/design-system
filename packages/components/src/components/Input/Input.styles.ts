import { sva } from '@/styled-system/css';

export const input = sva({
  slots: ['root', 'wrapper', 'inline', 'addon', 'internal', 'formControl'],
  base: {
    wrapper: {
      display: 'flex',
      alignItems: 'stretch',
      borderRadius: 'radius.system.form',
      backgroundColor: 'colour.neutral.10',
      minHeight: '[calc({sizes.input.height} - 2px)]',
      margin: '[0]',
      flexGrow: '1',
      border: 'input',
      '&:has(input:focus, textarea:focus)': {
        borderColor: 'colour.primary.fill',
        layerStyle: 'elevation.focus',
      },
    },
    addon: {
      borderRadius: 'radius.100',
      backgroundColor: 'colour.neutral.10',
      minHeight: '[calc({sizes.input.height} - 2px)]',
      color: 'colour.neutral.80',
      lineHeight: '1',
      fontWeight: '300',
      display: 'inline-flex',
      alignItems: 'center',
      py: 'none',
      '&:not(:empty)': {
        px: 'spacing.3',
      },
      _empty: {
        display: 'none',
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
      paddingInline: 'spacing.2',
      paddingBlock: 'spacing.1',
      backgroundColor: 'colour.neutral.10',
      textStyle: 'typography.body.md',
      color: 'colour.neutral.80',
      display: 'block',
      boxSizing: 'border-box',
      flex: 'auto',
      maxWidth: '[100%]',
      minHeight: '[calc({sizes.input.height} - 2px)]',
      lineHeight: 1,
      _focus: {
        outline: '[none]',
      },
      _placeholder: {
        color: 'colour.neutral.60',
      },

      '&::file-selector-button': {
        backgroundColor: 'colour.primary.surface',
        color: 'colour.primary.text',
        borderRadius: 'radius.system.form',
        py: 'spacing.2',
        px: 'spacing.2',
        m: '-spacing.1',
        mr: 'spacing.2',
        cursor: 'pointer',
        _hover: {
          backgroundColor: 'colour.primary.surfaceHover',
        },
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
    inline: {
      true: {
        wrapper: {
          display: 'inline-flex',
        },
      },
    },
    isTextarea: {
      true: {
        formControl: {
          lineHeight: 1.5,
          height: 'auto',
        },
      },
    },
    readOnly: {
      true: {
        wrapper: {
          border: '[none]',
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
      '25perc': {
        wrapper: {
          width: 'input.25perc',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '50perc': {
        wrapper: {
          width: 'input.50perc',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '75perc': {
        wrapper: {
          width: 'input.75perc',
        },
        formControl: {
          width: '[100%]',
        },
      },
      '100perc': {
        wrapper: {
          width: 'input.100perc',
        },
        formControl: {
          width: '[100%]',
        },
      },
    },
  },
  defaultVariants: {},
});

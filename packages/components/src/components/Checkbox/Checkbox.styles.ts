import { sva } from '@/styled-system/css';

export const checkbox = sva({
  slots: [
    'formElement',
    'input',
    'srOnly',
    'root',
    'label',
    'labelSpan',
    'mark',
    'hiddenControl',
    'touch',
  ],
  base: {
    formElement: {},
    root: {
      color: 'colour.primary.fill',
      display: 'flex',
      position: 'relative',
    },
    input: {
      srOnly: true,
    },
    label: {
      position: 'relative',
      lineHeight: '1.5',
      margin: 'spacing.000',
      display: 'inline-flex',
      cursor: 'pointer',
    },
    labelSpan: {},
    mark: {
      color: '[currentColor]',
      marginInlineEnd: 'spacing.200',
      flexShrink: 0,
      _groupFocusWithin: {
        layerStyle: 'elevation.focus',
      },
    },
  },
  variants: {
    hiddenLabel: {
      true: {
        label: {
          display: 'inline-block',
        },
        mark: {
          marginInlineEnd: 'spacing.000',
        },
        labelSpan: {
          srOnly: true,
        },
      },
    },
    hiddenControl: {
      true: {
        label: {
          position: 'relative',
          padding: 'spacing.000',
          width: '[100%]',
          cursor: 'pointer',
          borderRadius: 'radius.system.form',
          borderColor: 'colour.neutral.40',
          borderStyle: 'solid',
          borderWidth: '1px',
          _hover: {
            backgroundColor: 'colour.primary.surfaceHover',
          },
          _groupFocusWithin: {
            layerStyle: 'elevation.focus',
          },
        },
        labelSpan: {
          display: 'block',
        },
        mark: {
          checkmark: false,
        },
      },
    },
    touch: {
      true: {
        label: {
          borderColor: 'colour.neutral.40',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderRadius: 'radius.system.form',
          padding: 'spacing.300',
        },
      },
    },
    checked: {
      true: {
        label: {
          borderColor: '[currentColor]',
        },
      },
    },
  },
  compoundVariants: [
    {
      hiddenControl: true,
      checked: true,
      css: {
        label: {
          topLeftTriangle: true,
        },
        mark: {
          checkmark: true,
        },
      },
    },
  ],
});

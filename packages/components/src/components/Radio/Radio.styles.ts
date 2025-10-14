import { sva } from '@/styled-system/css';

export const radio = sva({
  slots: [
    'root',
    'input',
    'label',
    'radioMark',
    'checkedRadioMark',
    'checkboxMark',
  ],
  base: {
    root: {
      color: 'colour.primary.fill',
      display: 'flex',
      position: 'relative',
      padding: 'spacing.000',
      transition: '[all 0.2s ease-out]',

      '&:has(svg:hover)': {
        color: 'colour.primary.fillHover',
      },
    },
    input: {
      border: '[0px]',
      clip: 'rect(0, 0, 0, 0)',
      height: '[1px]',
      margin: '[-1px]',
      overflow: 'hidden',
      padding: 'spacing.000',
      position: 'absolute',
      width: '[1px]',
    },
    label: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: 'spacing.000',
      border: '[0px solid transparent]',
      borderRadius: 'radius.system.form',
      backgroundColor: '[transparent]',
      position: 'relative',
      lineHeight: '1.5',
      margin: '[0px]',
      cursor: 'pointer',
    },
    radioMark: {
      boxSizing: 'border-box',
      position: 'relative',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'colour.neutral.70',
      backgroundColor: 'colour.neutral.10',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '[calc(1.3 * 1rem)]',
      height: '[calc(1.3 * 1rem)]',
      borderRadius: '[100%]',
      marginInlineEnd: 'spacing.150',
      flexShrink: 0,
      color: '[currentColor]',
      '& circle': {
        fill: '[currentColor]',
        display: 'none',
      },
      _groupFocusWithin: {
        layerStyle: 'elevation.focus',
      },
    },
    checkboxMark: {
      checkmark: false,
    },
  },
  variants: {
    hiddenControl: {
      true: {
        label: {
          display: 'block',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'colour.neutral.40',
          cursor: 'pointer',

          _hover: {
            backgroundColor: 'colour.primary.surfaceHover',
          },
        },
        radioMark: {
          display: 'none',
        },
      },
    },
    touch: {
      true: {
        label: {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'colour.neutral.40',
          borderRadius: 'radius.050',
          padding: 'spacing.400',
        },
      },
    },
    checked: {
      true: {
        label: {
          borderColor: '[currentColor]',
        },
        radioMark: {
          borderColor: '[currentColor]',
          '& circle': {
            fill: '[currentColor]',
            display: 'block',
          },
        },
      },
      false: {
        radioMark: {
          _hover: {
            backgroundColor: 'colour.primary.surfaceHover',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      hiddenControl: true,
      css: {
        input: {
          _checked: {
            '& + label': {
              border: '[none]',
              padding: '[1px]',
              _after: {
                content: '""',
                position: 'absolute',
                inset: '[0]',
                display: 'block',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'colour.primary.fill',
                borderRadius: '[inherit]',
                pointerEvents: 'none',
              },
            },
          },
          _focus: {
            '& + label': {
              _after: {
                content: '""',
                position: 'absolute',
                inset: '[0]',
                display: 'block',
                borderRadius: '[inherit]',
                pointerEvents: 'none',
                layerStyle: 'elevation.focus',
              },
            },
          },
        },
      },
    },
    {
      hiddenControl: false,
      css: {
        input: {
          _checked: {
            '& ~ div svg circle': {
              display: 'revert',
            },
          },
        },
      },
    },
    {
      touch: true,
      css: {
        input: {
          _checked: {
            '& + label': {
              borderColor: 'colour.primary.fill',
            },
          },
        },
      },
    },
    {
      hiddenControl: true,
      checked: true,
      css: {
        label: {
          topLeftTriangle: true,
        },
        checkboxMark: {
          checkmark: true,
        },
      },
    },
  ],
});

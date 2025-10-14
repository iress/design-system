import { sva } from '@/styled-system/css';

export const field = sva({
  slots: [
    'root',
    'hint',
    'label',
    'footer',
    'supplementary',
    'element',
    'labelContainer',
    'fieldContainer',
  ],
  base: {
    root: {
      display: 'block',
      maxWidth: '[100%]',
      position: 'relative',
    },
    element: {
      position: 'relative',
    },
    hint: {
      color: 'colour.neutral.70',
      mb: 'spacing.100',
      textStyle: 'typography.body.sm',
    },
    footer: {
      textStyle: 'typography.body.sm.regular',
      mt: 'spacing.100',
    },
    supplementary: {
      fontSize: 'inherit',
    },
    label: {
      mb: 'spacing.100',
    },
    labelContainer: {},
    fieldContainer: {},
  },
  variants: {
    horizontal: {
      true: {
        root: {
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto auto',
          gridTemplateAreas: '"label field" ". footer"',
          columnGap: 'spacing.200',
          alignItems: 'center',
        },
        labelContainer: {
          gridArea: 'label',
          alignSelf: 'center',
        },
        fieldContainer: {
          gridArea: 'field',
        },
        footer: {
          gridArea: 'footer',
          mt: 'spacing.100',
        },
        label: {
          mb: 'none',
        },
      },
    },
    hasError: {
      true: {
        root: {
          _nestedFormElements: {
            borderColor: 'colour.system.danger.fill',
          },
        },
      },
    },
    hasHint: {
      true: {
        label: {
          mb: 'spacing.000',
        },
      },
    },
    hiddenLabel: {
      true: {
        label: {
          mb: 'none',
        },
      },
    },
    multipleFields: {
      true: {
        supplementary: {
          position: 'relative',

          _after: {
            content: '""',
            position: 'absolute',
            left: '[0]',
            right: '[0]',
            bottom: '[100%]',
            borderBottom: 'divider',
          },
        },
      },
    },
    removeErrorMargin: {
      true: {
        root: {
          mb: 'none',
        },
        footer: {
          position: 'static',
        },
      },
      false: {
        root: {
          mb: 'field.footer',
        },
        footer: {
          position: 'absolute',
          left: 'spacing.000',
          right: 'spacing.000',
          top: '[100%]',
          mt: 'spacing.100',
        },
      },
    },
  },
});

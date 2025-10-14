import { sva } from '@/styled-system/css';

export const fieldGroup = sva({
  slots: ['root', 'hint', 'legend', 'fields'],
  base: {
    root: {
      display: 'block',
      maxWidth: '[100%]',
      mb: 'field.footer',
      position: 'relative',
      border: '[none]',
      margin: 'spacing.000',
      padding: 'spacing.000',
    },
    hint: {
      color: 'colour.neutral.70',
      textStyle: 'typography.body.sm',
    },
    legend: {
      mb: 'spacing.100',
      px: 'spacing.000',
      float: 'start',

      ['& + *']: {
        clear: 'left',
      },
    },
    fields: {
      display: 'flex',
      flexDirection: 'column',
      _nestedFormLabels: {
        color: 'colour.neutral.70',
        mb: 'spacing.050',
      },
    },
  },
  variants: {
    hasError: {
      true: {
        root: {
          _nestedFormElements: {
            borderColor: 'colour.system.danger.fill',
          },
        },
      },
    },
    hiddenLabel: {
      true: {
        legend: {
          mb: 'none',
        },
      },
    },
    inline: {
      true: {
        fields: {
          alignItems: 'flex-end',
          flexDirection: 'row',
          columnGap: 'sm',

          '& > *': {
            flexGrow: '1',
          },

          _directNestedFormElements: {
            mb: 'field.footer',
          },

          _directNestedSizedElements: {
            flexGrow: '0',
            alignSelf: 'flex-end',
          },
        },
      },
    },
    join: {
      true: {
        fields: {
          alignItems: 'flex-end',
          flexDirection: 'row',
          columnGap: 'none',

          '& > *': {
            flexGrow: '1',
          },

          _directNestedFormElements: {
            mb: 'field.footer',
          },

          _directNestedSizedElements: {
            flexGrow: '0',
            alignSelf: 'flex-end',
          },

          _nestedFieldsExceptFirst: {
            borderTopLeftRadius: 'radius.000',
            borderBottomLeftRadius: 'radius.000',

            _before: {
              borderTopLeftRadius: 'radius.000',
              borderBottomLeftRadius: 'radius.000',
            },

            _after: {
              borderTopLeftRadius: 'radius.000',
              borderBottomLeftRadius: 'radius.000',
            },
          },

          _nestedFieldsExceptLast: {
            borderTopRightRadius: 'radius.000',
            borderBottomRightRadius: 'radius.000',
            borderRightWidth: '[0px]',

            _before: {
              borderTopRightRadius: 'radius.000',
              borderBottomRightRadius: 'radius.000',
            },

            _after: {
              borderTopRightRadius: 'radius.000',
              borderBottomRightRadius: 'radius.000',
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    inline: false,
    join: false,
  },
});

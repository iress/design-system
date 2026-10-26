import { sva } from '@/styled-system/css';

export const fieldGroup = sva({
  slots: ['root', 'hint', 'legend', 'fields'],
  base: {
    root: {
      display: 'block',
      maxWidth: '12/12',
      position: 'relative',
      border: '[none]',
      margin: 'spacing.0',
      padding: 'spacing.0',
    },
    hint: {
      color: 'colour.neutral.70',
      textStyle: 'typography.body.sm',
      mt: 'spacing.1',
    },
    legend: {
      mb: 'spacing.2',
      px: 'spacing.0',
      float: 'start',

      ['& + *']: {
        clear: 'left',
      },
    },
    fields: {
      display: 'flex',
      flexDirection: 'column',
      '& > .ids-radio-group:first-child, & > .ids-checkbox-group:first-child, & > .ids-checkbox:first-child':
        {
          mt: 'spacing.1',
        },
      _nestedFormLabels: {
        color: 'colour.neutral.70',
        mb: 'spacing.1',
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
    hasHint: {
      true: {
        legend: {
          mb: 'spacing.1',
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
            borderTopLeftRadius: 'radius.0',
            borderBottomLeftRadius: 'radius.0',

            _before: {
              borderTopLeftRadius: 'radius.0',
              borderBottomLeftRadius: 'radius.0',
            },

            _after: {
              borderTopLeftRadius: 'radius.0',
              borderBottomLeftRadius: 'radius.0',
            },
          },

          _nestedFieldsExceptLast: {
            borderTopRightRadius: 'radius.0',
            borderBottomRightRadius: 'radius.0',
            borderRightWidth: '[0px]',

            _before: {
              borderTopRightRadius: 'radius.0',
              borderBottomRightRadius: 'radius.0',
            },

            _after: {
              borderTopRightRadius: 'radius.0',
              borderBottomRightRadius: 'radius.0',
            },
          },
        },
      },
    },
    removeErrorMargin: {
      true: {
        root: {
          mb: 'none',
        },
      },
      false: {
        root: {
          mb: 'field.footer',
        },
      },
    },
  },
  defaultVariants: {
    inline: false,
    join: false,
    removeErrorMargin: false,
  },
});

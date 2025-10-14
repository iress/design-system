import { defineSlotRecipe } from '@pandacss/dev';

export const tableRecipe = defineSlotRecipe({
  className: 'table',
  slots: [
    'root',
    'table',
    'caption',
    'sortHeader',
    'sortIcon',
    'activator',
    'rowGroupHeader',
  ],
  base: {
    root: {
      display: 'block',
      overflow: 'auto',
    },
    table: {
      textStyle: 'typography.body.md',
      bg: 'colour.neutral.10',
      color: 'colour.neutral.80',
      borderRadius: 'radius.system.layout',
      borderSpacing: 'spacing.000',
      minWidth: '[100%]',
      borderCollapse: 'collapse',
      margin: 'spacing.000',

      '& th, & td': {
        paddingBlock: 'spacing.350',
        paddingInline: 'spacing.350',
        border: 'table',
        borderLeftWidth: '0px',
        borderRightWidth: '0px',
      },

      '& th': {
        textAlign: 'start',
        textStyle: 'typography.regular.md.strong',
      },

      '& thead th': {
        textStyle: 'typography.heading.5',
      },

      '& thead tr:first-child th, & thead tr:first-child td, &:not(:has(thead)) tbody tr:first-child th, &:not(:has(thead)) tbody tr:first-child td':
        {
          borderTopWidth: '0px',
        },

      '& tfoot tr:last-child th, & tfoot tr:last-child td, &:not(:has(tfoot)) tbody tr:last-child th:not([scope="rowgroup"]), &:not(:has(tfoot)) tbody tr:last-child td':
        {
          borderBottomWidth: '0px',
        },
    },
    caption: {
      textAlign: 'center',
      textStyle: 'typography.heading.4',
      paddingBlockEnd: 'spacing.200',
    },
    sortHeader: {
      all: 'unset',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      cursor: 'pointer',
    },
    sortIcon: {
      color: 'colour.neutral.70',
      marginInlineStart: 'spacing.200',
    },
    activator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      width: '[100%]',
      cursor: 'pointer',
      tableChevron: true,
      transition: 'all',
      _after: {
        alignSelf: 'flex-end',
      },
      _hover: {
        color: 'colour.primary.text',
      },
    },
    rowGroupHeader: {
      textStyle: 'typography.heading.4',
      cursor: 'pointer',
      borderBlockEnd: 'divider',
      transition: 'all',

      _hover: {
        borderBlockEnd: 'hover',
      },
    },
  },
  variants: {
    alternate: {
      true: {
        table: {
          '& tbody tr': {
            _odd: {
              bg: 'colour.neutral.20',
            },
            _even: {
              bg: 'colour.neutral.10',
            },
          },
        },
      },
    },
    compact: {
      true: {
        table: {
          textStyle: 'typography.body.sm',
          '& th, & td': {
            paddingBlock: 'spacing.100',
          },
          '& th': {
            textStyle: 'typography.body.sm.strong',
          },
          '& thead th': {
            textStyle: 'typography.body.sm.strong',
          },
        },
        caption: {
          textStyle: 'typography.body.md',
        },
      },
    },
    hover: {
      true: {
        table: {
          '& tbody tr': {
            _hover: {
              bg: 'colour.primary.surfaceHover',
            },
          },
        },
      },
    },
    removeRowBorders: {
      true: {
        table: {
          '& tbody th, & tbody td': {
            borderBlockWidth: '0px',
          },
        },
      },
    },
    sortButtonNoWrap: {
      true: {
        sortHeader: {
          whiteSpace: 'nowrap',
        },
      },
    },
    tableBodyOpen: {
      true: {
        activator: {
          tableChevron: false,
        },
      },
    },
    hiddenCaption: {
      true: {
        caption: {
          srOnly: true,
        },
      },
    },
  },
  defaultVariants: {
    compact: false,
    hover: false,
    sortButtonNoWrap: false,
    tableBodyOpen: false,
  },
  staticCss: ['*'],
});

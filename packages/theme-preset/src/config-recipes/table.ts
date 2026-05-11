import { cssVars } from '@iress-oss/ids-tokens';
import { defineSlotRecipe } from '@pandacss/dev';

export const tableRecipe = defineSlotRecipe({
  className: 'table',
  slots: [
    'root',
    'table',
    'caption',
    'sortHeader',
    'sortIcon',
    'sortIconInactive',
    'activator',
    'rowGroupHeader',
    'headerContent',
    'filterButton',
    'filterIndicator',
  ],
  base: {
    root: {
      display: 'block',
      scrollable: 'true',
    },
    table: {
      textStyle: 'typography.body.md',
      bg: 'colour.neutral.10',
      color: 'colour.neutral.90',
      borderRadius: 'radius.system.layout',
      borderSpacing: 'spacing.0',
      minWidth: '12/12',
      borderCollapse: 'collapse',
      margin: 'spacing.0',

      '& th, & td': {
        paddingBlock: 'spacing.4',
        paddingInline: 'spacing.4',
        border: 'table',
        borderLeftWidth: '0px',
        borderRightWidth: '0px',
      },

      '& th': {
        textAlign: 'start',
        textStyle: 'typography.body.md.strong',
      },

      '& thead th': {
        textStyle: 'typography.heading.5',
        paddingBlock: 'spacing.2',
        focusable: 'within:inset',
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
      textStyle: 'typography.heading.3',
      paddingBlockEnd: 'spacing.2',
    },
    sortHeader: {
      all: 'unset',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      cursor: 'pointer',
    },
    sortIcon: {
      fill: 'colour.neutral.90',
      width: '[1.31em]',
      height: '[1.31em]',
      display: 'inline-block',
      ml: 'spacing.1',

      '& path': {
        transition: 'fill 0.2s',
      },
    },
    sortIconInactive: {
      fill: 'colour.neutral.60',
    },
    activator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      width: '12/12',
      cursor: 'pointer',
      transition: 'all',
      _hover: {
        color: 'colour.primary.text',
      },
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: 'spacing.1',
    },
    filterIndicator: {
      position: 'absolute',
      top: '[0px]',
      right: '[.05em]',
      width: '[8px]',
      height: '[8px]',
      borderRadius: '50%',
      bg: 'colour.accent.fill',
      border:
        '[1.5px solid var(--iress-filter-button-bg, {colors.colour.primary.surfaceHover})]',
      animationName: 'filterIndicatorBounceIn',
      animationDuration: '0.4s',
      animationTimingFunction: 'ease-out',
      animationFillMode: 'both',
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
          border: 'table',
          borderRadius: 'radius.system.layout',
          borderCollapse: 'separate',

          '& th, & td': {
            padding: 'spacing.2',
            borderTopWidth: '0px',
          },
          '& thead th, & thead td': {
            bg: 'colour.primary.surface',
          },
          '& th, & thead th': {
            textStyle: 'typography.body.md.medium',
          },
          '& > thead:first-of-type > :first-child > :first-child': {
            borderTopLeftRadius: cssVars.radius.system._layout.topLeft,
          },
          '& > thead:first-of-type > :first-child > :last-child': {
            borderTopRightRadius: cssVars.radius.system._layout.topRight,
          },
          '& > tbody:last-of-type > :last-child > :first-child': {
            borderBottomLeftRadius: cssVars.radius.system._layout.bottomLeft,
          },
          '& > tbody:last-of-type > :last-child > :last-child': {
            borderBottomRightRadius: cssVars.radius.system._layout.bottomRight,
          },
        },
        caption: {
          paddingBlock: 'spacing.5',
          textAlign: 'left',
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
    virtualise: {
      true: {
        table: {
          tableLayout: 'fixed',

          '& thead': {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            bg: 'colour.neutral.10',
          },
        },
        root: {
          '&[data-scrolled] table > thead:first-of-type > :first-child > :first-child':
            {
              borderTopLeftRadius: '0',
            },
          '&[data-scrolled] table > thead:first-of-type > :first-child > :last-child':
            {
              borderTopRightRadius: '0',
            },
          '&[data-scrolled] table > thead:first-of-type > :first-child > th, &[data-scrolled] table > thead:first-of-type > :first-child > td':
            {
              borderTopWidth: '1px',
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
      true: {},
    },
    hiddenCaption: {
      true: {
        caption: {
          srOnly: true,
        },
      },
    },
    hasFilterButton: {
      true: {
        filterButton: {
          color: 'colour.neutral.60',
          textStyle: 'typography.body.sm.medium',
          p: 'spacing.1',
          aspectRatio: '1',
          minWidth: '[0]',
          minHeight: '[0]',
          position: 'relative',
          mr: 'spacing.1',

          '&:hover:not([aria-expanded="true"])': {
            '--iress-filter-button-bg': '{colors.colour.neutral.20}',
          },
        },
      },
    },
    hasActiveFilter: {
      true: {
        filterButton: {
          color: 'colour.primary.fill',
          bg: 'colour.primary.surfaceHover',

          '&[aria-expanded="true"]': {
            '--iress-filter-button-bg': '{colors.colour.primary.surface}',
          },
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

import { cva } from '@/styled-system/css';

export const tab = cva({
  base: {
    alignItems: 'center',
    borderBottom: '[2px solid transparent]',
    cursor: 'pointer',
    display: 'inline-flex',
    minHeight: 'input.height',
    position: 'relative',
    py: 'spacing.3',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    transition: 'all',
    whiteSpace: 'nowrap',
    width: '[auto]',
    borderRadius: 'radius.system.layout',
    borderBottomRadius: 'none',
    focusable: 'inset',

    _hover: {
      bg: 'colour.neutral.20',
    },

    _moreContrast: {
      outline: '[inset 4px transparent]',
    },
  },
  variants: {
    active: {
      true: {
        borderBottomColor: 'colour.neutral.90',
        backgroundColor: 'colour.neutral.30',
        color: 'colour.neutral.90',
      },
    },
    insideTabSet: {
      true: {
        borderBottomWidth: '0px',
        backgroundColor: 'transparent',

        _hover: {
          bg: '[none]',
        },
      },
    },
    tabSetType: {
      primary: {
        textStyle: 'typography.body.md.medium',
        px: 'spacing.4',
      },
      secondary: {
        textStyle: 'typography.body.sm.medium',
        px: 'spacing.3',
      },
    },
  },
  defaultVariants: {
    tabSetType: 'primary',
  },
});

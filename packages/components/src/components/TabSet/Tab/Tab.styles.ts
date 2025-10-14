import { cva } from '@/styled-system/css';

export const tab = cva({
  base: {
    alignItems: 'center',
    borderBottom: '[2px solid transparent]',
    cursor: 'pointer',
    display: 'inline-flex',
    minHeight: 'input.height',
    position: 'relative',
    px: 'spacing.250',
    py: 'spacing.300',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    textStyle: 'typography.body.md',
    transition: 'all',
    whiteSpace: 'nowrap',
    width: '[auto]',

    _focusVisible: {
      layerStyle: 'elevation.focus',
      outline: '[none]',
    },

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
        borderBottomColor: 'colour.primary.text',
        color: 'colour.primary.text',
        textStyle: 'typography.body.md.strong',
      },
    },
    insideTabSet: {
      true: {
        borderBottomWidth: '0px',

        _hover: {
          bg: '[none]',
        },
      },
    },
  },
});

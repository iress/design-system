import { sva } from '@/styled-system/css';

export const checkboxMark = sva({
  slots: ['root', 'indeterminateMark', 'checkedMark'],
  base: {
    root: {
      display: 'inline-flex',
      position: 'relative',
      width: 'mark.size',
      minWidth: 'mark.size',
      height: 'mark.size',
      border: 'input',
      borderRadius: 'radius.system.form',
      bg: 'colour.neutral.10',
      transitionProperty: '[all]',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-out',
      color: 'colour.primary.fill',
      _hover: {
        bg: 'colour.primary.surfaceHover',
      },
    },
    indeterminateMark: {
      stroke: 'colour.primary.onFill',
      fill: '[transparent]',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      display: 'none',
    },
    checkedMark: {
      stroke: 'colour.primary.onFill',
      fill: '[transparent]',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      display: 'none',
    },
  },
  variants: {
    indeterminate: {
      true: {
        root: {
          bg: '[currentColor]',
          borderColor: '[currentColor]',

          _hover: {
            borderColor: 'colour.primary.fillHover',
            bg: 'colour.primary.fillHover',
            stroke: 'colour.primary.onFill',
          },
        },
        indeterminateMark: {
          display: 'revert',
        },
      },
    },
    checked: {
      true: {
        root: {
          bg: '[currentColor]',
          borderColor: '[currentColor]',

          _hover: {
            borderColor: 'colour.primary.fillHover',
            bg: 'colour.primary.fillHover',
            stroke: 'colour.primary.onFill',
          },
        },
        checkedMark: {
          display: 'revert',
        },
      },
    },
    size: {
      sm: {
        root: {
          width: '[calc(1.25 * {sizes.typography.base})]',
          height: '[calc(1.25 * {sizes.typography.base})]',
        },
      },
    },
  },
});

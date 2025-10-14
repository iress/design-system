import { cva } from '@/styled-system/css';

export const skeleton = cva({
  base: {
    backgroundColor: 'colour.neutral.30',
    borderRadius: 'radius.025',
    _motionReduce: {
      animation: 'none',
    },
    _moreContrast: {
      outline: '[1px solid transparent]',
    },
    layerStyle: 'skeleton',
    animationStyle: 'skeleton-loading',
  },
  variants: {
    mode: {
      rect: {
        width: '[100%]',
        height: '[100px]',
      },
      circle: {
        borderRadius: '[50%]',
        width: '[100px]',
        height: '[100px]',
      },
      text: {
        width: '[100%]',
        height: '[spacing.600]',
      },
    },
  },
  defaultVariants: {},
});

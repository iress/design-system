import { cva } from '@/styled-system/css';

export const toast = cva({
  base: {
    position: 'relative',
    zIndex: '500',
    transition: '[all 0.3s ease-in-out]',
    layerStyle: 'dropdown',
    _motionReduce: {
      transform: 'none',
      transition: '[opacity 0.3s ease-in-out]',
      visibility: 'hidden',
    },
  },
  variants: {
    animation: {
      'start-x': {
        insetInlineStart: '[-100%]',
      },
      'end-x': {
        insetInlineEnd: '[-100%]',
      },
      'start-y': {
        transform: '[translateY(-100%)]',
      },
      'end-y': {
        transform: '[translateY(100%)]',
      },
      fade: {
        opacity: '0',
      },
    },
    transitionState: {
      initial: {
        opacity: '0',
      },
      open: {
        opacity: '1',
        _motionReduce: {
          visibility: 'visible',
        },
      },
      closed: {
        opacity: '0',
      },
      unmounted: {
        display: 'none',
      },
    },
  },
  compoundVariants: [
    {
      animation: 'start-x',
      transitionState: 'open',
      css: {
        insetInlineStart: '[0%]',
      },
    },
    {
      animation: 'end-x',
      transitionState: 'open',
      css: {
        insetInlineEnd: '[0%]',
      },
    },
    {
      animation: ['start-y', 'end-y'],
      transitionState: 'open',
      css: {
        transform: '[translateY(0%)]',
      },
    },
    {
      animation: 'fade',
      transitionState: 'open',
      css: {
        opacity: '1',
      },
    },
  ],
});

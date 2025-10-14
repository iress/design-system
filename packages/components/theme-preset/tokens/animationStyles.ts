import { defineAnimationStyles } from '@pandacss/dev';
import { type keyframes } from './keyframes';

type AnimationName = keyof typeof keyframes;

export const animationStyles = defineAnimationStyles({
  'field-footer': {
    value: {
      animationName: 'fieldFooter' as AnimationName,
      animationDuration: '0.5s',
      animationTimingFunction: 'ease-in-out',
      animationFillMode: 'forwards',
    },
  },
  'icon-spin-half': {
    value: {
      animationName: 'iconRotation' as AnimationName,
      animationDuration: '0.5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
  },
  'icon-spin-1': {
    value: {
      animationName: 'iconRotation' as AnimationName,
      animationDuration: '1s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
  },
  'icon-spin-2': {
    value: {
      animationName: 'iconRotation' as AnimationName,
      animationDuration: '2s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
  },
  'icon-spin-3': {
    value: {
      animationName: 'iconRotation' as AnimationName,
      animationDuration: '3s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
  },
  'loading-fade-next': {
    value: {
      animationName: 'loadingFadeNext' as AnimationName,
      animationDuration: '0.6s',
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
    },
  },
  'loading-slide-next': {
    value: {
      animationName: 'loadingSlideNext' as AnimationName,
      animationDuration: '0.5s',
      animationTimingFunction: 'ease-in-out',
      animationFillMode: 'forwards',
    },
  },
  'skeleton-loading': {
    value: {
      animationName: 'skeletonLoading' as AnimationName,
      animationDuration: '2s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    },
  },
  'toggle-active': {
    value: {
      animationName: 'toggleActive' as AnimationName,
      animationDuration: '0.3s',
      animationTimingFunction: 'ease-in-out',
      animationFillMode: 'forwards',
    },
  },
});

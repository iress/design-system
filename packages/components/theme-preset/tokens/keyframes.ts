import { cssVars } from '@iress-oss/ids-tokens';
import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  fieldFooter: {
    '0%': {
      display: 'none',
      opacity: 0,
      transform: `translateY(calc(${cssVars.spacing[2]} * -1))`,
    },
    '100%': { display: 'block', opacity: 1, transform: 'translateY(0)' },
  },
  iconRotation: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(359deg)' },
  },
  loadingDots: {
    to: { clipPath: 'inset(0 -34% 0 0)' },
  },
  loadingFadeNext: {
    from: { opacity: 0, gridTemplateRows: '0fr' },
    to: { opacity: 1, gridTemplateRows: '1fr' },
  },
  loadingSlideNext: {
    from: { opacity: 0, transform: 'translateX(2.5em)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  loadingItemFill: {
    '0%': { boxShadow: 'inset 0px 0px 0px currentColor' },
    '100%': { boxShadow: 'inset 0px 0px 0px 30px currentColor' },
  },
  loadingItemScale: {
    '0%, 100%': { transform: 'none' },
    '50%': { transform: 'scale3d(1.1, 1.1, 1)' },
  },
  loadingItemStroke: {
    '100%': { strokeDashoffset: 0 },
  },
  skeletonLoading: {
    '0%': { backgroundPositionX: '0' },
    '40%': { backgroundPositionX: '-200%' },
    '100%': { backgroundPositionX: '-200%' },
  },
  toggleActive: {
    '0%': { opacity: 0, transform: 'scale(1)' },
    '40%': { opacity: 1, transform: 'scaleX(1.25) scaleY(1.5)' },
    '99%': { opacity: 0, transform: 'scaleX(1.5) scaleY(1.75)' },
    '100%': { opacity: 0, transform: 'scale(1)' },
  },
});

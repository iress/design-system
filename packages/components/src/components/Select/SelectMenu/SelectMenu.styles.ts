import { sva } from '@/styled-system/css';

export const selectMenu = sva({
  slots: ['root'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style paint',
      width: '[100%]',
    },
  },
  variants: {},
  defaultVariants: {},
});

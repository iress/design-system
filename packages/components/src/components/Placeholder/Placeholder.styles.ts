import { sva } from '@/styled-system/css';

export const placeholder = sva({
  slots: ['root', 'svg', 'line'],
  base: {
    root: {
      alignItems: 'center',
      bg: 'colour.neutral.20',
      border: 'placeholder',
      borderRadius: 'radius.system.layout',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      zIndex: '000',
    },
    svg: {
      position: 'absolute',
      width: '[100%]',
      height: '[100%]',
      zIndex: '[-1]',
    },
    line: {
      strokeWidth: '1.5px',
      stroke: 'colour.neutral.30',
      strokeOpacity: '0.5',
    },
  },
});

import { sva } from '@/styled-system/css';

export const placeholder = sva({
  slots: ['root', 'svg', 'line', 'heading'],
  base: {
    root: {
      alignItems: 'center',
      flexDirection: 'column',
      bg: 'colour.data.subtle.50',
      color: 'colour.data.bold.50',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      zIndex: '000',
    },
    svg: {
      position: 'absolute',
      width: '12/12',
      height: '12/12',
      zIndex: '[-1]',
    },
    line: {
      display: 'none',
      strokeWidth: '0.5px',
      stroke: 'colour.primary.fill',
      strokeOpacity: '0.1',
    },
    heading: {
      color: '[inherit]',
    },
  },
});

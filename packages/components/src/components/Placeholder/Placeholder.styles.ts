import { sva } from '@/styled-system/css';

export const placeholder = sva({
  slots: ['root', 'svg', 'line'],
  base: {
    root: {
      alignItems: 'center',
      flexDirection: 'column',
      bg: 'colour.primary.surface',
      color: 'colour.primary.text',
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
      display: 'none',
      strokeWidth: '0.5px',
      stroke: 'colour.primary.fill',
      strokeOpacity: '0.1',
    },
  },
});

import { cva } from '@/styled-system/css';

export const icon = cva({
  base: {
    // Ensure icon spans have consistent sizing for SVG rendering
    display: 'inline-block',
    width: '[1em]',
    height: '[1em]',
    verticalAlign: 'middle',

    // SVG should fill the container
    '& svg': {
      width: '12/12',
      height: '12/12',
      display: 'block',
      shapeRendering: 'geometricPrecision',
    },
  },
  variants: {
    type: {
      fontawesome: {},
      material: {
        // Material symbols use SVG rendering, base styles handle sizing
        scale: '[1.5]',
      },
    },
    flip: {
      horizontal: {
        transform: 'scaleX(-1)',
      },
      vertical: {
        transform: 'scaleY(-1)',
      },
      both: {
        transform: 'scale(-1)',
      },
    },
    loading: {
      true: {
        visibility: 'hidden',
      },
    },
    rotate: {
      90: {
        transform: 'rotate(90deg)',
      },
      180: {
        transform: 'rotate(180deg)',
      },
      270: {
        transform: 'rotate(270deg)',
      },
    },
    spin: {
      half: {
        animationStyle: 'icon-spin-half',
      },
      1: {
        animationStyle: 'icon-spin-1',
      },
      2: {
        animationStyle: 'icon-spin-2',
      },
      3: {
        animationStyle: 'icon-spin-3',
      },
    },
  },
});

import { cva } from '@/styled-system/css';
import { MATERIAL_SYMBOLS } from './Icon.constants';

export const icon = cva({
  base: {},
  variants: {
    type: {
      fontawesome: {},
      material: {
        fontFamily: 'Material Symbols Rounded',
        textStyle: 'inherit',
        verticalAlign: 'middle',
        fontVariationSettings: `'FILL' 0, 'wght' ${MATERIAL_SYMBOLS.weight}, 'GRAD' ${MATERIAL_SYMBOLS.grade}, 'opsz' ${MATERIAL_SYMBOLS.opticalSize}`,
        scale: '[1.5]',
        fontFeatureSettings: 'liga',
      },
    },
    filled: {
      true: {
        fontVariationSettings: `'FILL' 1, 'wght' ${MATERIAL_SYMBOLS.weight}, 'GRAD' ${MATERIAL_SYMBOLS.grade}, 'opsz' ${MATERIAL_SYMBOLS.opticalSize}`,
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
        width: '[1em]',
        height: '[1em]',
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
  compoundVariants: [
    {
      type: 'material',
      filled: true,
      css: {
        fontVariationSettings: `'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 36`,
      },
    },
  ],
});

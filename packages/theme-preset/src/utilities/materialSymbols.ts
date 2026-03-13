import { MATERIAL_SYMBOLS } from '../constants';
import { defineUtility } from '@pandacss/dev';

const baseStyles = {
  fontFamily: MATERIAL_SYMBOLS.family,
  fontWeight: MATERIAL_SYMBOLS.weight,
  verticalAlign: 'middle',
  fontFeatureSettings: 'liga',
  display: 'inline-block',
};

export const materialSymbols = defineUtility({
  className: 'ids_ms',
  values: ['true', 'filled'],
  transform: (value) => {
    if (value === 'filled') {
      return {
        ...baseStyles,
        fontVariationSettings: `'FILL' 1, 'wght' ${MATERIAL_SYMBOLS.weight}, 'GRAD' ${MATERIAL_SYMBOLS.grade}, 'opsz' ${MATERIAL_SYMBOLS.opticalSize}`,
      };
    }

    return {
      ...baseStyles,
      fontVariationSettings: `'FILL' 0, 'wght' ${MATERIAL_SYMBOLS.weight}, 'GRAD' ${MATERIAL_SYMBOLS.grade}, 'opsz' ${MATERIAL_SYMBOLS.opticalSize}`,
    };
  },
});

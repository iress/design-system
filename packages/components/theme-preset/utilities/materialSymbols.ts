import { MATERIAL_SYMBOLS } from '../../src/components/Icon/Icon.constants';
import { defineUtility } from '@pandacss/dev';

export const materialSymbols = defineUtility({
  className: 'ids_ms',
  values: ['true', 'filled'],
  transform: (value) => {
    if (value === 'filled') {
      return {
        fontVariationSettings: `'FILL' 1, 'wght' ${MATERIAL_SYMBOLS.weight}, 'GRAD' ${MATERIAL_SYMBOLS.grade}, 'opsz' ${MATERIAL_SYMBOLS.opticalSize}`,
      };
    }

    return {
      fontVariationSettings: `'FILL' 0, 'wght' ${MATERIAL_SYMBOLS.weight}, 'GRAD' ${MATERIAL_SYMBOLS.grade}, 'opsz' ${MATERIAL_SYMBOLS.opticalSize}`,
    };
  },
});

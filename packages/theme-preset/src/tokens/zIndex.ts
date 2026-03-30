import { Z_INDEX, Z_INDEX_OFFSET_VAR } from '../constants';

export const zIndex = {
  '000': {
    value: `calc(var(${Z_INDEX_OFFSET_VAR}, 0) + ${Z_INDEX.DEFAULT})`,
  },
  '100': {
    value: `calc(var(${Z_INDEX_OFFSET_VAR}, 0) + ${Z_INDEX.NAVBAR})`,
  },
  '200': {
    value: `calc(var(${Z_INDEX_OFFSET_VAR}, 0) + ${Z_INDEX.POPOVER})`,
  },
  '300': {
    value: `calc(var(${Z_INDEX_OFFSET_VAR}, 0) + ${Z_INDEX.SLIDEOUT})`,
  },
  '400': {
    value: `calc(var(${Z_INDEX_OFFSET_VAR}, 0) + ${Z_INDEX.MODAL})`,
  },
  '500': {
    value: `calc(var(${Z_INDEX_OFFSET_VAR}, 0) + ${Z_INDEX.TOAST})`,
  },
  '600': {
    value: `calc(var(${Z_INDEX_OFFSET_VAR}, 0) + ${Z_INDEX.TOOLTIP})`,
  },
};

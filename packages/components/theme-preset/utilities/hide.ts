import { defineUtility } from '@pandacss/dev';

export const hide = defineUtility({
  className: 'hide',
  values: { type: 'boolean' },
  transform: (value) => {
    return {
      display: value === true ? 'none' : 'unset',
    };
  },
});

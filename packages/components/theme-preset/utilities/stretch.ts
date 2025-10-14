import { defineUtility } from '@pandacss/dev';

export const stretch = defineUtility({
  className: 'stretch',
  values: { type: 'boolean' },
  transform: (value) => {
    if (!value) return {};

    return {
      alignSelf: 'stretch',
      flex: 1,
      height: '100%',
    };
  },
});

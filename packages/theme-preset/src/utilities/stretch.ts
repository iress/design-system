import { defineUtility } from '@pandacss/dev';

export const stretch = defineUtility({
  className: 'stretch',
  values: { type: 'boolean' },
  transform: (value: boolean) => {
    if (!value) return {};

    return {
      alignSelf: 'stretch',
      flex: 1,
      height: '100%',
    };
  },
});

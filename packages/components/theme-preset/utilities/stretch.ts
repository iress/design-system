import { defineUtility } from '@pandacss/dev';

export const stretch = defineUtility({
  className: 'stretch',
  values: 'any',
  transform: (value) => {
    if (!value) return {};

    // If value is exactly boolean true, include height
    if (value === true) {
      return {
        alignSelf: 'stretch',
        flex: 1,
        height: '100%',
      };
    }

    // For numeric or string values (like 1), exclude height
    return {
      alignSelf: 'stretch',
      flex: 1,
    };
  },
});

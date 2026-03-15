import { defineUtility } from '@pandacss/dev';

export const noGutter = defineUtility({
  className: 'noGutter',
  values: { type: 'boolean' },
  transform: (value) => {
    if (!value) return {};

    return {
      '& > :last-child': {
        marginBlockEnd: '0px',
      },
    };
  },
});

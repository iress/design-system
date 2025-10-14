import { defineUtility } from '@pandacss/dev';

export const offsetCompositions = {
  '0': {
    description: '0 grid column to offset',
    value: {
      marginLeft: '0px',
    },
  },
  '1': {
    description: '1 grid column to offset',
    value: {
      marginLeft: 'calc(1 / 12 * 100%)',
    },
  },
  '2': {
    description: '2 grid columns to offset',
    value: {
      marginLeft: 'calc(2 / 12 * 100%)',
    },
  },
  '3': {
    description: '3 grid columns to offset',
    value: {
      marginLeft: 'calc(3 / 12 * 100%)',
    },
  },
  '4': {
    description: '4 grid columns to offset',
    value: {
      marginLeft: 'calc(4 / 12 * 100%)',
    },
  },
  '5': {
    description: '5 grid columns to offset',
    value: {
      marginLeft: 'calc(5 / 12 * 100%)',
    },
  },
  '6': {
    description: '6 grid columns to offset',
    value: {
      marginLeft: 'calc(6 / 12 * 100%)',
    },
  },
  '7': {
    description: '7 grid columns to offset',
    value: {
      marginLeft: 'calc(7 / 12 * 100%)',
    },
  },
  '8': {
    description: '8 grid columns to offset',
    value: {
      marginLeft: 'calc(8 / 12 * 100%)',
    },
  },
  '9': {
    description: '9 grid columns to offset',
    value: {
      marginLeft: 'calc(9 / 12 * 100%)',
    },
  },
  '10': {
    description: '10 grid columns to offset',
    value: {
      marginLeft: 'calc(10 / 12 * 100%)',
    },
  },
  '11': {
    description: '11 grid columns to offset',
    value: {
      marginLeft: 'calc(11 / 12 * 100%)',
    },
  },
};

type OffsetValue = keyof typeof offsetCompositions;

export const offset = defineUtility({
  className: 'offset',
  values: Object.keys(offsetCompositions),
  transform: (value?: OffsetValue) => {
    if (!value) {
      return {};
    }

    return offsetCompositions[value].value;
  },
});

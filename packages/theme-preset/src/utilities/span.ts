import { defineUtility } from '@pandacss/dev';

export const spanCompositions = {
  auto: {
    description:
      'column spans 12/12 or the remaining space of the container width',
    value: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 0,
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '1': {
    description: 'column spans 1/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(1 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '2': {
    description: 'column spans 2/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(2 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '3': {
    description: 'column spans 3/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(3 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '4': {
    description: 'column spans 1/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(4 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '5': {
    description: 'column spans 2/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(5 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '6': {
    description: 'column spans 3/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(6 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '7': {
    description: 'column spans 1/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(7 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '8': {
    description: 'column spans 2/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(8 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '9': {
    description: 'column spans 3/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(9 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '10': {
    description: 'column spans 1/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(10 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '11': {
    description: 'column spans 2/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'calc(11 / 12 * 100%)',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
  '12': {
    description: 'column spans 3/12 of the container width',
    value: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: '100%',
      paddingInline: 'calc(var(--col-gap) / 2)',
    },
  },
};

type SpanValue = keyof typeof spanCompositions | undefined;

export const span = defineUtility({
  className: 'span',
  values: Object.keys(spanCompositions),
  transform: (value?: SpanValue) => {
    if (!value) {
      return {};
    }

    return spanCompositions[value].value;
  },
});

import { defineUtility } from '@pandacss/dev';

const ALIGN_MAP: Record<string, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch',
};

export const verticalAlign = defineUtility({
  className: 'va',
  values: Object.keys(ALIGN_MAP),
  transform: (value: string) => {
    const cssValue = ALIGN_MAP[value];
    return {
      '&:where([data-flex-dir="row"], :not([data-flex-dir]))': {
        alignItems: cssValue,
      },
      '&:where([data-flex-dir="column"])': {
        justifyContent: cssValue,
      },
    };
  },
});

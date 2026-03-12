import { defineUtility } from '@pandacss/dev';

const ALIGN_MAP: Record<string, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
  stretch: 'stretch',
};

export const flexHorizontalAlign = defineUtility({
  className: 'fha',
  values: Object.keys(ALIGN_MAP),
  transform: (value: string) => {
    const cssValue = ALIGN_MAP[value];
    return {
      '&:where([data-flex-dir="row"], :not([data-flex-dir]))': {
        ...(cssValue === 'stretch' ? {} : { justifyContent: cssValue }),
      },
      '&:where([data-flex-dir="column"])': {
        alignItems: cssValue,
      },
    };
  },
});

import { sva } from '@/styled-system/css';

export const richSelect = sva({
  slots: [
    'richSelect',
    'popoverContent',
    'dropdownSelectedHeading',
    'dropdownClear',
    'wrapper',
  ],
  base: {
    richSelect: {
      display: 'block',
    },
    popoverContent: {
      minWidth: '[fit-content]',
      maxHeight: '[30rem]',
      overflowY: 'auto',
    },
    dropdownSelectedHeading: {
      width: '[100%]',
    },
    dropdownClear: {
      paddingX: 'spacing.2',
      paddingY: 'spacing.1',
      minHeight: '[0px]',
      boxShadow: '[none]',
    },
    wrapper: {
      width: '[100%]',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  variants: {
    width: {
      '2': {
        richSelect: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.2})]',
        },
      },
      '4': {
        richSelect: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.4})]',
        },
      },
      '6': {
        richSelect: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.6})]',
        },
      },
      '8': {
        richSelect: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.8})]',
        },
      },
      '10': {
        richSelect: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.10})]',
        },
      },
      '12': {
        richSelect: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.12})]',
        },
      },
      '16': {
        richSelect: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.16})]',
        },
      },
      '25perc': {
        richSelect: {
          width: 'input.25perc',
        },
      },
      '50perc': {
        richSelect: {
          width: 'input.50perc',
        },
      },
      '75perc': {
        richSelect: {
          width: 'input.75perc',
        },
      },
      '100perc': {
        richSelect: {
          width: 'input.100perc',
        },
      },
    },
  },
});

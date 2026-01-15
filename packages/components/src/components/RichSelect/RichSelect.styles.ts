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
      // Performance: CSS containment (no paint to allow focus ring/shadow)
      contain: 'layout style',
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
      '25%': {
        richSelect: {
          width: 'input.25%',
        },
      },
      '50%': {
        richSelect: {
          width: 'input.50%',
        },
      },
      '75%': {
        richSelect: {
          width: 'input.75%',
        },
      },
      '100%': {
        richSelect: {
          width: 'input.100%',
        },
      },
    },
  },
});

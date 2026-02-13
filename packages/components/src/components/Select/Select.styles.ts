import { sva } from '@/styled-system/css';

export const select = sva({
  slots: [
    'root',
    'popoverContent',
    'dropdownSelectedHeading',
    'dropdownClear',
    'wrapper',
  ],
  base: {
    root: {
      // Performance: CSS containment (no paint to allow focus ring/shadow)
      contain: 'style',
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
        root: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.2})]',
        },
      },
      '4': {
        root: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.4})]',
        },
      },
      '6': {
        root: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.6})]',
        },
      },
      '8': {
        root: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.8})]',
        },
      },
      '10': {
        root: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.10})]',
        },
      },
      '12': {
        root: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.12})]',
        },
      },
      '16': {
        root: {
          width:
            '[calc({spacing.spacing.2} + calc({sizes.chevron.select} * 2) + {sizes.input.16})]',
        },
      },
      '25%': {
        root: {
          width: 'input.25%',
        },
      },
      '50%': {
        root: {
          width: 'input.50%',
        },
      },
      '75%': {
        root: {
          width: 'input.75%',
        },
      },
      '100%': {
        root: {
          width: 'input.100%',
        },
      },
    },
  },
});

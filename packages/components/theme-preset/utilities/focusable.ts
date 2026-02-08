import { cssVars } from '@iress-oss/ids-tokens';
import { defineUtility } from '@pandacss/dev';

export const focusable = defineUtility({
  className: 'focusable',
  values: [
    'true',
    'within',
    'has-input',
    'has-input-compact',
    'has-controller',
    'label-after',
    'select',
    'slider',
    'has-switch',
  ],
  transform: (value) => {
    if (value === 'has-input') {
      return {
        'input:focus, textarea:focus, select:focus': {
          outline: 'none',
        },
        '&:has(input:focus, textarea:focus, select:focus)': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'has-input-compact') {
      return {
        'input:focus, textarea:focus': {
          outline: 'none',
        },
        '&:has(input:focus, textarea:focus)': {
          border: 'none',
          boxShadow: `inset 0 -2px 0 0 ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'has-controller') {
      return {
        '[aria-controls]:focus-visible': {
          outline: 'none',
        },
        '&:has([aria-controls]:focus-visible)': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'has-switch') {
      return {
        '&:focus-visible': {
          outline: 'none',
        },
        '&:has([role="switch"]:focus-visible)': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'label-after') {
      return {
        '&:focus-visible': {
          outline: 'none',
        },
        '&:focus + label': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'within') {
      return {
        '&:focus-visible, & :focus': {
          outline: 'none',
        },
        '&:focus-within': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'select') {
      return {
        '&:focus-within, &:active': {
          backgroundColor: cssVars.colour.neutral[10],
          outline: 'none',
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'slider') {
      return {
        '&:focus': {
          outline: 'none',
        },
        '&:focus-visible::-webkit-slider-thumb': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
        '&:focus-visible::-moz-range-thumb': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    return {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
      },
    };
  },
});

import { cssVars } from '@iress-oss/ids-tokens';
import { defineUtility } from '@pandacss/dev';

export const focusable = defineUtility({
  className: 'focusable',
  values: [
    'true',
    'within',
    'has-button',
    'has-input',
    'has-switch',
    'label-after',
    'expander-activator',
    'select-activator',
    'slider',
    'group',
    'inset',
    'colour.primary.onFill',
  ],
  transform: (value) => {
    if (value === 'has-input') {
      return {
        background: cssVars.colour.neutral[10],
        borderColor: `var(--iress-border-color--default, var(--iress-border-color, ${cssVars.colour.neutral[70]}))`,

        '&:has(input:disabled, textarea:disabled, select:disabled)': {
          background: `var(--iress-background--disabled, ${cssVars.colour.neutral[20]})`,
          '--iress-chevron-color': cssVars.colour.neutral[60],
          cursor: 'not-allowed',
        },
        '&:hover:not(:has(input:disabled, textarea:disabled, select:disabled))':
          {
            background: `var(--iress-background-hover, ${cssVars.colour.neutral[20]})`,
            borderColor: `var(--iress-border-color--hover, ${cssVars.colour.neutral[70]})`,
          },
        'input:focus, textarea:focus, select:focus': {
          outline: 'none',
        },
        '&:has(input:focus:not(:disabled), textarea:focus:not(:disabled), select:focus:not(:disabled))':
          {
            borderColor: `var(--iress-border-color, ${cssVars.colour.neutral[90]})`,
            boxShadow: `var(--iress-shadow-focus, 0 0 0 1px var(--iress-border-color, ${cssVars.colour.neutral[90]}))`,

            '&:hover': {
              background: cssVars.colour.neutral[10],
            },

            '& .ids-input__addon': {
              color: cssVars.colour.neutral[90],
            },
          },
      };
    }

    if (value === 'expander-activator') {
      return {
        '&:focus-visible': {
          boxShadow: `0 0 0 2px ${cssVars.colour.globalInteractions.focusRing}`,
        },
        '&[aria-expanded="true"]:focus-visible': {
          borderRadius: cssVars.radius.system.layout,
          bg: cssVars.colour.neutral[10],
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

    if (value === 'has-button') {
      return {
        '&:focus-visible': {
          outline: 'none',
        },
        '&:has(:focus-visible)': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,

          '& :focus-visible': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      };
    }

    if (value === 'group') {
      return {
        '.group:has(:focus-visible) &': {
          boxShadow: `0 0 0 1.5px ${cssVars.colour.neutral[10]}, 0 0 0 3.5px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'label-after') {
      return {
        '&:focus-visible': {
          outline: 'none',
        },
        '&:focus-visible + label': {
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

    if (value === 'within:inset') {
      return {
        '&:focus-visible, & :focus': {
          outline: 'none',
        },
        '&:focus-within': {
          boxShadow: `inset 0 0 0 2px ${cssVars.colour.globalInteractions.focusRing}`,
        },
      };
    }

    if (value === 'select-activator') {
      return {
        '&:hover': {
          backgroundColor: cssVars.colour.neutral[20],
        },
        '&:focus-within, &:active, &[aria-expanded="true"]': {
          backgroundColor: cssVars.colour.neutral[10],
          outline: 'none',
          borderColor: `var(--iress-border-color, ${cssVars.colour.neutral[90]})`,
          boxShadow: `0 0 0 1px var(--iress-border-color, ${cssVars.colour.neutral[90]})`,
        },
        '&:disabled, &[aria-disabled="true"]': {
          backgroundColor: cssVars.colour.neutral[30],
          color: cssVars.colour.neutral[60],
          '--iress-chevron-color': cssVars.colour.neutral[60],
          cursor: 'not-allowed',

          '&:focus-within, &:active, &[aria-expanded="true"]': {
            borderColor: 'unset',
            boxShadow: 'none',
          },
        },
      };
    }

    if (value === 'inset') {
      return {
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `inset 0 0 0 2px ${cssVars.colour.globalInteractions.focusRing}`,
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

    if (value === 'colour.primary.onFill') {
      return {
        '&:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 1.5px ${cssVars.colour.primary.fill}, 0 0 0 3.5px ${cssVars.colour.primary.onFill}`,
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

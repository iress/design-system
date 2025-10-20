// https://panda-css.com/docs/theming/tokens#sizes
import { BREAKPOINT_DETAILS } from '../../src/constants';
import { cssVars } from '@iress-oss/ids-tokens';

export const containerSizes = {
  'container.xs': {
    value: BREAKPOINT_DETAILS.xs.containerMaxWidth,
  },
  'container.sm': {
    value: BREAKPOINT_DETAILS.sm.containerMaxWidth,
  },
  'container.md': {
    value: BREAKPOINT_DETAILS.md.containerMaxWidth,
  },
  'container.lg': {
    value: BREAKPOINT_DETAILS.lg.containerMaxWidth,
  },
  'container.xl': {
    value: BREAKPOINT_DETAILS.xl.containerMaxWidth,
  },
  'container.xxl': {
    value: BREAKPOINT_DETAILS.xxl.containerMaxWidth,
  },
};

export const inputSizes = {
  'input.2': {
    description: '1rem * 2',
    value: `calc(${cssVars.typography.base.size} * 2.5)`,
  },
  'input.4': {
    description: '1rem * 4',
    value: `calc(${cssVars.typography.base.size} * 4)`,
  },
  'input.6': {
    description: '1rem * 6',
    value: `calc(${cssVars.typography.base.size} * 6)`,
  },
  'input.8': {
    description: '1rem * 8',
    value: `calc(${cssVars.typography.base.size} * 8)`,
  },
  'input.10': {
    description: '1rem * 10',
    value: `calc(${cssVars.typography.base.size} * 10)`,
  },
  'input.12': {
    description: '1rem * 12',
    value: `calc(${cssVars.typography.base.size} * 12)`,
  },
  'input.16': {
    description: '1rem * 16',
    value: `calc(${cssVars.typography.base.size} * 16)`,
  },
  'input.25perc': {
    description: '25%',
    value: '25%',
  },
  'input.50perc': {
    description: '50%',
    value: '50%',
  },
  'input.75perc': {
    description: '75%',
    value: '75%',
  },
  'input.100perc': {
    description: '100%',
    value: '100%',
  },
};

export const overlaySizes = {
  'overlay.sm': {
    description:
      'Used for small modals and slideouts. Small overlays communicate the outcome of an irreversible action. They should be concise and straightforward, containing a single action and, in some cases, a single input field.',
    value: '375px',
  },
  'overlay.md': {
    description:
      'Used for medium modals and slideouts. Medium overlays provide optional supporting information to help users understand the context of a word or screen. They may contain a single action and, in some cases, a larger input such as a textarea.',
    value: '640px',
  },
  'overlay.lg': {
    description:
      'Large modals facilitate sub-flows within a primary flow, allowing users to focus on tasks that will impact the underlying screen once the modal is closed (e.g., adding an item to a table or bulk uploading items). They should be used sparingly and only when there is a direct relationship to the underlying screen, where the action would not warrant a separate dedicated screen.',
    value: '900px',
  },
};

export const chevronSizes = {
  'chevron.select': {
    description:
      'Used for the chevron when selecting an option in a dropdown or select component.',
    value: `calc(${cssVars.typography.base.size} * 0.5)`,
  },
  'chevron.table': {
    description: 'Used for the chevron when expanding the child table.',
    value: `calc(${cssVars.typography.base.size} * 0.85)`,
  },
};

export const heights = {
  'input.height': {
    description: 'input height based on typography size',
    value: `calc(${cssVars.typography.base.size} * (36 / 14))`,
  },
  'progress.height': {
    description: 'Height of the progress bar',
    value: cssVars.spacing[200],
  },
};

export const sliderSizes = {
  'slider.track': {
    description: 'Height of the slider track',
    value: `calc(${cssVars.typography.base.size} * (10 / 14))`,
  },
  'slider.thumb': {
    description: 'Size of the slider thumb',
    value: `calc(${cssVars.typography.base.size} * 2)`,
  },
  'slider.tick': {
    description: 'Size of the slider tick',
    value: `calc(${cssVars.typography.base.size} * (5 / 14))`,
  },
};

export const toggleSizes = {
  'toggle.width': {
    description: 'Total width of the toggle',
    value: `calc(${cssVars.typography.base.size} * (48 / 14))`,
  },
  'toggle.thumb': {
    description: 'Size of the toggle thumb',
    value: `calc(${cssVars.typography.base.size} * (24 / 14))`,
  },
};

export const other = {
  'typography.base': {
    description: 'Base typography size',
    value: cssVars.typography.base.size,
  },
};

export const sizes = {
  ...containerSizes,
  ...inputSizes,
  ...overlaySizes,
  ...chevronSizes,
  ...heights,
  ...sliderSizes,
  ...toggleSizes,
  ...other,
};

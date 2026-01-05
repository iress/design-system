// https://panda-css.com/docs/theming/tokens#sizes
import {
  BREAKPOINT_DETAILS,
  FORM_ELEMENT_WIDTHS,
  GRID_SIZE,
} from '../../src/constants';
import { cssVars } from '@iress-oss/ids-tokens';

const containerSizes = Object.fromEntries(
  Object.entries(BREAKPOINT_DETAILS).map(([breakpoint, detail]) => [
    `container.${breakpoint}`,
    {
      description: `Width of the container at the ${breakpoint} breakpoint`,
      value: detail.containerMaxWidth,
    },
  ]),
);

const inputSizes = {
  ...Object.fromEntries(
    FORM_ELEMENT_WIDTHS.map((width) => [
      `input.${width}`,
      {
        description: width.includes('%') ? `${width} width` : `1rem * ${width}`,
        value: width.includes('%')
          ? width
          : `calc(${cssVars.typography.base.size} * ${width})`,
      },
    ]),
  ),
  'input.height': {
    description: 'input height based on typography size',
    value: `calc(${cssVars.typography.base.size} * (36 / 14))`,
  },
};

const gridSizes = Object.fromEntries(
  Array.from({ length: GRID_SIZE }, (_, i) => i + 1).map((size) => [
    `${size}/${GRID_SIZE}`,
    {
      description: `Grid size ${size}`,
      value: `${(size / GRID_SIZE) * 100}%`,
    },
  ]),
);

const overlaySizes = {
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

const chevronSizes = {
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

const progressSizes = {
  'progress.height': {
    description: 'Height of the progress bar',
    value: cssVars.spacing['2'],
  },
};

const sliderSizes = {
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

const toggleSizes = {
  'toggle.width': {
    description: 'Total width of the toggle',
    value: `calc(${cssVars.typography.base.size} * (48 / 14))`,
  },
  'toggle.thumb': {
    description: 'Size of the toggle thumb',
    value: `calc(${cssVars.typography.base.size} * (24 / 14))`,
  },
};

const typographySizes = {
  'typography.base': {
    description: 'Base typography size',
    value: cssVars.typography.base.size,
  },
};

export const sizes = {
  ...containerSizes,
  ...inputSizes,
  ...gridSizes,
  ...overlaySizes,
  ...chevronSizes,
  ...progressSizes,
  ...sliderSizes,
  ...toggleSizes,
  ...typographySizes,
};

export const SIZE_TOKENS = Object.keys({
  ...containerSizes,
  ...inputSizes,
  ...gridSizes,
  ...overlaySizes,
  ...typographySizes,
});

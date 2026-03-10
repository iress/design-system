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
    FORM_ELEMENT_WIDTHS.filter((value) => !value.includes('%')).map((width) => {
      const description = width.includes('%')
        ? `${width} width`
        : `1rem * ${width}`;

      let value;
      if (width === '2') {
        value = `calc(${cssVars.typography.base.size} * ${width} + ${cssVars.typography.base.size})`;
      } else {
        value = `calc(${cssVars.typography.base.size} * ${width})`;
      }

      return [
        `input.${width}`,
        {
          description,
          value,
        },
      ];
    }),
  ),
  'input.height': {
    description: 'input height based on typography size',
    value: `calc(${cssVars.typography.base.size} * (34 / 14))`,
  },
  'input.height.sm': {
    description: 'input height based on typography size (sm)',
    value: `calc(${cssVars.typography.base.size} * (30 / 14))`,
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
    value: '368px',
  },
  'overlay.md': {
    description:
      'Used for medium modals and slideouts. Medium overlays provide optional supporting information to help users understand the context of a word or screen. They may contain a single action and, in some cases, a larger input such as a textarea.',
    value: '628px',
  },
  'overlay.lg': {
    description:
      'Large modals facilitate sub-flows within a primary flow, allowing users to focus on tasks that will impact the underlying screen once the modal is closed (e.g., adding an item to a table or bulk uploading items). They should be used sparingly and only when there is a direct relationship to the underlying screen, where the action would not warrant a separate dedicated screen.',
    value: '800px',
  },
};

const chevronSizes = {
  'chevron.select': {
    description:
      'Used for the chevron when selecting an option in a dropdown or select component.',
    value: `calc(${cssVars.typography.base.size} * 0.7)`,
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

const componentSizes = {
  'input.innerHeight': {
    description: 'Inner height of input (accounting for border)',
    value: `calc(${cssVars.typography.base.size} * (34 / 14) - 2px)`,
  },
  'mark.size': {
    description: 'Size of checkbox/radio marks',
    value: '1.4em',
  },
  'icon.sm': {
    description: 'Small icon size',
    value: '1em',
  },
  'icon.md': {
    description: 'Medium icon size',
    value: '1.5em',
  },
  'spinner.dot': {
    description: 'Size of spinner dots',
    value: '0.5em',
  },
  'pill.minHeight': {
    description: 'Minimum height of pill',
    value: '1.35em',
  },
  'pill.minWidth': {
    description: 'Minimum width of pill',
    value: '1.5em',
  },
  'tab.indicator': {
    description: 'Height of tab active indicator',
    value: '2px',
  },
  'menu.indicator': {
    description: 'Width of menu group indicator',
    value: '4px',
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
  ...componentSizes,
};

export const SIZE_TOKENS = Object.keys({
  ...containerSizes,
  ...inputSizes,
  ...gridSizes,
  ...overlaySizes,
  ...typographySizes,
});

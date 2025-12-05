import { spacing as spacingTokens, cssVars } from '@iress-oss/ids-tokens';
import { sliderSizes } from './sizes';

const publicSpacing = {
  'spacing.0': {
    description: spacingTokens[0].$description,
    value: cssVars.spacing['0'],
  },
  'spacing.1': {
    description: spacingTokens[1].$description,
    value: cssVars.spacing['1'],
  },
  'spacing.2': {
    description: spacingTokens[2].$description,
    value: cssVars.spacing['2'],
  },
  'spacing.3': {
    description: spacingTokens[3].$description,
    value: cssVars.spacing['3'],
  },
  'spacing.4': {
    description: spacingTokens[4].$description,
    value: cssVars.spacing['4'],
  },
  'spacing.5': {
    description: spacingTokens[5].$description,
    value: cssVars.spacing['5'],
  },
  'spacing.6': {
    description: spacingTokens[6].$description,
    value: cssVars.spacing['6'],
  },
  'spacing.7': {
    description: spacingTokens[7].$description,
    value: cssVars.spacing['7'],
  },
  'spacing.8': {
    description: spacingTokens[8].$description,
    value: cssVars.spacing['8'],
  },
  'spacing.10': {
    description: spacingTokens[10].$description,
    value: cssVars.spacing['10'],
  },
};

const aliasSpacing = {
  none: {
    description: spacingTokens[0].$description,
    value: cssVars.spacing['0'],
  },
  xs: {
    description: spacingTokens[1].$description,
    value: cssVars.spacing['1'],
  },
  sm: {
    description: spacingTokens[2].$description,
    value: cssVars.spacing['2'],
  },
  md: {
    description: spacingTokens[4].$description,
    value: cssVars.spacing['4'],
  },
  lg: {
    description: spacingTokens[6].$description,
    value: cssVars.spacing['6'],
  },
  xl: {
    description: spacingTokens[10].$description,
    value: cssVars.spacing['10'],
  },
};

export const spacing = {
  ...publicSpacing,
  ...aliasSpacing,

  'button.inline': {
    description: 'Spacing on the left and right of inline button content',
    value: `calc((${cssVars.radius.system._button.topLeft} * 0.25) + ${cssVars.spacing['2']})`,
  },

  'button.block': {
    description: 'Spacing on the top and bottom of block button content',
    value: `calc(${cssVars.radius.system._button.topLeft} * 0.25)`,
  },

  'field.footer': {
    description:
      'Spacing below the field to account for the height of the footer content',
    value: `calc(${cssVars.typography.base.size} * 2.35)`,
  },

  'slider.tick': {
    description:
      'Spacing between top and bottom of the slider tick marks from the track',
    value: `calc((${sliderSizes['slider.track'].value} - ${sliderSizes['slider.tick'].value}) / 2)`,
  },
};

export const SPACING_TOKENS = Object.keys({
  ...publicSpacing,
  ...aliasSpacing,
});

export const MARGIN_TOKENS = [
  ...SPACING_TOKENS,
  ...SPACING_TOKENS.map((token) => `-${token}`),
];

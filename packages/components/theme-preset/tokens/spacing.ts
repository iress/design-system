import { spacing as spacingTokens, cssVars } from '@iress-oss/ids-tokens';
import { sliderSizes } from './sizes';

const publicSpacing = {
  'spacing.000': {
    description: spacingTokens['000'].$description,
    value: cssVars.spacing['000'],
  },
  'spacing.050': {
    description: spacingTokens['050'].$description,
    value: cssVars.spacing['050'],
  },
  'spacing.100': {
    description: spacingTokens['100'].$description,
    value: cssVars.spacing['100'],
  },
  'spacing.150': {
    description: spacingTokens['150'].$description,
    value: cssVars.spacing['150'],
  },
  'spacing.200': {
    description: spacingTokens['200'].$description,
    value: cssVars.spacing['200'],
  },
  'spacing.250': {
    description: spacingTokens['250'].$description,
    value: cssVars.spacing['250'],
  },
  'spacing.300': {
    description: spacingTokens['300'].$description,
    value: cssVars.spacing['300'],
  },
  'spacing.350': {
    description: spacingTokens['350'].$description,
    value: cssVars.spacing['350'],
  },
  'spacing.400': {
    description: spacingTokens['400'].$description,
    value: cssVars.spacing['400'],
  },
  'spacing.500': {
    description: spacingTokens['500'].$description,
    value: cssVars.spacing['500'],
  },
  'spacing.600': {
    description: spacingTokens['600'].$description,
    value: cssVars.spacing['600'],
  },
  'spacing.700': {
    description: spacingTokens['700'].$description,
    value: cssVars.spacing['700'],
  },
  'spacing.800': {
    description: spacingTokens['800'].$description,
    value: cssVars.spacing['800'],
  },
  'spacing.900': {
    description: spacingTokens['900'].$description,
    value: cssVars.spacing['900'],
  },
  'spacing.1000': {
    description: spacingTokens['1000'].$description,
    value: cssVars.spacing['1000'],
  },
  'spacing.1200': {
    description: spacingTokens['1200'].$description,
    value: cssVars.spacing['1200'],
  },
  none: {
    description: spacingTokens['000'].$description,
    value: cssVars.spacing['000'],
  },
  xs: {
    description: spacingTokens['100'].$description,
    value: cssVars.spacing['100'],
  },
  sm: {
    description: spacingTokens['200'].$description,
    value: cssVars.spacing['200'],
  },
  md: {
    description: spacingTokens['400'].$description,
    value: cssVars.spacing['400'],
  },
  lg: {
    description: spacingTokens['700'].$description,
    value: cssVars.spacing['700'],
  },
  xl: {
    description: spacingTokens['1200'].$description,
    value: cssVars.spacing['1200'],
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

export const spacing = {
  ...publicSpacing,

  'button.inline': {
    description: 'Spacing on the left and right of inline button content',
    value: `calc((${cssVars.radius.system._button.topLeft} * 0.25) + ${cssVars.spacing['200']})`,
  },

  'button.block': {
    description: 'Spacing on the top and bottom of block button content',
    value: `calc(${cssVars.radius.system._button.topLeft} * 0.25)`,
  },
};

export type PositiveSpacingToken = keyof typeof publicSpacing;
export const SPACING_TOKENS = Object.keys(
  publicSpacing,
) as PositiveSpacingToken[];

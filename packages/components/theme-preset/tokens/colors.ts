import { colour, cssVars } from '@iress-oss/ids-tokens';
import { ColorToken } from '@/styled-system/tokens';

export const colors = {
  'colour.primary.fill': {
    description: colour.primary.fill.$description,
    value: cssVars.colour.primary.fill,
  },
  'colour.primary.fillHover': {
    description: colour.primary.fillHover.$description,
    value: cssVars.colour.primary.fillHover,
  },
  'colour.primary.onFill': {
    description: colour.primary.onFill.$description,
    value: cssVars.colour.primary.onFill,
  },
  'colour.primary.surface': {
    description: colour.primary.surface.$description,
    value: cssVars.colour.primary.surface,
  },
  'colour.primary.surfaceHover': {
    description: colour.primary.surfaceHover.$description,
    value: cssVars.colour.primary.surfaceHover,
  },
  'colour.primary.text': {
    description: colour.primary.text.$description,
    value: cssVars.colour.primary.text,
  },
  'colour.neutral.10': {
    description: colour.neutral['10'].$description,
    value: cssVars.colour.neutral['10'],
  },
  'colour.neutral.20': {
    description: colour.neutral['20'].$description,
    value: cssVars.colour.neutral['20'],
  },
  'colour.neutral.30': {
    description: colour.neutral['30'].$description,
    value: cssVars.colour.neutral['30'],
  },
  'colour.neutral.40': {
    description: colour.neutral['40'].$description,
    value: cssVars.colour.neutral['40'],
  },
  'colour.neutral.50': {
    description: colour.neutral['50'].$description,
    value: cssVars.colour.neutral['50'],
  },
  'colour.neutral.60': {
    description: colour.neutral['60'].$description,
    value: cssVars.colour.neutral['60'],
  },
  'colour.neutral.70': {
    description: colour.neutral['70'].$description,
    value: cssVars.colour.neutral['70'],
  },
  'colour.neutral.80': {
    description: colour.neutral['80'].$description,
    value: cssVars.colour.neutral['80'],
  },
  'colour.accent.brand': {
    description: colour.accent.brand.$description,
    value: cssVars.colour.accent.brand,
  },
  'colour.system.success.fill': {
    description: colour.system.success.fill.$description,
    value: cssVars.colour.system.success.fill,
  },
  'colour.system.success.fillHover': {
    description: colour.system.success.fillHover.$description,
    value: cssVars.colour.system.success.fillHover,
  },
  'colour.system.success.onFill': {
    description: colour.system.success.onFill.$description,
    value: cssVars.colour.system.success.onFill,
  },
  'colour.system.success.surface': {
    description: colour.system.success.surface.$description,
    value: cssVars.colour.system.success.surface,
  },
  'colour.system.success.surfaceHover': {
    description: colour.system.success.surfaceHover.$description,
    value: cssVars.colour.system.success.surfaceHover,
  },
  'colour.system.success.text': {
    description: colour.system.success.text.$description,
    value: cssVars.colour.system.success.text,
  },
  'colour.system.danger.fill': {
    description: colour.system.danger.fill.$description,
    value: cssVars.colour.system.danger.fill,
  },
  'colour.system.danger.fillHover': {
    description: colour.system.danger.fillHover.$description,
    value: cssVars.colour.system.danger.fillHover,
  },
  'colour.system.danger.onFill': {
    description: colour.system.danger.onFill.$description,
    value: cssVars.colour.system.danger.onFill,
  },
  'colour.system.danger.surface': {
    description: colour.system.danger.surface.$description,
    value: cssVars.colour.system.danger.surface,
  },
  'colour.system.danger.surfaceHover': {
    description: colour.system.danger.surfaceHover.$description,
    value: cssVars.colour.system.danger.surfaceHover,
  },
  'colour.system.danger.text': {
    description: colour.system.danger.text.$description,
    value: cssVars.colour.system.danger.text,
  },
  'colour.system.warning.fill': {
    description: colour.system.warning.fill.$description,
    value: cssVars.colour.system.warning.fill,
  },
  'colour.system.warning.onFill': {
    description: colour.system.warning.onFill.$description,
    value: cssVars.colour.system.warning.onFill,
  },
  'colour.system.warning.surface': {
    description: colour.system.warning.surface.$description,
    value: cssVars.colour.system.warning.surface,
  },
  'colour.system.warning.text': {
    description: colour.system.warning.text.$description,
    value: cssVars.colour.system.warning.text,
  },
  'colour.system.info.fill': {
    description: colour.system.info.fill.$description,
    value: cssVars.colour.system.info.fill,
  },
  'colour.system.info.onFill': {
    description: colour.system.info.onFill.$description,
    value: cssVars.colour.system.info.onFill,
  },
  'colour.system.info.surface': {
    description: colour.system.info.surface.$description,
    value: cssVars.colour.system.info.surface,
  },
  'colour.system.info.text': {
    description: colour.system.info.text.$description,
    value: cssVars.colour.system.info.text,
  },
  'colour.system.backdrop.fill': {
    description: colour.system.backdrop.fill.$description,
    value: cssVars.colour.system.backdrop.fill,
  },
  transparent: {
    description: 'Transparent colour, used to create a transparent background.',
    value: 'rgba(0, 0, 0, 0)',
  },
  alt: {
    description: 'Alternative colour, used for alternative backgrounds.',
    value: cssVars.colour.neutral['20'],
  },
};

export const COLOR_TOKENS = Object.keys(colors) as ColorToken[];

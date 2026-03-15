import { radius, cssVars } from '@iress-oss/ids-tokens';

export const radii = {
  'radius.0': {
    description: radius[0].$description,
    value: cssVars.radius['0'],
  },
  'radius.1': {
    description: radius[1].$description,
    value: cssVars.radius['1'],
  },
  'radius.2': {
    description: radius[2].$description,
    value: cssVars.radius['2'],
  },
  'radius.3': {
    description: radius[3].$description,
    value: cssVars.radius['3'],
  },
  'radius.4': {
    description: radius[4].$description,
    value: cssVars.radius['4'],
  },
  'radius.system.button': {
    description: radius.system.button.$description,
    value: cssVars.radius.system.button,
  },
  'radius.system.form': {
    description: radius.system.form.$description,
    value: cssVars.radius.system.form,
  },
  'radius.system.layout': {
    description: radius.system.layout.$description,
    value: cssVars.radius.system.layout,
  },
  'radius.system.pill': {
    description: radius.system.pill.$description,
    value: cssVars.radius.system.pill,
  },
  'radius.system.tag': {
    description: radius.system.tag.$description,
    value: cssVars.radius.system.tag,
  },
  none: {
    description: 'No border radius',
    value: cssVars.radius['0'],
  },
  '50%': {
    description: 'Circle radius',
    value: '50%',
  },
};

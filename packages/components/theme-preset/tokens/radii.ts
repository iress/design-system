import { radius, cssVars } from '@iress-oss/ids-tokens';

const badge = radius.system.badge;
const button = radius.system.button;
const form = radius.system.form;
const layout = radius.system.layout;

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
  'radius.system.badge': {
    description: badge.$description,
    value: cssVars.radius.system.badge,
  },
  'radius.system.button': {
    description: button.$description,
    value: cssVars.radius.system.button,
  },
  'radius.system.form': {
    description: form.$description,
    value: cssVars.radius.system.form,
  },
  'radius.system.layout': {
    description: layout.$description,
    value: cssVars.radius.system.layout,
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

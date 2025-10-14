import { radius, cssVars } from '@iress-oss/ids-tokens';

const badge = radius.system.badge;
const button = radius.system.button;
const form = radius.system.form;
const layout = radius.system.layout;

export const radii = {
  'radius.000': {
    description: radius['000'].$description,
    value: cssVars.radius['000'],
  },
  'radius.025': {
    description: radius['025'].$description,
    value: cssVars.radius['025'],
  },
  'radius.050': {
    description: radius['050'].$description,
    value: cssVars.radius['050'],
  },
  'radius.075': {
    description: radius['075'].$description,
    value: cssVars.radius['075'],
  },
  'radius.100': {
    description: radius['100'].$description,
    value: cssVars.radius['100'],
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
    value: cssVars.radius['000'],
  },
};

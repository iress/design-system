import { type CompositionStyles, defineLayerStyles } from '@pandacss/dev';
import { cssVars } from '@iress-oss/ids-tokens';

const internalLayerStyles: CompositionStyles['layerStyles'] = {
  dropdown: {
    description:
      'Used for dropdown elements (eg. DropdownMenu, Select and Popover)',
    value: {
      boxShadow: '0 4px 8px #141F4D0A',
      border: `1px solid ${cssVars.colour.neutral[40]}`,
    },
  },
  dots: {
    description: 'Used to represent a loading state with dots',
    value: {
      background: `radial-gradient(circle closest-side, currentcolor 90%, transparent) 0 / calc(100% / 3) 100% space`,
    },
  },
  floating: {
    description: 'Used to represent a floating element (eg. Slideout)',
    value: {
      boxShadow: '0 10px 18px #091E4215',
      border: '0.5px solid #091E4215',
    },
  },
  overflow: {
    description:
      'Used to indicate an element is scrollable when its content overflows (eg. TabSet and Table)',
    value: {
      boxShadow: 'inset -13px 0px 18.8px #091E420D',
    },
  },
  skeleton: {
    description: 'Used to represent a skeleton background',
    value: {
      background: `linear-gradient(110deg, ${cssVars.colour.neutral[30]} 63%, ${cssVars.colour.neutral[20]} 74%, ${cssVars.colour.neutral[20]} 78%, ${cssVars.colour.neutral[30]} 84%, ${cssVars.colour.neutral[30]} 100%)`,
      backgroundSize: '200% 100%',
      backgroundPosition: '0 center',
    },
  },
  'focusRing.primary.sm': {
    description: 'Focus ring for primary interactive elements (2px)',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.primary.fill}, transparent 80%) 0px 0px 0px 2px`,
    },
  },
  'focusRing.primary.md': {
    description: 'Focus ring for primary interactive elements (3px)',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.primary.fill}, transparent 80%) 0px 0px 0px 3px`,
    },
  },
  'focusRing.primary.subtle': {
    description: 'Subtle focus ring for secondary/quaternary primary elements',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.primary.fill}, transparent 90%) 0px 0px 0px 2px`,
    },
  },
  'focusRing.danger.md': {
    description: 'Focus ring for danger interactive elements (3px)',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.system.danger.fill}, transparent 80%) 0px 0px 0px 3px`,
    },
  },
  'focusRing.danger.surface': {
    description: 'Focus ring using danger surface colour',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.system.danger.surface}, transparent 40%) 0px 0px 0px 3px`,
    },
  },
  'focusRing.success.md': {
    description: 'Focus ring for success interactive elements (3px)',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.system.success.fill}, transparent 80%) 0px 0px 0px 3px`,
    },
  },
  'focusRing.success.surface': {
    description: 'Focus ring using success surface colour',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.system.success.surface}, transparent 40%) 0px 0px 0px 3px`,
    },
  },
  'focusRing.info.surface': {
    description: 'Focus ring using info surface colour',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.system.info.surface}, transparent 40%) 0px 0px 0px 3px`,
    },
  },
  'focusRing.warning.surface': {
    description: 'Focus ring using warning surface colour',
    value: {
      boxShadow: `color-mix(in srgb, ${cssVars.colour.system.warning.surface}, transparent 40%) 0px 0px 0px 3px`,
    },
  },
};

export const layerStyles = defineLayerStyles({
  ...internalLayerStyles,
});

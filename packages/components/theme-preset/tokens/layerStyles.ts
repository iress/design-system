import { type CompositionStyles, defineLayerStyles } from '@pandacss/dev';
import { elevation, cssVars } from '@iress-oss/ids-tokens';

export const elevationCompositions = {
  'elevation.raised': {
    description: elevation.raised.$description,
    value: {
      boxShadow: cssVars.elevation.raised.shadow,
      border: cssVars.elevation.raised.border,
    },
  },
  'elevation.floating': {
    description: elevation.floating.$description,
    value: {
      boxShadow: cssVars.elevation.floating.shadow,
      border: cssVars.elevation.floating.border,
    },
  },
  'elevation.overflow': {
    description: elevation.overflow.$description,
    value: {
      boxShadow: cssVars.elevation.overflow.shadow,
      border: cssVars.elevation.overflow.border,
    },
  },
  'elevation.focus': {
    description: elevation.focus.$description,
    value: {
      boxShadow: cssVars.elevation.focus.shadow,
    },
  },
  'elevation.focusCompact': {
    description: elevation.focusCompact.$description,
    value: {
      boxShadow: cssVars.elevation.focusCompact.shadow,
      borderColor: cssVars.elevation.focusCompact.borderColor,
    },
  },
} satisfies CompositionStyles['layerStyles'];

export type Elevations = keyof typeof elevationCompositions;

export const internalLayerStyles: CompositionStyles['layerStyles'] = {
  dots: {
    description: 'Used to represent a loading state with dots',
    value: {
      background: `radial-gradient(circle closest-side, currentcolor 90%, transparent) 0 / calc(100% / 3) 100% space`,
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
};

export const layerStyles = defineLayerStyles({
  ...elevationCompositions,
  ...internalLayerStyles,
});

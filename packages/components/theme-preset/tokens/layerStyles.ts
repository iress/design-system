import { type CompositionStyles, defineLayerStyles } from '@pandacss/dev';
import { cssVars } from '@iress-oss/ids-tokens';

const internalLayerStyles: CompositionStyles['layerStyles'] = {
  dots: {
    description: 'Used to represent a loading state with dots',
    value: {
      background: `radial-gradient(circle closest-side, currentcolor 90%, transparent) 0 / calc(100% / 3) 100% space`,
    },
  },
  floating: {
    description:
      'Used to represent a floating element (eg. Modal, Slideout or Popover)',
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
};

export const layerStyles = defineLayerStyles({
  ...internalLayerStyles,
});

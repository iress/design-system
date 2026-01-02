import { defineUtility } from '@pandacss/dev';
import { colors } from '../tokens/colors';
import { sizes } from '../tokens/sizes';

export const sliderThumb = defineUtility({
  className: 'sliderThumb',
  values: { type: 'boolean' },
  transform: (value) => {
    if (value !== true) {
      return {
        display: 'none',
      };
    }

    return {
      aspectRatio: 1,
      width: sizes['slider.thumb'].value,
      height: sizes['slider.thumb'].value,
      cursor: 'pointer',
      borderColor: colors['colour.neutral.10'].value,
      borderRadius: `calc(${sizes['slider.thumb'].value} / 2)`,
      borderStyle: 'solid',
      borderWidth: '1.5px',
      backgroundColor: colors['colour.primary.fill'].value,
      position: 'relative',
      zIndex: '200',
    };
  },
});

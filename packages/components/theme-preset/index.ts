import { definePreset } from '@pandacss/dev';

import { globalCss } from './globalCss';

import { staticCss } from './staticCss';

import { textRecipe } from './config-recipes/text';
import { tableRecipe } from './config-recipes/table';

import { borders } from './tokens/borders';
import { colors } from './tokens/colors';
import { radii } from './tokens/radii';
import { sizes } from './tokens/sizes';
import { spacing } from './tokens/spacing';
import { zIndex } from './tokens/zIndex';
import { breakpoints } from './tokens/breakpoints';
import { layerStyles } from './tokens/layerStyles';
import { textStyles } from './tokens/textStyles';
import { keyframes } from './tokens/keyframes';
import { animationStyles } from './tokens/animationStyles';

import { span } from './utilities/span';
import { offset } from './utilities/offset';
import { hide } from './utilities/hide';
import { gutter } from './utilities/gutter';
import {
  selectChevron,
  tableChevron,
  selectChevronRtl,
} from './utilities/chevron';
import { buttonRecipe } from './config-recipes/button';
import { topLeftTriangle, checkmark } from './utilities/topLeftTriangle';
import { sliderThumb } from './utilities/sliderThumb';
import { noGutter } from './utilities/noGutter';
import { stretch } from './utilities/stretch';
import { focusable } from './utilities/focusable';

export default definePreset({
  name: 'theme-preset',

  globalCss,

  staticCss,

  conditions: {
    extend: {
      nestedFormElements: [
        '& .iress-form-element:not(& .iress-form-element .iress-form-element)',
        '& .iress-form-element__inner:not(& .iress-form-element .iress-form-element)',
      ].join(', '),
      nestedFormLabels: '& .iress-form-label:not(.sr_true)',
      directNestedFormElements: '& > .iress-form-element',
      directNestedSizedElements: [
        '& > :has([class*="w_input"])',
        '& > :has([class*="sizes.chevron.select"])',
        '& > .iress-form-element',
      ].join(', '),
      nestedFieldsExceptFirst: [
        '& > .iress-form-element:not(:first-child)',
        '& > .iress-form-element:not(:first-child) .iress-form-element__inner',
        '& .ids-field:not(:first-child) .iress-form-element',
        '& .ids-field:not(:first-child) .iress-form-element__inner',
      ].join(', '),
      nestedFieldsExceptLast: [
        '& > .iress-form-element:not(:last-child)',
        '& > .iress-form-element:not(:last-child) .iress-form-element__inner',
        '& .ids-field:not(:last-child) .iress-form-element',
        '& .ids-field:not(:last-child) .iress-form-element__inner',
      ].join(', '),
      progressBar: ['&::-webkit-progress-bar', '&::-webkit-meter-bar'].join(
        ', ',
      ),
      progressValue: [
        '&::-webkit-progress-value',
        '&::-webkit-meter-optimum-value',
        '&::-webkit-meter-suboptimum-value',
      ].join(', '),
      mozProgressValue: ['&::-moz-progress-bar', '&::-moz-meter-bar'].join(
        ', ',
      ),
      focusVisibleWebkitSliderThumb: '&:focus-visible::-webkit-slider-thumb',
      focusVisibleMozRangeThumb: '&:focus-visible::-moz-range-thumb',
      webkitSliderThumb: '&::-webkit-slider-thumb',
      mozRangeThumb: '&::-moz-range-thumb',
      webkitSliderRunnableTrack: '&::-webkit-slider-runnable-track',
      mozRangeTrack: '&::-moz-range-track',
      directNestedHeadings: '& > h1, & > h2, & > h3, & > h4, & > h5, & > h6',
      siblingHeadings:
        '& + h1:not(.ids-text), & + h2:not(.ids-text), & + h3:not(.ids-text), & + h4:not(.ids-text), & + h5:not(.ids-text), & + h6:not(.ids-text)',
      nestedHeadings:
        '& h1:not(.ids-text), & h2:not(.ids-text), & h3:not(.ids-text), & h4:not(.ids-text), & h5:not(.ids-text), & h6:not(.ids-text)',
    },
  },

  theme: {
    tokens: {
      borders,
      colors,
      radii,
      sizes,
      spacing,
      zIndex,
    },
    extend: {
      breakpoints,
      keyframes,
      layerStyles,
      textStyles,
      animationStyles,
      recipes: {
        button: buttonRecipe,
        table: tableRecipe,
        text: textRecipe,
      },
    },
  },

  utilities: {
    extend: {
      focusable,
      gutter,
      selectChevron,
      selectChevronRtl,
      tableChevron,
      hide,
      offset,
      span,
      topLeftTriangle,
      checkmark,
      sliderThumb,
      noGutter,
      stretch,
    },
  },
});

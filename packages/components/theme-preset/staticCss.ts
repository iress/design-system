import { type ExtendableOptions } from '@pandacss/types';
import { colors } from './tokens/colors';
import { ELEVATION_TOKENS } from './tokens/layerStyles';
import { radii } from './tokens/radii';
import { textCompositions } from './tokens/textStyles';
import { spanCompositions } from './utilities/span';
import { offsetCompositions } from './utilities/offset';
import { MARGIN_TOKENS, SPACING_TOKENS } from './tokens/spacing';
import { breakpoints } from './tokens/breakpoints';
import { HORIZONTAL_ALIGNS } from '../src/constants';

/**
 * Allowed CSS properties for all components.
 * This a subset of the full list of Panda props that are allowed to be customised.
 * If its not here, its not customisable for IDS consumers.
 *
 * Note: If you update this list, you should also update the `IressCSSProps` interface in `packages/components/src/interfaces.ts`
 */
const allowedCssProps = {
  alignSelf: ['start', 'end', 'center', 'stretch'],
  borderRadius: Object.keys(radii),
  columnGap: SPACING_TOKENS,
  gap: SPACING_TOKENS,
  horizontalAlign: [...HORIZONTAL_ALIGNS],
  layerStyle: ELEVATION_TOKENS,

  // We can't use margin shorthand because it won't generate the correct CSS
  margin: MARGIN_TOKENS,
  marginBlock: MARGIN_TOKENS,
  marginInline: MARGIN_TOKENS,
  marginTop: MARGIN_TOKENS,
  marginBottom: MARGIN_TOKENS,
  marginLeft: MARGIN_TOKENS,
  marginRight: MARGIN_TOKENS,

  // We can't use padding shorthand because it won't generate the correct CSS
  padding: SPACING_TOKENS,
  paddingBlock: SPACING_TOKENS,
  paddingInline: SPACING_TOKENS,
  paddingTop: SPACING_TOKENS,
  paddingBottom: SPACING_TOKENS,
  paddingLeft: SPACING_TOKENS,
  paddingRight: SPACING_TOKENS,
  rowGap: SPACING_TOKENS,
  srOnly: ['true', 'false'],
  textAlign: ['center', 'left', 'right', 'justify', 'inherit'],
  textStyle: Object.keys(textCompositions),
  width: ['*'],

  // Only available in IressCol
  offset: Object.keys(offsetCompositions),
  span: Object.keys(spanCompositions),

  // Only available in IressRow
  gutter: SPACING_TOKENS,
};

export const staticCss: ExtendableOptions['staticCss'] = {
  css: [
    {
      properties: allowedCssProps,
      responsive: true,
    },
    {
      properties: {
        bg: Object.keys(colors),
        color: Object.keys(colors),
        flex: ['1'],
        focusable: ['true', 'within'],
        hideFrom: Object.keys(breakpoints),
        hideBelow: Object.keys(breakpoints),
        maxWidth: ['*'],
        noGutter: ['true'],
        scrollable: ['x', 'y', 'true'],
        stretch: ['true', '1'],
      },
      responsive: false,
    },
  ],
};

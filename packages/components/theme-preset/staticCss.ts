import { type ExtendableOptions } from '@pandacss/types';
import { colors } from './tokens/colors';
import { elevationCompositions } from './tokens/layerStyles';
import { radii } from './tokens/radii';
import { textCompositions } from './tokens/textStyles';
import { spanCompositions } from './utilities/span';
import { offsetCompositions } from './utilities/offset';
import { MARGIN_TOKENS, SPACING_TOKENS } from './tokens/spacing';

/**
 * Allowed CSS properties for all components.
 * This a subset of the full list of Panda props that are allowed to be customised.
 * If its not here, its not customisable for IDS consumers.
 *
 * Note: If you update this list, you should also update the `IressCSSProps` interface in `packages/components/src/interfaces.ts`
 */
const allowedCssProps = {
  bg: Object.keys(colors),
  borderRadius: Object.keys(radii),
  color: Object.keys(colors),
  columnGap: ['*'],
  gap: ['*'],
  hide: ['true', 'false'],
  layerStyle: Object.keys(elevationCompositions),
  maxWidth: ['*'],

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
        focusable: ['true', 'within'],
        noGutter: ['true'],
        stretch: ['true'],
      },
      responsive: false,
    },
  ],
};

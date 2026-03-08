import { type ExtendableOptions } from '@pandacss/types';
import { colors } from './tokens/colors';
import { radii } from './tokens/radii';
import { textCompositions } from './tokens/textStyles';
import { spanCompositions } from './utilities/span';
import { offsetCompositions } from './utilities/offset';
import { MARGIN_TOKENS, SPACING_TOKENS } from './tokens/spacing';
import { breakpoints } from './tokens/breakpoints';
import { HORIZONTAL_ALIGNS, VERTICAL_ALIGNS } from '../src/constants';

/**
 * Allowed CSS properties for all components.
 * This a subset of the full list of Panda props that are allowed to be customised.
 * If its not here, its not customisable for IDS consumers.
 *
 * Note: If you update this list, you should also update the `IressCSSProps` interface in `packages/components/src/interfaces.ts`
 */

/**
 * Properties that need responsive variants (used at different breakpoints).
 * These generate classes for base + each breakpoint (7× per value).
 */
const responsiveProps = {
  columnGap: SPACING_TOKENS,
  gap: SPACING_TOKENS,

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
  width: ['*'],

  // Only available in IressCol
  offset: Object.keys(offsetCompositions),
  span: Object.keys(spanCompositions),

  // Only available in IressRow
  gutter: SPACING_TOKENS,
};

/**
 * Properties that don't need responsive variants (rarely change per breakpoint).
 * These generate only base classes (1× per value).
 */
const staticProps = {
  alignSelf: ['start', 'end', 'center', 'stretch'],
  bg: Object.keys(colors),
  borderRadius: Object.keys(radii),
  color: Object.keys(colors),
  flex: ['1'],
  focusable: ['true', 'within'],
  hideBelow: Object.keys(breakpoints),
  hideFrom: Object.keys(breakpoints),
  flexHorizontalAlign: [...HORIZONTAL_ALIGNS],
  maxWidth: ['*'],
  noGutter: ['true'],
  scrollable: ['x', 'y', 'true'],
  stretch: ['true'],
  textAlign: ['center', 'left', 'right', 'justify', 'inherit'],
  textStyle: Object.keys(textCompositions),
  flexVerticalAlign: [...VERTICAL_ALIGNS],
};

export const staticCss: ExtendableOptions['staticCss'] = {
  css: [
    {
      properties: responsiveProps,
      responsive: true,
    },
    {
      properties: staticProps,
      responsive: false,
    },
  ],
};

/**
 * Styling props reference data — the single source of truth for the complete
 * list of IressCSSProps styling props, their CSS mappings, token associations,
 * and responsive support.
 *
 * This file is intentionally dependency-free (no path aliases, no external
 * imports) so it can be consumed by both:
 *   - The Storybook stories (010-Reference.stories.tsx)
 *   - The AI documentation translator (scripts/translate-components.ts)
 */

export interface StylingPropsReferenceEntry {
  /** The JSX prop name (should correspond to a key in IressCSSProps). */
  jsxProp: string;
  /** Optional Storybook link for the prop documentation. */
  jsxPropLink?: string;
  /** The CSS property (or properties) set by this prop. */
  cssProperty: string;
  /** Design token category, or 'N/A' if none. Can be an array for multi-token props. */
  tokenMapping: string[] | string;
  /** Optional Storybook link for the token documentation. */
  tokenMappingLink?: string;
  /** Whether the prop supports responsive syntax. */
  responsive: boolean;
}

export const stylingPropsReference: StylingPropsReferenceEntry[] = [
  {
    jsxProp: 'alignSelf',
    jsxPropLink: '/?path=/docs/styling-props-layout--docs#alignself',
    cssProperty: 'align-self',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'bg',
    jsxPropLink: '/?path=/docs/styling-props-colour--docs#bg',
    cssProperty: 'background',
    tokenMapping: 'Colour',
    tokenMappingLink: '/?path=/docs/tokens_colour--docs',
    responsive: false,
  },
  {
    jsxProp: 'borderRadius',
    jsxPropLink: '/?path=/docs/styling-props-radius--docs#borderradius',
    cssProperty: 'border-radius',
    tokenMapping: 'Radius',
    tokenMappingLink: '/?path=/docs/tokens_radius--docs',
    responsive: false,
  },
  {
    jsxProp: 'color',
    jsxPropLink: '/?path=/docs/styling-props-colour--docs#color',
    cssProperty: 'color',
    tokenMapping: 'Colour',
    tokenMappingLink: '/?path=/docs/tokens_colour--docs',
    responsive: false,
  },
  {
    jsxProp: 'flex',
    jsxPropLink: '/?path=/docs/styling-props-layout--docs#flex1',
    cssProperty: 'flex',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'focusable',
    jsxPropLink: '/?path=/docs/styling-props-accessibility--docs#focusable',
    cssProperty: 'border and box-shadow',
    tokenMapping: 'Colour',
    tokenMappingLink: '/?path=/docs/tokens_colour--docs',
    responsive: false,
  },
  {
    jsxProp: 'hideBelow',
    jsxPropLink: '/?path=/docs/styling-props-layout--docs#hide-below',
    cssProperty: 'display',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'hideFrom',
    jsxPropLink: '/?path=/docs/styling-props-layout--docs#hide-from',
    cssProperty: 'display',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'maxWidth',
    jsxPropLink: '/?path=/docs/styling-props-sizing--docs#container-widths',
    cssProperty: 'max-width',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'm',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'mx',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-inline',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'my',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-block',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'mb',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-bottom',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'ml',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-left',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'mr',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-right',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'mt',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#margin',
    cssProperty: 'margin-top',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'noGutter',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#nogutter',
    cssProperty: 'margin-block-end',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'p',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'px',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-inline',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'py',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-block',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'pb',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-bottom',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'pl',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-left',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'pr',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-right',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'pt',
    jsxPropLink: '/?path=/docs/styling-props-spacing--docs#padding',
    cssProperty: 'padding-top',
    tokenMapping: 'Spacing',
    tokenMappingLink: '/?path=/docs/tokens_spacing--docs',
    responsive: true,
  },
  {
    jsxProp: 'scrollable',
    jsxPropLink: '/?path=/docs/styling-props-layout--docs#scrollable',
    cssProperty: 'Multiple properties',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'srOnly',
    jsxPropLink: '/?path=/docs/styling-props-screen-readers--docs#sronly',
    cssProperty: 'Multiple properties',
    tokenMapping: 'N/A',
    responsive: true,
  },
  {
    jsxProp: 'stretch',
    jsxPropLink: '/?path=/docs/styling-props-layout--docs#stretch',
    cssProperty: 'align-self, height and flex',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'textAlign',
    jsxPropLink: '/?path=/docs/styling-props-typography--docs#textalign',
    cssProperty: 'text-align',
    tokenMapping: 'N/A',
    responsive: false,
  },
  {
    jsxProp: 'textStyle',
    jsxPropLink: '/?path=/docs/styling-props-typography--docs#textStyle',
    cssProperty: 'font',
    tokenMapping: 'Typography',
    tokenMappingLink: '/?path=/docs/tokens_typography--docs',
    responsive: false,
  },
  {
    jsxProp: 'width',
    jsxPropLink: '/?path=/docs/styling-props-sizing--docs#inputwidths',
    cssProperty: 'width',
    tokenMapping: 'N/A',
    responsive: true,
  },
];

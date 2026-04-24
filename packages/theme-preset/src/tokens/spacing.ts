import {
  spacing as spacingSchema,
  cssVars,
  type IressDesignToken,
} from '@iress-oss/ids-tokens';
import { sizes } from './sizes';

type SpacingKey = keyof typeof cssVars.spacing;

const canonicalSpacing = Object.fromEntries(
  Object.entries(spacingSchema)
    .filter(([key]) => key in cssVars.spacing)
    .map(([key, token]) => [
      `spacing.${key}`,
      {
        description: (token as IressDesignToken).$description,
        value: cssVars.spacing[key as unknown as SpacingKey],
      },
    ]),
);

const aliasSpacing = Object.fromEntries(
  Object.entries(spacingSchema).flatMap(([key, token]) => {
    const aliases = (token as { $extensions?: { 'iress.aliases'?: string[] } })
      .$extensions?.['iress.aliases'];
    if (!aliases || !(key in cssVars.spacing)) return [];
    return aliases.map((alias) => [
      alias,
      {
        description: (token as IressDesignToken).$description,
        value: cssVars.spacing[key as unknown as SpacingKey],
      },
    ]);
  }),
);

const componentSpacing = {
  'button.inline': {
    description: 'Spacing on the left and right of inline button content',
    value: `calc((${cssVars.radius.system._button.topLeft} * 0.25) + ${cssVars.spacing['3']})`,
  },

  'button.iconInline': {
    description: 'Spacing on the left and right of inline button content',
    value: `calc((${cssVars.radius.system._button.topLeft} * 0.25) + ${cssVars.spacing['2']})`,
  },

  'button.block': {
    description: 'Spacing on the top and bottom of block button content',
    value: `calc(${cssVars.radius.system._button.topLeft} * 0.25)`,
  },

  'field.footer': {
    description:
      'Spacing below the field to account for the height of the footer content',
    value: `calc(${cssVars.typography.base.size} * 2)`,
  },

  'slider.tick': {
    description:
      'Spacing between top and bottom of the slider tick marks from the track',
    value: `calc((${sizes['slider.track'].value} - ${sizes['slider.tick'].value}) / 2)`,
  },
};

export const spacing = {
  ...canonicalSpacing,
  ...aliasSpacing,
  ...componentSpacing,
};

export const SPACING_TOKENS = Object.keys(canonicalSpacing);
export const SPACING_AND_ALIAS_TOKENS = Object.keys({
  ...canonicalSpacing,
  ...aliasSpacing,
});

export const MARGIN_TOKENS = [
  ...SPACING_TOKENS,
  ...SPACING_TOKENS.map((token) => `-${token}`),
  'auto',
];

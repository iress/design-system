import colour from './colour';
import radius from './radius';
import spacing from './spacing';
import typography from './typography';

export { defaultFonts } from './typography';

export const designTokens = {
  colour,
  radius,
  spacing,
  typography,
} as const;

export { colour, radius, spacing, typography };

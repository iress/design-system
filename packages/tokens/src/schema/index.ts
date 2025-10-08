import colour from './colour';
import elevation from './elevation';
import radius from './radius';
import spacing from './spacing';
import typography from './typography';

export { defaultFonts } from './typography';

export const designTokens = {
  colour,
  elevation,
  radius,
  spacing,
  typography,
} as const;

export { colour, elevation, radius, spacing, typography };

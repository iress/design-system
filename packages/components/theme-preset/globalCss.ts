import { cssVars } from '@iress-oss/ids-tokens';
import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  body: {
    background: cssVars.colour.neutral[10],
  },
});

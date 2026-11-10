/**
 * --tokens subcommand
 * Generates the token reference from the @iress-oss/ids-tokens schema.
 */

import { generateTokenReference } from './helpers/generate-token-reference';

export async function translateTokens() {
  await generateTokenReference();
}

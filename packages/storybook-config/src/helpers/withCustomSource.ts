/**
 * Uses the string as the custom source for the story, when the generated story source is not sufficient.
 *
 * @param code Code to use as the custom source, usually imported as a raw string from a file: import { code } from './file.tsx?raw';
 * @param language Language of the code to ensure it is highlighted correctly when shown to the user
 * @returns {Record<string, any>} the parameters with the custom source added, usually passed to the story
 */
export const withCustomSource = (
  code: string,
  language = 'tsx',
): Record<string, unknown> => ({
  docs: {
    source: {
      code,
      language,
    },
  },
});

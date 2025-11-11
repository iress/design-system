import { type Parameters } from '@storybook/react';
import { type ReactElementToJSXStringOptions } from '../types';

/**
 * A wrapper to enable easy typing for using a custom JSX transformer in Storybook, as its not well documented.
 *
 * @param jsx The JSX options passed to the transformer (based on: react-element-to-jsx-string), eg. { showFunctions: true }
 * @returns {Parameters} the parameters with the custom jsx options added, usually passed to the story
 */
export const withJsxTransformer = (
  jsx: ReactElementToJSXStringOptions,
): Parameters => ({
  jsx,
});

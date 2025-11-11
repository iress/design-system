import { type Args } from '@storybook/react';
import JSON5 from 'json5';

/**
 * Stringify storybook args, without the nasty JSON formatting so it can look pretty in Storybook code examples.
 *
 * @param {Args} args The args to stringify (eg. { required: true})
 * @returns {string} the stringified args, usually quite close the original args object
 */
export const stringifyStorybookArgs = (args: Args): string =>
  JSON5.stringify(args, null, 2);

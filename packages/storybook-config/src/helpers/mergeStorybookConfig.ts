import { assign } from 'radash';

/**
 * Merges multiple storybook configs into a single config object, suitable as a Meta or StoryObj.
 * @param configs configurations to merge
 * @returns {object} merged configuration
 */
export const mergeStorybookConfig = <T extends object>(...configs: T[]) =>
  assign(
    {},
    configs.reduce((acc, config) => assign(acc, config), {}),
  );

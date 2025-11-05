import type { Args } from '@storybook/react';

/**
 * Disables controls in the UI, but still shows them
 * @param controls The controls to disable
 * @returns {Args} the controls with the disable property set to true, passed to the argTypes of the story
 */
export const disableArgTypes = (controls: string[]): Args =>
  Object.fromEntries(
    new Map(
      controls.map((arg) => [arg, { control: { disable: true, type: {} } }]),
    ),
  );

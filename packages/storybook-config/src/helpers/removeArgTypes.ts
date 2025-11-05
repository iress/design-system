import type { Args } from '@storybook/react';

/**
 * Completely removes the arg from the Storybook UI
 * @param argsToDisable an array of args to disable (prop names)
 * @returns {Args} the args with the table property set to disable: true, usually passed to the argTypes of the story
 */
export const removeArgTypes = (argsToDisable: string[]): Args =>
  Object.fromEntries(
    new Map(argsToDisable.map((arg) => [arg, { table: { disable: true } }])),
  );

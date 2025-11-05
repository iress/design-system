import { type Args } from '@storybook/react';

/**
 * Adds multiple props to a storybook category (which is displayed as an expander in the UI)
 * @param category the category to add the props to
 * @param props the props to add to the category
 * @returns {Args} the props with the category added, passed to the argTypes of the story
 */
export const addToStorybookCategory = <T>(
  category: string,
  props: (keyof T)[],
): Args =>
  Object.fromEntries(
    new Map(props.map((prop) => [prop, { table: { category } }])),
  );

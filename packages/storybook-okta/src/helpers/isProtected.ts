import { ADDON_ID } from '../constants';
import { type AddonConfig } from '../types';
import { type StoryContext, type StoryObj } from '@storybook/react-vite';

export const isProtectedFromContext = (context: StoryObj | StoryContext) => {
  return !(context?.parameters?.[ADDON_ID] as AddonConfig)?.disable;
};

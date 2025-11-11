import { type API } from 'storybook/manager-api';
import { ADDON_ID } from '../constants';
import { type StoryContext, type StoryObj } from '@storybook/react';
import { type AddonConfig } from '../types';

export const isSandboxStory = (api: API) => {
  return isSandboxStoryFromParameters(api.getCurrentStoryData()?.parameters);
};

export const isSandboxStoryFromParameters = (
  parameters?: Record<string, unknown>,
) => {
  return !(parameters?.[ADDON_ID] as AddonConfig)?.disable;
};

export const isSandboxStoryFromContext = (context: StoryObj | StoryContext) => {
  return !(context?.parameters?.[ADDON_ID] as AddonConfig)?.disable;
};

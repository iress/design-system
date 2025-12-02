import { ADDON_ID } from '../constants';
import type { AddonConfig } from '../types';
import type { StoryContext, StoryObj } from '@storybook/react-vite';
import { getAddonConfigForPreview } from '../hooks/useAddonConfig';

export const isProtectedFromContext = (context: StoryObj | StoryContext) => {
  // Check story-level parameters first for disable override
  const storyConfig = context?.parameters?.[ADDON_ID] as
    | AddonConfig
    | undefined;
  if (storyConfig?.disable === true) {
    return false;
  }

  // Fall back to environment configuration
  const config = getAddonConfigForPreview();
  return !config?.disable;
};

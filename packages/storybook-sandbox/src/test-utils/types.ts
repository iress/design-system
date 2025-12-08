import type { Mock } from 'vitest';
import type { API } from 'storybook/manager-api';
import type { StoryContext, Renderer, Args } from 'storybook/internal/types';

export interface MockChannel {
  emit: Mock;
  on: Mock;
  off: Mock;
}

export interface MockAPI extends Partial<API> {
  getChannel: Mock;
}

export interface MockStoryContext
  extends Partial<StoryContext<Renderer, Args>> {
  parameters: {
    docs?: {
      source?: {
        code?: string;
        transform?: Mock;
      };
    };
    [key: string]: unknown;
  };
}

export interface MockIconButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  title?: string;
}

export interface MockCanvasAction {
  title: React.ReactElement | string;
  onClick?: () => void;
}

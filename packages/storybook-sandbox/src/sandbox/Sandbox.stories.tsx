import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { TEMPLATES } from './templates';
import type { AddonConfig, SandboxPreviewProps } from '../';
import { Loader } from 'storybook/internal/components';

const SandboxStub = () => <></>;

export default {
  title: 'Sandbox',
  component: SandboxStub,
  tags: ['IDS_ToggleStories:always-visible', 'vrt:false'],
  args: {
    defaultState: {
      code: TEMPLATES[0]?.state.code,
    },
    loading: () => <Loader>Opening Sandbox...</Loader>,
    scope: {
      default: import('./scopes/default'),
      'react-hook-form': import('./scopes/react-hook-form'),
    },
  },
  parameters: {
    actions: {
      disable: true,
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    chromatic: {
      disable: true,
      disableSnapshot: true,
    },
    IDS_Sandbox: {
      code: TEMPLATES[0]?.state.code ?? '',
      disable: false,
      scopes: ['react-hook-form'],
      templates: TEMPLATES,
    } satisfies AddonConfig,
    layout: 'fullscreen',
    options: {
      selectedPanel: 'IDS_Sandbox',
    },
    toolbar: {
      copy: {
        hidden: true,
      },
    },
  },
} as Meta<SandboxPreviewProps>;

export const Sandbox: StoryObj<SandboxPreviewProps> = {};

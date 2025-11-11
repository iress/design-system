import { type Meta, type StoryObj } from '@storybook/react-vite';
import { TEMPLATES } from './templates';
import { Loader } from 'storybook/internal/components';
import {
  type SandboxPreviewProps,
  type AddonConfig,
  PANEL_ID,
} from '@iress-oss/ids-storybook-sandbox';

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
    interactions: {
      disable: true,
    },
    chromatic: {
      disable: true,
      disableSnapshot: true,
    },
    IDS_Sandbox: {
      code: TEMPLATES[0]?.state.code ?? '',
      disable: false,
      templates: TEMPLATES,
    } satisfies AddonConfig,
    layout: 'fullscreen',
    options: {
      selectedPanel: PANEL_ID,
    },
    toolbar: {
      copy: {
        hidden: true,
      },
    },
  },
} as Meta<SandboxPreviewProps>;

export const Sandbox: StoryObj<SandboxPreviewProps> = {};

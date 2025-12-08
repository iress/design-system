import React from 'react';
import { type Meta } from '@storybook/react-vite';
import { StoryStub } from './StoryStub';
import type { AddonConfig } from '../../types';
import IDSStubHTML from './IDSStub.html?raw';
import IDSStubTemplate from './IDSStub.template?raw';
import { CustomCode } from './CustomCode';
import CustomCodeSource from './CustomCode.tsx?raw';

export default {
  title: 'Components/StoryStub',
  component: StoryStub,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  tags: ['hideInSidebar'],
} as Meta<typeof StoryStub>;

export const IsStub = {
  args: {
    children: 'This is a story stub',
  },
};

export const Library = {
  args: {
    children: 'This will use the IDS library template and HTML',
  },
  parameters: {
    IDS_Sandbox: {
      dependencies: {
        '@iress-oss/ids-components': 'alpha',
      },
      html: IDSStubHTML,
      template: IDSStubTemplate,
    } satisfies AddonConfig,
  },
};

export const Custom = {
  render: () => <CustomCode />,
  parameters: {
    docs: {
      source: {
        code: CustomCodeSource,
      },
    },
  },
};

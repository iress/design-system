import { type Meta } from '@storybook/react-vite';
import { SandboxIcon } from './SandboxIcon';

export default {
  title: 'Components/SandboxIcon',
  component: SandboxIcon,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  tags: ['hideInSidebar'],
} as Meta<typeof SandboxIcon>;

export const Icon = {};

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type FC } from 'react';
import { StartUpLoading } from './StartUpLoading';
import { IressText } from '@/main';

// This is a pattern for IressLoading, hence we change the name
(StartUpLoading as FC).displayName = 'IressLoading';

type Story = StoryObj<typeof StartUpLoading>;

export default {
  title: 'Patterns/Loading/Patterns/StartUp',
  component: StartUpLoading,
  tags: ['beta: '],
} as Meta<typeof StartUpLoading>;

export const StartUp: Story = {
  args: {
    pattern: 'start-up',
    messageList: {
      0: (
        <IressText color="colour.neutral.70">
          Switching applications...
        </IressText>
      ),
      4500: (
        <IressText color="colour.neutral.70">
          This is taking longer than expected...
        </IressText>
      ),
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

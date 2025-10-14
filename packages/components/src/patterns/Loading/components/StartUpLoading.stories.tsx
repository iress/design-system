import { Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
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
      0: <IressText mode="muted">Switching applications...</IressText>,
      4500: (
        <IressText mode="muted">
          This is taking longer than expected...
        </IressText>
      ),
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

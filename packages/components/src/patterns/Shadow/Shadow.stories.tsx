import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressShadow } from '.';
import { IressIcon, IressPanel } from '@/main';
import {
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressShadow>;

export default {
  title: 'Patterns/Shadow',
  component: IressShadow,
  tags: ['beta: '],
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
  },
} as Meta<typeof IressShadow>;

export const Default: Story = {
  args: {
    children: <IressPanel>Content inside shadow DOM</IressPanel>,
  },
};

export const Shadow: Story = {
  args: {
    children: (
      <IressPanel>
        Content inside shadow DOM <IressIcon name="heart_smile" />
      </IressPanel>
    ),
  },
};

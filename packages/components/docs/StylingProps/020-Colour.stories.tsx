import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressPanel, IressText } from '@/main';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Colour',
  component: IressPanel,
} as Meta<typeof IressPanel>;

export const bg: Story = {
  args: {
    bg: 'colour.primary.fill',
    color: 'colour.primary.onFill',
    children: [
      <h5 key="title">Featured panel</h5>,
      <p key="content">
        This is a featured panel, in case you want to highlight something
        important or draw attention to a specific piece of content.
      </p>,
    ],
  },
  parameters: {
    controls: { include: ['bg', 'color'] },
  },
};

export const color: Story = {
  args: {
    children: (
      <p>
        Sometimes actions are{' '}
        <IressText element="strong" color="colour.system.success.text">
          successful
        </IressText>
        , and sometimes they are{' '}
        <IressText element="strong" color="colour.system.danger.text">
          dangerous
        </IressText>
        .
      </p>
    ),
  },
  parameters: {
    controls: { include: ['bg', 'color'] },
  },
};

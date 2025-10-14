import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressImage } from '.';
import { IressStack } from '@/components/Stack';
import { IressText } from '@/components/Text';
import React from 'react';

type Story = StoryObj<typeof IressImage>;
const MAX_WIDTHS = [70, '250px', '50%', undefined] as const;

export default {
  title: 'Components/Image',
  component: IressImage,
  tags: ['beta: '],
} as Meta<typeof IressImage>;

export const Default: Story = {
  args: {
    src: 'https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp',
    alt: 'Placeholder image',
  },
};

export const MaxWidth: Story = {
  ...Default,
  args: {
    ...Default.args,
  },
  render: (args) => (
    <IressStack gap="md">
      {MAX_WIDTHS.map((width, index) => (
        <React.Fragment key={index}>
          <IressText element="h3">{width ?? 'undefined'}</IressText>
          <IressImage {...args} maxWidth={width} />
        </React.Fragment>
      ))}
    </IressStack>
  ),
};

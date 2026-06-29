import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressImage, IressImageProps } from '.';
import { IressStack } from '@/components/Stack';
import { IressText } from '@/components/Text';
import React from 'react';
import { componentStoryMeta } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<IressImageProps & { stylingProps?: boolean }>;
const MAX_WIDTHS = [70, '250px', '50%', undefined] as const;

export default {
  title: 'Components/Image',
  component: IressImage,
  tags: ['beta: '],
  ...componentStoryMeta(componentMeta),
} as Meta<typeof IressImage>;

export const Default: Story = {
  args: {
    src: 'https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp',
    alt: 'Placeholder image',
    maxWidth: '200px',
    stylingProps: true,
  },
  render: ({ stylingProps, ...args }) => (
    <IressImage {...args} />
  ),
};

export const MaxWidth: Story = {
  ...Default,
  args: {
    ...Default.args,
  },
  render: () => (
    <IressStack gap="md">
      <IressText element="h3">70</IressText>
      <IressImage src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp" alt="Placeholder image" maxWidth={70} />

      <IressText element="h3">250px</IressText>
      <IressImage src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp" alt="Placeholder image" maxWidth="250px" />

      <IressText element="h3">50%</IressText>
      <IressImage src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp" alt="Placeholder image" maxWidth="50%" />

      <IressText element="h3">undefined</IressText>
      <IressImage src="https://www.fdcbuilding.com.au/wp-content/webp-express/webp-images/uploads/2020/01/4-1.jpg.webp" alt="Placeholder image" />
    </IressStack>
  ),
};

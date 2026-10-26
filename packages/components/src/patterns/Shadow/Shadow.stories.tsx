import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressShadow } from '.';
import { IressIcon, IressPanel } from '@/main';
import {
  componentStoryMeta,
  reactNodeArgType,
} from '@iress-oss/ids-storybook-config';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

type Story = StoryObj<typeof IressShadow>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The shadow DOM host element',
    testId: 'shadow',
  },
];

export default {
  title: 'Patterns/Shadow',
  component: IressShadow,
  tags: ['beta: '],
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
    },
    idsConfig: {
      testMeta,
    },
  }),
} as Meta<typeof IressShadow>;

export const Shadow: Story = {
  args: {
    children: (
      <IressPanel>
        Content inside shadow DOM <IressIcon name="heart_smile" />
      </IressPanel>
    ),
  },
};

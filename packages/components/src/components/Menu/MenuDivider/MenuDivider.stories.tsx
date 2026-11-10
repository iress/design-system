import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressMenuDivider } from '@/main';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import { stylingProps } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressMenuDivider>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the menu divider',
    query: <code>getByRole('separator')</code>,
    testId: 'menu-divider',
  },
];

export default {
  title: 'Components/Menu/MenuDivider',
  component: IressMenuDivider,
  argTypes: stylingProps,
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressMenuDivider>;

export const Divider: Story = {};

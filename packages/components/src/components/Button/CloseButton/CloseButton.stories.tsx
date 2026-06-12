import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCloseButton } from '..';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressCloseButton>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the close button',
    query: <code>getByRole('button', {'{'} name: 'Close' {'}'})</code>,
    testId: 'close-button',
  },
];

export default {
  title: 'Components/Button/CloseButton',
  component: IressCloseButton,
  tags: ['updated'],
  argTypes: {
    append: reactNodeArgType,
    children: reactNodeArgType,
    prepend: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressCloseButton>;

export const CloseButton: Story = {};

import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressSelectHeading,
  type IressSelectHeadingProps,
} from './SelectHeading';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  addToStorybookCategory,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelectHeading>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the select heading',
    testId: 'select-heading',
  },
];

export default {
  title: 'Components/Select/Subcomponents/Heading',
  component: IressSelectHeading,
  argTypes: {
    children: reactNodeArgType,
    ...stylingProps,
    ...addToStorybookCategory<IressSelectHeadingProps>('MenuText props', [
      'append',
      'divider',
      'prepend',
    ]),
    ...addToStorybookCategory<IressSelectHeadingProps>('Text props', [
      'noGutter',
    ]),
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressSelectHeading>;

export const Heading: Story = {
  args: {
    children: 'Selected (2)',
    clearAll: true,
  },
};

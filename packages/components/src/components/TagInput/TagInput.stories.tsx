import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTagInput } from './TagInput';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import { stylingProps } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressTagInput>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the tag input',
    query: <code>getByRole('textbox')</code>,
    testId: 'tag-input',
  },
  {
    part: 'tag',
    description: 'An individual tag element',
    testId: 'tag-input__tag',
  },
];

export default {
  title: 'Components/TagInput',
  component: IressTagInput,
  tags: ['updated'],
  argTypes: stylingProps,
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressTagInput>;

export const TagInput: Story = {
  args: {
    defaultValue: ['Tag'],
    placeholder: 'Type and hit enter to add a tag',
    tagLimit: 999,
  },
};

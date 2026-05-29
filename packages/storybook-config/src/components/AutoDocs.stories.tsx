import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryStub } from './mocks/StoryStub';
import type { ParametersConfig } from '../types';

type Story = StoryObj<typeof StoryStub>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof StoryStub> = {
  title: 'Components/AutoDocs',
  component: StoryStub,
  parameters: {
    idsConfig: {
      autodocsTemplate: 'component',
      guidelinesUrl: (title) => {
        const slug = title.toLowerCase().replace(/\s*\/\s*/g, '/');
        return `https://iress.github.io/design-system/#/${slug}`;
      },
      testMeta: [
        {
          part: 'autodocs',
          description: 'The root of the component',
          role: <code>getByRole('nothing')</code>,
          testId: 'autodocs',
        },
      ],
    } satisfies ParametersConfig['idsConfig'],
  },
};

export default meta;

export const Playground: Story = {
  render: () => <StoryStub />,
};

export const Example: Story = {
  render: (args) => <StoryStub {...args} />,
};

export const Recipe: Story = {
  render: () => <StoryStub />,
  tags: ['recipe'],
};

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressValidationSummary } from '@/main';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressValidationSummary>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the validation summary',
    query: <code>getByRole('list')</code>,
    testId: 'validation-summary',
  },
  {
    part: 'error',
    description: 'An individual validation message',
    testId: 'validation-summary__error',
  },
];

export default {
  title: 'Components/ValidationMessage/ValidationSummary',
  component: IressValidationSummary,
  argTypes: {
    prefix: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressValidationSummary>;

export const ValidationSummary: Story = {
  args: {
    messages: [
      {
        message: 'Something you should know.',
        status: 'info',
      },
      {
        message: 'Something is wrong.',
        status: 'danger',
      },
      {
        message: 'Something could go wrong.',
        status: 'warning',
      },
      {
        message: 'Something went right.',
        status: 'success',
      },
    ],
  },
};

import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressButton,
  IressForm,
  IressFormField,
  IressFormValidationSummary,
  IressInput,
} from '@/main';
import { reactNodeArgType, removeArgTypes, stylingProps, type TestComponentMeta } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressFormValidationSummary>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The alert container showing validation errors',
    query: <code>getByRole('alert')</code>,
    testId: 'form-validation-summary',
  },
];

export default {
  title: 'Patterns/Form/FormValidationSummary',
  component: IressFormValidationSummary,
  argTypes: {
      ...removeArgTypes(['ref']),
      children: reactNodeArgType,
      ...stylingProps,
    },
  parameters: {
    idsConfig: { testMeta },
  },
  decorators: [
    (Story) => (
      <IressForm alert={<Story />}>
        <IressFormField
          name="name"
          label="Name"
          rules={{ required: 'Name is required' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressFormField
          name="email"
          label="Email"
          rules={{ required: 'Email is required' }}
          render={(controlledProps) => <IressInput {...controlledProps} />}
        />
        <IressButton type="submit" mode="primary">
          Submit
        </IressButton>
      </IressForm>
    ),
  ],
} as Meta<typeof IressFormValidationSummary>;

export const Default: Story = {
  args: {},
};

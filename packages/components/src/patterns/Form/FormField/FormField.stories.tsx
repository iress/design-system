import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressForm,
  IressFormField,
  type IressFormFieldProps,
  IressInput,
  IressText,
} from '@/main';
import {
  disableArgTypes,
  mergeStorybookConfig,
  addToStorybookCategory,
} from '@iress-oss/ids-storybook-config';
import { reactNodeArgType, stylingProps } from '@theme-preset/storybookHelpers';

type Story = StoryObj<typeof IressFormField>;

export default {
  title: 'Patterns/Form/FormField',
  component: IressFormField,
  args: {
    label: 'Label',
    name: 'field',
    render: (controlledProps) => <IressInput {...controlledProps} />,
  },
  argTypes: {
    ...mergeStorybookConfig(
      disableArgTypes(['render']),
      addToStorybookCategory<IressFormFieldProps>('React Hook Forms', [
        'control',
        'defaultValue',
        'shouldUnregister',
      ]),
      addToStorybookCategory<IressFormFieldProps>('Field props', [
        'error',
        'errorMessages',
        'hiddenLabel',
        'hint',
      ]),
      {
        label: reactNodeArgType,
        error: reactNodeArgType,
        supplementary: reactNodeArgType,
        ...stylingProps,
      },
    ),
  },
  decorators: [
    (Story) => (
      <IressForm>
        <Story />
      </IressForm>
    ),
  ],
} as Meta<typeof IressFormField>;

export const Default: Story = {};

export const RenderSupplementary: Story = {
  name: 'Supplementary content',
  args: {
    label: 'Comment',
    name: 'comment',
    hint: 'Enter your feedback (max 200 characters)',
    render: (controlledProps) => (
      <IressInput
        {...controlledProps}
        rows={3}
        maxLength={200}
        placeholder="Type your comment here..."
      />
    ),
    renderSupplementary: ({ value }) => (
      <IressText textStyle="typography.body.sm" color="muted">
        {(value as string)?.length || 0} / 200 characters
      </IressText>
    ),
    rules: {
      maxLength: {
        value: 200,
        message: 'Comment must not exceed 200 characters',
      },
    },
  },
};

export const BugReproduction: Story = {
  name: 'Bug: LastPass Autofill Freeze',
  args: {
    label: 'Email',
    name: 'email',
    hint: 'Test with LastPass extension autofill',
    render: (controlledProps) => (
      <IressInput
        {...controlledProps}
        type="email"
        placeholder="Enter your email"
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
**Problem Summary:** Page becomes unresponsive when using LastPass extension to autofill IressInput within IressFormField

**Expected Behavior:** LastPass autofill should work normally without freezing the page

**Actual Behavior:** Page freezes when clicking the LastPass autofill button for this input field

**How to Test:**
1. Install LastPass browser extension
2. Click the LastPass autofill icon on the input field
3. Before fix: Page freezes (infinite render loop)
4. After fix: Autofill works normally without freeze

**Root Cause:** The \`handleRef\` callback in \`useFieldRenderProps\` hook triggers an infinite loop when LastPass (or other extensions) call the ref callback during autofill. The state update from \`setExtraString\` causes a re-render, which creates a new ref callback, triggering the cycle again.
        `,
      },
    },
  },
};

import { type StoryObj, type Meta } from '@storybook/react';
import { IressFieldGroup } from './FieldGroup';
import {
  IressButton,
  IressField,
  type IressFieldProps,
  IressIcon,
  IressInput,
  type IressInputProps,
  IressPanel,
  IressPopover,
  IressReadonly,
  IressRichSelect,
  IressSelect,
} from '@/main';
import {
  disableArgTypes,
  STORYBOOK_ONLY_CATEGORY,
} from '@iress-oss/ids-storybook-config';

interface FieldAndInputProps {
  field: IressFieldProps;
  input: IressInputProps;
}

type IressFieldGroupPropsAndCustomArgs = React.ComponentProps<
  typeof IressFieldGroup
> & {
  inputs: FieldAndInputProps[];
};

type Story = StoryObj<IressFieldGroupPropsAndCustomArgs>;

const defaultInputs: FieldAndInputProps[] = [
  {
    field: {
      htmlFor: 'title',
      label: 'Title',
    },
    input: {
      id: 'title',
      name: 'title',
      type: 'text',
      width: '2',
    },
  },
  {
    field: {
      htmlFor: 'firstName',
      label: 'First name',
      required: true,
    },
    input: {
      id: 'firstName',
      name: 'firstName',
      required: true,
      type: 'text',
    },
  },
  {
    field: {
      htmlFor: 'lastName',
      label: 'Last name',
      required: true,
    },
    input: {
      id: 'lastName',
      name: 'lastName',
      required: true,
      type: 'text',
    },
  },
];

export default {
  title: 'Components/Field/FieldGroup',
  argTypes: {
    ...disableArgTypes(['children']),
    inputs: {
      name: 'Input settings',
      type: 'array',
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
      defaultValue: defaultInputs,
    },
  },
  component: IressFieldGroup,
} as Meta<typeof IressFieldGroup>;

export const Default: Story = {
  args: {
    label: 'Full name',
    inputs: defaultInputs,
  },
  render: ({ inputs, ...args }) => (
    <IressFieldGroup {...args}>
      {inputs?.map(({ field, input }: FieldAndInputProps, index) => (
        <IressField key={field.htmlFor ?? index} {...field}>
          <IressInput {...input} />
        </IressField>
      ))}
    </IressFieldGroup>
  ),
};

export const Inline: Story = {
  ...Default,
  args: {
    ...Default.args,
    inline: true,
  },
};

export const InlineSink: Story = {
  ...Default,
  args: {
    ...Default.args,
    inline: true,
  },
  render: (args) => (
    <form>
      <IressFieldGroup {...{ ...args, inputs: undefined }}>
        <IressField label="Emoji" htmlFor="emoji">
          <IressRichSelect
            width="2"
            id="emoji"
            options={[
              { label: '🐶', value: 'dog' },
              { label: '🐱', value: 'cat' },
              { label: '🐭', value: 'mouse' },
            ]}
            container={document.body}
          />
        </IressField>

        <IressField label="Title" htmlFor="title">
          <IressSelect width="2" id="title">
            <option value="mr">Mr</option>
            <option value="mrs">Mrs</option>
            <option value="miss">Miss</option>
          </IressSelect>
        </IressField>

        <IressField label="First name" htmlFor="firstName" required>
          <IressInput id="firstName" required />
        </IressField>

        <IressField label="Last name" htmlFor="lastName" required>
          <IressInput id="lastName" required />
        </IressField>

        <IressButton type={IressButton.Type.Submit}>Submit</IressButton>

        <IressPopover
          activator={
            <IressButton>
              <IressIcon name="cog" />
            </IressButton>
          }
        >
          <IressPanel>Settings goes here</IressPanel>
        </IressPopover>
      </IressFieldGroup>
    </form>
  ),
};

export const InlineAndReadonly: Story = {
  ...Default,
  args: {
    ...Default.args,
    inline: true,
  },
  render: (args) => (
    <form>
      <IressFieldGroup {...{ ...args, inputs: undefined }}>
        <IressField label="Title" htmlFor="title">
          <IressSelect width="2" id="title">
            <option value="mr">Mr</option>
            <option value="mrs">Mrs</option>
            <option value="miss">Miss</option>
          </IressSelect>
        </IressField>

        <IressField label="First name" htmlFor="firstName" required>
          <IressInput id="firstName" required />
        </IressField>

        <IressField label="Last name" htmlFor="lastName">
          <IressReadonly id="lastName" value="Skywalker" />
        </IressField>

        <IressButton type={IressButton.Type.Submit}>Submit</IressButton>

        <IressPopover
          activator={
            <IressButton>
              <IressIcon name="cog" />
            </IressButton>
          }
        >
          <IressPanel>Settings goes here</IressPanel>
        </IressPopover>
      </IressFieldGroup>
    </form>
  ),
};

export const Join: Story = {
  ...Default,
  args: {
    ...Default.args,
    join: true,
  },
};

export const JoinSink: Story = {
  ...InlineSink,
  args: {
    ...InlineSink.args,
    join: true,
  },
};

export const JoinAndReadonly: Story = {
  ...InlineAndReadonly,
  args: {
    ...InlineAndReadonly.args,
    join: true,
  },
};

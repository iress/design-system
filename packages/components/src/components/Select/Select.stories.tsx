import { type Meta, type StoryObj } from '@storybook/react';
import { IressSelect, IressSelectOption } from '.';
import { IressStack } from '../Stack';
import { FORM_ELEMENT_WIDTHS } from '@/constants';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressSelect>;

export default {
  title: 'Components/Select',
  component: IressSelect,
  argTypes: {
    ...disableArgTypes(['children']),
  },
} as Meta<typeof IressSelect>;

export const Options: Story = {
  args: {
    children: [
      <option value="1" key="1">
        Option 1
      </option>,
      <option value="2" key="2">
        Option 2
      </option>,
      <option value="3" key="3">
        Option 3
      </option>,
      <option value="4" key="4">
        Option 4
      </option>,
      <option value="5" key="5">
        Option 5
      </option>,
    ],
  },
};

export const OptionGroups: Story = {
  args: {
    children: [
      <optgroup label="Group 1" key="1">
        <option value="1-1" key="1-1">
          Group 1 / Option 1
        </option>
        <option value="1-2" key="1-2">
          Group 1 / Option 2
        </option>
        <option value="1-3" key="1-3">
          Group 1 / Option 3
        </option>
        <option value="1-4" key="1-4">
          Group 1 / Option 4
        </option>
        <option value="1-5" key="1-5">
          Group 1 / Option 5
        </option>
      </optgroup>,
      <optgroup label="Group 2" key="2">
        <option value="2-1" key="2-1">
          Group 2 / Option 1
        </option>
        <option value="2-2" key="2-2">
          Group 2 / Option 2
        </option>
        <option value="2-3" key="2-3">
          Group 2 / Option 3
        </option>
        <option value="2-4" key="2-4">
          Group 2 / Option 4
        </option>
        <option value="2-5" key="2-5">
          Group 2 / Option 5
        </option>
      </optgroup>,
    ],
  },
};

export const NonStringValues: Story = {
  args: {
    children: [
      <IressSelectOption value={1} key="0-1">
        Option 1
      </IressSelectOption>,
      <IressSelectOption value={2} key="0-2">
        Option 2
      </IressSelectOption>,
      <optgroup label="Group 1" key="1">
        <IressSelectOption value="1-1" key="1-1">
          Group 1 / Option 1
        </IressSelectOption>
        <IressSelectOption value="1-2" key="1-2">
          Group 1 / Option 2
        </IressSelectOption>
        <IressSelectOption value="1-3" key="1-3">
          Group 1 / Option 3
        </IressSelectOption>
      </optgroup>,
    ],
  },
};

export const Placeholder: Story = {
  args: {
    ...Options.args,
    placeholder: 'Please select an option',
  },
};

export const SelectedOption: Story = {
  args: {
    ...Options.args,
    defaultValue: 3,
  },
};

export const Sizing: Story = {
  args: {
    ...Options.args,
  },
  argTypes: {
    ...disableArgTypes(['placeholder', 'width']),
  },
  render: (args) => (
    <IressStack gutter="md">
      {FORM_ELEMENT_WIDTHS.map((width) => (
        <div key={width}>
          <IressSelect {...args} placeholder={width} width={width} />
        </div>
      ))}
    </IressStack>
  ),
};

export const Readonly: Story = {
  args: {
    ...Options.args,
    value: '2',
    readonly: true,
  },
};

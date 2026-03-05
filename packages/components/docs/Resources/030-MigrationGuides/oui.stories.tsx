import { DiffViewer } from '@iress-oss/ids-storybook-config';
import { type Meta, type StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof DiffViewer>;

export default {
  title: 'Resources/Migration Guides/From OUI to v6',
  component: DiffViewer,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      disable: true,
    },
  },
} as Meta<typeof DiffViewer>;

// --- 1. Dependencies ---

export const UpdateDependencies: Story = {
  args: {
    oldValue: `{
  "dependencies": {
    "@iress/oui": "4.10.1",
    "@iress/components-react": "4.19.4",
    "formik": "2.4.4",
    "yup": "0.32.11"
  }
}`,
    newValue: `{
  "dependencies": {
    "@iress-oss/ids-components": "^6.0.0",
    "@iress-oss/ids-tokens": "^6.0.0",
    "react-hook-form": "^7.0.0"
  }
}`,
  },
};

export const UpdateImports: Story = {
  args: {
    oldValue: `// OUI imports
import { Button, Input, Modal } from '@iress/oui';

// IDS v4 imports
import { IressButton, IressText } from '@iress/components-react';`,
    newValue: `// OUI imports
import { IressButton, IressInput, IressModal } from '@iress-oss/ids-components';

// IDS v4 imports
import { IressButton, IressText } from '@iress-oss/ids-components';`,
  },
};

// --- 2. OUI component mapping ---

export const ButtonMigration: Story = {
  args: {
    oldValue: `<Button variant="primary" onClick={handleClick} disabled={false}>
  Submit
</Button>`,
    newValue: `<IressButton mode="primary" onClick={handleClick} disabled={false}>
  Submit
</IressButton>`,
  },
};

export const ProgressBarMigration: Story = {
  args: {
    oldValue: `<ProgressBar value={50} max={100} />`,
    newValue: `<IressProgress value={50} max={100} />`,
  },
};

export const BadgeMigration: Story = {
  args: {
    oldValue: `<Badge variant="info">New</Badge>`,
    newValue: `<IressPill mode="info">New</IressPill>`,
  },
};

export const ModalMigration: Story = {
  args: {
    oldValue: `<Modal isOpen={isOpen} onClose={onClose} title="Confirm">
  Content
</Modal>`,
    newValue: `<IressModal show={isOpen} onShowChange={setIsOpen} heading="Confirm">
  Content
</IressModal>`,
  },
};

export const DropdownMenuMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `<DropdownButton>
  <MenuItem onClick={action1}>Action 1</MenuItem>
  <MenuItem onClick={action2}>Action 2</MenuItem>
</DropdownButton>`,
    newValue: `<IressDropdownMenu
  label="Actions"
  options={[
    { label: 'Action 1', value: 'action1' },
    { label: 'Action 2', value: 'action2' },
  ]}
  onChange={(value) => handleAction(value)}
/>`,
  },
};

export const DropdownSelectMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `<DropdownButton>
  <MenuItem value="opt1">Option 1</MenuItem>
  <MenuItem value="opt2">Option 2</MenuItem>
</DropdownButton>`,
    newValue: `<IressFormField
  name="selection"
  label="Choose option"
  render={(props) => (
    <IressSelect
      {...props}
      options={[
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
      ]}
    />
  )}
/>`,
  },
};

export const ScrollableMigration: Story = {
  args: {
    oldValue: `<Scrollable height="300px" maxHeight="500px">
  <Content />
</Scrollable>`,
    newValue: `<IressPanel scrollable="y" style={{ height: '300px', maxHeight: '500px' }}>
  <Content />
</IressPanel>`,
  },
};

// --- 3. Form migration ---

export const InputMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `<Input type="text" value={value} onChange={onChange} placeholder="Enter text" required />`,
    newValue: `<IressFormField
  name="fieldName"
  label="Label Text"
  render={(props) => <IressInput {...props} type="text" placeholder="Enter text" />}
  rules={{ required: 'This field is required' }}
/>`,
  },
};

export const TextAreaMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `<TextArea value={value} onChange={onChange} rows={5} />`,
    newValue: `<IressFormField
  name="textField"
  label="Description"
  render={(props) => <IressInput {...props} rows={5} />}
/>`,
  },
};

export const LabelMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `<Label htmlFor="fieldId">Field Label</Label>
<Input id="fieldId" />`,
    newValue: `<IressFormField
  name="fieldName"
  label="Field Label"
  render={(props) => <IressInput {...props} />}
/>`,
  },
};

export const FieldsetMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `<Fieldset legend="Personal Info">
  <Label>Name</Label>
  <Input name="name" />
</Fieldset>`,
    newValue: `<IressFieldGroup label="Personal Info">
  <IressFormField
    name="name"
    label="Name"
    render={(props) => <IressInput {...props} />}
  />
</IressFieldGroup>`,
  },
};

export const RadioGroupMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `<RadioGroup name="gender" value={value} onChange={onChange}>
  <Radio value="male">Male</Radio>
  <Radio value="female">Female</Radio>
</RadioGroup>`,
    newValue: `<IressFormField
  name="gender"
  label="Gender"
  render={(props) => (
    <IressRadioGroup {...props}>
      <IressRadio value="male">Male</IressRadio>
      <IressRadio value="female">Female</IressRadio>
    </IressRadioGroup>
  )}
/>`,
  },
};

export const CheckboxMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `<Checkbox checked={checked} onChange={onChange}>Accept terms</Checkbox>`,
    newValue: `<IressFormField
  name="acceptTerms"
  render={(props) => (
    <IressCheckbox {...props}>Accept terms</IressCheckbox>
  )}
  rules={{ required: 'You must accept terms' }}
/>`,
  },
};

// --- 5. Testing migration ---

export const RemoveTestUtils: Story = {
  args: {
    oldValue: `// jest.setup.js or vitest.setup.ts
import { mockLazyLoadedComponents } from '@iress/ids-react-test-utils/dist/react-test-utils/src/mocks/mockLazyLoadedComponents';
mockLazyLoadedComponents();`,
    newValue: `// jest.setup.js or vitest.setup.ts
import '@testing-library/jest-dom';`,
  },
};

export const AccessibilityQueries: Story = {
  args: {
    oldValue: `const button = await findByTestId('submit-btn__button');
idsFireEvent.click(button);`,
    newValue: `const button = getByRole('button', { name: 'Submit' });
fireEvent.click(button);`,
  },
};

export const JestVitestConfig: Story = {
  args: {
    allowModeChange: true,
    oldValue: `// Transform patterns
{
  transformIgnorePatterns: [
    "node_modules/(?!(@iress/components-react|@iress/components|@stencil/core)/)"
  ]
}

// CSS module mocking
{
  moduleNameMapper: {
    "ids-web-components.css$": "<rootDir>/test/style-mock.ts"
  }
}`,
    newValue: `// Transform patterns
{
  transformIgnorePatterns: [
    "/node_modules/(?!@iress-oss/ids-components)"
  ]
}

// CSS module mocking
{
  moduleNameMapper: {
    "@iress-oss/ids-components/(.*).css": "<rootDir>/test/style-mock.ts"
  }
}`,
  },
};

export const FormTestMigration: Story = {
  args: {
    allowModeChange: true,
    oldValue: `test('form validation', async () => {
  const { findByTestId } = render(<Form />);
  const input = await findByTestId('email__input');
  idsFireEvent.click(await findByTestId('submit-btn__button'));
  const error = await findByTestId('email__error');
  expect(error).toBeInTheDocument();
});`,
    newValue: `test('form validation', async () => {
  const { getByRole, findByText } = render(<Form />);
  fireEvent.click(getByRole('button', { name: 'Submit' }));
  expect(await findByText('Email is required')).toBeInTheDocument();
});`,
  },
};

import { DiffViewer } from '@iress-oss/ids-storybook-config';
import { type Meta, type StoryObj } from '@storybook/react-vite';

type Story = StoryObj<typeof DiffViewer>;

export default {
  title: 'Resources/Migration Guides/From v4 to v5',
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

export const ComponentsImport: Story = {
  args: {
    oldValue: `import { IressButton } from '@iress/components-react';`,
    newValue: `import { IressButton } from '@iress-oss/ids-components';`,
  },
};

export const MigrateComponentsOneByOne: Story = {
  args: {
    oldValue: `import { IressModal, IressButton } from '@iress/components-react';`,
    newValue: `import { IressModal } from '@iress/components-react';
import { IressButton } from '@iress-oss/ids-components';`,
  },
};

export const JestModuleNameMapper: Story = {
  args: {
    oldValue: `
  "moduleNameMapper": {
    "^.+\\.(scss|less)$": "<rootDir>/test/style-mock.ts",
    "ids-web-components.css$": "<rootDir>/test/style-mock.ts",
    "global.css$": "<rootDir>/test/style-mock.ts"
  },
`,
    newValue: `
  "moduleNameMapper": {
    "^.+\\.(scss|less)$": "<rootDir>/test/style-mock.ts",
    "ids-web-components.css$": "<rootDir>/test/style-mock.ts",
    "global.css$": "<rootDir>/test/style-mock.ts",
    "@iress-oss/ids-components/(.*).css": "<rootDir>/test/style-mock.ts"
  },`,
  },
};

export const TestDiff: Story = {
  args: {
    allowModeChange: true,
    oldValue: `import { render } from '@testing-library/react';
import { idsFireEvent } from '@iress/ids-react-test-utils';
  
test('login form', async () => {
    const loginMock = jest.fn();
    const screen = render(<LoginForm loginUser={loginMock}/>);

    const usernameInput = await screen.findByTestId('username__input');
    const passwordInput = await screen.findByTestId('password__input');
    const submitBtn = await screen.findByTestId('submit-btn__button');

    idsFireEvent.change(usernameInput, { target: { value: 'joe.bloggs' }});
    idsFireEvent.change(passwordInput, { target: { value: '1234' }});
    idsFireEvent.click(submitBtn);

    expect(loginMock).toHaveBeenCalledWith("joe.bloggs", "1234");
});`,
    newValue: `import { render, fireEvent } from '@testing-library/react';

test('login form', () => {
    const loginMock = jest.fn();
    const screen = render(<LoginForm loginUser={loginMock}/>);

    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
    const passwordInput = screen.getByRole('textbox', { name: 'Password' });
    const submitBtn = screen.getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'joe.bloggs' }});
    fireEvent.change(passwordInput, { target: { value: '1234' }});
    fireEvent.click(submitBtn);

    expect(loginMock).toHaveBeenCalledWith("joe.bloggs", "1234");
});`,
  },
};

export const AgGridTheme: Story = {
  args: {
    allowModeChange: true,
    oldValue: `import "@iress/themes/build/css/iress-theme-dark.css";
import "@iress/themes/global.css";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@iress/ag-grid-theme/dist/lite/css/all.css';

// You can also include variables, styles and utilities separately for easy debugging
// import '@iress/ag-grid-theme/dist/lite/css/variables.css';
// import '@iress/ag-grid-theme/dist/lite/css/styles.css';
// import '@iress/ag-grid-theme/dist/lite/css/utilities.css';

<div className="ag-theme-alpine ag-theme-iress-lite">
  <AgGridReact />
</div>`,
    newValue: `import "@iress/themes/build/css/iress-theme-dark.css";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@iress/ag-grid-theme/dist/ag-theme-iress-lite.css';

// You can also include variables, styles and utilities separately for easy debugging
// import '@iress/ag-grid-theme/dist/css/variables.css';
// import '@iress/ag-grid-theme/dist/css/styles.css';
// import '@iress/ag-grid-theme/dist/css/utilities.css';

<div className="ag-theme-alpine ag-theme-iress-lite">
  <AgGridReact />
</div>
`,
  },
};

export const RemoveGlobalCss: Story = {
  args: {
    oldValue: `import '@iress/themes/global.css';`,
    newValue: `<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap"
  rel="stylesheet"
/>`,
  },
};

export const RemoveFromJestTransforms: Story = {
  args: {
    oldValue: `"transformIgnorePatterns": [
  "node_modules/(?!(@iress/components-react|@iress/components|@iress/components-react-custom-elements|@stencil/core)/)"
]`,
    newValue: `"transformIgnorePatterns": [
  "/node_modules/(?!@iress-oss/ids-components)"
]`,
  },
};

export const RemoveFromJestSetup: Story = {
  args: {
    oldValue: `import { mockLazyLoadedComponents } from '@iress/ids-react-test-utils/dist/react-test-utils/src/mocks/mockLazyLoadedComponents';
mockLazyLoadedComponents();`,
    newValue: ``,
  },
};

export const RemoveFromJestModuleMapper: Story = {
  args: {
    oldValue: `"moduleNameMapper": {
  "\\.css$": "<rootDir>/PATH/TO/style-mock.ts"
}`,
    newValue: ``,
  },
};

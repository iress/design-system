import { render, screen } from '@testing-library/react';
import { type API } from 'storybook/internal/manager-api';
import { ADDON_ID, ADDON_TITLE_SHORT } from '../constants';
import { SandboxOpenInSandbox } from './SandboxOpenInSandbox';
import { getOpenCodeUrl } from '../helpers';

// Mock window location
const originalLocation: Location = window.location;

beforeEach(() => {
  delete (window as Partial<Window>).location;
  (window.location as Location) = new URL(
    'http://localhost',
  ) as unknown as Window['location'];
});

afterAll(() => {
  (window.location as Location) = originalLocation;
});

// Mocking the Storybook API
const parameters = {
  [ADDON_ID]: {
    disable: false,
    openInStoryId: 'sandbox',
  },
};
const api = {
  getCurrentStoryData: () => ({
    parameters,
  }),
} as unknown as API;

describe('SandboxOpenInSandbox', () => {
  it('renders a link with the code url', () => {
    render(
      <SandboxOpenInSandbox
        api={api}
        code="<IressText>Hello world</IressText>"
      />,
    );

    const link = screen.getByRole('link', { name: ADDON_TITLE_SHORT });
    expect(link).toHaveClass('sandbox-open-in-sandbox');
    expect(link).toHaveAttribute(
      'href',
      getOpenCodeUrl(
        '<IressText>Hello world</IressText>',
        window.location,
        parameters,
      ),
    );
  });

  it('renders nothing if no sandbox story', () => {
    parameters[ADDON_ID].openInStoryId = '';

    render(
      <SandboxOpenInSandbox
        api={api}
        code="<IressText>Hello world</IressText>"
      />,
    );

    const link = screen.queryByRole('link', { name: ADDON_TITLE_SHORT });
    expect(link).not.toBeInTheDocument();
  });
});

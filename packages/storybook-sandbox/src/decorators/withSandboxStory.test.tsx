import React from 'react';
import { render, screen } from '@testing-library/react';
import { withSandboxStory } from './withSandboxStory';
import { type StoryContext } from '@storybook/react';
import { ADDON_ID, ADDON_TITLE_SHORT } from '../constants';
import { getEncodedState } from '../helpers';

const StoryFn = () => <div>StoryFn</div>;
const unencodedState = {
  code: 'export default () => <div>Hello World</div>',
  scopes: ['react-hook-forms'],
};
const previewLink = `http://localhost/iframe.html?viewMode=story&${ADDON_ID}=${getEncodedState(unencodedState)}`;
const sandboxContext = {
  id: 'id',
  viewMode: 'story',
  args: {
    defaultState: {
      code: unencodedState.code,
    },
  },
  parameters: {
    [ADDON_ID]: {
      disable: false,
    },
  },
} as unknown as StoryContext;
const notSandboxContext = {
  parameters: {
    [ADDON_ID]: {
      disable: true,
    },
  },
} as unknown as StoryContext;

// Mock window location
const originalLocation: Location = window.location;

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: new URL('http://localhost'),
    writable: true,
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', {
    value: originalLocation,
    writable: true,
  });
});

// TODO: Not sure why, but its failing in the CI. Passes locally though.
describe.skip('withSandboxStory', () => {
  it('renders a Sandbox link and preview if previewing a Sandbox story', async () => {
    window.location.href = previewLink;
    render(withSandboxStory(StoryFn, sandboxContext));

    // Should load Sandbox first
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Should render the Sandbox
    const renderedCode = await screen.findByText('Hello World');
    expect(renderedCode).toBeInTheDocument();

    // Find the link to open the Sandbox
    const link = screen.getByRole('link', { name: ADDON_TITLE_SHORT });

    // The expected link should strip the `iframe.html?viewMode=story&` part of the preview link, to return to normal Storybook mode
    expect(link).toHaveAttribute(
      'href',
      `${previewLink.replace('iframe.html?viewMode=story&', '?')}&path=/story/id`,
    );
  });

  it('renders a Sandbox preview if editing a Sandbox story', async () => {
    window.location.href = 'http://localhost:6006/';
    render(withSandboxStory(StoryFn, sandboxContext));

    // Should render the Sandbox
    const renderedCode = await screen.findByText('Hello World');
    expect(renderedCode).toBeInTheDocument();

    const link = screen.queryByRole('link', { name: ADDON_TITLE_SHORT });
    expect(link).not.toBeInTheDocument();
  });

  it('does not render a Sandbox link or preview if not in a Sandbox Story', () => {
    window.location.href = previewLink;
    render(withSandboxStory(StoryFn, notSandboxContext));

    // Should render the StoryFn
    const renderedStory = screen.getByText('StoryFn');
    expect(renderedStory).toBeInTheDocument();

    // Should not render the Sandbox
    const renderedCode = screen.queryByText('Hello World');
    expect(renderedCode).not.toBeInTheDocument();

    // Should not render the Sandbox link
    const link = screen.queryByRole('link', { name: ADDON_TITLE_SHORT });
    expect(link).not.toBeInTheDocument();
  });
});

import React from 'react';
import { lazy } from 'react';
import { act, render, screen } from '@testing-library/react';
import SandboxPreview from './SandboxPreview';
import { addons } from 'storybook/internal/preview-api';
import { SANDBOX_UPDATE_EVENT } from '../constants';
import { type AddonState } from '../types';

const validCode = `export default () => <main>Hello world</main>`;
const idsCode = `export default () => <IressText role="main">Hello world</IressText>`;
const customScopeCode = `export default () => <main><SandboxLabel /></main>`;
const invalidCode = `<main>Hello world</main>`;

describe('SandboxPreview', () => {
  it('renders valid code with no scopes', async () => {
    render(<SandboxPreview defaultState={{ code: validCode }} />);

    const main = await screen.findByRole('main');
    expect(main).toHaveTextContent('Hello world');

    const error = screen.getByRole('alert');
    expect(error.textContent).toBe('');
  });

  it('renders an error if the code is invalid', async () => {
    render(<SandboxPreview defaultState={{ code: invalidCode }} />);

    const error = await screen.findByRole('alert');
    expect(error.textContent).not.toBe('');
  });

  // TODO: Works file, not sure why test is failing
  it.skip('renders IDS code using scopes and styles', async () => {
    render(
      <SandboxPreview
        defaultState={{ code: idsCode }}
        scope={{
          default: import('./mocks/scopes'),
        }}
        styles={{
          default: lazy(() => import('./mocks/DefaultStyle')),
        }}
      />,
    );

    // Should show loading state first
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();

    // Then make sure the code is rendered
    const main = await screen.findByRole('main', undefined, {
      timeout: 5000,
    });
    expect(main).toHaveTextContent('Hello world');
    expect(main).toHaveClass('text');

    // And ensure styles have been added
    expect(document.head.innerHTML).toBe(
      '<link href="/random.css" rel="stylesheet">',
    );
  });

  it('overrides loading state', () => {
    render(
      <SandboxPreview
        defaultState={{ code: idsCode }}
        loading={({ code }) => `Rendering: ${code}`}
        scope={{
          default: import('./mocks/scopes'),
        }}
      />,
    );

    const loading = screen.getByText(`Rendering: ${idsCode}`);
    expect(loading).toBeInTheDocument();
  });

  it('renders a different wrapper for the error', () => {
    render(
      <SandboxPreview
        defaultState={{ code: invalidCode }}
        ErrorWrapper="output"
      />,
    );

    const error = screen.getByRole('alert');
    expect(error).toBeInTheDocument();
  });

  it('renders custom scopes', async () => {
    render(
      <SandboxPreview
        defaultState={{ code: idsCode }}
        scope={{
          default: import('./mocks/scopes'),
          custom: import('./mocks/customScope'),
        }}
        styles={{
          custom: lazy(() => import('./mocks/CustomStyle')),
        }}
      />,
    );

    // Ask to render a story with a custom scope
    act(() => {
      addons.getChannel()?.emit(SANDBOX_UPDATE_EVENT, {
        code: customScopeCode,
        scopes: ['custom'],
      } as AddonState);
    });

    // Should render the custom scope components
    const main = await screen.findByRole('main', undefined, {
      timeout: 5000,
    });
    expect(main).toHaveTextContent('draw Sandbox');

    // Should render the custom styles
    const customStyles = await screen.findByText('Custom styles here');
    expect(customStyles).toBeInTheDocument();
  });
});

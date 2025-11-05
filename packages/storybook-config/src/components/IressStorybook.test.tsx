// TODO: Probably better done with end-to-end tests
import { render, screen } from '@testing-library/react';
import { IressStorybook } from './IressStorybook';

// We mock the @storybook/addon-docs/blocks package to avoid rendering the actual DocsContainer component,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).
vi.mock('@storybook/addon-docs/blocks', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@storybook/addon-docs/blocks')>()),
  DocsContainer: () => <div>StorybookDocsContainer rendered</div>,
}));

describe('IressStorybook', () => {
  it('wraps @storybook/addon-docs/blocks/DocsContainer with IressText', async () => {
    render(
      <IressStorybook context={{} as never}>
        <div>Content</div>
      </IressStorybook>,
    );

    const docsContainer = await screen.findByText(
      'StorybookDocsContainer rendered',
    );
    expect(docsContainer.closest('.text')).toBeInTheDocument();
  });
});

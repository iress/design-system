// TODO: Probably better done with end-to-end tests
import { act, render, screen, waitFor } from '@testing-library/react';
import { ComponentApiExpander } from './ComponentApiExpander';

// We mock the @storybook/addon-docs/blocks package to avoid rendering the actual Controls component,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).

vi.mock('@storybook/addon-docs/blocks', async (importOriginal) => ({
  ...(await (
    importOriginal as () => Promise<
      typeof import('@storybook/addon-docs/blocks')
    >
  )()),
  Controls: () => <div>Controls rendered</div>,
}));

describe('ComponentApiExpander', () => {
  it('renders expander with the correct defaults', () => {
    render(<ComponentApiExpander of={{}} />);

    // Props is the default heading, and should be closed by default
    const expander = screen.getByRole('button', { name: 'Props' });

    // Controls should be rendered into expander
    const controls = screen.getByText('Controls rendered');
    expect(
      document.getElementById(expander.getAttribute('aria-controls') ?? ''),
    ).toContainElement(controls);
  });

  it('opens the expander automatically when the hash is changed', async () => {
    render(<ComponentApiExpander of={{}} />);

    const expander = screen.getByRole('button', {
      name: 'Props',
      expanded: false,
    });

    // Simulate hash change
    act(() => {
      window.location.hash = '#props';
    });

    // Should now be open
    await waitFor(() =>
      expect(expander).toHaveAttribute('aria-expanded', 'true'),
    );
  });
});

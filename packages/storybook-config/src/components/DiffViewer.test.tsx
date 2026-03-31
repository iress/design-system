import { DiffViewer } from './DiffViewer';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('DiffViewer', () => {
  it('renders default diff viewer', async () => {
    render(<DiffViewer oldValue="<old />" newValue="<new />" />);

    // react-diff-viewer-continued computes diffs asynchronously (componentDidMount setState)
    const oldCode = await screen.findByText('<old />');
    expect(oldCode).toBeInTheDocument();

    const newCode = await screen.findByText('<new />');
    expect(newCode).toBeInTheDocument();

    // Check CSS classes applied
    expect(oldCode.closest(`.sbdocs-diff-viewer`)).not.toBeNull();
  });

  it('renders custom allowModeChange feature', async () => {
    render(
      <DiffViewer oldValue="<old />" newValue="<new />" allowModeChange />,
    );

    const modeSwitcher = screen.getByRole('tablist');
    expect(modeSwitcher).toBeInTheDocument();

    // By default, should show diff (wait for async diff computation)
    await waitFor(() => {
      expect(screen.getByText('<old />')).toBeInTheDocument();
      expect(screen.getByText('<new />')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('tab', { name: 'New' }));

    // Should only show new code
    await waitFor(() => {
      expect(screen.queryByText('<old />')).not.toBeInTheDocument();
      expect(screen.getByText('<new />')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('tab', { name: 'Old' }));

    // Should only show old code
    await waitFor(() => {
      expect(screen.getByText('<old />')).toBeInTheDocument();
      expect(screen.queryByText('<new />')).not.toBeInTheDocument();
    });
  });
});

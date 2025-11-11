import { DiffViewer } from './DiffViewer';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('DiffViewer', () => {
  it('renders default diff viewer', () => {
    render(<DiffViewer oldValue="<old />" newValue="<new />" />);

    const oldCode = screen.getByText('<old />');
    expect(oldCode).toBeInTheDocument();

    const newCode = screen.getByText('<new />');
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

    // By default, should show diff
    expect(screen.getByText('<old />')).toBeInTheDocument();
    expect(screen.getByText('<new />')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('tab', { name: 'New' }));

    // Should only show new code
    expect(screen.queryByText('<old />')).not.toBeInTheDocument();
    expect(screen.getByText('<new />')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('tab', { name: 'Old' }));

    // Should only show old code
    expect(screen.getByText('<old />')).toBeInTheDocument();
    expect(screen.queryByText('<new />')).not.toBeInTheDocument();
  });
});

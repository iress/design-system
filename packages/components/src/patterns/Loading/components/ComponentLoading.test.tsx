import { act, render, screen } from '@testing-library/react';

import { ComponentLoading } from './ComponentLoading';
import { loading } from '../Loading.styles';

const hiddenStyles = loading({ pattern: 'component' });
const shownStyles = loading({
  pattern: 'component',
  showIndicator: true,
});
const shownMessageStyles = loading({
  pattern: 'component',
  showMessage: true,
});

describe('IressLoading pattern="component"', () => {
  it('renders the correct defaults', async () => {
    vi.useFakeTimers();

    const { rerender } = render(
      <ComponentLoading pattern="component" data-testid="loader">
        Content
      </ComponentLoading>,
    );

    // Loading by default
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Loading should be delayed by default
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(hiddenStyles.root!);
    expect(loader).not.toHaveClass(shownStyles.root!);

    // By default there is a delay of 0ms before the skeleton is shown
    await act(() => vi.advanceTimersByTime(0));
    expect(loader).toHaveClass(shownStyles.root!);

    rerender(
      <ComponentLoading pattern="component" loaded>
        Content
      </ComponentLoading>,
    );

    // When loaded, show the content
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    rerender(
      <ComponentLoading
        pattern="component"
        loaded
        update="Changing the content..."
      >
        Content
      </ComponentLoading>,
    );

    // When updating, show the update message
    const update = screen.getByText('Changing the content...');

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(update).toBeInTheDocument();

    // Message should be delayed by default
    expect(update).toHaveClass(hiddenStyles.message!);
    expect(update).not.toHaveClass(shownMessageStyles.message!);

    // By default there is a delay of 1000ms before the update message is shown
    await act(() => vi.advanceTimersByTime(1001));
    expect(update).toHaveClass(shownMessageStyles.message!);

    vi.useRealTimers();
  });
});

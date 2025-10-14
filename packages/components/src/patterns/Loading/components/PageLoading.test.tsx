import { act, render, screen } from '@testing-library/react';

import { PageLoading } from './PageLoading';
import { loading } from '../Loading.styles';

const hiddenStyles = loading({ pattern: 'page' });
const shownStyles = loading({
  pattern: 'page',
  showIndicator: true,
});

describe('IressLoading pattern="page"', () => {
  it('renders the correct defaults', async () => {
    vi.useFakeTimers();

    const { rerender } = render(
      <PageLoading pattern="page" data-testid="loader" />,
    );

    // Loading by default
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Loading should be delayed by default
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(hiddenStyles.root!);
    expect(loader).not.toHaveClass(shownStyles.root!);

    // Be default there is a delay of 500ms before the skeleton is shown
    await act(() => vi.advanceTimersByTime(500));
    expect(loader).toHaveClass(shownStyles.root!);

    rerender(<PageLoading pattern="page" critical="Critical content" />);

    // When critical, show the critical content
    expect(screen.getByText('Critical content')).toBeInTheDocument();

    rerender(<PageLoading pattern="page" loaded />);

    // When loaded, begin to hide the skeleton
    expect(loader).not.toHaveClass(shownStyles.root!);

    vi.useRealTimers();
  });
});

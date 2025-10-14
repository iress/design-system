import { act, render, screen } from '@testing-library/react';

import { StartUpLoading } from './StartUpLoading';
import { loading } from '../Loading.styles';

const hiddenStyles = loading({ pattern: 'start-up' });
const shownStyles = loading({
  pattern: 'start-up',
  showIndicator: true,
});
const shownMessageStyles = loading({
  pattern: 'start-up',
  showIndicator: true,
  showMessage: true,
});

describe('IressLoading pattern="start-up"', () => {
  it('renders the correct defaults', async () => {
    vi.useFakeTimers();

    const { rerender } = render(
      <StartUpLoading pattern="start-up" data-testid="loader" />,
    );

    const message = screen.getByTestId('loader__message');
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute('value', '0');

    // Default estimated finish time is 3000ms
    expect(progress).toHaveAttribute('max', '3000');

    // Loading by default
    const text = screen.getByText('Loading...');

    expect(text).toBeInTheDocument();

    // Loading should be delayed by default
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(hiddenStyles.root!);
    expect(loader).not.toHaveClass(shownStyles.root!);

    // Be default there is a delay of 500ms before the indicator is shown
    await act(() => vi.advanceTimersByTime(501));
    expect(loader).toHaveClass(shownStyles.root!);
    expect(text).not.toHaveClass(shownMessageStyles.message!);

    // Make sure the progress bar is not at 0
    expect(progress).not.toHaveAttribute('value', '0');

    // Be default there is a delay of 2500ms before the message is shown
    await act(() => vi.advanceTimersByTime(2000));
    expect(message).toHaveClass(shownMessageStyles.message!);

    // Switch to the longer message after the delay
    expect(text).toHaveTextContent('One moment please...');

    rerender(<StartUpLoading pattern="start-up" data-testid="loader" loaded />);

    // When loaded, automatically bump the progress to the estimated finish time
    expect(progress).toHaveAttribute('value', '3000');

    await act(() => vi.advanceTimersByTime(200));
    expect(loader).not.toHaveClass(shownStyles.root!);

    vi.useRealTimers();
  });
});

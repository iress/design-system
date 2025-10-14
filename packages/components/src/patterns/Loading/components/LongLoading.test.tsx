import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LongLoading } from './LongLoading';
import { loading } from '../Loading.styles';

const hiddenStyles = loading({ pattern: 'long' });
const shownStyles = loading({
  pattern: 'long',
  showIndicator: true,
});
const errorStyles = loading({
  pattern: 'long',
  error: true,
});

describe('IressLoading pattern="long"', () => {
  it('renders the correct defaults', async () => {
    vi.useFakeTimers();

    const { rerender } = render(
      <LongLoading
        pattern="long"
        data-testid="loader"
        messageList={{
          1500: 'Finding applications',
          3000: 'Retrieving data',
        }}
      />,
    );

    const progress = screen.getByRole('progressbar', {
      name: '0% loaded',
    });
    expect(progress).toBeInTheDocument();

    // Default estimated finish time is 10000ms
    expect(progress).toHaveAttribute('max', '10000');

    const line1 = screen.getByText('Finding applications');
    const line1Holder = line1.parentElement;
    const line2 = screen.getByText('Retrieving data');
    const line2Holder = line2.parentElement;

    expect(line1).toBeInTheDocument();
    expect(line2).toBeInTheDocument();

    // Loading should be delayed by default
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(hiddenStyles.root!);
    expect(loader).not.toHaveClass(shownStyles.root!);

    // Expect the ... to display after the text while its loading
    expect(line1Holder).toHaveTextContent('Finding applications...');
    expect(line2Holder).toHaveTextContent('Retrieving data');

    // Be default there is a delay of 500ms before the indicator is shown
    await act(() => vi.advanceTimersByTime(501));
    expect(loader).toHaveClass(shownStyles.root!);

    // Make sure the progress bar is not at 0
    expect(progress).not.toHaveValue(0);

    // After 1500ms, the first message should be checked
    await act(() => vi.advanceTimersByTime(1500));
    expect(line1Holder).toHaveTextContent('Finished: Finding applications');
    expect(line2Holder).toHaveTextContent('Retrieving data...');

    // After 3000ms, the second message should be checked
    await act(() => vi.advanceTimersByTime(1500));
    expect(line1Holder).toHaveTextContent('Finished: Finding applications');
    expect(line2Holder).toHaveTextContent('Finished: Retrieving data');

    rerender(
      <LongLoading
        pattern="long"
        data-testid="loader"
        messageList={{
          1500: 'Finding applications',
          3000: 'Retrieving data',
        }}
        loaded
      />,
    );

    // When loaded, automatically bump the progress to the estimated finish time
    expect(progress).toHaveAccessibleName('100% loaded');

    // longer wait time in this component so the check list can be checked off
    await act(() => vi.advanceTimersByTime(1300));
    expect(loader).not.toHaveClass(shownStyles.root!);

    vi.useRealTimers();
  });

  describe('props', () => {
    describe('error', () => {
      it('renders the error if passed in', () => {
        vi.useFakeTimers();

        const { rerender } = render(
          <LongLoading
            pattern="long"
            data-testid="loader"
            messageList={{
              1500: 'Finding applications',
              3000: 'Retrieving data',
            }}
          />,
        );

        const progress = screen.getByRole('progressbar');
        const line1 = screen.getByText('Finding applications');
        const loader = screen.getByTestId('loader');

        // The progress bar and text should be in the document as we are loading
        expect(progress).toBeInTheDocument();
        expect(line1).toBeInTheDocument();
        expect(loader).not.toHaveClass(errorStyles.root!);

        rerender(
          <LongLoading
            pattern="long"
            data-testid="loader"
            messageList={{
              1500: 'Finding applications',
              3000: 'Retrieving data',
            }}
            error="Something went wrong"
          />,
        );

        // Progress bar and text should be removed as we are in an error state
        expect(progress).not.toBeInTheDocument();
        expect(line1).not.toBeInTheDocument();

        // Error message should be in the document
        const error = screen.getByText('Something went wrong');
        expect(error).toBeInTheDocument();
        expect(loader).toHaveClass(errorStyles.root!);

        vi.useRealTimers();
      });
    });
  });
});

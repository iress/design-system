import { act, render, screen } from '@testing-library/react';

import { DefaultLoading } from './DefaultLoading';

import loadingStyles from '../Loading.module.scss';

describe('IressLoading pattern="default"', () => {
  it('renders the correct defaults', async () => {
    vi.useFakeTimers();

    render(<DefaultLoading pattern="default" data-testid="loader" />);

    // Loading by default
    const text = screen.getByText('Loading...');

    expect(text).toBeInTheDocument();

    // Loading should be delayed by default
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(loadingStyles['fade-in']);
    expect(loader).not.toHaveClass(loadingStyles['fade-in--active']);

    // Be default there is a delay of 3000ms before the message is shown
    await act(() => vi.advanceTimersByTime(3001));
    expect(loader).toHaveClass(loadingStyles['fade-in--active']);

    // Switch to the longer message after the delay
    expect(text).toHaveTextContent('This is taking longer than expected...');

    vi.useRealTimers();
  });
});
